/**
 * Production Server for Visual English
 * 
 * This is a simplified server designed to serve the production build of the application
 * without relying on Vite's development server or HMR functionality.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import compression from 'compression';
import helmet from 'helmet';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express app
const app = express();

// Enable compression to reduce response size
app.use(compression());

// Set security headers but allow embedding in iframes
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Parse JSON bodies with increased limit
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// Log requests
app.use((req, res, next) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${timestamp} ${req.method} ${req.path}`);
  next();
});

// Add caching headers for static assets
app.use((req, res, next) => {
  if (!req.path.startsWith('/api/') && req.method === 'GET') {
    // Images, fonts, and other static assets cache for 1 day
    if (req.path.match(/\.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    // CSS/JS files cache for 2 hours
    else if (req.path.match(/\.(css|js)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=7200');
    }
  }
  next();
});

// Check multiple possible build paths
const possiblePaths = [
  path.resolve(__dirname, "../dist/"),
  path.resolve(__dirname, "../dist/public/"),
  path.resolve(__dirname, "../public/")
];

let distPath = null;

// Find the first valid dist path
for (const p of possiblePaths) {
  if (fs.existsSync(p) && fs.existsSync(path.join(p, "index.html"))) {
    distPath = p;
    console.log(`Using build directory: ${distPath}`);
    break;
  }
}

if (!distPath) {
  console.warn("Warning: Could not find a valid build directory. Please run 'npm run build' before starting the production server.");
  // Use a default path
  distPath = path.resolve(__dirname, "../dist/");
}

// Serve static files from the build directory
app.use(express.static(distPath, {
  maxAge: '1d' // Add 1 day caching for static assets
}));

// Import API routes from the main Express server
import { registerContentEndpoints } from './optimized-content-endpoints.js';
import { registerRoutes } from './routes.js';

// Register API routes
registerContentEndpoints(app);

// API mock/proxy route handler for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working in production mode' });
});

// Create HTTP server - needed for WebSocket support
const http = await import('http');
const server = http.createServer(app);

// Register additional routes that might need the http server (like WebSockets)
try {
  await registerRoutes(app, server);
} catch (error) {
  console.error('Error registering main routes:', error);
}

// Setup WebSocket server
import { setupWebSocketServer } from './websocket-server.js';
const wss = setupWebSocketServer(server);
console.log('WebSocket server attached to HTTP server');

// Setup diagnostic endpoint
app.get('/api/diagnostics', (req, res) => {
  res.json({
    status: 'ok',
    serverTime: new Date().toISOString(),
    websocketConnections: wss.clients.size,
    uptime: process.uptime(),
    mode: 'production'
  });
});

// Special route for the test page
app.get('/test', (req, res) => {
  const testHtmlPath = path.resolve(__dirname, '../client/public/test.html');
  if (fs.existsSync(testHtmlPath)) {
    res.sendFile(testHtmlPath);
  } else {
    res.status(404).send('Test page not found');
  }
});

// SPA route - serve index.html for all non-matched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Start the server using the HTTP server (which has WebSocket support)
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Production server running at http://0.0.0.0:${PORT}`);
});

// Handle server errors
server.on('error', (error) => {
  console.error('Server error:', error);
  
  // Attempt to recover if the port is in use
  if (error.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is in use. Trying a different port...`);
    server.listen(5001, '0.0.0.0', () => {
      console.log(`Server restarted on http://0.0.0.0:5001`);
    });
  }
});

// Handle process termination signals
process.on('SIGINT', () => {
  console.log('Shutting down server gracefully...');
  server.close(() => {
    console.log('Server closed successfully.');
    process.exit(0);
  });
});
