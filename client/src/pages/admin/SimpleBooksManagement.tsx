import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { ChevronLeft, Book, Layout, Edit, Trash2 } from 'lucide-react';

// Type for a book with thumbnail URL
type BookWithThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
  description?: string;
};

export default function SimpleBooksManagement() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  
  // Method to navigate back to admin dashboard
  const handleBackToAdmin = () => {
    navigate('/admin');
  };

  const [books, setBooks] = useState<BookWithThumbnail[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Fetch books
  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/assets/book-thumbnails');
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        toast({
          title: 'Error',
          description: 'Failed to load books. Please try again later.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, [toast]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleBackToAdmin}
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Admin
          </Button>
          <h1 className="text-2xl font-bold">Books Management</h1>
          <div className="w-28"></div> {/* Empty div for spacing balance */}
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Books</h2>
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <Card key={i} className="overflow-hidden border rounded-lg shadow-sm">
                  <div className="aspect-square w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardHeader className="py-2 px-4">
                    <Skeleton className="h-6 w-3/4" />
                  </CardHeader>
                  <CardFooter className="py-2 px-4 flex gap-2">
                    <Skeleton className="h-9 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-2">Error loading books</p>
              <Button 
                onClick={() => window.location.reload()}
                variant="outline"
              >
                Try Again
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <Card key={book.bookId} className="overflow-hidden border rounded-lg shadow-sm">
                  <div className="aspect-square relative overflow-hidden">
                    {book.gifUrl ? (
                      <img 
                        src={book.gifUrl}
                        alt={`${book.title} cover`}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                        <Book className="h-16 w-16 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <CardHeader className="py-3 px-4">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                  </CardHeader>
                  <CardFooter className="py-2 px-4 flex flex-wrap gap-2">
                    <Link href={`/books/${book.bookId}`} className="flex-1">
                      <Button className="w-full" variant="default" size="sm">
                        <Layout className="h-4 w-4 mr-1" />
                        View Units
                      </Button>
                    </Link>
                    
                    <Link href={`/standalone-viewer/${book.bookId}`} className="flex-1">
                      <Button className="w-full" variant="outline" size="sm">
                        Go to Viewer
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}