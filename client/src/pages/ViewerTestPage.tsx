import React from 'react';
import SlickContentViewer from './SlickContentViewer';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { Home } from 'lucide-react';

export default function ViewerTestPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-teal-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Content Viewer Test Page</h1>
          <Link href="/">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-teal-700">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
      
      <div className="flex-1">
        <SlickContentViewer />
      </div>
    </div>
  );
}