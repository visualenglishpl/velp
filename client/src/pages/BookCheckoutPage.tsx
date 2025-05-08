import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, BookOpen, Book, ShoppingCart } from "lucide-react";

interface BookData {
  id: string;
  title: string;
  thumbnailUrl?: string;
  color: string;
}

export default function BookCheckoutPage() {
  const [_, setLocation] = useLocation();
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"digital" | "physical">("digital");

  // Get query params from URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookParam = searchParams.get("book");
    
    if (bookParam) {
      setSelectedBooks([bookParam]);
    }
    fetchBooks();
  }, []);

  // Fetch books
  const fetchBooks = async () => {
    try {
      setIsLoading(true);
      // Try API first
      try {
        const response = await fetch(`/api/books`);
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          console.log("Successfully fetched books:", data);
          return;
        }
      } catch (apiError) {
        console.warn("API fetch failed, using sample data:", apiError);
      }
      
      // Fallback to sample data if API call fails
      console.log("Using sample book data");
      const sampleBooks: BookData[] = [
        { id: "1", title: "Book 1", color: "#FFFF00" },
        { id: "2", title: "Book 2", color: "#9966CC" },
        { id: "3", title: "Book 3", color: "#00CC00" },
        { id: "4", title: "Book 4", color: "#5DADEC" },
        { id: "5", title: "Book 5", color: "#00CC66" },
        { id: "6", title: "Book 6", color: "#FF0000" },
        { id: "7", title: "Book 7", color: "#00FF00" },
      ];
      setBooks(sampleBooks);
    } catch (error) {
      console.error("Error in fetchBooks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle book selection
  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter(id => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };

  // Select all books
  const selectAllBooks = () => {
    setSelectedBooks(books.map(book => book.id));
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedBooks([]);
  };

  // Add to cart function
  const addToCart = () => {
    alert(`Added ${selectedBooks.length} book(s) to cart with ${subscriptionPeriod} subscription`);
    // In real implementation, would use API to add to cart
  };

  // Calculate price based on selection
  const calculatePrice = () => {
    const basePrice = subscriptionPeriod === "monthly" ? 25 : 180;
    let totalPrice = basePrice * selectedBooks.length;
    
    // Apply discount for 3+ books on yearly subscription
    if (subscriptionPeriod === "yearly" && selectedBooks.length >= 3) {
      totalPrice = Math.round(totalPrice * 0.9); // 10% discount
    }
    
    return totalPrice;
  };

  // Add debug logging
  console.log('Rendering BookCheckoutPage with:', { books, selectedBooks, subscriptionPeriod });
  
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Button 
          variant="outline" 
          className="mb-4"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <h1 className="text-3xl font-bold">Book Checkout</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Choose Book Purchase Options</h2>
        
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
                Choose your subscription period for full book access:
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
                    Monthly (€25/month)
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
                    Yearly (€180/year - 40% savings)
                  </label>
                </div>
              </div>
              
              {subscriptionPeriod === "yearly" && (
                <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-700">
                  <strong>Yearly Discount:</strong> Get 10% off when you subscribe to 3 or more books with a yearly plan!
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="physical" className="pt-2">
            <div className="bg-gray-50 p-4 rounded-md mb-6">
              <p className="text-gray-600 mb-4">
                Choose physical books to purchase (€20 each + delivery):
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {isLoading ? (
                  [...Array(10)].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg animate-pulse bg-gray-100 h-24"></div>
                  ))
                ) : (
                  books.map(book => (
                    <div key={book.id} className="p-4 border rounded-lg bg-white flex items-center">
                      <img 
                        src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                        alt={`Book ${book.id}`}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium">Printed Book {book.id}</h3>
                        <p className="text-sm text-gray-500">€20 + delivery</p>
                        <Button 
                          className="mt-2" 
                          variant="outline"
                          onClick={() => alert(`Added printed book ${book.id} to cart`)}
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {activeTab === "digital" && (
        <Card className="p-6 mb-6">
          <div className="mb-4">
            <h2 className="text-xl font-bold mb-2">Select Books to Purchase</h2>
            <p className="text-gray-600">
              You can select multiple books to purchase together.
            </p>
          </div>
          
          <div className="mb-4 flex justify-between items-center">
            <h3 className="font-semibold">Select Books</h3>
            <div className="space-x-2">
              <Button variant="outline" size="sm" onClick={selectAllBooks}>
                Select All
              </Button>
              <Button variant="outline" size="sm" onClick={clearSelections}>
                Clear
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
            {isLoading ? (
              [...Array(10)].map((_, i) => (
                <div key={i} className="border rounded-md p-4 h-40 animate-pulse bg-gray-100"></div>
              ))
            ) : (
              books.map((book) => (
                <div 
                  key={book.id}
                  className={`border rounded-md p-3 cursor-pointer ${
                    selectedBooks.includes(book.id) 
                      ? "border-blue-500 bg-blue-50" 
                      : "hover:border-gray-300"
                  }`}
                  onClick={() => toggleBookSelection(book.id)}
                >
                  <div className="flex justify-between mb-2">
                    <Checkbox 
                      id={`book-${book.id}`} 
                      checked={selectedBooks.includes(book.id)} 
                      onCheckedChange={() => toggleBookSelection(book.id)}
                    />
                    <Label htmlFor={`book-${book.id}`} className="font-medium">
                      Book {book.id}
                    </Label>
                  </div>
                  <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center">
                    <img 
                      src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                      alt={`Book ${book.id}`}
                      className="h-full w-full object-contain p-2"
                    />
                  </div>
                </div>
              ))
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div>
              <div className="text-blue-600 font-medium">
                {selectedBooks.length} books selected
              </div>
              {selectedBooks.length > 0 && (
                <div className="text-sm text-gray-600">
                  Total: €{calculatePrice()} {subscriptionPeriod === "yearly" && selectedBooks.length >= 3 && "(10% discount applied)"}
                </div>
              )}
            </div>
            <Button 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={selectedBooks.length === 0}
              onClick={addToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add {selectedBooks.length} Book{selectedBooks.length !== 1 ? 's' : ''} to Cart
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}