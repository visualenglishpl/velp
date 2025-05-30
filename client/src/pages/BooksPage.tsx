import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';

// Type for a book with thumbnail URL
type BookWithThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
  description?: string;
};

export default function BooksPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest('GET', '/api/user');
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    
    checkAuth();
  }, []);

  // Query to get book thumbnails - allow all users to access books
  const { data: books, isLoading, error } = useQuery<BookWithThumbnail[]>({
    queryKey: ['/api/assets/book-thumbnails'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/assets/book-thumbnails');
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      return await res.json();
    }
  });

  // Handle error
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load books. Please try again later.',
        variant: 'destructive'
      });
    }
  }, [error, toast]);

  // Allow all users to view the bookstore without requiring authentication

  // Get current location to see if we came from admin
  const [location] = useLocation();
  const fromAdmin = location.includes('admin') || document.referrer.includes('admin');

  return (
    <div className="pt-16 pb-0 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {fromAdmin && (
          <div className="flex justify-start mb-6">
            <Link href="/admin">
              <Button variant="outline" className="flex items-center gap-1">
                <ChevronLeft className="h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
          </div>
        )}
        
        {isLoading ? (
          <div id="book-thumbnails" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1200px] mx-auto mt-10">
            {[...Array(10)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-none">
                <div className="aspect-square w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="py-3 px-4">
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardFooter className="py-3 px-4">
                  <Skeleton className="h-8 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div id="book-thumbnails" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-[1200px] mx-auto mt-10">
            {books.map((book) => (
              <Card key={book.bookId} className="overflow-hidden flex flex-col border-0 shadow-none hover:shadow-md transition-shadow duration-300">
                <div className="aspect-square relative overflow-hidden">
                  {book.gifUrl ? (
                    <img 
                      src={book.gifUrl} 
                      alt={`Cover of ${book.title}`} 
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-100 text-gray-500">
                      No image available
                    </div>
                  )}
                </div>
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-center text-lg">{book.title}</CardTitle>
                </CardHeader>
                <CardFooter className="py-3 px-4 flex flex-col gap-2">
                  <Link href={`/books/${book.bookId}`} className="w-full">
                    <Button className="w-full" variant="default">
                      View Book Units
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No books found</h3>
            <p className="text-gray-600">Please check back later or contact support for assistance.</p>
          </div>
        )}
      </div>
    </div>
  );
}