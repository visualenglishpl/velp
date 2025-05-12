import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { Link } from 'wouter';

// Sample initial content for demonstration purposes
const initialContent = [
  {
    id: 1,
    imageUrl: '/api/direct/content/icons/LOGO VISUAL ENGLISH.png',
    title: 'Welcome to Visual English',
    description: 'An interactive ESL learning platform'
  },
  {
    id: 2,
    imageUrl: '/api/direct/content/sample/sample-1.jpg',
    title: 'Sample Content 1',
    description: 'This is a sample content item'
  },
  {
    id: 3,
    imageUrl: '/api/direct/content/sample/sample-2.jpg',
    title: 'Sample Content 2',
    description: 'Another sample content item'
  }
];

export default function StandaloneViewer() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [content, setContent] = useState(initialContent);
  const [book, setBook] = useState('1');
  const [unit, setUnit] = useState('1');
  const [loading, setLoading] = useState(false);

  // Navigation functions
  const goToNext = () => {
    if (currentIndex < content.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  // Load content from a specific book and unit
  const loadContent = async (bookId: string, unitId: string) => {
    setLoading(true);
    try {
      // In a real implementation, this would fetch from the API
      // For now, we'll simulate a delay and return our sample content
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the content (in a real implementation, this would come from the API)
      setContent(initialContent);
      setCurrentIndex(0);
    } catch (error) {
      console.error('Error loading content:', error);
    } finally {
      setLoading(false);
    }
  };

  // Call loadContent when book or unit changes
  useEffect(() => {
    loadContent(book, unit);
  }, [book, unit]);

  // Current content item
  const currentItem = content[currentIndex] || { 
    id: 0, 
    imageUrl: '', 
    title: 'No content available', 
    description: 'Please try another book or unit' 
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      {/* Header with book/unit selector */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-2 sm:mb-0">Standalone Content Viewer</h1>
          <div className="flex space-x-2">
            <Link href="/simple">
              <Button variant="outline" size="sm">
                <Home className="h-4 w-4 mr-2" />
                Back to Navigation
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Book</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={book}
              onChange={(e) => setBook(e.target.value)}
              disabled={loading}
            >
              {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                <option key={num} value={num}>Book {num}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select 
              className="w-full px-3 py-2 border rounded-md"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              disabled={loading}
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>Unit {num}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Content viewer */}
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {/* Content display */}
            <div className="mb-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-video bg-gray-200 flex justify-center items-center">
                    {currentItem.imageUrl ? (
                      <img 
                        src={currentItem.imageUrl} 
                        alt={currentItem.title} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback for broken images
                          (e.target as HTMLImageElement).src = '/api/direct/content/icons/LOGO VISUAL ENGLISH.png';
                        }}
                      />
                    ) : (
                      <div className="text-gray-500">No image available</div>
                    )}
                  </div>
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{currentItem.title}</h2>
                    <p className="text-gray-600">{currentItem.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Navigation controls */}
            <div className="flex justify-between items-center">
              <Button 
                onClick={goToPrevious} 
                disabled={currentIndex === 0}
                variant="outline"
              >
                <ChevronLeft className="h-5 w-5 mr-1" /> Previous
              </Button>
              <div className="text-sm text-gray-500">
                {currentIndex + 1} of {content.length}
              </div>
              <Button 
                onClick={goToNext} 
                disabled={currentIndex === content.length - 1}
                variant="outline"
              >
                Next <ChevronRight className="h-5 w-5 ml-1" />
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}