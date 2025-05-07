/**
 * Simple standalone API server for testing
 * Runs on a separate port (5001) to ensure no conflicts with Vite
 */

const express = require('express');
const cors = require('cors');
const http = require('http');

// Create a simple Express app
const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:5000', // Allow the main app to connect
  credentials: true
}));

// Parse JSON body
app.use(express.json());

// Basic logging middleware
app.use((req, res, next) => {
  console.log(`[API Server] ${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// API Routes
app.get('/api/healthcheck', (req, res) => {
  console.log('Health check endpoint hit on dedicated API server');
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    server: 'dedicated-api-server',
    port: 5001
  });
});

app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit on dedicated API server');
  res.json({
    message: 'API test endpoint is working on dedicated server',
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path
  });
});

// Create HTTP server
const server = http.createServer(app);

// Start server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Dedicated API server running on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down dedicated API server...');
  server.close(() => {
    console.log('Dedicated API server closed');
    process.exit(0);
  });
});