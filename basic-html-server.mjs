/**
 * Extremely Basic HTML Server
 * 
 * This is the most minimal server possible, designed specifically to work
 * with the web application feedback tool. It serves only basic HTML.
 */

import http from 'http';

const server = http.createServer((req, res) => {
  // Set CORS headers to allow connections from anywhere
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Respond with a simple HTML page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual English Platform</title>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    .header {
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h1 {
      color: #2563eb;
      margin-top: 0;
    }
    .success {
      color: #10b981;
      font-weight: 500;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Visual English Platform</h1>
    </div>
    
    <p class="success">✓ Server is responding correctly!</p>
    <p>This is a basic HTML page served by our minimal server.</p>
    <p>Current time: ${new Date().toLocaleTimeString()}</p>
    
    <h2>Platform Features</h2>
    <ul>
      <li>Interactive ESL learning content</li>
      <li>Comprehensive admin dashboard</li>
      <li>Teacher resources and lesson plans</li>
      <li>Premium subscription management</li>
    </ul>
    
    <h2>Admin Access</h2>
    <p>You can access the emergency admin interface directly:</p>
    <ul>
      <li><a href="/emergency-admin">Emergency Admin Access</a></li>
      <li><a href="/test-connection">Connection Test Page</a></li>
    </ul>
  </div>
</body>
</html>
  `;
  
  res.end(html);
});

// Start the server on port 5000
server.listen(5000, '0.0.0.0', () => {
  console.log('Basic HTML server running at http://0.0.0.0:5000');
});