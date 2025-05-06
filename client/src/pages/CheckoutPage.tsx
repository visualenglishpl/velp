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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

  // Get plan ID from params or cart
  const planId = params.planId || 'default';
  const [selectedBookPurchaseType, setSelectedBookPurchaseType] = useState('physical');
  const [subscriptionPeriod, setSubscriptionPeriod] = useState('monthly');

  // Function to add digital book access to cart
  const addDigitalAccessToCart = (bookId: string) => {
    try {
      let cart = [];
      const storedCart = localStorage.getItem('visualEnglishCart');
      if (storedCart) {
        cart = JSON.parse(storedCart);
      }
      
      // Check if digital access for this book is already in cart
      const accessInCart = cart.some((item: any) => 
        item.type === 'digital_access' && item.bookId === bookId
      );
      
      if (!accessInCart) {
        const formattedBookId = bookId.includes('0') 
          ? bookId.replace(/^0([a-c])$/, "0$1").toUpperCase() 
          : bookId;
          
        const isYearly = subscriptionPeriod === 'yearly';
        const price = isYearly ? 180 : 25;
        const period = isYearly ? 'year' : 'month';
        
        const newItem = {
          id: `digital-access-${bookId}-${subscriptionPeriod}`,
          type: 'digital_access',
          bookId,
          subscriptionPeriod,
          title: `Full Digital Access - Book ${formattedBookId} (${isYearly ? 'Yearly' : 'Monthly'})`,
          price,
        };
        
        cart.push(newItem);
        localStorage.setItem('visualEnglishCart', JSON.stringify(cart));
        
        // Trigger cart update event for navbar
        window.dispatchEvent(new Event('storage'));
        
        toast({
          title: 'Digital access added to cart',
          description: `${isYearly ? 'Yearly' : 'Monthly'} digital access for Book ${formattedBookId} has been added to your cart (€${price}/${period}).`,
        });
      } else {
        toast({
          title: 'Already in cart',
          description: `Digital access for this book is already in your cart.`,
        });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add digital access to cart. Please try again.',
        variant: 'destructive'
      });
    }
  };

  // Function to add physical book to cart
  const addBookToCart = (bookId: string) => {
    try {
      let cart = [];
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

  // Calculate delivery fee for physical books (20 zł for DPD courier)
  const calculateDeliveryFee = (items: CartItem[]): number => {
    // If there's at least one physical book, add delivery fee
    const hasPhysicalBook = items.some(item => item.type === 'printed_book');
    return hasPhysicalBook ? 20 : 0;
  };

  // Calculate total with delivery
  const calculateTotalWithDelivery = (items: CartItem[]): number => {
    const subtotal = items.reduce((total, item) => total + item.price, 0);
    const deliveryFee = calculateDeliveryFee(items);
    return subtotal + deliveryFee;
  };

  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      const storedCart = localStorage.getItem('visualEnglishCart');
      if (storedCart) {
        try {
          const cart = JSON.parse(storedCart);
          setCartItems(cart);
        } catch (error) {
          console.error('Failed to parse cart data', error);
          setCartItems([]);
        }
      }
    };

    loadCart();
    
    // Listen for storage changes (when items are added to cart)
    const handleStorageChange = () => {
      loadCart();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    // In a real app, this would fetch from an API
    // For demonstration, we'll use hardcoded values
    const plans: Record<string, PlanDetails> = {
      'single_lesson': {
        name: 'Single Lesson Access',
        price: '€5/month',
        description: 'Access to one complete lesson with all resources',
        recurring: true,
        color: '#2e88f6'
      },
      'whole_book': {
        name: 'Whole Book Access',
        price: '€25/month',
        description: 'Full access to all units in one book',
        recurring: true,
        color: '#b23cfd'
      },
      'printed_book': {
        name: 'Printed Book',
        price: '€20 + delivery',
        description: 'Physical copy of the book',
        recurring: false,
        color: '#00c971'
      },
      'free_trial': {
        name: 'Free Trial',
        price: 'Free for 7 days',
        description: 'Full access to all features for 7 days',
        recurring: true,
        color: '#ff9d22'
      },
      'default': {
        name: 'Cart Checkout',
        price: 'Multiple items',
        description: 'Complete your purchase',
        recurring: false,
        color: '#5046e4'
      }
    };

    setPlanDetails(plans[planId] || plans.default);
  }, [planId]);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!consent) {
      toast({
        title: "Consent required",
        description: "Please accept the terms and withdrawal consent to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
      
      // In a real app, we would call an API to process the payment
      toast({
        title: "Payment successful",
        description: "Your purchase has been completed successfully.",
      });
      
      // Clear cart if this was a cart checkout
      if (planId === 'default') {
        localStorage.removeItem('visualEnglishCart');
      }
      
      // In a real app, we would redirect to a success page or dashboard
      setTimeout(() => {
        setLocation('/');
      }, 3000);
    }, 2000);
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
          <h1 className="text-3xl font-bold">Checkout</h1>
        </div>
        
        {!isComplete && planDetails && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Add More Books to Your Order</h2>
            </div>
            
            <Tabs defaultValue="physical" className="mb-6" onValueChange={setSelectedBookPurchaseType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="physical" className="flex items-center">
                  <Book className="mr-2 h-4 w-4" />
                  Physical Books (€20)
                </TabsTrigger>
                <TabsTrigger value="digital" className="flex items-center">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Full Digital Access (€25)
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="physical" className="pt-4">
                <div className="text-sm text-gray-600 mb-4">
                  Purchase physical copies of our books - delivered right to your door
                </div>
                
                <div className="mb-4">
                  <div className="grid grid-cols-3 md:grid-cols-10 gap-3">
                    {[
                      { id: '0a', name: 'Book 0A' },
                      { id: '0b', name: 'Book 0B' },
                      { id: '0c', name: 'Book 0C' },
                      { id: '1', name: 'Book 1' },
                      { id: '2', name: 'Book 2' },
                      { id: '3', name: 'Book 3' },
                      { id: '4', name: 'Book 4' },
                      { id: '5', name: 'Book 5' },
                      { id: '6', name: 'Book 6' },
                      { id: '7', name: 'Book 7' }
                    ].map(book => (
                      <div 
                        key={book.id} 
                        className="cursor-pointer"
                        onClick={() => addBookToCart(book.id)}
                      >
                        <div className="relative rounded-md overflow-hidden border hover:border-primary hover:shadow-md transition-all">
                          <img 
                            src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                            alt={book.name}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1.5 text-white text-[10px] text-center font-medium flex items-center justify-center">
                            <ShoppingBag size={10} className="mr-1" />
                            Add to Basket (€20)
                          </div>
                        </div>
                        <div className="mt-1 text-center text-xs font-medium">{book.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="digital" className="pt-4">
                <div className="text-sm text-gray-600 mb-4">
                  Get full digital access to our books - instant online access to all materials
                </div>
                
                <div className="flex items-center justify-center space-x-4 mb-6 bg-gray-50 p-3 rounded-md">
                  <div 
                    className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all ${subscriptionPeriod === 'monthly' ? 'bg-primary text-white font-medium' : 'bg-gray-100'}`}
                    onClick={() => setSubscriptionPeriod('monthly')}
                  >
                    <input 
                      type="radio" 
                      id="monthly" 
                      className="mr-2" 
                      checked={subscriptionPeriod === 'monthly'} 
                      onChange={() => setSubscriptionPeriod('monthly')}
                    />
                    <label htmlFor="monthly" className="cursor-pointer">
                      Monthly (€25/month)
                    </label>
                  </div>
                  
                  <div 
                    className={`flex items-center px-4 py-2 rounded-full cursor-pointer transition-all ${subscriptionPeriod === 'yearly' ? 'bg-primary text-white font-medium' : 'bg-gray-100'}`}
                    onClick={() => setSubscriptionPeriod('yearly')}
                  >
                    <input 
                      type="radio" 
                      id="yearly" 
                      className="mr-2" 
                      checked={subscriptionPeriod === 'yearly'} 
                      onChange={() => setSubscriptionPeriod('yearly')}
                    />
                    <label htmlFor="yearly" className="cursor-pointer">
                      Yearly (€180/year - 40% savings)
                    </label>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="grid grid-cols-3 md:grid-cols-10 gap-3">
                    {[
                      { id: '0a', name: 'Book 0A' },
                      { id: '0b', name: 'Book 0B' },
                      { id: '0c', name: 'Book 0C' },
                      { id: '1', name: 'Book 1' },
                      { id: '2', name: 'Book 2' },
                      { id: '3', name: 'Book 3' },
                      { id: '4', name: 'Book 4' },
                      { id: '5', name: 'Book 5' },
                      { id: '6', name: 'Book 6' },
                      { id: '7', name: 'Book 7' }
                    ].map(book => (
                      <div 
                        key={book.id} 
                        className="cursor-pointer"
                        onClick={() => addDigitalAccessToCart(book.id)}
                      >
                        <div className="relative rounded-md overflow-hidden border hover:border-primary hover:shadow-md transition-all">
                          <img 
                            src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                            alt={book.name}
                            className="w-full aspect-square object-cover"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-1.5 text-white text-[10px] text-center font-medium flex items-center justify-center">
                            <BookOpen size={10} className="mr-1" />
                            Full Access (€{subscriptionPeriod === 'yearly' ? '180/year' : '25/month'})
                          </div>
                        </div>
                        <div className="mt-1 text-center text-xs font-medium">{book.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {isComplete ? (
          <Card className="p-8 text-center">
            <div className="flex flex-col items-center justify-center py-12">
              <CheckCircle size={64} className="text-green-500 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Payment Successful!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Thank you for your purchase. You will receive an email confirmation shortly.
              </p>
              <Link href="/">
                <Button>Continue to Homepage</Button>
              </Link>
            </div>
          </Card>
        ) : planDetails ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Payment Information</h2>
                <form onSubmit={handleCheckout}>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="email@example.com" 
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="name">Cardholder Name</Label>
                        <Input 
                          id="name" 
                          placeholder="John Smith" 
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input 
                          id="cardNumber" 
                          placeholder="1234 5678 9012 3456" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input 
                            id="expiryDate" 
                            placeholder="MM/YY" 
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="cvc">CVC</Label>
                          <Input 
                            id="cvc" 
                            placeholder="123" 
                            value={cvc}
                            onChange={(e) => setCvc(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Country</Label>
                        <Select 
                          value={country} 
                          onValueChange={setCountry}
                        >
                          <SelectTrigger id="country">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Poland">Poland</SelectItem>
                            <SelectItem value="Germany">Germany</SelectItem>
                            <SelectItem value="France">France</SelectItem>
                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                            <SelectItem value="Spain">Spain</SelectItem>
                            <SelectItem value="Italy">Italy</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <WithdrawalConsent 
                      checked={consent}
                      onChange={setConsent}
                    />
                    
                    <Button 
                      type="submit" 
                      className="w-full mt-6 py-6 text-lg"
                      style={{ backgroundColor: planDetails.color }}
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing...
                        </>
                      ) : (
                        <>
                          <CreditCard className="mr-2" size={20} />
                          Complete Payment
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
            
            <div>
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                
                {planId === 'default' ? (
                  // Cart checkout - show all items
                  <div className="border-b pb-4 mb-4">
                    {cartItems.length > 0 ? (
                      <div className="space-y-3">
                        {cartItems.map((item, index) => (
                          <div key={item.id} className={`flex justify-between items-center ${index !== cartItems.length - 1 ? 'pb-2 border-b border-gray-100' : ''}`}>
                            <div className="flex items-center">
                              <div className="w-8 h-8 relative overflow-hidden rounded mr-2">
                                <img 
                                  src={`/api/direct/content/icons/VISUAL ${item.bookId}${item.bookId === '3' ? ' ' : ''}.gif`}
                                  alt={item.title}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                              <span className="text-sm">{item.title}</span>
                            </div>
                            <span className="font-medium">€{item.price}</span>
                          </div>
                        ))}
                        
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-gray-600">Subtotal</span>
                          <span className="font-medium">€{cartItems.reduce((total, item) => total + item.price, 0)}</span>
                        </div>
                        
                        {/* Show delivery fee if there are physical books */}
                        {calculateDeliveryFee(cartItems) > 0 && (
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-gray-600">Delivery (DPD Courier)</span>
                            <span className="font-medium">20 zł</span>
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-600 mb-2">Your cart is empty.</p>
                    )}
                  </div>
                ) : (
                  // Single plan checkout
                  <div className="border-b pb-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{planDetails.name}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{planDetails.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">{planDetails.price}</span>
                    </div>
                    
                    {/* Show delivery fee if this is a printed book plan */}
                    {planId === 'printed_book' && (
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-gray-600">Delivery (DPD Courier)</span>
                        <span className="font-medium">20 zł</span>
                      </div>
                    )}
                  </div>
                )}
                
                {planDetails.recurring && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm">
                    <p className="text-gray-600">
                      This is a recurring payment. You can cancel anytime from your account settings.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>
                    {planId === 'default' 
                      ? `€${cartItems.reduce((total, item) => total + item.price, 0)}${calculateDeliveryFee(cartItems) > 0 ? ' + 20 zł delivery' : ''}` 
                      : planId === 'printed_book' 
                        ? `${planDetails.price} + 20 zł delivery`
                        : planDetails.price}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t">
                  <div className="text-xs text-gray-500">
                    <p>Payment secured with 256-bit encryption</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        ) : (
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}