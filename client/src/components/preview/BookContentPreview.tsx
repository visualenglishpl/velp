import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, CheckCircle, LockIcon, Info, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

interface BookContentPreviewProps {
  bookId: string;
  unitId?: number;
}

interface Slide {
  id: number;
  imageUrl: string;
  question: string;
  answer: string;
}

interface Unit {
  id: number;
  title: string;
  previewAvailable: boolean;
}

// Color assignments for books
const getBookColor = (bookId: string): string => {
  switch (bookId) {
    case '0a': return '#FF40FF'; // Pink
    case '0b': return '#FF7F27'; // Orange
    case '0c': return '#00CEDD'; // Teal
    case '1': return '#FFFF00'; // Yellow
    case '2': return '#9966CC'; // Purple
    case '3': return '#00CC00'; // Green
    case '4': return '#5DADEC'; // Blue
    case '5': return '#00CC66'; // Green
    case '6': return '#FF0000'; // Red
    case '7': return '#00FF00'; // Bright Green
    default: return '#6b7280'; // Gray
  }
};

const BookContentPreview: React.FC<BookContentPreviewProps> = ({ bookId, unitId = 1 }) => {
  const { toast } = useToast();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState(unitId);
  const FREE_PREVIEW_LIMIT = 15; // Number of slides before blurring
  
  // Content fetch query
  const { data: contentData, isLoading, error } = useQuery({
    queryKey: ['/api/preview/content', bookId, selectedUnit],
    // In a real app, this would fetch actual data from the API
    enabled: false // Disabled for now since we're using sample data
  });

  // Preview-specific units data for the selected book
  const { data: unitsData, isLoading: isLoadingUnits } = useQuery({
    queryKey: ['/api/preview/units', bookId],
    // In a real app, this would fetch actual unit data
    enabled: false // Disabled for now
  });

  // Sample content for demonstration
  const sampleSlides: Slide[] = Array(30).fill(null).map((_, index) => ({
    id: index + 1,
    imageUrl: `https://via.placeholder.com/800x600?text=Book+${bookId}+Unit+${selectedUnit}+Slide+${index + 1}`,
    question: index % 3 === 0 ? `Question for slide ${index + 1}?` : '',
    answer: index % 3 === 0 ? `Answer for slide ${index + 1}.` : '',
  }));

  // Sample units for demonstration
  const unitsCount = bookId === '0a' || bookId === '0b' || bookId === '0c' ? 20 : 
                    (bookId >= '1' && bookId <= '3') ? 18 : 16;
                    
  const sampleUnits: Unit[] = Array(unitsCount)
                            .fill(null)
                            .map((_, index) => ({
    id: index + 1,
    title: `Unit ${index + 1}`,
    previewAvailable: true, // Would be determined by the API in production
  }));

  const slides: Slide[] = contentData || sampleSlides;
  const units: Unit[] = unitsData || sampleUnits;

  // Navigation functions
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(prev => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  const handleUnitChange = (unitId: number) => {
    setSelectedUnit(unitId);
    setCurrentSlide(0); // Reset to first slide when changing units
  };

  const handleTrySubscription = () => {
    toast({
      title: "Free Trial Available",
      description: "Start your 7-day free trial to access all content!",
    });
    // In a real app, this would navigate to the subscription page
    window.location.href = '/auth?signup=trial';
  };

  const isSlideBlurred = currentSlide >= FREE_PREVIEW_LIMIT;
  const bookColor = getBookColor(bookId);

  // Reset current slide when book or unit changes
  useEffect(() => {
    setCurrentSlide(0);
  }, [bookId, selectedUnit]);

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-3xl mx-auto my-8">
        <AlertDescription>
          Unable to load preview content. Please try again later.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between mb-6">
        <div className="mb-4 md:mb-0">
          <h2 className="text-2xl font-bold flex items-center">
            <BookOpen className="mr-2 h-6 w-6" style={{ color: bookColor }} />
            <span>Visual English Book {bookId}</span>
            <Badge className="ml-2" style={{ 
              backgroundColor: bookColor,
              color: ['1', '0a'].includes(bookId) ? '#000' : '#fff'
            }}>
              Preview
            </Badge>
          </h2>
          <p className="text-gray-600">
            Explore a free preview of our learning materials
          </p>
        </div>
        
        <div className="flex items-center">
          <Badge variant="outline" className="mr-2">
            <CheckCircle className="mr-1 h-3 w-3" />
            Free Preview
          </Badge>
          <span className="text-sm text-gray-500">
            {FREE_PREVIEW_LIMIT} slides per unit
          </span>
        </div>
      </div>

      {/* Unit selection */}
      <div className="mb-6 overflow-x-auto">
        <div className="inline-flex gap-1 p-1 bg-gray-100 rounded-lg min-w-full md:min-w-0">
          {isLoadingUnits ? (
            Array(5).fill(null).map((_, idx) => (
              <Skeleton key={idx} className="w-20 h-8 rounded-md" />
            ))
          ) : (
            units.slice(0, 10).map((unit) => (
              <Button
                key={unit.id}
                variant={selectedUnit === unit.id ? "default" : "ghost"} 
                size="sm"
                onClick={() => handleUnitChange(unit.id)}
                className="whitespace-nowrap"
                style={selectedUnit === unit.id ? { backgroundColor: bookColor } : {}}
              >
                Unit {unit.id}
              </Button>
            ))
          )}
          {units.length > 10 && (
            <Button variant="ghost" size="sm" className="whitespace-nowrap">
              More Units...
            </Button>
          )}
        </div>
      </div>

      {/* Content viewer */}
      <Card className="relative overflow-hidden max-w-4xl mx-auto">
        {isLoading ? (
          <Skeleton className="w-full aspect-[4/3]" />
        ) : (
          <>
            <div className="relative">
              {/* Main content */}
              <div className={`relative ${isSlideBlurred ? 'blur-sm' : ''}`}>
                <img 
                  src={slides[currentSlide].imageUrl} 
                  alt={`Slide ${currentSlide + 1}`}
                  className="w-full object-contain aspect-[4/3]"
                />
                
                {/* Progress indicator */}
                <div className="absolute top-2 right-2 bg-black/50 text-white rounded-full px-3 py-1 text-sm">
                  {currentSlide + 1} / {Math.min(FREE_PREVIEW_LIMIT, slides.length)}
                </div>
              </div>
              
              {/* Blur overlay with subscription prompt */}
              {isSlideBlurred && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
                    <LockIcon className="mx-auto h-10 w-10 text-amber-500 mb-4" />
                    <h3 className="text-xl font-bold mb-2">Preview Limit Reached</h3>
                    <p className="text-gray-600 mb-4">
                      You've reached the free preview limit of {FREE_PREVIEW_LIMIT} slides. 
                      Subscribe to access all content in this unit and more.
                    </p>
                    <div className="space-y-2">
                      <Button 
                        className="w-full"
                        onClick={handleTrySubscription}
                      >
                        Try Free for 7 Days
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => setCurrentSlide(0)}
                      >
                        Restart Preview
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Navigation controls */}
            <div className="absolute left-0 right-0 top-1/2 transform -translate-y-1/2 flex justify-between px-4 pointer-events-none">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="bg-white/80 hover:bg-white pointer-events-auto"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextSlide}
                disabled={currentSlide >= slides.length - 1 || isSlideBlurred}
                className="bg-white/80 hover:bg-white pointer-events-auto"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Question and answer display */}
            {slides[currentSlide].question && !isSlideBlurred && (
              <CardContent className="p-4 border-t">
                <div className="space-y-2">
                  <p className="font-medium text-center">{slides[currentSlide].question}</p>
                  <p className="text-gray-600 text-center">{slides[currentSlide].answer}</p>
                </div>
              </CardContent>
            )}
            
            <CardFooter className="flex justify-between p-4 border-t">
              <div className="flex items-center text-sm text-gray-500">
                <Info className="h-4 w-4 mr-1" />
                <span>Free preview with limited content</span>
              </div>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleTrySubscription}
              >
                View All Content
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </div>
  );
};

export default BookContentPreview;