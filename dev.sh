#!/bin/bash

# AUTONIX Development Script
echo "🔧 AUTONIX Development Mode"

# Check if Node.js is installed
if ! command -v node >/dev/null 2>&1; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install dependencies and run frontend in development mode
echo "Installing dependencies for AUTONIX Frontend..."
cd AUTONIX-Frontend
npm install

echo "🚀 Starting development server..."
echo "Frontend akan tersedia di: http://localhost:4324"
npm run dev