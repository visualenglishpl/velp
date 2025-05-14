/**
 * Ultra-Simple Standalone Server
 * 
 * This is the most basic HTTP server possible, serving a simple HTML page
 * on port 3000 to test connectivity issues.
 */

import http from 'http';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  
  // Super simple HTML page
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Basic Server Test</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
      background-color: #f9f9f9;
    }
    .card {
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
  <h1>Basic HTTP Server Test</h1>
  <div class="card">
    <p class="success">✅ Server is responding correctly</p>
    <p>If you can see this page, the HTTP server is running correctly on port ${port}.</p>
    <p>This page is being served by a minimal Node.js HTTP server.</p>
    <p>Server time: ${new Date().toLocaleTimeString()}</p>
    <p>URL: ${req.url}</p>
  </div>
</body>
</html>
  `;
  
  res.end(html);
});

server.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://0.0.0.0:${port}/`);
});