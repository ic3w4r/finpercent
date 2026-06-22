#!/bin/bash

# FinPercent Setup Script
# Automates the setup of both Frontend (Node.js) and Backend (Python) environments.

set -e

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0;3b' # No Color
NC_BOLD='\033[1m'

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}🚀 FinPercent - Auto Setup Script${NC}"
echo -e "${BLUE}==================================================${NC}\n"

# Step 1: Check and Setup Frontend (Node.js)
echo -e "${NC_BOLD}📦 Step 1: Setting up Frontend...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Error: Node.js is not installed. Please install Node.js (v18+) and try again.${NC}"
    exit 1
fi
echo -e "✅ Node.js is installed ($(node -v))"

# Check for package manager
if command -v yarn &> /dev/null; then
    PKG_MANAGER="yarn"
    INSTALL_CMD="yarn install"
    echo -e "✅ Yarn is installed ($(yarn -v))"
else
    PKG_MANAGER="npm"
    INSTALL_CMD="npm install"
    echo -e "ℹ️  Yarn not found, using npm."
fi

echo -e "⏳ Installing frontend dependencies using ${PKG_MANAGER}..."
$INSTALL_CMD
echo -e "${GREEN}✅ Frontend dependencies installed successfully!${NC}\n"

# Step 2: Check and Setup Backend (Python)
echo -e "${NC_BOLD}🐍 Step 2: Setting up Backend (Python)...${NC}"
if ! command -v python3 &> /dev/null; then
    echo -e "${YELLOW}⚠️  Warning: Python 3 not found. You will only be able to run the frontend client.${NC}"
    echo -e "If you want to run the backend API server, please install Python 3.9+ and pip3, then re-run setup.${NC}\n"
else
    PYTHON_VER=$(python3 --version)
    echo -e "✅ Python 3 is installed (${PYTHON_VER})"
    
    # Create a virtual environment
    echo -e "⏳ Creating Python virtual environment in .venv..."
    if ! python3 -m venv .venv; then
        echo -e "${RED}❌ Failed to create virtual environment. Ensure the python3-venv package is installed.${NC}"
        echo -e "Continuing without virtual environment setup..."
    else
        echo -e "✅ Virtual environment created."
        
        # Activate virtualenv & install dependencies
        echo -e "⏳ Activating virtual environment and installing python dependencies..."
        source .venv/bin/activate
        
        # Upgrade pip inside virtualenv
        pip install --upgrade pip
        
        # Install dependencies
        if [ -f "requirements.txt" ]; then
            pip install -r requirements.txt
            echo -e "${GREEN}✅ Python dependencies installed successfully in .venv!${NC}\n"
            deactivate
        else
            echo -e "${RED}❌ Error: requirements.txt not found!${NC}\n"
        fi
    fi
fi

echo -e "${GREEN}==================================================${NC}"
echo -e "${GREEN}🎉 SETUP COMPLETE! FinPercent is ready to run.${NC}"
echo -e "${GREEN}==================================================${NC}\n"
echo -e "🚀 To start the application, run:"
echo -e "   ${BLUE}./run.sh${NC} (and select option 3 to run frontend & backend concurrently)"
echo ""
