// Script to kill specific Node processes running the server
import { execSync } from 'child_process';

try {
  // Get a list of Node.js processes running server/index.ts
  const result = execSync('ps aux | grep "node.*server/index.ts" | grep -v grep').toString().trim();
  
  if (result) {
    console.log('Found processes running server/index.ts:');
    console.log(result);
    
    // Extract PIDs
    const processes = result.split('\n');
    processes.forEach(processLine => {
      const parts = processLine.trim().split(/\s+/);
      if (parts.length >= 2) {
        const pid = parts[1];
        try {
          console.log(`Killing process ${pid}...`);
          execSync(`kill -9 ${pid}`);
          console.log(`Successfully killed process ${pid}`);
        } catch (error) {
          console.error(`Failed to kill process ${pid}:`, error.message);
        }
      }
    });
    
    console.log('Server processes should now be terminated.');
  } else {
    console.log('No server processes found.');
  }
} catch (error) {
  if (error.status === 1) {
    console.log('No server processes found.');
  } else {
    console.error('Error:', error.message);
  }
}
