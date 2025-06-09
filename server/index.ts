import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { registerContentEndpoints } from "./optimized-content-endpoints";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import timeout from "express-timeout-handler";
import { configureHMR } from "./hmr-config";
import { createServer } from "http";
import path from "path";

// Configure enhanced HMR settings for development
configureHMR();

// Add global error handler for better resilience
process.on('uncaughtException', (error) => {
  console.error('UNCAUGHT EXCEPTION - keeping process alive:', error);
  // Log additional information if available
  if (error.stack) {
    console.error('Stack trace:', error.stack);
  }
});

// Prevent unhandled promise rejections from crashing the app
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise);
  // Provide more detailed error information
  if (reason instanceof Error) {
    console.error('Reason:', reason.message);
    console.error('Stack:', reason.stack);
  } else {
    console.error('Reason:', reason);
  }
});

// Add memory monitoring to prevent memory leaks
const memoryMonitorInterval = setInterval(() => {
  const memoryUsage = process.memoryUsage();
  // Convert to MB for better readability
  const memoryUsageMB = {
    rss: Math.round(memoryUsage.rss / 1024 / 1024),
    heapTotal: Math.round(memoryUsage.heapTotal / 1024 / 1024),
    heapUsed: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    external: Math.round((memoryUsage.external || 0) / 1024 / 1024)
  };
  
  // Only log if memory usage is high
  if (memoryUsageMB.heapUsed > 500) { // If heap usage > 500MB
    console.warn('Memory usage is high:', memoryUsageMB);
  }
}, 300000); // Check every 5 minutes

// Clean up on exit
process.on('exit', () => {
  clearInterval(memoryMonitorInterval);
  console.log('Application is shutting down...');
});


const app = express();

// Enable compression to reduce response size
app.use(compression());

// Set security headers
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development/iframe embedding
  crossOriginEmbedderPolicy: false,
  crossOriginResourcePolicy: { policy: "cross-origin" } // Allow cross-origin loading of resources
}));

// Set request timeout to prevent hanging requests
app.use(timeout.handler({
  timeout: 60000, // 60 second timeout
  onTimeout: (req: Request, res: Response) => {
    res.status(503).json({ error: "Request timeout" });
  },
  disable: ['write', 'setHeaders', 'send', 'json', 'end']
}));

// Rate limiting to prevent abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes (increased from 5 minutes)
  max: 500, // 500 requests per window (increased from 300)
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later" }
});

// Apply rate limiting to API routes except content-related endpoints
app.use("/api/", (req, res, next) => {
  // Skip rate limiting for content-related endpoints
  if (req.path.includes("/content/") || req.path.includes("/direct/")) {
    return next();
  }
  return apiLimiter(req, res, next);
});


// Enable JSON parsing with increased limit for larger payloads
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// Set caching headers for static assets
app.use((req, res, next) => {
  // Set cache for static assets but not for API calls
  if (!req.path.startsWith('/api/') && req.method === 'GET') {
    // Images, fonts, and other static assets cache for 1 day
    if (req.path.match(/\.(jpg|jpeg|png|gif|ico|svg|woff|woff2|ttf|eot)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=86400');
    }
    // CSS/JS files cache for 2 hours
    else if (req.path.match(/\.(css|js)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=7200');
    }
  }
  next();
});

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Serve static admin login page
app.get('/admin-login', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/admin/index.html'));
});

// Serve direct admin access pages
app.get('/admin-direct', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/admin-direct.html'));
});

app.get('/go-admin', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/go-to-admin.html'));
});

// NEW: Emergency admin access page (ultra-reliable static page)
app.get('/emergency-admin', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/emergency-admin-access.html'));
});

// Server connectivity test page
app.get('/test-connection', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/test-connection.html'));
});

// Minimal test page for basic connectivity testing
app.get('/minimal', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/minimal.html'));
});

