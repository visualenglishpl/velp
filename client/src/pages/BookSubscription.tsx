import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, BookOpen, Book, ShoppingCart, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BookData {
  id: string;
  title: string;
  thumbnailUrl?: string;
  color: string;
}

export default function BookSubscription() {
  const { toast } = useToast();
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
      ];
      setBooks(sampleBooks);
    } catch (error) {
      console.error("Error in fetchBooks:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Scroll to top helper function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle book selection
  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter(id => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
    scrollToTop();
  };

  // Select all books
  const selectAllBooks = () => {
    setSelectedBooks(books.map(book => book.id));
    scrollToTop();
  };

  // Clear all selections
  const clearSelections = () => {
    setSelectedBooks([]);
    scrollToTop();
  };

  // Add to cart function
  const addToCart = () => {
    if (selectedBooks.length === 0) {
      toast({
        title: "No books selected",
        description: "Please select at least one book to continue",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Added to cart",
      description: `${selectedBooks.length} book(s) with ${subscriptionPeriod} subscription added to cart`,
    });
    
    // In a real implementation, this would add the items to a cart
    // and possibly redirect to a checkout page
    
    // Redirect to cart or checkout page after small delay
    setTimeout(() => {
      setLocation("/checkout");
    }, 1000);
  };

  // Proceed to checkout
  const proceedToCheckout = () => {
    if (selectedBooks.length === 0) {
      toast({
        title: "No books selected",
        description: "Please select at least one book to continue",
        variant: "destructive"
      });
      return;
    }
    
    // In a real implementation, this would proceed directly to checkout
    // with the selected subscription options
    setLocation("/checkout");
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
  console.log('Rendering BookSubscription with:', { books, selectedBooks, subscriptionPeriod });
  
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
        <h1 className="text-3xl font-bold">Book Subscription</h1>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Choose Book Purchase Options</h2>
        
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
                Choose your subscription period for full book access:
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
                    Monthly (€25/month)
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
                      <div
                        className="w-16 h-16 rounded-md flex items-center justify-center mr-4"
                        style={{ backgroundColor: book.color }}
                      >
                        <img 
                          src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                          alt={`Book ${book.id}`}
                          className="w-12 h-12 object-contain"
                          onError={(e) => {
                            console.log(`Error loading image for book ${book.id}`);
                            e.currentTarget.src = `https://via.placeholder.com/150/${book.color.replace('#', '')}/FFFFFF/?text=Book+${book.id}`;
                          }}
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">Printed Book {book.id}</h3>
                        <p className="text-sm text-gray-500">€20 + delivery</p>
                        <Button 
                          className="mt-2" 
                          variant="outline"
                          onClick={() => {
                            toast({
                              title: "Added to cart",
                              description: `Printed book ${book.id} has been added to your cart.`
                            });
                            scrollToTop();
                          }}
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
                  <div 
                    className="h-24 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: book.color }}
                  >
                    <img 
                      src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                      alt={`Book ${book.id}`}
                      className="h-20 w-20 object-contain"
                      onError={(e) => {
                        console.log(`Error loading thumbnail for book ${book.id}`);
                        e.currentTarget.style.display = 'none';
                      }}
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
            <div className="flex gap-2">
              <Button 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={selectedBooks.length === 0}
                onClick={addToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                className="bg-green-600 hover:bg-green-700"
                disabled={selectedBooks.length === 0}
                onClick={proceedToCheckout}
              >
                Checkout Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}