import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import BookCollectionAnimated from "../components/sections/BookCollectionAnimated";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <BookCollectionAnimated />
      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
