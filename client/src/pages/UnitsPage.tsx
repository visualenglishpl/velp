import { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
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
  description?: string;
};

export default function UnitsPage() {
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const params = useParams();
  const bookId = params.bookId;

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
      toast({
        title: 'Error',
        description: `Failed to load units for book ${bookId}. Please try again later.`,
        variant: 'destructive'
      });
    }
  }, [error, toast, bookId]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mb-6">
          <div className="flex items-center">
            <Link href="/books">
              <Button variant="outline" className="mr-4">
                ← Back to Books
              </Button>
            </Link>
            <h1 className="text-3xl font-bold">Book {bookId} Units</h1>
          </div>
          
          {!isAuthenticated && (
            <div className="mt-4 sm:mt-0">
              <Button
                className="bg-[#b23cfd] hover:bg-[#a020f0]"
                onClick={() => {
                  // Add full book to cart
                  try {
                    let cart = [];
                    const storedCart = localStorage.getItem('visualEnglishCart');
                    if (storedCart) {
                      cart = JSON.parse(storedCart);
                    }
                    
                    // Check if book is already in cart
                    const bookInCart = cart.some((item: any) => 
                      item.type === 'book' && item.bookId === bookId
                    );
                    
                    if (!bookInCart) {
                      const newItem = {
                        id: `book${bookId}-full`,
                        type: 'book',
                        bookId,
                        title: `Complete Book ${bookId}`,
                        price: 25,
                      };
                      
                      cart.push(newItem);
                      localStorage.setItem('visualEnglishCart', JSON.stringify(cart));
                      
                      toast({
                        title: 'Book added to cart',
                        description: `Book ${bookId} has been added to your cart.`,
                      });
                    } else {
                      toast({
                        title: 'Book already in cart',
                        description: `Book ${bookId} is already in your cart.`,
                      });
                    }
                  } catch (error) {
                    toast({
                      title: 'Error',
                      description: 'Failed to add book to cart. Please try again.',
                      variant: 'destructive'
                    });
                  }
                }}
              >
                Get Whole Book Access (€25)
              </Button>
            </div>
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
                <div className="aspect-square relative overflow-hidden">
                  {unit.thumbnailUrl ? (
                    <img 
                      src={unit.thumbnailUrl} 
                      alt={`Thumbnail for unit ${unit.unitNumber}`} 
                      className="object-cover w-full h-full"
                      onError={(e) => {
                        // If the thumbnail fails to load, set opacity to 0 to hide it
                        const img = e.currentTarget;
                        img.style.opacity = "0";
                      }} 
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                      <span className="text-gray-400 text-lg">No Preview</span>
                    </div>
                  )}
                </div>
                <div className="py-3 px-4 mt-auto flex flex-col space-y-2">
                  <Link href={`/books/${bookId}/units/${unit.unitNumber}`}>
                    <Button className="w-full px-8 py-2 flex items-center justify-center font-medium bg-purple-600 hover:bg-purple-700">View Unit</Button>
                  </Link>
                  {!isAuthenticated && (
                    <Button
                      variant="outline"
                      className="w-full text-sm"
                      onClick={() => {
                        // Add unit to cart
                        try {
                          let cart = [];
                          const storedCart = localStorage.getItem('visualEnglishCart');
                          if (storedCart) {
                            cart = JSON.parse(storedCart);
                          }
                          
                          // Check if unit is already in cart
                          const unitInCart = cart.some((item: any) => 
                            item.type === 'unit' && 
                            item.bookId === bookId && 
                            item.unitNumber === unit.unitNumber
                          );
                          
                          if (!unitInCart) {
                            const newItem = {
                              id: `book${bookId}-unit${unit.unitNumber}`,
                              type: 'unit',
                              bookId,
                              unitNumber: unit.unitNumber,
                              title: unit.title || `Unit ${unit.unitNumber}`,
                              price: 5,
                              thumbnailUrl: unit.thumbnailUrl
                            };
                            
                            cart.push(newItem);
                            localStorage.setItem('visualEnglishCart', JSON.stringify(cart));
                            
                            toast({
                              title: 'Unit added to cart',
                              description: `Unit ${unit.unitNumber} has been added to your cart.`,
                            });
                          } else {
                            toast({
                              title: 'Unit already in cart',
                              description: `Unit ${unit.unitNumber} is already in your cart.`,
                            });
                          }
                        } catch (error) {
                          toast({
                            title: 'Error',
                            description: 'Failed to add unit to cart. Please try again.',
                            variant: 'destructive'
                          });
                        }
                      }}
                    >
                      Purchase Unit (€5)
                    </Button>
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
