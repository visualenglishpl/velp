import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CreditCard, Calendar, Lock } from "lucide-react";

interface PaymentStepProps {
  totalPrice: number;
  subscriptionPeriod: "monthly" | "yearly";
}

export function PaymentStep({
  totalPrice,
  subscriptionPeriod
}: PaymentStepProps) {
  const [paymentMethod, setPaymentMethod] = useState<"creditCard" | "bankTransfer">("creditCard");
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Payment methods selection */}
        <div className="md:w-1/3 space-y-4">
          <h3 className="font-medium">Payment Method</h3>
          
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "creditCard" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("creditCard")}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod === "creditCard" ? "border-blue-500" : "border-gray-300"
              } flex items-center justify-center mr-3`}>
                {paymentMethod === "creditCard" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                )}
              </div>
              <div className="font-medium">Credit Card</div>
            </div>
          </div>
          
          <div
            className={`border rounded-lg p-4 cursor-pointer transition-all ${
              paymentMethod === "bankTransfer" ? "border-blue-500 bg-blue-50" : "hover:border-gray-300"
            }`}
            onClick={() => setPaymentMethod("bankTransfer")}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 ${
                paymentMethod === "bankTransfer" ? "border-blue-500" : "border-gray-300"
              } flex items-center justify-center mr-3`}>
                {paymentMethod === "bankTransfer" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
                )}
              </div>
              <div className="font-medium">Bank Transfer</div>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 mt-4">
            <p>Your payment information is securely processed and encrypted.</p>
          </div>
        </div>
        
        {/* Payment details form */}
        <div className="md:w-2/3">
          <h3 className="font-medium mb-4">Payment Details</h3>
          
          {paymentMethod === "creditCard" ? (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cardName">Cardholder Name</Label>
                <Input id="cardName" placeholder="Name on card" />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <div className="relative">
                  <Input id="cardNumber" placeholder="0000 0000 0000 0000" />
                  <CreditCard className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <div className="relative">
                    <Input id="expiryDate" placeholder="MM/YY" />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <div className="relative">
                    <Input id="cvv" placeholder="123" />
                    <Lock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <Card className="p-4">
                <h4 className="font-medium mb-2">Bank Transfer Instructions</h4>
                <p className="text-sm text-gray-600 mb-4">
                  Please transfer the amount to the following account:
                </p>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Bank:</span>
                    <span>Visual English Bank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Account Name:</span>
                    <span>Visual English Platform</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">IBAN:</span>
                    <span>PL00 0000 0000 0000 0000 0000 0000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Reference:</span>
                    <span>ORDER-{Date.now().toString().slice(-6)}</span>
                  </div>
                </div>
              </Card>
              
              <div className="text-sm bg-yellow-50 p-4 rounded-md text-yellow-700">
                <p>Note: Your access will be activated after payment confirmation. This usually takes 1-2 business days.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">Total amount:</div>
            <div className="text-sm text-gray-600">
              {subscriptionPeriod === "monthly" 
                ? `€${totalPrice}/month`
                : `€${totalPrice}/year`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}