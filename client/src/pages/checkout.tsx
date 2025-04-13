import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

// Subscription types
type PlanType = 'single_lesson' | 'whole_book' | 'printed_book' | 'free_trial';
type BillingCycle = 'monthly' | 'yearly';

export default function CheckoutPage() {
  // Get the planId from the URL
  const [, params] = useRoute('/checkout/:planId?');
  const planId = params?.planId || 'single_lesson';
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [planType, setPlanType] = useState<PlanType>(planId as PlanType || 'single_lesson');
  
  // Update planType when URL parameter changes
  useEffect(() => {
    if (planId && ['single_lesson', 'whole_book', 'printed_book', 'free_trial'].includes(planId)) {
      setPlanType(planId as PlanType);
    }
  }, [planId]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiry: '',
    cvc: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Purchase Successful",
        description: `Thank you for your purchase of ${planDetails.name}!`,
      });
      setLocation('/');
    }, 2000);
  };

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

          {/* Payment Form */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information securely</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
                    placeholder="John Doe" 
                    required 
                    value={formData.name}
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
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number</Label>
                  <Input 
                    id="cardNumber" 
                    name="cardNumber" 
                    placeholder="1234 5678 9012 3456" 
                    required
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry">Expiry Date</Label>
                    <Input 
                      id="expiry" 
                      name="expiry" 
                      placeholder="MM/YY" 
                      required
                      value={formData.expiry}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvc">CVC</Label>
                    <Input 
                      id="cvc" 
                      name="cvc" 
                      placeholder="123" 
                      required
                      value={formData.cvc}
                      onChange={handleInputChange}
                    />
                  </div>
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
                        value={formData.address}
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
                          value={formData.city}
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
                          value={formData.postalCode}
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
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>
                  </>
                )}

                <CardFooter className="flex justify-end px-0 pt-4">
                  <Button type="submit" disabled={isProcessing} className="w-full">
                    {isProcessing ? 'Processing...' : 
                      planType === 'free_trial' 
                        ? 'Start Free Trial' 
                        : `Pay ${planDetails.price}`}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}