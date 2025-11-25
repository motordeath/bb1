from flask import Flask
from flask_cors import CORS
from config import Config
from db import init_db
from auth_middleware import init_firebase
from routes.auth import auth_bp
from routes.projects import projects_bp

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)

    # Initialize extensions
    init_db(app)
    init_firebase(app)

    # Register Blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(projects_bp, url_prefix='/api/projects')
    
    from routes.join_requests import join_bp
    app.register_blueprint(join_bp, url_prefix='/api/join')
    
    from routes.team import team_bp
    app.register_blueprint(team_bp, url_prefix='/api/project') # Team routes under /api/project as per spec

    from routes.activity import activity_bp
    app.register_blueprint(activity_bp, url_prefix='/api/activity')

    from routes.users import users_bp
    app.register_blueprint(users_bp, url_prefix='/api/users')

    @app.route('/')
    def home():
        return "BuildBuddy Backend Running (Flask)"

    return app

if __name__ == '__main__':
    import os
    port = int(os.environ.get("PORT", 5000))
    app = create_app()
    app.run(host="0.0.0.0", port=port)
