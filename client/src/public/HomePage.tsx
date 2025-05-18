import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { BookOpen as BookIcon } from "lucide-react";
import ContentPreviewSection from "../components/sections/ContentPreviewSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-12 pb-8">
        <PricingPlans />
      </section>
      
      {/* Book Previews Section */}
      <section id="book-previews" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          {/* Preview CTA Banner - based on the image provided */}
          <div className="mb-12 bg-white rounded-lg shadow-lg overflow-hidden">
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
                    href="#book-previews" 
                    className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                  >
                    <span className="mr-2">▶</span> View Book Previews
                  </a>
                  <a 
                    href="/auth?signup=trial" 
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

          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Visual English Books</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our comprehensive collection of Visual English books designed for all learning levels.
              Each book offers a preview of its content with the first 15 slides available to explore.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {/* Book 0a */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#FF40FF' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 0A</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">Starters</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 0b */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#FF7F27' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 0B</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">Juniors</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 0c */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#00CEDD' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 0C</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">Elementary</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 1 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#FFFF00' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-black" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 1</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">18 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 2 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#9966CC' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 2</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">18 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 3 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#00CC00' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 3</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">18 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 4 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#5DADEC' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 4</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">16 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 5 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#00CC66' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 5</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">16 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 6 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#FF0000' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 6</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">16 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
            
            {/* Book 7 */}
            <a href="/preview" className="block group">
              <div className="bg-white rounded-lg overflow-hidden shadow-md transition-all group-hover:shadow-lg">
                <div className="p-4" style={{ backgroundColor: '#00FF00' }}>
                  <div className="flex justify-center items-center h-20">
                    <BookIcon className="h-10 w-10 text-black" />
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-center mb-1">Visual English 7</h3>
                  <p className="text-sm text-gray-600 text-center mb-2">16 Units</p>
                  <div className="flex justify-center">
                    <span className="text-xs px-2 py-1 bg-gray-100 rounded-full">Preview Available</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
          
          <div className="text-center mt-8">
            <a href="/preview" className="inline-flex items-center justify-center px-5 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors">
              View Detailed Previews
            </a>
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