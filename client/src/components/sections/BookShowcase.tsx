import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type Book = {
  id: string;
  title: string;
  color: string;
  thumbnailUrl: string;
};

const BookShowcase: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create book data with unit thumbnail links
    const booksData: Book[] = [
      {
        id: '0a',
        title: 'Book 0A - To The Moon',
        color: '#ffedcc',
        thumbnailUrl: '/api/content/book0a/icons/thumbnailsuni0a-1.png'
      },
      {
        id: '0b',
        title: 'Book 0B - Barn In The Farm',
        color: '#e6f7ff',
        thumbnailUrl: '/api/content/book0b/icons/thumbnailsuni0b-1.png'
      },
      {
        id: '0c',
        title: 'Book 0C - At The Farm',
        color: '#eaf7ea',
        thumbnailUrl: '/api/content/book0c/icons/thumbnailsuni0c-1.png'
      },
      {
        id: '1',
        title: 'Book 1 - Vegetables',
        color: '#f5e6ff',
        thumbnailUrl: '/api/content/book1/icons/thumbnailsuni1-1.png'
      },
      {
        id: '2',
        title: 'Book 2 - Sports',
        color: '#ffe6e6',
        thumbnailUrl: '/api/content/book2/icons/thumbnailsuni2-1.png'
      },
      {
        id: '3',
        title: 'Book 3 - Bugs',
        color: '#f0f7e6',
        thumbnailUrl: '/api/content/book3/icons/thumbnailsuni3-1.png'
      },
      {
        id: '4',
        title: 'Book 4 - At The Circus',
        color: '#ffe6f0',
        thumbnailUrl: '/api/content/book4/icons/thumbnailsuni4-1.png'
      },
      {
        id: '5',
        title: 'Book 5 - Movie Time',
        color: '#e6f0ff',
        thumbnailUrl: '/api/content/book5/icons/thumbnailsuni5-1.png'
      },
      {
        id: '6',
        title: 'Book 6 - Fashion Accessories',
        color: '#f9f0e6',
        thumbnailUrl: '/api/content/book6/icons/thumbnailsuni6-1.png'
      },
      {
        id: '7',
        title: 'Book 7 - Social Problems',
        color: '#e6e6ff',
        thumbnailUrl: '/api/content/book7/icons/thumbnailsuni7-1.png'
      }
    ];

    setBooks(booksData);
    setLoading(false);
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Our Book Collection</h2>
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
                    className="aspect-square w-full flex items-center justify-center"
                    style={{ backgroundColor: book.color }}
                  >
                    <img 
                      src={book.thumbnailUrl} 
                      alt={`Book ${book.id} thumbnail`} 
                      className="w-24 h-24 object-contain" 
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-1">{book.title}</h3>
                    <div className="mt-auto pt-2">
                      <Link href={`/books/${book.id}`}>
                        <Button className="w-full">View Book</Button>
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
            <Button size="lg">View All Books</Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BookShowcase;