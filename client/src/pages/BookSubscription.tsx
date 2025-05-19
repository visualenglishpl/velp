import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ChevronLeft, BookOpen, Book, ShoppingCart, AlertCircle, ArrowRight, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  
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
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
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

  // Toggle book selection
  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter(id => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
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
    toast({
      title: "Proceeding to checkout",
      description: `${selectedBooks.length} books with ${subscriptionPeriod} subscription added to your cart.`,
    });
    
    setShowSuccessAlert(true);
    setTimeout(() => setShowSuccessAlert(false), 5000);
  };

  // Calculate price based on selection
  const calculatePrice = () => {
    // Monthly: €25/month per book
    // Yearly: €180/year per book (40% savings from €300)
    // 10% discount for 3+ books on yearly subscription
    const basePrice = subscriptionPeriod === "monthly" ? 25 : 180;
    let totalPrice = basePrice * selectedBooks.length;
    
    // Apply discount for 3+ books on yearly subscription
    if (subscriptionPeriod === "yearly" && selectedBooks.length >= 3) {
      totalPrice = Math.round(totalPrice * 0.9); // 10% discount
    }
    
    return totalPrice;
  };
  
  // Calculate the annual savings for yearly subscription
  const calculateSavings = () => {
    if (subscriptionPeriod !== "yearly") return 0;
    
    // Monthly would be €25 * 12 months = €300 per book
    // Yearly is €180 per book
    const monthlyEquivalent = 300 * selectedBooks.length;
    let yearlyActual = 180 * selectedBooks.length;
    
    // Apply 10% discount for 3+ books
    if (selectedBooks.length >= 3) {
      yearlyActual = Math.round(yearlyActual * 0.9);
    }
    
    return monthlyEquivalent - yearlyActual;
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
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
        
        {/* Success Alert */}
        {showSuccessAlert && (
          <Alert className="mt-4 bg-green-50 border-green-200">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">
              {selectedBooks.length} books have been added to your cart!
            </AlertDescription>
          </Alert>
        )}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {/* Subscription Type Tabs */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">1. Choose Subscription Type</h2>
            
            <Tabs defaultValue="digital" onValueChange={(value: string) => {
              setActiveTab(value as "digital" | "physical");
            }}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="digital" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Digital Access
                </TabsTrigger>
                <TabsTrigger value="physical" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Physical Book
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="digital" className="pt-2">
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-sm text-gray-600 mb-4">
                    Choose your subscription period:
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
                    <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
                      <span className="font-semibold">Pro tip:</span> Select 3 or more books for an additional 10% discount on yearly subscriptions!
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="physical" className="pt-2">
                <div className="bg-gray-50 p-4 rounded-md mb-6">
                  <p className="text-gray-600 mb-4">
                    Order printed books (physical copies):
                  </p>
                  
                  <div className="p-4 border rounded-lg bg-white">
                    <h3 className="font-medium mb-2">Physical Book Details</h3>
                    <ul className="text-sm text-gray-600 space-y-2 mb-4">
                      <li>• Price: €20 per book</li>
                      <li>• Delivery: €20 (DPD courier service)</li>
                      <li>• Estimated delivery time: 3-5 working days</li>
                      <li>• Volume discount: 10% off when ordering 10+ books</li>
                    </ul>
                    
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800 text-sm">
                      <AlertCircle className="h-4 w-4 inline-block mr-1" />
                      Please note that physical books don't include digital access. Consider adding a digital subscription for complete learning experience.
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Book Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">2. Select Books</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {books.map((book) => (
                <div 
                  key={book.id} 
                  className={`border rounded-md p-3 cursor-pointer transition-all ${
                    selectedBooks.includes(book.id) 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'hover:border-gray-400'
                  }`}
                  onClick={() => toggleBookSelection(book.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div 
                      className="w-12 h-12 rounded-md flex items-center justify-center"
                      style={{ backgroundColor: book.color }}
                    >
                      <img 
                        src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                        alt={`Book ${book.id}`}
                        className="w-10 h-10 object-contain"
                        onError={(e) => {
                          console.log(`Error loading image for book ${book.id}`);
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <Checkbox 
                      checked={selectedBooks.includes(book.id)}
                      onCheckedChange={() => toggleBookSelection(book.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                  
                  <div className="text-center">
                    <h3 className="text-sm font-medium">
                      {book.id.startsWith('0') ? `Beginner ${book.id}` : `Book ${book.id}`}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subscription Type:</span>
                  <span className="font-medium">
                    {activeTab === "digital" 
                      ? `${subscriptionPeriod.charAt(0).toUpperCase() + subscriptionPeriod.slice(1)}` 
                      : "Physical Book"}
                  </span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Books Selected:</span>
                  <span className="font-medium">{selectedBooks.length}</span>
                </div>
                
                {activeTab === "digital" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Book:</span>
                      <span className="font-medium">
                        {subscriptionPeriod === "monthly" 
                          ? "€25/month" 
                          : "€180/year"}
                      </span>
                    </div>
                    
                    {selectedBooks.length >= 3 && subscriptionPeriod === "yearly" && (
                      <div className="flex justify-between text-green-600">
                        <span>Volume Discount:</span>
                        <span>-10%</span>
                      </div>
                    )}
                  </>
                )}
                
                {activeTab === "physical" && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Price per Book:</span>
                      <span className="font-medium">€20</span>
                    </div>
                    
                    {selectedBooks.length > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee:</span>
                        <span className="font-medium">€20</span>
                      </div>
                    )}
                    
                    {selectedBooks.length >= 10 && (
                      <div className="flex justify-between text-green-600">
                        <span>Volume Discount:</span>
                        <span>-10%</span>
                      </div>
                    )}
                  </>
                )}
                
                <div className="border-t pt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>
                      {activeTab === "digital" ? (
                        selectedBooks.length > 0 ? `€${calculatePrice()}${subscriptionPeriod === "monthly" ? "/month" : "/year"}` : "€0"
                      ) : (
                        selectedBooks.length > 0 ? 
                          `€${selectedBooks.length >= 10 
                            ? Math.round((20 * selectedBooks.length + 20) * 0.9) 
                            : 20 * selectedBooks.length + 20}` 
                          : "€0"
                      )}
                    </span>
                  </div>
                  
                  {activeTab === "digital" && subscriptionPeriod === "yearly" && selectedBooks.length > 0 && (
                    <div className="text-green-600 text-sm mt-2 text-right">
                      You save €{calculateSavings()} per year
                    </div>
                  )}
                </div>
              </div>
              
              <Button 
                className="w-full" 
                disabled={selectedBooks.length === 0}
                onClick={proceedToCheckout}
              >
                <ShoppingCart className="mr-2 h-4 w-4" />
                {activeTab === "digital" ? "Subscribe Now" : "Purchase Books"}
              </Button>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => window.location.href = "/checkout/free_trial"}
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  Try Free 7-Day Trial
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}