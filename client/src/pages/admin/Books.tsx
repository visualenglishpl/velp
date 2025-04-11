import { useState, useMemo, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { Book } from "@shared/schema";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Navigation } from "@/components/ui/Navigation";
import { BookOpen, BookOpenCheck, BookPlus } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const BooksPage = () => {
  const { user, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!user && !authLoading) {
      window.location.href = "/auth";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          // Books grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">
                        {book.bookId}: {book.title}
                      </CardTitle>
                      <div className="p-1.5 bg-primary/10 rounded-full">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                    </div>
                    <CardDescription>Level {book.level || "N/A"}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">
                      {book.description || "No description available"}
                    </p>
                  </CardContent>
                  <CardFooter className="pt-2">
                    <Button 
                      onClick={() => setLocation(`/admin/books/${book.id}`)}
                      className="w-full"
                    >
                      Open Book
                    </Button>
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default BooksPage;