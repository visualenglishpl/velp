import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { registerContentEndpoints } from "./optimized-content-endpoints";
import compression from "compression";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import timeout from "express-timeout-handler";
import { configureHMR } from "./hmr-config";

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

(async () => {
  // Register our API endpoints
  registerContentEndpoints(app);
  
  // Register main routes
  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    console.error(`Error: ${message}`, err);
    res.status(status).json({ message });
    // Don't throw the error again as it might crash the server
    // instead, just log it and continue
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 5000;
  const host = '0.0.0.0';
  
  // Type issues: TypeScript expects a number for port, but we need to be explicit for TypeScript
  server.listen(port as number, host, () => {
    log(`Server running at http://${host}:${port}`);
  });
  
  // Handle termination signals properly
  // Enhanced error handling for the server
  let retryCount = 0;
  const maxRetries = 3;
  
  server.on('error', (error: Error) => {
    log(`Server error: ${error.message}`);
    // Attempt to recover from certain types of errors
    if ((error as any).code === 'EADDRINUSE') {
      if (retryCount < maxRetries) {
        retryCount++;
        log(`Address in use, retrying in 1 second... (Attempt ${retryCount}/${maxRetries})`);
        setTimeout(() => {
          server.close();
          server.listen(port as number, host, () => {
            log('Server restarted successfully after address was in use');
          });
        }, 1000);
      } else {
        log(`Failed to bind to port ${port} after ${maxRetries} attempts. Using a different port.`);
        // Try using a different port
        const alternatePort = 5001;
        server.listen(alternatePort, host, () => {
          log(`Server running at http://${host}:${alternatePort} (alternate port)`);
        });
      }
    }
  });

  // Handle process termination signals with grace period
  const gracefulShutdown = (signal: string) => {
    log(`Received ${signal} signal, shutting down server...`);
    // Set a timeout to force exit if graceful shutdown takes too long
    const forceExit = setTimeout(() => {
      log('Forcing server shutdown after timeout');
      process.exit(1);
    }, 10000); // 10 second timeout
    
    server.close(() => {
      clearTimeout(forceExit);
      log('Server closed gracefully');
      process.exit(0);
    });
  };
  
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
})();
