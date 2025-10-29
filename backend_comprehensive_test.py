import requests
import json
import uuid
import sys
from datetime import datetime

class ComprehensiveAPITester:
    def __init__(self, base_url="http://localhost:8001"):
        self.base_url = base_url
        self.token = None
        self.user_id = None
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

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
                self.failed_tests.append(f"{name}: Expected {expected_status}, got {response.status_code}")
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    print(f"Response: {response.text}")
                    return False, response.json()
                except:
                    return False, {}

        except Exception as e:
            self.failed_tests.append(f"{name}: Error - {str(e)}")
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_endpoint(self):
        """Test health endpoint"""
        success, response = self.run_test("Health Check", "GET", "api/health", 200)
        if success:
            assert "status" in response, "Health response missing status"
            assert response["status"] == "healthy", "Health status not healthy"
            assert "timestamp" in response, "Health response missing timestamp"
            print(f"   Health status: {response['status']}")
        return success

    def test_user_management(self):
        """Test complete user management flow"""
        # Test user creation with valid data
        username = f"john_doe_{uuid.uuid4().hex[:8]}"
        email = f"{username}@finpercent.com"
        password = "SecurePass123!"
        
        success, user_data = self.run_test(
            "Create User - Valid Data",
            "POST",
            "api/users",
            201,
            data={"username": username, "email": email, "password": password}
        )
        
        if not success:
            return False
            
        self.user_id = user_data.get('id')
        assert self.user_id, "User ID not returned"
        assert user_data.get('username') == username, "Username mismatch"
        assert user_data.get('email') == email, "Email mismatch"
        print(f"   Created user: {username} with ID: {self.user_id}")
        
        # Test user creation with invalid data
        self.run_test(
            "Create User - Missing Fields",
            "POST",
            "api/users",
            422,
            data={"username": "incomplete"}
        )
        
        # Test login with valid credentials
        success, login_response = self.run_test(
            "Login - Valid Credentials",
            "POST",
            "api/login",
            200,
            data={"username": username, "password": password}
        )
        
        if success:
            self.token = login_response.get('access_token')
            assert self.token, "Access token not returned"
            assert login_response.get('user_id') == self.user_id, "User ID mismatch in login"
            print(f"   Login successful, token: {self.token[:20]}...")
        
        # Test login with invalid credentials
        self.run_test(
            "Login - Invalid Credentials",
            "POST",
            "api/login",
            401,
            data={"username": username, "password": "wrongpassword"}
        )
        
        return success

    def test_methods_endpoints(self):
        """Test methods endpoints thoroughly"""
        # Test getting all methods
        success, methods_data = self.run_test("Get All Methods", "GET", "api/methods", 200)
        if not success:
            return False
            
        assert isinstance(methods_data, list), "Methods should be a list"
        assert len(methods_data) == 3, f"Expected 3 methods, got {len(methods_data)}"
        
        expected_methods = ["nws", "kakeibo", "stop"]
        actual_methods = [method.get('id') for method in methods_data]
        
        for expected in expected_methods:
            assert expected in actual_methods, f"Method {expected} not found"
            
        print(f"   Found methods: {', '.join(actual_methods)}")
        
        # Test individual method endpoints
        for method in methods_data:
            method_id = method.get('id')
            success, method_detail = self.run_test(
                f"Get Method - {method_id}",
                "GET",
                f"api/methods/{method_id}",
                200
            )
            if success:
                assert method_detail.get('id') == method_id, f"Method ID mismatch for {method_id}"
                assert method_detail.get('name'), f"Method name missing for {method_id}"
                assert method_detail.get('description'), f"Method description missing for {method_id}"
        
        # Test non-existent method
        self.run_test(
            "Get Method - Non-existent",
            "GET",
            "api/methods/nonexistent",
            404
        )
        
        return True

    def test_features_endpoints(self):
        """Test features endpoints thoroughly"""
        # Test getting all features
        success, features_data = self.run_test("Get All Features", "GET", "api/features", 200)
        if not success:
            return False
            
        assert isinstance(features_data, list), "Features should be a list"
        assert len(features_data) == 3, f"Expected 3 features, got {len(features_data)}"
        
        expected_features = ["investment-pooling", "automated-banking", "debt-repayment"]
        actual_features = [feature.get('id') for feature in features_data]
        
        for expected in expected_features:
            assert expected in actual_features, f"Feature {expected} not found"
            
        print(f"   Found features: {', '.join(actual_features)}")
        
        # Test individual feature endpoints
        for feature in features_data:
            feature_id = feature.get('id')
            success, feature_detail = self.run_test(
                f"Get Feature - {feature_id}",
                "GET",
                f"api/features/{feature_id}",
                200
            )
            if success:
                assert feature_detail.get('id') == feature_id, f"Feature ID mismatch for {feature_id}"
                assert feature_detail.get('name'), f"Feature name missing for {feature_id}"
                assert feature_detail.get('status'), f"Feature status missing for {feature_id}"
        
        # Test non-existent feature
        self.run_test(
            "Get Feature - Non-existent",
            "GET",
            "api/features/nonexistent",
            404
        )
        
        return True

    def test_financial_data_flow(self):
        """Test complete financial data management flow"""
        if not self.user_id:
            print("❌ Cannot test financial data without user ID")
            return False
            
        # Test creating financial data
        financial_data = {
            "user_id": self.user_id,
            "income": 75000.0,
            "expenses": {
                "housing": 2500.0,
                "food": 800.0,
                "transportation": 600.0,
                "entertainment": 400.0,
                "utilities": 300.0,
                "healthcare": 200.0,
                "other": 700.0
            },
            "savings": 15000.0,
            "investments": {
                "stocks": 8000.0,
                "bonds": 3000.0,
                "real_estate": 4000.0,
                "crypto": 1000.0
            }
        }
        
        success, created_data = self.run_test(
            "Create Financial Data",
            "POST",
            "api/financial-data",
            201,
            data=financial_data
        )
        
        if not success:
            return False
            
        assert created_data.get('user_id') == self.user_id, "User ID mismatch in financial data"
        assert created_data.get('income') == 75000.0, "Income mismatch"
        assert isinstance(created_data.get('expenses'), dict), "Expenses should be a dict"
        assert isinstance(created_data.get('investments'), dict), "Investments should be a dict"
        print(f"   Created financial data for user: {self.user_id}")
        
        # Test retrieving financial data
        success, retrieved_data = self.run_test(
            "Get Financial Data",
            "GET",
            f"api/financial-data/{self.user_id}",
            200
        )
        
        if success:
            assert retrieved_data.get('user_id') == self.user_id, "Retrieved user ID mismatch"
            assert retrieved_data.get('income') == 75000.0, "Retrieved income mismatch"
            print(f"   Retrieved financial data successfully")
        
        # Test getting financial data for non-existent user
        fake_user_id = str(uuid.uuid4())
        self.run_test(
            "Get Financial Data - Non-existent User",
            "GET",
            f"api/financial-data/{fake_user_id}",
            404
        )
        
        return success

    def test_dashboard_endpoint(self):
        """Test dashboard endpoint"""
        if not self.user_id:
            print("❌ Cannot test dashboard without user ID")
            return False
            
        success, dashboard_data = self.run_test(
            "Get Dashboard Data",
            "GET",
            f"api/dashboard/{self.user_id}",
            200
        )
        
        if not success:
            return False
            
        # Verify dashboard structure
        assert 'user' in dashboard_data, "Dashboard missing user data"
        assert 'financial_summary' in dashboard_data, "Dashboard missing financial summary"
        assert 'badge_status' in dashboard_data, "Dashboard missing badge status"
        assert 'company_status' in dashboard_data, "Dashboard missing company status"
        
        user_data = dashboard_data['user']
        assert user_data.get('id') == self.user_id, "Dashboard user ID mismatch"
        
        company_status = dashboard_data['company_status']
        assert company_status.get('rating'), "Company status missing rating"
        assert company_status.get('performance_score'), "Company status missing performance score"
        assert company_status.get('market_position'), "Company status missing market position"
        
        print(f"   Dashboard data verified for user: {self.user_id}")
        print(f"   Badge status: {dashboard_data.get('badge_status')}")
        print(f"   Company rating: {company_status.get('rating')}")
        
        # Test dashboard for non-existent user
        fake_user_id = str(uuid.uuid4())
        self.run_test(
            "Get Dashboard Data - Non-existent User",
            "GET",
            f"api/dashboard/{fake_user_id}",
            404
        )
        
        return True

    def run_comprehensive_tests(self):
        """Run all comprehensive tests"""
        print("🚀 Starting Comprehensive Backend API Testing...")
        print("=" * 60)
        
        # Test health endpoint
        if not self.test_health_endpoint():
            print("❌ Health endpoint failed, stopping tests")
            return False
            
        # Test user management
        if not self.test_user_management():
            print("❌ User management failed, stopping tests")
            return False
            
        # Test methods endpoints
        if not self.test_methods_endpoints():
            print("❌ Methods endpoints failed")
            
        # Test features endpoints
        if not self.test_features_endpoints():
            print("❌ Features endpoints failed")
            
        # Test financial data flow
        if not self.test_financial_data_flow():
            print("❌ Financial data flow failed")
            
        # Test dashboard endpoint
        if not self.test_dashboard_endpoint():
            print("❌ Dashboard endpoint failed")
        
        # Print final results
        print("\n" + "=" * 60)
        print(f"📊 COMPREHENSIVE TEST RESULTS")
        print(f"Tests passed: {self.tests_passed}/{self.tests_run}")
        print(f"Success rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ Failed Tests:")
            for failed_test in self.failed_tests:
                print(f"   - {failed_test}")
        else:
            print(f"\n✅ All tests passed successfully!")
            
        return self.tests_passed == self.tests_run

def main():
    tester = ComprehensiveAPITester()
    success = tester.run_comprehensive_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())