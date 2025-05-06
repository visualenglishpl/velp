import { Button } from "../ui/button";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* Hero banner section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left text content */}
            <div className="md:w-1/2">
              <div className="mb-2">
                <div className="inline-block bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text text-sm font-medium py-1 px-3 rounded-full">
                  Interactive Language Learning
                </div>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-6">
                <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">Visual English</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Fun, visual-based English learning designed specifically for young ESL learners ages 5-12.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/checkout/free_trial">
                  <Button className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-bold rounded-lg shadow-lg transform transition-all duration-200 hover:scale-105 border-2 border-red-400">
                    ✅ Try a Free Sample
                  </Button>
                </Link>
                <Link href="/books">
                  <Button variant="outline" className="border-4 border-green-600 bg-white text-green-600 hover:bg-green-50 px-8 py-4 text-lg font-bold rounded-lg transform transition-all duration-200 hover:scale-105 shadow-md">
                    📘 Explore Books
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side image */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl blur opacity-20"></div>
                <img 
                  src="/api/content/VISUAL%20WEBSITE/new_hero_logo.png" 
                  alt="Visual English Logo"
                  className="relative w-full h-auto rounded-xl shadow-xl transform transition-all duration-500 hover:scale-105" 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/api/asset/icons/LOGO%20VISUAL%20ENGLISH.png";
                    target.className = "max-w-xs h-auto mx-auto";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why it works section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 via-indigo-50 to-violet-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">Why Visual English Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gradient-to-br from-white to-blue-50 rounded-xl p-8 text-center shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-blue-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-full mb-6 shadow-md">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-indigo-700">Visual-first learning</h3>
              <p className="text-gray-600">
                Images and visual cues help children remember vocabulary and language structures more effectively.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-gradient-to-br from-white to-pink-50 rounded-xl p-8 text-center shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-pink-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-400 rounded-full mb-6 shadow-md">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-rose-600">Real conversation practice</h3>
              <p className="text-gray-600">
                Practical dialogue scenarios prepare students for real-world language use from day one.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-gradient-to-br from-white to-purple-50 rounded-xl p-8 text-center shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg border border-purple-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full mb-6 shadow-md">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-violet-700">Perfect for ages 5–12</h3>
              <p className="text-gray-600">
                Tailored for young learners with age-appropriate content that keeps them engaged and excited.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Book series section */}
      <section className="py-16 bg-gradient-to-b from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Our Book Series</h2>
          
          {/* Grid of colorful books */}
          <div id="book-grid" className="mb-12">
            {/* First row - Special books (0a, 0b, 0c) and books 1-2 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {/* Book 0a - To The Moon (Blue) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-blue-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book0a/cover.png" 
                    alt="Book 0A - To The Moon" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book0a/icons/thumbnailsuni0a-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-blue-800">VISUAL ENGLISH</h3>
                    <p className="text-blue-700 font-medium">BOOK 0A</p>
                    <Link href="/books/0a">
                      <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-red-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-blue-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 0b - Barn In The Farm (Orange) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-orange-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book0b/cover.png" 
                    alt="Book 0B - Barn In The Farm" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book0b/icons/thumbnailsuni0b-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-orange-800">VISUAL ENGLISH</h3>
                    <p className="text-orange-700 font-medium">BOOK 0B</p>
                    <Link href="/books/0b">
                      <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-green-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-orange-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 0c - At The Farm (Brown) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-amber-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book0c/cover.png" 
                    alt="Book 0C - At The Farm" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book0c/icons/thumbnailsuni0c-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-amber-800">VISUAL ENGLISH</h3>
                    <p className="text-amber-700 font-medium">BOOK 0C</p>
                    <Link href="/books/0c">
                      <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-blue-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-amber-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 1 - Vegetables (Green) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-green-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book1/cover.png" 
                    alt="Book 1 - Vegetables" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book1/icons/thumbnailsuni1-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-green-800">VISUAL ENGLISH</h3>
                    <p className="text-green-700 font-medium">BOOK 1</p>
                    <Link href="/books/1">
                      <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-purple-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-green-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 2 - Sports (Light Blue) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-sky-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book2/cover.png" 
                    alt="Book 2 - Sports" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book2/icons/thumbnailsuni2-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-sky-800">VISUAL ENGLISH</h3>
                    <p className="text-sky-700 font-medium">BOOK 2</p>
                    <Link href="/books/2">
                      <button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-yellow-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-sky-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Second row - Books 3-7 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {/* Book 3 - Bugs (Lime Green) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-lime-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book3/cover.png" 
                    alt="Book 3 - Bugs" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book3/icons/thumbnailsuni3-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-lime-800">VISUAL ENGLISH</h3>
                    <p className="text-lime-700 font-medium">BOOK 3</p>
                    <Link href="/books/3">
                      <button className="mt-3 w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-red-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-lime-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 4 - At The Circus (Pink) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-pink-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book4/cover.png" 
                    alt="Book 4 - At The Circus" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book4/icons/thumbnailsuni4-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-pink-800">VISUAL ENGLISH</h3>
                    <p className="text-pink-700 font-medium">BOOK 4</p>
                    <Link href="/books/4">
                      <button className="mt-3 w-full bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-green-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-pink-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 5 - Movie Time (Red) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-red-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book5/cover.png" 
                    alt="Book 5 - Movie Time" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book5/icons/thumbnailsuni5-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-red-800">VISUAL ENGLISH</h3>
                    <p className="text-red-700 font-medium">BOOK 5</p>
                    <Link href="/books/5">
                      <button className="mt-3 w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-orange-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-red-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 6 - Fashion Accessories (Purple) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-purple-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book6/cover.png" 
                    alt="Book 6 - Fashion Accessories" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book6/icons/thumbnailsuni6-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-purple-800">VISUAL ENGLISH</h3>
                    <p className="text-purple-700 font-medium">BOOK 6</p>
                    <Link href="/books/6">
                      <button className="mt-3 w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-purple-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-purple-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 7 - Social Problems (Gray) */}
              <div className="transform transition-all duration-300 hover:scale-105">
                <div className="bg-gray-100 rounded-xl overflow-hidden shadow-md">
                  <img 
                    src="/api/content/book7/cover.png" 
                    alt="Book 7 - Social Problems" 
                    className="w-full h-auto" 
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `/api/content/book7/icons/thumbnailsuni7-1.png`;
                    }}
                  />
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-800">VISUAL ENGLISH</h3>
                    <p className="text-gray-700 font-medium">BOOK 7</p>
                    <Link href="/books/7">
                      <button className="mt-3 w-full bg-gradient-to-r from-red-500 to-yellow-500 hover:from-red-600 hover:to-yellow-600 text-white py-2 px-4 rounded-md font-bold text-sm transform transition-all duration-200 hover:scale-105 shadow-md border border-red-400">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-gray-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <Link href="/books">
              <Button className="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 hover:from-red-600 hover:via-yellow-600 hover:to-green-600 text-white px-10 py-5 text-xl font-bold rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 border-2 border-yellow-400">
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
