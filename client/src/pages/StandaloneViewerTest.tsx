import React, { useState, useEffect } from 'react';
import { useLocation, useRoute, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Home, Book, ArrowLeft, ArrowRight } from 'lucide-react';
import S3ConnectivityTest from '@/components/diagnostics/S3ConnectivityTest';

// This is a standalone version of the content viewer test that doesn't rely on auth context
export default function StandaloneViewerTest() {
  const [location] = useLocation();
  const [, params] = useRoute('/standalone-viewer/:bookId?/:unitNumber?');
  
  const [bookId, setBookId] = useState(params?.bookId || 'book1');
  const [unitNumber, setUnitNumber] = useState(params?.unitNumber || '1');
  const [materials, setMaterials] = useState<any[]>([]);
  const [unitInfo, setUnitInfo] = useState<any>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  
  // Build paths for API requests
  const bookPath = bookId ? `book${bookId.replace(/^book/i, '')}` : '';
  const unitPath = unitNumber ? `unit${unitNumber.replace(/^unit/i, '')}` : '';
  
  // Fetch content
  useEffect(() => {
    const fetchContent = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch unit info
        console.log(`Fetching unit info from: /api/direct/${bookPath}/${unitPath}`);
        const unitResponse = await fetch(`/api/direct/${bookPath}/${unitPath}`);
        
        if (!unitResponse.ok) {
          throw new Error(`Failed to fetch unit info: ${unitResponse.status} ${unitResponse.statusText}`);
        }
        
        const unitData = await unitResponse.json();
        setUnitInfo(unitData);
        
        // Fetch materials
        console.log(`Fetching materials from: /api/direct/${bookPath}/${unitPath}/materials`);
        const materialsResponse = await fetch(`/api/direct/${bookPath}/${unitPath}/materials`);
        
        if (!materialsResponse.ok) {
          throw new Error(`Failed to fetch materials: ${materialsResponse.status} ${materialsResponse.statusText}`);
        }
        
        const materialsData = await materialsResponse.json();
        
        if (!Array.isArray(materialsData) || materialsData.length === 0) {
          throw new Error('No materials found for this unit');
        }
        
        setMaterials(materialsData);
        setCurrentIndex(0);
      } catch (err) {
        console.error('Error fetching content:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };
    
    if (bookPath && unitPath) {
      fetchContent();
    }
  }, [bookPath, unitPath]);
  
  // Navigation
  const goToNext = () => {
    if (currentIndex < materials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  
  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  
  // Current material
  const currentMaterial = materials[currentIndex];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-purple-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Books & Content Management</h1>
          <div className="flex gap-2">
            <Link href="/admin">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-teal-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
            <Link href="/books">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-teal-700">
                <Book className="mr-2 h-4 w-4" />
                Books
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-teal-700">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex-1 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Book/Unit Selector */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Select Book and Unit</CardTitle>
            </CardHeader>
            <CardContent>
              <form 
                className="flex flex-col sm:flex-row gap-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  const newLocation = `/standalone-viewer/${bookId}/${unitNumber}`;
                  window.history.pushState(null, '', newLocation);
                }}
              >
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Book ID</label>
                  <Input 
                    value={bookId} 
                    onChange={(e) => setBookId(e.target.value)}
                    placeholder="e.g. book1 or 1"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">Unit Number</label>
                  <Input 
                    value={unitNumber} 
                    onChange={(e) => setUnitNumber(e.target.value)}
                    placeholder="e.g. unit1 or 1"
                  />
                </div>
                <div className="flex items-end">
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Load Content
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
          
          {/* Connectivity Test Component */}
          <div className="mb-8">
            <S3ConnectivityTest />
          </div>
          
          {/* Content Viewer */}
          <Card>
            <CardHeader>
              <CardTitle>
                {unitInfo?.title || `${bookPath} / ${unitPath}`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                  <div className="w-12 h-12 border-t-4 border-teal-600 border-solid rounded-full animate-spin mb-4"></div>
                  <p>Loading content...</p>
                </div>
              ) : error ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="text-red-600 text-xl font-bold mb-4">Error Loading Content</div>
                  <div className="text-gray-700 mb-4 max-w-lg">
                    {error.message}
                  </div>
                  <Button 
                    onClick={() => window.location.reload()}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Try Again
                  </Button>
                </div>
              ) : materials.length > 0 ? (
                <div>
                  <div className="min-h-[400px] flex items-center justify-center border rounded-md p-4 mb-4">
                    {currentMaterial?.contentType === 'image' ? (
                      <div className="text-center">
                        <img 
                          src={`/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(currentMaterial.content)}`}
                          alt={currentMaterial.title || 'Content slide'}
                          className="max-w-full max-h-[500px] mx-auto"
                        />
                        <div className="mt-4 text-lg font-medium">
                          {currentMaterial.title || `Slide ${currentIndex + 1}`}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        Content type: {currentMaterial?.contentType || 'Unknown'}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Button 
                      onClick={goToPrevious} 
                      disabled={currentIndex === 0}
                      variant="outline"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Previous
                    </Button>
                    <div className="text-gray-500">
                      Slide {currentIndex + 1} of {materials.length}
                    </div>
                    <Button 
                      onClick={goToNext} 
                      disabled={currentIndex === materials.length - 1}
                    >
                      Next
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center text-gray-500">
                  No materials found for this unit
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}