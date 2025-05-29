from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
import uuid
from typing import List, Optional, Dict, Any

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory database for demo purposes
db = {
    "users": {},
    "financial_data": {},
    "methods": {
        "nws": {"name": "NWS Method", "description": "Necessities, Wants, Savings guide"},
        "kakeibo": {"name": "Kakeibo Method", "description": "Japanese budgeting method"},
        "stop": {"name": "STOP Method", "description": "Financial strategy guide"}
    },
    "features": {
        "super_features": {"name": "Super Features", "description": "Advanced platform features"},
        "stock_market": {"name": "Stock Market", "description": "Market analysis and trading"},
        "investment_pooling": {"name": "Investment Pooling", "description": "Collaborative investing"},
        "automated_banking": {"name": "Automated Banking", "description": "Banking automation"},
        "debt_repayment": {"name": "Debt Repayment", "description": "Debt management tools"},
        "finring": {"name": "Finring", "description": "Community features"}
    }
}

# Models
class User(BaseModel):
    username: str
    email: str
    password: str

class UserResponse(BaseModel):
    id: str
    username: str
    email: str

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class FinancialData(BaseModel):
    user_id: str
    income: float
    expenses: Dict[str, float]
    savings: float
    investments: Dict[str, float]

class MethodData(BaseModel):
    name: str
    description: str
    details: Optional[Dict[str, Any]] = None

class FeatureData(BaseModel):
    name: str
    description: str
    details: Optional[Dict[str, Any]] = None

# Routes
@app.get("/api/health")
def health_check():
    return {"status": "healthy"}

@app.post("/api/users", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def create_user(user: User):
    user_id = str(uuid.uuid4())
    db["users"][user_id] = {
        "id": user_id,
        "username": user.username,
        "email": user.email,
        "password": user.password  # In a real app, this would be hashed
    }
    return {
        "id": user_id,
        "username": user.username,
        "email": user.email
    }

@app.post("/api/login", response_model=TokenResponse)
def login(login_data: LoginRequest):
    # Find user by username
    user = None
    for user_id, user_data in db["users"].items():
        if user_data["username"] == login_data.username and user_data["password"] == login_data.password:
            user = user_data
            break
    
    if not user:
        # For demo purposes, create a user if not found
        user_id = str(uuid.uuid4())
        db["users"][user_id] = {
            "id": user_id,
            "username": login_data.username,
            "email": f"{login_data.username}@example.com",
            "password": login_data.password
        }
        user = db["users"][user_id]
    
    # Generate a simple token (in a real app, use JWT)
    token = f"demo_token_{user['id']}"
    
    return {
        "access_token": token,
        "token_type": "bearer"
    }

@app.get("/api/methods/{method_id}", response_model=MethodData)
def get_method(method_id: str):
    if method_id not in db["methods"]:
        raise HTTPException(status_code=404, detail="Method not found")
    return db["methods"][method_id]

@app.get("/api/methods", response_model=List[MethodData])
def get_methods():
    return [{"name": data["name"], "description": data["description"]} for data in db["methods"].values()]

@app.get("/api/features/{feature_id}", response_model=FeatureData)
def get_feature(feature_id: str):
    if feature_id not in db["features"]:
        raise HTTPException(status_code=404, detail="Feature not found")
    return db["features"][feature_id]

@app.get("/api/features", response_model=List[FeatureData])
def get_features():
    return [{"name": data["name"], "description": data["description"]} for data in db["features"].values()]

@app.post("/api/financial-data", status_code=status.HTTP_201_CREATED)
def create_financial_data(data: FinancialData):
    data_id = str(uuid.uuid4())
    db["financial_data"][data_id] = data.dict()
    return {"id": data_id}

@app.get("/api/financial-data/{user_id}")
def get_financial_data(user_id: str):
    # Find financial data for user
    for data_id, data in db["financial_data"].items():
        if data["user_id"] == user_id:
            return data
    
    # Return default data if none exists
    return {
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
            "crypto": 200
        }
    }

@app.get("/api/dashboard/{user_id}")
def get_dashboard_data(user_id: str):
    # Get financial data for the user
    financial_data = None
    for data_id, data in db["financial_data"].items():
        if data["user_id"] == user_id:
            financial_data = data
            break
    
    # Use default data if none exists
    if not financial_data:
        financial_data = {
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
                "crypto": 200
            }
        }
    
    # Calculate some stats
    total_expenses = sum(financial_data["expenses"].values())
    total_investments = sum(financial_data["investments"].values())
    
    return {
        "financial_summary": {
            "income": financial_data["income"],
            "total_expenses": total_expenses,
            "savings": financial_data["savings"],
            "total_investments": total_investments,
            "net_worth": financial_data["income"] - total_expenses + financial_data["savings"] + total_investments
        },
        "expense_breakdown": financial_data["expenses"],
        "investment_breakdown": financial_data["investments"],
        "savings_rate": (financial_data["savings"] / financial_data["income"]) * 100 if financial_data["income"] > 0 else 0,
        "investment_rate": (total_investments / financial_data["income"]) * 100 if financial_data["income"] > 0 else 0
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)