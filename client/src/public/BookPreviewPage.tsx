import { useState } from 'react';
import { useLocation } from 'wouter';
import { ArrowLeft, Book, BookOpen } from 'lucide-react';
import BookContentPreview from '../components/preview/BookContentPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface BookInfo {
  id: string;
  name: string;
  description: string;
  color: string;
  units: number;
}

// Book information
const books: BookInfo[] = [
  { id: '0a', name: 'Visual English 0A - Starters', description: 'Introduces basic vocabulary and simple phrases for complete beginners.', color: '#FF40FF', units: 20 },
  { id: '0b', name: 'Visual English 0B - Juniors', description: 'Builds fundamental vocabulary and introduces simple communication.', color: '#FF7F27', units: 20 },
  { id: '0c', name: 'Visual English 0C - Elementary', description: 'Develops essential vocabulary and basic conversation skills.', color: '#00CEDD', units: 20 },
  { id: '1', name: 'Visual English 1', description: 'Builds foundational vocabulary and basic conversation patterns.', color: '#FFFF00', units: 18 },
  { id: '2', name: 'Visual English 2', description: 'Develops essential grammar structures and everyday vocabulary.', color: '#9966CC', units: 18 },
  { id: '3', name: 'Visual English 3', description: 'Expands vocabulary and introduces more complex communication.', color: '#00CC00', units: 18 },
  { id: '4', name: 'Visual English 4', description: 'Focuses on fluent conversation and advanced vocabulary.', color: '#5DADEC', units: 16 },
  { id: '5', name: 'Visual English 5', description: 'Builds comprehensive language skills for intermediate learners.', color: '#00CC66', units: 16 },
  { id: '6', name: 'Visual English 6', description: 'Develops advanced language proficiency and natural expression.', color: '#FF0000', units: 16 },
  { id: '7', name: 'Visual English 7', description: 'Masters complex language structures and specialized vocabulary.', color: '#00FF00', units: 16 },
];

const BookPreviewPage = () => {
  const [, setLocation] = useLocation();
  const [selectedBook, setSelectedBook] = useState<BookInfo | null>(null);
  
  if (selectedBook) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => setSelectedBook(null)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Book Selection
        </Button>
        
        <BookContentPreview bookId={selectedBook.id} />
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold mb-2">Visual English Book Previews</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore sample content from our Visual English books. Preview up to 15 slides from each unit to 
          experience our interactive teaching methodology before subscribing.
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
        {books.map((book) => (
          <Card 
            key={book.id} 
            className="overflow-hidden cursor-pointer transition-all hover:shadow-md"
            onClick={() => setSelectedBook(book)}
          >
            <div 
              className="p-6 flex justify-center items-center" 
              style={{ backgroundColor: book.color }}
            >
              <BookOpen className="h-16 w-16 text-white" />
            </div>
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-bold">{book.name}</h3>
                <Badge 
                  variant="outline" 
                  className="ml-2 shrink-0"
                  style={{ 
                    borderColor: book.color,
                    color: book.color 
                  }}
                >
                  Preview
                </Badge>
              </div>
              <p className="text-sm text-gray-600 mb-4">{book.description}</p>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">
                  <Book className="inline mr-1 h-4 w-4" />
                  {book.units} units
                </span>
                <Button 
                  size="sm" 
                  className="text-xs"
                  style={{ backgroundColor: book.color }}
                >
                  View Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-gray-50 rounded-lg p-6 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold mb-3">About Our Preview System</h2>
        <div className="space-y-4 text-gray-600">
          <p>
            Our preview system allows you to explore the first 15 slides of any unit to get a feel for 
            our teaching methodology and content quality.
          </p>
          <p>
            To view complete units and access all materials, including teacher resources, lesson plans, 
            and supplementary materials, you'll need to subscribe to our platform.
          </p>
          <div className="pt-4">
            <Button onClick={() => setLocation('/auth?signup=trial')}>
              Try Free for 7 Days
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookPreviewPage;