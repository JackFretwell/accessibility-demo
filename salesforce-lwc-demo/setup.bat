@echo off
REM Salesforce LWC Accessibility Demo Setup Script for Windows

echo 🚀 Setting up Salesforce LWC Accessibility Demo...

REM Check if Salesforce CLI is installed
sfdx --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Salesforce CLI is not installed. Please install it first:
    echo    npm install -g @salesforce/cli
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ first.
    exit /b 1
)

echo 📦 Installing dependencies...
call npm install

echo 🏗️  Creating scratch org...
call sfdx force:org:create -f config/project-scratch-def.json -d 30 -s -a AccessibilityDemo

if %errorlevel% equ 0 (
    echo ✅ Scratch org created successfully!
    
    echo 📤 Deploying source code...
    call sfdx force:source:push
    
    if %errorlevel% equ 0 (
        echo ✅ Source code deployed successfully!
        
        echo 🧪 Running tests...
        call npm run test:unit
        
        echo 🔍 Running accessibility linting...
        call npm run lint
        
        echo.
        echo 🎉 Setup complete!
        echo.
        echo Next steps:
        echo 1. Open the org: sfdx force:org:open
        echo 2. Navigate to App Launcher → Accessibility Demo
        echo 3. Explore the components and accessibility features
        echo.
        echo Development commands:
        echo • npm run lint          - Check accessibility violations
        echo • npm run test:unit     - Run unit tests
        echo • sfdx force:source:push - Deploy changes to org
        echo • sfdx force:source:pull - Pull changes from org
        echo.
        
    ) else (
        echo ❌ Failed to deploy source code
        exit /b 1
    )
) else (
    echo ❌ Failed to create scratch org
    echo Make sure you have a Dev Hub authorized:
    echo sfdx force:auth:web:login -d -a DevHub
    exit /b 1
)