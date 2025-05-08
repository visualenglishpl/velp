import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface SubscriptionPlanStepProps {
  subscriptionPeriod: "monthly" | "yearly";
  onPlanChange: (plan: "monthly" | "yearly") => void;
  selectedBooksCount: number;
}

export function SubscriptionPlanStep({ 
  subscriptionPeriod, 
  onPlanChange,
  selectedBooksCount
}: SubscriptionPlanStepProps) {
  
  // Calculate savings for yearly plan
  const getMonthlyPrice = () => selectedBooksCount > 0 ? 25 : 0;
  const getYearlyPrice = () => {
    const basePrice = 180;
    // 10% discount for 3+ books with yearly plan
    const discount = selectedBooksCount >= 3 ? 0.1 : 0;
    return selectedBooksCount > 0 ? basePrice * (1 - discount) : 0;
  };
  
  const monthlyCostPerYear = getMonthlyPrice() * 12;
  const yearlySavings = monthlyCostPerYear - getYearlyPrice();
  const savingsPercentage = Math.round((yearlySavings / monthlyCostPerYear) * 100);

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-8">
        {/* Monthly Plan Card */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md relative ${
            subscriptionPeriod === "monthly" 
              ? "border-blue-500 bg-blue-50" 
              : "hover:border-gray-300"
          }`}
          onClick={() => onPlanChange("monthly")}
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">Monthly Plan</h3>
              <p className="text-gray-600 mt-1">Flexible month-to-month access</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">€25<span className="text-sm font-normal text-gray-500">/month</span></div>
              <div className="text-sm text-gray-500">€{getMonthlyPrice() * 12}/year</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Access to selected books</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Monthly billing</span>
            </div>
          </div>
          
          {subscriptionPeriod === "monthly" && (
            <div className="absolute -top-3 -right-3">
              <Badge className="bg-blue-500">Selected</Badge>
            </div>
          )}
        </div>
        
        {/* Yearly Plan Card */}
        <div 
          className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md relative ${
            subscriptionPeriod === "yearly" 
              ? "border-blue-500 bg-blue-50" 
              : "hover:border-gray-300"
          }`}
          onClick={() => onPlanChange("yearly")}
        >
          <div className="absolute -top-3 -right-3">
            {subscriptionPeriod === "yearly" ? (
              <Badge className="bg-blue-500">Selected</Badge>
            ) : (
              <Badge className="bg-green-500">Best Value</Badge>
            )}
          </div>
          
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg font-bold">Yearly Plan</h3>
              <p className="text-gray-600 mt-1">Save with annual billing</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">€{getYearlyPrice()}<span className="text-sm font-normal text-gray-500">/year</span></div>
              <div className="text-sm text-green-600 font-medium">Save {savingsPercentage}% (€{yearlySavings})</div>
            </div>
          </div>
          
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>Everything in monthly plan</span>
            </div>
            <div className="flex items-center">
              <span className="text-green-500 mr-2">✓</span>
              <span>40% savings vs monthly</span>
            </div>
            {selectedBooksCount >= 3 && (
              <div className="flex items-center">
                <span className="text-green-500 mr-2">✓</span>
                <span>Additional 10% multi-book discount</span>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Helper text for multi-book discount */}
      {selectedBooksCount < 3 && subscriptionPeriod === "yearly" && (
        <div className="text-sm bg-blue-50 p-4 rounded-md">
          <strong>Tip:</strong> Select 3 or more books to receive an additional 10% discount on your yearly plan!
        </div>
      )}
    </div>
  );
}