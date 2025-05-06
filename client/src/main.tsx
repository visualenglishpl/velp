import React from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import "./index.css";

// Log startup message to verify loading
console.log('Visual English application starting...');

// Create root
const rootElement = document.getElementById("root");

// Error handling for root element missing
if (!rootElement) {
  console.error('Root element not found! Creating fallback element.');
  const fallbackElement = document.createElement('div');
  fallbackElement.id = 'root';
  document.body.appendChild(fallbackElement);
  console.log('Fallback root element created');
}

// Safely create root with appropriate element
const root = createRoot(rootElement || document.getElementById('root')!);

// Capture all unhandled promise rejections in a more detailed way
window.addEventListener('unhandledrejection', function(event) {
  console.error('CRITICAL - Unhandled Promise Rejection:', event.reason);
  if (event.reason && event.reason.stack) {
    console.error('Rejection stack:', event.reason.stack);
  }
  // Prevent the default handling
  event.preventDefault();
});

// Add error boundary for improved stability
try {
  console.log('Rendering application...');
  // Render app with providers - with simplified structure for debugging
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </React.StrictMode>
  );
  console.log('Application rendered successfully');
} catch (error) {
  console.error('Error rendering application:', error);
  if (error instanceof Error) {
    console.error('Error details:', { 
      message: error.message,
      stack: error.stack,
      name: error.name 
    });
  }
  
  // Display fallback content in case of render failure
  root.render(
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{ color: 'red', marginBottom: '1rem' }}>Application Error</h1>
      <p>There was a problem loading the Visual English application.</p>
      <pre style={{ textAlign: 'left', background: '#f0f0f0', padding: '1rem', overflow: 'auto', maxHeight: '200px' }}>
        {error instanceof Error ? error.message : String(error)}
      </pre>
      <button 
        onClick={() => window.location.reload()}
        style={{ padding: '0.5rem 1rem', background: '#4f46e5', color: 'white', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', marginTop: '1rem' }}
      >
        Reload Application
      </button>
    </div>
  );
}
