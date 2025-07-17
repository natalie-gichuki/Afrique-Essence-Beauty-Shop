from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.invoice import Invoice

invoice_bp = Blueprint('invoice', __name__, url_prefix='/invoices')

# Helper to check admin role
def admin_required():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "Admins only!"}), 403
    return None

# GET all invoices - Admin only (usually sensitive)
@invoice_bp.route('/', methods=['GET'])
@jwt_required()
def get_invoices():
    admin_check = admin_required()
    if admin_check:
        return admin_check
    invoices = Invoice.query.all()
    return jsonify([invoice.to_dict() for invoice in invoices]), 200

# GET a single invoice by ID - User can only access their own invoice or admin
@invoice_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_invoice(id):
    invoice = Invoice.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if invoice.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify(invoice.to_dict()), 200

# CREATE a new invoice - Admin only
@invoice_bp.route('/', methods=['POST'])
@jwt_required()
def create_invoice():
    admin_check = admin_required()
    if admin_check:
        return admin_check

    data = request.get_json()
    invoice = Invoice(**data)
    db.session.add(invoice)
    db.session.commit()
    return jsonify(invoice.to_dict()), 201

# UPDATE an existing invoice - Admin only
@invoice_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_invoice(id):
    admin_check = admin_required()
    if admin_check:
        return admin_check

    invoice = Invoice.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        setattr(invoice, key, value)

    db.session.commit()
    return jsonify(invoice.to_dict()), 200

# DELETE an invoice - Admin only
@invoice_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_invoice(id):
    admin_check = admin_required()
    if admin_check:
        return admin_check

    invoice = Invoice.query.get_or_404(id)
    db.session.delete(invoice)
    db.session.commit()
    return '', 204
