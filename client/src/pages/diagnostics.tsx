import WebSocketStatus from "@/components/WebSocketStatus";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ArrowLeft, CheckCircle, Server, XCircle } from "lucide-react";
import { Link } from "wouter";

interface DiagnosticResult {
  name: string;
  status: 'success' | 'error' | 'pending';
  message?: string;
  details?: any;
}

/**
 * Diagnostics page for checking system connectivity and performance
 */
export default function DiagnosticsPage() {
  const [apiStatus, setApiStatus] = useState<DiagnosticResult>({
    name: 'API Connection',
    status: 'pending'
  });
  
  const [s3Status, setS3Status] = useState<DiagnosticResult>({
    name: 'S3 Connection',
    status: 'pending'
  });

  const [dbStatus, setDbStatus] = useState<DiagnosticResult>({
    name: 'Database Connection',
    status: 'pending'
  });

  // Run API diagnostic test
  const testApi = async () => {
    setApiStatus({
      name: 'API Connection',
      status: 'pending'
    });
    
    try {
      const start = performance.now();
      const response = await fetch('/api/diagnostics');
      const latency = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        setApiStatus({
          name: 'API Connection',
          status: 'success',
          message: `Connected (${Math.round(latency)}ms)`,
          details: data
        });
      } else {
        setApiStatus({
          name: 'API Connection',
          status: 'error',
          message: `Failed with status ${response.status}`,
        });
      }
    } catch (error) {
      setApiStatus({
        name: 'API Connection',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Test S3 connection
  const testS3 = async () => {
    setS3Status({
      name: 'S3 Connection',
      status: 'pending'
    });
    
    try {
      const start = performance.now();
      const response = await fetch('/api/assets/test-s3-connection');
      const latency = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        setS3Status({
          name: 'S3 Connection',
          status: 'success',
          message: `Connected (${Math.round(latency)}ms)`,
          details: data
        });
      } else {
        setS3Status({
          name: 'S3 Connection',
          status: 'error',
          message: `Failed with status ${response.status}`
        });
      }
    } catch (error) {
      setS3Status({
        name: 'S3 Connection',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Test database connection
  const testDatabase = async () => {
    setDbStatus({
      name: 'Database Connection',
      status: 'pending'
    });
    
    try {
      const start = performance.now();
      const response = await fetch('/api/db-status');
      const latency = performance.now() - start;
      
      if (response.ok) {
        const data = await response.json();
        setDbStatus({
          name: 'Database Connection',
          status: 'success',
          message: `Connected (${Math.round(latency)}ms)`,
          details: data
        });
      } else {
        setDbStatus({
          name: 'Database Connection',
          status: 'error',
          message: `Failed with status ${response.status}`
        });
      }
    } catch (error) {
      setDbStatus({
        name: 'Database Connection',
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  };

  // Run all tests
  const runAllTests = () => {
    testApi();
    testS3();
    testDatabase();
  };

  // Initialize tests on page load
  useEffect(() => {
    runAllTests();
  }, []);

  // Render status indicator
  const renderStatus = (result: DiagnosticResult) => {
    switch (result.status) {
      case 'success':
        return (
          <div className="flex items-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>{result.message || 'Success'}</span>
          </div>
        );
      case 'error':
        return (
          <div className="flex items-center text-red-600">
            <XCircle className="h-5 w-5 mr-2" />
            <span>{result.message || 'Error'}</span>
          </div>
        );
      case 'pending':
      default:
        return (
          <div className="flex items-center text-yellow-600">
            <div className="h-5 w-5 mr-2 rounded-full border-2 border-yellow-600 border-t-transparent animate-spin" />
            <span>Testing...</span>
          </div>
        );
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-4xl">
      <div className="flex items-center mb-6">
        <Link href="/">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">System Diagnostics</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Server className="h-5 w-5 mr-2" />
              API Connection
            </CardTitle>
            <CardDescription>Tests connectivity to the Visual English API endpoints</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                {renderStatus(apiStatus)}
              </div>
              
              {apiStatus.details && (
                <div className="bg-muted/20 p-3 rounded text-xs overflow-x-auto">
                  <pre>{JSON.stringify(apiStatus.details, null, 2)}</pre>
                </div>
              )}
              
              <Button onClick={testApi} size="sm">Test Again</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>WebSocket Connection</CardTitle>
            <CardDescription>Tests real-time communication with the Visual English server</CardDescription>
          </CardHeader>
          <CardContent>
            <WebSocketStatus showControls={true} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>S3 Storage</CardTitle>
            <CardDescription>Tests connectivity to Amazon S3 for content storage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                {renderStatus(s3Status)}
              </div>
              
              {s3Status.details && (
                <div className="bg-muted/20 p-3 rounded text-xs overflow-x-auto">
                  <pre>{JSON.stringify(s3Status.details, null, 2)}</pre>
                </div>
              )}
              
              <Button onClick={testS3} size="sm">Test Again</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>Tests connectivity to the database</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Status:</span>
                {renderStatus(dbStatus)}
              </div>
              
              {dbStatus.details && (
                <div className="bg-muted/20 p-3 rounded text-xs overflow-x-auto">
                  <pre>{JSON.stringify(dbStatus.details, null, 2)}</pre>
                </div>
              )}
              
              <Button onClick={testDatabase} size="sm">Test Again</Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-center">
        <Button onClick={runAllTests}>Run All Tests</Button>
      </div>
    </div>
  );
}