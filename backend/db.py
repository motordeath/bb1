from pymongo import MongoClient
from flask import current_app, g

def get_db():
    if 'db' not in g:
        client = MongoClient(current_app.config['MONGO_URI'])
        g.db = client.get_database()
    return g.db

def init_db(app):
    # Test connection
    try:
        client = MongoClient(app.config['MONGO_URI'])
        client.server_info()
        print("Connected to MongoDB!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
