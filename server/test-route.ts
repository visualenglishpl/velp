import { Express, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

/**
 * Setup test routes for diagnosing server connectivity issues
 * These routes are specifically for debugging and should not be included in production
 */
export function setupTestRoutes(app: Express) {
  console.log('Setting up test routes for diagnostics');

  // Basic health check endpoint that returns JSON
  app.get('/api/healthcheck', (req: Request, res: Response) => {
    console.log('Health check API route hit');
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      serverInfo: {
        environment: process.env.NODE_ENV || 'unknown',
        platform: process.platform,
        nodeVersion: process.version,
      }
    });
  });

  // More detailed API test endpoint
  app.get('/api/test', (req: Request, res: Response) => {
    console.log('Test API route hit');
    res.json({
      message: 'API test endpoint is working',
      timestamp: new Date().toISOString(),
      headers: req.headers,
      query: req.query,
      method: req.method,
      path: req.path,
      serverInfo: {
        environment: process.env.NODE_ENV || 'unknown',
        platform: process.platform,
        nodeVersion: process.version,
        memoryUsage: process.memoryUsage(),
      }
    });
  });
  
  // Direct HTML page for testing without frontend
  app.get('/api-direct-test', (req: Request, res: Response) => {
    console.log('Direct API test route hit');
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Direct API Test</title>
          <style>
            body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
            h1 { color: #333; }
            .card { border: 1px solid #ddd; border-radius: 8px; padding: 16px; margin-bottom: 16px; }
            button { background: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
            button:hover { background: #45a049; }
            pre { background: #f5f5f5; padding: 10px; border-radius: 4px; overflow-x: auto; }
            .error { color: red; }
            .success { color: green; }
          </style>
        </head>
        <body>
          <h1>Direct API Test Page</h1>
          <p>This page makes direct API calls to test server connectivity.</p>
          
          <div class="card">
            <h2>Health Check</h2>
            <button id="healthBtn">Test /api/healthcheck</button>
            <div id="healthResult"></div>
          </div>
          
          <div class="card">
            <h2>API Test</h2>
            <button id="apiBtn">Test /api/test</button>
            <div id="apiResult"></div>
          </div>
          
          <script>
            document.getElementById('healthBtn').addEventListener('click', async () => {
              const resultDiv = document.getElementById('healthResult');
              resultDiv.innerHTML = '<p>Loading...</p>';
              
              try {
                const response = await fetch('/api/healthcheck');
                const data = await response.json();
                resultDiv.innerHTML = '<p class="success">Success! Response:</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                resultDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
              }
            });
            
            document.getElementById('apiBtn').addEventListener('click', async () => {
              const resultDiv = document.getElementById('apiResult');
              resultDiv.innerHTML = '<p>Loading...</p>';
              
              try {
                const response = await fetch('/api/test');
                const data = await response.json();
                resultDiv.innerHTML = '<p class="success">Success! Response:</p><pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                resultDiv.innerHTML = '<p class="error">Error: ' + error.message + '</p>';
              }
            });
          </script>
        </body>
      </html>
    `);
  });

  // Simple HTML page for testing
  app.get('/simple-test', (req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Visual English - Test Page</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            line-height: 1.6;
            padding: 2rem;
            max-width: 800px;
            margin: 0 auto;
            color: #333;
          }
          h1 { color: #4f46e5; }
          .card {
            padding: 1rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 1rem;
            background-color: #f9fafb;
          }
          .success { color: #10b981; }
          .error { color: #ef4444; }
          button {
            background-color: #4f46e5;
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 4px;
            cursor: pointer;
            font-size: 1rem;
          }
          button:hover {
            background-color: #4338ca;
          }
          pre {
            background-color: #f3f4f6;
            padding: 1rem;
            border-radius: 4px;
            overflow-x: auto;
          }
        </style>
      </head>
      <body>
        <h1>Visual English Test Page</h1>
        <p>This is a simple test page to verify that the Express server is functioning correctly.</p>
        
        <div class="card">
          <h2>Server Status</h2>
          <p class="success">✓ Server is running</p>
          <p>Current time: ${new Date().toISOString()}</p>
          <p>Environment: ${process.env.NODE_ENV || 'unknown'}</p>
        </div>
        
        <div class="card">
          <h2>API Test</h2>
          <button id="testApi">Test API Connection</button>
          <div id="apiResult" style="margin-top: 1rem;"></div>
        </div>
        
        <div class="card">
          <h2>Navigation</h2>
          <p>Try these links to test various parts of the application:</p>
          <ul>
            <li><a href="/">Home Page</a></li>
            <li><a href="/debug">Debug Page</a></li>
            <li><a href="/simple">Simple Content Viewer</a></li>
            <li><a href="/api/healthcheck">API Health Check (JSON)</a></li>
          </ul>
        </div>
        
        <script>
          document.getElementById('testApi').addEventListener('click', async () => {
            const resultElement = document.getElementById('apiResult');
            resultElement.innerHTML = '<p>Testing API connection...</p>';
            
            try {
              const response = await fetch('/api/test');
              const data = await response.json();
              
              resultElement.innerHTML = '<p class="success">✓ API connection successful</p>' +
                '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
            } catch (error) {
              resultElement.innerHTML = '<p class="error">✗ API connection failed</p>' +
                '<pre>' + error.message + '</pre>';
            }
          });
        </script>
      </body>
      </html>
    `);
  });

  // HTML page for testing the API and server directly
  app.get('/api-test.html', (req: Request, res: Response) => {
    // Load the HTML file from disk if it exists, otherwise generate it
    const testFilePath = path.join(process.cwd(), 'client/public/api-test.html');
    
    if (fs.existsSync(testFilePath)) {
      res.sendFile(testFilePath);
    } else {
      res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Visual English - API Test</title>
          <style>
            body {
              font-family: system-ui, -apple-system, sans-serif;
              line-height: 1.5;
              padding: 2rem;
              max-width: 800px;
              margin: 0 auto;
            }
            h1 { color: #4f46e5; }
            .card {
              padding: 1.5rem;
              border-radius: 8px;
              margin-bottom: 1.5rem;
              box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            }
            .success { color: green; }
            .error { color: red; }
            button {
              background-color: #4f46e5;
              color: white;
              border: none;
              padding: 0.6rem 1.2rem;
              border-radius: 0.375rem;
              font-weight: 500;
              cursor: pointer;
            }
            button:hover {
              background-color: #4338ca;
            }
            pre {
              background-color: #f3f4f6;
              padding: 1rem;
              border-radius: 0.375rem;
              overflow-x: auto;
            }
          </style>
        </head>
        <body>
          <h1>Visual English API Test</h1>
          <p>Use this page to test direct API connections to the server.</p>
          
          <div class="card">
            <h2>Health Check</h2>
            <button id="healthCheck">Test Health Check Endpoint</button>
            <div id="healthResult" style="margin-top: 1rem;"></div>
          </div>
          
          <div class="card">
            <h2>API Test Endpoint</h2>
            <button id="apiTest">Test API Endpoint</button>
            <div id="apiTestResult" style="margin-top: 1rem;"></div>
          </div>
          
          <div class="card">
            <h2>Custom API Request</h2>
            <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
              <select id="requestMethod" style="padding: 0.5rem;">
                <option value="GET">GET</option>
                <option value="POST">POST</option>
              </select>
              <input 
                type="text" 
                id="requestUrl" 
                placeholder="/api/endpoint" 
                style="flex-grow: 1; padding: 0.5rem; border: 1px solid #ddd; border-radius: 0.375rem;"
              >
              <button id="sendRequest">Send</button>
            </div>
            <div>
              <textarea 
                id="requestBody" 
                placeholder="Request body (JSON)" 
                style="width: 100%; height: 100px; padding: 0.5rem; border: 1px solid #ddd; border-radius: 0.375rem;"
              ></textarea>
            </div>
            <div id="customResult" style="margin-top: 1rem;"></div>
          </div>
          
          <script>
            // Health check test
            document.getElementById('healthCheck').addEventListener('click', async () => {
              const resultElement = document.getElementById('healthResult');
              resultElement.innerHTML = '<p>Testing health check endpoint...</p>';
              
              try {
                const response = await fetch('/api/healthcheck');
                
                if (!response.ok) {
                  throw new Error('Server returned status: ' + response.status);
                }
                
                const data = await response.json();
                
                resultElement.innerHTML = '<p class="success">✓ Server health check successful</p>' +
                  '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                resultElement.innerHTML = '<p class="error">✗ Health check failed</p>' +
                  '<pre>' + error.message + '</pre>';
              }
            });
            
            // API test endpoint
            document.getElementById('apiTest').addEventListener('click', async () => {
              const resultElement = document.getElementById('apiTestResult');
              resultElement.innerHTML = '<p>Testing API test endpoint...</p>';
              
              try {
                const response = await fetch('/api/test');
                
                if (!response.ok) {
                  throw new Error('Server returned status: ' + response.status);
                }
                
                const data = await response.json();
                
                resultElement.innerHTML = '<p class="success">✓ API test successful</p>' +
                  '<pre>' + JSON.stringify(data, null, 2) + '</pre>';
              } catch (error) {
                resultElement.innerHTML = '<p class="error">✗ API test failed</p>' +
                  '<pre>' + error.message + '</pre>';
              }
            });
            
            // Custom API request
            document.getElementById('sendRequest').addEventListener('click', async () => {
              const resultElement = document.getElementById('customResult');
              const method = document.getElementById('requestMethod').value;
              const url = document.getElementById('requestUrl').value;
              const body = document.getElementById('requestBody').value;
              
              if (!url) {
                resultElement.innerHTML = '<p class="error">✗ URL is required</p>';
                return;
              }
              
              resultElement.innerHTML = '<p>Sending request to ' + url + '...</p>';
              
              try {
                const options = {
                  method,
                  headers: {
                    'Content-Type': 'application/json'
                  }
                };
                
                if (method !== 'GET' && body) {
                  try {
                    // Validate JSON
                    JSON.parse(body);
                    options.body = body;
                  } catch (e) {
                    resultElement.innerHTML = '<p class="error">✗ Invalid JSON in request body</p>';
                    return;
                  }
                }
                
                const response = await fetch(url, options);
                
                let responseText;
                let responseData;
                
                // Try to parse as JSON, if not, treat as text
                try {
                  responseData = await response.json();
                  responseText = JSON.stringify(responseData, null, 2);
                } catch (e) {
                  responseText = await response.text();
                }
                
                const statusClass = response.ok ? 'success' : 'error';
                const statusSymbol = response.ok ? '✓' : '✗';
                
                resultElement.innerHTML = 
                  '<p class="' + statusClass + '">' + statusSymbol + ' Status: ' + response.status + ' ' + response.statusText + '</p>' +
                  '<pre>' + responseText + '</pre>';
              } catch (error) {
                resultElement.innerHTML = '<p class="error">✗ Request failed</p>' +
                  '<pre>' + error.message + '</pre>';
              }
            });
          </script>
        </body>
        </html>
      `);
    }
  });

  console.log('Test routes initialized successfully');
}