import { Button } from "../ui/button";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Brain } from "lucide-react";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* Hero banner section */}
      <section className="py-16 md:py-24 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left text content */}
            <div className="md:w-1/2 flex flex-col items-start">
              <div className="mb-8">
                <img 
                  src="/api/content/icons/LOGO%20VISUAL%20ENGLISH.png" 
                  alt="Visual English Logo" 
                  className="h-20"
                />
              </div>
              <p className="text-xl text-blue-700 mb-12">
                A distinctive and engaging English learning method tailored for young ESL learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Link href="/checkout/free_trial">
                  <Button className="bg-blue-600 hover:bg-blue-600 text-white px-6 py-4 text-lg font-bold rounded-lg w-full">
                    ✓ Try a Free Sample
                  </Button>
                </Link>
                <Link href="/books">
                  <Button variant="outline" className="border-2 border-green-500 bg-white text-green-600 hover:bg-white hover:text-green-600 px-6 py-4 text-lg font-medium rounded-lg w-full">
                    □ Explore Books
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side illustration */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/api/content/VISUAL%20WEBSITE/main%20page.png" 
                alt="Visual English Learning Illustration"
                className="w-full h-auto rounded-lg" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Why it works section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center mb-12 text-blue-600">Why Visual English Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-blue-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 shadow-md">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-extrabold mb-4 text-indigo-700">Visual-first learning</h3>
              <p className="text-gray-600">
                Images and visual cues help children remember vocabulary and language structures more effectively.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-pink-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500 rounded-full mb-6 shadow-md">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-extrabold mb-4 text-rose-600">Real conversation practice</h3>
              <p className="text-gray-600">
                Practical dialogue scenarios prepare students for real-world language use from day one.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-purple-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full mb-6 shadow-md">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-extrabold mb-4 text-violet-700">Perfect for ages 5–12</h3>
              <p className="text-gray-600">
                Tailored for young learners with age-appropriate content that keeps them engaged and excited.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Book series section */}
      <section className="py-16 bg-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-center text-blue-600 mb-10">Our Book Series</h2>
          
          {/* Grid of colorful books */}
          <div id="book-grid" className="mb-12">
            {/* First row - Special books (0a, 0b, 0c) and books 1-2 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              {/* Book 0a - To The Moon (Blue) */}
              <div className="">
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
                    <h3 className="font-extrabold text-blue-800">VISUAL ENGLISH</h3>
                    <p className="text-blue-700 font-medium">BOOK 0A</p>
                    <Link href="/books/0a">
                      <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-blue-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 0b - Barn In The Farm (Orange) */}
              <div className="">
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
                    <h3 className="font-extrabold text-orange-800">VISUAL ENGLISH</h3>
                    <p className="text-orange-700 font-medium">BOOK 0B</p>
                    <Link href="/books/0b">
                      <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-orange-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 0c - At The Farm (Brown) */}
              <div className="">
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
                    <h3 className="font-extrabold text-amber-800">VISUAL ENGLISH</h3>
                    <p className="text-amber-700 font-medium">BOOK 0C</p>
                    <Link href="/books/0c">
                      <button className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-extrabold text-sm shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-amber-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 1 - Vegetables (Green) */}
              <div className="">
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
                    <h3 className="font-extrabold text-green-800">VISUAL ENGLISH</h3>
                    <p className="text-green-700 font-medium">BOOK 1</p>
                    <Link href="/books/1">
                      <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-green-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 2 - Sports (Light Blue) */}
              <div className="">
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
                    <h3 className="font-extrabold text-sky-800">VISUAL ENGLISH</h3>
                    <p className="text-sky-700 font-medium">BOOK 2</p>
                    <Link href="/books/2">
                      <button className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded-md font-extrabold text-sm shadow-md">
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
              <div className="">
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
                    <h3 className="font-extrabold text-lime-800">VISUAL ENGLISH</h3>
                    <p className="text-lime-700 font-medium">BOOK 3</p>
                    <Link href="/books/3">
                      <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-lime-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 4 - At The Circus (Pink) */}
              <div className="">
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
                    <h3 className="font-extrabold text-pink-800">VISUAL ENGLISH</h3>
                    <p className="text-pink-700 font-medium">BOOK 4</p>
                    <Link href="/books/4">
                      <button className="mt-3 w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-pink-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 5 - Movie Time (Red) */}
              <div className="">
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
                    <h3 className="font-extrabold text-red-800">VISUAL ENGLISH</h3>
                    <p className="text-red-700 font-medium">BOOK 5</p>
                    <Link href="/books/5">
                      <button className="mt-3 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md font-extrabold text-sm shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-red-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 6 - Fashion Accessories (Purple) */}
              <div className="">
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
                    <h3 className="font-extrabold text-purple-800">VISUAL ENGLISH</h3>
                    <p className="text-purple-700 font-medium">BOOK 6</p>
                    <Link href="/books/6">
                      <button className="mt-3 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
                        View Units
                      </button>
                    </Link>
                    <p className="mt-2 text-xs text-purple-600">Buy Whole Book Access</p>
                  </div>
                </div>
              </div>
              
              {/* Book 7 - Social Problems (Gray) */}
              <div className="">
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
                    <h3 className="font-extrabold text-gray-800">VISUAL ENGLISH</h3>
                    <p className="text-gray-700 font-medium">BOOK 7</p>
                    <Link href="/books/7">
                      <button className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md font-extrabold text-sm  shadow-md">
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
              <Button className="bg-green-600 hover:bg-green-700 text-white px-10 py-5 text-xl font-extrabold rounded-lg shadow-xl">
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
