import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Book } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, BookOpenCheck, BookPlus, Search } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Book icon URL template
const S3_ICON_BASE_URL = "https://visualenglishmaterial.s3.amazonaws.com/icons/";

// Function to get different button colors based on book ID
const getBookButtonColor = (bookId: string): string => {
  // Extract the first character of the bookId to determine color
  const firstChar = bookId.charAt(0).toLowerCase();
  
  // Color palette - colorful buttons for different books
  const colors = {
    '0': '#9333ea', // purple
    '1': '#2563eb', // blue
    '2': '#059669', // green
    '3': '#d97706', // amber
    '4': '#dc2626', // red
    '5': '#0891b2', // cyan
    '6': '#4f46e5', // indigo
    '7': '#be123c', // rose
    '8': '#a16207', // yellow
    '9': '#7c3aed', // violet
  };
  
  // Return a color based on the first character, or default to navy blue
  return colors[firstChar as keyof typeof colors] || '#172554'; // default navy blue
};

const BooksPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        console.log("User not authenticated, redirecting to auth page");
        window.location.replace("/auth");
      } else if (user.role !== "admin" && user.role !== "teacher") {
        console.log("User not authorized for books page, redirecting to homepage");
        window.location.replace("/");
      }
    }
  }, [user, authLoading]);

  // Fetch books from API
  const { data: books, isLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
    enabled: !!user,
  });

  // Filter and sort books based on search query
  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books
      .filter((book) => {
        if (!searchQuery.trim()) return true;
        
        const query = searchQuery.toLowerCase();
        return (
          book.title.toLowerCase().includes(query) || 
          book.bookId.toLowerCase().includes(query) ||
          (book.description && book.description.toLowerCase().includes(query))
        );
      })
      .sort((a, b) => {
        // Sort books by bookId with special handling for 0A, 0B, 0C format
        const aId = a.bookId;
        const bId = b.bookId;

        // Extract number and letter part if in format like "0A"
        const aMatch = aId.match(/^(\d+)([A-Za-z])?/);
        const bMatch = bId.match(/^(\d+)([A-Za-z])?/);

        if (aMatch && bMatch) {
          const aNum = parseInt(aMatch[1]);
          const bNum = parseInt(bMatch[1]);

          // Compare numbers first
          if (aNum !== bNum) {
            return aNum - bNum;
          }
          
          // If numbers are the same, compare letter parts
          const aLetter = aMatch[2] || '';
          const bLetter = bMatch[2] || '';
          return aLetter.localeCompare(bLetter);
        }

        // Fallback to regular string comparison
        return aId.localeCompare(bId);
      });
  }, [books, searchQuery]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Visual banner with GIF */}
      <div className="bg-white shadow-sm px-4 py-3 mb-4">
        <div className="container mx-auto">
          {/* GIF Banner */}
          <div className="flex justify-center mb-4">
            <img 
              src={`${S3_ICON_BASE_URL}VISUAL 1.gif`} 
              alt="Visual English Animation" 
              className="max-h-60 object-contain rounded-lg shadow-sm"
            />
          </div>
          
          {/* Search and controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-xl font-bold">Books</h1>
            </div>
            <div className="w-full sm:w-auto flex">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search books..." 
                  className="pl-9"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
              </div>
              {user?.role === "admin" && (
                <Button 
                  onClick={() => setLocation("/admin/books/create")}
                  className="ml-2 bg-blue-600 hover:bg-blue-700"
                >
                  <BookPlus className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Create Book</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-4">

        {isLoading ? (
          // Loading state
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="flex flex-col overflow-hidden bg-white shadow">
                <div className="p-3 text-center border-b">
                  <Skeleton className="h-6 w-3/4 mx-auto" />
                </div>
                <div className="flex-1 p-6 flex items-center justify-center">
                  <Skeleton className="h-32 w-32 rounded-md" />
                </div>
                <div className="p-2">
                  <Skeleton className="h-10 w-full rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Books grid with 5 columns on larger screens to match the design
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {filteredBooks.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <BookOpenCheck className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No books found</h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery ? "Try adjusting your search query" : "No books have been added yet"}
                </p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <div key={book.id} className="flex flex-col overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
                  <div className="p-3 text-center border-b">
                    <h3 className="font-semibold">{book.title}</h3>
                  </div>
                  <div className="flex-1 p-6 flex items-center justify-center">
                    <div className="relative h-32 w-32 bg-gray-50 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-gray-300" style={{ position: 'absolute', opacity: 0.5 }} />
                      <img 
                        src={`${S3_ICON_BASE_URL}book_${book.bookId.toLowerCase().replace(/\s/g, '')}.png`} 
                        alt={book.title}
                        className="max-h-full max-w-full object-contain relative z-10"
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <Button 
                      onClick={() => setLocation(`/admin/books/${book.id}`)}
                      className="w-full py-2 text-white hover:bg-opacity-90"
                      style={{ 
                        /* Apply different colors based on book ID to make them colorful */
                        backgroundColor: getBookButtonColor(book.bookId)
                      }} 
                    >
                      View Book <span className="ml-1">→</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksPage;