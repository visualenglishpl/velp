import { useState, useEffect } from 'react';
import { Link } from 'wouter';

interface BookInfo {
  id: string;
  title: string;
  color: string;
  textColor: string;
  borderColor: string;
  buttonColor: string;
  hoverColor: string;
}

const BookSeriesAnimated = () => {
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  
  const books: BookInfo[] = [
    { 
      id: '0a', 
      title: 'To The Moon', 
      color: 'blue-600', 
      textColor: 'blue-800',
      borderColor: 'blue-400',
      buttonColor: 'red-600',
      hoverColor: 'red-700'
    },
    { 
      id: '0b', 
      title: 'Barn In The Farm', 
      color: 'orange-600', 
      textColor: 'orange-800',
      borderColor: 'orange-400',
      buttonColor: 'green-600',
      hoverColor: 'green-700'
    },
    { 
      id: '0c', 
      title: 'At The Farm', 
      color: 'amber-600', 
      textColor: 'amber-800',
      borderColor: 'amber-400',
      buttonColor: 'blue-600',
      hoverColor: 'blue-700'
    },
    { 
      id: '1', 
      title: 'Vegetables', 
      color: 'green-600', 
      textColor: 'green-800',
      borderColor: 'green-400',
      buttonColor: 'purple-600',
      hoverColor: 'purple-700'
    },
    { 
      id: '2', 
      title: 'Sports', 
      color: 'sky-600', 
      textColor: 'sky-800',
      borderColor: 'sky-400',
      buttonColor: 'yellow-500',
      hoverColor: 'yellow-600'
    },
    { 
      id: '3', 
      title: 'Bugs', 
      color: 'lime-600', 
      textColor: 'lime-800',
      borderColor: 'lime-400',
      buttonColor: 'red-600',
      hoverColor: 'red-700'
    },
    { 
      id: '4', 
      title: 'At The Circus', 
      color: 'pink-600', 
      textColor: 'pink-800',
      borderColor: 'pink-400',
      buttonColor: 'green-600',
      hoverColor: 'green-700'
    },
    { 
      id: '5', 
      title: 'Movie Time', 
      color: 'red-600', 
      textColor: 'red-800',
      borderColor: 'red-400',
      buttonColor: 'orange-600',
      hoverColor: 'orange-700'
    },
    { 
      id: '6', 
      title: 'Fashion Accessories', 
      color: 'purple-600', 
      textColor: 'purple-800',
      borderColor: 'purple-400',
      buttonColor: 'blue-600',
      hoverColor: 'blue-700'
    },
    { 
      id: '7', 
      title: 'Social Problems', 
      color: 'gray-600', 
      textColor: 'gray-800',
      borderColor: 'gray-400',
      buttonColor: 'red-600',
      hoverColor: 'red-700'
    }
  ];

  // Auto-play through books
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentBookIndex((prev) => (prev + 1) % books.length);
    }, 3000); // Change every 3 seconds
    
    return () => clearInterval(interval);
  }, [isPlaying, books.length]);

  const currentBook = books[currentBookIndex];

  return (
    <div className="py-10 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">Animated Book Showcase</h2>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left side - Book thumbnail with GIF */}
          <div className="relative w-full md:w-1/2 max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-20"></div>
            <div className="relative bg-white rounded-xl overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-105">
              <img 
                src={`/api/content/book${currentBook.id}/animated.gif`} 
                alt={`Book ${currentBook.id} - ${currentBook.title}`}
                className="w-full h-auto"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `/api/content/book${currentBook.id}/icons/thumbnailsuni${currentBook.id}-1.png`;
                }}
              />
              <div className={`p-6 text-center bg-${currentBook.color}/10`}>
                <h3 className={`font-bold text-${currentBook.textColor} text-2xl`}>VISUAL ENGLISH</h3>
                <p className={`text-${currentBook.textColor} text-xl font-medium mb-4`}>BOOK {currentBook.id.toUpperCase()}</p>
                <Link href={`/books/${currentBook.id}`}>
                  <button className={`w-full bg-${currentBook.buttonColor} hover:bg-${currentBook.hoverColor} text-white py-3 px-4 rounded-md font-bold text-lg transform transition-all duration-200 hover:scale-105 shadow-md border border-${currentBook.borderColor}`}>
                    View Units
                  </button>
                </Link>
                <p className={`mt-3 text-${currentBook.textColor} font-medium`}>Interactive lessons for young learners</p>
              </div>
            </div>
          </div>
          
          {/* Right side - Book details and navigation */}
          <div className="w-full md:w-1/2 max-w-md mt-8 md:mt-0">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-purple-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Visual English Book {currentBook.id.toUpperCase()}</h3>
              <p className="text-gray-600 mb-6">
                Our Visual English series uses engaging visuals and interactive exercises to make language learning fun for children ages 5-12. Book {currentBook.id.toUpperCase()} focuses on {currentBook.title} vocabulary and everyday conversation patterns.
              </p>
              
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-medium py-2 px-4 rounded-md"
                >
                  {isPlaying ? '⏸️ Pause' : '▶️ Play'}
                </button>
                <div className="flex gap-2">
                  <button 
                    onClick={() => setCurrentBookIndex((prev) => (prev - 1 + books.length) % books.length)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md"
                  >
                    ◀️ Prev
                  </button>
                  <button 
                    onClick={() => setCurrentBookIndex((prev) => (prev + 1) % books.length)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md"
                  >
                    Next ▶️
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-5 gap-2">
                {books.map((book, index) => (
                  <button
                    key={book.id}
                    onClick={() => setCurrentBookIndex(index)}
                    className={`w-10 h-10 rounded-full font-bold ${index === currentBookIndex 
                      ? `bg-${book.color} text-white ring-2 ring-offset-2 ring-${book.borderColor}` 
                      : `bg-${book.color}/20 text-${book.color} hover:bg-${book.color}/40`}`}
                  >
                    {book.id}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookSeriesAnimated;