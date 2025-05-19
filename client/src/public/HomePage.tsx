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
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-12 pb-8">
        <PricingPlans />
      </section>
      
      {/* Book Grid Section */}
      <section id="books" className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Books</h2>
          
          {thumbnailLoadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {thumbnailLoadError}
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {isLoadingThumbnails ? (
              // Skeleton loaders while thumbnails are loading
              Array(10).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col items-center">
                  <Skeleton className="w-40 h-48 rounded-md mb-2" />
                  <Skeleton className="w-32 h-4 rounded-md mb-1" />
                  <Skeleton className="w-20 h-4 rounded-md" />
                </div>
              ))
            ) : (
              // Render actual book cards
              books.map(book => (
                <Card 
                  key={book.id}
                  className="flex flex-col items-center p-3 hover:shadow-md transition-shadow"
                >
                  <a 
                    href={`/books/${book.id}`} 
                    className="block w-full h-full"
                    aria-label={`View ${book.title}`}
                  >
                    {book.thumbnailUrl ? (
                      <img 
                        src={book.thumbnailUrl} 
                        alt={`${book.title} thumbnail`}
                        className="w-full h-48 object-contain mb-3 rounded"
                      />
                    ) : (
                      <div 
                        className="w-full h-48 flex items-center justify-center mb-3 rounded"
                        style={{ backgroundColor: book.color }}
                      >
                        <BookIcon size={48} className="text-white" />
                      </div>
                    )}
                    <h3 className="font-medium text-center">{book.title}</h3>
                    <p className="text-sm text-gray-500 text-center">View Book</p>
                  </a>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
      
      {/* "Try Before You Subscribe" Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center p-8">
              <div className="flex-1 pr-0 md:pr-8 mb-6 md:mb-0">
                <h2 className="text-3xl font-bold mb-3">Try Before You Subscribe</h2>
                <p className="text-gray-600 mb-6">
                  Explore our teaching materials with free preview access.
                  Browse any book's content and see the first 15 slides
                  from each unit.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a 
                    href="#books" 
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <span className="mr-2">▶</span> View Book Previews
                  </a>
                  <a 
                    href="/checkout/free_trial" 
                    className="inline-flex items-center px-6 py-3 border border-purple-600 text-purple-600 rounded-md hover:bg-purple-50 transition-colors"
                  >
                    Try 7-Day Free Trial
                  </a>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="relative w-64 h-40">
                  <div className="absolute top-0 left-0 w-48 h-36 bg-yellow-400 rounded-lg shadow-md transform rotate-[-5deg] z-10"></div>
                  <div className="absolute top-2 left-4 w-48 h-36 bg-purple-500 rounded-lg shadow-md transform rotate-[3deg] z-20"></div>
                  <div className="absolute top-4 left-8 w-48 h-36 bg-blue-400 rounded-lg shadow-md z-30 flex flex-col items-center justify-center">
                    <div className="text-white text-center p-4">
                      <div className="font-bold text-lg mb-1">Visual English</div>
                      <div className="text-sm">Preview Available</div>
                      <div className="mt-2 text-xs bg-white/20 rounded-full px-3 py-1">15 slides per unit</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      


      {/* FAQ and Project Sections */}
      <FAQSection />
      <EUProjectSection />
      
      {/* Hidden admin access links */}
      <div className="text-center text-xs text-gray-300 pt-8 pb-4 space-x-4">
        <a href="/direct-admin" className="hover:text-gray-500 transition-colors">
          Administration Access
        </a>
        <span className="text-gray-400">|</span>
        <a href="/emergency-admin" className="hover:text-gray-500 transition-colors">
          Emergency Admin
        </a>
      </div>
    </div>
  );
};

export default HomePage;