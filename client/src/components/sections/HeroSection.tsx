import { Button } from "../ui/button";
import { Link } from "wouter";
import BookThumbnail from "../book/BookThumbnail";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      {/* Enhanced hero section with better spacing and visual hierarchy */}
      <section className="relative bg-white py-6 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left side: Content with improved typography */}
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <div className="mb-6">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                  alt="Visual English Logo" 
                  className="h-20 mb-5"
                />
                <h1 className="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-4">
                  Interactive English Learning
                </h1>
                <p className="text-lg text-gray-600 mb-6 max-w-md">
                  For a visual generation
                </p>
              </div>
              
              {/* Buttons with improved styling */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/checkout/free_trial">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 text-base font-medium rounded-md shadow-sm hover:shadow w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
                <a href="https://www.youtube.com/@visualenglishbooks" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="border-2 border-green-500 text-green-600 bg-transparent hover:bg-green-50 px-6 py-2.5 text-base font-medium rounded-md w-full sm:w-auto">
                    View Our Books
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Right side: Featured image with subtle shadow */}
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/main page.png" 
                alt="Visual English Learning" 
                className="max-w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default HeroSection;
