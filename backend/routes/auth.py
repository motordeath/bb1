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
    return jsonify({"error": "User not found"}), 404

@auth_bp.route('/me', methods=['GET'])
@require_firebase_auth
def get_current_user():
    print(f"DEBUG: /me called for UID: {g.uid}")
    user = User.get_by_uid(g.uid)
    if user:
        print(f"DEBUG: User found: {user.get('email')}")
        return jsonify(user), 200
    print("DEBUG: User not found in DB")
    return jsonify({"error": "User not found"}), 404

@auth_bp.route('/me', methods=['PUT'])
@require_firebase_auth
def update_current_user():
    data = request.json
    # Ensure we don't overwrite critical fields
    safe_data = {
        "name": data.get("name"),
        "bio": data.get("bio"),
        "skills": data.get("skills"),
        "social_links": data.get("social_links")
    }
    # Filter out None values to avoid overwriting with null
    safe_data = {k: v for k, v in safe_data.items() if v is not None}
    
    # We use create_or_update but we need to pass all fields to avoid data loss if the method replaces everything
    # Actually User.create_or_update implementation in models.py suggests it does a $set, so partial update is fine.
    # However, let's look at models.py again. It constructs a full user_data dict.
    # We should probably fetch existing, merge, and update.
    # Or better, let's rely on the fact that we are passing what we want to update.
    # Wait, models.py create_or_update constructs a dict with specific keys. If we pass partial data, others might be None.
    # Let's fix models.py to handle partial updates better or handle it here.
    
    # Re-reading models.py from previous turn:
    # user_data = { "uid": uid, "name": data.get("name"), ... }
    # It uses data.get() which defaults to None.
    # So if we pass partial data, we might overwrite existing data with None.
    
    # Let's fetch current user first
    current_user = User.get_by_uid(g.uid)
    if not current_user:
        return jsonify({"error": "User not found"}), 404
        
    # Merge
    merged_data = current_user.copy()
    merged_data.update(safe_data)
    
    # We need to pass 'email' and 'avatar' too as create_or_update expects them
    # But wait, create_or_update is used for sync.
    # Let's just use a direct update here for simplicity and safety.
    
    from db import get_db
    db = get_db()
    db.users.update_one({"uid": g.uid}, {"$set": safe_data})
    
    updated_user = User.get_by_uid(g.uid)
    return jsonify(updated_user), 200
