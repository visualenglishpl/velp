import { useEffect, useState } from "react";
import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Card } from "@/components/ui/card";
import { BookOpen as BookIcon } from "lucide-react";

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
  
  // Fetch book thumbnails when component mounts
  useEffect(() => {
    const fetchBookThumbnails = async () => {
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
                thumbnailUrl: bookWithThumb?.thumbnailUrl
              };
            });
          });
        }
      } catch (error) {
        console.error("Error fetching book thumbnails:", error);
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
      
      {/* "Try Before You Subscribe" Banner - links to existing book thumbnails */}
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
      
      {/* Visual English Series Books - Added based on screenshot */}
      <section id="books" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold">Visual English Series</h2>
            <p className="text-gray-600 mt-2">Choose a book to preview content or start your free trial</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <Card 
                key={book.id}
                className="flex flex-col items-center p-4 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => window.location.href = `/checkout/free_trial?book=${book.id}`}
              >
                <div 
                  className="w-24 h-24 rounded-md mb-3 flex items-center justify-center"
                  style={{ backgroundColor: book.color }}
                >
                  <img 
                    src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                    alt={`Book ${book.id}`}
                    className="w-20 h-20 object-contain"
                    onError={(e) => {
                      console.log(`Error loading image for book ${book.id}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>
                <h3 className="font-semibold text-center">
                  {book.id.startsWith('0') ? `Beginner Book ${book.id}` : `Book ${book.id}`}
                </h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

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