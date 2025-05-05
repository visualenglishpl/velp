/**
 * Enhanced server configuration to improve performance and reliability
 */

// Set environment variables for better HMR performance
process.env.VITE_HMR_POLLING = 'true';
process.env.VITE_HMR_POLLING_INTERVAL = '500';
process.env.VITE_HMR_CLIENT_PORT = '443';

// Set NODE_OPTIONS to increase memory limits
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Import and execute the main server code
import './index';
