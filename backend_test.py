import requests
import sys
from datetime import datetime
import time

class FinPercentAPITester:
    def __init__(self, base_url="http://localhost:8001/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0

    def run_test(self, name, method, endpoint, expected_status, data=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}
        
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
                if response.status_code != 204:  # No content
                    print(f"Response: {response.json()}")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                if response.text:
                    print(f"Response: {response.text}")

            return success, response.json() if success and response.status_code != 204 else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test the health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "health",
            200
        )

    def test_get_theme(self):
        """Test getting the theme"""
        return self.run_test(
            "Get Theme",
            "GET",
            "theme",
            200
        )

    def test_set_theme(self, theme):
        """Test setting the theme"""
        return self.run_test(
            f"Set Theme to {theme}",
            "POST",
            "theme",
            200,
            data={"theme": theme}
        )

    def test_get_stats(self, time_range):
        """Test getting stats for a specific time range"""
        return self.run_test(
            f"Get Stats for {time_range}",
            "GET",
            f"stats/{time_range}",
            200
        )

    def test_get_explore_features(self):
        """Test getting explore features"""
        return self.run_test(
            "Get Explore Features",
            "GET",
            "explore/features",
            200
        )

    def test_get_explore_tools(self):
        """Test getting explore tools"""
        return self.run_test(
            "Get Explore Tools",
            "GET",
            "explore/tools",
            200
        )

    def test_get_explore_insights(self):
        """Test getting explore insights"""
        return self.run_test(
            "Get Explore Insights",
            "GET",
            "explore/insights",
            200
        )

def main():
    # Setup
    tester = FinPercentAPITester()
    
    # Wait for backend to be ready
    print("Waiting for backend to be ready...")
    time.sleep(2)
    
    # Run tests
    tester.test_health_check()
    
    # Theme tests
    tester.test_get_theme()
    tester.test_set_theme("dark")
    tester.test_set_theme("light")
    
    # Stats tests
    for time_range in ["7d", "30d", "90d", "1y"]:
        tester.test_get_stats(time_range)
    
    # Explore tests
    tester.test_get_explore_features()
    tester.test_get_explore_tools()
    tester.test_get_explore_insights()
    
    # Print results
    print(f"\n📊 Tests passed: {tester.tests_passed}/{tester.tests_run}")
    return 0 if tester.tests_passed == tester.tests_run else 1

if __name__ == "__main__":
    sys.exit(main())
