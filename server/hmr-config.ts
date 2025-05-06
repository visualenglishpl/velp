/**
 * HMR Configuration helper for improved Vite development server performance
 * This file provides additional configuration without modifying vite.config.ts
 */

export const configureHMR = () => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Configuring HMR settings...');
    
    // DISABLE HMR completely to avoid WebSocket issues
    process.env.VITE_DISABLE_HMR = 'true';
    console.log('⚠️ HMR has been disabled - page refresh required for changes');
  }
};
