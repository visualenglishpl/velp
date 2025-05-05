/**
 * Enhanced server process manager - helps to automatically kill any hanging 
 * Node.js processes and restart servers when needed
 */

const { execSync } = require('child_process');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const PORT = process.env.PORT || 5000;
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;
const CLEANUP_INTERVAL = 30000; // 30 seconds

function log(message) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${message}`);
}

function killProcessesOnPort(port) {
  try {
    log(`Attempting to kill processes using port ${port}...`);
    
    // Try different methods to kill processes on the port
    try {
      execSync(`fuser -k ${port}/tcp 2>/dev/null || true`);
    } catch (e) {
      log(`fuser command failed, trying alternative methods`);
    }
    
    try {
      // Find processes listening on the port
      const result = execSync(`lsof -i :${port} -t 2>/dev/null || true`).toString().trim();
      if (result) {
        const pids = result.split('\n');
        pids.forEach(pid => {
          try {
            log(`Killing process ${pid} on port ${port}`);
            execSync(`kill -9 ${pid} 2>/dev/null || true`);
          } catch (e) {
            log(`Failed to kill PID ${pid}: ${e.message}`);
          }
        });
      }
    } catch (e) {
      log(`lsof command failed: ${e.message}`);
    }
    
    // Small delay to allow processes to fully terminate
    return new Promise(resolve => setTimeout(resolve, 500));
  } catch (error) {
    log(`Error killing processes: ${error.message}`);
    return Promise.resolve();
  }
}

function isPortAvailable(port) {
  try {
    const result = execSync(`lsof -i :${port} -t 2>/dev/null || true`).toString().trim();
    return result === '';
  } catch (e) {
    return true; // Assume port is available if the check fails
  }
}

function findRunningNodeProcesses() {
  try {
    const result = execSync(`ps -eo pid,pcpu,pmem,command | grep "node" | grep -v "grep" || true`).toString();
    return result;
  } catch (e) {
    log(`Error finding node processes: ${e.message}`);
    return '';
  }
}

function cleanupHangingProcesses() {
  try {
    // Look for node processes using excessive CPU
    const processes = findRunningNodeProcesses();
    const lines = processes.split('\n');
    
    lines.forEach(line => {
      const parts = line.trim().split(/\s+/);
      if (parts.length >= 4) {
        const pid = parts[0];
        const cpu = parseFloat(parts[1]);
        
        // If a process is using too much CPU, kill it
        if (cpu > 90) {
          log(`Found high CPU Node.js process (${cpu}%): PID ${pid}`);
          try {
            execSync(`kill -9 ${pid} 2>/dev/null || true`);
            log(`Killed high CPU process: ${pid}`);
          } catch (e) {
            log(`Failed to kill process ${pid}: ${e.message}`);
          }
        }
      }
    });
  } catch (error) {
    log(`Error in cleanup: ${error.message}`);
  }
}

async function startServer() {
  let retries = 0;
  
  while (retries < MAX_RETRIES) {
    if (!isPortAvailable(PORT)) {
      log(`Port ${PORT} is not available. Cleaning up...`);
      await killProcessesOnPort(PORT);
    }
    
    try {
      log(`Starting server on port ${PORT}...`);
      
      const server = spawn('tsx', ['server/index.ts'], {
        env: { ...process.env, NODE_ENV: 'development', PORT: PORT },
        stdio: 'inherit'
      });
      
      server.on('error', (error) => {
        log(`Server error: ${error.message}`);
      });
      
      server.on('exit', (code, signal) => {
        log(`Server exited with code ${code} and signal ${signal}`);
        
        if (code !== 0) {
          retries++;
          if (retries < MAX_RETRIES) {
            log(`Retrying server start (${retries}/${MAX_RETRIES}) in ${RETRY_DELAY/1000} seconds...`);
            setTimeout(() => startServer(), RETRY_DELAY);
          } else {
            log(`Failed to start server after ${MAX_RETRIES} attempts.`);
          }
        }
      });
      
      // Set up periodic cleanup of hanging processes
      const cleanupInterval = setInterval(cleanupHangingProcesses, CLEANUP_INTERVAL);
      
      // Handle script termination
      process.on('SIGINT', () => {
        log('Received SIGINT signal - shutting down server...');
        clearInterval(cleanupInterval);
        server.kill('SIGTERM');
        killProcessesOnPort(PORT).then(() => {
          process.exit(0);
        });
      });
      
      process.on('SIGTERM', () => {
        log('Received SIGTERM signal - shutting down server...');
        clearInterval(cleanupInterval);
        server.kill('SIGTERM');
        killProcessesOnPort(PORT).then(() => {
          process.exit(0);
        });
      });
      
      return; // Server started successfully, exit the loop
    } catch (error) {
      log(`Error starting server: ${error.message}`);
      retries++;
      
      if (retries < MAX_RETRIES) {
        log(`Retrying server start (${retries}/${MAX_RETRIES}) in ${RETRY_DELAY/1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      } else {
        log(`Failed to start server after ${MAX_RETRIES} attempts.`);
        break;
      }
    }
  }
}

// Perform initial cleanup before starting server
killProcessesOnPort(PORT).then(() => {
  // Give a bit of extra time for the port to be completely cleared
  setTimeout(() => {
    startServer();
  }, 1000);
});
