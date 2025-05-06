import { Button } from "../ui/button";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* Hero banner section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left text content */}
            <div className="md:w-1/2">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
                <span className="block">Visual English</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fun, visual-based English learning for young ESL learners.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/checkout/free_trial">
                  <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 text-base">
                    ✅ Try a Free Sample
                  </Button>
                </Link>
                <Link href="/books">
                  <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 px-6 py-3 text-base">
                    📘 Explore the Program
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/api/content/VISUAL%20WEBSITE/main%20page.png" 
                alt="Child using Visual English"
                className="w-full h-auto rounded-lg shadow-lg" 
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/api/asset/icons/LOGO%20VISUAL%20ENGLISH.png";
                  target.className = "max-w-xs h-auto mx-auto";
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why it works section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Why Visual English Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <CheckCircle2 className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Visual-first learning</h3>
              <p className="text-gray-600">
                Images and visual cues help children remember vocabulary and language structures more effectively.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <MessageCircle className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real conversation practice</h3>
              <p className="text-gray-600">
                Practical dialogue scenarios prepare students for real-world language use from day one.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <Brain className="h-8 w-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Perfect for ages 5–12</h3>
              <p className="text-gray-600">
                Tailored for young learners with age-appropriate content that keeps them engaged and excited.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Book series section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Our Book Series</h2>
          
          <div className="text-center mb-10">
            <img 
              src="/api/content/VISUAL%20WEBSITE/book-animation.gif" 
              alt="Visual English Book Series"
              className="max-w-full mx-auto rounded-lg shadow-md" 
              onError={(e) => {
                // If GIF fails to load, show the grid of books instead
                const container = document.getElementById('book-grid');
                if (container) container.classList.remove('hidden');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          
          {/* Fallback grid of books (hidden by default) */}
          <div id="book-grid" className="hidden">
            {/* Special books row */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {['0a', '0b', '0c'].map((bookId) => (
                <Link key={bookId} href={`/books/${bookId}`}>
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-all cursor-pointer text-center">
                    <img 
                      src={`/api/content/book${bookId}/cover.png`} 
                      alt={`Book ${bookId}`} 
                      className="w-full h-auto rounded-md" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
                      }}
                    />
                    <div className="mt-3 font-medium">BOOK {bookId.toUpperCase()}</div>
                  </div>
                </Link>
              ))}
            </div>
            
            {/* Regular numbered books */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {['1', '2', '3', '4', '5', '6', '7'].map((bookId) => (
                <Link key={bookId} href={`/books/${bookId}`}>
                  <div className="bg-white p-4 rounded-lg hover:shadow-md transition-all cursor-pointer text-center">
                    <img 
                      src={`/api/content/book${bookId}/cover.png`} 
                      alt={`Book ${bookId}`} 
                      className="w-full h-auto rounded-md" 
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = `/api/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
                      }}
                    />
                    <div className="mt-3 font-medium">BOOK {bookId}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="text-center mt-8">
            <Link href="/books">
              <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2">
                View All Books
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
