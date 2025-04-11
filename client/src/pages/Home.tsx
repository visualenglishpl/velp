import HeroSection from "@/components/sections/HeroSection";
import IndividualPlans from "@/components/sections/IndividualPlans";
import SchoolPlans from "@/components/sections/SchoolPlans";
import SubscriptionLengths from "@/components/sections/SubscriptionLengths";
import FAQSection from "@/components/sections/FAQSection";
import ContactSupport from "@/components/sections/ContactSupport";

const Home = () => {
  return (
    <>
      <HeroSection />
      <IndividualPlans />
      <SchoolPlans />
      <SubscriptionLengths />
      <FAQSection />
      <ContactSupport />
    </>
  );
};

export default Home;
