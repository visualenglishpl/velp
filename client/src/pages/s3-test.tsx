import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

export default function S3Test() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    // Construct the exact URL for the test
    fetch(`/api/content/5/unit1/00 A.png`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.text(); // Get the redirect URL
      })
      .then(data => {
        console.log("Redirect URL:", data);
        // Set the image source
        setImageSrc(`/api/content/5/unit1/00 A.png`);
      })
      .catch(err => {
        console.error("Error fetching image:", err);
        setError(err.message);
      });
  }, []);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">S3 Test for Book 5 Unit 1 Intro</h1>
      <p className="mb-4">Testing direct access to: <code>s3://visualenglishmaterial/book5/unit1/00 A.png</code></p>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 mb-4 rounded">
          <p>Error: {error}</p>
        </div>
      )}
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Direct Image Test:</h2>
        {imageSrc ? (
          <img 
            src={imageSrc}
            alt="Book 5 Unit 1 Intro"
            className="max-w-full h-auto border"
            onError={(e) => {
              console.error("Image load error");
              setError("Failed to load image directly");
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        ) : (
          <div className="bg-gray-200 p-8 text-center">Loading image...</div>
        )}
      </div>
      
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Manual Test Links:</h2>
        <div className="flex flex-col gap-2">
          <div>
            <a 
              href="/api/content/5/unit1/00 A.png" 
              target="_blank" 
              className="text-blue-600 underline"
            >
              Direct URL: /api/content/5/unit1/00 A.png
            </a>
          </div>
          <div>
            <a 
              href="/api/content/book5/unit1/00 A.png" 
              target="_blank" 
              className="text-blue-600 underline"
            >
              Alternate URL: /api/content/book5/unit1/00 A.png
            </a>
          </div>
        </div>
      </div>
      
      <Button 
        onClick={() => window.location.href = `/admin/books`}
        className="mt-4"
      >
        Back to Books
      </Button>
    </div>
  );
}