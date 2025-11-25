from pymongo import MongoClient
from config import Config
import sys

try:
    print(f"Connecting to: {Config.MONGO_URI}")
    client = MongoClient(Config.MONGO_URI)
    # The ismaster command is cheap and does not require auth.
    # client.admin.command('ismaster')
    # But to test auth we need to access the db.
    db = client.get_database()
    print(f"Database: {db.name}")
    print("Collections:", db.list_collection_names())
    print("✅ Connection Successful!")
except Exception as e:
    print(f"❌ Connection Failed: {e}")
    sys.exit(1)
