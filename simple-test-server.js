import { createServer } from 'http';
import { WebSocketServer } from 'ws';
import express from 'express';

const app = express();
const server = createServer(app);

// Create WebSocket server
const wss = new WebSocketServer({ server, path: '/ws' });

// Handle WebSocket connections
wss.on('connection', (ws) => {
  console.log('Client connected to WebSocket!');
  
  // Send welcome message
  ws.send(JSON.stringify({ type: 'welcome', message: 'Connected to WebSocket server' }));
  
  // Handle messages from client
  ws.on('message', (data) => {
    console.log('Received message:', data.toString());
    
    // Echo back to client
    ws.send(JSON.stringify({ 
      type: 'echo', 
      message: `Echo: ${data.toString()}`,
      timestamp: new Date().toISOString() 
    }));
  });
  
  // Handle client disconnect
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

// Add test API route
app.get('/api/test', (req, res) => {
  res.json({ success: true, message: 'API is working!' });
});

// Serve a simple HTML test page
app.get('/', (req, res) => {
  res.send('WebSocket Test Server Working!');
});

// Start the server
const PORT = 5001; // Use a different port
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running at http://0.0.0.0:${PORT}`);
});