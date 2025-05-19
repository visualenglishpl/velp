import { Button } from "../ui/button";
import { Link } from "wouter";
import BookThumbnail from "../book/BookThumbnail";
import { useLanguage } from "@/contexts/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  return (
    <div className="bg-white">
      {/* New hero section with logo, text and children image */}
      <section className="relative bg-white py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left side: Logo and text */}
            <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
              <img 
                src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                alt="Visual English Logo" 
                className="h-24 mb-3"
              />
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800 leading-tight mb-2">
                {t('home.hero.title')}
              </h1>
              <p className="text-base text-gray-600 mb-4">
                {t('home.hero.subtitle')}
              </p>
              
              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/checkout/free_trial">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 text-base font-medium rounded w-full sm:w-auto">
                    Start Learning
                  </Button>
                </Link>
                <Link href="/method">
                  <Button variant="outline" className="border border-green-500 text-green-500 bg-transparent hover:bg-green-50 px-8 py-2 text-base font-medium rounded w-full sm:w-auto">
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


    </div>
  );
};

export default HeroSection;
