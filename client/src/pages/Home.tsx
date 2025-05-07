import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-20 pb-16">
        <PricingPlans />
      </section>
      
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
