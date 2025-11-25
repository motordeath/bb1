from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import Project

team_bp = Blueprint('team', __name__)

@team_bp.route('/addMember', methods=['POST'])
@require_firebase_auth
def add_member():
    data = request.json
    project_id = data.get('project_id')
    uid_to_add = data.get('uid')
    
    project = Project.get_by_id(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404
        
    if project['creator_uid'] != g.uid:
        return jsonify({"error": "Unauthorized"}), 403

    Project.add_member(project_id, uid_to_add)
    return jsonify({"message": "Member added"}), 200

@team_bp.route('/removeMember', methods=['DELETE'])
@require_firebase_auth
def remove_member():
    data = request.json
    project_id = data.get('project_id')
    uid_to_remove = data.get('uid')

    project = Project.get_by_id(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    if project['creator_uid'] != g.uid:
        return jsonify({"error": "Unauthorized"}), 403

    Project.remove_member(project_id, uid_to_remove)
    return jsonify({"message": "Member removed"}), 200
