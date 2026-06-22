#!/bin/bash

# FinPercent Run Script
# Provides an interactive CLI to run the frontend, backend, or both concurrently.

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color
NC_BOLD='\033[1m'

echo -e "${BLUE}==================================================${NC}"
echo -e "${BLUE}⚡ FinPercent - Launch Control${NC}"
echo -e "${BLUE}==================================================${NC}\n"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}⚠️  Warning: node_modules folder not found. Running setup first...${NC}"
    ./setup.sh
fi

# Detect package manager
if command -v yarn &> /dev/null; then
    RUN_CMD="yarn dev"
else
    RUN_CMD="npm run dev"
fi

# Determine python command
PYTHON_CMD="python3"
if [ -d ".venv" ]; then
    PYTHON_CMD=".venv/bin/python3"
fi

echo -e "Please choose an option to run the application:"
echo -e "  [1] Run Frontend Client Only (${RUN_CMD})"
echo -e "  [2] Run Backend API Server Only (FastAPI)"
echo -e "  [3] Run Frontend & Backend Concurrently (Recommended)"
echo -e "  [4] Exit"
echo ""
read -p "Select option [1-4]: " OPTION

case $OPTION in
    1)
        echo -e "\n🚀 Starting Frontend Client..."
        $RUN_CMD
        ;;
    2)
        echo -e "\n🚀 Starting Backend API Server..."
        if ! command -v $PYTHON_CMD &> /dev/null && [ "$PYTHON_CMD" = "python3" ]; then
            echo -e "${RED}❌ Error: Python 3 is not installed or configured.${NC}"
            exit 1
        fi
        $PYTHON_CMD backend/server.py
        ;;
    3)
        echo -e "\n🚀 Starting Frontend & Backend Concurrently..."
        
        # Start backend in the background
        if [ -d ".venv" ] || command -v python3 &> /dev/null; then
            echo -e "📡 Starting Backend API on ${BLUE}http://localhost:8001${NC}..."
            $PYTHON_CMD backend/server.py > backend.log 2>&1 &
            BACKEND_PID=$!
            
            # Setup trap to kill backend process on script exit/interrupted
            trap "echo -e '\n🛑 Stopping backend server (PID $BACKEND_PID)...'; kill $BACKEND_PID 2>/dev/null || true; exit" EXIT INT TERM
            
            # Brief sleep to let backend start up
            sleep 2
            
            if kill -0 $BACKEND_PID 2>/dev/null; then
                echo -e "✅ Backend API running successfully (PID $BACKEND_PID)."
            else
                echo -e "${RED}❌ Error: Backend failed to start. Check backend.log for details.${NC}"
            fi
        else
            echo -e "${YELLOW}⚠️  Warning: Python 3 not available. Skipping backend startup.${NC}"
        fi
        
        # Start frontend in the foreground
        echo -e "💻 Starting Frontend Client..."
        $RUN_CMD
        ;;
    4)
        echo -e "Exiting..."
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Invalid option. Exiting...${NC}"
        exit 1
        ;;
esac
