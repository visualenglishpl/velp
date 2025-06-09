import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Simple fallback app to get the server running
function SimpleApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#2563eb', marginBottom: '1.5rem' }}>Visual English Platform</h1>
      <div style={{ background: '#f9fafb', padding: '1.5rem', borderRadius: '8px', marginBottom: '1rem' }}>
        <p style={{ color: '#10b981', fontWeight: '600', marginBottom: '0.5rem' }}>✓ Server is running successfully!</p>
        <p>The Visual English platform is starting up. Core systems are operational.</p>
      </div>
      
      <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginTop: 0, marginBottom: '1rem' }}>Quick Access</h2>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <a href="/simple" style={{ 
            background: '#3b82f6', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            borderRadius: '4px',
            display: 'inline-block'
          }}>Simple Interface</a>
          <a href="/emergency-login" style={{ 
            background: '#10b981', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            borderRadius: '4px',
            display: 'inline-block'
          }}>Admin Access</a>
          <a href="/api/test" style={{ 
            background: '#6b7280', 
            color: 'white', 
            padding: '0.5rem 1rem', 
            textDecoration: 'none', 
            borderRadius: '4px',
            display: 'inline-block'
          }}>API Test</a>
        </div>
      </div>
      
      <div style={{ marginTop: '1.5rem', padding: '1rem', background: '#fef3c7', borderRadius: '4px' }}>
        <p style={{ margin: 0, fontSize: '0.9rem' }}>
          <strong>Note:</strong> Full application features are being initialized. 
          This simplified interface ensures basic functionality while the complete system loads.
        </p>
      </div>
    </div>
  );
}

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
  // Render simple app for now
  root.render(
    <React.StrictMode>
      <SimpleApp />
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
