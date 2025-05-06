import { Button } from "../ui/button";
import { Link } from "wouter";
import { testFunction } from "../../data/app-test";

// Log test information to verify application loading
console.log('HeroSection loaded');
console.log(testFunction());

const HeroSection = () => {
  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top section with Visual English logo */}
        <div className="text-center mb-6">
          <div className="flex justify-center mb-2">
            <img 
              src="/api/asset/icons/LOGO%20VISUAL%20ENGLISH.png" 
              alt="Visual English Logo"
              className="h-16 md:h-20" 
            />
          </div>
          <p className="text-sm text-gray-600">Instant Conversation Lessons</p>
        </div>
        {/* Main hero section with side-by-side layout */}
        <div className="flex flex-col md:flex-row items-center gap-8 mb-8">
          {/* Left text content */}
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              <span className="block">VISUAL</span>
              <span className="block">ENGLISH</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-6">
              A distinctive and engaging English learning method tailored for young ESL learners.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/checkout/free_trial">
                <Button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2">
                  Try a Free Sample
                </Button>
              </Link>
              <Link href="/books">
                <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-50 px-6 py-2">
                  View Our Books
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Right side image */}
          <div className="md:w-1/2 mt-6 md:mt-0 flex justify-center">
            <img 
              src="/api/content/VISUAL%20WEBSITE/main%20page.png" 
              alt="Visual English Learning"
              className="max-w-full h-auto rounded-lg shadow-md" 
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/api/asset/icons/LOGO%20VISUAL%20ENGLISH.png";
                target.className = "max-w-xs h-auto mx-auto";
              }}
            />
          </div>
        </div>
        
        {/* Tagline */}
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-semibold text-gray-800">
            Revolutionizing Language Learning for Young Minds
          </h2>
        </div>
        
        {/* Book series section */}
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Our Book Series</h2>
        
        {/* Special books (0a, 0b, 0c) */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {['0a', '0b', '0c'].map((bookId) => (
            <Link key={bookId} href={`/books/${bookId}`}>
              <div className="bg-gray-100 p-3 rounded-lg hover:shadow-md transition-all cursor-pointer text-center">
                <img 
                  src={`/api/content/book${bookId}/cover.png`} 
                  alt={`Book ${bookId}`} 
                  className="w-full h-auto rounded-md" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/api/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
                  }}
                />
                <div className="mt-2 text-sm font-medium">BOOK {bookId.toUpperCase()}</div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Regular numbered books */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4 mb-10">
          {['1', '2', '3', '4', '5', '6', '7'].map((bookId) => (
            <Link key={bookId} href={`/books/${bookId}`}>
              <div className="bg-gray-100 p-3 rounded-lg hover:shadow-md transition-all cursor-pointer text-center">
                <img 
                  src={`/api/content/book${bookId}/cover.png`} 
                  alt={`Book ${bookId}`} 
                  className="w-full h-auto rounded-md" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `/api/content/book${bookId}/icons/thumbnailsuni${bookId}-1.png`;
                  }}
                />
                <div className="mt-2 text-sm font-medium">BOOK {bookId}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
