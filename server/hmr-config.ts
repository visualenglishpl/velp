/**
 * HMR Configuration helper for improved Vite development server performance
 * This file provides additional configuration without modifying vite.config.ts
 */

export const configureHMR = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Configuring enhanced HMR settings for better performance...');
    
    // Apply improved polling settings
    process.env.VITE_HMR_POLLING = 'true';
    process.env.VITE_HMR_POLLING_INTERVAL = '500';
    
    // Set appropriate client port for Replit
    process.env.VITE_HMR_CLIENT_PORT = '443';
  }
};
