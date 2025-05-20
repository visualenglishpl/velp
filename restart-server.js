/**
 * Script to restart the server by killing any process on port 5000
 * and then starting the app
 */
const { exec } = require('child_process');

console.log('Finding process using port 5000...');

// Find the PID of the process using port 5000
exec('fuser -n tcp 5000 2>/dev/null || echo "No process found"', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error finding process: ${error.message}`);
    return;
  }
  
  const pid = stdout.trim();
  
  if (pid !== "No process found") {
    console.log(`Found process with PID ${pid} using port 5000. Killing...`);
    
    // Kill the process
    exec(`kill -9 ${pid}`, (killError) => {
      if (killError) {
        console.error(`Error killing process: ${killError.message}`);
        return;
      }
      
      console.log(`Successfully killed process ${pid}`);
      startApp();
    });
  } else {
    console.log('No process found using port 5000. Starting app...');
    startApp();
  }
});

function startApp() {
  console.log('Starting application...');
  exec('npm run dev', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error starting app: ${error.message}`);
      return;
    }
    
    console.log(stdout);
    console.error(stderr);
  });
}