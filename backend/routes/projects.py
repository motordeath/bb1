from flask import Blueprint, request, jsonify, g
from auth_middleware import require_firebase_auth
from models import Project

projects_bp = Blueprint('projects', __name__)

@projects_bp.route('/create', methods=['POST'])
@require_firebase_auth
def create_project():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    required_fields = ['title', 'description', 'tech_stack', 'required_roles']
    for field in required_fields:
        if field not in data or not data[field]:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # Inject creator_uid from Firebase token
    data['creator_uid'] = g.uid
    print(f"DEBUG: Creating project for UID: {g.uid}")
    
    # Ensure creator is the first member
    data['members'] = [g.uid]

    project = Project.create(data)
    print(f"DEBUG: Project Created: {project}")
    return jsonify(project), 201

@projects_bp.route('/feed', methods=['GET'])
def get_feed():
    filter_type = request.args.get('filter', 'all')
    tech_stack = request.args.get('stack')
    
    print(f"DEBUG: Fetching Feed. Filter: {filter_type}")
    
    query = {}
    if filter_type == 'remote':
        query['is_remote'] = True
    elif filter_type == 'recruiting':
        query['status'] = 'recruiting'
    
    if tech_stack:
        query['tech_stack'] = tech_stack

    projects = Project.get_all(query)
    print(f"DEBUG: Feed count: {len(projects)}")
    return jsonify(projects), 200

@projects_bp.route('/active/<uid>', methods=['GET'])
def get_active_projects(uid):
    print(f"DEBUG: Fetching Active Projects for UID: {uid}")
    projects = Project.get_by_creator(uid)
    print(f"DEBUG: Active count: {len(projects)}")
    return jsonify(projects), 200

@projects_bp.route('/member/<uid>', methods=['GET'])
def get_joined_projects(uid):
    projects = Project.get_by_member(uid)
    return jsonify(projects), 200

@projects_bp.route('/saved/<uid>', methods=['GET'])
def get_saved_projects(uid):
    from models import SavedProject
    saved_ids = SavedProject.get_user_saved(uid)
    projects = Project.get_by_ids(saved_ids)
    return jsonify(projects), 200

@projects_bp.route('/categories', methods=['GET'])
def get_categories():
    categories = Project.get_categories()
    return jsonify(categories), 200

@projects_bp.route('/trending', methods=['GET'])
def get_trending():
    # Real trending: sort by members count desc for now
    projects = Project.get_all(sort_by="members", limit=5) 
    return jsonify(projects), 200

@projects_bp.route('/recommended/<uid>', methods=['GET'])
def get_recommended(uid):
    # Real recommended: just return recent projects for now, can be improved with skills matching
    projects = Project.get_all(limit=5)
    return jsonify(projects), 200

@projects_bp.route('/save', methods=['POST'])
@require_firebase_auth
def save_project():
    data = request.json
    from models import SavedProject
    SavedProject.save(g.uid, data.get('project_id'))
    return jsonify({"message": "Project saved"}), 200

@projects_bp.route('/unsave', methods=['POST'])
@require_firebase_auth
def unsave_project():
    data = request.json
    from models import SavedProject
    SavedProject.unsave(g.uid, data.get('project_id'))
    return jsonify({"message": "Project unsaved"}), 200

@projects_bp.route('/<project_id>', methods=['GET'])
def get_project(project_id):
    project = Project.get_by_id(project_id)
    if project:
        return jsonify(project), 200
    return jsonify({"error": "Project not found"}), 404
