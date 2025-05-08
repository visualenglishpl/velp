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
  color: string;
}

export default function BookWizardPage() {
  const { toast } = useToast();
  const [_, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [books, setBooks] = useState<BookData[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [subscriptionPeriod, setSubscriptionPeriod] = useState<"monthly" | "yearly">("monthly");
  
  useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    // Try to fetch from API first
    try {
      const response = await fetch("/api/books");
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
        return;
      }
    } catch (error) {
      console.error("Failed to fetch books from API:", error);
    }
    
    // Fallback to sample data
    console.log("Using sample book data");
    setBooks([
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
    ]);
  };
  
  const nextStep = () => {
    if (step === 1 && selectedBooks.length === 0) {
      toast({
        title: "Please select at least one book",
        description: "Select one or more books to continue.",
        variant: "destructive",
      });
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      setSelectedBooks(selectedBooks.filter(id => id !== bookId));
    } else {
      setSelectedBooks([...selectedBooks, bookId]);
    }
  };
  
  const handleSubscriptionChange = (period: "monthly" | "yearly") => {
    setSubscriptionPeriod(period);
  };
  
  const handleCheckout = () => {
    // In a real application, this would make an API call to process payment
    toast({
      title: "Order Processed",
      description: `Thank you for your purchase! You now have access to ${selectedBooks.length} books with a ${subscriptionPeriod} subscription.`,
    });
    
    // Reset state
    setSelectedBooks([]);
    setStep(1);
    
    // Redirect to home or a thank you page
    setTimeout(() => {
      setLocation("/");
    }, 2000);
  };
  
  // Add debug logging
  console.log("Rendering NewBookCheckoutPage with:", { books, selectedBooks, subscriptionPeriod });
  
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
        <p className="text-gray-600 mt-1">
          Select one or more books and choose your subscription plan
        </p>
      </div>
      
      <CheckoutWizard currentStep={step}>
        {step === 1 && (
          <BookSelectionStep 
            books={books}
            selectedBooks={selectedBooks}
            onBookSelect={handleBookSelection}
            onNext={nextStep}
          />
        )}
        
        {step === 2 && (
          <SubscriptionPlanStep
            subscriptionPeriod={subscriptionPeriod}
            onSubscriptionChange={handleSubscriptionChange}
            onBack={prevStep}
            onNext={nextStep}
          />
        )}
        
        {step === 3 && (
          <OrderSummaryStep 
            selectedBooks={selectedBooks}
            books={books}
            subscriptionPeriod={subscriptionPeriod}
            onBack={prevStep}
            onNext={nextStep}
          />
        )}
        
        {step === 4 && (
          <PaymentStep
            selectedBooks={selectedBooks}
            books={books}
            subscriptionPeriod={subscriptionPeriod}
            onBack={prevStep}
            onCheckout={handleCheckout}
          />
        )}
      </CheckoutWizard>
    </div>
  );
}