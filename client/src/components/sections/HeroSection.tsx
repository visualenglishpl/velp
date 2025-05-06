import { Button } from "../ui/button";
import { Link } from "wouter";
import { CheckCircle2, MessageCircle, Brain } from "lucide-react";
import BookThumbnail from "../book/BookThumbnail";

const HeroSection = () => {
  return (
    <div className="bg-white">
      {/* New hero section with logo, text and children image */}
      <section className="relative bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left side: Logo and text */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              <img 
                src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                alt="Visual English Logo" 
                className="h-24 mb-6"
              />
              <h1 className="text-3xl md:text-4xl font-medium text-gray-800 leading-tight mb-4">
                Visual English Children - Revolutionizing Language Learning for Young Minds
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                A unique visual approach to language learning that makes English fun and effective for children.
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/checkout/free_trial">
                  <Button className="bg-blue-600 hover:bg-blue-600 text-white px-8 py-2.5 text-base font-normal rounded-md w-full sm:w-auto">
                    Try Free Sample
                  </Button>
                </Link>
                <Link href="/method">
                  <Button variant="outline" className="border-2 border-green-500 bg-white text-green-500 hover:bg-white hover:text-green-600 px-8 py-2.5 text-base font-normal rounded-md w-full sm:w-auto">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            {/* Right side: Children image */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/main page.png" 
                alt="Visual English Children" 
                className="max-w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-width hero banner */}
      <section className="relative">
        {/* Full-width image with embedded text */}
        <div className="w-full bg-white overflow-hidden border-b border-gray-200">
          <img 
            src="/api/direct/content/VISUAL WEBSITE/clay-kids-banner-with-text.png" 
            alt="Visual English Children - Revolutionizing Language Learning for Young Minds"
            className="w-full h-auto object-cover" 
          />
        </div>
        
        {/* Buttons below the image */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center">
          <div className="flex flex-col sm:flex-row justify-center gap-6 mt-8">
            <Link href="/checkout/free_trial">
              <Button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 text-lg font-normal rounded-md shadow-sm">
                ✓ Try a Free Sample
              </Button>
            </Link>
            <Link href="/method">
              <Button variant="outline" className="border-2 border-green-500 bg-white text-green-500 hover:bg-white hover:text-green-600 px-8 py-3 text-lg font-normal rounded-md flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Explore
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why it works section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center mb-12 text-gray-800">Why Visual English Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-blue-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 rounded-full mb-6 shadow-md">
                <CheckCircle2 className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-indigo-600">Visual-first learning</h3>
              <p className="text-gray-500 font-light">
                Images and visual cues help children remember vocabulary and language structures more effectively.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-pink-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-pink-500 rounded-full mb-6 shadow-md">
                <MessageCircle className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-rose-500">Real conversation practice</h3>
              <p className="text-gray-500 font-light">
                Non-stop engaging conversation for real-world language use from day one.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 text-center shadow-md  hover:shadow-lg border border-purple-100">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-purple-500 rounded-full mb-6 shadow-md">
                <Brain className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-violet-600">Perfect for young learners</h3>
              <p className="text-gray-500 font-light">
                Tailored for young learners with age-appropriate content that keeps them engaged and excited.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Book series section */}
      <section className="py-16 bg-mint-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-medium text-center text-gray-800 mb-10">Visual English Series</h2>
          
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
            <Link href="/method">
              <Button className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 text-lg font-normal rounded-md shadow-sm flex items-center justify-center gap-2 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Explore
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
