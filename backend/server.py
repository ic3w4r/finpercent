from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Dict, List, Optional
import uuid
from datetime import datetime
import os

app = FastAPI(title="FinPercent API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage (for testing purposes)
users_db = {}
financial_data_db = {}
methods_db = [
    {"id": "nws", "name": "NWS", "description": "Needs, Wants, Savings method"},
    {"id": "kakeibo", "name": "Kakeibo", "description": "Japanese budgeting method"},
    {"id": "stop", "name": "STOP", "description": "Savings, Taxes, Operations, Profit method"}
]
features_db = [
    {"id": "investment-pooling", "name": "Investment Pooling", "status": "active"},
    {"id": "automated-banking", "name": "Automated Banking", "status": "beta"},
    {"id": "debt-repayment", "name": "Debt Repayment", "status": "available"}
]

# Pydantic models
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

class FinancialData(BaseModel):
    user_id: str
    income: float
    expenses: Dict[str, float]
    savings: float
    investments: Dict[str, float]

# Routes
@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.post("/api/users", response_model=UserResponse, status_code=201)
async def create_user(user: User):
    user_id = str(uuid.uuid4())
    users_db[user_id] = {
        "id": user_id,
        "username": user.username,
        "email": user.email,
        "password": user.password,  # In real app, hash this
        "created_at": datetime.now().isoformat()
    }
    return UserResponse(id=user_id, username=user.username, email=user.email)

@app.post("/api/login")
async def login(login_request: LoginRequest):
    # Find user by username
    user = None
    for uid, user_data in users_db.items():
        if user_data["username"] == login_request.username:
            user = user_data
            break
    
    if not user or user["password"] != login_request.password:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # In real app, generate JWT token
    return {
        "access_token": f"token_{user['id']}",
        "token_type": "bearer",
        "user_id": user["id"]
    }

@app.get("/api/methods")
async def get_methods():
    return methods_db

@app.get("/api/methods/{method_id}")
async def get_method(method_id: str):
    method = next((m for m in methods_db if m["id"] == method_id), None)
    if not method:
        raise HTTPException(status_code=404, detail="Method not found")
    return method

@app.get("/api/features")
async def get_features():
    return features_db

@app.get("/api/features/{feature_id}")
async def get_feature(feature_id: str):
    feature = next((f for f in features_db if f["id"] == feature_id), None)
    if not feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    return feature

@app.post("/api/financial-data", status_code=201)
async def create_financial_data(data: FinancialData):
    data_id = str(uuid.uuid4())
    financial_data_db[data.user_id] = {
        "id": data_id,
        "user_id": data.user_id,
        "income": data.income,
        "expenses": data.expenses,
        "savings": data.savings,
        "investments": data.investments,
        "created_at": datetime.now().isoformat()
    }
    return financial_data_db[data.user_id]

@app.get("/api/financial-data/{user_id}")
async def get_financial_data(user_id: str):
    if user_id not in financial_data_db:
        raise HTTPException(status_code=404, detail="Financial data not found")
    return financial_data_db[user_id]

@app.get("/api/dashboard/{user_id}")
async def get_dashboard_data(user_id: str):
    if user_id not in users_db:
        raise HTTPException(status_code=404, detail="User not found")
    
    financial_data = financial_data_db.get(user_id)
    user_data = users_db[user_id]
    
    dashboard_data = {
        "user": {
            "id": user_data["id"],
            "username": user_data["username"],
            "email": user_data["email"]
        },
        "financial_summary": financial_data if financial_data else None,
        "badge_status": "gold",
        "company_status": {
            "rating": "Gold",
            "performance_score": 92,
            "market_position": "Top 15%"
        }
    }
    
    return dashboard_data

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)