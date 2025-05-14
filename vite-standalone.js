/**
 * Vite Standalone Server
 * 
 * This script creates a minimal standalone Vite dev server with
 * a basic React application to test connectivity issues.
 */

const express = require('express');
const { createServer: createViteServer } = require('vite');
const path = require('path');
const fs = require('fs');

async function createServer() {
  const app = express();
  const port = 5001; // Using a different port to avoid conflicts

  // Create a basic React component file if it doesn't exist
  const componentsDir = path.join(process.cwd(), 'standalone-app');
  const appComponentPath = path.join(componentsDir, 'App.jsx');
  
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  if (!fs.existsSync(appComponentPath)) {
    const appComponent = `
import { useState } from 'react'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Vite + React Test App</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          Count is {count}
        </button>
        <p>
          This is a minimal test application to verify Vite and React functionality.
        </p>
      </div>
    </div>
  )
}
`;
    fs.writeFileSync(appComponentPath, appComponent);
  }

  // Create a main entry file
  const mainPath = path.join(componentsDir, 'main.jsx');
  if (!fs.existsSync(mainPath)) {
    const mainContent = `
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;
    fs.writeFileSync(mainPath, mainContent);
  }

  // Create a simple CSS file
  const cssPath = path.join(componentsDir, 'style.css');
  if (!fs.existsSync(cssPath)) {
    const cssContent = `
body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
}

#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.app {
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card {
  padding: 2em;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  color: white;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}
`;
    fs.writeFileSync(cssPath, cssContent);
  }

  // Create an index.html file
  const indexPath = path.join(componentsDir, 'index.html');
  if (!fs.existsSync(indexPath)) {
    const indexContent = `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite Test App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.jsx"></script>
  </body>
</html>
`;
    fs.writeFileSync(indexPath, indexContent);
  }

  // Create vite.config.js file
  const configPath = path.join(componentsDir, 'vite.config.js');
  if (!fs.existsSync(configPath)) {
    const configContent = `
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5001
  }
})
`;
    fs.writeFileSync(configPath, configContent);
  }

  // Create a Vite server
  const vite = await createViteServer({
    root: componentsDir,
    server: { 
      middlewareMode: true,
      hmr: {
        port: 5001
      }
    },
    appType: 'spa'
  });

  // Add Vite's middleware
  app.use(vite.middlewares);

  // Serve index.html
  app.use('*', async (req, res, next) => {
    const url = req.originalUrl;
    
    try {
      let template = fs.readFileSync(path.resolve(componentsDir, 'index.html'), 'utf-8');
      template = await vite.transformIndexHtml(url, template);
      
      res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  // Start the server
  app.listen(port, '0.0.0.0', () => {
    console.log(`Standalone Vite server running at http://0.0.0.0:${port}`);
  });
}

createServer();