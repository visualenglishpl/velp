import React, { useEffect, useState } from 'react';

// Only import Book 4 Unit 4 directly
import { resources as unit4Resources } from './data/book4-unit4-resources';

export default function MinimalTest() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('MinimalTest mounted, testing Book 4 Unit 4 resources');
    console.log(`Direct import of Unit 4 resources found ${unit4Resources.length} items`);
    setLoaded(true);
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Minimal Test</h1>
      {loaded ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">
          <p className="text-green-700">Unit 4 Resources loaded successfully!</p>
          <p className="mt-2">Found {unit4Resources.length} resources</p>
          
          <div className="mt-4">
            <h2 className="text-lg font-medium mb-2">Resources:</h2>
            <ul className="list-disc pl-5 space-y-1">
              {unit4Resources.slice(0, 5).map((resource, i) => (
                <li key={i}>{resource.title}</li>
              ))}
              {unit4Resources.length > 5 && (
                <li className="text-gray-500">... and {unit4Resources.length - 5} more</li>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
          <p className="text-yellow-700">Loading...</p>
        </div>
      )}
    </div>
  );
}
