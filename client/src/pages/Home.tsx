import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";

const Home = () => {
  const [_, navigate] = useLocation();
  
  const handleViewContent = (format: string) => {
    console.log(`Navigating to format: ${format}`);
    // Test with different URL formats
    if (format === 'format1') {
      navigate("/books/1/units/1");
    } else if (format === 'format2') {
      navigate("/book/1/1");
    } else if (format === 'format3') {
      navigate("/book1/unit1");
    }
  };
  
  const handleViewSimpleContent = (format: string) => {
    console.log(`Navigating to simple format: ${format}`);
    // Test with different URL formats for SimpleContentViewer
    if (format === 'format1') {
      navigate("/simple/books/1/units/1");
    } else if (format === 'format2') {
      navigate("/simple/book/1/1");
    } else if (format === 'format3') {
      navigate("/simple/book1/unit1");
    }
  };
  
  return (
    <>
      <HeroSection />
      <div className="container mx-auto py-8">
        <Card className="p-6 max-w-2xl mx-auto mb-6">
          <h2 className="text-xl font-bold mb-4 text-center">Test Regular Content Viewer</h2>
          <p className="mb-4 text-center">Click one of the buttons below to test the regular content viewer with different URL formats:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleViewContent('format1')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Format 1: /books/1/units/1
            </Button>
            <Button 
              onClick={() => handleViewContent('format2')}
              className="bg-green-600 hover:bg-green-700"
            >
              Format 2: /book/1/1
            </Button>
            <Button 
              onClick={() => handleViewContent('format3')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Format 3: /book1/unit1
            </Button>
          </div>
        </Card>
        
        <Card className="p-6 max-w-2xl mx-auto border-2 border-amber-300">
          <h2 className="text-xl font-bold mb-4 text-center text-amber-700">Test Simple Content Viewer (Debug Mode)</h2>
          <p className="mb-4 text-center">Use these buttons to test our simplified content viewer with debugging information:</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => handleViewSimpleContent('format1')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Debug Format 1: /simple/books/1/units/1
            </Button>
            <Button 
              onClick={() => handleViewSimpleContent('format2')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Debug Format 2: /simple/book/1/1
            </Button>
            <Button 
              onClick={() => handleViewSimpleContent('format3')}
              className="bg-amber-600 hover:bg-amber-700"
            >
              Debug Format 3: /simple/book1/unit1
            </Button>
          </div>
        </Card>
      </div>
      <PricingPlans />
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
