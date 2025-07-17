from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity, get_jwt
from app import db
from app.models.cart import Cart, CartItem
from app.utils.auth_helpers import role_required

cart_bp = Blueprint('cart', __name__, url_prefix='/cart')

# Helper to check admin role
# def admin_required():
#     claims = get_jwt()
#     if claims.get("role") != "admin":
#         return jsonify({"msg": "Admins only!"}), 403
#     return None

# -------------------------
# CART ROUTES
# -------------------------

@cart_bp.route('/', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_carts():
    # Admin only: list all carts
    # admin_check = admin_required()
    # if admin_check:
    #     return admin_check

    carts = Cart.query.all()
    return jsonify([cart.to_dict() for cart in carts])

@cart_bp.route('/<int:id>', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer') 
def get_cart(id):
    cart = Cart.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    # # Allow if cart belongs to user or user is admin
    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify(cart.to_dict())

@cart_bp.route('/', methods=['POST'])
@jwt_required()
@role_required('admin', 'customer')
def create_cart():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    # Assign cart to logged-in user
    cart = Cart(user_id=current_user_id, **data)
    db.session.add(cart)
    db.session.commit()
    return jsonify(cart.to_dict()), 201

@cart_bp.route('/<int:id>', methods=['PUT'])
@jwt_required()
@role_required('admin', 'customer')
def update_cart(id):
    cart = Cart.query.get_or_404(id)
    # current_user_id = get_jwt_identity()
    # claims = get_jwt()

    # if cart.user_id != current_user_id and claims.get("role") != "admin":
    #     return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    for key, value in data.items():
        setattr(cart, key, value)
    db.session.commit()
    return jsonify(cart.to_dict())

@cart_bp.route('/<int:id>', methods=['DELETE'])
@jwt_required()
@role_required('admin', 'customer')
def delete_cart(id):
    cart = Cart.query.get_or_404(id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    db.session.delete(cart)
    db.session.commit()
    return '', 204

# -------------------------
# CART ITEM ROUTES
# -------------------------

@cart_bp.route('/<int:cart_id>/items', methods=['GET'])
@jwt_required()
@role_required('admin', 'customer')
def get_cart_items(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    return jsonify([item.to_dict() for item in cart.items])

@cart_bp.route('/<int:cart_id>/items', methods=['POST'])
@jwt_required()
@role_required('admin', 'customer')
def add_cart_item(cart_id):
    cart = Cart.query.get_or_404(cart_id)
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    item = CartItem(cart_id=cart.id, **data)
    db.session.add(item)
    db.session.commit()
    return jsonify(item.to_dict()), 201

@cart_bp.route('/items/<int:item_id>', methods=['PUT'])
@jwt_required()
@role_required('admin', 'customer')
def update_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    cart = item.cart
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    data = request.get_json()
    for key, value in data.items():
        setattr(item, key, value)
    db.session.commit()
    return jsonify(item.to_dict())

@cart_bp.route('/items/<int:item_id>', methods=['DELETE'])
@jwt_required()
@role_required('admin', 'customer')
def delete_cart_item(item_id):
    item = CartItem.query.get_or_404(item_id)
    cart = item.cart
    current_user_id = get_jwt_identity()
    claims = get_jwt()

    if cart.user_id != current_user_id and claims.get("role") != "admin":
        return jsonify({"msg": "Access denied"}), 403

    db.session.delete(item)
    db.session.commit()
    return '', 204
