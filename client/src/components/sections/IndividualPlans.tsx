import { Star, Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      checkColor: "text-emerald-500",
      headerBg: "bg-emerald-500",
      features: [
        "Full-color physical book (your choice of level)",
        "Delivered to your doorstep",
        "No digital access included",
      ],
      price: "€20",
      priceSubtext: "🛒 Free Delivery",
      buttonText: "🛒 Order Printed Book",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "printed_book"
    },
    {
      title: "Single Lesson\nDigital Access",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      checkColor: "text-blue-500",
      headerBg: "bg-blue-500",
      features: [
        "Access to one complete lesson",
        "📄 Downloadable PDF of the unit",
        "200+ images, games, and quizzes",
        "Progress tracking & videos",
      ],
      price: "€5",
      priceSubtext: "per month or €40/year (🔥 Save 33%)",
      buttonText: "🚀 Start Learning Now",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "single_lesson"
    },
    {
      title: "Whole Book\nDigital Access",
      color: "bg-violet-600",
      textColor: "text-violet-600",
      checkColor: "text-violet-600",
      headerBg: "bg-violet-600",
      features: [
        "Full access to one entire book",
        "📄 Download PDFs for all units",
        "200+ interactive resources",
        "Certificates & advanced analytics",
      ],
      price: "€25",
      priceSubtext: "per month or €180/year (✨ Save 40%)",
      buttonText: "🎯 Get Full Access",
      buttonColor: "bg-black hover:bg-gray-800",
      popular: true,
      planId: "whole_book"
    },
    {
      title: "Free Trial",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      checkColor: "text-amber-500",
      headerBg: "bg-amber-500",
      features: [
        "Explore 3 sample lessons",
        "Access to games and quizzes",
        "No PDF downloads (available in paid plans)",
        "Cancel anytime",
      ],
      price: "Free",
      priceSubtext: "7-Day Trial | ⚠️ Credit card required",
      buttonText: "✨ Start Free Trial",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "free_trial"
    },
  ];

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Find Your Perfect Learning Path</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that fits your learning style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              {/* Header - Fixed height for all headers */}
              <div className={`${plan.headerBg} text-white py-5 px-4 text-center h-[100px] flex flex-col justify-center relative`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-bl-md shadow-md">
                    🔥 Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold leading-tight whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content - Fixed height list section */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                <ul className="space-y-4 min-h-[180px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 ${plan.checkColor} mr-2 flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Fixed height pricing section */}
                <div className="mt-6 pt-4 text-center h-[140px] flex flex-col justify-end border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-1">{plan.priceSubtext}</div>
                  <div className="text-4xl font-bold mb-6">{plan.price}</div>
                  
                  <Link href={`/checkout/${plan.planId}`}>
                    <button 
                      className={`w-full py-3 px-4 rounded-md font-medium ${plan.buttonColor} text-white transition-all duration-200 ease-in-out`}
                    >
                      {plan.buttonText}
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" />
            Contact us for bulk pricing and additional discounts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
