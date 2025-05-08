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
      title: "Single Lesson Access",
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
      title: "Whole Book Access",
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
    <div className="pt-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Learning Path</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your learning style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" 
                 style={{ minHeight: "540px" }}>
              {/* Header */}
              <div className={`${plan.color} py-4 text-white text-center`}>
                <h3 className="text-xl font-bold leading-tight whitespace-pre-line h-14 flex items-center justify-center">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content */}
              <div className="flex-grow p-5">
                <div className="min-h-[180px]">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className={`h-5 w-5 ${plan.checkColor} mr-2 flex-shrink-0 mt-0.5`} />
                        <span className="text-gray-600 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Pricing */}
              <div className="p-5 border-t border-gray-200">
                <div className="flex justify-center items-center">
                  <div className="text-center mb-4">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold">{plan.price}</div>
                      {plan.priceNote && (
                        <div className="text-sm text-gray-500 mt-1">{plan.priceNote}</div>
                      )}
                    </div>
                    
                    {plan.priceSavings && (
                      <div className="text-sm text-gray-500 mt-1.5">{plan.priceSavings}</div>
                    )}
                  </div>
                </div>
                
                <div className="mt-2">
                  {plan.planId === "printed_book" ? (
                    <Link href="/checkout/book">
                      <button 
                        className="w-full py-3 px-4 rounded-md font-medium text-white shadow-md text-base h-16 flex items-center justify-center"
                        style={{ backgroundColor: plan.bgColor }}
                        onClick={() => {}}
                      >
                        <span className="text-center">{plan.buttonText}</span>
                      </button>
                    </Link>
                  ) : plan.planId === "single_lesson" ? (
                    <Link href="/checkout/unit">
                      <button 
                        className="w-full py-3 px-4 rounded-md font-medium text-white shadow-md text-base h-16 flex items-center justify-center"
                        style={{ backgroundColor: plan.bgColor }}
                        onClick={() => {}}
                      >
                        <span className="text-center">{plan.buttonText}</span>
                      </button>
                    </Link>
                  ) : plan.planId === "whole_book" ? (
                    <Link href="/checkout/book-wizard">
                      <button 
                        className="w-full py-3 px-4 rounded-md font-medium text-white shadow-md text-base h-16 flex items-center justify-center"
                        style={{ backgroundColor: plan.bgColor }}
                        onClick={() => {}}
                      >
                        <span className="text-center">{plan.buttonText}</span>
                      </button>
                    </Link>
                  ) : (
                    <Link href={`/checkout/${plan.planId}`}>
                      <button 
                        className="w-full py-3 px-4 rounded-md font-medium text-white shadow-md text-base h-16 flex items-center justify-center"
                        style={{ backgroundColor: plan.bgColor }}
                        onClick={() => {}}
                      >
                        <span className="text-center">{plan.buttonText}</span>
                      </button>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
