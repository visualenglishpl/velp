import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';

// Type definition for book data
interface Book {
  bookId: string;
  title: string;
  description: string;
  color: string;
  units: number;
}

const SimpleBooksAdmin = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Default book data
    const defaultBooks: Book[] = [
      { bookId: '0a', title: 'VISUAL ENGLISH BOOK 0A', description: 'Visual English Series', color: '#FF40FF', units: 20 },
      { bookId: '0b', title: 'VISUAL ENGLISH BOOK 0B', description: 'Visual English Series', color: '#FF7F27', units: 20 },
      { bookId: '0c', title: 'VISUAL ENGLISH BOOK 0C', description: 'Visual English Series', color: '#00CEDD', units: 20 },
      { bookId: '1', title: 'VISUAL ENGLISH BOOK 1', description: 'Visual English Series', color: '#FFFF00', units: 18 },
      { bookId: '2', title: 'VISUAL ENGLISH BOOK 2', description: 'Visual English Series', color: '#9966CC', units: 18 },
      { bookId: '3', title: 'VISUAL ENGLISH BOOK 3', description: 'Visual English Series', color: '#00CC00', units: 18 },
      { bookId: '4', title: 'VISUAL ENGLISH BOOK 4', description: 'Visual English Series', color: '#5DADEC', units: 16 },
      { bookId: '5', title: 'VISUAL ENGLISH BOOK 5', description: 'Visual English Series', color: '#00CC66', units: 16 },
      { bookId: '6', title: 'VISUAL ENGLISH BOOK 6', description: 'Visual English Series', color: '#FF0000', units: 16 },
      { bookId: '7', title: 'VISUAL ENGLISH BOOK 7', description: 'Visual English Series', color: '#00FF00', units: 16 }
    ];
    
    // Simulate API loading
    setTimeout(() => {
      setBooks(defaultBooks);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
          <p className="text-lg text-gray-600 mt-2">
            Manage the complete collection of Visual English books
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <Card key={n} className="animate-pulse">
                <CardHeader className="aspect-square bg-gray-200 relative p-0">
                  <div className="absolute bottom-0 w-full h-8 bg-gray-300"></div>
                </CardHeader>
                <CardContent className="py-2">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-full"></div>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <div className="h-9 bg-gray-200 rounded w-full"></div>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {books.map((book) => (
              <Card key={book.bookId} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader 
                  className="p-0 relative aspect-square flex flex-col justify-end overflow-hidden"
                >
                  {/* Colored background as fallback */}
                  <div 
                    className="absolute inset-0 w-full h-full flex items-center justify-center"
                    style={{ backgroundColor: book.color }}
                  >
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                  <CardTitle className="text-white p-2 z-10 bg-black bg-opacity-50 w-full text-center">{book.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-gray-600 text-sm">{book.description}</p>
                  <p className="mt-1 text-xs text-gray-500">{book.units} units</p>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <a href="/simple-units-admin" className="w-full">
                    <Button 
                      className="w-full"
                    >
                      View Units
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SimpleBooksAdmin;