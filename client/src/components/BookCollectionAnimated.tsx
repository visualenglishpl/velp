import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BookInfo {
  id: string;
  title: string;
  color: string;
  textColor: string;
  borderColor: string;
  buttonColor: string;
  hoverColor: string;
  coverUrl?: string;
  animatedUrl?: string;
}

const BookCollectionAnimated: React.FC = () => {
  const [activeBook, setActiveBook] = useState<number>(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showAnimated, setShowAnimated] = useState(false);
  
  // Predefined book info with exact colors from the book covers
  const books: BookInfo[] = [
    {
      id: '0a',
      title: 'Book 0A',
      color: '#ffedcc',
      textColor: '#663300',
      borderColor: '#ffcc66',
      buttonColor: '#FF40FF', // Pink
      hoverColor: '#E038E0'
    },
    {
      id: '0b',
      title: 'Book 0B',
      color: '#e6f7ff',
      textColor: '#003366',
      borderColor: '#99d6ff',
      buttonColor: '#FF7F27', // Orange
      hoverColor: '#E07022'
    },
    {
      id: '0c',
      title: 'Book 0C',
      color: '#eaf7ea',
      textColor: '#1a5918',
      borderColor: '#b3e6b3',
      buttonColor: '#00CEDD', // Teal
      hoverColor: '#00B8C5'
    },
    {
      id: '1',
      title: 'Book 1',
      color: '#f5e6ff',
      textColor: '#4d0099',
      borderColor: '#dfb3ff',
      buttonColor: '#FFFF00', // Yellow
      hoverColor: '#E0E000'
    },
    {
      id: '2',
      title: 'Book 2',
      color: '#ffe6e6',
      textColor: '#990000',
      borderColor: '#ffb3b3',
      buttonColor: '#9966CC', // Purple
      hoverColor: '#8959B3'
    },
    {
      id: '3',
      title: 'Book 3',
      color: '#f0f7e6',
      textColor: '#336600', 
      borderColor: '#c6e6a3',
      buttonColor: '#00CC00', // Green
      hoverColor: '#00B300'
    },
    {
      id: '4',
      title: 'Book 4',
      color: '#ffe6f0',
      textColor: '#99004d',
      borderColor: '#ffb3d1',
      buttonColor: '#5DADEC', // Blue
      hoverColor: '#5199D3'
    },
    {
      id: '5',
      title: 'Book 5',
      color: '#e6f0ff',
      textColor: '#002266',
      borderColor: '#b3d1ff',
      buttonColor: '#00CC66', // Green
      hoverColor: '#00B35A'
    },
    {
      id: '6',
      title: 'Book 6',
      color: '#f9f0e6',
      textColor: '#664400',
      borderColor: '#f2d9b3',
      buttonColor: '#FF0000', // Red
      hoverColor: '#E00000'
    },
    {
      id: '7',
      title: 'Book 7',
      color: '#e6e6ff',
      textColor: '#000066',
      borderColor: '#b3b3ff',
      buttonColor: '#00FF00', // Bright Green
      hoverColor: '#00E000'
    }
  ];

  // Load book cover images
  useEffect(() => {
    const loadBookImages = async () => {
      setLoading(true);
      try {
        // Update the books array with image URLs
        books.forEach(book => {
          // Set default URLs for covers and animated GIFs (these will be replaced by actual URLs in production)
          book.coverUrl = `/api/content/book${book.id}/cover.png`;
          book.animatedUrl = `/api/content/book${book.id}/animated.gif`;
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error loading book images:', error);
        setLoading(false);
      }
    };
    
    loadBookImages();
  }, []);

  // Animate through books automatically
  useEffect(() => {
    if (isAnimating) {
      const interval = setInterval(() => {
        setActiveBook(prev => (prev + 1) % books.length);
      }, 3000); // Change book every 3 seconds
      
      return () => clearInterval(interval);
    }
  }, [isAnimating, books.length]);

  // Navigate to previous book
  const prevBook = () => {
    setActiveBook(prev => (prev - 1 + books.length) % books.length);
  };

  // Navigate to next book
  const nextBook = () => {
    setActiveBook(prev => (prev + 1) % books.length);
  };

  // Toggle animation
  const toggleAnimation = () => {
    setIsAnimating(prev => !prev);
  };

  // Toggle between static and animated display
  const toggleAnimated = () => {
    setShowAnimated(prev => !prev);
  };

  // Current book
  const currentBook = books[activeBook];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-2/3">
          <Card 
            className="overflow-hidden border-4 transition-all duration-300 h-[400px]" 
            style={{ 
              backgroundColor: currentBook.color,
              borderColor: currentBook.borderColor
            }}
          >
            <CardContent className="p-0 h-full flex items-center justify-center">
              {loading ? (
                <Skeleton className="w-full h-full" />
              ) : (
                <img 
                  src={showAnimated ? currentBook.animatedUrl : currentBook.coverUrl} 
                  alt={currentBook.title} 
                  className="w-full h-full object-cover"
                  style={{ padding: "0px", objectFit: "cover" }}
                />
              )}
            </CardContent>
          </Card>

          <div className="flex items-center justify-between mt-4">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={prevBook}
              className="rounded-full"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            <div className="flex flex-col items-center">
              <h3 
                className="text-xl font-bold" 
                style={{ color: currentBook.textColor }}
              >
                {currentBook.title}
              </h3>
              <div className="flex gap-2 mt-2">
                <Badge variant={isAnimating ? "destructive" : "outline"}>
                  {isAnimating ? "Auto-Playing" : "Paused"}
                </Badge>
                <Badge variant={showAnimated ? "default" : "outline"}>
                  {showAnimated ? "Animated" : "Static"}
                </Badge>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="icon" 
              onClick={nextBook}
              className="rounded-full"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="w-full md:w-1/3 flex flex-col space-y-4">
          <div className="rounded-lg p-6" style={{ backgroundColor: currentBook.color }}>
            <h3 
              className="text-lg font-bold mb-3" 
              style={{ color: currentBook.textColor }}
            >
              Book Controls
            </h3>
            
            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={toggleAnimation}
                style={{ 
                  backgroundColor: currentBook.buttonColor,
                  color: '#fff',
                  border: 'none',
                }}
                variant="secondary"
              >
                {isAnimating ? "Pause Auto-Play" : "Start Auto-Play"}
              </Button>
              
              <Button 
                className="w-full" 
                onClick={toggleAnimated}
                style={{ 
                  backgroundColor: currentBook.buttonColor,
                  color: '#fff',
                  border: 'none',
                }}
                variant="secondary"
              >
                {showAnimated ? "Show Static Cover" : "Show Animation"}
              </Button>
              
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => window.open(`/books/${currentBook.id}`, '_blank')}
              >
                Browse Units
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg p-4 text-sm text-gray-600">
            <p>
              Visual English's unique collection is designed with a progression of themes 
              that capture children's interest while building English language skills systematically.
            </p>
            <p className="mt-2">
              Each book contains up to 20 themed units with hundreds of interactive visuals.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-6 flex-wrap gap-2">
        {books.map((book, index) => (
          <Button
            key={book.id}
            variant={activeBook === index ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveBook(index)}
            style={activeBook === index ? {
              backgroundColor: book.buttonColor,
              color: '#fff'
            } : {}}
          >
            Book {book.id}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default BookCollectionAnimated;