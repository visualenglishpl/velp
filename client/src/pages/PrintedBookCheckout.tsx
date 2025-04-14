import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Book, Truck } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

// Type for a book with thumbnail URL
type BookWithThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
  description?: string;
};

export default function PrintedBookCheckout() {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);

  // Query to get book thumbnails
  const { data: books, isLoading } = useQuery<BookWithThumbnail[]>({
    queryKey: ['/api/assets/book-thumbnails'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/assets/book-thumbnails');
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      return await res.json();
    }
  });

  // Handle book selection
  const handleBookSelect = (bookId: string) => {
    setSelectedBook(bookId);
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (selectedBook) {
      window.location.href = `/checkout/printed_book?book=${selectedBook}`;
    } else {
      alert('Please select a book first');
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/#plans">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Order Printed Book</h1>
          <p className="text-gray-600 max-w-3xl">
            Select the book you'd like to purchase in printed format. All our printed books are high-quality, full-color publications delivered straight to your door.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Book className="mr-2 h-5 w-5 text-emerald-500" />
            Select Your Book
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <div className="aspect-square bg-gray-100">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardFooter className="py-3">
                    <Skeleton className="h-6 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : books && books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => (
                <Card 
                  key={book.bookId} 
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    selectedBook === book.bookId 
                      ? 'ring-2 ring-emerald-500 shadow-md' 
                      : 'hover:border-gray-300'
                  }`}
                  onClick={() => handleBookSelect(book.bookId)}
                >
                  <div className="aspect-square relative overflow-hidden">
                    {book.gifUrl ? (
                      <img 
                        src={book.gifUrl} 
                        alt={`Cover of ${book.title}`} 
                        className="object-contain w-full h-full p-4"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                        No image available
                      </div>
                    )}
                    {selectedBook === book.bookId && (
                      <div className="absolute top-2 right-2 bg-emerald-500 text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                      </div>
                    )}
                  </div>
                  <CardFooter className="py-3 px-3 justify-center">
                    <p className="text-center font-medium">{book.title}</p>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No books available at this time.</p>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-2 flex items-center">
            <Truck className="mr-2 h-5 w-5 text-emerald-500" />
            Delivery Information
          </h2>
          <p className="text-gray-600">
            Standard shipping takes 7-14 business days. Express delivery options will be available at checkout.
          </p>
        </div>
        
        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-emerald-800">Printed Book</h2>
              <p className="text-emerald-700">€20 + delivery costs</p>
            </div>
            <Button 
              size="lg" 
              onClick={handleCheckout}
              disabled={!selectedBook}
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}