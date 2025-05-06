/**
 * HMR Configuration helper for improved Vite development server performance
 * This file provides additional configuration without modifying vite.config.ts
 */

export const configureHMR = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Configuring enhanced HMR settings for better performance...');
    
    // Enable HMR for better development experience
    process.env.VITE_DISABLE_HMR = 'false';
    
    // Configure HMR properly for Replit environment
    process.env.VITE_HMR_POLLING = 'true';
    process.env.VITE_HMR_POLLING_INTERVAL = '1000'; // Increase polling interval for stability
    process.env.VITE_HMR_TIMEOUT = '60000'; // Increase timeout
    
    // These settings help with Replit's proxy configuration
    process.env.VITE_HMR_CLIENT_PORT = '443';
    process.env.VITE_HMR_PROTOCOL = 'wss';
    process.env.VITE_HMR_FORCE_FULL_RELOAD = 'false'; // Avoid full page reloads when possible
    
    // Set optimization flags
    process.env.VITE_OPTIMIZE_DEPS = 'true';
    
    console.log('HMR configuration updated - HMR enabled for better development experience');
  }
};
