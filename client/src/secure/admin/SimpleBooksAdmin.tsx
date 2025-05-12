import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

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
  const { user } = useAuth();

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
    
    // Simulate loading
    setTimeout(() => {
      setBooks(defaultBooks);
      setLoading(false);
    }, 500);
  }, []);

  // Function to view units for a book
  const handleViewUnits = (bookId: string) => {
    window.location.href = `/simple-units-admin?bookId=${bookId}`;
  };

  // Verify that user has admin access
  const isAdmin = user?.role === 'admin';

  if (!isAdmin) {
    return (
      <div className="container mx-auto p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
        <p className="mb-4">You need administrator privileges to access this page.</p>
        <Button onClick={() => window.location.href = '/'}>Return to Home</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Book Management</h1>
        <Button onClick={() => window.location.href = '/'}>
          Back to Home
        </Button>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, index) => (
            <Card key={index} className="relative h-[300px] flex flex-col">
              <CardHeader className="relative p-0 h-48 bg-gray-300 animate-pulse">
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-12 w-12 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <div className="w-3/4 h-6 bg-gray-300 animate-pulse mb-2 rounded"></div>
                <div className="w-full h-4 bg-gray-300 animate-pulse rounded"></div>
              </CardContent>
              <CardFooter className="p-4">
                <div className="w-full h-10 bg-gray-300 animate-pulse rounded"></div>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {books.map((book) => (
            <Card key={book.bookId} className="relative h-[300px] flex flex-col">
              <CardHeader className="relative p-0 h-48 overflow-hidden">
                <CardTitle className="text-white p-2 z-10 bg-black bg-opacity-50 w-full text-center">{book.title}</CardTitle>
                {/* Book cover image with colored background as fallback */}
                <div 
                  className="absolute inset-0 w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: book.color }}
                >
                  {book.bookId === '3' ? (
                    <img 
                      src={`/api/direct/content/icons/VISUAL 3 .gif`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the specific case for book 3 fails, show the dynamic pattern
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <img 
                      src={`/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                      alt={book.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the image fails to load, hide it (colored div will be the fallback)
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-grow p-4">
                <p className="text-gray-600">{book.description}</p>
                <p className="mt-2 text-sm">Units: {book.units}</p>
              </CardContent>
              <CardFooter className="p-4">
                <Button 
                  className="w-full" 
                  onClick={() => handleViewUnits(book.bookId)}
                >
                  Manage Units
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default SimpleBooksAdmin;