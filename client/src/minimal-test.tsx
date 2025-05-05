import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

/**
 * MinimalTest - A component that demonstrates lazy resource loading
 * with minimal dependencies
 */
export default function MinimalTest() {
  const [resourceContent, setResourceContent] = useState<React.ReactNode | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Basic example resources that don't include heavy imports
  const sampleResources = [
    { id: 1, title: 'Sample Lesson Plan', type: 'lesson_plan' },
    { id: 2, title: 'Vocabulary Exercise', type: 'worksheet' },
    { id: 3, title: 'Interactive Activity', type: 'game' },
  ];
  
  const loadOptimizedComponent = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Dynamically import the OptimizedResourceViewer component
      const { default: OptimizedResourceViewer } = await import('./optimized-resource-viewer');
      
      // Set the component with default book/unit IDs
      setResourceContent(
        <OptimizedResourceViewer 
          bookId="4" 
          unitId="4" 
          initialTitle="Lazy-Loaded Resources"
        />
      );
    } catch (err: any) {
      console.error('Error loading optimized component:', err);
      setError(err.message || 'Failed to load component');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="bg-blue-50 border border-blue-200 p-4 rounded mb-6">
        <h1 className="text-2xl font-bold text-blue-700 mb-2">ℹ️ Minimal Test Page</h1>
        <p className="text-blue-700">
          This page demonstrates minimal resource loading with dynamic imports.
        </p>
      </div>
      
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Resources (No Imports)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleResources.map(resource => (
                <div key={resource.id} className="p-3 border rounded">
                  <div className="font-medium">{resource.title}</div>
                  <div className="text-sm text-gray-500">{resource.type}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="mb-6">
        <Button 
          onClick={loadOptimizedComponent}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load Resources (Dynamic Import)'}
        </Button>
        
        <div className="mt-2 text-sm text-gray-500">
          This will dynamically import the OptimizedResourceViewer component without
          loading all the resource files up front.
        </div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 border border-red-200 rounded bg-red-50 text-red-700">
          <div className="font-semibold">Error:</div>
          <div>{error}</div>
        </div>
      )}
      
      {resourceContent}
      
      <div className="mt-6">
        <div className="flex justify-between">
          <a href="/ultra-minimal-test" className="text-blue-500 hover:underline">
            &larr; Ultra Minimal Test
          </a>
          <a href="/resources-test" className="text-blue-500 hover:underline">
            Resources Test &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}