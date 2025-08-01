import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMyCart } from '../redux/slices/cartSlice';
import { createOrder } from '../redux/orderSlice';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../config';
import { t } from 'i18next';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, status } = useSelector((state) => state.cart);
  const [statusMessage, setStatus] = useState('');


  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    dispatch(fetchMyCart());
  }, [dispatch]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0).toFixed(2);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const orderPayload = {
    phone: form.phone,
    address: form.address,
    cart_items: cart.items.map((item) => ({
      product_id: item.product.id,
      quantity: item.quantity,
    }))
  };

  try {
    const resultAction = await dispatch(createOrder(orderPayload));
    if (createOrder.fulfilled.match(resultAction)) {
      const response = await fetch(`${API_URL}/mpesa/stk`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: form.phone,
          amount: calculateTotal(),
        }),
      });

      const mpesaResult = await response.json();
       const checkoutId = mpesaResult.CheckoutRequestID;
      if (mpesaResult.ResponseCode === "0") {
        setStatus("Waiting for payment confirmation...");

        // Start polling for payment
        const pollInterval = setInterval(async () => {
          const checkRes = await fetch(`${API_URL}/payment/status/id/${checkoutId}`);
          const checkData = await checkRes.json();

          if (checkData.status === "paid") {
            clearInterval(pollInterval);
            console.log("Payment successful");

            // Show invoice only after payment confirmed
            navigate('/invoice', {
              state: {
                customer: form,
                items: cart.items,
                total: calculateTotal(),
              },
            });
          }
        }, 4000); // poll every 4 seconds
      } else {
        alert("Failed to initiate M-Pesa STK push. Please try again.");
      }
    }
  } catch (err) {
    console.error("Error:", err);
  }
};

  if (status === 'loading') {
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;
  }

  return (
    <div className="min-h-screen  bg-gradient-to-br from-fuchsia-50 to-fuchsia-200 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-6">🧾 {t('checkout')}</h2>

        {/* Cart Summary */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">{t('yourItems')}</h3>
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b">
              <div>
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              </div>
              <p className="text-purple-700 font-semibold">
                Ksh {(item.product.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
          <div className="flex justify-between items-center mt-4 text-xl font-bold">
            <span>{t('total')}:</span>
            <span className="text-purple-700">Ksh {calculateTotal()}</span>
          </div>
        </div>

        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <h3 className="text-lg font-semibold mb-2">{t('billingInfo')}</h3>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <textarea
            name="address"
            placeholder="Delivery Address"
            value={form.address}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2 h-24 resize-none focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
          >
            {t('placeOrder')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;


