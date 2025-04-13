import { Express, Request, Response } from 'express';
import Stripe from 'stripe';

// Initialize Stripe client
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Plans price mapping in cents
const PLAN_PRICES = {
  single_lesson: {
    monthly: 500, // €5
    yearly: 4000,  // €40
  },
  whole_book: {
    monthly: 2500, // €25
    yearly: 18000, // €180
  },
  printed_book: 2000, // €20
  free_trial: 0, // Free
};

export function setupPaymentRoutes(app: Express) {
  // Create payment intent for one-time payments
  app.post('/api/create-payment-intent', async (req: Request, res: Response) => {
    try {
      const { planType, billingCycle = 'monthly', bookId } = req.body;
      
      if (!planType) {
        return res.status(400).json({ error: 'Plan type is required' });
      }
      
      let amount: number;
      
      if (planType === 'single_lesson') {
        amount = PLAN_PRICES.single_lesson[billingCycle as 'monthly' | 'yearly'];
      } else if (planType === 'whole_book') {
        amount = PLAN_PRICES.whole_book[billingCycle as 'monthly' | 'yearly'];
      } else if (planType === 'printed_book') {
        amount = PLAN_PRICES.printed_book;
      } else if (planType === 'free_trial') {
        // For free trial, we create a setup intent instead
        const setupIntent = await stripe.setupIntents.create({
          payment_method_types: ['card'],
        });
        
        return res.json({ 
          clientSecret: setupIntent.client_secret,
          isFree: true
        });
      } else {
        return res.status(400).json({ error: 'Invalid plan type' });
      }
      
      const metadata: Record<string, string> = {
        planType,
        billingCycle: billingCycle || 'one-time',
      };
      
      // Add book ID to metadata if provided
      if (bookId) {
        metadata.bookId = bookId;
      }
      
      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'eur',
        payment_method_types: ['card'],
        metadata,
      });
      
      res.json({
        clientSecret: paymentIntent.client_secret,
        amount,
      });
    } catch (error: any) {
      console.error('Payment intent error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Handle subscription creation for recurring payments
  app.post('/api/create-subscription', async (req: Request, res: Response) => {
    try {
      const { planType, billingCycle, paymentMethodId, customerId, email, name, bookId } = req.body;
      
      if (!planType || !billingCycle || !paymentMethodId) {
        return res.status(400).json({
          error: 'Missing required parameters'
        });
      }
      
      // Get or create customer
      let customer;
      if (customerId) {
        customer = await stripe.customers.retrieve(customerId);
      } else if (email) {
        // Create a new customer if one doesn't exist
        customer = await stripe.customers.create({
          email,
          name,
          payment_method: paymentMethodId,
          invoice_settings: {
            default_payment_method: paymentMethodId,
          },
        });
      } else {
        return res.status(400).json({
          error: 'Either customerId or email is required'
        });
      }
      
      // Attach the payment method to the customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      
      // Set as default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      
      // First create a product
      const productName = planType === 'single_lesson' ? 'Single Lesson Access' : 'Whole Book Access';
      const product = await stripe.products.create({
        name: productName,
      });
      
      // Create a price for the product
      const price = await stripe.prices.create({
        product: product.id,
        currency: 'eur',
        unit_amount: planType === 'single_lesson' 
          ? PLAN_PRICES.single_lesson[billingCycle as 'monthly' | 'yearly'] 
          : PLAN_PRICES.whole_book[billingCycle as 'monthly' | 'yearly'],
        recurring: {
          interval: billingCycle === 'monthly' ? 'month' : 'year',
        },
      });
      
      // Create metadata for the subscription
      const metadata: Record<string, string> = {
        planType,
        billingCycle
      };
      
      // Add book ID to metadata if provided
      if (bookId) {
        metadata.bookId = bookId;
      }
      
      // Create subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: price.id,
          },
        ],
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
        metadata,
        expand: ['latest_invoice.payment_intent'],
      });
      
      // Return the subscription and client secret
      res.json({
        subscriptionId: subscription.id,
        clientSecret: (subscription.latest_invoice as any).payment_intent?.client_secret,
        customerId: customer.id,
      });
    } catch (error: any) {
      console.error('Subscription error:', error);
      res.status(500).json({ error: error.message });
    }
  });
  
  // Handle free trial setup
  app.post('/api/setup-free-trial', async (req: Request, res: Response) => {
    try {
      const { email, name, paymentMethodId } = req.body;
      
      if (!email || !name || !paymentMethodId) {
        return res.status(400).json({ error: 'Missing required parameters' });
      }
      
      // Create a customer
      const customer = await stripe.customers.create({
        email,
        name,
        payment_method: paymentMethodId,
      });
      
      // Attach the payment method to the customer
      await stripe.paymentMethods.attach(paymentMethodId, {
        customer: customer.id,
      });
      
      // Set the default payment method
      await stripe.customers.update(customer.id, {
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
      
      // First create a product for the free trial
      const product = await stripe.products.create({
        name: 'Visual English Free Trial',
      });
      
      // Create a price for the product
      const price = await stripe.prices.create({
        product: product.id,
        currency: 'eur',
        unit_amount: PLAN_PRICES.whole_book.monthly, // After trial, charge for whole book
        recurring: {
          interval: 'month',
        },
      });
      
      // Create a trial subscription with a free period
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [
          {
            price: price.id,
          },
        ],
        trial_period_days: 7,
        payment_settings: {
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
      });
      
      res.json({
        success: true,
        subscriptionId: subscription.id,
        customerId: customer.id,
        trialEnd: subscription.trial_end,
      });
    } catch (error: any) {
      console.error('Free trial setup error:', error);
      res.status(500).json({ error: error.message });
    }
  });
}