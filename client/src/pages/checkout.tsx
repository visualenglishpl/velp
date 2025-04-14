import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { apiRequest } from '@/lib/queryClient';

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
          description: `Thank you for your purchase of ${planDetails.name}${
            selectedBookId 
              ? ` for ${bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`}` 
              : ''
          }!`,
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
        disabled={isProcessing || !stripe || !elements} 
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
  
  // Parse the URL query parameters to get the book ID
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  
  // Book title map for readable titles
  const bookTitles: Record<string, string> = {
    '0a': 'BOOK 0A - BEGINNERS ENGLISH',
    '0b': 'BOOK 0B - BEGINNERS ENGLISH', 
    '0c': 'BOOK 0C - BEGINNERS ENGLISH',
    '1': 'BOOK 1 - ELEMENTARY ENGLISH',
    '2': 'BOOK 2 - PRE-INTERMEDIATE ENGLISH',
    '3': 'BOOK 3 - INTERMEDIATE ENGLISH',
    '4': 'BOOK 4 - UPPER-INTERMEDIATE ENGLISH',
    '5': 'BOOK 5 - ADVANCED ENGLISH',
    '6': 'BOOK 6 - PROFICIENCY ENGLISH',
    '7': 'BOOK 7 - MASTERS ENGLISH'
  };

  useEffect(() => {
    // Parse URL query parameters
    const searchParams = new URLSearchParams(location.split('?')[1]);
    const bookParam = searchParams.get('book');
    if (bookParam) {
      setSelectedBookId(bookParam);
      console.log(`Selected book: ${bookParam}`);
    }
  }, [location]);
  
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
          bookId: selectedBookId || undefined
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
        <h1 className="text-3xl font-bold mb-10 text-center">
          {planType === 'whole_book' && selectedBookId 
            ? `${bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`} - Checkout` 
            : 'Checkout'}
        </h1>

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
                
                {selectedBookId && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">Selected Book:</div>
                    <div className="text-primary font-bold">
                      {bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`}
                    </div>
                  </div>
                )}
                
                {planType === 'free_trial' && (
                  <div className="text-sm text-amber-600 mt-2 font-medium">
                    Note: A valid credit card is required to start your free trial. Your card will not be charged until the trial period ends.
                  </div>
                )}
                <p className="text-sm text-gray-600">{planDetails.description}</p>
                
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