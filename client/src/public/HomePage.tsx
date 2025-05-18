import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import ContentPreviewSection from "../components/sections/ContentPreviewSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Preview CTA Banner */}
      <section className="py-12 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between bg-white rounded-lg shadow-lg p-6 md:p-8">
            <div className="mb-6 md:mb-0 md:mr-8 flex-1">
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Try Before You Subscribe</h2>
              <p className="text-gray-600 mb-4">
                Explore our teaching materials with free preview access. Browse any book's content 
                and see the first 15 slides from each unit.
              </p>
              <div className="flex flex-wrap gap-3">
                <a 
                  href="/preview" 
                  className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  <span className="mr-2">▶</span> View Book Previews
                </a>
                <a 
                  href="/auth?signup=trial" 
                  className="inline-flex items-center px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Try 7-Day Free Trial
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-auto flex justify-center">
              <div className="relative w-64 h-48">
                <div className="absolute top-0 left-0 w-48 h-40 bg-yellow-400 rounded-lg shadow-md transform rotate-[-5deg] z-10"></div>
                <div className="absolute top-4 left-4 w-48 h-40 bg-purple-500 rounded-lg shadow-md transform rotate-[5deg] z-20"></div>
                <div className="absolute top-8 left-8 w-48 h-40 bg-blue-400 rounded-lg shadow-md z-30 flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <div className="font-bold mb-1">Visual English</div>
                    <div className="text-sm">Preview Available</div>
                    <div className="mt-3 text-xs bg-white/20 rounded-full px-3 py-1">15 slides per unit</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-12 pb-8">
        <PricingPlans />
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