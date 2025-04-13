import PricingCard from "@/components/ui/pricing-card";
import { Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

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
      price: "€20",
      priceSubtext: "+ delivery",
      buttonText: "Order Printed Book",
      valueSubtext: "",
    },
    {
      title: "Single Lesson\nDigital Access",
      color: "bg-blue-500",
      features: [
        "200+ images, interactive questions",
        "Games and media content",
        "Access to one complete lesson",
        "Monthly or yearly subscription",
      ],
      price: "€5",
      priceSubtext: "per month or €40/year",
      buttonText: "Get Lesson Access",
      valueSubtext: "",
    },
    {
      title: "Whole Book\nDigital Access",
      color: "bg-violet-500",
      features: [
        "Full access to one Visual English book",
        "200+ images, interactive questions",
        "Games and media content",
        "Monthly or yearly subscription",
      ],
      price: "€25",
      priceSubtext: "per month or €180/year",
      buttonText: "Get Book Access",
      valueSubtext: "Most Popular",
      highlight: true,
    },
    {
      title: "Free Trial",
      color: "bg-amber-500",
      features: [
        "7-day free trial",
        "Full access to platform",
        "Try before subscribing",
        "Credit card required",
      ],
      price: "Free",
      priceSubtext: "7-day trial",
      buttonText: "Start Free Trial",
      valueSubtext: "",
    },
  ];

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Flexible options to fit your teaching style</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your teaching style and classroom needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className={`bg-white rounded-lg shadow-md overflow-hidden ${plan.highlight ? 'ring-2 ring-purple-500' : ''}`}>
              {plan.highlight && (
                <div className="bg-purple-600 text-white text-center py-1 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">{plan.title}</h3>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <div className="text-center">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <p className="text-gray-500 text-sm mt-1">{plan.priceSubtext}</p>
                  </div>
                  
                  <Button 
                    className={`w-full mt-4 ${
                      index === 0 ? 'bg-emerald-500 hover:bg-emerald-600' : 
                      index === 1 ? 'bg-blue-500 hover:bg-blue-600' : 
                      index === 2 ? 'bg-violet-600 hover:bg-violet-700' : 
                      'bg-amber-500 hover:bg-amber-600'
                    }`}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" />
            Contact your school for institutional pricing and additional discounts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndividualPlans;
