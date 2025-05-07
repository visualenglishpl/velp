import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { existsSync, readFileSync } from 'fs';
import type { Express } from 'express';

// Helper for getting file paths in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Add test routes to check server status
export function setupTestRoutes(app: Express) {
  console.log('Setting up test routes for diagnostics');
  
  // Serve a simple HTML test page
  app.get('/simple-test', (req, res) => {
    res.status(200).send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Visual English Server Test</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          .success { color: green; font-weight: bold; }
          .card { border: 1px solid #ddd; border-radius: 8px; padding: 15px; margin: 15px 0; }
        </style>
      </head>
      <body>
        <h1>Visual English Server Test</h1>
        <div class="card">
          <p class="success">✓ Server is responding correctly!</p>
          <p>This is a simple test page served from the Express server.</p>
          <p>Time: ${new Date().toLocaleString()}</p>
        </div>
        <div class="card">
          <h2>Navigation Tests</h2>
          <ul>
            <li><a href="/">Home Page</a></li>
            <li><a href="/debug">Debug Page</a></li>
            <li><a href="/simple/books/1/units/1">Simple Content Viewer</a></li>
          </ul>
        </div>
      </body>
      </html>
    `);
  });
  
  // Simple JSON endpoint for API testing
  app.get('/api/test', (req, res) => {
    res.status(200).json({
      success: true,
      message: 'API test endpoint is working correctly',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'not set'
    });
  });
  
  // Echo endpoint that returns whatever was sent
  app.post('/api/echo', (req, res) => {
    res.status(200).json({
      success: true,
      receivedData: req.body,
      timestamp: new Date().toISOString()
    });
  });
  
  console.log('Test routes initialized successfully');
}