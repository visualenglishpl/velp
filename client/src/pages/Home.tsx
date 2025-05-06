import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import BookShowcase from "../components/sections/BookShowcase";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BookShowcase />
      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
