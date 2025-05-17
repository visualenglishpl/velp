import { useState } from 'react';
import { SlidesBasedLessonPlan } from '@/components/resources/SlidesBasedLessonPlan';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookId, UnitId } from '@/types/content';
import { Layers, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function SlidesLessonPlanDemo() {
  const [bookId, setBookId] = useState<BookId>('1');
  const [unitId, setUnitId] = useState<UnitId>('1');
  
  // Available books and units
  const books: BookId[] = ['1', '2', '3', '4', '5', '6', '7'];
  
  const getUnitCount = (bookId: BookId): number => {
    if (['4', '5', '6', '7'].includes(bookId)) return 16;
    return 18; // Books 1-3 have 18 units
  };
  
  const handleBookChange = (id: string) => {
    setBookId(id as BookId);
    // Reset unit to 1 when book changes
    setUnitId('1');
  };
  
  const handleUnitChange = (id: string) => {
    setUnitId(id as UnitId);
  };
  
  return (
    <div className="container py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold flex items-center">
          <Layers className="h-6 w-6 mr-2 text-primary" />
          Slides-Based Lesson Plan Demo
        </h1>
        
        <Link to="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      {/* Book and unit selection */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 bg-muted/20 rounded-lg">
        <div className="space-y-1">
          <p className="text-sm font-medium">Book:</p>
          <div className="flex flex-wrap gap-2">
            {books.map((id) => (
              <Button
                key={id}
                variant={bookId === id ? "default" : "outline"}
                size="sm"
                onClick={() => handleBookChange(id)}
              >
                Book {id}
              </Button>
            ))}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm font-medium">Unit:</p>
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: getUnitCount(bookId) }, (_, i) => (i + 1).toString()).map((id) => (
              <Button
                key={id}
                variant={unitId === id ? "default" : "outline"}
                size="sm"
                onClick={() => handleUnitChange(id)}
              >
                Unit {id}
              </Button>
            ))}
          </div>
        </div>
      </div>
      
      {/* Main lesson plan display */}
      <Card className="border-primary/20">
        <CardHeader className="bg-primary/5 pb-3">
          <CardTitle className="flex items-center">
            <Layers className="h-5 w-5 mr-2 text-primary" />
            Slides-Based Lesson Plan (Book {bookId}, Unit {unitId})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <SlidesBasedLessonPlan 
            bookId={bookId} 
            unitId={unitId} 
            title={`Book ${bookId} Unit ${unitId} Slides-Based Lesson Plan`}
          />
        </CardContent>
      </Card>
    </div>
  );
}