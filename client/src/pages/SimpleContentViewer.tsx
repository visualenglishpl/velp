import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useToast } from '@/hooks/use-toast';

/**
 * SimpleContentViewer - A stripped-down, minimal viewer for accessing content
 * This component is designed for debugging and testing purposes only
 */
export default function SimpleContentViewer() {
  const { toast } = useToast();
  const [showDebugInfo, setShowDebugInfo] = useState(false);
  const [contentUrl, setContentUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [serverStatus, setServerStatus] = useState<any>(null);

  // Check server health
  useEffect(() => {
    const checkServerHealth = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('/api/healthcheck');
        if (!response.ok) {
          throw new Error(`Server health check failed: ${response.status}`);
        }
        const data = await response.json();
        setServerStatus(data);
        toast({
          title: 'Server Connection Established',
          description: 'Successfully connected to the server.',
          variant: 'default',
        });
      } catch (err) {
        console.error('Server health check error:', err);
        setError(`Failed to connect to server: ${err instanceof Error ? err.message : String(err)}`);
        toast({
          title: 'Server Connection Failed',
          description: err instanceof Error ? err.message : String(err),
          variant: 'destructive',
        });
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center my-8">
          <h1 className="text-3xl font-bold">Simple Content Viewer</h1>
          <p className="text-gray-500 mt-2">A minimal debug tool for testing server connectivity</p>
        </div>

        {/* Server Status Card */}
        <Card>
          <CardHeader>
            <CardTitle>Server Status</CardTitle>
            <CardDescription>
              Backend server connection health check
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
                <h3 className="font-medium">Error</h3>
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
          </CardContent>
        </Card>

        {/* Direct Image Viewer */}
        <Card>
          <CardHeader>
            <CardTitle>Direct Image Viewer</CardTitle>
            <CardDescription>
              Enter a direct URL to an image to view it
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={contentUrl}
                onChange={(e) => setContentUrl(e.target.value)}
                className="flex-1 rounded-md border border-input px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter image URL (http://...)"
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
              <Button variant="outline" onClick={() => window.open('/simple-test', '_blank')}>
                Simple Test Page
              </Button>
              <Button variant="outline" onClick={() => window.open('/api/test', '_blank')}>
                API Test Endpoint
              </Button>
              <Button variant="outline" onClick={() => window.open('/', '_blank')}>
                Main Application
              </Button>
              <Button variant="outline" onClick={() => window.open('/books', '_blank')}>
                Books Page
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="default" onClick={() => window.location.reload()}>
              Refresh Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}