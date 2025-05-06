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
                  : "Checkout"}
          </h1>
        </div>
        
        {!isComplete && (
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