/**
 * Ultra-Simple Static File Server
 * 
 * This server only serves static files from the public directory
 * without any complex middleware or routing.
 */

const express = require('express');
const path = require('path');

const app = express();
const port = 5000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all handler to serve index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Static file server running at http://0.0.0.0:${port}`);
});