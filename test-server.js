/**
 * Simple test script for production server
 * Shows that the server is properly handling WebSocket connections
 */

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

// Serve a simple HTML file for testing
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>WebSocket Test</title>
      <style>
        body {
          font-family: system-ui, -apple-system, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          line-height: 1.5;
        }
        .message-box {
          border: 1px solid #ddd;
          padding: 1rem;
          height: 300px;
          overflow-y: auto;
          margin-bottom: 1rem;
          background: #f9f9f9;
        }
        .controls {
          display: flex;
          gap: 0.5rem;
        }
        input {
          flex: 1;
          padding: 0.5rem;
        }
        button {
          padding: 0.5rem 1rem;
          background: #7e22ce;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .status {
          margin-bottom: 1rem;
          padding: 0.5rem;
          border-radius: 4px;
        }
        .connected {
          background: #dcfce7;
          color: #166534;
        }
        .disconnected {
          background: #fee2e2;
          color: #b91c1c;
        }
        .message {
          margin-bottom: 0.5rem;
          padding: 0.5rem;
          border-radius: 4px;
        }
        .server {
          background: #f3e8ff;
          border-left: 3px solid #a855f7;
        }
        .client {
          background: #e0f2fe;
          border-left: 3px solid #0ea5e9;
          text-align: right;
        }
      </style>
    </head>
    <body>
      <h1>WebSocket Connection Test</h1>
      <div id="status" class="status disconnected">Disconnected</div>
      <div id="messages" class="message-box"></div>
      <div class="controls">
        <input type="text" id="message" placeholder="Type a message..." />
        <button id="send">Send</button>
      </div>
      
      <script>
        const messagesEl = document.getElementById('messages');
        const statusEl = document.getElementById('status');
        const messageEl = document.getElementById('message');
        const sendBtn = document.getElementById('send');
        
        // Connect to WebSocket server
        function connectWebSocket() {
          const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
          const wsUrl = `${protocol}//${window.location.host}/ws`;
          console.log('Connecting to WebSocket at:', wsUrl);
          
          const socket = new WebSocket(wsUrl);
          
          socket.onopen = () => {
            console.log('WebSocket connection established');
            statusEl.textContent = 'Connected';
            statusEl.className = 'status connected';
            addMessage('Connected to server', 'server');
          };
          
          socket.onmessage = (event) => {
            console.log('Message received:', event.data);
            try {
              const data = JSON.parse(event.data);
              addMessage(`${data.type}: ${data.message}`, 'server');
            } catch (e) {
              addMessage(`Raw message: ${event.data}`, 'server');
            }
          };
          
          socket.onclose = () => {
            console.log('WebSocket connection closed');
            statusEl.textContent = 'Disconnected';
            statusEl.className = 'status disconnected';
            addMessage('Disconnected from server', 'server');
            
            // Try to reconnect after 3 seconds
            setTimeout(connectWebSocket, 3000);
          };
          
          socket.onerror = (error) => {
            console.error('WebSocket error:', error);
            addMessage('Error: ' + JSON.stringify(error), 'server');
          };
          
          // Send message when button is clicked
          sendBtn.onclick = () => {
            if (socket.readyState === WebSocket.OPEN) {
              const message = messageEl.value;
              if (message) {
                socket.send(message);
                addMessage(`Sent: ${message}`, 'client');
                messageEl.value = '';
              }
            } else {
              addMessage('Cannot send: WebSocket is not connected', 'server');
            }
          };
          
          // Also send when Enter key is pressed
          messageEl.onkeypress = (e) => {
            if (e.key === 'Enter') {
              sendBtn.click();
            }
          };
          
          return socket;
        }
        
        function addMessage(text, type) {
          const messageDiv = document.createElement('div');
          messageDiv.className = `message ${type}`;
          messageDiv.textContent = text;
          messagesEl.appendChild(messageDiv);
          messagesEl.scrollTop = messagesEl.scrollHeight;
        }
        
        // Test API endpoint
        fetch('/api/test')
          .then(response => response.json())
          .then(data => {
            addMessage(`API Test: ${JSON.stringify(data)}`, 'server');
          })
          .catch(error => {
            addMessage(`API Error: ${error.message}`, 'server');
          });
        
        // Initialize WebSocket
        connectWebSocket();
      </script>
    </body>
    </html>
  `);
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Test server running at http://0.0.0.0:${PORT}`);
});
