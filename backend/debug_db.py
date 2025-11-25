from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

MONGO_URI = os.getenv('MONGO_URI', 'mongodb://localhost:27017/buildbuddy')
client = MongoClient(MONGO_URI)
db = client.get_database()

print(f"Connected to Database: {db.name}")
print("Collections:", db.list_collection_names())

print("\n--- USERS ---")
for user in db.users.find():
    print(f"UID: {user.get('uid')}, Name: {user.get('name')}, Email: {user.get('email')}")

print("\n--- PROJECTS ---")
print(f"Count: {db.projects.count_documents({})}")
