import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface PricingCardProps {
  plan: {
    title: string;
    color: string;
    features: string[];
    price: string;
    priceSubtext: string;
    buttonText: string;
    valueSubtext: string;
    highlight?: boolean;
  };
}

const PricingCard = ({ plan }: PricingCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col",
      plan.highlight && "relative"
    )}>
      {plan.valueSubtext && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          {plan.valueSubtext}
        </div>
      )}
      <div className={cn(plan.color, "p-6 text-white")}>
        <h3 className="text-xl font-semibold text-center whitespace-pre-line">{plan.title}</h3>
      </div>
      <div className="p-6 flex-grow">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <Check className={cn("h-5 w-5 mr-2 mt-0.5", 
                plan.color === "bg-emerald-500" ? "text-emerald-500" :
                plan.color === "bg-blue-500" ? "text-blue-500" :
                plan.color === "bg-primary" ? "text-primary" :
                plan.color === "bg-amber-500" ? "text-amber-500" : ""
              )} />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-gray-50 p-6 border-t border-gray-100">
        <p className="text-sm text-gray-500 mb-2">{plan.priceSubtext}</p>
        <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
        <Button className="w-full bg-black hover:bg-gray-800 text-white">{plan.buttonText}</Button>
      </div>
    </div>
  );
};

export default PricingCard;
