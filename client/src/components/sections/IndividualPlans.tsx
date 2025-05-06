import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-[#00c971]",
      textColor: "text-[#00c971]",
      checkColor: "text-[#00c971]",
      bgColor: "#00c971",
      features: [
        "Full-color physical book",
        "Delivered to your doorstep",
        "No digital access included"
      ],
      price: "€20",
      priceNote: "+ delivery",
      buttonText: "Order Printed Book",
      planId: "printed_book"
    },
    {
      title: "Single Lesson Digital Access",
      color: "bg-[#2e88f6]",
      textColor: "text-[#2e88f6]",
      checkColor: "text-[#2e88f6]",
      bgColor: "#2e88f6",
      features: [
        "Access to one complete lesson",
        "Downloadable PDF of the unit",
        "200+ images, games, and quizzes",
        "Progress tracking & videos"
      ],
      price: "€5",
      priceNote: "per month",
      priceSavings: "€40/year (33% savings)",
      buttonText: "Start Learning Now",
      planId: "single_lesson"
    },
    {
      title: "Whole Book Digital Access",
      color: "bg-[#b23cfd]",
      textColor: "text-[#b23cfd]",
      checkColor: "text-[#b23cfd]",
      bgColor: "#b23cfd",
      features: [
        "Full access to one entire book",
        "Download PDFs for all units",
        "200+ interactive resources",
        "Certificates & advanced analytics"
      ],
      price: "€25",
      priceNote: "per month",
      priceSavings: "€180/year (40% savings)",
      buttonText: "Get Full Access",
      planId: "whole_book"
    },
    {
      title: "Free Trial",
      color: "bg-[#ff9d22]",
      textColor: "text-[#ff9d22]",
      checkColor: "text-[#ff9d22]",
      bgColor: "#ff9d22",
      features: [
        "Full free access for one week",
        "Browse all lessons and content",
        "Access to games and quizzes",
        "Credit card required"
      ],
      price: "Free",
      priceNote: "7-Day Trial",
      buttonText: "Start Free Trial",
      planId: "free_trial"
    },
  ];

  return (
    <section id="pricing" className="pt-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900">Find Your Perfect Learning Path</h2>
          <p className="mt-3 text-lg text-gray-600">
            Choose the plan that fits your learning style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-xl shadow-md overflow-hidden">
              {/* Header */}
              <div className={`${plan.color} py-3 text-white text-center`}>
                <h3 className="text-lg font-bold">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content */}
              <div className="flex-grow p-4">
                <div className="min-h-[120px]">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`h-4 w-4 ${plan.checkColor} mr-2 flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-600 text-xs">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex justify-center items-center h-10">
                  <div className="text-center">
                    <div className="flex flex-col items-center">
                      <div className="text-xl font-bold">{plan.price}</div>
                      {plan.priceNote && (
                        <div className="text-xs text-gray-500">{plan.priceNote}</div>
                      )}
                    </div>
                    
                    {plan.priceSavings && (
                      <div className="text-xs text-gray-500 mt-0.5">{plan.priceSavings}</div>
                    )}
                  </div>
                </div>
                
                <div className="mt-3">
                  <Link href={index === plans.length - 1 ? `/checkout/${plan.planId}` : '/books'}>
                    <button 
                      className="w-full py-2 px-3 rounded-md font-bold text-white shadow-sm text-sm"
                      style={{ backgroundColor: plan.bgColor }}
                    >
                      {plan.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
