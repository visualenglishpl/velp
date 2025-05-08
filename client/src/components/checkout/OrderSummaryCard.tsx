import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Bookmark, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface OrderSummaryCardProps {
  selectedUnits: string[];
  bookId: string;
  bookTitle: string;
  subscriptionPeriod: "monthly" | "yearly";
  addToCart: () => void;
  saveForLater?: () => void;
  className?: string;
  isSticky?: boolean;
}

export function OrderSummaryCard({
  selectedUnits,
  bookId,
  bookTitle,
  subscriptionPeriod,
  addToCart,
  saveForLater,
  className,
  isSticky = true,
}: OrderSummaryCardProps) {
  const [total, setTotal] = useState(0);
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  // Calculate pricing
  useEffect(() => {
    let unitPrice = subscriptionPeriod === "monthly" ? 5 : 3.33;
    let subtotal = selectedUnits.length * unitPrice;
    
    // Apply 15% discount for 10+ units
    let discount = 0;
    if (selectedUnits.length >= 10) {
      discount = subtotal * 0.15;
      setDiscountApplied(true);
      setDiscountAmount(parseFloat(discount.toFixed(2)));
    } else {
      setDiscountApplied(false);
      setDiscountAmount(0);
    }
    
    setTotal(parseFloat((subtotal - discount).toFixed(2)));
  }, [selectedUnits, subscriptionPeriod]);

  return (
    <Card className={cn(
      "p-4 border bg-white shadow-md",
      isSticky && "sticky top-20", 
      className
    )}>
      <div className="text-lg font-bold mb-3">Order Summary</div>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Book:</span>
          <span className="font-medium">{bookTitle || `Book ${bookId}`}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Subscription:</span>
          <span className="font-medium capitalize">{subscriptionPeriod}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Units selected:</span>
          <span className="font-medium">{selectedUnits.length}</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-600">Price per unit:</span>
          <span className="font-medium">
            €{subscriptionPeriod === "monthly" ? "5.00" : "3.33"}
          </span>
        </div>
        
        {discountApplied && (
          <div className="flex justify-between text-green-600">
            <span className="flex items-center">
              <CheckCircle className="w-4 h-4 mr-1" />
              Bulk discount (15%):
            </span>
            <span className="font-medium">-€{discountAmount}</span>
          </div>
        )}
        
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total:</span>
          <span className="text-lg">€{total.toFixed(2)}</span>
        </div>
      </div>
      
      {selectedUnits.length >= 10 && !discountApplied && (
        <div className="bg-green-50 text-green-700 p-2 rounded-md text-sm mb-3">
          Select {10 - selectedUnits.length} more units to get a 15% discount!
        </div>
      )}
      
      <div className="space-y-2">
        <Button 
          className="w-full"
          style={{ backgroundColor: "#b23cfd" }}
          disabled={selectedUnits.length === 0}
          onClick={addToCart}
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Subscribe to Full Book
        </Button>
        
        {saveForLater && (
          <Button 
            variant="outline"
            className="w-full"
            style={{ borderColor: "#2e88f6", color: "#2e88f6" }}
            disabled={selectedUnits.length === 0}
            onClick={saveForLater}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            Save for Later
          </Button>
        )}
      </div>
      
      {!discountApplied && selectedUnits.length > 0 && (
        <div className="mt-4 text-sm text-gray-500">
          <span className="block font-medium">Did you know?</span>
          <span>You can save 15% when you select 10 or more units!</span>
        </div>
      )}
    </Card>
  );
}