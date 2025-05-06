import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Trash2, ShoppingCart, CreditCard, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  type: 'unit' | 'book' | 'printed_book';
  bookId: string;
  unitNumber?: number;
  title: string;
  price: number;
  thumbnailUrl?: string;
}

export default function CartPage() {
  const { toast } = useToast();
  const [location, setLocation] = useLocation();
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('visualEnglishCart');
      if (storedCart) {
        setItems(JSON.parse(storedCart));
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load cart items:', error);
      setIsLoading(false);
    }
  }, []);

  const removeFromCart = (id: string) => {
    try {
      const updatedItems = items.filter(item => item.id !== id);
      setItems(updatedItems);
      localStorage.setItem('visualEnglishCart', JSON.stringify(updatedItems));
      
      toast({
        title: 'Item removed',
        description: 'The item has been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item from cart.',
        variant: 'destructive'
      });
    }
  };

  const clearCart = () => {
    try {
      setItems([]);
      localStorage.removeItem('visualEnglishCart');
      
      toast({
        title: 'Cart cleared',
        description: 'All items have been removed from your cart.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to clear cart.',
        variant: 'destructive'
      });
    }
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <div className="flex justify-center py-12">
            <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
          <Card className="p-12 text-center">
            <div className="flex flex-col items-center">
              <ShoppingCart size={64} className="text-gray-300 mb-4" />
              <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">Add some units or books to get started.</p>
              <Link href="/books">
                <Button>Browse Books</Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Shopping Cart</h1>
          <Button 
            variant="ghost" 
            className="text-gray-500 hover:text-gray-700"
            onClick={clearCart}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear Cart
          </Button>
        </div>
        
        <div className="space-y-4 mb-8">
          {items.map((item) => (
            <Card key={item.id} className="p-4">
              <div className="flex items-center">
                {item.thumbnailUrl ? (
                  <div className="w-16 h-16 rounded-md overflow-hidden mr-4">
                    <img 
                      src={item.thumbnailUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If image fails to load, hide it
                        const img = e.currentTarget;
                        img.style.display = 'none';
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-gray-100 rounded-md mr-4 flex items-center justify-center">
                    {item.type === 'book' ? (
                      <span className="font-bold text-lg">B{item.bookId}</span>
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </div>
                )}
                
                <div className="flex-grow">
                  <h3 className="font-medium">{item.title}</h3>
                  <p className="text-sm text-gray-500">
                    {item.type === 'unit' ? 'Single Unit Access' : 
                     item.type === 'book' ? 'Full Book Access' : 'Printed Book'}
                  </p>
                </div>
                
                <div className="font-bold mx-4">
                  €{item.price}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-gray-500"
                  onClick={() => removeFromCart(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <div className="flex justify-between mb-4">
            <span>Subtotal</span>
            <span className="font-medium">€{calculateTotal()}</span>
          </div>
          
          <div className="flex justify-between font-bold text-lg mb-6 pt-4 border-t">
            <span>Total</span>
            <span>€{calculateTotal()}</span>
          </div>
          
          <Button 
            className="w-full py-6 text-lg"
            onClick={() => setLocation('/checkout')}
          >
            <CreditCard className="mr-2" size={20} />
            Proceed to Checkout
          </Button>
        </div>
      </div>
    </div>
  );
}