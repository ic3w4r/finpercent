import requests
import json
import uuid
import sys
from datetime import datetime

class FinPercentAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None, auth=False):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        if auth and self.token:
            headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    return success, response.json()
                except:
                    return success, {}
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                    return False, response.json()
                except:
                    return False, {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health(self):
        """Test health endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_create_user(self):
        """Test user creation"""
        username = f"test_user_{uuid.uuid4().hex[:8]}"
        return self.run_test(
            "Create User",
            "POST",
            "api/users",
            201,
            data={
                "username": username,
                "email": f"{username}@example.com",
                "password": "TestPassword123!"
            }
        )

    def test_login(self, username, password):
        """Test login and get token"""
        success, response = self.run_test(
            "Login",
            "POST",
            "api/login",
            200,
            data={"username": username, "password": password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True
        return False

    def test_get_methods(self):
        """Test getting all methods"""
        return self.run_test(
            "Get Methods",
            "GET",
            "api/methods",
            200
        )

    def test_get_method(self, method_id):
        """Test getting a specific method"""
        return self.run_test(
            "Get Method",
            "GET",
            f"api/methods/{method_id}",
            200
        )

    def test_get_features(self):
        """Test getting all features"""
        return self.run_test(
            "Get Features",
            "GET",
            "api/features",
            200
        )

    def test_get_feature(self, feature_id):
        """Test getting a specific feature"""
        return self.run_test(
            "Get Feature",
            "GET",
            f"api/features/{feature_id}",
            200
        )

    def test_create_financial_data(self, user_id):
        """Test creating financial data"""
        return self.run_test(
            "Create Financial Data",
            "POST",
            "api/financial-data",
            201,
            data={
                "user_id": user_id,
                "income": 5000,
                "expenses": {
                    "housing": 1500,
                    "food": 500,
                    "transportation": 300,
                    "entertainment": 200,
                    "other": 500
                },
                "savings": 1000,
                "investments": {
                    "stocks": 500,
                    "bonds": 300,
                    "real_estate": 200
                }
            }
        )

    def test_get_financial_data(self, user_id):
        """Test getting financial data"""
        return self.run_test(
            "Get Financial Data",
            "GET",
            f"api/financial-data/{user_id}",
            200
        )

    def test_get_dashboard_data(self, user_id):
        """Test getting dashboard data"""
        return self.run_test(
            "Get Dashboard Data",
            "GET",
            f"api/dashboard/{user_id}",
            200
        )

def main():
    # Setup
    tester = FinPercentAPITester()
    
    # Test health endpoint
    tester.test_health()
    
    # Test user creation
    success, user_data = tester.test_create_user()
    if not success:
        print("❌ User creation failed, stopping tests")
        return 1
    
    user_id = user_data.get('id')
    username = user_data.get('username')
    
    # Test login
    if not tester.test_login(username, "TestPassword123!"):
        print("❌ Login failed, stopping tests")
        return 1
    
    # Test methods
    success, methods_data = tester.test_get_methods()
    if success and methods_data:
        print(f"Found {len(methods_data)} methods")
        for method in methods_data:
            print(f"Method: {method.get('name')}")
            method_id = method.get('name').lower()
            tester.test_get_method(method_id)
    
    # Test features
    success, features_data = tester.test_get_features()
    if success and features_data:
        print(f"Found {len(features_data)} features")
        for feature in features_data:
            print(f"Feature: {feature.get('name')}")
            feature_id = feature.get('name').lower()
            tester.test_get_feature(feature_id)
    
    # Test financial data
    tester.test_create_financial_data(user_id)
    tester.test_get_financial_data(user_id)
    tester.test_get_dashboard_data(user_id)
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())