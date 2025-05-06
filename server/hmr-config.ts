/**
 * HMR Configuration helper for improved Vite development server performance
 * This file provides additional configuration without modifying vite.config.ts
 */

export const configureHMR = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Configuring enhanced HMR settings for better performance...');
    
    // Enable HMR for better development experience
    process.env.VITE_DISABLE_HMR = 'false';
    
    // Configure HMR properly for Replit environment - more reliable settings
    process.env.VITE_HMR_POLLING = 'true';
    process.env.VITE_HMR_POLLING_INTERVAL = '500'; // Reduced polling interval for faster updates
    process.env.VITE_HMR_TIMEOUT = '120000'; // Increased timeout for stability
    
    // These settings help with Replit's proxy configuration
    process.env.VITE_HMR_CLIENT_PORT = '443';
    process.env.VITE_HMR_PROTOCOL = 'wss';
    process.env.VITE_HMR_HOST = ''; // Let Vite determine the host automatically
    process.env.VITE_HMR_FORCE_FULL_RELOAD = 'false'; // Avoid full page reloads when possible
    
    // Set optimization flags for better performance
    process.env.VITE_OPTIMIZE_DEPS = 'true';
    process.env.VITE_PRESERVE_SYMLINKS = 'true';
    process.env.VITE_REBUILD_DEPS = 'false'; // Avoid rebuilding dependencies unnecessarily
    
    // Force stable web socket connection
    process.env.VITE_WS_CLIENT_TIMEOUT = '60000';
    
    console.log('HMR configuration updated - HMR enabled for better development experience');
  }
};
