/**
 * WebSocket Server for Visual English Platform
 * 
 * This module provides WebSocket functionality for real-time communication
 * between clients and the server.
 */

import { WebSocketServer } from 'ws';

// Connected clients
const clients = new Map();

/**
 * Setup WebSocket server
 * @param {http.Server} server - HTTP server to attach the WebSocket server to
 */
export function setupWebSocketServer(server) {
  // Create WebSocket server with path /ws
  const wss = new WebSocketServer({ server, path: '/ws' });
  
  // Handle new WebSocket connections
  wss.on('connection', (ws, req) => {
    const clientId = req.headers['sec-websocket-key'] || Date.now().toString();
    const clientIp = req.socket.remoteAddress;
    
    console.log(`WebSocket client connected: ${clientId} from ${clientIp}`);
    
    // Store client in map for later reference
    clients.set(clientId, {
      ws,
      ip: clientIp,
      connectedAt: new Date()
    });
    
    // Send welcome message
    ws.send(JSON.stringify({
      type: 'connection',
      status: 'connected',
      message: 'Connected to Visual English WebSocket server',
      timestamp: new Date().toISOString()
    }));
    
    // Handle messages from client
    ws.on('message', (rawData) => {
      try {
        const data = JSON.parse(rawData.toString());
        handleClientMessage(clientId, data);
      } catch (error) {
        console.error('Error processing message:', error);
        ws.send(JSON.stringify({
          type: 'error',
          message: 'Invalid message format'
        }));
      }
    });
    
    // Handle client disconnect
    ws.on('close', () => {
      console.log(`WebSocket client disconnected: ${clientId}`);
      clients.delete(clientId);
    });
    
    // Handle errors
    ws.on('error', (error) => {
      console.error(`WebSocket error for client ${clientId}:`, error);
    });
  });
  
  console.log('WebSocket server initialized');
  return wss;
}

/**
 * Handle messages from clients
 * @param {string} clientId - Client identifier
 * @param {Object} data - Message data
 */
function handleClientMessage(clientId, data) {
  const client = clients.get(clientId);
  if (!client) return;
  
  console.log(`Received message from ${clientId}:`, data);
  
  // Handle different message types
  switch (data.type) {
    case 'ping':
      client.ws.send(JSON.stringify({
        type: 'pong',
        timestamp: new Date().toISOString()
      }));
      break;
      
    case 'diagnostics':
      sendDiagnostics(client.ws);
      break;
      
    default:
      // Echo back messages we don't specifically handle
      client.ws.send(JSON.stringify({
        type: 'echo',
        originalMessage: data,
        timestamp: new Date().toISOString()
      }));
  }
}

/**
 * Send diagnostics information to client
 * @param {WebSocket} ws - WebSocket connection
 */
function sendDiagnostics(ws) {
  ws.send(JSON.stringify({
    type: 'diagnostics',
    data: {
      activeConnections: clients.size,
      serverTime: new Date().toISOString(),
      uptime: process.uptime()
    }
  }));
}

/**
 * Broadcast a message to all connected clients
 * @param {Object} message - Message to broadcast
 */
export function broadcastMessage(message) {
  const messageStr = JSON.stringify(message);
  
  clients.forEach((client) => {
    if (client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(messageStr);
    }
  });
}

/**
 * Send a message to a specific client
 * @param {string} clientId - Client identifier
 * @param {Object} message - Message to send
 */
export function sendToClient(clientId, message) {
  const client = clients.get(clientId);
  if (client && client.ws.readyState === WebSocket.OPEN) {
    client.ws.send(JSON.stringify(message));
    return true;
  }
  return false;
}

/**
 * Get the number of active connections
 * @returns {number} Number of connected clients
 */
export function getActiveConnectionCount() {
  return clients.size;
}