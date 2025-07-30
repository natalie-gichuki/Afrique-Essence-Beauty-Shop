# routes/payment.py
from flask import Blueprint, request, jsonify
import requests, os, base64
from datetime import datetime
from app.models.payment import Payment
from app import db

payment_bp = Blueprint('payment', __name__)

@payment_bp.route('/mpesa/stk', methods=['POST'])
def mpesa_stk():
    data = request.get_json()
    phone = data.get('phone')
    amount = data.get('amount')  # total from cart

    try:
        amount = int(float(amount))  # handles both string and float inputs
    except (ValueError, TypeError):
        return jsonify({"error": "Invalid amount format"}), 400


    # Credentials
    consumer_key = os.getenv("MPESA_CONSUMER_KEY")
    consumer_secret = os.getenv("MPESA_CONSUMER_SECRET")
    shortcode = os.getenv("MPESA_SHORTCODE")
    passkey = os.getenv("MPESA_PASSKEY")

    # Access Token
    auth_response = requests.get(
        'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
        auth=(consumer_key, consumer_secret)
    )

    print("STATUS CODE:", auth_response.status_code)
    print("HEADERS:", auth_response.headers)
    print("RESPONSE TEXT:", auth_response.text)

    # ✅ Check if response is OK
    if auth_response.status_code != 200:
        print("AUTH FAILED:", auth_response.status_code, auth_response.text)
        return jsonify({"error": "Failed to get access token", "details": auth_response.text}), 500

    # ✅ If okay, parse it
    access_token = auth_response.json().get('access_token')


    # Timestamp
    timestamp = datetime.now().strftime('%Y%m%d%H%M%S')
    password = base64.b64encode(f"{shortcode}{passkey}{timestamp}".encode()).decode()

    # STK Push
    stk_payload = {
        "BusinessShortCode": shortcode,
        "Password": password,
        "Timestamp": timestamp,
        "TransactionType": "CustomerPayBillOnline",
        "Amount": amount,
        "PartyA": phone,
        "PartyB": shortcode,
        "PhoneNumber": phone,
        "CallBackURL": "https://966d274f4fe8.ngrok-free.app/mpesa/callback",  # your callback URL
        "AccountReference": "AfriqueEssence",
        "TransactionDesc": "Payment for order"
    }

    headers = {
        "Authorization": f"Bearer {access_token}",
        "Content-Type": "application/json"
    }

    stk_response = requests.post(
        'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
        headers=headers,
        json=stk_payload
    )

    return jsonify(stk_response.json()), stk_response.status_code


# routes/payment.py

@payment_bp.route('/mpesa/callback', methods=['POST'])
def mpesa_callback():
    data = request.get_json()
    print("📥 CALLBACK RECEIVED:", data)
    
    if not data:
        return jsonify({"error": "No data received"}), 400

    result = data.get("Body", {}).get("stkCallback", {})

    result_code = result.get("ResultCode")
    result_desc = result.get("ResultDesc")
    merchant_request_id = result.get("MerchantRequestID")
    checkout_request_id = result.get("CheckoutRequestID")
    metadata = result.get("CallbackMetadata", {}).get("Item", [])

    if result_code == 0:
        # Extract transaction details
        mpesa_data = {item["Name"]: item["Value"] for item in metadata if "Value" in item}

        amount = mpesa_data.get("Amount")
        receipt = mpesa_data.get("MpesaReceiptNumber")
        phone = mpesa_data.get("PhoneNumber")
        transaction_date = mpesa_data.get("TransactionDate")

        # ✅ Optionally: Save to DB
        print(f"✅ M-Pesa Payment Success:")
        print(f"Receipt: {receipt}, Amount: {amount}, Phone: {phone}")

        new_payment = Payment(
            receipt=receipt,
            amount=amount,
            phone=phone,
            transaction_date=str(transaction_date),
            status='Success'
        )
        db.session.add(new_payment)
        db.session.commit()

    else:
        print(f"❌ M-Pesa Payment Failed: {result_desc}")

    return jsonify({"ResultCode": 0, "ResultDesc": "Received OK"}), 200


@payment_bp.route('/payment/status/<phone>', methods=['GET'])
def check_payment_status(phone):
    payment = Payment.query.filter_by(phone=phone).order_by(Payment.id.desc()).first()

    if payment and payment.status == 'Success':
        return jsonify({
            "status": "paid",
            "receipt": payment.receipt,
            "amount": payment.amount,
            "phone": payment.phone,
            "transaction_date": payment.transaction_date
        })
    else:
        return jsonify({"status": "pending"})
