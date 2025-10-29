#!/bin/bash

# Salesforce LWC Accessibility Demo Setup Script

echo "🚀 Setting up Salesforce LWC Accessibility Demo..."

# Check if Salesforce CLI is installed
if ! command -v sfdx &> /dev/null; then
    echo "❌ Salesforce CLI is not installed. Please install it first:"
    echo "   npm install -g @salesforce/cli"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Creating scratch org..."
sfdx force:org:create -f config/project-scratch-def.json -d 30 -s -a AccessibilityDemo

if [ $? -eq 0 ]; then
    echo "✅ Scratch org created successfully!"
    
    echo "📤 Deploying source code..."
    sfdx force:source:push
    
    if [ $? -eq 0 ]; then
        echo "✅ Source code deployed successfully!"
        
        echo "🧪 Running tests..."
        npm run test:unit
        
        echo "🔍 Running accessibility linting..."
        npm run lint
        
        echo ""
        echo "🎉 Setup complete!"
        echo ""
        echo "Next steps:"
        echo "1. Open the org: sfdx force:org:open"
        echo "2. Navigate to App Launcher → Accessibility Demo"
        echo "3. Explore the components and accessibility features"
        echo ""
        echo "Development commands:"
        echo "• npm run lint          - Check accessibility violations"
        echo "• npm run test:unit     - Run unit tests"
        echo "• sfdx force:source:push - Deploy changes to org"
        echo "• sfdx force:source:pull - Pull changes from org"
        echo ""
        
    else
        echo "❌ Failed to deploy source code"
        exit 1
    fi
else
    echo "❌ Failed to create scratch org"
    echo "Make sure you have a Dev Hub authorized:"
    echo "sfdx force:auth:web:login -d -a DevHub"
    exit 1
fi