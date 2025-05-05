/**
 * Start Production Script for Visual English
 * 
 * This script builds the application in production mode and then
 * starts a simple production server to serve the static files.
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('\n🚀 Starting Visual English in production mode...\n');

// Create dist directory if it doesn't exist
const distPath = path.resolve(__dirname, 'dist');
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

try {
  // First, compile TypeScript files
  console.log('📦 Compiling TypeScript files...');
  execSync('npx tsc --project tsconfig.json', { stdio: 'inherit' });
  console.log('\n✅ TypeScript compilation completed!\n');
  
  // Then build the application in production mode
  console.log('📦 Building the application...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('\n✅ Build completed successfully!\n');
  
  // Start the production server
  console.log('🌐 Starting production server...');
  console.log('\n📝 Logs:');
  // Dynamic import for the production server
  const serverModule = await import('./server/production-server.js');
} catch (error) {
  console.error('\n❌ Error during build or server start:', error);
  process.exit(1);
}