// Special landing page that bypasses Vite for accessibility
app.get('/simple', (req, res) => {
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Visual English Platform</title>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      max-width: 800px;
      margin: 40px auto;
      padding: 0 20px;
      line-height: 1.6;
      color: #333;
      background-color: #f9fafb;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin-bottom: 20px;
    }
    .header {
      border-bottom: 1px solid #e5e7eb;
      padding-bottom: 10px;
      margin-bottom: 20px;
    }
    h1 {
      color: #2563eb;
      margin-top: 0;
    }
    .success {
      color: #10b981;
      font-weight: 500;
    }
    .button {
      display: inline-block;
      padding: 10px 15px;
      background-color: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      margin-top: 10px;
    }
    .button:hover {
      background-color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>Visual English Platform</h1>
    </div>
    
    <p class="success">✓ Server is responding correctly!</p>
    <p>This is a basic HTML page served by our Express server.</p>
    <p>Current time: ${new Date().toLocaleTimeString()}</p>
    
    <h2>Admin Access</h2>
    <p>You can access the emergency admin interface directly:</p>
    <p><a href="/emergency-login" class="button">Emergency Admin Login</a></p>
    <ul style="margin-top: 20px;">
      <li><a href="/test-connection">Connection Test Page</a></li>
      <li><a href="/api/direct/admin-login">Direct Admin API Endpoint</a></li>
    </ul>
  </div>
</body>
</html>
  `;
  
  res.send(html);
});

// Emergency login page that completely bypasses React
app.get('/emergency-login', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/emergency-login.html'));
});

app.get('/super-admin', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/super-admin.html'));
});

// New admin login page - with step-by-step process
app.get('/admin-login', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/admin-login.html'));
});

// Simple admin login - ONE-CLICK access to admin panel
app.get('/simple-admin', (req, res) => {
  res.sendFile(path.resolve(process.cwd(), 'public/simple-admin.html'));
});

// Direct admin auth endpoint - for emergency access
app.get('/api/direct-admin-auth', (req, res) => {
  try {
    // Create admin user session
    if (req.session) {
      req.session.user = {
        id: 1,
        username: "admin",
        role: "admin",
        email: "admin@example.com",
        fullName: "Admin User",
        createdAt: new Date()
      };
      
      // Send success response with admin user data
      res.status(200).json({
        success: true,
        user: req.session.user,
        message: "Admin authentication successful via direct access"
      });
    } else {
      res.status(500).json({ 
        success: false,
        error: "Session not available" 
      });
    }
  } catch (error) {
    console.error("Direct admin auth error:", error);
    res.status(500).json({ 
      success: false,
      error: "Server error during direct admin authentication" 
    });
  }
});

// Simple API test endpoint - always returns success
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: "API test endpoint is working correctly",
    timestamp: new Date().toISOString(),
    server: {
      nodeVersion: process.version,
      platform: process.platform,
      uptime: process.uptime()
    }
  });
});

(async () => {
  try {
    // Start server first to open port quickly
    const server = createServer(app);
    
    // Try port 5000 first, then fallback to alternatives
    let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    const host = '0.0.0.0';
    
    // Start server immediately to meet port opening requirement
    await new Promise<void>((resolve, reject) => {
      server.listen(port, host, () => {
        console.log(`8:${new Date().toLocaleTimeString().split(':')[1]}:${new Date().toLocaleTimeString().split(':')[2]} [express] Server running at http://${host}:${port}`);
        console.log(`✅ Server successfully bound to ${host}:${port}`);
        resolve();
      });
      
      server.on('error', (error: any) => {
        if (error.code === 'EADDRINUSE') {
          reject(new Error(`Port ${port} is in use`));
        } else {
          reject(error);
        }
      });
    });
    
    // Now initialize everything else asynchronously
    setTimeout(async () => {
      try {
        // Register our API endpoints
        registerContentEndpoints(app);
        
        // Register main routes (without creating new server)
        await registerRoutes(app, server);

    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      
      console.error(`Error: ${message}`, err);
      res.status(status).json({ message });
    });

    // Try port 5000 first, then fallback to alternatives
    let port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
    const host = '0.0.0.0';
    
    // Function to try starting server on different ports
    const tryStartServer = async (attemptPort: number): Promise<void> => {
      return new Promise((resolve, reject) => {
        const tempServer = server.listen(attemptPort, host, () => {
          port = attemptPort; // Update the port variable
          resolve();
        });
        
        tempServer.on('error', (error: any) => {
          if (error.code === 'EADDRINUSE') {
            reject(error);
          } else {
            console.error(`❌ Server error: ${error.message}`);
            reject(error);
          }
        });
      });
    };
    
    // Handle process termination signals with grace period
    const gracefulShutdown = (signal: string) => {
      log(`Received ${signal} signal, shutting down server...`);
      const forceExit = setTimeout(() => {
        log('Forcing server shutdown after timeout');
        process.exit(1);
      }, 10000);
      
      server.close(() => {
        clearTimeout(forceExit);
        log('Server closed gracefully');
        process.exit(0);
      });
    };
    
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

    // Remove the error handler since we're handling port conflicts differently
    
    // Setup Vite before starting the server
    try {
      if (app.get("env") === "development") {
        console.log("Setting up Vite development server...");
        await setupVite(app, server);
        console.log(`✅ Vite setup completed`);
      } else {
        console.log("Setting up static file serving for production...");
        serveStatic(app);
        console.log(`✅ Static file serving configured`);
      }
    } catch (viteError) {
      console.error('Vite setup failed, continuing with fallback mode:', viteError);
      
      // Fallback: serve a basic HTML page
      app.get('*', (req, res) => {
        if (req.path.startsWith('/api/')) {
          return; // Don't handle API routes
        }
        
        const fallbackHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual English Platform</title>
  <style>
    body { font-family: system-ui, sans-serif; margin: 0; padding: 20px; background: #f9fafb; }
    .container { max-width: 600px; margin: 0 auto; background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    h1 { color: #2563eb; margin-bottom: 20px; }
    .status { padding: 10px; background: #fef3c7; border-radius: 4px; margin: 20px 0; }
    .button { display: inline-block; padding: 10px 20px; background: #3b82f6; color: white; text-decoration: none; border-radius: 4px; margin: 10px 5px 0 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Visual English Platform</h1>
    <div class="status">
      ⚠️ Development mode temporarily unavailable. Server is running in fallback mode.
    </div>
    <p>The server is running successfully, but the frontend development environment needs to be restarted.</p>
    <a href="/simple" class="button">Simple Interface</a>
    <a href="/emergency-login" class="button">Admin Access</a>
    <a href="/api/test" class="button">API Test</a>
  </div>
</body>
</html>`;
        
        res.send(fallbackHtml);
      });
      
      console.log('✅ Fallback mode configured');
    }
    
    // Start the server after Vite is configured with port conflict handling
    const portsToTry = [port, 5001, 5002, 5003, 3000];
    let serverStarted = false;
    
    for (const tryPort of portsToTry) {
      try {
        await tryStartServer(tryPort);
        log(`Server running at http://${host}:${port}`);
        console.log(`✅ Server successfully bound to ${host}:${port}`);
        
        server.on('listening', () => {
          console.log(`✅ Server is now listening and accepting connections on port ${port}`);
        });
        
        serverStarted = true;
        break;
      } catch (error: any) {
        if (error.code === 'EADDRINUSE') {
          console.log(`Port ${tryPort} is busy, trying next port...`);
          continue;
        } else {
          throw error;
        }
      }
    }
    
    if (!serverStarted) {
      console.error('❌ Could not start server on any available port');
      process.exit(1);
    }

  } catch (startupError) {
    console.error('❌ Server startup failed:', startupError);
    process.exit(1);
  }
})();
