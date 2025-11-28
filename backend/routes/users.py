from flask import Blueprint, jsonify
from config.db import users_collection

users_bp = Blueprint("users", __name__)

@users_bp.route("/api/users/similar/<uid>", methods=["GET"])
def get_similar_users(uid):
    try:
        # TEMPORARY SAFE RESPONSE (prevents crashing app)
        return jsonify([]), 200

    except Exception as e:
        print(f"Error getting similar users: {e}")
        return jsonify([]), 200
