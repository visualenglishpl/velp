import React, { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ShoppingCart, CreditCard, ArrowLeft, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import WithdrawalConsent from '@/components/checkout/WithdrawalConsent';

interface PlanDetails {
  name: string;
  price: string;
  description: string;
  recurring: boolean;
  color: string;
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

  // Get plan ID from params or cart
  const planId = params.planId || 'default';

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
                <div className="border-b pb-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium">{planDetails.name}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{planDetails.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{planDetails.price}</span>
                  </div>
                </div>
                
                {planDetails.recurring && (
                  <div className="mb-4 p-3 bg-gray-50 rounded-md text-sm">
                    <p className="text-gray-600">
                      This is a recurring payment. You can cancel anytime from your account settings.
                    </p>
                  </div>
                )}
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>{planDetails.price}</span>
                </div>
                
                <div className="mt-4 pt-4 border-t text-xs text-gray-500">
                  <p>Payment secured with 256-bit encryption</p>
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