import requests
import time
import random

BASE_URL = "http://127.0.0.1:5000/api"
EMAIL = f"test_{int(time.time())}_{random.randint(1000,9999)}@example.com"
PASSWORD = "password123"
NAME = "Test User"

def test_flow():
    print(f"Testing with email: {EMAIL}")

    # 1. Signup
    print("1. Testing Signup...")
    try:
        res = requests.post(f"{BASE_URL}/signup", json={
            "name": NAME,
            "email": EMAIL,
            "password": PASSWORD
        })
        print(f"Signup Status: {res.status_code}")
        print(f"Signup Response: {res.json()}")
        if res.status_code != 201:
            print("Signup Failed!")
            return
    except Exception as e:
        print(f"Signup Request Failed: {e}")
        return

    # 2. Login
    print("\n2. Testing Login...")
    try:
        res = requests.post(f"{BASE_URL}/login", json={
            "email": EMAIL,
            "password": PASSWORD
        })
        print(f"Login Status: {res.status_code}")
        data = res.json()
        print(f"Login Response: {data}")
        
        if res.status_code != 200:
            print("Login Failed!")
            return
        
        token = data.get("token")
        if not token:
            print("No token received!")
            return
    except Exception as e:
        print(f"Login Request Failed: {e}")
        return

    # 3. Me
    print("\n3. Testing /me endpoint...")
    try:
        res = requests.get(f"{BASE_URL}/me", headers={
            "Authorization": f"Bearer {token}"
        })
        print(f"Me Status: {res.status_code}")
        print(f"Me Response: {res.json()}")
        
        if res.status_code == 200:
            print("\n✅ ALL TESTS PASSED!")
        else:
            print("\n❌ /me Verification Failed!")
    except Exception as e:
        print(f"Me Request Failed: {e}")

if __name__ == "__main__":
    # Wait a bit for server to start if just launched
    time.sleep(2) 
    test_flow()
