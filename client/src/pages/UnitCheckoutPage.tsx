import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, BookOpen, Book, ShoppingCart, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { OrderSummaryCard } from "@/components/checkout/OrderSummaryCard";
import { SavedUnitsModal } from "@/components/checkout/SavedUnitsModal";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";

interface UnitData {
  unitNumber: string;
  title: string;
  thumbnailUrl?: string;
}

interface BookData {
  id: string;
  title: string;
  color: string;
}

interface SavedUnit {
  bookId: string;
  bookTitle: string;
  unitNumbers: string[];
  timestamp: Date;
}

export default function UnitCheckoutPage() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [bookId, setBookId] = useState<string>("");
  const [units, setUnits] = useState<UnitData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");
  const [savedUnits, setSavedUnits] = useState<SavedUnit[]>([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [books, setBooks] = useState<BookData[]>([
    { id: "0a", title: "Book 0a (Beginners)", color: "#FF40FF" },
    { id: "0b", title: "Book 0b (Beginners)", color: "#FF7F27" },
    { id: "0c", title: "Book 0c (Beginners)", color: "#00CEDD" },
    { id: "1", title: "Book 1", color: "#FFFF00" },
    { id: "2", title: "Book 2", color: "#9966CC" },
    { id: "3", title: "Book 3", color: "#00CC00" },
    { id: "4", title: "Book 4", color: "#5DADEC" },
    { id: "5", title: "Book 5", color: "#00CC66" },
    { id: "6", title: "Book 6", color: "#FF0000" },
    { id: "7", title: "Book 7", color: "#00FF00" },
  ]);
  
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
      // Try API first
      try {
        const response = await fetch(`/api/books/${bookId}/units`);
        if (response.ok) {
          const data = await response.json();
          setUnits(data);
          console.log("Successfully fetched units:", data);
          return;
        }
      } catch (apiError) {
        console.warn("API fetch failed, using sample data:", apiError);
      }
      
      // Fallback to sample data if API call fails
      console.log("Using sample unit data for book", bookId);
      // Generate different unit count based on book ID
      let unitCount = 18; // Default for Books 1-3
      
      if (bookId === "0a" || bookId === "0b" || bookId === "0c") {
        unitCount = 20;
      } else if (bookId === "4" || bookId === "5" || bookId === "6" || bookId === "7") {
        unitCount = 16;
      }
      
      const sampleUnits: UnitData[] = Array.from({ length: unitCount }, (_, i) => ({
        unitNumber: (i + 1).toString(),
        title: `Unit ${i + 1}`
        // thumbnailUrl is optional in the interface, so we don't need to provide it
      }));
      
      setUnits(sampleUnits);
    } catch (error) {
      console.error("Error in fetchUnits:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Empty function to replace scrollToTop, keeping page position
  const scrollToTop = () => {};

  // Toggle unit selection
  const toggleUnitSelection = (unitNumber: string) => {
    if (selectedUnits.includes(unitNumber)) {
      setSelectedUnits(selectedUnits.filter(unit => unit !== unitNumber));
    } else {
      setSelectedUnits([...selectedUnits, unitNumber]);
    }
    scrollToTop();
  };

  // Select all units
  const selectAllUnits = () => {
    setSelectedUnits(units.map(unit => unit.unitNumber));
    scrollToTop();
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedUnits([]);
    scrollToTop();
  };

  // Load saved units from localStorage
  useEffect(() => {
    try {
      const savedJson = localStorage.getItem('visualEnglish_savedUnits');
      if (savedJson) {
        const parsed = JSON.parse(savedJson);
        setSavedUnits(parsed);
      }
    } catch (error) {
      console.error('Error loading saved units:', error);
    }
  }, []);

  // Save units for later
  const saveUnitsForLater = () => {
    if (selectedUnits.length === 0) return;
    
    const currentBook = books.find(b => b.id === bookId);
    const newSavedUnit: SavedUnit = {
      bookId,
      bookTitle: currentBook?.title || `Book ${bookId}`,
      unitNumbers: [...selectedUnits],
      timestamp: new Date()
    };
    
    const updatedSaved = [...savedUnits, newSavedUnit];
    setSavedUnits(updatedSaved);
    
    // Save to localStorage
    try {
      localStorage.setItem('visualEnglish_savedUnits', JSON.stringify(updatedSaved));
    } catch (error) {
      console.error('Error saving units:', error);
    }
    
    // Show success message
    toast({
      title: "Units saved",
      description: `${selectedUnits.length} units from ${currentBook?.title || `Book ${bookId}`} have been saved for later.`,
    });
    
    // Clear current selection
    setSelectedUnits([]);
  };
  
  // Remove a saved unit from the list
  const removeSaved = (index: number) => {
    const newSaved = [...savedUnits];
    newSaved.splice(index, 1);
    setSavedUnits(newSaved);
    
    // Update localStorage
    try {
      localStorage.setItem('visualEnglish_savedUnits', JSON.stringify(newSaved));
    } catch (error) {
      console.error('Error removing saved unit:', error);
    }
  };
  
  // Clear all saved units
  const clearSaved = () => {
    setSavedUnits([]);
    localStorage.removeItem('visualEnglish_savedUnits');
  };
  
  // Restore a saved selection
  const restoreSaved = (saved: SavedUnit) => {
    if (saved.bookId !== bookId) {
      setBookId(saved.bookId);
      fetchUnits(saved.bookId);
    }
    setSelectedUnits(saved.unitNumbers);
  };

  // Add to cart function
  const addToCart = () => {
    // In a real implementation, this would call an API to add to cart
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
    
    toast({
      title: "Added to cart",
      description: `${selectedUnits.length} unit(s) from Book ${bookId} with ${subscriptionPeriod} subscription added to your cart.`,
    });
  };

  // Add debug logging
  console.log('Rendering UnitCheckoutPage with:', { bookId, units, selectedUnits, subscriptionPeriod });
  
  // Handle book change
  const handleBookChange = (value: string) => {
    // Clear selected units when changing books
    setSelectedUnits([]);
    setBookId(value);
    fetchUnits(value);
    
    // Update URL without refreshing the page
    const url = new URL(window.location.href);
    url.searchParams.set('book', value);
    window.history.pushState({}, '', url.toString());
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex justify-between items-center">
          <div>
            <Button 
              variant="outline" 
              className="mb-4"
              onClick={() => window.history.back()}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Back
            </Button>
            <h1 className="text-3xl font-bold">Unit Checkout</h1>
          </div>
          
          {/* Saved Units Modal */}
          {savedUnits.length > 0 && (
            <SavedUnitsModal
              savedUnits={savedUnits}
              onClearSaved={clearSaved}
              onRestoreSaved={restoreSaved}
              onRemoveSaved={removeSaved}
            />
          )}
        </div>
        
        {/* Success Alert */}
        {showSuccessAlert && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {selectedUnits.length} units have been added to your cart!
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">

      {/* Book Selection */}
      <Card className="p-6 mb-8">
        <h2 className="text-xl font-bold mb-4">1. Select a Book</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">Choose a book to view its units:</p>
            <Select 
              value={bookId} 
              onValueChange={handleBookChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a book" />
              </SelectTrigger>
              <SelectContent>
                {books.map((book) => (
                  <SelectItem 
                    key={book.id} 
                    value={book.id}
                  >
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-sm mr-2" 
                        style={{ backgroundColor: book.color }}
                      />
                      {book.title}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {bookId && (
            <div className="flex items-center justify-center md:justify-start">
              <div className="relative w-16 h-16 rounded-md mr-3 flex items-center justify-center" 
                style={{ backgroundColor: books.find(b => b.id === bookId)?.color || '#808080' }}
              >
                <img 
                  src={`/api/direct/content/icons/VISUAL ${bookId}${bookId === '3' ? ' ' : ''}.gif`}
                  alt={`Book ${bookId} cover`}
                  className="w-14 h-14 object-contain"
                  onError={(e) => {
                    console.log(`Error loading image for book ${bookId}`);
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
              <div>
                <p className="font-medium">Selected:</p>
                <p>{books.find(b => b.id === bookId)?.title || `Book ${bookId}`}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {bookId && (
        <>
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Choose Unit Purchase Options</h2>
            
            <Tabs defaultValue="digital" onValueChange={(value: string) => {
              setActiveTab(value as "digital" | "physical");
              scrollToTop();
            }}>
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
                      onClick={() => { setSubscriptionPeriod("monthly"); scrollToTop(); }}
                    >
                      <input 
                        type="radio" 
                        id="monthly-option" 
                        className="mr-2" 
                        checked={subscriptionPeriod === "monthly"} 
                        onChange={() => { setSubscriptionPeriod("monthly"); scrollToTop(); }}
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
                      onClick={() => { setSubscriptionPeriod("yearly"); scrollToTop(); }}
                    >
                      <input 
                        type="radio" 
                        id="yearly-option" 
                        className="mr-2" 
                        checked={subscriptionPeriod === "yearly"} 
                        onChange={() => { setSubscriptionPeriod("yearly"); scrollToTop(); }}
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
                      onError={(e) => {
                        console.log(`Error loading image for book ${bookId}`);
                        e.currentTarget.src = `https://via.placeholder.com/150/808080/FFFFFF/?text=Book+${bookId}`;
                      }}
                    />
                    <div>
                      <h3 className="font-medium">Printed Book {bookId}</h3>
                      <p className="text-sm text-gray-500">€20 + delivery</p>
                      <Button 
                        className="mt-2" 
                        variant="outline"
                        onClick={() => {
                          alert("Added printed book to cart");
                          scrollToTop();
                        }}
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
                <h2 className="text-xl font-bold mb-2">3. Select Units to Purchase</h2>
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
                <div className="flex space-x-2">
                  <Button 
                    variant="outline"
                    disabled={selectedUnits.length === 0}
                    onClick={saveUnitsForLater}
                    style={{ borderColor: "#2e88f6", color: "#2e88f6" }}
                  >
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save for Later
                  </Button>
                  <Button 
                    disabled={selectedUnits.length === 0}
                    onClick={addToCart}
                    style={{ backgroundColor: "#2e88f6" }}
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Select Multiple Units
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </>
      )}
        </div>
        
        {/* Order Summary Card (only show when book is selected and on digital tab) */}
        {bookId && activeTab === "digital" && (
          <div className="lg:col-span-1">
            <OrderSummaryCard
              selectedUnits={selectedUnits}
              bookId={bookId}
              bookTitle={books.find(b => b.id === bookId)?.title || `Book ${bookId}`}
              subscriptionPeriod={subscriptionPeriod}
              addToCart={addToCart}
              saveForLater={saveUnitsForLater}
              isSticky={true}
            />
            
            {/* Progress Indicator */}
            <Card className="mt-6 p-4 border">
              <h3 className="font-medium mb-4">Checkout Progress</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">1</div>
                  <div className="ml-2 font-medium">Select Book</div>
                  {bookId && <CheckCircle className="ml-auto text-green-500 w-4 h-4" />}
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">2</div>
                  <div className="ml-2 font-medium">Choose Purchase Options</div>
                  {bookId && <CheckCircle className="ml-auto text-green-500 w-4 h-4" />}
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-medium">3</div>
                  <div className="ml-2 font-medium">Select Units</div>
                  {selectedUnits.length > 0 && <CheckCircle className="ml-auto text-green-500 w-4 h-4" />}
                </div>
                <div className="flex items-center text-gray-500">
                  <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-medium">4</div>
                  <div className="ml-2 font-medium">Complete Checkout</div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}