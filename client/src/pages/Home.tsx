import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";

const Home = () => {
  const [_, navigate] = useLocation();
  
  const handleViewContent = (book: string, unit: string) => {
    console.log(`Navigating to book ${book}, unit ${unit}`);
    navigate(`/books/${book}/units/${unit}`);
  };
  
  // Removed Simple Viewer navigation function as we're consolidating to just use SlickContentViewer
  
  return (
    <>
      <HeroSection />
      <div className="container mx-auto py-8">
        <Card className="p-6 max-w-2xl mx-auto mb-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 text-center text-indigo-800">Visual English Content Viewer</h2>
          <p className="mb-6 text-center text-gray-700">Explore our interactive content with the SlickContentViewer - our main viewer with all features!</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button 
              onClick={() => handleViewContent('4', '1')}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-6 text-lg"
              size="lg"
            >
              <span className="flex flex-col items-center">
                <span className="font-bold">Book 4, Unit 1</span>
                <span className="text-xs mt-1">Nationalities</span>
              </span>
            </Button>
            <Button 
              onClick={() => handleViewContent('6', '5')}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-6 text-lg"
              size="lg"
            >
              <span className="flex flex-col items-center">
                <span className="font-bold">Book 6, Unit 5</span>
                <span className="text-xs mt-1">Theme Parks</span>
              </span>
            </Button>
            <Button 
              onClick={() => handleViewContent('5', '3')}
              className="bg-pink-600 hover:bg-pink-700 px-6 py-6 text-lg"
              size="lg"
            >
              <span className="flex flex-col items-center">
                <span className="font-bold">Book 5, Unit 3</span>
                <span className="text-xs mt-1">Home Sweet Home</span>
              </span>
            </Button>
          </div>
          <p className="text-center text-sm text-gray-600 italic">All slides and interactive features are available in this viewer.</p>
        </Card>
        
        {/* Removed Simple Content Viewer (Debug Mode) section as we're only using SlickContentViewer */}
      </div>
      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
