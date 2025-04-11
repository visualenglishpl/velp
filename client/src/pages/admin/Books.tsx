import { useState, useMemo, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Book } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/ui/Navigation";
import { BookOpen, BookOpenCheck, BookPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Book icon URL template
const S3_ICON_BASE_URL = "https://visualenglishmaterial.s3.amazonaws.com/icons/";

// Add this to your tailwind.config.ts in the colors section
// For now adding as inline style

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
      <Navigation 
        allowBookChange={false}
        showUnitSelector={false}
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={(e) => setSearchQuery(e.target.value)}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Books Library</h1>
          {user?.role === "admin" && (
            <Button 
              onClick={() => setLocation("/admin/books/create")}
              className="flex items-center gap-2"
            >
              <BookPlus className="h-4 w-4" />
              Create New Book
            </Button>
          )}
        </div>

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
                      style={{ backgroundColor: '#172554' }} // navy blue color
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