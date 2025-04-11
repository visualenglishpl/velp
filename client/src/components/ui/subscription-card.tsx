import { Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubscriptionCardProps {
  subscription: {
    duration: string;
    description: string;
    isHighlighted?: boolean;
  };
}

const SubscriptionCard = ({ subscription }: SubscriptionCardProps) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm p-6 text-center",
      subscription.isHighlighted && "border-2 border-primary"
    )}>
      <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4">
        <Calendar className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {subscription.duration}
      </h3>
      <p className="text-gray-600">{subscription.description}</p>
    </div>
  );
};

export default SubscriptionCard;
