from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import User
from db import get_db
from datetime import datetime

auth_bp = Blueprint('auth', __name__)

# ----------------------------------------------------------------------
# SYNC USER (called on login)
# ----------------------------------------------------------------------
@auth_bp.route('/sync', methods=['POST'])
@require_firebase_auth
def sync_user():
    data = request.json or {}
    uid = g.uid

    user = User.create_or_update(uid, data)
    return jsonify(user), 200


# ----------------------------------------------------------------------
# GET USER BY UID
# ----------------------------------------------------------------------
@auth_bp.route('/user/<uid>', methods=['GET'])
def get_user(uid):
    user = User.get_by_uid(uid)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


# ----------------------------------------------------------------------
# GET CURRENT USER
# ----------------------------------------------------------------------
@auth_bp.route('/me', methods=['GET'])
@require_firebase_auth
def get_current_user():
    user = User.get_by_uid(g.uid)
    if user:
        return jsonify(user), 200
    return jsonify({"error": "User not found"}), 404


# ----------------------------------------------------------------------
# UPDATE PROFILE (MAIN FIXED ROUTE)
# ----------------------------------------------------------------------
@auth_bp.route('/me', methods=['PUT'])
@require_firebase_auth
def update_current_user():
    data = request.json or {}
    db = get_db()

    safe_data = {}

    # ✅ Name (FRONTEND sends displayName)
    if "displayName" in data:
        safe_data["name"] = data["displayName"]

    # ✅ Short bio (tagline)
    if "bio" in data:
        safe_data["bio"] = data["bio"]

    # ✅ Long about section
    if "about" in data:
        safe_data["about"] = data["about"]

    # ✅ Skills array
    if "skills" in data:
        safe_data["skills"] = data["skills"]

    # ✅ Social Links {github, linkedin, website, resume}
    if "social_links" in data:
        safe_data["social_links"] = data["social_links"]

    # ✅ Update timestamp
    safe_data["updated_at"] = datetime.utcnow()

    # ✅ Save changes safely using $set
    result = db.users.update_one(
        {"firebase_uid": g.uid},
        {"$set": safe_data}
    )

    if result.matched_count == 0:
        return jsonify({"error": "User not found"}), 404

    # ✅ Fetch updated user
    updated_user = User.get_by_uid(g.uid)
    return jsonify(updated_user), 200
