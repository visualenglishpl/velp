import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, CreditCard, ArrowLeft, CheckCircle, ShoppingBag, BookOpen, Book } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WithdrawalConsent from '@/components/checkout/WithdrawalConsent';
import UnitSelector from '@/components/checkout/UnitSelector';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';

interface PlanDetails {
  name: string;
  price: string;
  description: string;
  recurring: boolean;
  color: string;
}

interface CartItem {
  id: string;
  type: string;
  bookId: string;
  title: string;
  price: number;
}

export default function CheckoutPage() {
  const { toast } = useToast();
  const params = useParams();
  const [location, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [country, setCountry] = useState('Poland');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [consent, setConsent] = useState(false);
  const [planDetails, setPlanDetails] = useState<PlanDetails | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);

  // Parse query parameters
  const queryParams = new URLSearchParams(window.location.search);
  const bookIdParam = queryParams.get('book');
  const unitIdParam = queryParams.get('unit');
  
  // Get plan ID from params, URL or cart
  const planId = params.planId || 'default';
  const isFreeTrialPlan = planId === 'free_trial';
  const [selectedBookPurchaseType, setSelectedBookPurchaseType] = useState('physical');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('monthly');
  
  // Function to add multiple units to cart
  const addMultipleUnitsToCart = (bookId: string, unitNumbers: string[]) => {
    if (!unitNumbers.length) {
      toast({
        title: 'No units selected',
        description: 'Please select at least one unit to purchase.',
        variant: 'destructive'
      });
      return;
    }
    
    try {
      let cart: any[] = [];
      const storedCart = localStorage.getItem('visualEnglishCart');
      if (storedCart) {
        cart = JSON.parse(storedCart);
      }
      
      const formattedBookId = bookId.includes('0') 
        ? bookId.replace(/^0([a-c])$/, "0$1").toUpperCase() 
        : bookId;
        
      const isYearly = subscriptionPeriod === 'yearly';
      const unitPrice = isYearly ? 40 : 5;
      const period = isYearly ? 'year' : 'month';
      let addedCount = 0;
      
      // Add each selected unit to cart if not already there
      unitNumbers.forEach(unitNumber => {
        const unitInCart = cart.some((item: any) => 
          item.type === 'unit' && 
          item.bookId === bookId && 
          item.unitNumber === unitNumber
        );
        
        if (!unitInCart) {
          const newItem = {
            id: `book${bookId}-unit${unitNumber}-${subscriptionPeriod}`,
            type: 'unit',
            bookId,
            unitNumber,
            subscriptionPeriod,
            title: `Unit ${unitNumber} - Book ${formattedBookId} (${isYearly ? 'Yearly' : 'Monthly'})`,
            price: unitPrice,
          };
          
          cart.push(newItem);
          addedCount++;
        }
      });
      
      if (addedCount > 0) {
        localStorage.setItem('visualEnglishCart', JSON.stringify(cart));
        
        // Trigger cart update event for navbar
        window.dispatchEvent(new Event('storage'));
        
        toast({
          title: `${addedCount} units added to cart`,
          description: `${isYearly ? 'Yearly' : 'Monthly'} access for ${addedCount} units from Book ${formattedBookId} has been added to your cart (€${unitPrice * addedCount} total).`,
        });
      } else {
        toast({
          title: 'Units already in cart',
          description: 'All selected units are already in your cart.',
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add units to cart. Please try again.',
        variant: 'destructive'
      });
    }
  };
  
  // Function to add printed book to cart
  const addPrintedBookToCart = (bookId: string) => {
    try {
      let cart: any[] = [];
      const storedCart = localStorage.getItem('visualEnglishCart');
      if (storedCart) {
        cart = JSON.parse(storedCart);
      }
      
      // Check if book is already in cart
      const bookInCart = cart.some((item: any) => 
        item.type === 'printed_book' && item.bookId === bookId
      );
      
      if (!bookInCart) {
        const formattedBookId = bookId.includes('0') 
          ? bookId.replace(/^0([a-c])$/, "0$1").toUpperCase() 
          : bookId;
          
        const newItem = {
          id: `printed-book-${bookId}`,
          type: 'printed_book',
          bookId,
          title: `Printed Book ${formattedBookId}`,
          price: 20,
        };
        
        cart.push(newItem);
        localStorage.setItem('visualEnglishCart', JSON.stringify(cart));
        
        // Trigger cart update event for navbar
        window.dispatchEvent(new Event('storage'));
        
        toast({
          title: 'Book added to cart',
          description: `Printed Book ${formattedBookId} has been added to your cart.`,
        });
      } else {
        toast({
          title: 'Book already in cart',
          description: `This book is already in your cart.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add book to cart. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center mb-6">
          <Link href={planId === 'default' ? '/cart' : '/#pricing'}>
            <Button variant="outline" className="mr-4 flex items-center">
              <ArrowLeft size={16} className="mr-1" /> 
              {planId === 'default' ? 'Back to Cart' : 'Back to Plans'}
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">
            {planId === 'single_lesson' 
              ? `Unit Checkout - Book ${bookIdParam}` 
              : planId === 'whole_book'
                ? `Full Book Checkout - Book ${bookIdParam}`
                : planId === 'printed_book'
                  ? `Printed Book Checkout - Book ${bookIdParam}`
                  : planId === 'free_trial'
                    ? `Free 7-Day Trial - Book ${bookIdParam}`
                    : "Checkout"}
          </h1>
        </div>
        
        {isFreeTrialPlan && (
          <Card className="p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-full md:w-2/3">
                <h2 className="text-xl font-bold mb-3">Start Your Free 7-Day Trial</h2>
                <p className="text-gray-600 mb-4">
                  Enjoy full access to all 10 Visual English books for 7 days with 3 free downloads!
                  <br />A credit card is required to start your trial, but <strong>you won't be charged</strong> unless you choose to continue after the trial period.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      className="mt-1" 
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      className="mt-1" 
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input 
                      id="card-number" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)} 
                      className="mt-1" 
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input 
                        id="expiry" 
                        value={expiryDate} 
                        onChange={(e) => setExpiryDate(e.target.value)} 
                        className="mt-1" 
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input 
                        id="cvc" 
                        value={cvc} 
                        onChange={(e) => setCvc(e.target.value)} 
                        className="mt-1" 
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2 mt-4">
                    <Checkbox 
                      id="consent" 
                      checked={consent} 
                      onCheckedChange={(value) => setConsent(!!value)} 
                    />
                    <Label htmlFor="consent" className="text-sm">
                      I agree to the <Link href="/terms" className="text-blue-600 hover:underline">Terms and Conditions</Link> and understand that my free trial includes full access to all books with a limit of 3 downloads total. The trial will automatically convert to a paid monthly subscription (€25/month) after 7 days unless I cancel. I can cancel anytime during the trial period without being charged.
                    </Label>
                  </div>
                  
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 mt-4"
                    disabled={!name || !email || !cardNumber || !expiryDate || !cvc || !consent || isProcessing}
                    onClick={async () => {
                      try {
                        setIsProcessing(true);
                        
                        // Create a token for the card (simulating Stripe payment method for this mock implementation)
                        // In a real implementation, you would use Stripe Elements to securely collect and tokenize the payment details
                        const mockPaymentMethodId = `pm_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`;
                        
                        // Call the API to set up the free trial with automatic conversion to paid subscription
                        const response = await fetch('/api/setup-free-trial', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            email,
                            name,
                            paymentMethodId: mockPaymentMethodId,
                          }),
                        });
                        
                        const data = await response.json();
                        
                        if (!response.ok) {
                          throw new Error(data.error || 'Failed to set up free trial');
                        }
                        
                        toast({
                          title: "Free trial activated!",
                          description: "Your 7-day free trial has been activated! You now have full access to all 10 books with a limit of 3 downloads. After 7 days, your subscription will automatically convert to a €25/month plan unless canceled.",
                        });
                        setIsComplete(true);
                      } catch (error: any) {
                        console.error('Free trial setup error:', error);
                        toast({
                          title: "Error",
                          description: error.message || "Failed to start free trial. Please try again.",
                          variant: "destructive",
                        });
                      } finally {
                        setIsProcessing(false);
                      }
                    }}
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4 mr-2" />
                        Start My Free Trial
                      </>
                    )}
                  </Button>
                </div>
              </div>
              
              <div className="w-full md:w-1/3 bg-gray-50 p-4 rounded-lg">
                <h3 className="font-bold mb-3">What's Included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span>Full access to all 10 Visual English books</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span>All activities and interactive materials</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span>Teacher resources and lesson plans</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span>Limit of 3 downloads from any book</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 shrink-0" />
                    <span>No obligation to continue after trial</span>
                  </li>
                </ul>
                
                <div className="mt-6 p-3 bg-blue-50 border border-blue-100 rounded-md">
                  <p className="text-sm text-blue-700">
                    <strong>Remember:</strong> You won't be charged during the 7-day trial period. You can cancel anytime through your account settings.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
        
        {isComplete && isFreeTrialPlan && (
          <Card className="p-6 mb-6 border-green-200 bg-green-50">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">Free Trial Successfully Activated!</h2>
              <p className="text-gray-600 mb-4">
                Your 7-day free trial has been activated! You now have full access to all 10 Visual English books with a limit of 3 downloads total.
              </p>
              <p className="text-blue-600 font-medium mb-6">
                After 7 days, your trial will automatically convert to a monthly subscription of €25/month. You can cancel anytime during the trial period to avoid any charges.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => window.location.href = `/books/${bookIdParam}`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Start Learning Now
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.location.href = '/'}
                >
                  Return to Home
                </Button>
              </div>
            </div>
          </Card>
        )}
        
        {!isComplete && !isFreeTrialPlan && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {planId === 'single_lesson' 
                  ? 'Choose Unit Purchase Options'
                  : 'Add More Books to Your Order'}
              </h2>
            </div>
            
            {planId === 'single_lesson' ? (
              <Tabs defaultValue="subscription" className="mb-6">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="subscription" className="flex items-center">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Digital Access Options
                  </TabsTrigger>
                  <TabsTrigger value="physical" className="flex items-center">
                    <Book className="mr-2 h-4 w-4" />
                    Physical Book Option
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="subscription" className="pt-4">
                  <div className="text-sm text-gray-600 mb-4">
                    Choose your subscription period for unit access:
                  </div>
                  
                  <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 bg-gray-50 p-4 rounded-md">
                    <div 
                      className={`flex items-center w-full md:w-auto px-4 py-2 rounded-full cursor-pointer transition-all ${subscriptionPeriod === 'monthly' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-100'}`}
                      onClick={() => setSubscriptionPeriod('monthly')}
                    >
                      <input 
                        type="radio" 
                        id="unit-monthly" 
                        className="mr-2" 
                        checked={subscriptionPeriod === 'monthly'} 
                        onChange={() => setSubscriptionPeriod('monthly')}
                      />
                      <label htmlFor="unit-monthly" className="cursor-pointer flex-1 text-center">
                        Monthly (€5/month)
                      </label>
                    </div>
                    
                    <div 
                      className={`flex items-center w-full md:w-auto px-4 py-2 rounded-full cursor-pointer transition-all ${subscriptionPeriod === 'yearly' ? 'bg-blue-600 text-white font-medium' : 'bg-gray-100'}`}
                      onClick={() => setSubscriptionPeriod('yearly')}
                    >
                      <input 
                        type="radio" 
                        id="unit-yearly" 
                        className="mr-2" 
                        checked={subscriptionPeriod === 'yearly'} 
                        onChange={() => setSubscriptionPeriod('yearly')}
                      />
                      <label htmlFor="unit-yearly" className="cursor-pointer flex-1 text-center">
                        Yearly (€40/year - 33% savings)
                      </label>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="physical" className="pt-4">
                  <div className="text-gray-600 mb-4">
                    <p className="text-sm mb-2">
                      Instead of individual units, you can purchase the complete printed book:
                    </p>
                    
                    <div 
                      className="cursor-pointer p-4 border rounded-lg hover:border-primary hover:shadow-md transition-all flex items-center"
                      onClick={() => addPrintedBookToCart(bookIdParam || "")}
                    >
                      <img 
                        src={`/api/direct/content/icons/VISUAL ${bookIdParam}${bookIdParam === '3' ? ' ' : ''}.gif`}
                        alt={`Book ${bookIdParam}`}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-medium">Printed Book {bookIdParam}</h3>
                        <p className="text-sm text-gray-500">€20 + delivery</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            ) : (
              <div>
                {/* Book options go here */}
              </div>
            )}
          </div>
        )}

        {/* Unit Selector for single lesson purchases */}
        {planId === 'single_lesson' && bookIdParam && (
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Select Units to Purchase</h2>
            <p className="text-sm text-gray-600 mb-4">
              You can select multiple units from Book {bookIdParam} to purchase together.
            </p>
            <UnitSelector 
              bookId={bookIdParam} 
              initialSelectedUnit={unitIdParam || undefined}
              onUnitsSelected={setSelectedUnits} 
            />
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={() => addMultipleUnitsToCart(bookIdParam, selectedUnits)}
                disabled={selectedUnits.length === 0}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Add {selectedUnits.length} Unit{selectedUnits.length !== 1 ? 's' : ''} to Cart
              </Button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}