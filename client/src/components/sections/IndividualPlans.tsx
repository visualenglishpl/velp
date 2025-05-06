import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-green-500",
      textColor: "text-green-600",
      checkColor: "text-green-600",
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
      color: "bg-blue-500",
      textColor: "text-blue-600",
      checkColor: "text-blue-500",
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
      color: "bg-purple-500",
      textColor: "text-purple-600",
      checkColor: "text-purple-500",
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
      color: "bg-amber-500",
      textColor: "text-amber-600",
      checkColor: "text-amber-500",
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
    <section id="plans" className="pt-16 pb-24 bg-gray-50">
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
              {/* Content */}
              <div className="flex-grow p-6">
                <h3 className="text-xl font-bold mb-4">
                  {plan.title}
                </h3>
                
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 ${plan.checkColor} mr-2 flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-600 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Pricing */}
              <div className="p-6 border-t border-gray-100">
                <div className="flex items-baseline mb-1">
                  <div className="text-4xl font-bold">{plan.price}</div>
                  {plan.priceNote && (
                    <div className="ml-2 text-sm text-gray-500">{plan.priceNote}</div>
                  )}
                </div>
                
                {plan.priceSavings && (
                  <div className="text-sm text-gray-500 mb-4">{plan.priceSavings}</div>
                )}
                
                <div className="mt-6">
                  <Link href={index === 0 ? `/checkout/${plan.planId}` : '/books'}>
                    <button 
                      className="w-full py-3 px-4 rounded-md font-medium bg-black hover:bg-gray-800 text-white transition-all"
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
