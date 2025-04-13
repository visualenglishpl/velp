import PricingCard from "@/components/ui/pricing-card";
import { Star } from "lucide-react";

const IndividualPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-emerald-500",
      features: [
        "One full-color Visual English book",
        "Physical delivery",
        "Choose any book level",
      ],
      price: "€39",
      priceSubtext: "+ delivery",
      buttonText: "Order Printed Book",
      valueSubtext: "",
    },
    {
      title: "Digital Platform\nAccess Only",
      color: "bg-blue-500",
      features: [
        "Choose one Visual English book",
        "All visuals, questions, games",
        "Interactive media content",
        "Monthly or yearly subscription",
      ],
      price: "€25",
      priceSubtext: "per month",
      buttonText: "Get Digital Access",
      valueSubtext: "",
    },
    {
      title: "Book + Digital\nPlatform Access",
      color: "bg-primary",
      features: [
        "Printed book delivered to you",
        "Plus digital access to same book",
        "All digital features included",
        "Monthly or yearly subscription",
      ],
      price: "€39",
      priceSubtext: "+ monthly subscription",
      buttonText: "Get Complete Package",
      valueSubtext: "Most Popular",
      highlight: true,
    },
    {
      title: "Free Trial",
      color: "bg-amber-500",
      features: [
        "7-day free trial",
        "Full access to platform",
        "Choose one book to explore",
        "No credit card required",
      ],
      price: "Free",
      priceSubtext: "7-day trial",
      buttonText: "Start Free Trial",
      valueSubtext: "",
    },
  ];

  return (
    <section id="individual-plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">For Independent Teachers</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your teaching style and classroom needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" />
            Schools can also order printed books in bulk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndividualPlans;
