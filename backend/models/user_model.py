from pymongo import MongoClient
from config import Config
from bson import ObjectId

# Initialize DB here or pass it from app.py. 
# For simplicity and to avoid circular imports, I'll initialize a client here or accept db instance.
# But standard pattern often uses a shared db instance. 
# Given the simple structure, I will create a get_db function or just init here.
# Let's use a lazy init or just init.

client = MongoClient(Config.MONGO_URI)
db = client.get_database() # uses default db from URI or 'test' if none

users_collection = db.users

class UserModel:
    @staticmethod
    def create_user(data):
        return users_collection.insert_one(data)

    @staticmethod
    def find_by_email(email):
        return users_collection.find_one({"email": email})

    @staticmethod
    def find_by_roll_no(roll_no):
        return users_collection.find_one({"roll_no": roll_no})

    @staticmethod
    def find_by_id(user_id):
        try:
            return users_collection.find_one({"_id": ObjectId(user_id)})
        except:
            return None

    @staticmethod
    def update_user(user_id, update_data):
        try:
            users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": update_data})
            return True
        except:
            return False
