from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.utils.auth_helpers import role_required
from app import db

bp = Blueprint('user_routes', __name__)

@bp.route('/user', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_users():
    users = User.query.filter(User.role != 'disabled').all()

    if not users:
        return jsonify({"msg": "No users found"}), 404
    
    return jsonify([{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    } for user in users]), 200


@bp.route('/user/<int:user_id>/disabled', methods=['PATCH'])
@jwt_required()
@role_required('admin')
def disable_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "User not found"}), 404

    if user.role == 'admin':
        return jsonify({"msg": "Cannot disable an admin user"}), 403
    
    user.role = 'disabled'
    db.session.commit()
    return jsonify({"msg": f"User {user.username} disabled"}), 200