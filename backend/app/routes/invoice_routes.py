from flask import Blueprint, request, jsonify
from app import db
from app.models.invoice import Invoice

invoice_bp = Blueprint('invoice', __name__, url_prefix='/invoices')

# GET all invoices
@invoice_bp.route('/', methods=['GET'])
def get_invoices():
    invoices = Invoice.query.all()
    return jsonify([invoice.to_dict() for invoice in invoices]), 200

# GET a single invoice by ID
@invoice_bp.route('/<int:id>', methods=['GET'])
def get_invoice(id):
    invoice = Invoice.query.get_or_404(id)
    return jsonify(invoice.to_dict()), 200

# CREATE a new invoice
@invoice_bp.route('/', methods=['POST'])
def create_invoice():
    data = request.get_json()
    invoice = Invoice(**data)
    db.session.add(invoice)
    db.session.commit()
    return jsonify(invoice.to_dict()), 201

# UPDATE an existing invoice
@invoice_bp.route('/<int:id>', methods=['PUT'])
def update_invoice(id):
    invoice = Invoice.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        setattr(invoice, key, value)

    db.session.commit()
    return jsonify(invoice.to_dict()), 200

# DELETE an invoice
@invoice_bp.route('/<int:id>', methods=['DELETE'])
def delete_invoice(id):
    invoice = Invoice.query.get_or_404(id)
    db.session.delete(invoice)
    db.session.commit()
    return '', 204
