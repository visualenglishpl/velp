/**
 * Simple Resource Tester Server
 * 
 * This script runs a basic Express server to serve the resource-test.html page
 * and provide access to the CSV data.
 */

import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// ES module equivalent of __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

// Serve static files
app.use(express.static(__dirname));

// Main route
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'resource-test.html'));
});

// API route to get CSV data
app.get('/api/resources', (req, res) => {
  try {
    const csvPath = join(__dirname, 'book1-resources.csv');
    const csvData = fs.readFileSync(csvPath, 'utf8');
    res.send(csvData);
  } catch (err) {
    console.error('Error reading CSV file:', err);
    res.status(500).send('Error loading resource data');
  }
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Resource tester server running at http://0.0.0.0:${PORT}`);
  console.log(`Open the link above in your browser to test the resources`);
});