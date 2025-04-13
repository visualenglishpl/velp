import { useState, useEffect } from 'react';
import { useRoute, Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { 
  Card, CardHeader, CardContent, CardTitle, CardFooter, 
  CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { LockIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type UnitInfo = {
  unitNumber: string;
  title: string;
  description?: string;
  thumbnailUrl?: string;
};

export default function UnitsPage() {
  const [, params] = useRoute('/book/:bookId/units');
  const bookId = params?.bookId || '';
  const { toast } = useToast();
  
  // Determine if the user has purchased access (in a real app, this would come from authentication/subscription data)
  const [hasPurchased, setHasPurchased] = useState(false);
  
  // Check for query parameter indicating a successful purchase
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('purchased') === 'true') {
      setHasPurchased(true);
      toast({
        title: "Access Granted!",
        description: "You now have access to all content in this book.",
        duration: 5000,
      });
    }
  }, [toast]);
  
  // This would normally fetch from your API
  const { data: units, isLoading } = useQuery({
    queryKey: ['/api/books', bookId, 'units'],
    queryFn: async () => {
      // For demo purposes, generate sample units
      // In a real app, this would be an API call
      const demoUnits: UnitInfo[] = [];
      for (let i = 1; i <= 10; i++) {
        demoUnits.push({
          unitNumber: i.toString(),
          title: `UNIT ${i}`,
          description: `Interactive lessons and exercises for Unit ${i}.`,
          thumbnailUrl: `/api/asset/book${bookId}/unit${i}/thumbnail.jpg`
        });
      }
      return demoUnits;
    },
  });

  return (
    <div className="container py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">BOOK {bookId.toUpperCase()} - Units</h1>
            <p className="text-gray-600">Browse all units in this book</p>
          </div>
          
          {!hasPurchased && (
            <Button 
              onClick={() => window.location.href = `/checkout/whole_book?book=${bookId}`}
              className="bg-gradient-to-r from-primary to-primary/80"
            >
              Purchase Full Access
            </Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-gray-100 w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardHeader className="py-3 px-4">
                  <Skeleton className="h-6 w-2/3" />
                </CardHeader>
                <CardContent className="py-0 px-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4" />
                </CardContent>
                <CardFooter className="py-3 px-4">
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {units.map((unit, index) => (
              <Card key={unit.unitNumber} className="overflow-hidden flex flex-col">
                <div className="aspect-video bg-gray-100 relative overflow-hidden">
                  {/* First unit is always accessible as a sample */}
                  {!hasPurchased && index > 0 && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10 text-white">
                      <LockIcon className="h-8 w-8 mb-2" />
                      <span className="text-sm font-medium">Premium Content</span>
                    </div>
                  )}
                  
                  <div className={`h-full w-full ${!hasPurchased && index > 0 ? 'blur-sm' : ''}`}>
                    {unit.thumbnailUrl ? (
                      <img 
                        src={unit.thumbnailUrl}
                        alt={`Thumbnail for ${unit.title}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                        <span className="text-2xl font-bold text-gray-400">
                          {unit.unitNumber}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <CardHeader className="py-3 px-4">
                  <CardTitle className="text-base">
                    {unit.title}
                  </CardTitle>
                  {unit.description && (
                    <CardDescription className="text-xs">
                      {unit.description}
                    </CardDescription>
                  )}
                </CardHeader>
                
                <CardFooter className="pt-0 px-4 pb-4 mt-auto">
                  {hasPurchased || index === 0 ? (
                    <Link href={`/book${bookId}/unit${unit.unitNumber}`} className="w-full">
                      <Button className="w-full">
                        {index === 0 && !hasPurchased ? 'Free Preview' : 'View Content'}
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = `/checkout/single_lesson?book=${bookId}&unit=${unit.unitNumber}`}
                    >
                      Buy This Unit
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">No units found</h3>
            <p className="text-gray-600">This book doesn't have any units yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}