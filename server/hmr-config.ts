/**
 * HMR Configuration helper for improved Vite development server performance
 * This file provides additional configuration without modifying vite.config.ts
 */

export const configureHMR = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Configuring enhanced HMR settings for better performance...');
    
    // Disable HMR temporarily to ensure stable rendering
    process.env.VITE_DISABLE_HMR = 'true';
    
    // But if HMR is still enabled by Vite, configure it properly
    process.env.VITE_HMR_POLLING = 'true';
    process.env.VITE_HMR_POLLING_INTERVAL = '300';
    process.env.VITE_HMR_TIMEOUT = '30000';
    
    // These settings help with Replit's proxy configuration
    process.env.VITE_HMR_CLIENT_PORT = '443';
    process.env.VITE_HMR_PROTOCOL = 'wss';
    process.env.VITE_HMR_FORCE_FULL_RELOAD = 'true';
    
    // Set optimization flags
    process.env.VITE_OPTIMIZE_DEPS = 'true';
    
    console.log('HMR configuration complete - HMR disabled for stability');
  }
};
