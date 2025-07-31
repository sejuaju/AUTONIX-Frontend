#!/bin/bash

# AUTONIX Platform Runner Script
echo "🚀 AUTONIX Platform Setup"

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check dependencies
echo "Checking dependencies..."
if ! command_exists docker; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Build and run
echo "Building and starting AUTONIX Platform..."
docker compose down
docker compose build --no-cache
docker compose up -d

echo "✅ AUTONIX Platform is starting..."
echo "🌐 Website akan tersedia di: http://localhost:8000"
echo "📄 Whitepaper: http://localhost:8000/whitepaper/"
echo "🖥️  Frontend: http://localhost:8000/autonix-frontend/"

# Wait for container to be ready
echo "Waiting for container to be ready..."
sleep 5

# Check if container is running
if docker ps | grep -q autonix-platform; then
    echo "✅ Container is running successfully!"
    echo "📊 Logs: docker compose logs -f"
    echo "🛑 Stop: docker compose down"
else
    echo "❌ Container failed to start. Check logs:"
    docker compose logs
fi