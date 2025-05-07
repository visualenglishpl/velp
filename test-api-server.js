/**
 * Extremely simple API test server
 * Tests basic HTTP functionality
 */

const http = require('http');

// Create a very basic HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.url === '/api/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      message: 'API is working',
      timestamp: new Date().toISOString(),
      path: req.url
    }));
  } else if (req.url === '/api/healthcheck') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      timestamp: new Date().toISOString()
    }));
  } else {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Test server is running');
  }
});

// Start the server
const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Simple test server running on port ${PORT}`);
});