from flask import Blueprint, jsonify
from models import Activity

activity_bp = Blueprint('activity', __name__)

@activity_bp.route('/<uid>', methods=['GET'])
def get_user_activity(uid):
    activities = Activity.get_by_user(uid)
    return jsonify(activities), 200
