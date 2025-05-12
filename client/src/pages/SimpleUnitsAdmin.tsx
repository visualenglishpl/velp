import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Layers } from 'lucide-react';

interface Unit {
  id: number;
  title: string;
  slideCount: number;
}

const SimpleUnitsAdmin = () => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookColor, setBookColor] = useState('#9966CC'); // Purple (Book 2 color)
  const [bookTitle, setBookTitle] = useState('VISUAL ENGLISH BOOK 2');
  
  useEffect(() => {
    // Generate units for Book 2
    const unitCount = 18; // Book 2 has 18 units
    const generatedUnits = Array.from({ length: unitCount }, (_, index) => ({
      id: index + 1,
      title: `Unit ${index + 1}`,
      slideCount: Math.floor(Math.random() * 200) + 100 // Random number between 100-300 for demonstration
    }));
    
    // Simulate API loading
    setTimeout(() => {
      setUnits(generatedUnits);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <a href="/simple-books-admin">
            <Button variant="outline" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Button>
          </a>
          <h1 className="text-3xl font-bold text-gray-900">{bookTitle}</h1>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Managing units for {bookTitle}. Select a unit to view or edit its content.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {units.map((unit) => (
              <Card key={unit.id} className="overflow-hidden shadow hover:shadow-md transition-shadow">
                <CardHeader 
                  style={{ backgroundColor: bookColor }}
                  className="p-0 relative aspect-square flex flex-col overflow-hidden"
                >
                  <CardTitle className="text-white p-2 z-10 bg-black bg-opacity-50 w-full text-center">{unit.title}</CardTitle>
                  <div className="flex-1 flex items-center justify-center">
                    <div className="mx-auto bg-white rounded-full w-16 h-16 flex items-center justify-center">
                      <Layers style={{ color: bookColor }} className="h-8 w-8" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="py-2 text-center">
                  <p className="text-sm text-gray-500">{unit.slideCount} slides</p>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full"
                  >
                    View Content
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleUnitsAdmin;