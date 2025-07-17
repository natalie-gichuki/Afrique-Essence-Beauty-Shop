from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.order import OrderItem

order_item_bp = Blueprint('order_item', __name__, url_prefix='/order-items')

def admin_required():
    claims = get_jwt()
    if claims.get("role") != "admin":
        return jsonify({"msg": "Admins only!"}), 403
    return None

# Get all order items - Admin only
@order_item_bp.route('/', methods=['GET'])
@jwt_required()
def get_order_items():
    admin_check = admin_required()
    if admin_check:
        return admin_check

    items = OrderItem.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# Get an order item by ID - user can access only if owns the order or admin
@order_item_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
def get_order_item(id):
    item = OrderItem.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if item.order.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify(item.to_dict()), 200

# Create order item - Admin only (usually order items created automatically during order creation)
@order_item_bp.route('/', methods=['POST'])
@jwt_required()
def create_order_item():
    admin_check = admin_required()
    if admin_check:
        return admin_check

    data = request.get_json()
    item = OrderItem(**data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

# Update an order item - Admin only
@order_item_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
def update_order_item(id):
    admin_check = admin_required()
    if admin_check:
        return admin_check

    item = OrderItem.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.to_dict()), 200

# Delete an order item - Admin only
@order_item_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
def delete_order_item(id):
    admin_check = admin_required()
    if admin_check:
        return admin_check

    item = OrderItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204
