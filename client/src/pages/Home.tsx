import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import BookSeriesAnimated from "../components/BookSeriesAnimated";

const Home = () => {
  return (
    <>
      <HeroSection />

      {/* Book Series Animated Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Discover Our Book Series</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Visual English offers a comprehensive series of books designed for children ages 5-12. 
              Each book features a unique theme with engaging visual content to make learning English fun and effective.
            </p>
          </div>
          <BookSeriesAnimated />
        </div>
      </section>

      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
