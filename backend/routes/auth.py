from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import User

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/sync', methods=['POST'])
@require_firebase_auth
def sync_user():
    data = request.json
    uid = g.uid
    user = User.create_or_update(uid, data)
    return jsonify(user), 200

@auth_bp.route('/user/<uid>', methods=['GET'])
def get_user(uid):
    user = User.get_by_uid(uid)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@auth_bp.route('/me', methods=['GET'])
@require_firebase_auth
def get_current_user():
    user = User.get_by_uid(g.uid)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404

@auth_bp.route('/me', methods=['PUT'])
@require_firebase_auth
def update_current_user():
    data = request.json
    safe_data = {
        "name": data.get("name"),
        "bio": data.get("bio"),
        "about": data.get("about"),
        "skills": data.get("skills"),
        "social_links": data.get("social_links")
    }
    safe_data = {k: v for k, v in safe_data.items() if v is not None}
    
    from db import get_db
    db = get_db()
    db.users.update_one({"firebase_uid": g.uid}, {"$set": safe_data})
    
    updated_user = User.get_by_uid(g.uid)
    return jsonify(updated_user), 200
