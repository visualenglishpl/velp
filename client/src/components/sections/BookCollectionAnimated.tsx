import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Book = {
  id: string;
  title: string;
  color: string;
  gifUrl: string;
};

const BookCollectionAnimated: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create book data with animated GIF links
    const booksData: Book[] = [
      {
        id: '0a',
        title: 'Book 0A - To The Moon',
        color: '#ffedcc',
        gifUrl: '/api/content/icons/VISUAL 0a.gif'
      },
      {
        id: '0b',
        title: 'Book 0B - Barn In The Farm',
        color: '#e6f7ff',
        gifUrl: '/api/content/icons/VISUAL 0b.gif'
      },
      {
        id: '0c',
        title: 'Book 0C - At The Farm',
        color: '#eaf7ea',
        gifUrl: '/api/content/icons/VISUAL 0c.gif'
      },
      {
        id: '1',
        title: 'Book 1 - Vegetables',
        color: '#f5e6ff',
        gifUrl: '/api/content/book1/book1.gif'
      },
      {
        id: '2',
        title: 'Book 2 - Sports',
        color: '#ffe6e6',
        gifUrl: '/api/content/book2/book2.gif'
      },
      {
        id: '3',
        title: 'Book 3 - Bugs',
        color: '#f0f7e6',
        gifUrl: '/api/content/book3/book3.gif'
      },
      {
        id: '4',
        title: 'Book 4 - At The Circus',
        color: '#ffe6f0',
        gifUrl: '/api/content/book4/book4.gif'
      },
      {
        id: '5',
        title: 'Book 5 - Movie Time',
        color: '#e6f0ff',
        gifUrl: '/api/content/book5/book5.gif'
      },
      {
        id: '6',
        title: 'Book 6 - Fashion Accessories',
        color: '#f9f0e6',
        gifUrl: '/api/content/book6/book6.gif'
      },
      {
        id: '7',
        title: 'Book 7 - Social Problems',
        color: '#e6e6ff',
        gifUrl: '/api/content/book7/book7.gif'
      }
    ];

    setBooks(booksData);
    setLoading(false);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900">Book Collection</h2>
          <p className="mt-3 text-lg text-gray-600">
            Explore our extensive range of educational books for young English learners
          </p>

        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {loading ? (
            Array(10).fill(0).map((_, i) => (
              <Card key={i} className="overflow-hidden shadow-md">
                <CardContent className="p-0">
                  <div className="aspect-square w-full">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <div className="p-4">
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-8 w-full mt-2" />
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            books.map((book) => (
              <Card key={book.id} className="overflow-hidden shadow-md flex flex-col h-full">
                <CardContent className="p-0 flex-grow flex flex-col">
                  <div 
                    className="aspect-square w-full flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: book.color }}
                  >
                    <img 
                      src={book.gifUrl} 
                      alt={`Book ${book.id} animation`} 
                      className="w-full h-full object-contain" 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{book.title}</h3>
                    <div className="mt-auto pt-2">
                      <Link href={`/books/${book.id}`}>
                        <Button 
                          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-extrabold shadow-md" 
                        >
                          View Book
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        <div className="mt-12 text-center">
          <Link href="/books">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white font-extrabold shadow-md">View All Books</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookCollectionAnimated;