import { Button } from "@/components/ui/button";
import { ShoppingCart, BookOpen } from "lucide-react";

interface BookData {
  id: string;
  title: string;
  thumbnailUrl?: string;
  color: string;
}

interface OrderSummaryStepProps {
  selectedBooks: string[];
  subscriptionPeriod: "monthly" | "yearly";
  books: BookData[];
}

export function OrderSummaryStep({
  selectedBooks,
  subscriptionPeriod,
  books
}: OrderSummaryStepProps) {
  // Calculate the total price based on subscription period and book selections
  const calculatePrice = () => {
    if (selectedBooks.length === 0) return 0;
    
    if (subscriptionPeriod === "monthly") {
      // €25 per month
      return 25;
    } else {
      // €180 per year with 10% discount for 3+ books
      const basePrice = 180;
      const discount = selectedBooks.length >= 3 ? 0.1 : 0;
      return basePrice * (1 - discount);
    }
  };

  const totalPrice = calculatePrice();
  
  // Filter the books to only show selected ones
  const selectedBookData = books.filter(book => selectedBooks.includes(book.id));

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 p-6 rounded-lg space-y-5">
        <h3 className="font-bold text-lg">Order Summary</h3>
        
        {/* Subscription Plan */}
        <div className="flex justify-between items-center border-b pb-4">
          <div>
            <h4 className="font-medium">Subscription Plan</h4>
            <p className="text-sm text-gray-600">
              {subscriptionPeriod === "monthly" ? "Monthly billing" : "Annual billing"}
            </p>
          </div>
          <div className="text-right">
            <div className="font-bold">
              {subscriptionPeriod === "monthly" 
                ? `€25/month`
                : `€${totalPrice}/year`}
            </div>
            {subscriptionPeriod === "yearly" && selectedBooks.length >= 3 && (
              <div className="text-xs text-green-600">10% discount applied</div>
            )}
          </div>
        </div>
        
        {/* Books Selected */}
        <div className="space-y-3">
          <h4 className="font-medium">Books Selected ({selectedBooks.length})</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {selectedBookData.map(book => (
              <div key={book.id} className="flex items-center p-2 bg-white rounded-md border">
                <div className="w-10 h-10 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden mr-3">
                  <img 
                    src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                    alt={`Book ${book.id}`}
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/80/${book.color.replace('#', '')}/FFFFFF/?text=Book+${book.id}`;
                    }}
                  />
                </div>
                <div>
                  <div className="font-medium">Book {book.id}</div>
                  <div className="text-xs text-gray-600">Digital Access</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Total */}
        <div className="border-t pt-4 flex justify-between items-center">
          <div className="font-bold text-lg">Total</div>
          <div className="font-bold text-lg">
            {subscriptionPeriod === "monthly" 
              ? `€${totalPrice}/month`
              : `€${totalPrice}/year`}
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <h4 className="font-medium text-blue-800 mb-2">What's included:</h4>
        <ul className="text-sm text-blue-700 space-y-2">
          <li className="flex items-start">
            <BookOpen className="w-4 h-4 mr-2 mt-0.5" />
            <span>Full digital access to {selectedBooks.length} {selectedBooks.length === 1 ? 'book' : 'books'}</span>
          </li>
          <li className="flex items-start">
            <BookOpen className="w-4 h-4 mr-2 mt-0.5" />
            <span>All units and lesson materials</span>
          </li>
          <li className="flex items-start">
            <BookOpen className="w-4 h-4 mr-2 mt-0.5" />
            <span>Interactive lessons and activities</span>
          </li>
          <li className="flex items-start">
            <BookOpen className="w-4 h-4 mr-2 mt-0.5" />
            <span>{subscriptionPeriod === "monthly" ? "Cancel anytime" : "Full year of access"}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}