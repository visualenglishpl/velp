import React from 'react';
import ResourceDisplay from '@/components/ResourceDisplay';

const TestResourcesPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Test Resources Page</h1>
      <p className="mb-6">This page is for testing the resource display component with the debug endpoint.</p>
      
      <div className="mt-8">
        <ResourceDisplay />
      </div>
    </div>
  );
};

export default TestResourcesPage;