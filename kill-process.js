// Script to manually identify and kill process using port 5000
import { execSync } from 'child_process';
import net from 'net';

// Function to check if port is in use
const isPortInUse = (port) => {
  return new Promise((resolve) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        resolve(true); // Port is in use
      } else {
        resolve(false); // Other error
      }
      server.close();
    });
    
    server.once('listening', () => {
      server.close();
      resolve(false); // Port is free
    });
    
    server.listen(port);
  });
};

// Main function
async function checkPort() {
  const port = 5000;
  console.log(`Checking if port ${port} is in use...`);
  
  const inUse = await isPortInUse(port);
  
  if (inUse) {
    console.log(`Port ${port} is in use.`);
    console.log('Attempting to kill server processes...');
    
    try {
      // List all Node.js processes
      const processes = execSync('ps aux | grep node').toString().trim();
      console.log('Running Node.js processes:', processes);
      
      // Force exit this process - will restart via the workflow system
      console.log('Forcing exit of current process to free port...');
      process.exit(1);
    } catch (error) {
      console.error('Error checking processes:', error.message);
    }
  } else {
    console.log(`Port ${port} is available.`);
  }
}

checkPort();
