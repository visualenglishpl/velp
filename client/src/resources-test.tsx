import React, { useState } from 'react';
import OptimizedResourceViewer from './optimized-resource-viewer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function ResourcesTest() {
  const [bookId, setBookId] = useState('4');
  const [unitId, setUnitId] = useState('4');
  const [showViewer, setShowViewer] = useState(false);
  
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Optimized Resources Test</h1>
      
      <div className="mb-8 p-4 bg-blue-50 border border-blue-200 rounded">
        <p className="mb-4">
          This page demonstrates loading resources with dynamic imports to prevent overloading the server.
          Enter the book and unit ID and click "Load Resources" to test.
        </p>
        
        <div className="flex gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">Book ID</label>
            <Input 
              type="text" 
              value={bookId} 
              onChange={(e) => setBookId(e.target.value)}
              className="w-20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit ID</label>
            <Input 
              type="text" 
              value={unitId} 
              onChange={(e) => setUnitId(e.target.value)}
              className="w-20"
            />
          </div>
        </div>
        
        <Button 
          onClick={() => setShowViewer(true)}
          className="mr-2"
        >
          Load Resources
        </Button>
        
        <Button 
          variant="outline" 
          onClick={() => setShowViewer(false)}
        >
          Clear
        </Button>
      </div>
      
      {showViewer && (
        <OptimizedResourceViewer 
          bookId={bookId} 
          unitId={unitId} 
          initialTitle="Dynamically Loaded Resources"
        />
      )}
      
      <div className="mt-6 text-sm text-gray-500">
        <strong>Note:</strong> Resources are loaded dynamically only when you click the button, 
        preventing the application from loading too many resources at once.
      </div>
    </div>
  );
}