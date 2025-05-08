import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import ContentViewerTester from "../components/auth/ContentViewerTester";

const Home = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Test Component for Auth (Only for development) */}
      <section className="py-6 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Content Authentication Tester</h2>
          <div className="max-w-lg mx-auto">
            <ContentViewerTester />
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
