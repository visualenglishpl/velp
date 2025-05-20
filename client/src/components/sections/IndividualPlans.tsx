import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book\nOnly",
      color: "#ff6347", // coral color like in the example
      features: [
        "Print Edition Only",
        "Ideal for classroom and home use",
        "No digital access included",
        "Delivered to your doorstep"
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
      priceDetail: "/mo",
      yearlyPrice: "€40",
      originalYearlyPrice: "€60",
      savings: "Save €20",
      buttonText: "Select Multiple Units",
      buttonLink: "/checkout/unit",
    },
    {
      title: "Whole Book\nAccess",
      color: "#00bcd4", // nice teal/cyan color like in the example
      popular: true, // Mark this as the popular option
      features: [
        "Full access to all lessons in one book",
        "Downloadable PDFs for each unit",
        "2000+ images, games, quizzes, and activities",
        "Certificates, progress tracking, and analytics"
      ],
      price: "€25",
      priceDetail: "/mo",
      yearlyPrice: "€180",
      originalYearlyPrice: "€300",
      savings: "Save €120",
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
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 mt-2">Choose the plan that works best for your teaching needs</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow ${plan.popular ? 'border-2 border-yellow-400 ring-2 ring-yellow-200 transform lg:scale-105' : 'border border-gray-200'}`}
            >
              {/* Header - colored top bar */}
              <div 
                className="text-white text-center py-3 relative"
                style={{ backgroundColor: plan.color }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 text-xs font-bold py-1 px-3 rounded-full shadow-sm">
                    MOST POPULAR
                  </div>
                )}
                <h3 className="text-lg font-semibold">
                  {plan.title.replace('\n', ' ')}
                </h3>
              </div>
              
              {/* Pricing */}
              <div className="py-4 bg-gray-50 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold">{plan.price}</span>
                  {plan.priceDetail && (
                    <span className="text-sm text-gray-600 ml-1">{plan.priceDetail}</span>
                  )}
                </div>
                
                {plan.yearlyPrice && (
                  <div className="mt-1 text-sm text-gray-600">
                    <div>
                      Annual: <span className="font-medium">{plan.yearlyPrice}/yr</span>
                      {plan.savings && <span className="ml-1 text-green-600 font-medium">({plan.savings})</span>}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Features */}
              <div className="p-4 flex-grow bg-white">
                <ul className="space-y-2">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 ml-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Button */}
              <div className="p-4 text-center">
                <a 
                  href={plan.buttonLink}
                  className="inline-flex justify-center w-full py-2 px-4 rounded bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium text-sm transition-colors"
                >
                  {plan.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
