import express, { type Express } from "express";
import { createServer } from "http";
import path from "path";

// Fast startup configuration for quick server initialization
export function createFastServer(): Express {
  const app = express();
  
  // Minimal middleware setup
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: false }));
  
  // Health check endpoint
  app.get('/health', (req, res) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      server: 'Visual English Platform'
    });
  });
  
  // API test endpoint
  app.get('/api/test', (req, res) => {
    res.status(200).json({
      success: true,
      message: "Server is operational",
      timestamp: new Date().toISOString()
    });
  });
  
  // Serve minimal HTML for root
  app.get('/', (req, res) => {
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual English Platform</title>
  <style>
    body { 
      font-family: system-ui, sans-serif; 
      margin: 0; 
      padding: 2rem; 
      background: #f9fafb; 
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }
    .container { 
      max-width: 600px; 
      background: white; 
      padding: 2rem; 
      border-radius: 8px; 
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      text-align: center;
    }
    h1 { color: #2563eb; margin-bottom: 1rem; }
    .status { 
      padding: 1rem; 
      background: #dcfce7; 
      border: 1px solid #16a34a;
      border-radius: 4px; 
      margin: 1rem 0;
      color: #166534;
    }
    .links { margin-top: 1.5rem; }
    .link { 
      display: inline-block;
      padding: 0.5rem 1rem; 
      background: #3b82f6; 
      color: white; 
      text-decoration: none; 
      border-radius: 4px; 
      margin: 0.25rem;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual English Platform</h1>
    <div class="status">
      ✓ Server is running successfully on port 5000
    </div>
    <p>The Visual English educational platform is operational and ready for use.</p>
    <div class="links">
      <a href="/health" class="link">Health Check</a>
      <a href="/api/test" class="link">API Test</a>
    </div>
  </div>
</body>
</html>`;
    res.send(html);
  });
  
  return app;
}

export function startFastServer(port: number = 5000): Promise<void> {
  return new Promise((resolve, reject) => {
    const app = createFastServer();
    const server = createServer(app);
    
    server.listen(port, '0.0.0.0', () => {
      console.log(`Fast server running at http://0.0.0.0:${port}`);
      resolve();
    });
    
    server.on('error', (error: any) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${port} is busy, trying ${port + 1}...`);
        startFastServer(port + 1).then(resolve).catch(reject);
      } else {
        reject(error);
      }
    });
  });
}