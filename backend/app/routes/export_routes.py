from flask import Blueprint, request
from app.models import Product, Order
from app.utils.export_csv import generate_csv_response
from app.models import db
from flask_jwt_extended import jwt_required
from app.utils.auth_helpers import role_required

export_bp = Blueprint('export_bp', __name__, url_prefix='/export')

@export_bp.route('/products')
@jwt_required()
@role_required('admin')
def export_products():
    products = Product.query.all()
    data = [{
        "id": p.id,
        "name": p.name,
        "price": p.price,
        "stock": p.stock,
        "views": p.views
    } for p in products]

    fieldnames = ["id", "name", "price", "stock", "views"]
    return generate_csv_response(data, fieldnames, "products")

@export_bp.route('/orders')
@jwt_required()
@role_required('admin')
def export_orders():
    orders = Order.query.all()
    data = [{
        "id": o.id,
        "user_id": o.user_id,
        "status": o.status,
        "total_price": o.total_price,
        "created_at": o.created_at.isoformat()
    } for o in orders]

    fieldnames = ["id", "user_id", "status", "total_price", "created_at"]
    return generate_csv_response(data, fieldnames, "orders")
