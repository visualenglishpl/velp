import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function S3Test() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Book 5 content test paths
  const testPaths = [
    {
      label: "book5/unit1/00 A.png",
      path: "/api/content/book5/unit1/00 A.png"
    },
    {
      label: "5/unit1/00 A.png",
      path: "/api/content/5/unit1/00 A.png"
    },
    {
      label: "book5/unit1/00A.png (no space)",
      path: "/api/content/book5/unit1/00A.png"
    },
    {
      label: "book5/unit1/00 A (no extension)",
      path: "/api/content/book5/unit1/00 A"
    },
    {
      label: "Direct book5 folder",
      path: "/api/content/book5/"
    },
    {
      label: "Unit 1 Slide 1",
      path: "/api/content/5/unit1/01 A a what season is it.png"
    },
    {
      label: "Unit 1 Slide 2",
      path: "/api/content/5/unit1/01 B a what season is it.png"
    },
    {
      label: "Unit 1 Slide 3",
      path: "/api/content/5/unit1/01 C a what season is it.png"
    }
  ];
  
  const selectPath = (path: string) => {
    setSelectedPath(path);
    setError(null);
  };
  
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Book 5 S3 Path Testing</h1>
      <p className="mb-8 text-gray-600">
        Testing access to S3 paths for Book 5 content at:<br/>
        <code className="text-sm bg-gray-100 p-1 rounded">s3://visualenglishmaterial/book5/</code>
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="border rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">Test Paths</h2>
          <div className="flex flex-col gap-2">
            {testPaths.map((test, index) => (
              <Button 
                key={index} 
                variant={selectedPath === test.path ? "default" : "outline"}
                className="justify-start"
                onClick={() => selectPath(test.path)}
              >
                {test.label}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="border rounded-lg p-6">
          <h2 className="text-xl font-bold mb-4">Preview</h2>
          {selectedPath ? (
            <div className="flex flex-col items-center">
              <p className="mb-4 text-sm"><strong>Testing:</strong> {selectedPath}</p>
              <div className="bg-white p-1 border rounded overflow-hidden mb-4 max-w-full">
                <img 
                  src={selectedPath}
                  alt="S3 Content Test"
                  className="max-w-full max-h-[400px] object-contain"
                  onError={(e) => {
                    console.error(`Failed to load from path: ${selectedPath}`);
                    setError(`Failed to load image from: ${selectedPath}`);
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  onLoad={() => {
                    console.log(`Successfully loaded from path: ${selectedPath}`);
                    setError(null);
                  }}
                />
              </div>
              
              {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-md mb-4 w-full">
                  {error}
                </div>
              )}
              
              <a 
                href={selectedPath} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2"
              >
                Open directly in new tab
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] bg-gray-100 rounded">
              <p className="text-gray-500">Select a path to test</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 border-t pt-6">
        <Button onClick={() => window.location.href = "/admin/books"}>
          Back to Books
        </Button>
      </div>
    </div>
  );
}