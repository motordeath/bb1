from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import JoinRequest, Project

join_bp = Blueprint('join', __name__)

@join_bp.route('/', methods=['POST'])
@require_firebase_auth
def create_join_request():
    data = request.json
    data['requester_uid'] = g.uid
    # Verify project exists
    project = Project.get_by_id(data.get('project_id'))
    if not project:
        return jsonify({"error": "Project not found"}), 404
    
    req = JoinRequest.create(data)
    return jsonify(req), 201

@join_bp.route('/user/<uid>', methods=['GET'])
def get_user_requests(uid):
    requests = JoinRequest.get_by_user(uid)
    return jsonify(requests), 200

# TODO: Add routes to get requests for user/project and respond to them
