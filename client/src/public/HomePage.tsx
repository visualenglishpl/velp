import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
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