from flask import Blueprint, request, jsonify
from app import db
from app.models.cart import Cart, CartItem

cart_bp = Blueprint('cart', __name__, url_prefix='/cart')

# -------------------------
# CART ROUTES
# -------------------------

@cart_bp.route('/', methods=['GET'])
def get_carts():
    carts = Cart.query.all()
    return jsonify([cart.to_dict() for cart in carts])

@cart_bp.route('/<int:id>', methods=['GET'])
def get_cart(id):
    cart = Cart.query.get_or_404(id)
    return jsonify(cart.to_dict())

@cart_bp.route('/', methods=['POST'])
def create_cart():
    data = request.get_json()
    cart = Cart(**data)
    db.session.add(cart)
    db.session.commit()
    return jsonify(cart.to_dict()), 201

@cart_bp.route('/<int:id>', methods=['PUT'])
def update_cart(id):
    cart = Cart.query.get_or_404(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(cart, key, value)
    db.session.commit()
    return jsonify(cart.to_dict())

@cart_bp.route('/<int:id>', methods=['DELETE'])
def delete_cart(id):
    cart = Cart.query.get_or_404(id)
    db.session.delete(cart)
    db.session.commit()
    return '', 204

# -------------------------
# CART ITEM ROUTES
# -------------------------

@cart_bp.route('/<int:cart_id>/items', methods=['GET'])
def get_cart_items(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    return jsonify([item.to_dict() for item in cart.items])

@cart_bp.route('/<int:cart_id>/items', methods=['POST'])
def add_cart_item(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    data = request.get_json()
    item = CartItem(cart_id=cart.id, **data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
def update_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    data = request.get_json()
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.to_dict())

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
def delete_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    db.session.delete(item)
    db.session.commit()
    return '', 204
