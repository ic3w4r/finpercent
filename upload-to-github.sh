#!/bin/bash

# FinPercent GitHub Upload Script
# Run this script to upload your FinPercent application to GitHub

echo "🚀 FinPercent GitHub Upload Script"
echo "=================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Error: Not a git repository"
    echo "Please run this script from your FinPercent project directory"
    exit 1
fi

# Get GitHub repository URL from user
echo "📝 Please enter your GitHub repository URL:"
echo "Example: https://github.com/yourusername/finpercent.git"
read -p "Repository URL: " REPO_URL

if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Repository URL is required"
    exit 1
fi

echo ""
echo "🔗 Adding GitHub remote origin..."
git remote add origin "$REPO_URL" 2>/dev/null || {
    echo "⚠️  Remote origin already exists, updating..."
    git remote set-url origin "$REPO_URL"
}

echo "📤 Pushing to GitHub..."
git branch -M main
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ SUCCESS! FinPercent has been uploaded to GitHub!"
    echo ""
    echo "🌐 Your repository is now live at:"
    echo "${REPO_URL%.git}"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Visit your repository on GitHub"
    echo "2. Check that all files are uploaded correctly"
    echo "3. Consider enabling GitHub Pages for live demo"
    echo "4. Add repository topics for better discoverability"
    echo ""
    echo "🎉 Your professional financial dashboard is now on GitHub!"
else
    echo ""
    echo "❌ Upload failed. Please check:"
    echo "1. Repository URL is correct"
    echo "2. You have push access to the repository"
    echo "3. GitHub authentication is set up"
    echo ""
    echo "💡 You can also manually upload using:"
    echo "git remote add origin $REPO_URL"
    echo "git branch -M main"
    echo "git push -u origin main"
fi