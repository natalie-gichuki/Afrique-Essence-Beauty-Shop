from flask import Blueprint, request, jsonify
from app import db
from app.models.order import OrderItem

order_item_bp = Blueprint('order_item', __name__, url_prefix='/order-items')

# Get all order items
@order_item_bp.route('/', methods=['GET'])
def get_order_items():
    items = OrderItem.query.all()
    return jsonify([item.to_dict() for item in items]), 200

# Get a order item by ID
@order_item_bp.route('/<int:id>', methods=['GET'])
def get_order_item(id):
    item = OrderItem.query.get_or_404(id)
    return jsonify(item.to_dict()), 200


@order_item_bp.route('/', methods=['POST'])
def create_order_item():
    data = request.get_json()
    item = OrderItem(**data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

# Update an order item
@order_item_bp.route('/<int:id>', methods=['PUT'])
def update_order_item(id):
    item = OrderItem.query.get_or_404(id)
    data = request.get_json()

    for key, value in data.items():
        setattr(item, key, value)

    db.session.commit()
    return jsonify(item.to_dict()), 200

# Delete an order item
@order_item_bp.route('/<int:id>', methods=['DELETE'])
def delete_order_item(id):
    item = OrderItem.query.get_or_404(id)
    db.session.delete(item)
    db.session.commit()
    return '', 204
