/**
 * Start Test Servers Script
 * 
 * This script launches multiple test servers on different ports
 * to help diagnose connectivity issues.
 */

const { spawn } = require('child_process');
const path = require('path');

// Configuration for our test servers
const servers = [
  {
    name: 'Simple Express Server (Port 5000)',
    script: 'simple-express-server.js',
    color: '\x1b[32m' // Green
  },
  {
    name: 'Standalone HTTP Server (Port 3000)',
    script: 'standalone-server.js',
    color: '\x1b[33m' // Yellow
  }
];

// ANSI color codes
const RESET = '\x1b[0m';
const BRIGHT = '\x1b[1m';

// Start each server as a child process
servers.forEach(server => {
  const serverProcess = spawn('node', [path.join(process.cwd(), server.script)], {
    stdio: 'pipe',
    shell: true
  });
  
  console.log(`${BRIGHT}${server.color}Starting ${server.name}...${RESET}`);
  
  // Handle stdout
  serverProcess.stdout.on('data', (data) => {
    console.log(`${server.color}[${server.name}]${RESET} ${data.toString().trim()}`);
  });
  
  // Handle stderr
  serverProcess.stderr.on('data', (data) => {
    console.error(`${server.color}[${server.name} ERROR]${RESET} ${data.toString().trim()}`);
  });
  
  // Handle process exit
  serverProcess.on('close', (code) => {
    if (code !== 0) {
      console.error(`${BRIGHT}${server.color}[${server.name}]${RESET} Process exited with code ${code}`);
    }
  });
});

console.log(`${BRIGHT}\x1b[36mAll test servers started!${RESET}`);
console.log(`${BRIGHT}\x1b[36mPress Ctrl+C to stop all servers${RESET}`);