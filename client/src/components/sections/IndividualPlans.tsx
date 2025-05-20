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
      popular: false, // Not marking any option as popular
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
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Visual English Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that works best for your teaching needs. All options provide access to our high-quality visual learning materials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-gray-200"
            >
              {/* Header - colored top bar */}
              <div 
                className="text-white text-center py-3 relative"
                style={{ backgroundColor: plan.color }}
              >
                <h3 className="text-lg font-semibold">
                  {plan.title.replace('\n', ' ')}
                </h3>
              </div>
              
              {/* Pricing */}
              <div className="py-4 bg-gray-50 text-center">
                <div className="inline-flex items-baseline justify-center">
                  <span className="text-3xl font-bold tracking-tight">{plan.price}</span>
                  {plan.priceDetail && (
                    <span className="text-sm text-gray-600 ml-1 font-medium">{plan.priceDetail}</span>
                  )}
                </div>
                
                {plan.yearlyPrice && (
                  <div className="mt-3 text-sm">
                    <div className="bg-gray-100 rounded-md py-1.5 px-3 inline-block border border-gray-200">
                      <span className="text-gray-700">Annual: </span>
                      <span className="font-semibold">{plan.yearlyPrice}/yr</span>
                      {plan.savings && (
                        <div className="mt-1 text-green-600 font-medium text-xs">
                          {plan.savings}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Features */}
              <div className="p-4 flex-grow bg-white">
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="rounded-full p-0.5 bg-green-100 flex-shrink-0">
                        <Check className="h-3.5 w-3.5 text-green-600" />
                      </div>
                      <span className="text-gray-700 ml-2.5 text-sm leading-tight">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Button */}
              <div className="p-4 text-center">
                <a 
                  href={plan.buttonLink}
                  className="inline-flex justify-center w-full py-2 px-4 rounded-md shadow-sm text-white font-medium text-sm transition-all hover:shadow-md"
                  style={{ backgroundColor: plan.color, opacity: 0.9 }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '0.9'}
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
