import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeacherResource } from '@/components/TeacherResources';

interface OptimizedResourceViewerProps {
  bookId: string;
  unitId: string;
  initialTitle?: string;
}

export default function OptimizedResourceViewer({ 
  bookId, 
  unitId,
  initialTitle = 'Resource Viewer' 
}: OptimizedResourceViewerProps) {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const loadResources = async () => {
      if (!bookId || !unitId) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        // Dynamically import the resource file
        const resourcePath = `./data/book${bookId}-unit${unitId}-resources`;
        console.log(`Attempting to load: ${resourcePath}`);
        
        const module = await import(`${resourcePath}.tsx`);
        console.log('Module loaded:', Object.keys(module));
        
        // Check various ways the resources might be exported
        if (module.resources) {
          setResources(module.resources);
        } else {
          // Try the legacy naming pattern
          const legacyKey = `book${bookId}Unit${unitId}Resources`;
          if (module[legacyKey]) {
            setResources(module[legacyKey]);
          } else {
            setError(`Could not find resources in the module for Book ${bookId} Unit ${unitId}`);
          }
        }
      } catch (err: any) {
        console.error('Error loading resources:', err);
        setError(err.message || 'Failed to load resources');
        
        // Try to load from implementation file as fallback
        try {
          const implementationPath = `./data/book${bookId}-unit${unitId}-implementation`;
          console.log(`Attempting fallback load: ${implementationPath}`);
          
          const implementationModule = await import(`${implementationPath}.tsx`);
          const getResourcesFunc = implementationModule[`getBook${bookId}Unit${unitId}Resources`];
          
          if (typeof getResourcesFunc === 'function') {
            const resourcesResult = getResourcesFunc();
            setResources(resourcesResult);
            setError(null); // Clear error since we found resources
          }
        } catch (fallbackErr: any) {
          console.error('Fallback load also failed:', fallbackErr);
          // Keep the original error message
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, [bookId, unitId]);

  const renderResourceItem = (resource: TeacherResource, index: number) => (
    <div key={resource.id || index} className="p-3 border rounded mb-2">
      <div className="font-medium">{resource.title}</div>
      <div className="text-sm text-gray-500">{resource.resourceType}</div>
      {showDetails && (
        <div className="mt-2 pt-2 border-t text-xs">
          <div><span className="font-medium">ID:</span> {resource.id}</div>
          <div><span className="font-medium">Provider:</span> {resource.provider}</div>
          {resource.sourceUrl && (
            <div><span className="font-medium">URL:</span> {resource.sourceUrl}</div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>{initialTitle} - Book {bookId} Unit {unitId}</span>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? 'Hide Details' : 'Show Details'}
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="p-4 text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent" />
            <p className="mt-2">Loading resources...</p>
          </div>
        ) : error ? (
          <div className="p-4 border border-red-200 bg-red-50 rounded text-red-800">
            <p className="font-medium">Error loading resources:</p>
            <p className="mt-1">{error}</p>
          </div>
        ) : resources.length === 0 ? (
          <div className="p-4 border border-yellow-200 bg-yellow-50 rounded text-yellow-800">
            <p>No resources found for Book {bookId} Unit {unitId}</p>
          </div>
        ) : (
          <div>
            <div className="mb-4">
              <span className="font-medium">{resources.length} resources found</span>
            </div>
            <div className="max-h-[400px] overflow-y-auto pr-2">
              {resources.map(renderResourceItem)}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
