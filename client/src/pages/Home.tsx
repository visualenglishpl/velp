import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import BookCollectionAnimated from "../components/BookCollectionAnimated";

const Home = () => {
  return (
    <>
      <HeroSection />
      
      {/* Books Section */}
      <section id="books" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Books Collection
          </h2>
          <BookCollectionAnimated />
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-16">
        <PricingPlans />
      </section>
      
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
