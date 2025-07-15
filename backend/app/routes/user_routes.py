from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models.user import User
from app.utils.auth_helpers import role_required

bp = Blueprint('user_routes', __name__)
@bp.route('/user', methods=['GET'])
@jwt_required()
@role_required('admin')
def get_users():
    users = User.query.all()
    return jsonify([{
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role
    } for user in users]), 200