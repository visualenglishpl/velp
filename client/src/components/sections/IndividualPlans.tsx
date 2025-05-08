import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book\nOnly",
      color: "#ff6347", // coral color like in the example
      features: [
        "Print Edition Only",
        "Show book cover image",
        "Include delivery time",
        "No internet required"
      ],
      price: "€20",
      priceDetail: "+ delivery",
      buttonText: "Order Printed Book",
      buttonLink: "/checkout/book",
    },
    {
      title: "Single Lesson\nAccess",
      color: "#9370db", // medium purple like in the example
      features: [
        "Access to one complete lesson",
        "Downloadable PDF of the unit",
        "200+ images, games, and quizzes",
        "Progress tracking & video content"
      ],
      price: "€5",
      priceDetail: "per month",
      priceSavings: "€40/year (33% savings)",
      buttonText: "Select Multiple Units",
      buttonLink: "/checkout/unit",
    },
    {
      title: "Whole Book\nAccess",
      color: "#00bcd4", // nice teal/cyan color like in the example
      features: [
        "Full access to all lessons in one book",
        "Downloadable PDFs for each unit",
        "2000+ images, games, quizzes, and activities",
        "Certificates, progress tracking, and analytics"
      ],
      price: "€25",
      priceDetail: "per month",
      priceSavings: "€180/year (40% savings)",
      buttonText: "Subscribe to Full Book",
      buttonLink: "/checkout/book-wizard",
    },
    {
      title: "Free\nTrial",
      color: "#ffa726", // orange like in the example
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 md:gap-4 lg:gap-5 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col border border-gray-200 rounded-lg overflow-hidden shadow-sm">
              {/* Header - colored top bar */}
              <div 
                className="text-white text-center py-4"
                style={{ backgroundColor: plan.color }}
              >
                <h3 className="text-xl font-semibold whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Features */}
              <div className="p-6 pt-8" style={{ minHeight: '240px' }}>
                <ul className="space-y-4">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-gray-700 mr-2">•</span>
                      <span className="text-gray-600 text-sm leading-5">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pricing - colored bottom bar */}
              <div 
                className="mt-auto text-white text-center py-5"
                style={{ backgroundColor: plan.color }}
              >
                <div className="text-xl font-bold flex items-center justify-center">
                  {plan.price}
                  {plan.priceDetail && plan.priceDetail.includes("month") && (
                    <span className="text-sm font-normal">/mo</span>
                  )}
                </div>
                {plan.priceDetail === "+ delivery" && (
                  <div className="text-sm text-white opacity-90 mt-1">{plan.priceDetail}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
