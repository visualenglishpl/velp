import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiRequest } from '@/lib/queryClient';
import { useQuery } from '@tanstack/react-query';
import { Check, Book } from 'lucide-react';

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

// Subscription types
type PlanType = 'single_lesson' | 'whole_book' | 'printed_book' | 'free_trial';
type BillingCycle = 'monthly' | 'yearly';

// CheckoutForm component that handles the payment
function CheckoutForm({
  planType,
  billingCycle,
  planDetails,
  customerInfo
}: {
  planType: PlanType;
  billingCycle: BillingCycle;
  planDetails: {
    name: string;
    price: string;
    cycle: string;
    description: string;
  };
  customerInfo: {
    name: string;
    email: string;
  };
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    // Get a reference to a mounted PaymentElement
    const paymentElement = elements.getElement(PaymentElement);
    
    if (!paymentElement) {
      setErrorMessage("Payment element not found");
      setIsProcessing(false);
      return;
    }

    try {
      // Trigger form validation and wallet collection
      const {error: submitError} = await elements.submit();
      if (submitError) {
        setErrorMessage(submitError.message || "An error occurred");
        setIsProcessing(false);
        return;
      }

      let result;
      
      if (planType === 'free_trial') {
        // Use setup intent for free trial
        result = await stripe.confirmSetup({
          elements,
          confirmParams: {
            return_url: window.location.origin,
          },
          redirect: 'if_required',
        });
      } else {
        // Use payment intent for immediate payment
        result = await stripe.confirmPayment({
          elements,
          confirmParams: {
            return_url: window.location.origin,
          },
          redirect: 'if_required',
        });
      }

      if (result.error) {
        // Show error to your customer
        setErrorMessage(result.error.message || "An unexpected error occurred");
        toast({
          title: "Payment Failed",
          description: result.error.message,
          variant: "destructive",
        });
      } else {
        // Payment successful
        toast({
          title: "Payment Successful",
          description: `Thank you for your purchase of ${planDetails.name}!`,
        });
        // Redirect to home page after successful payment
        setLocation('/');
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage("An unexpected error occurred");
      toast({
        title: "Payment Error",
        description: "Something went wrong processing your payment",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMessage && (
        <div className="text-red-500 text-sm mb-4">{errorMessage}</div>
      )}
      
      <PaymentElement />
      
      <Button 
        type="submit" 
        disabled={
          isProcessing || 
          !stripe || 
          !elements || 
          ((planType === 'whole_book' || planType === 'single_lesson') && selectedBookIds.length === 0)
        } 
        className="w-full mt-4"
      >
        {isProcessing ? 'Processing...' : 
          planType === 'free_trial' 
            ? 'Start Free Trial' 
            : `Pay ${planDetails.price}`}
      </Button>
    </form>
  );
}

export default function CheckoutPage() {
  // Get the planId and query parameters from the URL
  const [, params] = useRoute('/checkout/:planId?');
  const planId = params?.planId || 'single_lesson';
  const [location, setLocation] = useLocation();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [planType, setPlanType] = useState<PlanType>(planId as PlanType || 'single_lesson');
  
  // Query to get available books
  const { data: availableBooks, isLoading: loadingBooks } = useQuery({
    queryKey: ['/api/assets/book-thumbnails'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/assets/book-thumbnails');
      if (!res.ok) throw new Error('Failed to fetch books');
      return await res.json();
    }
  });
  
  // State for selected books
  const [selectedBookIds, setSelectedBookIds] = useState<string[]>([]);
  
  useEffect(() => {
    // Parse URL query parameters
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const bookParam = searchParams.get('book');
    if (bookParam) {
      // Handle either single book or comma-separated list of books
      const bookIds = bookParam.split(',').filter(id => id.trim() !== '');
      setSelectedBookIds(bookIds);
      console.log(`Selected books: ${bookIds.join(', ')}`);
    }
  }, [location]);
  
  // For backward compatibility - get first selected book if any
  const selectedBookId = selectedBookIds.length > 0 ? selectedBookIds[0] : null;
  
  // Handler for toggling book selection
  const toggleBookSelection = (bookId: string) => {
    setSelectedBookIds(prevIds => {
      if (prevIds.includes(bookId)) {
        return prevIds.filter(id => id !== bookId);
      } else {
        return [...prevIds, bookId];
      }
    });
  };
  
  // Customer information state
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  // Update planType when URL parameter changes
  useEffect(() => {
    if (planId && ['single_lesson', 'whole_book', 'printed_book', 'free_trial'].includes(planId)) {
      setPlanType(planId as PlanType);
    }
  }, [planId]);

  // Stripe setup
  const [clientSecret, setClientSecret] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  // Handle customer info input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  // Get plan details based on type and billing cycle
  const getPlanDetails = () => {
    if (planType === 'single_lesson') {
      return {
        name: 'Single Lesson Access',
        price: billingCycle === 'monthly' ? '€5' : '€40',
        cycle: billingCycle === 'monthly' ? 'month' : 'year',
        description: 'Access to a single lesson of your choice'
      };
    } else if (planType === 'whole_book') {
      return {
        name: 'Whole Book Access',
        price: billingCycle === 'monthly' ? '€25' : '€180',
        cycle: billingCycle === 'monthly' ? 'month' : 'year',
        description: 'Full access to an entire book of lessons'
      };
    } else if (planType === 'free_trial') {
      return {
        name: '7-Day Free Trial',
        price: 'Free',
        cycle: 'trial',
        description: 'Full access to the platform for 7 days'
      };
    } else {
      return {
        name: 'Printed Book Only',
        price: '€20',
        cycle: 'one-time',
        description: 'Physical book delivered to your address (+ delivery fee)'
      };
    }
  };

  const planDetails = getPlanDetails();

  // Create payment intent when plan type or billing cycle changes
  useEffect(() => {
    // Don't create a payment intent until customer enters their info
    if (!customerInfo.name || !customerInfo.email) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          planType, 
          billingCycle,
          bookIds: selectedBookIds.length > 0 ? selectedBookIds : undefined
        });
        
        const data = await response.json();
        
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          toast({
            title: "Error",
            description: "Could not initialize payment",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Error creating payment intent:", error);
        toast({
          title: "Error",
          description: "Failed to connect to payment service",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [planType, billingCycle, toast, customerInfo.name, customerInfo.email]);

  // Create Stripe Elements options
  const stripeOptions: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'stripe',
    },
  };

  // Initial customer information form
  const renderCustomerForm = () => (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Customer Information</CardTitle>
        <CardDescription>Please provide your details</CardDescription>
      </CardHeader>
      <CardContent>
        <form 
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setIsLoading(true);
          }}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              name="name" 
              placeholder="John Doe" 
              required 
              value={customerInfo.name}
              onChange={handleInputChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              name="email" 
              type="email" 
              placeholder="john@example.com" 
              required
              value={customerInfo.email}
              onChange={handleInputChange}
            />
          </div>

          {planType === 'printed_book' && (
            <>
              <Separator className="my-4" />
              <h3 className="font-medium mb-4">Shipping Address</h3>
              
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  name="address" 
                  placeholder="123 Example St" 
                  required
                  value={customerInfo.address}
                  onChange={handleInputChange}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input 
                    id="city" 
                    name="city" 
                    placeholder="City" 
                    required
                    value={customerInfo.city}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input 
                    id="postalCode" 
                    name="postalCode" 
                    placeholder="12345" 
                    required
                    value={customerInfo.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input 
                  id="country" 
                  name="country" 
                  placeholder="Country" 
                  required
                  value={customerInfo.country}
                  onChange={handleInputChange}
                />
              </div>
            </>
          )}

          <CardFooter className="flex justify-end px-0 pt-4">
            <Button type="submit" className="w-full">
              Continue to Payment
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );

  // Payment form with Stripe Elements
  const renderPaymentForm = () => (
    <Card className="md:col-span-1">
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Enter your payment information securely</CardDescription>
      </CardHeader>
      <CardContent>
        {clientSecret && (
          <Elements options={stripeOptions} stripe={stripePromise}>
            <CheckoutForm 
              planType={planType} 
              billingCycle={billingCycle} 
              planDetails={planDetails}
              customerInfo={customerInfo}
            />
          </Elements>
        )}
        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container max-w-4xl mx-auto py-10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-10 text-center">Checkout</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Order Summary */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Review your purchase details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{planDetails.name}</span>
                  <span className="font-bold text-lg">{planDetails.price}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {planDetails.cycle === 'one-time' 
                    ? 'One-time payment' 
                    : planDetails.cycle === 'trial'
                      ? '7-day free trial, then regular pricing applies'
                      : `Billed ${billingCycle} (${billingCycle === 'monthly' ? 'monthly' : 'annually'})`}
                </div>
                
                {selectedBookIds.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">
                      {selectedBookIds.length === 1 ? "Selected Book:" : "Selected Books:"}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedBookIds.map(bookId => (
                        <div key={bookId} className="text-primary font-bold bg-primary/10 px-2 py-1 rounded">
                          BOOK {bookId.toUpperCase()}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {planType === 'free_trial' && (
                  <div className="text-sm text-amber-600 mt-2 font-medium">
                    Note: A valid credit card is required to start your free trial. Your card will not be charged until the trial period ends.
                  </div>
                )}
                <p className="text-sm text-gray-600">{planDetails.description}</p>
                
                {/* Book Selection for whole_book plan */}
                {(planType === 'whole_book' || planType === 'single_lesson') && (
                  <div className="mt-4">
                    <Label className="font-medium mb-2 block">
                      {planType === 'whole_book' ? 'Select Books' : 'Select Book'}
                    </Label>
                    
                    {loadingBooks ? (
                      <div className="space-y-2 mt-2">
                        <Skeleton className="h-10 w-full" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    ) : availableBooks && availableBooks.length > 0 ? (
                      <div className="mt-2">
                        <ScrollArea className="h-44 rounded-md border p-2">
                          <div className="space-y-2">
                            {availableBooks.map((book: BookWithThumbnail) => (
                              <div 
                                key={book.bookId} 
                                className={`
                                  flex items-center justify-between p-2 rounded-md cursor-pointer
                                  ${selectedBookIds.includes(book.bookId) 
                                    ? 'bg-primary/10 border border-primary/30' 
                                    : 'bg-gray-50 hover:bg-gray-100 border border-transparent'}
                                `}
                                onClick={() => toggleBookSelection(book.bookId)}
                              >
                                <div className="flex items-center space-x-3">
                                  <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center">
                                    <Book size={16} className="text-primary" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{book.title}</div>
                                  </div>
                                </div>
                                
                                {selectedBookIds.includes(book.bookId) && (
                                  <Badge variant="outline" className="bg-primary/5">
                                    <Check size={14} className="mr-1 text-primary" />
                                    Selected
                                  </Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                        
                        {selectedBookIds.length === 0 && (
                          <div className="text-amber-600 text-sm mt-2">
                            Please select at least one book to continue.
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-500 text-sm mt-2">
                        No books available. Please try again later.
                      </div>
                    )}
                  </div>
                )}
                
                {(planType !== 'printed_book' && planType !== 'free_trial') && (
                  <div className="pt-4">
                    <Label className="font-medium mb-2 block">Billing Cycle</Label>
                    <div className="flex space-x-4">
                      <Button 
                        type="button" 
                        variant={billingCycle === 'monthly' ? 'default' : 'outline'}
                        onClick={() => setBillingCycle('monthly')}
                      >
                        Monthly
                      </Button>
                      <Button 
                        type="button" 
                        variant={billingCycle === 'yearly' ? 'default' : 'outline'}
                        onClick={() => setBillingCycle('yearly')}
                      >
                        Yearly (20% off)
                      </Button>
                    </div>
                  </div>
                )}

                {planType === 'printed_book' && (
                  <div className="pt-2 text-amber-600 font-medium text-sm">
                    Delivery fees will be calculated based on your location
                  </div>
                )}
              </div>

              <Separator className="my-6" />

              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{planDetails.price}{planType === 'printed_book' ? ' + delivery' : ''}</span>
              </div>
            </CardContent>
          </Card>

          {/* Customer Information or Payment Form */}
          {customerInfo.name && customerInfo.email ? renderPaymentForm() : renderCustomerForm()}
        </div>
      </motion.div>
    </div>
  );
}