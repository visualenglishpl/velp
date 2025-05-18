import { useState, useEffect } from 'react';
import { useTeacherResources } from '@/hooks/useTeacherResources';
import { SideBySideLessonPlanView } from '@/components/resources/SideBySideLessonPlanView';
import { Button } from '@/components/ui/button';
import { BookId, UnitId } from '@/types/content';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { Link } from 'wouter';

export default function LessonPlanPreview() {
  const [bookId, setBookId] = useState<BookId>('1');
  const [unitId, setUnitId] = useState<UnitId>('1');
  
  // Use the hook to fetch resources
  const {
    resources,
    isLoading,
    error,
    setBookId: setResourceBookId,
    setUnitId: setResourceUnitId
  } = useTeacherResources({
    initialBookId: bookId,
    initialUnitId: unitId
  });
  
  // Update resources when book/unit selection changes
  useEffect(() => {
    setResourceBookId(bookId);
    setResourceUnitId(unitId);
  }, [bookId, unitId, setResourceBookId, setResourceUnitId]);
  
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
          <BookOpen className="h-6 w-6 mr-2 text-primary" />
          Detailed Lesson Plan
        </h1>
        
        <Link to="/test-resources">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Resources
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
      
      {/* Error display */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-6">
          <h3 className="font-semibold">Error loading resources</h3>
          <p>{error.message}</p>
        </div>
      )}
      
      {/* Main lesson plan view */}
      <SideBySideLessonPlanView
        bookId={bookId}
        unitId={unitId}
        resources={resources}
        isLoading={isLoading}
      />
    </div>
  );
}