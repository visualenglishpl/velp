import React from 'react';
import { createRoot } from 'react-dom/client';

function MinimalApp() {
  return (
    <div style={{ padding: '2rem', fontFamily: 'system-ui' }}>
      <h1 style={{ color: '#2563eb' }}>Visual English Platform Test</h1>
      <p>This is a minimal test to verify React and Vite are working correctly.</p>
      <div style={{ marginTop: '1rem' }}>
        <p>✓ React is rendering</p>
        <p>✓ TypeScript is compiling</p>
        <p>✓ Server is responding</p>
      </div>
    </div>
  );
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<MinimalApp />);
} else {
  console.error('Root element not found');
}