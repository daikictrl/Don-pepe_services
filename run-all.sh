#!/bin/bash

echo "🚀 Starting Don Pépé Services..."
echo "📡 Starting backend server on port 3000..."
npm run server &
SERVER_PID=$!

sleep 2

echo "🎨 Starting frontend server on port 5000..."
npm run dev &
FRONTEND_PID=$!

wait $SERVER_PID $FRONTEND_PID
