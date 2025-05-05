# WebSocket Support Implementation

This document explains how we're implementing WebSocket support in the Visual English platform to improve connectivity and real-time features.

## Challenge
The original application using Vite's development server is having connection issues in the Replit environment, particularly with WebSocket connections failing.

## Solution
Implement a production-grade server that:
1. Serves static files built with Vite
2. Provides explicit WebSocket support on a clear path
3. Integrates with existing Express API endpoints
4. Handles correct routing for SPA navigation

## Implementation

### 1. Production Server
A dedicated production server that:
- Serves static files with proper caching headers
- Correctly sets up CORS and security policies
- Integrates Express API endpoints
- Creates a proper HTTP server for WebSocket support

### 2. WebSocket Setup
The WebSocket server is created with:
```javascript
// Create HTTP server - needed for WebSocket support
const server = http.createServer(app);

// Set up WebSocket server on the same HTTP server
const wss = new WebSocketServer({ server, path: '/ws' });
```

### 3. Client Connection
On the client side, connections are established with:
```javascript
const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
const wsUrl = `${protocol}//${window.location.host}/ws`;
const socket = new WebSocket(wsUrl);
```

### 4. Production Build
When running in production mode, the application:
1. Compiles TypeScript to JavaScript
2. Builds client-side code with Vite
3. Serves the static build with the production server
4. Maintains all API functionality

## Testing
We've created a test-server.js script to verify WebSocket connectivity in isolation from the main application.

## Benefits
- More stable connections in the Replit environment
- Better performance with static file serving
- Cleaner separation of development and production environments
- Enhanced reliability for WebSocket-dependent features