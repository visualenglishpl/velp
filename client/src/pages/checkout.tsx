import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch'; 
import { useToast } from '@/hooks/use-toast';
import { UnitSelection } from '@/components/UnitSelection';
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
  customerInfo,
  selectedBookId,
  bookTitles,
  selectedUnits = [],
  multipleUnits = false
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
  selectedBookId: string | null;
  bookTitles: Record<string, string>;
  selectedUnits?: string[];
  multipleUnits?: boolean;
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
          }${
            planType === 'single_lesson' && selectedUnits.length > 0
              ? ` (${selectedUnits.length > 1 ? `${selectedUnits.length} units` : `UNIT ${selectedUnits[0]}`})` 
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
  
  // Parse the URL query parameters to get the book ID and unit ID
  const [selectedBookId, setSelectedBookId] = useState<string | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [multipleBooks, setMultipleBooks] = useState<boolean>(false);
  
  // For single lesson selection
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [multipleUnits, setMultipleUnits] = useState<boolean>(false);
  
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
  
  // All available books in order with thumbnail paths and multiple fallback image paths
  const allBooks = [
    {
      id: '0a', 
      uniqueId: 'book-0a',
      title: 'BOOK 0A - BEGINNERS ENGLISH', 
      thumbnail: `/api/direct/book0a/icons/thumbnailsuni0a-1.png`, 
      fallbackImages: [
        `/api/direct/book0a/icons/thumbnailsuni0a-1.png`,
        `/api/direct/book0a/unit1/thumbnail.jpg`
      ]
    },
    {
      id: '0b', 
      uniqueId: 'book-0b',
      title: 'BOOK 0B - BEGINNERS ENGLISH', 
      thumbnail: `/api/direct/book0b/icons/thumbnailsuni0b-1.png`, 
      fallbackImages: [
        `/api/direct/book0b/icons/thumbnailsuni0b-1.png`,
        `/api/direct/book0b/unit1/thumbnail.jpg`
      ]
    },
    {
      id: '0c', 
      uniqueId: 'book-0c',
      title: 'BOOK 0C - BEGINNERS ENGLISH', 
      thumbnail: `/api/direct/book0c/icons/thumbnailsuni0c-1.png`, 
      fallbackImages: [
        `/api/direct/book0c/icons/thumbnailsuni0c-1.png`,
        `/api/direct/book0c/unit1/thumbnail.jpg`
      ]
    },
    {
      id: '1', 
      uniqueId: 'book-1',
      title: 'BOOK 1 - ELEMENTARY ENGLISH', 
      thumbnail: `/api/direct/book1/unit1/thumbnail.jpg`, 
      fallbackImages: [
        `/api/direct/book1/unit1/thumbnail.jpg`,
        `/api/direct/book1/unit4/thumbnail.jpg`,
        `/api/direct/book1/unit1/assets/00 E.png`
      ]
    },
    {
      id: '2', 
      uniqueId: 'book-2',
      title: 'BOOK 2 - PRE-INTERMEDIATE ENGLISH', 
      thumbnail: `/api/direct/book2/unit1/thumbnail.jpg`, 
      fallbackImages: [
        `/api/direct/book2/unit4/thumbnail.jpg`,
        `/api/direct/book2/unit8/thumbnail.jpg`,
        `/api/direct/book2/unit1/assets/00 E.png`
      ]
    },
    {
      id: '3', 
      uniqueId: 'book-3',
      title: 'BOOK 3 - INTERMEDIATE ENGLISH', 
      thumbnail: `/api/direct/book3/unit1/thumbnail.jpg`, 
      fallbackImages: [
        `/api/direct/book3/unit4/thumbnail.jpg`,
        `/api/direct/book3/unit8/thumbnail.jpg`,
        `/api/direct/book3/unit1/assets/00 E.png`
      ]
    },
    {
      id: '4', 
      uniqueId: 'book-4',
      title: 'BOOK 4 - UPPER-INTERMEDIATE ENGLISH', 
      thumbnail: `/api/direct/book4/unit14/thumbnail.png`, 
      fallbackImages: [
        `/api/direct/book4/unit14/thumbnail.png`,
        `/api/direct/book4/unit1/thumbnail.jpg`,
        `/api/direct/book4/unit1/assets/00 E.png`
      ]
    },
    {
      id: '5', 
      uniqueId: 'book-5',
      title: 'BOOK 5 - ADVANCED ENGLISH', 
      thumbnail: `/api/direct/book5/unit8/00 A.png`, 
      fallbackImages: [
        `/api/direct/book5/unit8/00 A.png`,
        `/api/direct/book5/unit13/00 A.png`,
        `/api/direct/book5/unit1/assets/00 E.png`
      ]
    },
    {
      id: '6', 
      uniqueId: 'book-6',
      title: 'BOOK 6 - PROFICIENCY ENGLISH', 
      thumbnail: `/api/direct/book6/unit8/title.png`, 
      fallbackImages: [
        `/api/direct/book6/unit8/title.png`,
        `/api/direct/book6/unit13/title.png`,
        `/api/direct/book6/unit1/assets/00 E.png`
      ]
    },
    {
      id: '7', 
      uniqueId: 'book-7',
      title: 'BOOK 7 - MASTERS ENGLISH', 
      thumbnail: `/api/direct/book7/unit1/thumbnail.jpg`, 
      fallbackImages: [
        `/api/direct/book7/unit4/thumbnail.jpg`,
        `/api/direct/book7/unit8/thumbnail.jpg`,
        `/api/direct/book7/unit1/assets/00 E.png`
      ]
    }
  ];

  // Get book ID and unit ID from URL parameters
  useEffect(() => {
    // Parse URL query parameters
    console.log('Current location URL:', location);
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    const bookParam = searchParams.get('book');
    const unitParam = searchParams.get('unit');
    
    console.log('URL Parameters:', { book: bookParam, unit: unitParam, planType });
    
    if (bookParam) {
      setSelectedBookId(bookParam);
      console.log(`Selected book: ${bookParam}`);
      
      // For single lesson access, also track the unit
      if (unitParam && planType === 'single_lesson') {
        setSelectedUnitId(unitParam);
        setSelectedUnits([unitParam]); // Initialize the array with the selected unit
        console.log(`Selected unit: ${unitParam}`);
      } else if (planType === 'single_lesson') {
        // If we're in single lesson mode with a book but no unit, default to unit 1
        console.log('No unit specified, defaulting to unit 1');
        setSelectedUnitId('1');
        setSelectedUnits(['1']);
      }
    }
  }, [location, planType]);
  
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

    // For whole book checkout, we need either a selected book or multiple books
    if (planType === 'whole_book' && !selectedBookId && (!multipleBooks || selectedBooks.length === 0)) {
      setIsLoading(false);
      return;
    }
    
    // For single lesson checkout, we need a book and at least one selected unit
    if (planType === 'single_lesson' && (!selectedBookId || selectedUnits.length === 0)) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    const createPaymentIntent = async () => {
      try {
        const response = await apiRequest("POST", "/api/create-payment-intent", { 
          planType, 
          billingCycle,
          bookId: selectedBookId || undefined,
          bookIds: multipleBooks ? selectedBooks : undefined,
          multipleBooks: multipleBooks,
          // Include unit information for single lesson purchases
          unitIds: planType === 'single_lesson' ? selectedUnits : undefined,
          multipleUnits: planType === 'single_lesson' && selectedUnits.length > 1
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
  }, [planType, billingCycle, toast, customerInfo.name, customerInfo.email, selectedBookId, multipleBooks, selectedBooks, selectedUnits]);

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
        {/* Unit Selection UI that appears directly in the checkout form */}
        {planType === 'single_lesson' && (
          <div className="mb-6 border-b pb-6">
            <UnitSelection
              selectedBookId={selectedBookId}
              selectedUnits={selectedUnits}
              setSelectedUnits={setSelectedUnits}
              multipleUnits={multipleUnits}
              setMultipleUnits={setMultipleUnits}
              billingCycle={billingCycle}
              bookOptions={allBooks}
              onSelectBook={setSelectedBookId}
            />
          </div>
        )}

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
              selectedBookId={selectedBookId}
              bookTitles={bookTitles}
              selectedUnits={selectedUnits}
              multipleUnits={multipleUnits}
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
            : planType === 'single_lesson' && selectedBookId
              ? `Single Lesson - ${bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`}`
              : 'Checkout'}
        </h1>

        {/* Unit Selection for Single Lesson plan */}
        {planType === 'single_lesson' && selectedBookId && (
          <div className="md:col-span-2 mb-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Select Units</CardTitle>
                    <CardDescription>Choose which units you want to purchase access for</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="multipleUnits" className="cursor-pointer">Add more units</Label>
                    <input 
                      type="checkbox" 
                      id="multipleUnits" 
                      className="cursor-pointer form-checkbox h-5 w-5 text-primary" 
                      checked={multipleUnits}
                      onChange={(e) => {
                        setMultipleUnits(e.target.checked);
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 md:grid-cols-9 gap-2">
                  {(() => {
                    // Determine the number of units based on the book ID
                    let unitCount = 10; // Default
                    
                    if (['0a', '0b', '0c'].includes(selectedBookId)) {
                      unitCount = 20;
                    } else if (['1', '2', '3'].includes(selectedBookId)) {
                      unitCount = 18;
                    } else if (['4', '5', '6', '7'].includes(selectedBookId)) {
                      unitCount = 16;
                    }
                    
                    // Generate unit elements
                    const unitElements = [];
                    for (let i = 1; i <= unitCount; i++) {
                      const unitId = i.toString();
                      const isSelected = selectedUnits.includes(unitId);
                      
                      unitElements.push(
                        <Card
                          key={unitId}
                          className={`cursor-pointer border-2 overflow-hidden hover:bg-gray-50 ${
                            isSelected ? 'border-primary' : 'border-transparent'
                          }`}
                          onClick={() => {
                            if (multipleUnits) {
                              // Toggle unit selection when multiple units are allowed
                              setSelectedUnits(prev => 
                                prev.includes(unitId)
                                  ? prev.filter(id => id !== unitId)
                                  : [...prev, unitId]
                              );
                            } else {
                              // Select only this unit
                              setSelectedUnits([unitId]);
                              setSelectedUnitId(unitId);
                            }
                          }}
                        >
                          <div className="p-2 text-center">
                            <div className="font-bold">
                              {isSelected && (
                                <span className="text-primary mr-1">✓</span>
                              )}
                              UNIT {unitId}
                            </div>
                          </div>
                        </Card>
                      );
                    }
                    
                    return unitElements;
                  })()}
                </div>
                <div className="mt-4 text-center text-sm text-gray-500">
                  {selectedUnits.length > 0 && (
                    <p>
                      Selected: {selectedUnits.map(unitId => `UNIT ${unitId}`).join(', ')}
                      {selectedUnits.length > 1 && (
                        <span className="font-medium text-primary ml-2">
                          Total: €{billingCycle === 'monthly' ? 5 * selectedUnits.length : 40 * selectedUnits.length}
                        </span>
                      )}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Show book selection grid when on whole book plan with no selection */}
        {planType === 'whole_book' && (
          <div className="md:col-span-2 mb-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Select Book(s)</CardTitle>
                    <CardDescription>Choose which book(s) you want to purchase full access for</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="multipleBooks" className="cursor-pointer">Buy multiple books</Label>
                    <input 
                      type="checkbox" 
                      id="multipleBooks" 
                      className="cursor-pointer form-checkbox h-5 w-5 text-primary" 
                      checked={multipleBooks}
                      onChange={(e) => {
                        setMultipleBooks(e.target.checked);
                        // When switching to single mode but multiple books are selected
                        if (!e.target.checked && selectedBooks.length > 0) {
                          setSelectedBookId(selectedBooks[0]);
                          setSelectedBooks([]);
                        }
                        // When switching to multiple mode with a selected book
                        if (e.target.checked && selectedBookId) {
                          setSelectedBooks([selectedBookId]);
                          setSelectedBookId(null);
                        }
                      }}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                  {allBooks.map((book) => (
                    <Card 
                      key={book.id}
                      className={`overflow-hidden cursor-pointer hover:bg-gray-50 transition-colors border-2 ${
                        multipleBooks 
                          ? selectedBooks.includes(book.id) ? 'border-primary' : 'border-transparent'
                          : selectedBookId === book.id ? 'border-primary' : 'border-transparent'
                      }`}
                      onClick={() => {
                        if (multipleBooks) {
                          // Toggle book selection for multiple mode
                          setSelectedBooks(prev => 
                            prev.includes(book.id)
                              ? prev.filter(id => id !== book.id)
                              : [...prev, book.id]
                          );
                        } else {
                          // Single book selection
                          setSelectedBookId(book.id);
                        }
                      }}
                    >
                      <div className="relative aspect-square w-full overflow-hidden">
                        {multipleBooks && (
                          <div className="absolute top-2 right-2 z-10">
                            <input 
                              type="checkbox" 
                              className="form-checkbox h-5 w-5 text-primary border-2 border-primary rounded"
                              checked={selectedBooks.includes(book.id)}
                              onChange={(e) => {
                                e.stopPropagation();
                                if (e.target.checked) {
                                  setSelectedBooks(prev => [...prev, book.id]);
                                } else {
                                  setSelectedBooks(prev => prev.filter(id => id !== book.id));
                                }
                              }}
                            />
                          </div>
                        )}
                        <img 
                          src={book.thumbnail} 
                          alt={`Book ${book.id.toUpperCase()} thumbnail`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Try each fallback image in sequence
                            const img = e.target as HTMLImageElement;
                            const currentSrc = img.src;
                            const fallbacks = book.fallbackImages || [];
                            
                            // Find the index of the current source in fallbacks
                            const currentIndex = fallbacks.findIndex(src => currentSrc.includes(src));
                            
                            // If we found the current source and there are more fallbacks, try the next one
                            if (currentIndex >= 0 && currentIndex < fallbacks.length - 1) {
                              img.src = fallbacks[currentIndex + 1];
                            } else if (currentIndex === -1 && fallbacks.length > 0) {
                              // If not found in fallbacks but we have fallbacks, try the first one
                              img.src = fallbacks[0];
                            } else {
                              // Last resort - use a solid color background with book ID text
                              console.log('All fallbacks failed for book', book.id);
                              img.onerror = null; // Prevent infinite error loop
                              
                              // Create a data URL for a colored rectangle with text
                              const canvas = document.createElement('canvas');
                              canvas.width = 200;
                              canvas.height = 200;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.fillStyle = '#f3f4f6'; // Light gray background
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = '#6366f1'; // Primary color text
                                ctx.font = 'bold 24px Arial';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(`BOOK ${book.id.toUpperCase()}`, canvas.width/2, canvas.height/2);
                                img.src = canvas.toDataURL();
                              }
                            }
                          }}
                        />
                      </div>
                      <CardContent className="p-2">
                        <div className="text-center">
                          <div className="font-bold text-sm text-primary">BOOK {book.id.toUpperCase()}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

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
                
                {/* Single lesson with unit selection */}
                {planType === 'single_lesson' && selectedBookId && selectedUnits.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">Selected Book:</div>
                    <div className="text-primary font-bold">
                      {bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`}
                    </div>
                    <div className="flex mt-2">
                      <div className="w-16 h-16 overflow-hidden rounded">
                        <img 
                          src={allBooks.find(b => b.id === selectedBookId)?.thumbnail || ''}
                          alt={`${selectedBookId.toUpperCase()} thumbnail`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            const book = allBooks.find(b => b.id === selectedBookId);
                            
                            if (book?.fallbackImages && book.fallbackImages.length > 0) {
                              img.src = book.fallbackImages[0];
                            } else {
                              img.onerror = null; // Prevent infinite error loop
                              const canvas = document.createElement('canvas');
                              canvas.width = 100;
                              canvas.height = 100;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.fillStyle = '#f3f4f6'; // Light gray background
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = '#6366f1'; // Primary color text
                                ctx.font = 'bold 16px Arial';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(`BOOK ${selectedBookId.toUpperCase()}`, canvas.width/2, canvas.height/2);
                                img.src = canvas.toDataURL();
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium mt-1 text-sm">Selected Units:</div>
                        <div className="flex flex-wrap gap-1 mt-1 max-w-xs">
                          {selectedUnits.map(unitId => (
                            <div key={unitId} className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs font-medium">
                              UNIT {unitId}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {selectedUnits.length > 1 && (
                      <div className="mt-2 text-sm flex justify-between items-center font-medium">
                        <span>Multiple units selected:</span>
                        <span className="text-right font-bold">
                          {selectedUnits.length} units × {billingCycle === 'monthly' ? '€5' : '€40'} = 
                          <span className="text-primary ml-1">
                            €{billingCycle === 'monthly' ? 5 * selectedUnits.length : 40 * selectedUnits.length}
                          </span>
                        </span>
                      </div>
                    )}
                  </div>
                )}
                
                {/* Single book selection for whole book plan */}
                {!multipleBooks && selectedBookId && planType !== 'single_lesson' && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">Selected Book:</div>
                    <div className="text-primary font-bold">
                      {bookTitles[selectedBookId] || `BOOK ${selectedBookId.toUpperCase()}`}
                    </div>
                    <div className="flex mt-2">
                      <div className="w-16 h-16 overflow-hidden rounded">
                        <img 
                          src={allBooks.find(b => b.id === selectedBookId)?.thumbnail || ''}
                          alt={`${selectedBookId.toUpperCase()} thumbnail`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            const img = e.target as HTMLImageElement;
                            const book = allBooks.find(b => b.id === selectedBookId);
                            
                            if (book?.fallbackImages && book.fallbackImages.length > 0) {
                              img.src = book.fallbackImages[0];
                            } else {
                              img.onerror = null; // Prevent infinite error loop
                              // Create a data URL for a colored rectangle with text
                              const canvas = document.createElement('canvas');
                              canvas.width = 100;
                              canvas.height = 100;
                              const ctx = canvas.getContext('2d');
                              if (ctx) {
                                ctx.fillStyle = '#f3f4f6'; // Light gray background
                                ctx.fillRect(0, 0, canvas.width, canvas.height);
                                ctx.fillStyle = '#6366f1'; // Primary color text
                                ctx.font = 'bold 16px Arial';
                                ctx.textAlign = 'center';
                                ctx.textBaseline = 'middle';
                                ctx.fillText(`BOOK ${selectedBookId.toUpperCase()}`, canvas.width/2, canvas.height/2);
                                img.src = canvas.toDataURL();
                              }
                            }
                          }}
                        />
                      </div>
                      <div className="ml-3">
                        <div className="text-xs text-gray-700 font-medium">
                          {planType === 'whole_book' ? 'Complete book access' : 'Access to all lessons'}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {planType === 'whole_book' ? 
                            'Includes all lessons and materials' : 
                            'Unlimited access to all content'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Multiple books selection */}
                {multipleBooks && selectedBooks.length > 0 && (
                  <div className="mt-2 p-3 bg-gray-50 rounded-md">
                    <div className="font-medium text-sm">Selected Books ({selectedBooks.length}):</div>
                    <div className="space-y-2 mt-2 max-h-60 overflow-y-auto pr-1">
                      {selectedBooks.map(bookId => (
                        <div key={bookId} className="flex items-center py-2 border-b border-gray-100 last:border-b-0">
                          <div className="w-12 h-12 overflow-hidden rounded">
                            <img 
                              src={allBooks.find(b => b.id === bookId)?.thumbnail || ''}
                              alt={`${bookId.toUpperCase()} thumbnail`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                const img = e.target as HTMLImageElement;
                                const book = allBooks.find(b => b.id === bookId);
                                
                                if (book?.fallbackImages && book.fallbackImages.length > 0) {
                                  img.src = book.fallbackImages[0];
                                } else {
                                  img.onerror = null; // Prevent infinite error loop
                                  const canvas = document.createElement('canvas');
                                  canvas.width = 60;
                                  canvas.height = 60;
                                  const ctx = canvas.getContext('2d');
                                  if (ctx) {
                                    ctx.fillStyle = '#f3f4f6'; // Light gray background
                                    ctx.fillRect(0, 0, canvas.width, canvas.height);
                                    ctx.fillStyle = '#6366f1'; // Primary color text
                                    ctx.font = 'bold 12px Arial';
                                    ctx.textAlign = 'center';
                                    ctx.textBaseline = 'middle';
                                    ctx.fillText(`BOOK ${bookId.toUpperCase()}`, canvas.width/2, canvas.height/2);
                                    img.src = canvas.toDataURL();
                                  }
                                }
                              }}
                            />
                          </div>
                          <div className="ml-3 flex-1">
                            <div className="text-sm text-primary font-bold">
                              {bookTitles[bookId] || `BOOK ${bookId.toUpperCase()}`}
                            </div>
                            <div className="text-xs text-gray-600 mt-0.5">Complete book access</div>
                          </div>
                          <button 
                            className="text-gray-400 hover:text-red-500"
                            onClick={() => setSelectedBooks(prev => prev.filter(id => id !== bookId))}
                            type="button"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M18 6L6 18"></path>
                              <path d="M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 text-xs text-gray-500">
                      Each book includes all lessons and materials
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

              {/* Calculate discount for yearly payments with 3+ books */}
              {multipleBooks && selectedBooks.length >= 3 && billingCycle === 'yearly' ? (
                <>
                  <div className="flex justify-between items-baseline">
                    <span className="font-medium">Subtotal</span>
                    <span className="text-gray-500 line-through">€{selectedBooks.length * 180}</span>
                  </div>
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="font-medium text-green-600">Bulk Discount (10%)</span>
                    <span className="text-green-600">-€{Math.round(selectedBooks.length * 180 * 0.10)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Total</span>
                    <span>€{Math.round(selectedBooks.length * 180 * 0.90)}</span>
                  </div>
                  <div className="text-xs text-green-600 text-right mt-1">
                    You save €{Math.round(selectedBooks.length * 180 * 0.10)} with 10% bulk discount
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>
                      {multipleBooks && selectedBooks.length > 0 
                        ? `€${selectedBooks.length * (billingCycle === 'monthly' ? 25 : 180)}`
                        : planType === 'single_lesson' && selectedUnits.length > 1
                          ? `€${selectedUnits.length * (billingCycle === 'monthly' ? 5 : 40)}`
                          : `${planDetails.price}${planType === 'printed_book' ? ' + delivery' : ''}`
                      }
                    </span>
                  </div>
                  
                  {multipleBooks && selectedBooks.length > 0 && (
                    <div className="text-xs text-gray-500 text-right mt-1">
                      {selectedBooks.length} {selectedBooks.length === 1 ? 'book' : 'books'} × {billingCycle === 'monthly' ? '€25' : '€180'} {billingCycle === 'monthly' ? 'monthly' : 'yearly'}
                    </div>
                  )}
                  
                  {planType === 'single_lesson' && selectedUnits.length > 1 && (
                    <div className="text-xs text-gray-500 text-right mt-1">
                      {selectedUnits.length} units × {billingCycle === 'monthly' ? '€5' : '€40'} {billingCycle === 'monthly' ? 'monthly' : 'yearly'}
                    </div>
                  )}
                </>
              )}
              
              {/* Show special offer notice for yearly plans */}
              {billingCycle === 'yearly' && multipleBooks && selectedBooks.length > 0 && selectedBooks.length < 3 && (
                <div className="text-xs text-amber-600 text-right mt-2">
                  Add {3 - selectedBooks.length} more {3 - selectedBooks.length === 1 ? 'book' : 'books'} to get a 10% bulk discount!
                </div>
              )}
            </CardContent>
          </Card>

          {/* Customer Information or Payment Form */}
          {customerInfo.name && customerInfo.email ? renderPaymentForm() : renderCustomerForm()}
        </div>
      </motion.div>
    </div>
  );
}