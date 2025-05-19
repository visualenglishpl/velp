import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { useQuery } from '@tanstack/react-query';

// Type for a unit with thumbnail URL
type UnitWithThumbnail = {
  unitNumber: string;
  title: string;
  thumbnailUrl?: string;
  fallbackColor?: string;
  description?: string;
};

// Function to get book color based on ID
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

export default function UnitsPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const params = useParams();
  const bookId = params.bookId;
  const [location] = useLocation();

  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest('GET', '/api/user');
        if (response.ok) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    };
    
    checkAuth();
  }, []);

  // Query to get units for a specific book
  const { data: units, isLoading, error } = useQuery<UnitWithThumbnail[]>({
    queryKey: [`/api/books/${bookId}/units`],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/books/${bookId}/units`);
      if (!res.ok) {
        throw new Error(`Failed to fetch units for book ${bookId}`);
      }
      return await res.json();
    },
    enabled: !!bookId, // Only run the query if bookId is available
  });

  // Handle error
  useEffect(() => {
    if (error) {
      console.error("Error loading units:", error);
      toast({
        title: 'Error',
        description: `Failed to load units for book ${bookId}. Please try again later.`,
        variant: 'destructive'
      });
    }
  }, [error, toast, bookId]);
  
  // Add debugging log when units change
  useEffect(() => {
    if (units) {
      console.log(`Successfully loaded ${units.length} units for book ${bookId}`);
    }
  }, [units, bookId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-4">
          <div className="flex items-center gap-2">
            <Link href="/books">
              <Button variant="outline" className="mr-2">
                ← Back to Books
              </Button>
            </Link>
            {(location.toString().includes('admin') || document.referrer.includes('admin')) && (
              <Link href="/admin">
                <Button variant="outline" className="mr-2">
                  ← Back to Admin
                </Button>
              </Link>
            )}
          </div>
          <h1 className="text-4xl font-bold">Book {bookId} Units</h1>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
          <Button
            className="w-full sm:w-auto py-6 text-lg bg-[#b23cfd] hover:bg-[#a020f0] shadow-md"
            onClick={() => {
              window.location.href = `/checkout/book?book=${bookId}`;
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
            </svg>
            Subscribe to Full Book
          </Button>
          
          {!isAuthenticated && (
            <>
              <Button
                className="w-full sm:w-auto py-6 text-lg bg-[#2e88f6] hover:bg-blue-600 shadow-md"
                onClick={() => {
                  window.location.href = `/checkout/unit?book=${bookId}`;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <path d="M3 6h18"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Select Multiple Units
              </Button>
              
              <Button
                className="w-full sm:w-auto py-6 text-lg bg-green-600 hover:bg-green-700 shadow-md"
                onClick={() => {
                  window.location.href = `/checkout/free_trial?book=${bookId}`;
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M2 12h20" />
                  <path d="M12 2v20" />
                </svg>
                Start Free 7-Day Trial
              </Button>
            </>
          )}
          
          {isAuthenticated && (
            <Button variant="outline" className="py-6 text-lg">My Subscription</Button>
          )}
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(16)].map((_, i) => (
              <Card key={i} className="overflow-hidden border-0 shadow-none">
                <div className="px-4 pt-2 pb-1">
                  <Skeleton className="h-6 w-1/3 mx-auto" />
                </div>
                <div className="aspect-square w-full">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="py-3 px-4 flex justify-center">
                  <Skeleton className="h-10 w-32" />
                </div>
              </Card>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {units.map((unit) => (
              <Card key={unit.unitNumber} className="overflow-hidden flex flex-col border-0 shadow-none">
                <h3 className="text-xl font-medium text-center mt-2 mb-1">Unit {unit.unitNumber}</h3>
                <Link 
                  href={`/books/${bookId}/units/${unit.unitNumber}`} 
                  className="aspect-square relative overflow-hidden border rounded-md hover:border-gray-300 transition-all block"
                >
                  {unit.thumbnailUrl ? (
                    <>
                      <div 
                        className="h-full w-full absolute top-0 left-0 flex items-center justify-center"
                        style={{backgroundColor: unit.fallbackColor || getBookColor(bookId || "")}}
                      >
                        <div className="text-white font-bold text-xl text-center">
                          VISUAL {bookId}<br/>ENGLISH
                        </div>
                      </div>
                      <img 
                        src={unit.thumbnailUrl} 
                        alt={`Thumbnail for unit ${unit.unitNumber}`} 
                        className="object-cover w-full h-full relative z-10"
                        loading="lazy"
                        onError={(e) => {
                          // If the thumbnail fails to load, just hide the image and show the fallback
                          const img = e.currentTarget;
                          img.style.display = "none";
                        }}
                      />
                      <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-70 text-white p-2 rounded-br-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div 
                      className="h-full w-full flex items-center justify-center"
                      style={{backgroundColor: unit.fallbackColor || getBookColor(bookId || "")}}
                    >
                      <div className="text-white font-bold text-xl text-center">
                        VISUAL {bookId}<br/>ENGLISH
                      </div>
                      <div className="absolute top-0 left-0 bg-gray-800 bg-opacity-70 text-white p-2 rounded-br-md">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                        </svg>
                      </div>
                    </div>
                  )}
                </Link>
                <div className="py-3 mt-auto flex flex-col gap-3">
                  <Button 
                    className="w-full py-2 flex items-center justify-center font-medium bg-purple-600 hover:bg-purple-700"
                    onClick={() => window.location.href = `/book/${bookId}/unit/${unit.unitNumber}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                    View Content
                  </Button>
                  {!isAuthenticated && (
                    <>
                      <Button
                        variant="outline"
                        className="w-full border-blue-500 text-blue-600 hover:bg-blue-50"
                        onClick={() => {
                          window.location.href = `/checkout/unit?book=${bookId}&unit=${unit.unitNumber}`;
                        }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                          <path d="M3 6h18"/>
                          <path d="M16 10a4 4 0 0 1-8 0"/>
                        </svg>
                        Buy Unit (€5)
                      </Button>
                    </>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-700 mb-2">No units found</h3>
            <p className="text-gray-500">This book has no units available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
