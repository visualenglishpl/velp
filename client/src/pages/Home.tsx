import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

const Home = () => {
  const [_, navigate] = useLocation();
  
  return (
    <>
      <HeroSection />
      <div className="container mx-auto py-8 flex justify-center">
        <Button 
          onClick={() => navigate("/books/1/units/1")}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Test Content Viewer (Book 1, Unit 1)
        </Button>
      </div>
      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
