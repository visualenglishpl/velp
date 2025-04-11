import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SchoolPricingCardProps {
  plan: {
    title: string;
    subtitle: string;
    color: string;
    textColor: string;
    features: string[];
    price: string;
    licenseType: string;
    buttonText: string;
    valueTag?: string;
    highlight?: boolean;
  };
}

const SchoolPricingCard = ({ plan }: SchoolPricingCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 flex flex-col",
      plan.highlight && "relative"
    )}>
      {plan.valueTag && (
        <div className="absolute top-0 right-0 bg-primary text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
          {plan.valueTag}
        </div>
      )}
      <div className={cn(plan.color, "p-6")}>
        <h3 className={cn("text-xl font-semibold text-center", plan.textColor)}>
          {plan.title}
        </h3>
        <p className={cn("text-sm text-center mt-1", plan.textColor.replace('700', '600').replace('800', '700'))}>
          {plan.subtitle}
        </p>
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
      <div className="bg-gray-50 p-6 border-t border-gray-100 text-center">
        <p className="text-sm text-gray-500 mb-2">{plan.licenseType}</p>
        <p className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</p>
        <Button className="w-full bg-black hover:bg-gray-800 text-white">
          {plan.buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SchoolPricingCard;
