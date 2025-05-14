/**
 * Simple Test Workflow
 * 
 * A minimal Express application that serves static files and provides
 * basic API endpoints for testing connectivity.
 */

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Basic API endpoint
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello, Visual English!',
    timestamp: new Date().toISOString(),
    serverInfo: {
      node: process.version,
      platform: process.platform
    }
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Visual English Test</title>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          line-height: 1.6;
        }
        .container {
          border: 1px solid #ddd;
          border-radius: 8px;
          padding: 20px;
          margin-top: 20px;
        }
        h1 {
          color: #333;
        }
        .success {
          color: #0a6e31;
          background-color: #d4edda;
          padding: 10px;
          border-radius: 4px;
        }
      </style>
    </head>
    <body>
      <h1>Visual English Test Page</h1>
      <div class="container">
        <p class="success">✅ Server is responding correctly</p>
        <p>If you can see this page, the server is working properly.</p>
        <p>Current time: ${new Date().toLocaleTimeString()}</p>
        <p>Try our <a href="/api/hello">/api/hello</a> endpoint for a JSON response.</p>
      </div>
    </body>
    </html>
  `);
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Test workflow running at http://0.0.0.0:${port}`);
});