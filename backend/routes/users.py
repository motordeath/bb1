    try:
        users = User.get_similar(uid)
        return jsonify(users), 200
    except Exception as e:
        print(f"Error getting similar users: {e}")
        return jsonify([]), 200  # Return empty array instead of error
