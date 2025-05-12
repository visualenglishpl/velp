import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Layers, ImageIcon } from 'lucide-react';

interface Unit {
  id: number;
  title: string;
  slideCount: number;
  thumbnailUrl?: string;
}

// Function to get the color for a specific book
const getBookColor = (bookId: string): string => {
  const bookColors: Record<string, string> = {
    '0a': '#FF40FF', // Pink
    '0b': '#FF7F27', // Orange
    '0c': '#00CEDD', // Teal
    '1': '#FFFF00',  // Yellow
    '2': '#9966CC',  // Purple
    '3': '#00CC00',  // Green
    '4': '#5DADEC',  // Blue
    '5': '#00CC66',  // Green
    '6': '#FF0000',  // Red
    '7': '#00FF00'   // Bright Green
  };
  
  return bookColors[bookId] || '#666666';
};

// Function to get unit count for a specific book
const getUnitCount = (bookId: string): number => {
  if (['0a', '0b', '0c'].includes(bookId)) {
    return 20;
  } else if (['1', '2', '3'].includes(bookId)) {
    return 18;
  } else {
    return 16; // Books 4-7
  }
};

// Function to get title for a book
const getBookTitle = (bookId: string): string => {
  const titles: Record<string, string> = {
    '0a': 'VISUAL ENGLISH BOOK 0A',
    '0b': 'VISUAL ENGLISH BOOK 0B',
    '0c': 'VISUAL ENGLISH BOOK 0C',
    '1': 'VISUAL ENGLISH BOOK 1',
    '2': 'VISUAL ENGLISH BOOK 2',
    '3': 'VISUAL ENGLISH BOOK 3',
    '4': 'VISUAL ENGLISH BOOK 4',
    '5': 'VISUAL ENGLISH BOOK 5',
    '6': 'VISUAL ENGLISH BOOK 6',
    '7': 'VISUAL ENGLISH BOOK 7'
  };
  
  return titles[bookId] || `VISUAL ENGLISH BOOK ${bookId.toUpperCase()}`;
};

const UnitsManagementPage = () => {
  // Get bookId from URL parameters
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId || '';
  
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookColor, setBookColor] = useState('#666666');
  const [bookTitle, setBookTitle] = useState('');
  
  useEffect(() => {
    // Set book color and title
    setBookColor(getBookColor(bookId));
    setBookTitle(getBookTitle(bookId));
    
    // Generate units for the book
    const unitCount = getUnitCount(bookId);
    const generatedUnits = Array.from({ length: unitCount }, (_, index) => {
      const unitNumber = index + 1;
      return {
        id: unitNumber,
        title: `Unit ${unitNumber}`,
        slideCount: Math.floor(Math.random() * 200) + 100, // Random number between 100-300 for demonstration
        thumbnailUrl: `/api/direct/content/book${bookId}/icons/thumbnailsuni${bookId}-${unitNumber}.png`
      };
    });
    
    setUnits(generatedUnits);
    setLoading(false);
  }, [bookId]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/admin/books">
            <Button variant="outline" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{bookTitle}</h1>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Managing units for {bookTitle}. Select a unit to view or edit its content.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <Card key={n} className="animate-pulse">
                <CardHeader className="aspect-square bg-gray-200 relative p-0">
                  <div className="w-full h-8 bg-gray-300"></div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="h-5 bg-gray-200 rounded w-1/2 mb-2"></div>
                </CardContent>
                <CardFooter>
                  <div className="h-10 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {units.map((unit) => (
              <Card key={unit.id} className="overflow-hidden shadow hover:shadow-md transition-shadow">
                <CardHeader 
                  style={{ backgroundColor: bookColor }}
                  className="p-0 relative aspect-square flex flex-col overflow-hidden"
                >
                  <CardTitle className="text-white p-2 z-10 bg-black bg-opacity-50 w-full text-center">{unit.title}</CardTitle>
                  {unit.thumbnailUrl ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={unit.thumbnailUrl}
                        alt={unit.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If the thumbnail fails to load, show the fallback
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          
                          // Find closest parent with class 'fallback-container' and show it
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector('.fallback-container');
                            if (fallback) {
                              (fallback as HTMLElement).style.display = 'flex';
                            }
                          }
                        }}
                      />
                      <div className="fallback-container absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                          <Layers style={{ color: bookColor }} className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="mx-auto bg-white rounded-full w-16 h-16 flex items-center justify-center">
                        <Layers style={{ color: bookColor }} className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="py-2 text-center">
                  <p className="text-sm text-gray-500">{unit.slideCount} slides</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/standalone-viewer/${bookId}/${unit.id}`} className="w-full">
                    <Button 
                      className="w-full"
                    >
                      View Content
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UnitsManagementPage;