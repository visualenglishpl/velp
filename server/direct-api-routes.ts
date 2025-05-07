import { Express, Request, Response, NextFunction } from 'express';

/**
 * Register special API routes that bypass Vite's dev server
 * These routes are accessible directly via fetch with non-standard paths
 */
export function registerDirectApiRoutes(app: Express) {
  console.log('Setting up direct API routes that bypass Vite');
  
  // Request logger middleware to track all incoming requests
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Skip logging for static assets to reduce noise
    if (req.path.includes('.') && !req.path.endsWith('.html') && !req.path.includes('/api/')) {
      return next();
    }
    
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    
    // Capture original end method to log response status
    const originalEnd = res.end;
    res.end = function(...args: any[]) {
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.path} ${res.statusCode}`);
      return originalEnd.apply(res, args);
    };
    
    next();
  });
  
  // Add diagnostic headers middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Add diagnostic headers to all responses
    res.setHeader('X-Served-By', 'Express-Direct');
    res.setHeader('X-Request-Path', req.path);
    res.setHeader('X-Request-Method', req.method);
    next();
  });
  
  // Non-prefixed routes - these don't use /api prefix to avoid being caught by Vite
  app.get('/healthcheck', (req: Request, res: Response) => {
    console.log('Direct healthcheck route hit');
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      direct: true,
      requestInfo: {
        path: req.path,
        method: req.method,
        query: req.query,
        headers: req.headers,
      },
      serverInfo: {
        environment: process.env.NODE_ENV || 'unknown',
        platform: process.platform,
        nodeVersion: process.version,
      }
    });
  });

  app.get('/testapi', (req: Request, res: Response) => {
    console.log('Direct test API route hit');
    res.json({
      message: 'Direct API test endpoint is working',
      timestamp: new Date().toISOString(),
      direct: true,
      path: req.path,
      method: req.method,
      query: req.query,
      cookies: req.cookies,
      serverInfo: {
        environment: process.env.NODE_ENV || 'unknown',
        platform: process.platform,
        nodeVersion: process.version,
      }
    });
  });
  
  // Special route for CORS testing
  app.get('/cors-test', (req: Request, res: Response) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    
    res.json({
      message: 'CORS test endpoint is working',
      timestamp: new Date().toISOString(),
      headers: req.headers,
      cors: true
    });
  });

  // Echo route that returns everything about the request
  app.all('/echo', (req: Request, res: Response) => {
    console.log('Echo route hit with method:', req.method);
    res.json({
      message: 'Echo endpoint',
      timestamp: new Date().toISOString(),
      method: req.method,
      path: req.path,
      params: req.params,
      query: req.query,
      body: req.body,
      headers: req.headers,
      cookies: req.cookies,
      protocol: req.protocol,
      secure: req.secure,
      ip: req.ip,
      xhr: req.xhr,
      hostname: req.hostname
    });
  });
  
  // Mirror route for testing different HTTP methods
  app.all('/mirror', (req: Request, res: Response) => {
    const responseData = {
      message: `Mirror endpoint reflecting your ${req.method} request`,
      method: req.method,
      path: req.path,
      query: req.query,
      body: req.body,
      timestamp: new Date().toISOString()
    };
    
    switch (req.method) {
      case 'GET':
        res.json(responseData);
        break;
      case 'POST':
        res.status(201).json({
          ...responseData,
          status: 'created'
        });
        break;
      case 'PUT':
        res.json({
          ...responseData,
          status: 'updated'
        });
        break;
      case 'DELETE':
        res.json({
          ...responseData,
          status: 'deleted'
        });
        break;
      default:
        res.json(responseData);
    }
  });
  
  // Route to test error handling
  app.get('/test-error/:code', (req: Request, res: Response) => {
    const statusCode = parseInt(req.params.code) || 500;
    console.log(`Test error route hit with code: ${statusCode}`);
    res.status(statusCode).json({
      error: `Test error with code ${statusCode}`,
      message: `This is a test error response with code ${statusCode}`,
      timestamp: new Date().toISOString()
    });
  });
  
  // Route to test delayed responses
  app.get('/test-delay/:ms', (req: Request, res: Response) => {
    const delayMs = parseInt(req.params.ms) || 1000;
    console.log(`Test delay route hit with delay: ${delayMs}ms`);
    setTimeout(() => {
      res.json({
        message: `Response delayed by ${delayMs}ms`,
        timestamp: new Date().toISOString(),
        delay: delayMs
      });
    }, delayMs);
  });

  console.log('Direct API routes initialized successfully');
}