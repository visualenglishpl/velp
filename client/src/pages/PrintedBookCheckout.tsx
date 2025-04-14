import { useState, useEffect } from 'react';
import { Link } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, Book, Truck, MinusCircle, PlusCircle, ShoppingCart, Check } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

// Type for a book with thumbnail URL
type BookWithThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
  description?: string;
};

// Type for selected book with quantity
type SelectedBookWithQuantity = {
  bookId: string;
  title: string;
  quantity: number;
};

export default function PrintedBookCheckout() {
  const [selectedBooks, setSelectedBooks] = useState<SelectedBookWithQuantity[]>([]);
  const [totalQuantity, setTotalQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [originalPrice, setOriginalPrice] = useState<number>(0);

  // Query to get book thumbnails
  const { data: books, isLoading } = useQuery<BookWithThumbnail[]>({
    queryKey: ['/api/assets/book-thumbnails'],
    queryFn: async () => {
      const res = await apiRequest('GET', '/api/assets/book-thumbnails');
      if (!res.ok) {
        throw new Error('Failed to fetch books');
      }
      return await res.json();
    }
  });

  // Calculate discount based on quantity
  const calculateDiscount = (qty: number): { discountPercent: number, discountedTotal: number } => {
    const basePrice = 20 * qty;
    let discountPercent = 0;
    
    // Apply bulk discount tiers
    if (qty > 100) {
      discountPercent = 25; // 25% discount for over 100 books
    } else if (qty > 50) {
      discountPercent = 20; // 20% discount for 51-100 books
    } else if (qty > 20) {
      discountPercent = 15; // 15% discount for 21-50 books
    }
    
    const discountAmount = (basePrice * discountPercent) / 100;
    const discountedTotal = basePrice - discountAmount;
    
    return { discountPercent, discountedTotal };
  };

  // Update prices and quantities
  useEffect(() => {
    if (selectedBooks.length === 0) {
      setTotalQuantity(0);
      setOriginalPrice(0);
      setTotalPrice(0);
      setDiscount(0);
      return;
    }
    
    // Calculate total quantity across all books
    const total = selectedBooks.reduce((sum, book) => sum + book.quantity, 0);
    setTotalQuantity(total);
    
    // Calculate original price
    const basePrice = total * 20;
    setOriginalPrice(basePrice);
    
    // Apply discount
    const { discountPercent, discountedTotal } = calculateDiscount(total);
    setDiscount(discountPercent);
    setTotalPrice(discountedTotal);
  }, [selectedBooks]);

  // Handle book selection with quantity update
  const handleBookQuantityChange = (bookId: string, title: string, newQuantity: number) => {
    // Check if valid quantity
    if (isNaN(newQuantity) || newQuantity < 0 || newQuantity > 100) {
      return;
    }
    
    // Make a copy of current selection
    const updatedSelection = [...selectedBooks];
    
    // Find if book is already selected
    const existingIndex = updatedSelection.findIndex(item => item.bookId === bookId);
    
    if (existingIndex >= 0) {
      // Book is already in selection
      if (newQuantity === 0) {
        // Remove book if quantity is zero
        updatedSelection.splice(existingIndex, 1);
      } else {
        // Update quantity
        updatedSelection[existingIndex].quantity = newQuantity;
      }
    } else if (newQuantity > 0) {
      // Add new book to selection
      updatedSelection.push({
        bookId,
        title,
        quantity: newQuantity
      });
    }
    
    // Update state
    setSelectedBooks(updatedSelection);
  };
  
  // Increment book quantity
  const incrementBookQuantity = (bookId: string, title: string) => {
    const book = selectedBooks.find(b => b.bookId === bookId);
    const currentQty = book ? book.quantity : 0;
    
    if (currentQty < 100) {
      handleBookQuantityChange(bookId, title, currentQty + 1);
    }
  };
  
  // Decrement book quantity
  const decrementBookQuantity = (bookId: string, title: string) => {
    const book = selectedBooks.find(b => b.bookId === bookId);
    const currentQty = book ? book.quantity : 0;
    
    if (currentQty > 0) {
      handleBookQuantityChange(bookId, title, currentQty - 1);
    }
  };
  
  // Get current quantity for a book
  const getBookQuantity = (bookId: string): number => {
    const book = selectedBooks.find(b => b.bookId === bookId);
    return book ? book.quantity : 0;
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (selectedBooks.length === 0) {
      alert('Please select at least one book');
      return;
    }
    
    // Prepare selected books data for the URL
    const booksParam = selectedBooks.map(book => 
      `${book.bookId}:${book.quantity}`
    ).join(',');
    
    window.location.href = `/checkout/printed_book?books=${booksParam}`;
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/#plans">
            <Button variant="outline" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Plans
            </Button>
          </Link>
          <h1 className="text-3xl font-bold mb-2">Order Printed Books</h1>
          <p className="text-gray-600 max-w-3xl">
            Select the books you'd like to purchase in printed format. All our printed books are high-quality, full-color publications delivered straight to your door.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Book className="mr-2 h-5 w-5 text-emerald-500" />
            Select Your Books
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <div className="aspect-square bg-gray-100">
                    <Skeleton className="h-full w-full" />
                  </div>
                  <CardFooter className="py-3">
                    <Skeleton className="h-6 w-full" />
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : books && books.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {books.map((book) => {
                const quantity = getBookQuantity(book.bookId);
                const isSelected = quantity > 0;
                
                return (
                  <Card 
                    key={book.bookId} 
                    className={`transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-emerald-500 shadow-md' : 'hover:border-gray-300'
                    }`}
                  >
                    <div className="aspect-square relative overflow-hidden">
                      {book.gifUrl ? (
                        <img 
                          src={book.gifUrl} 
                          alt={`Cover of ${book.title}`} 
                          className="object-contain w-full h-full p-4"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full bg-gray-200 text-gray-500">
                          No image available
                        </div>
                      )}
                      
                      {isSelected && (
                        <Badge className="absolute top-2 right-2 bg-emerald-500 hover:bg-emerald-600">
                          {quantity}
                        </Badge>
                      )}
                    </div>
                    
                    <CardFooter className="p-3 flex-col">
                      <p className="text-center font-medium mb-2">{book.title}</p>
                      
                      <div className="flex items-center justify-center w-full">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => decrementBookQuantity(book.bookId, book.title)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        
                        <div className="mx-2 w-10 text-center font-medium">
                          {quantity}
                        </div>
                        
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8"
                          onClick={() => incrementBookQuantity(book.bookId, book.title)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-10">
              <p>No books available at this time.</p>
            </div>
          )}
        </div>
        
        {selectedBooks.length > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <ShoppingCart className="mr-2 h-5 w-5 text-emerald-500" />
              Your Selection
            </h2>
            
            <div className="overflow-hidden rounded-md border">
              <ScrollArea className="max-h-64">
                <div className="p-4">
                  {selectedBooks.map((book) => (
                    <div 
                      key={book.bookId} 
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center">
                        <Book className="h-5 w-5 text-gray-500 mr-2" />
                        <span className="font-medium">{book.title}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500"
                          onClick={() => decrementBookQuantity(book.bookId, book.title)}
                        >
                          <MinusCircle className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-8 text-center">{book.quantity}</span>
                        
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-8 w-8 text-gray-500"
                          onClick={() => incrementBookQuantity(book.bookId, book.title)}
                        >
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                        
                        <span className="w-20 text-right text-gray-600">
                          €{(book.quantity * 20).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
            
            {/* Bulk discount information */}
            <div className="mt-4 bg-blue-50 p-3 rounded-md border border-blue-100">
              <h3 className="text-sm font-medium text-blue-800 mb-1">Bulk Discounts Available</h3>
              <ul className="text-xs text-blue-700 space-y-1">
                <li className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${totalQuantity > 20 ? 'bg-emerald-500' : 'bg-blue-300'}`}></div>
                  <span>15% off for orders over 20 books</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${totalQuantity > 50 ? 'bg-emerald-500' : 'bg-blue-300'}`}></div>
                  <span>20% off for orders over 50 books</span>
                </li>
                <li className="flex items-center gap-1">
                  <div className={`w-2 h-2 rounded-full ${totalQuantity > 100 ? 'bg-emerald-500' : 'bg-blue-300'}`}></div>
                  <span>25% off for orders over 100 books</span>
                </li>
              </ul>
            </div>
          </div>
        )}
        
        <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-4 flex items-center">
            <Truck className="mr-2 h-5 w-5 text-emerald-500" />
            Shipping Information
          </h2>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <p className="text-gray-600 mb-3">
                Standard shipping takes 7-14 business days. Express delivery options will be available at checkout.
              </p>
              
              <p className="text-gray-600">
                Each book is printed in full color on high-quality paper and includes all lessons and exercises. Books will be delivered in the same format as shown in the digital version.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h2 className="text-xl font-bold text-emerald-800">Order Summary</h2>
              
              {discount > 0 ? (
                <>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-emerald-700 font-medium">
                      {totalQuantity} {totalQuantity === 1 ? 'book' : 'books'} × €20 = 
                    </p>
                    <p className="text-emerald-700/70 line-through">
                      €{originalPrice.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-rose-600 font-medium">
                      Bulk Discount ({discount}%):
                    </p>
                    <p className="text-rose-600 font-medium">
                      -€{(originalPrice - totalPrice).toFixed(2)}
                    </p>
                  </div>
                  <p className="text-emerald-800 font-bold text-lg mt-1">
                    Total: €{totalPrice.toFixed(2)}
                  </p>
                </>
              ) : (
                <p className="text-emerald-700 font-medium">
                  {totalQuantity} {totalQuantity === 1 ? 'book' : 'books'} × €20 = €{totalPrice.toFixed(2)}
                </p>
              )}
              
              <div className="mt-1 space-y-1">
                <p className="text-emerald-700/80 text-sm">
                  + delivery costs (calculated at checkout)
                </p>
                {totalQuantity > 0 && totalQuantity <= 20 && (
                  <p className="text-blue-600 text-sm font-medium">
                    Order more than 20 books for a 15% discount!
                  </p>
                )}
              </div>
            </div>
            <Button 
              size="lg" 
              onClick={handleCheckout}
              disabled={selectedBooks.length === 0}
              className="bg-emerald-600 hover:bg-emerald-700 mt-4 md:mt-0"
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}