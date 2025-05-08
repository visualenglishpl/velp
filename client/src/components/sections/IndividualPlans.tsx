import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "#00c971",
      features: [
        "Full-color physical book",
        "Delivered to your doorstep",
        "No digital access included"
      ],
      price: "€20",
      priceDetail: "+ delivery",
      buttonText: "Order Printed Book",
      buttonLink: "/checkout/book",
    },
    {
      title: "Single Lesson\nAccess",
      color: "#2e88f6",
      features: [
        "Access to one complete lesson",
        "Downloadable PDF of the unit",
        "200+ images, games, and quizzes",
        "Progress tracking & videos"
      ],
      price: "€5",
      priceDetail: "per month",
      priceSavings: "€40/year (33% savings)",
      buttonText: "Select Multiple Units",
      buttonLink: "/checkout/unit",
    },
    {
      title: "Whole Book Access",
      color: "#b23cfd",
      features: [
        "Full access to one entire book",
        "Download PDFs for all units",
        "200+ interactive resources",
        "Certificates & advanced analytics"
      ],
      price: "€25",
      priceDetail: "per month",
      priceSavings: "€180/year (40% savings)",
      buttonText: "Subscribe to Full Book",
      buttonLink: "/checkout/book-wizard",
    },
    {
      title: "Free Trial",
      color: "#1e9f5e",
      features: [
        "Full free access for one week",
        "Browse all lessons and content",
        "Access to games and quizzes",
        "Credit card required"
      ],
      price: "Free",
      priceDetail: "7-Day Trial",
      buttonText: "Start Free 7-Day Trial",
      buttonLink: "/checkout/free_trial",
    },
  ];

  return (
    <div className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col">
              {/* Header */}
              <div 
                className="rounded-lg text-white text-center py-6"
                style={{ backgroundColor: plan.color }}
              >
                <h3 className="text-xl font-bold tracking-wide leading-6 whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Features */}
              <div className="mt-6">
                <ul className="space-y-5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-600 text-sm leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pricing */}
              <div className="mt-10 flex flex-col items-center">
                <div className="text-2xl font-bold">{plan.price}</div>
                {plan.priceDetail && (
                  <div className="text-sm text-gray-500 mt-1">{plan.priceDetail}</div>
                )}
                {plan.priceSavings && (
                  <div className="text-sm text-gray-500 mt-2">{plan.priceSavings}</div>
                )}
              </div>
              
              {/* Button */}
              <div className="mt-6">
                <Link href={plan.buttonLink} className="block">
                  <button 
                    className="w-full py-3 px-4 rounded-md font-medium text-white text-center"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
