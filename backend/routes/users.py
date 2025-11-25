from flask import Blueprint, jsonify
from models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/similar/<uid>', methods=['GET'])
def get_similar_users(uid):
    users = User.get_similar(uid)
    return jsonify(users), 200
