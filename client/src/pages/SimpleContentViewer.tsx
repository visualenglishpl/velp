import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

/**
 * SimpleContentViewer - A stripped-down, minimal viewer for accessing content
 * This component is designed for debugging and testing purposes only
 */
export default function SimpleContentViewer() {
  const { toast } = useToast();
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [contentUrl, setContentUrl] = useState('');
  const [apiUrl, setApiUrl] = useState('/api/healthcheck');
  const [apiResponse, setApiResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<any>(null);
  const [connectionMethod, setConnectionMethod] = useState<string | null>(null);
  
  // Connection test results for UI display
  const [testResults, setTestResults] = useState<{
    [key: string]: { success: boolean; status: number | null; response: any | null; error: string | null }
  }>({
    directApi: { success: false, status: null, response: null, error: null },
    directNoApi: { success: false, status: null, response: null, error: null },
    apiRequestLib: { success: false, status: null, response: null, error: null },
    viaQueryClient: { success: false, status: null, response: null, error: null },
  });

  // Try different API connection methods
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        setIsLoading(true);
        
        // Reset test results
        const newResults = {
          directApi: { success: false, status: null, response: null, error: null },
          directNoApi: { success: false, status: null, response: null, error: null },
          apiRequestLib: { success: false, status: null, response: null, error: null },
          viaQueryClient: { success: false, status: null, response: null, error: null },
        };
        
        // Method 1: Direct fetch to API
        try {
          console.log('Attempting direct API connection to /api/healthcheck');
          const response = await fetch('/api/healthcheck');
          newResults.directApi.status = response.status;
          
          if (response.ok) {
            const data = await response.json();
            newResults.directApi.success = true;
            newResults.directApi.response = data;
            setServerStatus(data);
            setConnectionMethod('direct-api');
            console.log('Direct API connection successful:', data);
          } else {
            newResults.directApi.error = `Status: ${response.status}`;
            console.log('Direct API connection failed with status:', response.status);
          }
        } catch (directErr) {
          newResults.directApi.error = directErr instanceof Error ? directErr.message : String(directErr);
          console.error('Direct API connection error:', directErr);
        }
        
        // Method 2: Try a relative path without /api prefix
        try {
          console.log('Attempting connection without /api prefix');
          const response = await fetch('/healthcheck');
          newResults.directNoApi.status = response.status;
          
          if (response.ok) {
            const data = await response.json();
            newResults.directNoApi.success = true;
            newResults.directNoApi.response = data;
            
            if (!serverStatus) {
              setServerStatus(data);
              setConnectionMethod('direct-no-api');
              console.log('Connection without /api prefix successful:', data);
            }
          } else {
            newResults.directNoApi.error = `Status: ${response.status}`;
            console.log('Alternative path connection failed with status:', response.status);
          }
        } catch (altErr) {
          newResults.directNoApi.error = altErr instanceof Error ? altErr.message : String(altErr);
          console.error('Alternative path connection error:', altErr);
        }
        
        // Method 3: Use the apiRequest function from our library
        try {
          console.log('Attempting connection via apiRequest library');
          const response = await apiRequest('GET', '/api/healthcheck');
          newResults.apiRequestLib.status = response.status;
          
          if (response.ok) {
            const data = await response.json();
            newResults.apiRequestLib.success = true;
            newResults.apiRequestLib.response = data;
            
            if (!serverStatus) {
              setServerStatus(data);
              setConnectionMethod('api-request-lib');
              console.log('apiRequest library connection successful:', data);
            }
          } else {
            newResults.apiRequestLib.error = `Status: ${response.status}`;
            console.log('apiRequest library connection failed with status:', response.status);
          }
        } catch (libErr) {
          newResults.apiRequestLib.error = libErr instanceof Error ? libErr.message : String(libErr);
          console.error('apiRequest library connection error:', libErr);
        }
        
        // Update the test results
        setTestResults(newResults);
        
        // Check if we have any successful connection
        const anySuccess = Object.values(newResults).some(r => r.success);
        
        if (!anySuccess) {
          // All methods failed
          console.log('All connection methods failed');
          setError('Could not connect to server API. Check console for details.');
          toast({
            title: 'Connection Failed',
            description: 'All connection methods to the server failed.',
            variant: 'destructive',
          });
        } else if (!serverStatus) {
          // We have results but no status set yet (shouldn't happen but just in case)
          const firstSuccessful = Object.entries(newResults).find(([_, r]) => r.success);
          if (firstSuccessful) {
            setServerStatus(firstSuccessful[1].response);
            setConnectionMethod(firstSuccessful[0]);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkServerHealth();
  }, [toast]);

  // Load image from direct URL input
  const handleLoadImage = async () => {
    if (!contentUrl) {
      toast({
        title: 'No URL provided',
        description: 'Please enter a valid image URL.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      // Simple check to see if image exists and can load
      const img = new Image();
      img.onload = () => {
        setIsLoading(false);
        setError(null);
        toast({
          title: 'Image Loaded Successfully',
          description: 'The image was loaded successfully.',
        });
      };
      img.onerror = () => {
        setIsLoading(false);
        setError('Failed to load image from URL');
        toast({
          title: 'Image Load Failed',
          description: 'Failed to load image from the provided URL.',
          variant: 'destructive',
        });
      };
      img.src = contentUrl;
    } catch (err) {
      setIsLoading(false);
      setError(`Image load error: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  // Test custom API endpoint
  const handleTestApi = async () => {
    if (!apiUrl) {
      toast({
        title: 'No API URL provided',
        description: 'Please enter a valid API endpoint.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setIsLoading(true);
      setApiResponse(null);
      
      console.log(`Testing custom API endpoint: ${apiUrl}`);
      
      // Try multiple methods and see which one works
      try {
        // First try with fetch directly
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setApiResponse(data);
          toast({
            title: 'API Request Successful',
            description: `Successfully fetched from ${apiUrl}`,
          });
          return;
        }
        console.log(`Direct fetch to ${apiUrl} failed with status ${response.status}`);
      } catch (directErr) {
        console.error(`Direct fetch to ${apiUrl} error:`, directErr);
      }

      try {
        // Try with apiRequest library
        const response = await apiRequest('GET', apiUrl);
        if (response.ok) {
          const data = await response.json();
          setApiResponse(data);
          toast({
            title: 'API Request Successful',
            description: `Successfully fetched from ${apiUrl} using apiRequest`,
          });
          return;
        }
        console.log(`apiRequest to ${apiUrl} failed with status ${response.status}`);
      } catch (libErr) {
        console.error(`apiRequest to ${apiUrl} error:`, libErr);
        
        // If we got this far, all methods failed
        setError(`Failed to fetch from ${apiUrl}. Check console for details.`);
        toast({
          title: 'API Request Failed',
          description: `Could not fetch from ${apiUrl}`,
          variant: 'destructive',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Reset all tests and try again
  const handleRetryAll = () => {
    setServerStatus(null);
    setConnectionMethod(null);
    setError(null);
    setApiResponse(null);
    toast({
      title: 'Retrying All Tests',
      description: 'Retrying all API connection tests...',
    });
    // Will trigger the useEffect
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center my-8">
          <h1 className="text-3xl font-bold">API Diagnostics</h1>
          <p className="text-gray-500 mt-2">A comprehensive tool for diagnosing API connectivity issues</p>
        </div>

        {/* Server Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Server Connection Status</CardTitle>
            <CardDescription>
              Backend server connection health check using multiple methods
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-3/5" />
              </div>
            ) : error ? (
              <div className="p-4 border border-destructive rounded-md bg-destructive/10 text-destructive">
                <h3 className="font-medium">Connection Error</h3>
                <p>{error}</p>
              </div>
            ) : serverStatus ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="font-medium">Status: {serverStatus.status}</span>
                </div>
                <p>Server Time: {serverStatus.timestamp}</p>
                <p>Environment: {serverStatus.serverInfo?.environment}</p>
                <p>Connection Method: <span className="font-semibold">{connectionMethod}</span></p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowDebugInfo(!showDebugInfo)}
                >
                  {showDebugInfo ? 'Hide' : 'Show'} Debug Info
                </Button>
                {showDebugInfo && (
                  <pre className="mt-4 p-4 bg-muted rounded-md text-xs overflow-auto">
                    {JSON.stringify(serverStatus, null, 2)}
                  </pre>
                )}
              </div>
            ) : (
              <p>No server information available</p>
            )}
            
            {/* Detailed test results */}
            <div className="mt-6">
              <h3 className="font-medium mb-2">Connection Test Results:</h3>
              <div className="space-y-3">
                {Object.entries(testResults).map(([method, result]) => (
                  <div 
                    key={method}
                    className={`p-3 rounded-md ${
                      result.success 
                        ? 'bg-green-50 border border-green-100' 
                        : 'bg-gray-50 border border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">
                        {method === 'directApi' && 'Direct fetch with /api/'}
                        {method === 'directNoApi' && 'Direct fetch without /api/'}
                        {method === 'apiRequestLib' && 'Using apiRequest library'}
                        {method === 'viaQueryClient' && 'Using React Query'}
                      </span>
                      <span className={`text-sm ${result.success ? 'text-green-600' : 'text-gray-500'}`}>
                        {result.success ? 'Success' : result.status ? `Failed (${result.status})` : 'Not attempted'}
                      </span>
                    </div>
                    {result.error && (
                      <p className="text-sm text-red-500 mt-1">{result.error}</p>
                    )}
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <Button onClick={handleRetryAll}>
                  Retry All Tests
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom API Tester */}
        <Card>
          <CardHeader>
            <CardTitle>Custom API Tester</CardTitle>
            <CardDescription>
              Test any API endpoint on the server
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={apiUrl}
                onChange={(e) => setApiUrl(e.target.value)}
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter API endpoint (e.g., /api/test)"
              />
              <Button onClick={handleTestApi} disabled={isLoading}>
                Test API
              </Button>
            </div>
            
            {apiResponse && (
              <div className="mt-4">
                <h3 className="font-medium mb-2">API Response:</h3>
                <pre className="p-4 bg-muted rounded-md text-xs overflow-auto">
                  {JSON.stringify(apiResponse, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Direct Image Viewer */}
        <Card>
          <CardHeader>
            <CardTitle>Direct Image Viewer</CardTitle>
            <CardDescription>
              Enter a direct URL to an image to verify content access
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL (e.g., /api/content/image.jpg)"
              />
              <Button onClick={handleLoadImage} disabled={isLoading}>
                Load Image
              </Button>
            </div>
            
            {contentUrl && (
              <div className="mt-4 border rounded-md p-1 bg-muted/50">
                <img 
                  src={contentUrl} 
                  alt="Content preview" 
                  className="max-w-full h-auto max-h-96 mx-auto object-contain rounded"
                  onError={() => {
                    setError('Failed to load image');
                  }}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Additional Debug Links */}
        <Card>
          <CardHeader>
            <CardTitle>Debug Navigation</CardTitle>
            <CardDescription>
              Test different routes and endpoints
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button variant="outline" onClick={() => window.open('/direct-test.html', '_blank')}>
                Direct Test Page
              </Button>
              <Button variant="outline" onClick={() => window.open('/static-test.html', '_blank')}>
                Static Test Page
              </Button>
              <Button variant="outline" onClick={() => window.open('/api/test', '_blank')}>
                API Test Endpoint
              </Button>
              <Button variant="outline" onClick={() => window.open('/healthcheck', '_blank')}>
                Direct Healthcheck
              </Button>
              <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                Main Application
              </Button>
              <Button variant="outline" onClick={() => window.open('/api-diagnostics.html', '_blank')}>
                API Diagnostics Page
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="default" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </CardFooter>
        </Card>
        
        {/* Browser Info Card */}
        <Card>
          <CardHeader>
            <CardTitle>Browser Information</CardTitle>
            <CardDescription>
              Details about the current browser environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">User Agent</h3>
                <p className="text-sm bg-muted p-2 rounded">{navigator.userAgent}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Connection Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between bg-muted p-2 rounded">
                    <span>Online</span>
                    <span>{navigator.onLine ? "Yes" : "No"}</span>
                  </div>
                  {'connection' in navigator && 'effectiveType' in (navigator as any).connection && (
                    <>
                      <div className="flex justify-between bg-muted p-2 rounded">
                        <span>Connection Type</span>
                        <span>{(navigator as any).connection.effectiveType || "unknown"}</span>
                      </div>
                      <div className="flex justify-between bg-muted p-2 rounded">
                        <span>Downlink</span>
                        <span>{(navigator as any).connection.downlink || "unknown"} Mbps</span>
                      </div>
                      <div className="flex justify-between bg-muted p-2 rounded">
                        <span>Round-Trip Time</span>
                        <span>{(navigator as any).connection.rtt || "unknown"} ms</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Browser Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                  <div className="flex justify-between bg-muted p-2 rounded">
                    <span>Fetch API</span>
                    <span className={`font-medium ${typeof fetch !== 'undefined' ? 'text-green-600' : 'text-red-600'}`}>
                      {typeof fetch !== 'undefined' ? "Supported" : "Not Supported"}
                    </span>
                  </div>
                  <div className="flex justify-between bg-muted p-2 rounded">
                    <span>Promise API</span>
                    <span className={`font-medium ${typeof Promise !== 'undefined' ? 'text-green-600' : 'text-red-600'}`}>
                      {typeof Promise !== 'undefined' ? "Supported" : "Not Supported"}
                    </span>
                  </div>
                  <div className="flex justify-between bg-muted p-2 rounded">
                    <span>WebSockets</span>
                    <span className={`font-medium ${typeof WebSocket !== 'undefined' ? 'text-green-600' : 'text-red-600'}`}>
                      {typeof WebSocket !== 'undefined' ? "Supported" : "Not Supported"}
                    </span>
                  </div>
                  <div className="flex justify-between bg-muted p-2 rounded">
                    <span>Cookies Enabled</span>
                    <span className={`font-medium ${navigator.cookieEnabled ? 'text-green-600' : 'text-red-600'}`}>
                      {navigator.cookieEnabled ? "Yes" : "No"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}