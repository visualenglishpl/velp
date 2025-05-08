import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, BookOpen, Book, ShoppingCart } from "lucide-react";

interface UnitData {
  unitNumber: string;
  title: string;
  thumbnailUrl?: string;
}

export default function UnitCheckoutPage() {
  const [_, setLocation] = useLocation();
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [bookId, setBookId] = useState<string>("");
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");

  // Get query params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookParam = searchParams.get("book");
    const unitParam = searchParams.get("unit");
    
    if (bookParam) {
      setBookId(bookParam);
      if (unitParam) {
        setSelectedUnits([unitParam]);
      }
      fetchUnits(bookParam);
    }
  }, []);

  // Fetch units for this book
  const fetchUnits = async (bookId: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/books/${bookId}/units`);
      if (response.ok) {
        const data = await response.json();
        setUnits(data);
      } else {
        console.error("Failed to fetch units");
      }
    } catch (error) {
      console.error("Error fetching units:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle unit selection
  const toggleUnitSelection = (unitNumber: string) => {
    if (selectedUnits.includes(unitNumber)) {
      setSelectedUnits(selectedUnits.filter(unit => unit !== unitNumber));
    } else {
      setSelectedUnits([...selectedUnits, unitNumber]);
    }
  };

  // Select all units
  const selectAllUnits = () => {
    setSelectedUnits(units.map(unit => unit.unitNumber));
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedUnits([]);
  };

  // Add to cart function
  const addToCart = () => {
    alert(`Added ${selectedUnits.length} unit(s) to cart with ${subscriptionPeriod} subscription`);
    // In real implementation, would use API to add to cart
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => setLocation("/plans")}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to Plans
        </Button>
        <h1 className="text-3xl font-bold">Unit Checkout - Book {bookId}</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Choose Unit Purchase Options</h2>
        
        <Tabs defaultValue="digital" onValueChange={(value: string) => setActiveTab(value as "digital" | "physical")}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="digital" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Digital Access Options
            </TabsTrigger>
            <TabsTrigger value="physical" className="flex items-center">
              <Book className="mr-2 h-4 w-4" />
              Physical Book Option
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="digital" className="pt-2">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-sm text-gray-600 mb-4">
                Choose your subscription period for unit access:
              </p>
              
              <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
                <div 
                  className={`flex items-center w-full md:w-auto px-4 py-3 rounded-full cursor-pointer transition-all ${
                    subscriptionPeriod === "monthly" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white border"
                  }`}
                  onClick={() => setSubscriptionPeriod("monthly")}
                >
                  <input 
                    type="radio" 
                    id="monthly-option" 
                    className="mr-2" 
                    checked={subscriptionPeriod === "monthly"} 
                    onChange={() => setSubscriptionPeriod("monthly")}
                  />
                  <label htmlFor="monthly-option" className="cursor-pointer">
                    Monthly (€5/month)
                  </label>
                </div>
                
                <div 
                  className={`flex items-center w-full md:w-auto px-4 py-3 rounded-full cursor-pointer transition-all ${
                    subscriptionPeriod === "yearly" 
                      ? "bg-blue-600 text-white" 
                      : "bg-white border"
                  }`}
                  onClick={() => setSubscriptionPeriod("yearly")}
                >
                  <input 
                    type="radio" 
                    id="yearly-option" 
                    className="mr-2" 
                    checked={subscriptionPeriod === "yearly"} 
                    onChange={() => setSubscriptionPeriod("yearly")}
                  />
                  <label htmlFor="yearly-option" className="cursor-pointer">
                    Yearly (€40/year - 33% savings)
                  </label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="physical" className="pt-2">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-gray-600 mb-4">
                Instead of individual digital units, you can purchase the complete printed book:
              </p>
              
              <div className="p-4 border rounded-lg bg-white flex items-center">
                <img 
                  src={`/api/direct/content/icons/VISUAL ${bookId}${bookId === '3' ? ' ' : ''}.gif`}
                  alt={`Book ${bookId}`}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <h3 className="font-medium">Printed Book {bookId}</h3>
                  <p className="text-sm text-gray-500">€20 + delivery</p>
                  <Button 
                    className="mt-2" 
                    variant="outline"
                    onClick={() => alert("Added printed book to cart")}
                  >
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "digital" && (
        <Card className="p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Select Units to Purchase</h2>
            <p className="text-gray-600">
              You can select multiple units from Book {bookId} to purchase together.
            </p>
          </div>
          
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-semibold">Select Units</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllUnits}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelections}>
                Clear
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {isLoading ? (
              [...Array(16)].map((_, i) => (
                <div key={i} className="border rounded-md p-4 h-36 animate-pulse bg-gray-100"></div>
              ))
            ) : (
              units.map((unit) => (
                <div 
                  key={unit.unitNumber}
                  className={`border rounded-md p-3 cursor-pointer ${
                    selectedUnits.includes(unit.unitNumber) 
                      ? "border-blue-500 bg-blue-50" 
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => toggleUnitSelection(unit.unitNumber)}
                >
                  <div className="flex justify-between mb-2">
                    <Checkbox 
                      id={`unit-${unit.unitNumber}`} 
                      checked={selectedUnits.includes(unit.unitNumber)} 
                      onCheckedChange={() => toggleUnitSelection(unit.unitNumber)}
                    />
                    <Label htmlFor={`unit-${unit.unitNumber}`} className="font-medium">
                      Unit {unit.unitNumber}
                    </Label>
                  </div>
                  <div className="h-20 bg-gray-100 rounded-md flex items-center justify-center">
                    {unit.thumbnailUrl ? (
                      <img 
                        src={unit.thumbnailUrl} 
                        alt={`Unit ${unit.unitNumber}`} 
                        className="h-full w-full object-cover rounded-md"
                      />
                    ) : (
                      <span className="text-gray-400 text-sm">No preview</span>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-blue-600 font-medium">
              {selectedUnits.length} units selected
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedUnits.length === 0}
              onClick={addToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add {selectedUnits.length} Unit{selectedUnits.length !== 1 ? 's' : ''} to Cart
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}