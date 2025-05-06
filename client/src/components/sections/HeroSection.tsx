import { Button } from "../ui/button";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Brain } from "lucide-react";
import BookThumbnail from "../book/BookThumbnail";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* Hero banner section */}
      <section className="py-16 md:py-24 bg-gray-50 rounded-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left text content */}
            <div className="md:w-1/2 flex flex-col items-start">
              <div className="mb-10">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png" 
                  alt="Visual English Logo" 
                  className="h-48 max-w-full"
                />
              </div>
              <p className="text-xl text-blue-700 mb-12">
                A distinctive and engaging English learning method tailored for young ESL learners.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 w-full">
                <Link href="/checkout/free_trial" className="w-full sm:w-1/2">
                  <Button className="bg-blue-600 hover:bg-blue-600 text-white px-8 py-5 text-xl font-bold rounded-xl w-full">
                    ✓ Try a Free Sample
                  </Button>
                </Link>
                <Link href="/books" className="w-full sm:w-1/2">
                  <Button variant="outline" className="border-2 border-green-600 bg-white text-green-600 hover:bg-white hover:text-green-700 px-8 py-5 text-xl font-bold rounded-xl w-full">
                    □ View Books
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side illustration */}
            <div className="md:w-1/2 mt-8 md:mt-0">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/main page.png" 
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
          <h2 className="text-3xl font-extrabold text-center mb-12 text-black">Why Visual English Works</h2>
          
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
                Non-stop engaging conversation for real-world language use from day one.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-purple-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full mb-6 shadow-md">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-extrabold mb-4 text-violet-700">Perfect for young learners</h3>
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
          <h2 className="text-3xl font-extrabold text-center text-black mb-10">Visual English Series</h2>
          
          {/* Grid of colorful books */}
          <div id="book-grid" className="mb-12">
            {/* First row - Special books (0a, 0b, 0c) and books 1-2 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-8">
              <BookThumbnail 
                bookId="0a" 
                title="To The Moon" 
                color="blue" 
                bgColor="blue"
                buttonColor="red"
                buttonHoverColor="red"
              />
              
              <BookThumbnail 
                bookId="0b" 
                title="Barn In The Farm" 
                color="orange" 
                bgColor="orange"
                buttonColor="green"
                buttonHoverColor="green"
              />
              
              <BookThumbnail 
                bookId="0c" 
                title="At The Farm" 
                color="amber" 
                bgColor="amber"
                buttonColor="blue"
                buttonHoverColor="blue"
              />
              
              <BookThumbnail 
                bookId="1" 
                title="Vegetables" 
                color="green" 
                bgColor="green"
                buttonColor="purple"
                buttonHoverColor="purple"
              />
              
              <BookThumbnail 
                bookId="2" 
                title="Sports" 
                color="sky" 
                bgColor="sky"
                buttonColor="yellow"
                buttonHoverColor="yellow"
              />
            </div>
            
            {/* Second row - Books 3-7 */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <BookThumbnail 
                bookId="3" 
                title="Bugs" 
                color="lime" 
                bgColor="lime"
                buttonColor="red"
                buttonHoverColor="red"
              />
              
              <BookThumbnail 
                bookId="4" 
                title="At The Circus" 
                color="pink" 
                bgColor="pink"
                buttonColor="green"
                buttonHoverColor="green"
              />
              
              <BookThumbnail 
                bookId="5" 
                title="Movie Time" 
                color="red" 
                bgColor="red"
                buttonColor="orange"
                buttonHoverColor="orange"
              />
              
              <BookThumbnail 
                bookId="6" 
                title="Fashion Accessories" 
                color="purple" 
                bgColor="purple"
                buttonColor="purple"
                buttonHoverColor="purple"
              />
              
              <BookThumbnail 
                bookId="7" 
                title="Social Problems" 
                color="gray" 
                bgColor="gray"
                buttonColor="red"
                buttonHoverColor="red"
              />
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
