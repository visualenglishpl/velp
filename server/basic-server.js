/**
 * Basic Express Server for Visual English
 * 
 * A simplified version of the server that focuses purely on serving 
 * static content and basic API endpoints without Vite middleware.
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Basic API endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    message: 'Visual English API is working correctly'
  });
});

// Admin authentication endpoint
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'admin123') {
    res.json({
      success: true,
      user: {
        id: 1,
        username: 'admin',
        role: 'admin'
      },
      message: 'Admin login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Direct admin auth endpoint
app.get('/api/direct-admin-auth', (req, res) => {
  res.json({
    success: true,
    user: {
      id: 1,
      username: 'admin',
      role: 'admin'
    },
    message: 'Direct admin authentication successful'
  });
});

// Serve our custom index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'simple-index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Basic Visual English server running at http://0.0.0.0:${port}`);
});