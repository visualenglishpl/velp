import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, BookOpen } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';

// Type definition for book data
interface Book {
  bookId: string;
  title: string;
  description: string;
  color: string;
  units: number;
  thumbnailUrl?: string;
}

const BooksManagementPage = () => {
  const [, setLocation] = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  // Use react-query to fetch book data
  const { data: bookThumbnails, error, isLoading } = useQuery({
    queryKey: ['/api/assets/book-thumbnails'],
    retry: 2,
  });

  useEffect(() => {
    // Default book data if API fails
    const defaultBooks: Book[] = [
      { bookId: '0a', title: 'Book 0a', description: 'Visual English Series', color: '#FF40FF', units: 20 },
      { bookId: '0b', title: 'Book 0b', description: 'Visual English Series', color: '#FF7F27', units: 20 },
      { bookId: '0c', title: 'Book 0c', description: 'Visual English Series', color: '#00CEDD', units: 20 },
      { bookId: '1', title: 'Book 1', description: 'Visual English Series', color: '#FFFF00', units: 18 },
      { bookId: '2', title: 'Book 2', description: 'Visual English Series', color: '#9966CC', units: 18 },
      { bookId: '3', title: 'Book 3', description: 'Visual English Series', color: '#00CC00', units: 18 },
      { bookId: '4', title: 'Book 4', description: 'Visual English Series', color: '#5DADEC', units: 16 },
      { bookId: '5', title: 'Book 5', description: 'Visual English Series', color: '#00CC66', units: 16 },
      { bookId: '6', title: 'Book 6', description: 'Visual English Series', color: '#FF0000', units: 16 },
      { bookId: '7', title: 'Book 7', description: 'Visual English Series', color: '#00FF00', units: 16 }
    ];
    
    if (bookThumbnails && Array.isArray(bookThumbnails)) {
      // If data is available from the API, use it
      const transformedBooks = bookThumbnails.map((book: any) => ({
        ...book,
        color: defaultBooks.find(b => b.bookId === book.bookId)?.color || '#666666',
        units: defaultBooks.find(b => b.bookId === book.bookId)?.units || 16
      }));
      setBooks(transformedBooks);
    } else {
      // Otherwise use default data
      setBooks(defaultBooks);
    }
    
    setLoading(false);
  }, [bookThumbnails]);

  const handleSelectBook = (bookId: string) => {
    setLocation(`/book-units/${bookId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/admin">
            <Button variant="outline" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Admin
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
        </div>

        <div className="mb-8">
          <p className="text-lg text-gray-600">
            Manage the complete collection of Visual English books and their units. Select a book to view its units.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <Card key={n} className="animate-pulse">
                <CardHeader className="h-36 bg-gray-200 relative">
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
                  style={{ backgroundColor: book.color }}
                  className="p-0 relative h-36 flex flex-col justify-end"
                >
                  <div className="w-full h-full absolute top-0 left-0">
                    <img 
                      src={`/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                      alt={book.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = book.thumbnailUrl || '';
                      }}
                    />
                  </div>
                  <CardTitle className="text-white text-lg p-2 z-10 bg-black bg-opacity-50 w-full text-center">{book.title}</CardTitle>
                </CardHeader>
                <CardContent className="py-2">
                  <p className="text-gray-600 text-sm">{book.description}</p>
                  <p className="mt-1 text-xs text-gray-500">{book.units} units</p>
                </CardContent>
                <CardFooter className="pt-0 pb-3">
                  <Button 
                    className="w-full" 
                    onClick={() => handleSelectBook(book.bookId)}
                  >
                    View Units
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

export default BooksManagementPage;