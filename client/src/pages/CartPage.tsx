import React, { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, X, ChevronRight } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

type CartItem = {
  id: string;
  type: 'unit' | 'book';
  bookId: string;
  unitNumber?: string;
  title: string;
  price: number;
  thumbnailUrl?: string;
};

export default function CartPage() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real implementation, this would fetch from an API
    // For now, let's use localStorage to simulate a cart
    const loadCart = () => {
      setIsLoading(true);
      try {
        const storedCart = localStorage.getItem('visualEnglishCart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load your cart. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, [toast]);

  const removeFromCart = (itemId: string) => {
    const updatedCart = cartItems.filter(item => item.id !== itemId);
    setCartItems(updatedCart);
    localStorage.setItem('visualEnglishCart', JSON.stringify(updatedCart));
    
    toast({
      title: 'Item removed',
      description: 'The item has been removed from your cart.',
    });
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem('visualEnglishCart');
    
    toast({
      title: 'Cart cleared',
      description: 'Your cart has been cleared.',
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 flex items-center">
          <ShoppingCart className="mr-2" size={28} />
          Your Cart
        </h1>

        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-500">Loading your cart...</p>
          </div>
        ) : cartItems.length > 0 ? (
          <>
            <div className="mb-6">
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-4 overflow-hidden">
                  <div className="flex items-center p-4">
                    <div className="h-16 w-16 rounded bg-gray-100 mr-4 overflow-hidden flex-shrink-0">
                      {item.thumbnailUrl ? (
                        <img 
                          src={item.thumbnailUrl} 
                          alt={item.title} 
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center bg-gray-100">
                          {item.type === 'book' ? (
                            <span className="text-sm text-gray-500">Book {item.bookId}</span>
                          ) : (
                            <span className="text-sm text-gray-500">Unit {item.unitNumber}</span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-grow">
                      <h3 className="font-medium">
                        {item.type === 'book' 
                          ? `Full Book ${item.bookId}: ${item.title}` 
                          : `Book ${item.bookId}, Unit ${item.unitNumber}: ${item.title}`}
                      </h3>
                      <div className="text-sm text-gray-500 mt-1">
                        {item.type === 'book' 
                          ? "Full book access" 
                          : "Single unit access"}
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="font-medium text-lg mr-6">€{item.price.toFixed(2)}</div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <X size={20} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">€{calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-4 pb-4 border-b">
                <span className="text-gray-600">VAT (included)</span>
                <span className="font-medium">€{(calculateTotal() * 0.23).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>€{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between space-y-3 sm:space-y-0 sm:space-x-3">
              <Button 
                variant="outline" 
                className="flex items-center"
                onClick={clearCart}
              >
                Clear Cart
              </Button>
              
              <div className="flex space-x-3">
                <Link href="/books">
                  <Button 
                    variant="outline" 
                    className="flex items-center"
                  >
                    Continue Shopping
                  </Button>
                </Link>
                
                <Link href="/checkout">
                  <Button 
                    className="flex items-center bg-purple-600 hover:bg-purple-700"
                  >
                    Checkout <ChevronRight size={16} className="ml-1" />
                  </Button>
                </Link>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-16 border rounded-lg">
            <div className="mb-4">
              <ShoppingCart size={48} className="mx-auto text-gray-300" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Browse our books and units to find learning materials</p>
            <Link href="/books">
              <Button>
                Browse Learning Materials
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}