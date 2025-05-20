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
    <section className="py-12 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Choose the plan that works best for your teaching needs. All options provide access to our high-quality visual learning materials.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className="flex flex-col rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-200"
            >
              {/* Header - colored top bar */}
              <div 
                className="text-white text-center py-4 relative"
                style={{ backgroundColor: plan.color }}
              >
                <h3 className="text-xl font-bold">
                  {plan.title.split('\n')[0]}
                  {plan.title.includes('\n') && <span className="block mt-1">{plan.title.split('\n')[1]}</span>}
                </h3>
              </div>
              
              {/* Pricing */}
              <div className="py-5 bg-gray-50 text-center">
                <div className="flex items-baseline justify-center">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.priceDetail && (
                    <span className="text-sm text-gray-600 ml-1.5">{plan.priceDetail}</span>
                  )}
                </div>
                
                {plan.yearlyPrice && (
                  <div className="mt-3">
                    <div className="bg-white rounded-md py-2 px-4 inline-block border border-gray-200 shadow-sm">
                      <div className="text-gray-700">
                        Annual: <span className="font-semibold">{plan.yearlyPrice}/year</span>
                      </div>
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
              <div className="p-5 flex-grow bg-white">
                <ul className="space-y-3.5">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <div className="rounded-full p-0.5 bg-green-50 flex-shrink-0">
                        <Check className="h-4 w-4 text-green-600" />
                      </div>
                      <span className="text-gray-700 ml-3 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* CTA Button */}
              <div className="p-5 text-center">
                <Link href={plan.buttonLink}>
                  <button
                    className="w-full py-2.5 px-4 rounded-lg shadow-sm text-white font-medium transition-all hover:shadow-md"
                    style={{ backgroundColor: plan.color }}
                  >
                    {plan.buttonText}
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
