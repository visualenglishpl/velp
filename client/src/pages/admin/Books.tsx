import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Book } from "@shared/schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, BookOpenCheck, BookPlus, Search, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Type definition for the book thumbnail
type BookThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
};

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
  const { user, logoutMutation, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        console.log("User not authenticated, redirecting to auth page");
        navigate("/auth");
      } else if (user.role !== "admin" && user.role !== "teacher") {
        console.log("User not authorized for books page, redirecting to homepage");
        navigate("/");
      }
    }
  }, [user, authLoading, navigate]);

  // Fetch books from API
  const { data: books, isLoading: isBooksLoading } = useQuery<Book[]>({
    queryKey: ["/api/books"],
    enabled: !!user,
  });
  
  // Fetch thumbnails with presigned URLs
  const { data: thumbnails, isLoading: isThumbnailsLoading } = useQuery<BookThumbnail[]>({
    queryKey: ["/api/assets/book-thumbnails"],
    enabled: !!user,
  });
  
  // Combined loading state
  const isLoading = isBooksLoading || isThumbnailsLoading;

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
      
      {/* Search and controls */}
      <div className="flex items-center justify-center gap-4 max-w-xl mx-auto mb-8 px-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search books..." 
            className="pl-9 py-2 text-base rounded-md border-gray-200"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
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
                    <div className="relative h-40 w-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                      <BookOpen className="h-16 w-16 text-gray-300" style={{ position: 'absolute', opacity: 0.5 }} />
                      <img 
                        src={thumbnails?.find(t => t.bookId === book.bookId)?.gifUrl || ''}
                        alt={book.title}
                        className="max-h-full max-w-full object-contain relative z-10"
                        onError={(e) => {
                          console.log(`Failed to load GIF thumbnail for book ${book.bookId}`);
                          // Keep the BookOpen icon visible by not changing opacity when image fails
                          const bookIcon = e.currentTarget.previousElementSibling;
                          if (bookIcon) {
                            (bookIcon as HTMLElement).style.opacity = "1";
                          }
                          // Hide the broken image
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                  <div className="p-2">
                    <Button 
                      onClick={() => navigate(`/admin/books/${book.id}`)}
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