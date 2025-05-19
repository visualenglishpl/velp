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
          <h2 className="text-3xl font-bold mb-8 text-center">Visual English Series</h2>
          
          {thumbnailLoadError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6">
              {thumbnailLoadError}
            </div>
          )}
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
            {isLoadingThumbnails ? (
              // Skeleton loaders while thumbnails are loading
              Array(10).fill(0).map((_, index) => (
                <div key={`skeleton-${index}`} className="flex flex-col items-center">
                  <Skeleton className="w-full aspect-square rounded-md mb-2" />
                  <Skeleton className="w-full h-6 rounded-md mb-1" />
                  <Skeleton className="w-full h-10 rounded-md" />
                </div>
              ))
            ) : (
              // Render actual book cards based on the provided image
              books.map(book => (
                <div key={book.id} className="flex flex-col items-center">
                  <div 
                    className="w-full aspect-square rounded-md mb-2 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: book.color }}
                  >
                    {book.thumbnailUrl ? (
                      <img 
                        src={book.thumbnailUrl} 
                        alt={`Visual English Book ${book.id}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement?.classList.add('fallback-active');
                        }}
                      />
                    ) : (
                      <div className="text-white text-center p-4">
                        <div className="flex justify-center mb-3">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white"/>
                            <circle cx="12" cy="12" r="3.5" fill="white"/>
                          </svg>
                        </div>
                        <div className="font-bold text-sm mb-1">VISUAL</div>
                        <div className="font-bold text-sm mb-1">ENGLISH</div>
                        <div className="font-bold text-sm">BOOK {book.id}</div>
                      </div>
                    )}
                    <div className="fallback text-white text-center p-4 absolute inset-0 flex flex-col items-center justify-center opacity-0 fallback-active:opacity-100">
                      <div className="flex justify-center mb-3">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="white"/>
                          <circle cx="12" cy="12" r="3.5" fill="white"/>
                        </svg>
                      </div>
                      <div className="font-bold text-sm mb-1">VISUAL</div>
                      <div className="font-bold text-sm mb-1">ENGLISH</div>
                      <div className="font-bold text-sm">BOOK {book.id}</div>
                    </div>
                  </div>
                  <div className="text-center font-medium uppercase text-sm mb-2">
                    VISUAL ENGLISH<br />
                    BOOK {book.id}
                  </div>
                  <a 
                    href={`/books/${book.id}`} 
                    className="text-center py-1.5 px-4 w-full rounded-full text-sm font-medium"
                    style={{ backgroundColor: book.color, color: 'white' }}
                  >
                    <span className="mr-1">➜</span> View Book
                  </a>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-8">
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <a 
                href="/books" 
                className="inline-flex items-center justify-center bg-green-500 text-white px-6 py-2 rounded-full font-medium"
              >
                <span className="mr-2">⊕</span> Explore All Books
              </a>
            </div>
            
            {/* Book Subscription Buttons */}
            <div className="max-w-3xl mx-auto">
              <h3 className="text-lg font-semibold text-center mb-4">Access Options</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/checkout/book"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#b23cfd] hover:bg-[#a020f0] text-white font-medium rounded-md shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                  </svg>
                  Subscribe to Full Book
                </a>
                
                <a
                  href="/checkout/unit"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-[#2e88f6] hover:bg-blue-600 text-white font-medium rounded-md shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                    <path d="M3 6h18"/>
                    <path d="M16 10a4 4 0 0 1-8 0"/>
                  </svg>
                  Select Multiple Units
                </a>
                
                <a
                  href="/checkout/free_trial"
                  className="flex-1 inline-flex items-center justify-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md shadow-md"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M2 12h20" />
                    <path d="M12 2v20" />
                  </svg>
                  Start Free 7-Day Trial
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-12 pb-8">
        <PricingPlans />
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