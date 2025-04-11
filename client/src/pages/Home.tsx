import HeroSection from "@/components/sections/HeroSection";
import IndividualPlans from "@/components/sections/IndividualPlans";
import SchoolPlans from "@/components/sections/SchoolPlans";
import SubscriptionLengths from "@/components/sections/SubscriptionLengths";
import FAQSection from "@/components/sections/FAQSection";
import BookstoreSection from "@/components/sections/BookstoreSection";

const Home = () => {
  return (
    <>
      <HeroSection />
      <IndividualPlans />
      <SchoolPlans />
      <SubscriptionLengths />
      <BookstoreSection />
      <FAQSection />
    </>
  );
};

export default Home;
