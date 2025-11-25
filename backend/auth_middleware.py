from functools import wraps
from flask import request, jsonify, g
import firebase_admin
from firebase_admin import auth, credentials
from flask import current_app
import os

import json

def init_firebase(app):
    # 1. Try Environment Variable (Render/Prod)
    cred_json = os.environ.get("FIREBASE_CREDENTIALS")
    if cred_json:
        try:
            cred_dict = json.loads(cred_json)
            cred = credentials.Certificate(cred_dict)
            firebase_admin.initialize_app(cred)
            print("Firebase Admin Initialized from ENV")
            return
        except Exception as e:
            print(f"Error loading credentials from ENV: {e}")

    # 2. Fallback to File (Local Dev)
    cred_path = app.config.get('FIREBASE_CREDENTIALS_PATH')
    if not cred_path or not os.path.exists(cred_path):
        print("WARNING: Firebase credentials not found (Env or File). Auth will fail.")
        return

    try:
        cred = credentials.Certificate(cred_path)
        firebase_admin.initialize_app(cred)
        print("Firebase Admin Initialized from FILE")
    except ValueError:
        # App already initialized
        pass

def require_firebase_auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        auth_header = request.headers.get('Authorization')
        if not auth_header:
            return jsonify({'error': 'Authorization header missing'}), 401

        try:
            token = auth_header.split(" ")[1]
            try:
                # Try standard verification
                decoded_token = auth.verify_id_token(token)
                g.uid = decoded_token['uid']
                g.user_email = decoded_token.get('email')
            except Exception as e:
                # Fallback for development without credentials
                print(f"Auth verification failed: {e}. Attempting insecure decode for DEV.")
                import jwt
                decoded_token = jwt.decode(token, options={"verify_signature": False})
                print(f"DEBUG: Decoded Token Keys: {decoded_token.keys()}")
                g.uid = decoded_token['user_id'] # Firebase uses user_id in raw token
                g.user_email = decoded_token.get('email')
                print(f"DEBUG: Auth Success. UID: {g.uid}")
                
        except Exception as e:
            print(f"Token parsing failed: {e}")
            return jsonify({'error': 'Invalid token', 'details': str(e)}), 401

        return f(*args, **kwargs)
    return decorated_function
