import { Star, Check } from "lucide-react";

const SchoolPlans = () => {
  const plans = [
    {
      title: "Yearly Digital Access",
      subtitle: "For Schools",
      color: "bg-emerald-500",
      textColor: "text-emerald-500",
      checkColor: "text-emerald-500",
      headerBg: "bg-emerald-500",
      features: [
        "Full access to one Visual English digital book",
        "All images, questions, games",
        "Tools for classroom use",
        "Annual subscription only",
      ],
      price: "€249",
      priceSubtext: "per school per year",
      buttonText: "Get School Access",
      buttonColor: "bg-black hover:bg-gray-800",
    },
    {
      title: "Free Trial",
      subtitle: "1-Week Trial",
      color: "bg-blue-500",
      textColor: "text-blue-500",
      checkColor: "text-blue-500",
      headerBg: "bg-blue-500",
      features: [
        "Try the platform before subscribing",
        "Full access for evaluation",
        "No credit card required",
        "Includes admin dashboard",
      ],
      price: "Free",
      priceSubtext: "7-day evaluation",
      buttonText: "Start Free Trial",
      buttonColor: "bg-black hover:bg-gray-800",
    },
    {
      title: "Printed Books",
      subtitle: "For Schools",
      color: "bg-violet-600",
      textColor: "text-violet-600",
      checkColor: "text-violet-600",
      headerBg: "bg-violet-600",
      features: [
        "Purchase printed books for your school",
        "Special discount for 10+ copies",
        "Each teacher needs their own copy",
        "Combine with digital access for best results",
      ],
      price: "€39",
      priceSubtext: "per book + discount for bulk orders",
      buttonText: "Order School Books",
      buttonColor: "bg-black hover:bg-gray-800",
      popular: true,
    },
    {
      title: "Custom Solution",
      subtitle: "For Large Institutions",
      color: "bg-amber-500",
      textColor: "text-amber-500",
      checkColor: "text-amber-500",
      headerBg: "bg-amber-500",
      features: [
        "Custom implementation for your school",
        "Multiple books access",
        "Teacher training support",
        "Integration with school systems",
      ],
      price: "Contact",
      priceSubtext: "Custom Quote",
      buttonText: "Contact Us",
      buttonColor: "bg-black hover:bg-gray-800",
    },
  ];

  return (
    <section id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">For Schools and Institutions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Multi-teacher licenses with comprehensive features for your entire English department.
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
                {plan.subtitle && (
                  <div className="text-sm mt-1 opacity-90">{plan.subtitle}</div>
                )}
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
            All school plans include separate teacher logins, student access, and progress tracking.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchoolPlans;
