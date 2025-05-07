import { Button } from "../ui/button";
import { Link } from "wouter";
import BookThumbnail from "../book/BookThumbnail";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
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
                className="h-36 mb-6"
              />
              <h1 className="text-3xl md:text-4xl font-medium text-gray-800 leading-tight mb-4">
                {t('home.hero.title')}
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                {t('home.hero.subtitle')}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/checkout/free_trial">
                  <Button className="bg-blue-600 hover:bg-blue-600 text-white px-8 py-2.5 text-base font-normal rounded-md w-full sm:w-auto">
                    {t('home.hero.cta')}
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

      {/* Divider for separation between top section and book series */}
      <div className="w-full h-0.5 bg-gray-100"></div>
      
      {/* Book series section */}
      <section id="books" className="py-16 bg-mint-50">
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
