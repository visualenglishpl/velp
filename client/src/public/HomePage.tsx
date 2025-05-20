import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Card } from "@/components/ui/card";
import { BookOpen as BookIcon, Loader2 } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const HomePage = () => {
  interface Book {
    id: string;
    title: string;
    color: string;
    thumbnailUrl?: string;
  }
  
  const [books, setBooks] = useState<Book[]>([
    { id: "0a", title: "Book 0a (Beginners)", color: "#FF40FF" },
    { id: "0b", title: "Book 0b (Beginners)", color: "#FF7F27" },
    { id: "0c", title: "Book 0c (Beginners)", color: "#00CEDD" },
    { id: "1", title: "Book 1", color: "#FFFF00" },
    { id: "2", title: "Book 2", color: "#9966CC" },
    { id: "3", title: "Book 3", color: "#00CC00" },
    { id: "4", title: "Book 4", color: "#5DADEC" },
    { id: "5", title: "Book 5", color: "#00CC66" },
    { id: "6", title: "Book 6", color: "#FF0000" },
    { id: "7", title: "Book 7", color: "#00FF00" },
  ]);
  
  const [isLoadingThumbnails, setIsLoadingThumbnails] = useState(true);
  const [thumbnailLoadError, setThumbnailLoadError] = useState<string | null>(null);
  
  // Fetch book thumbnails when component mounts
  useEffect(() => {
    const fetchBookThumbnails = async () => {
      setIsLoadingThumbnails(true);
      setThumbnailLoadError(null);
      
      try {
        const response = await fetch('/api/assets/book-thumbnails');
        if (response.ok) {
          const data = await response.json();
          // Update books with thumbnails from API
          setBooks(prevBooks => {
            return prevBooks.map(book => {
              const bookWithThumb = data.find((b: any) => b.bookId === book.id);
              return {
                ...book,
                thumbnailUrl: bookWithThumb?.gifUrl || bookWithThumb?.thumbnailUrl
              };
            });
          });
        } else {
          setThumbnailLoadError(`Error loading thumbnails: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching book thumbnails:", error);
        setThumbnailLoadError("Failed to load book thumbnails. Please try again later.");
      } finally {
        setIsLoadingThumbnails(false);
      }
    };
    
    fetchBookThumbnails();
  }, []);
  
  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Visual English Series Section */}
      <section id="books" className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Visual English Series</h2>
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Explore our comprehensive English learning materials organized by level. Each book contains interactive lessons with visual content.
          </p>
          
          {thumbnailLoadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
              {thumbnailLoadError}
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
            {isLoadingThumbnails ? (
              // Simplified skeleton loaders
              Array(10).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col items-center">
                  <Skeleton className="w-full aspect-square rounded-lg mb-2" />
                  <Skeleton className="w-3/4 h-4 rounded-md mb-1" />
                  <Skeleton className="w-full h-8 rounded-full" />
                </div>
              ))
            ) : (
              // Simplified book cards
              books.map(book => (
                <a 
                  key={book.id} 
                  href={`/books/${book.id}`}
                  className="flex flex-col items-center group hover:transform hover:scale-105 transition-all duration-300"
                >
                  <div 
                    className="w-full aspect-square rounded-lg mb-2 flex items-center justify-center overflow-hidden shadow-sm group-hover:shadow-md"
                    style={{ backgroundColor: book.color }}
                  >
                    {book.thumbnailUrl ? (
                      <img 
                        src={book.thumbnailUrl} 
                        alt={`Visual English Book ${book.id}`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="text-white text-center p-4">
                        <BookIcon size={36} className="mx-auto mb-2" />
                        <div className="font-bold text-lg">BOOK {book.id}</div>
                      </div>
                    )}
                  </div>
                  <div className="text-center font-medium text-sm mb-1">
                    VISUAL ENGLISH BOOK {book.id}
                  </div>
                  <div 
                    className="text-center py-1.5 px-4 w-full rounded-full text-sm font-medium"
                    style={{ backgroundColor: book.color, color: 'white' }}
                  >
                    View Book
                  </div>
                </a>
              ))
            )}
          </div>
          
          <div className="mt-8">
            {/* Navigation button focused on subscription options only */}
            <div className="text-center">
              <a 
                href="#pricing" 
                className="inline-flex items-center justify-center bg-[#5DADEC] text-white px-8 py-3 rounded-full font-medium shadow-sm hover:bg-[#4A9AD9] transition-colors"
              >
                View Subscription Options
              </a>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section - Reduced spacing */}
      <section id="pricing" className="mt-2 pb-8">
        <PricingPlans />
      </section>
      
      {/* Simple Divider */}
      <div className="py-8 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="border-t border-gray-200"></div>
        </div>
      </div>
      
      {/* FAQ and Project Sections */}
      <FAQSection />
      <EUProjectSection />
      
      {/* Footer spacer */}
      <div className="py-8"></div>
    </div>
  );
};

export default HomePage;