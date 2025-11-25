import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/buildbuddy')
    FIREBASE_CREDENTIALS_PATH = os.getenv('FIREBASE_CREDENTIALS_PATH')
    SECRET_KEY = os.getenv('FLASK_SECRET_KEY', 'dev_secret')
    DEBUG = True
