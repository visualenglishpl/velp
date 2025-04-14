import { Check } from "lucide-react";
import { Link } from "wouter";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-[#00c06d]",
      textColor: "text-[#00c06d]",
      checkColor: "text-[#00c06d]",
      headerBg: "bg-[#00c06d]",
      features: [
        "Full-color physical book (your choice of level)",
        "Delivered to your doorstep",
        "No digital access included",
      ],
      price: "€20",
      priceSubtext: "+ delivery",
      buttonText: "Order Printed Book",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "printed_book"
    },
    {
      title: "Single Lesson\nDigital Access",
      color: "bg-[#3388ff]",
      textColor: "text-[#3388ff]",
      checkColor: "text-[#3388ff]",
      headerBg: "bg-[#3388ff]",
      features: [
        "Access to one complete lesson",
        "Downloadable PDF of the unit",
        "200+ images, games, and quizzes",
        "Progress tracking & videos",
      ],
      price: "€5",
      priceSubtext: "per month | €40/year (33% savings)",
      buttonText: "Start Learning Now",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "single_lesson"
    },
    {
      title: "Whole Book\nDigital Access",
      color: "bg-[#8f41ff]",
      textColor: "text-[#8f41ff]",
      checkColor: "text-[#8f41ff]",
      headerBg: "bg-[#8f41ff]",
      features: [
        "Full access to one entire book",
        "Download PDFs for all units",
        "200+ interactive resources",
        "Certificates & advanced analytics",
      ],
      price: "€25",
      priceSubtext: "per month | €180/year (40% savings)",
      buttonText: "Get Full Access",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "whole_book"
    },
    {
      title: "Free Trial",
      color: "bg-[#ff9f10]",
      textColor: "text-[#ff9f10]",
      checkColor: "text-[#ff9f10]",
      headerBg: "bg-[#ff9f10]",
      features: [
        "Full free access for one week",
        "Browse all lessons and content",
        "Access to games and quizzes",
        "Credit card required",
      ],
      price: "Free",
      priceSubtext: "7-Day Trial",
      buttonText: "Start Free Trial",
      buttonColor: "bg-black hover:bg-gray-800",
      planId: "free_trial"
    },
  ];

  return (
    <section id="plans" className="pt-12 pb-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-400">Find Your Perfect Learning Path</h2>
          <p className="mt-2 text-lg text-gray-600">
            Choose the plan that fits your learning style and budget
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col h-full bg-white rounded-lg shadow overflow-hidden border border-gray-100">
              {/* Header - Fixed height for all headers */}
              <div className={`${plan.headerBg} text-white py-8 px-6 text-center h-[130px] flex flex-col justify-center relative`}>
                <h3 className="text-2xl font-bold leading-tight whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content - Fixed height list section */}
              <div className="flex-grow p-6 flex flex-col justify-between">
                <ul className="space-y-4 min-h-[160px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-6 w-6 ${plan.checkColor} mr-3 flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Fixed height pricing section */}
                <div className="mt-8 pt-6 text-center h-[170px] flex flex-col justify-end border-t border-gray-100">
                  <div className="text-4xl font-bold mb-2">{plan.price}</div>
                  <div className="text-sm text-gray-500 mb-8">{plan.priceSubtext}</div>
                  
                  <Link href={index === 0 ? `/checkout/${plan.planId}` : '/books'}>
                    <button 
                      className={`w-full h-11 rounded-md font-medium ${plan.buttonColor} text-white transition-all duration-200 ease-in-out flex items-center justify-center`}
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
