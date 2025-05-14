/**
 * Simple Express Server for Testing
 * 
 * This is an ultra-minimal Express server for testing basic connectivity.
 * It binds to 0.0.0.0:5000 and should be accessible via the Replit webview.
 */

const express = require('express');
const app = express();
const port = 5000;

// Simple health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'up',
    timestamp: new Date().toISOString(),
    message: 'Simple Express server is running'
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Simple Server Test</title>
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
        .card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 20px;
          margin-bottom: 20px;
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
      <h1>Simple Express Server Test</h1>
      <div class="card">
        <p class="success">✅ Server is responding correctly</p>
        <p>If you can see this page, the basic Express server is working.</p>
        <p>Current time: ${new Date().toLocaleTimeString()}</p>
        <p>You can also check the <a href="/health">/health</a> endpoint for a JSON response.</p>
      </div>
    </body>
    </html>
  `);
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Simple Express server running at http://0.0.0.0:${port}`);
});