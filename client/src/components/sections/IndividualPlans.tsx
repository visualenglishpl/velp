import { Star, Check } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      checkColor: "text-emerald-500",
      headerBg: "bg-emerald-500",
      features: [
        "One full-color Visual English book",
        "Physical delivery",
        "Choose any book level",
      ],
      price: "€20",
      priceSubtext: "+ delivery",
      buttonText: "Order Printed Book",
      buttonColor: "bg-black hover:bg-gray-800",
    },
    {
      title: "Single Lesson Digital Access",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      checkColor: "text-blue-500",
      headerBg: "bg-blue-500",
      features: [
        "200+ images, interactive questions",
        "Games and media content",
        "Access to one complete lesson",
        "Monthly or yearly subscription",
      ],
      price: "€5",
      priceSubtext: "per month or €40/year",
      buttonText: "Get Lesson Access",
      buttonColor: "bg-black hover:bg-gray-800",
    },
    {
      title: "Whole Book Digital Access",
      color: "bg-violet-600",
      textColor: "text-violet-600",
      checkColor: "text-violet-600",
      headerBg: "bg-violet-600",
      features: [
        "Full access to one Visual English book",
        "200+ images, interactive questions",
        "Games and media content",
        "Monthly or yearly subscription",
      ],
      price: "€25",
      priceSubtext: "per month or €180/year",
      buttonText: "Get Book Access",
      buttonColor: "bg-black hover:bg-gray-800",
      popular: true,
    },
    {
      title: "Free Trial",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      checkColor: "text-amber-500",
      headerBg: "bg-amber-500",
      features: [
        "7-day free trial",
        "Full access to platform",
        "Try before subscribing",
        "Credit card required",
      ],
      price: "Free",
      priceSubtext: "7-day trial",
      buttonText: "Start Free Trial",
      buttonColor: "bg-black hover:bg-gray-800",
    },
  ];

  return (
    <section id="plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Flexible options to fit your needs</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div key={index} className="flex flex-col h-full">
              {/* Header */}
              <div className={`${plan.headerBg} text-white p-6 text-center rounded-t-lg`}>
                {plan.popular && (
                  <div className="text-sm font-medium mb-1">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content */}
              <div className="bg-white flex-grow p-6 flex flex-col">
                <ul className="space-y-3 mb-auto">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <Check className={`h-5 w-5 ${plan.checkColor} mr-2 flex-shrink-0 mt-0.5`} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="mt-6 pt-6 text-center">
                  <div className="text-sm text-gray-500 mb-1">{plan.priceSubtext}</div>
                  <div className="text-4xl font-bold mb-6">{plan.price}</div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded font-medium ${plan.buttonColor} text-white`}
                  >
                    {plan.buttonText}
                  </button>
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
