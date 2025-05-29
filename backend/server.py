from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "FinPercent API is running"}

@app.get("/api/theme")
async def get_theme():
    return {"theme": "light", "message": "Theme retrieved successfully"}

@app.post("/api/theme")
async def set_theme(theme_data: dict):
    theme = theme_data.get("theme")
    if not theme or theme not in ["light", "dark"]:
        raise HTTPException(status_code=400, detail="Invalid theme value")
    return {"theme": theme, "message": "Theme updated successfully"}

@app.get("/api/stats/{time_range}")
async def get_stats(time_range: str):
    valid_ranges = ["7d", "30d", "90d", "1y"]
    if time_range not in valid_ranges:
        raise HTTPException(status_code=400, detail="Invalid time range")
    
    # Mock data for different time ranges
    return {
        "time_range": time_range,
        "stats": {
            "total_balance": "$24,576.89",
            "monthly_income": "$8,246.00",
            "monthly_expenses": "$5,127.42",
            "savings_rate": "37.8%",
            "investment_returns": "21.5%",
            "debt_reduction": "$12,459"
        },
        "message": "Stats retrieved successfully"
    }

@app.get("/api/explore/features")
async def get_features():
    return {
        "features": [
            {
                "id": 1,
                "title": "Budget Tracking",
                "description": "Track your monthly budget and expenses",
                "status": "Available"
            },
            {
                "id": 2,
                "title": "Investment Portfolio",
                "description": "Manage and track your investments",
                "status": "Beta"
            },
            {
                "id": 3,
                "title": "AI Financial Advisor",
                "description": "Get personalized financial advice",
                "status": "Coming Soon"
            }
        ],
        "message": "Features retrieved successfully"
    }

@app.get("/api/explore/tools")
async def get_tools():
    return {
        "tools": [
            {
                "id": 1,
                "title": "Expense Analyzer",
                "description": "Analyze your spending patterns",
                "rating": 4.8,
                "users": 12500
            },
            {
                "id": 2,
                "title": "Savings Calculator",
                "description": "Calculate your savings growth",
                "rating": 4.6,
                "users": 9800
            },
            {
                "id": 3,
                "title": "Debt Payoff Planner",
                "description": "Plan your debt payoff strategy",
                "rating": 4.9,
                "users": 15200
            }
        ],
        "message": "Tools retrieved successfully"
    }

@app.get("/api/explore/insights")
async def get_insights():
    return {
        "insights": [
            {
                "id": 1,
                "title": "Market Trends",
                "description": "Latest market trends and analysis"
            },
            {
                "id": 2,
                "title": "Financial Tips",
                "description": "Tips for better financial management"
            },
            {
                "id": 3,
                "title": "Investment Strategies",
                "description": "Strategies for successful investing"
            }
        ],
        "message": "Insights retrieved successfully"
    }
