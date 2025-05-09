import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const Home = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Test Components (Only for development) */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Development Tools</h2>
          <div className="flex flex-col gap-6 max-w-lg mx-auto">
            <div className="p-6 border rounded-lg bg-white shadow-sm">
              <h3 className="text-xl font-semibold mb-4">Direct Access Links</h3>
              <div className="space-y-3">
                <div 
                  onClick={() => window.location.href = "/simple-viewer"}
                  className="p-3 bg-blue-50 border border-blue-200 rounded-lg flex items-center cursor-pointer hover:bg-blue-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-blue-800">Simple Viewer</p>
                    <p className="text-sm text-blue-600">Quick access to the new content viewer</p>
                  </div>
                </div>
                
                <div 
                  onClick={() => window.location.href = "/book/book4/unit/1"}
                  className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center cursor-pointer hover:bg-amber-100 transition-colors"
                >
                  <div className="flex-1">
                    <p className="font-medium text-amber-800">Book 4, Unit 1</p>
                    <p className="text-sm text-amber-600">Sample unit with viewer</p>
                  </div>
                </div>
                
                <div 
                  className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-center"
                >
                  <div className="flex-1">
                    <p className="font-medium text-green-800">Admin/Teacher Access</p>
                    <p className="text-sm text-green-600">Use the "Sign In" button in the top navigation bar</p>
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
    </div>
  );
};

export default Home;