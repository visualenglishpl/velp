import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { CheckoutWizard } from "@/components/checkout/CheckoutWizard";
import { BookSelectionStep } from "@/components/checkout/BookSelectionStep";
import { SubscriptionPlanStep } from "@/components/checkout/SubscriptionPlanStep";
import { OrderSummaryStep } from "@/components/checkout/OrderSummaryStep";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { useToast } from "@/hooks/use-toast";

interface BookData {
  id: string;
  title: string;
  thumbnailUrl?: string;
  color: string;
}

export default function NewBookCheckoutPage() {
  const [_, setLocation] = useLocation();
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "yearly">("monthly");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [books, setBooks] = useState<BookData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

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
        { id: "0a", title: "Book 0a", color: "#FF40FF" },
        { id: "0b", title: "Book 0b", color: "#FF7F27" },
        { id: "0c", title: "Book 0c", color: "#00CEDD" },
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

  // Calculate the total price based on subscription period and book selections
  const calculatePrice = () => {
    if (selectedBooks.length === 0) return 0;
    
    if (subscriptionPeriod === "monthly") {
      // €25 per month regardless of book count
      return 25;
    } else {
      // €180 per year with 10% discount for 3+ books
      const basePrice = 180;
      const discount = selectedBooks.length >= 3 ? 0.1 : 0;
      return basePrice * (1 - discount);
    }
  };

  // Complete checkout function
  const completeCheckout = () => {
    toast({
      title: "Order Completed!",
      description: `Thank you for your purchase of ${selectedBooks.length} book(s) with a ${subscriptionPeriod} subscription.`,
    });
    
    // In real implementation, would save the order to database and redirect
    setTimeout(() => {
      setLocation('/');
    }, 3000);
  };

  // Define the checkout steps
  const checkoutSteps = [
    {
      title: "Select Books",
      description: "Choose the books you want to access",
      content: (
        <BookSelectionStep
          books={books}
          selectedBooks={selectedBooks}
          onSelectionChange={setSelectedBooks}
          isLoading={isLoading}
        />
      ),
    },
    {
      title: "Choose Plan",
      description: "Select your subscription period",
      content: (
        <SubscriptionPlanStep
          subscriptionPeriod={subscriptionPeriod}
          onPlanChange={setSubscriptionPeriod}
          selectedBooksCount={selectedBooks.length}
        />
      ),
    },
    {
      title: "Review Order",
      description: "Review your book selection and subscription plan",
      content: (
        <OrderSummaryStep
          selectedBooks={selectedBooks}
          subscriptionPeriod={subscriptionPeriod}
          books={books}
        />
      ),
    },
    {
      title: "Payment",
      description: "Complete your purchase",
      content: (
        <PaymentStep
          totalPrice={calculatePrice()}
          subscriptionPeriod={subscriptionPeriod}
        />
      ),
    },
  ];

  // Add debug logging
  console.log('Rendering NewBookCheckoutPage with:', { books, selectedBooks, subscriptionPeriod });
  
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
        <p className="text-gray-600 mt-1">Complete your purchase in a few simple steps</p>
      </div>

      <CheckoutWizard 
        steps={checkoutSteps} 
        onComplete={completeCheckout}
      />
    </div>
  );
}