import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ExternalLink, Check, X, AlertCircle } from 'lucide-react';

type TestResult = {
  status: 'success' | 'error' | 'loading' | null;
  message: string;
  timestamp: string;
  url?: string;
};

export default function S3ConnectivityTest() {
  const [bookId, setBookId] = useState('book1');
  const [unitId, setUnitId] = useState('unit1');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<TestResult[]>([]);

  const addResult = (result: Omit<TestResult, 'timestamp'>) => {
    setResults(prev => [
      {
        ...result,
        timestamp: new Date().toLocaleTimeString()
      },
      ...prev
    ]);
  };

  const testS3Connection = async () => {
    setIsLoading(true);
    
    // Step 1: Test basic API connectivity
    addResult({
      status: 'loading',
      message: `Testing API connectivity to book ${bookId}/${unitId}...`
    });

    try {
      // Test unit metadata endpoint
      const unitResponse = await fetch(`/api/direct/${bookId}/${unitId}`);
      
      if (!unitResponse.ok) {
        throw new Error(`Failed to fetch unit data: ${unitResponse.status} ${unitResponse.statusText}`);
      }
      
      const unitData = await unitResponse.json();
      addResult({
        status: 'success',
        message: `Successfully connected to unit data: ${unitData.title || 'Unit found'}`
      });
      
      // Test materials endpoint
      addResult({
        status: 'loading',
        message: `Testing materials data for ${bookId}/${unitId}...`
      });
      
      const materialsResponse = await fetch(`/api/direct/${bookId}/${unitId}/materials`);
      
      if (!materialsResponse.ok) {
        throw new Error(`Failed to fetch materials: ${materialsResponse.status} ${materialsResponse.statusText}`);
      }
      
      const materials = await materialsResponse.json();
      
      if (!Array.isArray(materials) || materials.length === 0) {
        addResult({
          status: 'error',
          message: `No materials found for ${bookId}/${unitId} (Empty array returned)`
        });
      } else {
        addResult({
          status: 'success',
          message: `Found ${materials.length} materials for ${bookId}/${unitId}`
        });
        
        // Test first material image
        if (materials[0] && materials[0].contentType === 'image') {
          addResult({
            status: 'loading',
            message: `Testing image loading for first material: ${materials[0].content}...`
          });
          
          const imageUrl = `/api/direct/${bookId}/${unitId}/assets/${encodeURIComponent(materials[0].content)}`;
          
          // Test image loading
          const img = new Image();
          img.onload = () => {
            addResult({
              status: 'success',
              message: `Successfully loaded image: ${materials[0].content}`,
              url: imageUrl
            });
            setIsLoading(false);
          };
          
          img.onerror = () => {
            addResult({
              status: 'error',
              message: `Failed to load image: ${materials[0].content}`,
              url: imageUrl
            });
            setIsLoading(false);
          };
          
          img.src = imageUrl;
        } else {
          setIsLoading(false);
        }
      }
    } catch (error) {
      addResult({
        status: 'error',
        message: error instanceof Error ? error.message : String(error)
      });
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>S3 Connectivity Test</CardTitle>
        <CardDescription>
          Test connectivity to the S3 bucket and content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="bookId">
              Book ID
            </label>
            <Input
              id="bookId"
              value={bookId}
              onChange={(e) => setBookId(e.target.value)}
              placeholder="e.g. book1"
              disabled={isLoading}
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1" htmlFor="unitId">
              Unit ID
            </label>
            <Input
              id="unitId"
              value={unitId} 
              onChange={(e) => setUnitId(e.target.value)}
              placeholder="e.g. unit1"
              disabled={isLoading}
            />
          </div>
        </div>
        
        <div className="border rounded-md">
          <div className="p-3 border-b bg-gray-50 font-medium">Test Results</div>
          <div className="max-h-60 overflow-y-auto p-2">
            {results.length > 0 ? (
              <div className="space-y-2">
                {results.map((result, index) => (
                  <div key={index} className="text-sm p-2 border rounded flex items-start gap-2">
                    {result.status === 'loading' && (
                      <Loader2 className="h-4 w-4 mt-0.5 animate-spin text-blue-500 shrink-0" />
                    )}
                    {result.status === 'success' && (
                      <Check className="h-4 w-4 mt-0.5 text-green-500 shrink-0" />
                    )}
                    {result.status === 'error' && (
                      <X className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
                    )}
                    <div className="flex-1">
                      <div className={
                        result.status === 'success' ? 'text-green-700' : 
                        result.status === 'error' ? 'text-red-700' : 
                        'text-blue-700'
                      }>
                        {result.message}
                      </div>
                      {result.url && (
                        <a 
                          href={result.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 flex items-center gap-1 mt-1 hover:underline"
                        >
                          View resource <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                    <div className="text-xs text-gray-500">{result.timestamp}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center p-6 text-gray-500">
                <AlertCircle className="h-4 w-4 mr-2" />
                No tests run yet
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={testS3Connection}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? 'Testing Connection...' : 'Test Connection'}
        </Button>
      </CardFooter>
    </Card>
  );
}