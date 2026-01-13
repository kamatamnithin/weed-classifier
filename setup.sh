#!/bin/bash

echo "🌿 Weed Classifier - Quick Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed!"
    echo "Please install Node.js from https://nodejs.org"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo ""

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "⚠️  .env file not found!"
    echo "Creating .env from .env.example..."
    cp .env.example .env
    echo "✅ .env created - Please add your Hugging Face API key!"
else
    echo "✅ .env file exists"
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully!"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "Next steps:"
echo "1. Make sure your .env file has HUGGINGFACE_API_KEY"
echo "2. Follow FINAL_INTEGRATION_INSTRUCTIONS.md"
echo "3. Run: npm run dev"
echo ""
echo "📚 Documentation:"
echo "- QUICKSTART.md - Quick 5-minute guide"
echo "- FINAL_INTEGRATION_INSTRUCTIONS.md - Integration steps"
echo "- VS_CODE_STEPS.md - Visual walkthrough"
echo ""
echo "Ready to start? Run: npm run dev"
