import { Star, Check, Crown } from "lucide-react";

const PricingPlans = () => {
  const plans = [
    {
      title: "Printed Book Only",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      checkColor: "text-emerald-500",
      headerBg: "bg-gradient-to-br from-emerald-400 to-emerald-600",
      features: [
        "One full-color Visual English book",
        "Physical delivery",
        "Choose any book level",
      ],
      price: "€20",
      priceSubtext: "+ delivery",
      buttonText: "Order Printed Book",
      buttonColor: "bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700",
    },
    {
      title: "Single Lesson\nDigital Access",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      checkColor: "text-blue-500",
      headerBg: "bg-gradient-to-br from-blue-400 to-blue-600",
      features: [
        "200+ images, interactive questions",
        "Games and media content",
        "Access to one complete lesson",
        "Monthly or yearly subscription",
      ],
      price: "€5",
      priceSubtext: "per month or €40/year",
      buttonText: "Get Lesson Access",
      buttonColor: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700",
    },
    {
      title: "Whole Book\nDigital Access",
      color: "bg-violet-600",
      textColor: "text-violet-600",
      checkColor: "text-violet-600",
      headerBg: "bg-gradient-to-br from-violet-500 to-violet-700",
      features: [
        "Full access to one Visual English book",
        "200+ images, interactive questions",
        "Games and media content",
        "Monthly or yearly subscription",
      ],
      price: "€25",
      priceSubtext: "per month or €180/year",
      buttonText: "Get Book Access",
      buttonColor: "bg-gradient-to-r from-violet-600 to-violet-700 hover:from-violet-700 hover:to-violet-800",
      popular: true,
    },
    {
      title: "Free Trial",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      checkColor: "text-amber-500",
      headerBg: "bg-gradient-to-br from-amber-400 to-amber-600",
      features: [
        "7-day free trial",
        "Full access to platform",
        "Try before subscribing",
        "Credit card required",
      ],
      price: "Free",
      priceSubtext: "7-day trial",
      buttonText: "Start Free Trial",
      buttonColor: "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-[1200px] mx-auto">
          {plans.map((plan, index) => (
            <div key={index} 
              className={`flex flex-col h-full bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 
                          transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1
                          ${plan.popular ? 'ring-2 ring-violet-400 ring-opacity-70' : ''}`}
            >
              {/* Header - Fixed height for all headers */}
              <div className={`${plan.headerBg} text-white py-5 px-4 text-center h-[100px] flex flex-col justify-center relative`}>
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-yellow-500 text-xs font-bold text-white px-3 py-1 rounded-bl-lg shadow-md flex items-center">
                    <Crown className="h-3 w-3 mr-1" />
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold leading-tight whitespace-pre-line">
                  {plan.title}
                </h3>
              </div>
              
              {/* Content - Fixed height list section */}
              <div className="flex-grow p-8 flex flex-col justify-between">
                <ul className="space-y-5 min-h-[200px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start group">
                      <div className={`p-1 rounded-full ${plan.color} bg-opacity-10 mr-3 flex-shrink-0`}>
                        <Check className={`h-4 w-4 ${plan.textColor}`} />
                      </div>
                      <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Fixed height pricing section */}
                <div className="mt-8 pt-8 text-center h-[200px] flex flex-col justify-end border-t border-gray-100">
                  <div className="text-sm text-gray-500 mb-3">{plan.priceSubtext}</div>
                  <div className={`text-6xl font-bold mb-12 ${plan.textColor}`}>
                    {plan.price}
                  </div>
                  
                  <button 
                    className={`w-full py-4 px-6 rounded-lg font-semibold ${plan.buttonColor} text-white transition-all duration-300 ease-in-out shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98]`}
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
