import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';

// Type for a book with thumbnail URL
type BookWithThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
  description?: string;
};

export default function BooksPage() {
  const { toast } = useToast();
  const { user } = useAuth();
  
  // Use the authenticated user from the auth context
  const isAuthenticated = !!user;

  // Use React Query to fetch books
  const { data: books, isLoading, error } = useQuery({
    queryKey: ['/api/books'],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/books');
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return await response.json();
    },
    enabled: isAuthenticated, // Only fetch if authenticated
  });

  // If there's an error, show a toast
  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load books. Please try again later.',
        variant: 'destructive',
      });
    }
  }, [error, toast]);

  // Default book data if API is not available
  const defaultBooks: BookWithThumbnail[] = [
    { bookId: '0a', title: 'VISUAL ENGLISH BOOK 0A', gifUrl: '/api/direct/content/icons/VISUAL 0a.gif' },
    { bookId: '0b', title: 'VISUAL ENGLISH BOOK 0B', gifUrl: '/api/direct/content/icons/VISUAL 0b.gif' },
    { bookId: '0c', title: 'VISUAL ENGLISH BOOK 0C', gifUrl: '/api/direct/content/icons/VISUAL 0c.gif' },
    { bookId: '1', title: 'VISUAL ENGLISH BOOK 1', gifUrl: '/api/direct/content/icons/VISUAL 1.gif' },
    { bookId: '2', title: 'VISUAL ENGLISH BOOK 2', gifUrl: '/api/direct/content/icons/VISUAL 2.gif' },
    { bookId: '3', title: 'VISUAL ENGLISH BOOK 3', gifUrl: '/api/direct/content/icons/VISUAL 3 .gif' },
    { bookId: '4', title: 'VISUAL ENGLISH BOOK 4', gifUrl: '/api/direct/content/icons/VISUAL 4.gif' },
    { bookId: '5', title: 'VISUAL ENGLISH BOOK 5', gifUrl: '/api/direct/content/icons/VISUAL 5.gif' },
    { bookId: '6', title: 'VISUAL ENGLISH BOOK 6', gifUrl: '/api/direct/content/icons/VISUAL 6.gif' },
    { bookId: '7', title: 'VISUAL ENGLISH BOOK 7', gifUrl: '/api/direct/content/icons/VISUAL 7.gif' },
  ];

  // The books to display are either from the API or the default books
  const displayBooks = books || defaultBooks;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center">
        <Link href="/">
          <Button variant="nav" size="nav" className="mr-4 flex items-center gap-2">
            <ChevronLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">Visual English Books</h1>
      </div>
      
      {isLoading ? (
        // Loading skeleton
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {[...Array(10)].map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="p-0">
                <Skeleton className="h-48 w-full" />
              </CardHeader>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        // Books grid
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {displayBooks.map((book) => (
            <Link key={book.bookId} href={`/books/${book.bookId}`}>
              <Card className="overflow-hidden h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="p-0 relative h-48">
                  <CardTitle className="text-white p-2 z-10 bg-black bg-opacity-50 w-full text-center">
                    {book.title}
                  </CardTitle>
                  <img
                    src={book.gifUrl}
                    alt={book.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to a placeholder if the image fails to load
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = 'https://placehold.co/600x400/6f42c1/ffffff?text=Visual+English';
                    }}
                  />
                </CardHeader>
                <CardFooter className="p-4 flex justify-center">
                  <Button className="w-full">View Units</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}