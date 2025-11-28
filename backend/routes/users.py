from flask import Blueprint, jsonify
from flask import Blueprint, jsonify
from models import User

users_bp = Blueprint('users', __name__)

@users_bp.route('/similar/<uid>', methods=['GET'])
def get_similar_users(uid):
    try:
        users = User.get_similar(uid)
        return jsonify(users), 200
    except Exception as e:
        print(f"Error getting similar users: {e}")
        return jsonify([]), 200  # Return empty array instead of error
