from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import User
from db import get_db

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
    db = get_db()
    
    # Build safe update data
    safe_data = {}
    if "name" in data:
        safe_data["name"] = data["name"]
    if "bio" in data:
        safe_data["bio"] = data["bio"]
    if "about" in data:
        safe_data["about"] = data["about"]
    if "skills" in data:
        safe_data["skills"] = data["skills"]
    if "social_links" in data:
        safe_data["social_links"] = data["social_links"]
    
    # Always update timestamp
    from datetime import datetime
    safe_data["updated_at"] = datetime.utcnow()
    
    # Update in MongoDB using $set
    result = db.users.update_one(
        {"firebase_uid": g.uid},
        {"$set": safe_data}
    )
    
    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404
    
    # Fetch and return updated user from DB
    updated_user = User.get_by_uid(g.uid)
    return jsonify(updated_user), 200
