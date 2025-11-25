from datetime import datetime
from db import get_db

class User:
    @staticmethod
    def create_or_update(uid, data):
        db = get_db()
        user_data = {
            "uid": uid,
            "name": data.get("name"),
            "email": data.get("email"),
            "avatar": data.get("avatar"),
            "bio": data.get("bio", ""),
            "skills": data.get("skills", []),
            "social_links": data.get("social_links", {
                "github": "",
                "linkedin": "",
                "website": "",
                "resume_url": ""
            }),
            "updated_at": datetime.utcnow()
        }
        # If new, add created_at
        db.users.update_one(
            {"uid": uid},
            {"$set": user_data, "$setOnInsert": {"created_at": datetime.utcnow()}},
            upsert=True
        )
        return db.users.find_one({"uid": uid}, {"_id": 0})

    @staticmethod
    def get_by_uid(uid):
        db = get_db()
        return db.users.find_one({"uid": uid}, {"_id": 0})

    @staticmethod
    def create(uid, email, display_name, photo_url):
        db = get_db()
        user_data = {
            "_id": uid,
            "email": email,
            "display_name": display_name,
            "photo_url": photo_url,
            "skills": [],
            "bio": "",
            "created_at": datetime.utcnow()
        }
        db.users.update_one({"_id": uid}, {"$set": user_data}, upsert=True)
        return user_data

    @staticmethod
    def get(uid):
        db = get_db()
        return db.users.find_one({"_id": uid})

    @staticmethod
    def get_similar(uid, limit=3):
        db = get_db()
        # Mock: return other users
        cursor = db.users.find({"_id": {"$ne": uid}}).limit(limit)
        users = []
        for doc in cursor:
            if "_id" in doc:
                doc["_id"] = str(doc["_id"])
            if "created_at" in doc:
                doc["created_at"] = doc["created_at"].isoformat()
            if "updated_at" in doc:
                doc["updated_at"] = doc["updated_at"].isoformat()
            users.append(doc)
        return users

class Project:
    @staticmethod
    def create(data):
        db = get_db()
        project_data = {
            "title": data.get("title"),
            "description": data.get("description"),
            "problem": data.get("problem"),
            "tech_stack": data.get("tech_stack", []),
            "required_roles": data.get("required_roles", []),
            "creator_uid": data.get("creator_uid"),
            "members": [data.get("creator_uid")], # Creator is first member
            "tags": data.get("tags", []),
            "visibility": data.get("visibility", "public"),
            "cover_image": data.get("cover_image", ""),
            "is_remote": data.get("is_remote", True),
            "status": "recruiting", # recruiting, building, completed
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow()
        }
        result = db.projects.insert_one(project_data)
        project_data["_id"] = str(result.inserted_id)
        return project_data

    @staticmethod
    def get_all(filter_query=None, limit=20, skip=0, sort_by="created_at"):
        db = get_db()
        query = filter_query or {}
        cursor = db.projects.find(query).sort(sort_by, -1).skip(skip).limit(limit)
        projects = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            projects.append(doc)
        return projects

    @staticmethod
    def get_by_id(project_id):
        db = get_db()
        from bson.objectid import ObjectId
        try:
            doc = db.projects.find_one({"_id": ObjectId(project_id)})
            if doc:
                doc["_id"] = str(doc["_id"])
            return doc
        except:
            return None

    @staticmethod
    def add_member(project_id, uid):
        db = get_db()
        from bson.objectid import ObjectId
        try:
            db.projects.update_one(
                {"_id": ObjectId(project_id)},
                {"$addToSet": {"members": uid}}
            )
            return True
        except:
            return False

    @staticmethod
    def remove_member(project_id, uid):
        db = get_db()
        from bson.objectid import ObjectId
        try:
            db.projects.update_one(
                {"_id": ObjectId(project_id)},
                {"$pull": {"members": uid}}
            )
            return True
        except:
            return False

        return projects

    @staticmethod
    def get_by_member(uid):
        db = get_db()
        # Find projects where uid is in members list AND uid is NOT the creator
        cursor = db.projects.find({
            "members": uid,
            "creator_uid": {"$ne": uid}
        }).sort("created_at", -1)
        projects = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            projects.append(doc)
        return projects

    @staticmethod
    def get_by_creator(uid):
        db = get_db()
        cursor = db.projects.find({"creator_uid": uid}).sort("created_at", -1)
        projects = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            projects.append(doc)
        return projects

    @staticmethod
    def get_by_ids(ids):
        db = get_db()
        from bson.objectid import ObjectId
        obj_ids = [ObjectId(i) for i in ids]
        cursor = db.projects.find({"_id": {"$in": obj_ids}})
        projects = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            projects.append(doc)
        return projects

    @staticmethod
    def get_categories():
        db = get_db()
        # distinct tags as categories
        return db.projects.distinct("tags")

class SavedProject:
    @staticmethod
    def save(uid, project_id):
        db = get_db()
        db.saved_projects.update_one(
            {"uid": uid, "project_id": project_id},
            {"$set": {"created_at": datetime.utcnow()}},
            upsert=True
        )
        return True

    @staticmethod
    def unsave(uid, project_id):
        db = get_db()
        db.saved_projects.delete_one({"uid": uid, "project_id": project_id})
        return True

    @staticmethod
    def get_user_saved(uid):
        db = get_db()
        cursor = db.saved_projects.find({"uid": uid})
        saved = []
        for doc in cursor:
            saved.append(doc["project_id"])
        return saved

class JoinRequest:
    @staticmethod
    def create(data):
        db = get_db()
        req_data = {
            "project_id": data.get("project_id"),
            "requester_uid": data.get("requester_uid"),
            "message": data.get("message"),
            "status": "pending",
            "created_at": datetime.utcnow()
        }
        result = db.join_requests.insert_one(req_data)
        req_data["_id"] = str(result.inserted_id)
        return req_data

    @staticmethod
    def get_by_user(uid):
        db = get_db()
        cursor = db.join_requests.find({"requester_uid": uid})
        requests = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            requests.append(doc)
        return requests

    @staticmethod
    def get_by_project(project_id):
        db = get_db()
        cursor = db.join_requests.find({"project_id": project_id})
        requests = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            requests.append(doc)
        return requests

class Activity:
    @staticmethod
    def create(uid, message, type="info"):
        db = get_db()
        data = {
            "uid": uid,
            "message": message,
            "type": type,
            "created_at": datetime.utcnow()
        }
        db.activity.insert_one(data)

    @staticmethod
    def get_by_user(uid, limit=10):
        db = get_db()
        cursor = db.activity.find({"uid": uid}).sort("created_at", -1).limit(limit)
        activities = []
        for doc in cursor:
            doc["_id"] = str(doc["_id"])
            activities.append(doc)
        return activities
