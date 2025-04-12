import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { Book, Unit } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, 
  ChevronLeft, 
  Edit, 
  Download, 
  Plus, 
  Layers, 
  File, 
  Pencil,
  Terminal
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Type definition for the book thumbnail
type BookThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
};

// Function to get different button colors based on unit number 
const getButtonColor = (unitNumber: number): string => {
  // Use modulo to cycle through colors
  const colorIndex = unitNumber % 10;
  
  // Color palette - colorful buttons for different units
  const colors = {
    0: '#2563eb', // blue
    1: '#059669', // green
    2: '#d97706', // amber
    3: '#dc2626', // red
    4: '#0891b2', // cyan
    5: '#4f46e5', // indigo
    6: '#be123c', // rose
    7: '#a16207', // yellow
    8: '#7c3aed', // violet
    9: '#9333ea', // purple
  };
  
  return colors[colorIndex as keyof typeof colors] || '#172554'; // default navy blue
};

const BookDetailPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [, params] = useRoute("/admin/books/:id");
  const bookId = params?.id ? parseInt(params.id) : null;

  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        console.log("User not authenticated, redirecting to auth page");
        window.location.replace("/auth");
      } else if (user.role !== "admin" && user.role !== "teacher") {
        console.log("User not authorized for book details page, redirecting to homepage");
        window.location.replace("/");
      }
    }
  }, [user, authLoading]);

  // Fetch book details
  const { data: book, isLoading: isLoadingBook } = useQuery<Book>({
    queryKey: [`/api/books/${bookId}`],
    enabled: !!bookId && !!user,
  });

  // Fetch units for this book
  const { 
    data: units, 
    isLoading: isLoadingUnits,
    error: unitsError 
  } = useQuery<Unit[]>({
    queryKey: [`/api/books/${bookId}/units`],
    enabled: !!bookId && !!user,
  });
  
  // Log units data for debugging
  useEffect(() => {
    if (units) {
      console.log("Units data:", units);
    }
    if (unitsError) {
      console.error("Error fetching units:", unitsError);
    }
  }, [units, unitsError]);
  
  // Fetch thumbnails with presigned URLs
  const { data: thumbnails, isLoading: isThumbnailsLoading } = useQuery<BookThumbnail[]>({
    queryKey: ["/api/assets/book-thumbnails"],
    enabled: !!user,
  });

  // Determine if user can edit (admin only)
  const canEdit = user?.role === "admin";

  if (!bookId) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Invalid Book ID</h2>
          <p className="text-gray-600 mb-4">The requested book could not be found.</p>
          <Button onClick={() => setLocation("/admin/books")}>Back to Books</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Visual banner with GIF */}
      <div className="bg-white shadow-sm px-4 py-3 mb-4">
        <div className="container mx-auto">
          {/* GIF Banner */}
          <div className="flex justify-center mb-4">
            {book && thumbnails ? (
              <div className="relative">
                {/* Find the matching thumbnail with presigned URL */}
                {(() => {
                  const thumbnail = thumbnails.find(t => t.bookId === book.bookId);
                  
                  if (thumbnail) {
                    return (
                      <img 
                        src={thumbnail.gifUrl} 
                        alt={`Visual English Animation for Book ${book.bookId}`}
                        className="max-h-60 object-contain rounded-lg shadow-sm"
                        onError={(e) => {
                          console.log(`Failed to load GIF banner for book ${book.bookId}`);
                          // Add a subtle border to indicate a fallback is being used
                          (e.target as HTMLImageElement).style.border = "1px dashed #e5e7eb";
                        }}
                      />
                    );
                  } else {
                    // If thumbnail is not found, display a skeleton loader
                    return (
                      <div className="w-96 h-60 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
                        <BookOpen className="h-16 w-16 text-gray-300" />
                      </div>
                    );
                  }
                })()}
              </div>
            ) : (
              // Loading state
              <div className="w-96 h-60 bg-gray-100 animate-pulse rounded-lg flex items-center justify-center">
                <BookOpen className="h-16 w-16 text-gray-300" />
              </div>
            )}
          </div>
          
          {/* Book title header */}
          <div className="flex justify-center mt-4">
            <h1 className="text-xl font-bold">{book ? `Visual English Book ${book.bookId}` : 'Book Details'}</h1>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">
        {/* Back button and top actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <Button
            variant="outline"
            onClick={() => setLocation("/admin/books")}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Books
          </Button>
          
          {canEdit && book && (
            <div className="flex gap-2">
              <Button 
                variant="outline"
                onClick={() => setLocation(`/admin/books/${bookId}/edit`)}
                className="flex items-center gap-2"
              >
                <Edit className="h-4 w-4" />
                Edit Book
              </Button>
              
              <Button
                onClick={() => setLocation(`/admin/books/${bookId}/units/create`)}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                Add Unit
              </Button>
            </div>
          )}
        </div>

        {/* Book details section */}
        {isLoadingBook ? (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <Skeleton className="h-8 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full mb-2" />
              <div className="flex gap-4 mt-4">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ) : book ? (
          <Card className="mb-8">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {book.bookId}: {book.title}
                  </CardTitle>
                  <CardDescription>Level {book.level || "N/A"}</CardDescription>
                </div>
                <div className="p-2 bg-primary/10 rounded-full">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-gray-600">
                    {book.description || "No description available for this book."}
                  </p>
                  
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Book ID</h4>
                      <p className="text-gray-900">{book.bookId}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Level</h4>
                      <p className="text-gray-900">{book.level || "Not specified"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Created</h4>
                      <p className="text-gray-900">
                        {new Date(book.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                      <p className="text-gray-900">
                        {book.updatedAt ? new Date(book.updatedAt).toLocaleDateString() : "Never"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col">
                  <h3 className="text-lg font-semibold mb-2">Resources</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {book.thumbnail && (
                      <Card className="bg-gray-50 border-gray-200">
                        <CardContent className="p-4 flex items-center gap-3">
                          <File className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-sm">Book Cover</p>
                            <p className="text-xs text-gray-500">View thumbnail</p>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                    
                    <Card className="bg-gray-50 border-gray-200">
                      <CardContent className="p-4 flex items-center gap-3">
                        <Terminal className="h-5 w-5 text-purple-500" />
                        <div>
                          <p className="font-medium text-sm">API Access</p>
                          <p className="text-xs text-gray-500">Developer options</p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold mb-2">Book Not Found</h2>
            <p className="text-gray-600 mb-4">The requested book could not be found.</p>
            <Button onClick={() => setLocation("/admin/books")}>Back to Books</Button>
          </div>
        )}

        {/* Units section */}
        <div className="mb-4 flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Units
          </h2>
          
          {canEdit && book && (
            <Button
              onClick={() => setLocation(`/admin/books/${bookId}/units/create`)}
              size="sm"
              className="flex items-center gap-1"
            >
              <Plus className="h-4 w-4" />
              Add Unit
            </Button>
          )}
        </div>

        {isLoadingUnits ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {[...Array(10)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                {/* Thumbnail skeleton */}
                <div className="aspect-[4/3] w-full bg-gray-100">
                  <Skeleton className="h-full w-full" />
                </div>
                
                <CardHeader className="pb-1 pt-3">
                  <Skeleton className="h-5 w-3/4 mb-1" />
                </CardHeader>
                <CardContent className="pb-3 pt-0">
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
                <CardFooter className="pt-0">
                  <Skeleton className="h-8 w-24" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {units.map((unit: any) => (
              <Card key={unit.id} className="hover:shadow-md transition-shadow overflow-hidden group">
                {/* Unit thumbnail */}
                <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                  {unit.thumbnailUrl ? (
                    <img 
                      src={unit.thumbnailUrl} 
                      alt={`Thumbnail for Unit ${unit.unitNumber}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        console.log(`Failed to load thumbnail for unit ${unit.unitNumber}`);
                        (e.target as HTMLImageElement).style.display = "none";
                        // Show the icon when image fails
                        const parent = (e.target as HTMLImageElement).parentElement;
                        if (parent) {
                          const icon = document.createElement('div');
                          icon.className = "flex items-center justify-center h-full";
                          icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>';
                          parent.appendChild(icon);
                        }
                      }}
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <BookOpen className="h-12 w-12 text-gray-300" />
                    </div>
                  )}
                  
                  {/* Unit number overlay */}
                  <div className="absolute top-2 left-2 bg-white/90 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                    {unit.unitNumber}
                  </div>
                  
                  {/* Small padlock icon in corner */}
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-sm">
                    {unit.isPublished ? (
                      <div className="text-green-500">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                      </div>
                    ) : (
                      <div className="text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                          <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                <CardHeader className="pb-1 pt-3">
                  <CardTitle className="text-base flex flex-col">
                    <span className="font-bold">UNIT {unit.unitNumber}</span>
                    <span className="uppercase">{unit.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-3 pt-0">
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {unit.description || "No description available."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between pt-0">
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      onClick={() => {
                        // For students, go directly to Material Viewer
                        // For admins/teachers, go to unit details
                        if (user?.role === "student") {
                          setLocation(`/units/${unit.id}/materials/0`);
                        } else {
                          setLocation(`/admin/units/${unit.id}`);
                        }
                      }}
                      className="text-white hover:bg-opacity-90"
                      style={{ 
                        // Apply different color based on unit number for visual variety
                        backgroundColor: getButtonColor(unit.unitNumber)
                      }}
                    >
                      {user?.role === "student" ? "Start Lesson" : "View Unit"}
                    </Button>
                    
                    <Button 
                      size="sm"
                      variant="outline"
                      onClick={() => setLocation(`/units/${unit.id}/materials/0`)}
                      title="Open in Material Viewer"
                    >
                      <Layers className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setLocation(`/admin/units/${unit.id}/edit`)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : book ? (
          // If book exists but no units were found from the API, render placeholders for units
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {(() => {
              // Determine number of units to display based on book ID
              let unitCount = 0;
              if (book.bookId.startsWith('0')) {
                unitCount = 20; // Books 0a, 0b, 0c have 20 units
              } else {
                const bookNum = parseInt(book.bookId);
                if (bookNum >= 1 && bookNum <= 3) {
                  unitCount = 18; // Books 1-3 have 18 units
                } else if (bookNum >= 4 && bookNum <= 7) {
                  unitCount = 16; // Books 4-7 have 16 units
                }
              }
              
              // Create array of placeholder units
              return Array.from({ length: unitCount }, (_, i) => {
                const unitNumber = i + 1;
                return (
                  <Card key={`unit-${unitNumber}`} className="hover:shadow-md transition-shadow overflow-hidden group">
                    {/* Placeholder thumbnail */}
                    <div className="aspect-[4/3] w-full bg-gray-100 relative overflow-hidden">
                      <div className="flex items-center justify-center h-full">
                        <BookOpen className="h-12 w-12 text-gray-300" />
                      </div>
                      
                      {/* Unit number overlay */}
                      <div className="absolute top-2 left-2 bg-white/90 text-primary font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-sm">
                        {unitNumber}
                      </div>
                      
                      {/* Lock icon */}
                      <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-sm">
                        <div className="text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                    
                    <CardHeader className="pb-1 pt-3">
                      <CardTitle className="text-base flex flex-col">
                        <span className="font-bold">UNIT {unitNumber}</span>
                        <span>PLACEHOLDER</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <p className="text-xs text-gray-600 line-clamp-2">
                        No description available.
                      </p>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-0">
                      <Button 
                        size="sm"
                        onClick={() => {
                          // If admin, show a toast with option to create unit
                          if (canEdit) {
                            toast({
                              title: "Unit Not Available",
                              description: `Unit ${unitNumber} needs to be created first. Would you like to create it now?`,
                              action: (
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => setLocation(`/admin/books/${bookId}/units/create`)}
                                >
                                  Create Unit
                                </Button>
                              )
                            });
                          } else {
                            toast({
                              title: "Unit Not Available",
                              description: "This unit hasn't been created yet. Please contact an administrator.",
                              variant: "destructive"
                            });
                          }
                        }}
                        className="text-white hover:bg-opacity-90"
                        style={{ backgroundColor: getButtonColor(unitNumber) }}
                      >
                        {user?.role === "student" ? "Start Lesson" : "View Unit"}
                      </Button>
                      
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setLocation(`/admin/books/${bookId}/units/create`)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              });
            })()}
          </div>
        ) : (
          <Card className="bg-gray-50 border-dashed border-2 border-gray-200">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Layers className="h-12 w-12 text-gray-300 mb-3" />
              <h3 className="text-lg font-medium text-gray-700 mb-1">No Units Found</h3>
              <p className="text-gray-500 mb-4 max-w-md">
                This book doesn't have any units yet. Units are collections of learning materials.
              </p>
              {canEdit && (
                <Button 
                  onClick={() => setLocation(`/admin/books/${bookId}/units/create`)}
                  className="flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add First Unit
                </Button>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
};

export default BookDetailPage;