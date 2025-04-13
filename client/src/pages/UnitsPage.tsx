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
      
      // Special cases for unit counts by book:
      // - Book 0a has 20 units
      // - Books 4-7 have 16 units
      // - Others have 10 units by default
      let unitCount = 10;
      
      if (bookId === '0a') {
        unitCount = 20;
      } else if (['4', '5', '6', '7'].includes(bookId)) {
        unitCount = 16;
      }
      
      for (let i = 1; i <= unitCount; i++) {
        demoUnits.push({
          unitNumber: i.toString(),
          title: `UNIT ${i}`,
          description: '', // Remove descriptions as requested
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
            <div className="flex items-center mb-2">
              <Link href="/books">
                <Button variant="outline" className="mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Books
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">BOOK {bookId.toUpperCase()} - Units</h1>
            </div>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden flex flex-col shadow-md">
                <div className="aspect-[4/3] bg-gray-100 w-full rounded-t-md">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
            {units.map((unit, index) => (
              <Card key={unit.unitNumber} className="overflow-hidden flex flex-col shadow-md hover:shadow-lg transition-shadow">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden rounded-t-md">
                  {!hasPurchased && index > 0 && (
                    <div className="absolute top-2 right-2 bg-primary/90 rounded-full p-1 z-10">
                      <LockIcon className="h-4 w-4 text-white" />
                    </div>
                  )}
                  
                  <div className="h-full w-full">
                    {/* Generate direct S3 path to first image from the unit */}
                    <div className="h-full w-full relative">
                      {/* Styled unit background with gradient */}
                      <div className="h-full w-full bg-gradient-to-br from-primary/10 to-primary/30 flex flex-col items-center justify-center absolute inset-0">
                        <span className="text-3xl font-bold text-primary/80 drop-shadow-sm">
                          UNIT {unit.unitNumber}
                        </span>
                      </div>
                      
                      {/* Try multiple image patterns in order */}
                      <img 
                        src={
                          // Dynamically determine the best starting path based on book and unit
                          (() => {
                            // For book 0a, 0b, 0c - they have special icon folder structure
                            if (bookId.startsWith("0")) {
                              // For Book 0 series - use the discovered actual format in the S3 bucket
                              // The exact format is "thumbnailsuni0a-1.png" etc.
                              const unitNum = parseInt(unit.unitNumber, 10);
                              return `/api/direct/book${bookId.slice(0, 3)}/icons/thumbnailsuni${bookId}-${unitNum}.png`;
                            }
                            // For all known problematic units in any book
                            else if (
                              (bookId === "1" && ["1", "2", "5", "10"].includes(unit.unitNumber)) ||
                              (bookId === "2" && ["1", "4", "5", "8", "9", "10"].includes(unit.unitNumber)) ||
                              (bookId === "3" && ["3", "5", "7", "8", "10"].includes(unit.unitNumber)) ||
                              (bookId === "4" && unit.unitNumber === "14") ||
                              ((bookId === "5" || bookId === "6") && ["5", "8", "13"].includes(unit.unitNumber)) ||
                              (bookId === "7" && ["5", "7", "8", "13", "14"].includes(unit.unitNumber))
                            ) {
                              return `/api/direct/book${bookId}/unit${unit.unitNumber}/title.png`;
                            }
                            // Standard path for most units
                            else {
                              return `/api/direct/book${bookId}/unit${unit.unitNumber}/assets/00 E.png`;
                            }
                          })()
                        } 
                        alt={`Thumbnail for ${unit.title}`}
                        className="h-full w-full object-contain relative z-10"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
                        onError={(e) => {
                          // Try different common filenames in sequence
                          const img = e.target as HTMLImageElement;
                          
                          // Book-specific filename patterns
                          let tryFilenames: string[] = [];
                          
                          // For Book 0a, 0b, 0c with completely different structure
                          if (bookId.startsWith("0")) {
                            // Special handling for Book 0 series - try both regular paths and icons folder
                            
                            // First try the main unit folder paths
                            tryFilenames = [
                              "unit.png",
                              "cover.png",
                              "title.png",
                              "00 E.png",
                              "00 A.png",
                              "00.png",
                              "0.png",
                              "1.png",
                              "01.png", 
                              "preview.png",
                              "thumbnail.png",
                              "index.png"
                            ];
                            
                            // This custom handling tries all paths in the folder structure first,
                            // then checks the special icons folder that holds thumbnails for book 0 series
                            const book0IconCheck = () => {
                              // Only try this path if the image is still failing to load
                              if (img.style.opacity !== "0") return;
                              
                              // IMPORTANT DEBUGGING: Log each attempt for book 0 thumbnails
                              console.log(`Book ${bookId}, Unit ${unit.unitNumber}: Trying Book 0 icons folder paths`);
                              
                              // CRITICAL FIX: Start with the confirmed working path format for Book 0 series
                              // The exact format is "thumbnailsuni0a-1.png" etc.
                              const unitNum = parseInt(unit.unitNumber, 10);
                              
                              // 1. First try the best format we've discovered in S3 bucket
                              const thumbnailIconPath = `/api/direct/book${bookId.slice(0, 3)}/icons/thumbnailsuni${bookId}-${unitNum}.png`;
                              console.log(`Trying exact thumbnail path: ${thumbnailIconPath}`);
                              img.src = thumbnailIconPath;
                              
                              img.onerror = () => {
                                // Try with 'unit' prefix in icons folder
                                const genericIconPath = `/api/direct/book${bookId.slice(0, 3)}/icons/unit${unitNum}.png`;
                                console.log(`Trying with unit prefix: ${genericIconPath}`);
                                img.src = genericIconPath;
                                
                                img.onerror = () => {
                                  // Try book-specific icons folder with numeric filename
                                  const bookSpecificIconPath = `/api/direct/book${bookId}/icons/${unitNum}.png`;
                                  console.log(`Trying book-specific icon path: ${bookSpecificIconPath}`);
                                  img.src = bookSpecificIconPath;
                                  
                                  img.onerror = () => {
                                    // Try book-specific icons folder with unit-prefixed filename
                                    const unitPrefixedPath = `/api/direct/book${bookId}/icons/unit${unitNum}.png`;
                                    console.log(`Trying unit-prefixed path: ${unitPrefixedPath}`);
                                    img.src = unitPrefixedPath;
                                    
                                    img.onerror = () => {
                                      // If all icon attempts fail, fall back to original approach
                                      console.log(`All icon attempts failed for Book ${bookId}, Unit ${unit.unitNumber}`);
                                      img.style.opacity = "0";
                                    };
                                  };
                                };
                              };
                            };
                            
                            // Add this check to run after the main folder structure checks
                            setTimeout(book0IconCheck, 500);
                          }
                          // For Book 1, some units have special format
                          else if (bookId === "1" && ["1", "2", "5", "10"].includes(unit.unitNumber)) {
                            tryFilenames = [
                              "title.png",
                              "unit.png",
                              "cover.png",
                              "00.png",
                              "1.png"
                            ];
                          }
                          // For Book 2, some units have special format
                          else if (bookId === "2" && ["1", "4", "5", "8", "9", "10"].includes(unit.unitNumber)) {
                            tryFilenames = [
                              "title.png",
                              "unit.png",
                              "cover.png",
                              "00.png",
                              "1.png"
                            ];
                          }
                          // For Book 3, some units have special format
                          else if (bookId === "3" && ["3", "5", "7", "8", "10"].includes(unit.unitNumber)) {
                            tryFilenames = [
                              "title.png",
                              "unit.png",
                              "cover.png",
                              "00.png",
                              "1.png"
                            ];
                          }
                          // For Book 4, use specific patterns
                          else if (bookId === "4") {
                            // Special handling for unit 14
                            if (unit.unitNumber === "14") {
                              tryFilenames = [
                                "title.png",
                                "unit.png",
                                "cover.png",
                                "00.png"
                              ];
                            } else {
                              tryFilenames = [
                                "00.png",
                                "00 A.png", 
                                "00 B.png",
                                "00 C.png",
                                "00 D.png",
                                "00 E.png",
                                "001.png",
                                "01.png",
                                "1.png"
                              ];
                            }
                          } 
                          // For Book 5, 6, 7 problematic units
                          else if ((bookId === "5" || bookId === "6" || bookId === "7") && 
                                  ["5", "8", "13"].includes(unit.unitNumber)) {
                            tryFilenames = [
                              "title.png",
                              "unit.png",
                              "cover.png",
                              "00.png",
                              "00 A.png"
                            ];
                          }
                          // Book 7 has additional problematic units
                          else if (bookId === "7" && ["7", "14"].includes(unit.unitNumber)) {
                            tryFilenames = [
                              "title.png",
                              "unit.png",
                              "cover.png",
                              "00.png",
                              "00 A.png"
                            ];
                          }
                          // Default patterns for all other cases
                          else {
                            tryFilenames = [
                              "00 E.png",
                              "00 A.png", 
                              "00 B.png",
                              "00 C.png",
                              "00 D.png",
                              "00.png",
                              "01 A.png",
                              "01.png",
                              "001.png",
                              "1.png",
                              "unit.png",
                              "title.png",
                              "cover.png"
                            ];
                          }
                          
                          // Try next filename or hide if all fail
                          const tryNextOrHide = (index = 0, inAssets = true) => {
                            if (index >= tryFilenames.length) {
                              if (inAssets) {
                                // Try again outside the assets folder
                                tryNextOrHide(0, false);
                                return;
                              } else {
                                // All attempts failed, hide the image
                                img.style.opacity = "0";
                                return;
                              }
                            }
                            
                            // Try in assets folder first, then directly in unit folder
                            const path = inAssets 
                              ? `/api/direct/book${bookId}/unit${unit.unitNumber}/assets/${tryFilenames[index]}`
                              : `/api/direct/book${bookId}/unit${unit.unitNumber}/${tryFilenames[index]}`;
                              
                            img.src = path;
                            img.onerror = () => {
                              tryNextOrHide(index + 1, inAssets);
                            };
                          };
                          
                          // For book 0 series, start directly with non-assets path as they typically don't use assets folder
                          if (bookId.startsWith("0")) {
                            tryNextOrHide(0, false);
                          } else {
                            tryNextOrHide(0, true);
                          }
                        }}
                      />
                    </div>
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
                
                <CardFooter className="pt-0 px-4 pb-4 mt-auto flex-col gap-2">
                  {/* Free Sample button - always visible */}
                  <Link href={`/book${bookId}/unit${unit.unitNumber}`} className="w-full">
                    <Button className="w-full" variant={index === 0 || hasPurchased ? "default" : "secondary"}>
                      {hasPurchased ? 'View Content' : 'Free Sample'}
                    </Button>
                  </Link>
                  
                  {/* Buy Access button - visible if not purchased and not the first unit */}
                  {!hasPurchased && (
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => window.location.href = `/checkout/single_lesson?book=${bookId}&unit=${unit.unitNumber}`}
                    >
                      Buy Lesson
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