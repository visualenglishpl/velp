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
  Terminal,
  Search
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

// Book icon URL template
const S3_ICON_BASE_URL = "https://visualenglishmaterial.s3.amazonaws.com/icons/";

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
  const { data: units, isLoading: isLoadingUnits } = useQuery<Unit[]>({
    queryKey: [`/api/books/${bookId}/units`],
    enabled: !!bookId && !!user,
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
            {book ? (
              <img 
                src={`${S3_ICON_BASE_URL}VISUAL ${book.bookId.toLowerCase()}.gif`} 
                alt={`Visual English Animation for Book ${book.bookId}`}
                className="max-h-60 object-contain rounded-lg shadow-sm"
                onError={(e) => {
                  // Fallback to default GIF if specific one doesn't exist
                  (e.target as HTMLImageElement).src = `${S3_ICON_BASE_URL}VISUAL 1.gif`;
                }}
              />
            ) : (
              <img 
                src={`${S3_ICON_BASE_URL}VISUAL 1.gif`} 
                alt="Visual English Animation" 
                className="max-h-60 object-contain rounded-lg shadow-sm"
              />
            )}
          </div>
          
          {/* Book title header */}
          <div className="flex justify-center mt-4">
            <h1 className="text-xl font-bold">{book ? `${book.bookId}: ${book.title}` : 'Book Details'}</h1>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(3)].map((_, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-10 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-9 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : units && units.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {units.map((unit) => (
              <Card key={unit.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Unit {unit.unitNumber}</CardTitle>
                  <CardDescription>{unit.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {unit.description || "No description available."}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    size="sm"
                    onClick={() => setLocation(`/admin/units/${unit.id}`)}
                    className="text-white hover:bg-opacity-90"
                    style={{ 
                      // Apply different color based on unit number for visual variety
                      backgroundColor: getButtonColor(unit.unitNumber)
                    }}
                  >
                    View Unit
                  </Button>
                  
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