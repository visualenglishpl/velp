import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

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

  // Query to get book thumbnails
  const { data: books, isLoading, error } = useQuery<BookWithThumbnail[]>({
    queryKey: ['/api/assets/book-thumbnails'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/assets/book-thumbnails');
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      return await res.json();
    },
    enabled: isAuthenticated
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6">Visual English Library</h1>
          <p className="mb-8 text-lg text-gray-600">Please sign in to view our collection of books.</p>
          <Link href="/auth">
            <Button size="lg">Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Visual English Library</h1>
        <p className="mb-8 text-lg text-gray-600">Browse our collection of educational materials.</p>
        
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="aspect-video bg-gray-100 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader>
                  <Skeleton className="h-8 w-2/3" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : books && books.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Card key={book.bookId} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-gray-100 relative overflow-hidden flex items-center justify-center">
                  {book.gifUrl ? (
                    <img 
                      src={book.gifUrl} 
                      alt={`Cover of ${book.title}`} 
                      className="object-contain w-full h-full"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                      No image available
                    </div>
                  )}
                </div>
                <CardHeader>
                  <CardTitle>{book.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">
                    Book ID: {book.bookId}
                  </p>
                  <p className="text-gray-600 mt-2">
                    {book.description || 'Explore this visual English book with interactive lessons and exercises.'}
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/book${book.bookId}/unit1`} className="w-full">
                    <Button className="w-full" variant="default">
                      View Book Content
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