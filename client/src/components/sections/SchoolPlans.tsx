import SchoolPricingCard from "@/components/ui/school-pricing-card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const SchoolPlans = () => {
  const plans = [
    {
      title: "Small School",
      subtitle: "Up to 5 Teachers",
      color: "bg-primary-100",
      textColor: "text-primary-700",
      features: [
        "5 teacher accounts",
        "All digital books included",
        "Interactive games & worksheets",
        "School admin dashboard",
      ],
      price: "€149",
      licenseType: "6-Month License",
      buttonText: "Get School License",
    },
    {
      title: "Medium School",
      subtitle: "Up to 10 Teachers",
      color: "bg-primary-200",
      textColor: "text-primary-700",
      features: [
        "10 teacher accounts",
        "All Small School features",
        "Department admin dashboard",
        "Email support",
      ],
      price: "€299",
      licenseType: "6-Month License",
      buttonText: "Get School License",
    },
    {
      title: "Large School",
      subtitle: "Up to 20 Teachers",
      color: "bg-primary-300",
      textColor: "text-primary-800",
      features: [
        "20 teacher accounts",
        "All Medium School features",
        "Priority support",
        "Bulk printed books discount",
      ],
      price: "€499",
      licenseType: "6-Month License",
      buttonText: "Get School License",
      valueTag: "Best Value",
      highlight: true,
    },
    {
      title: "Custom Plan",
      subtitle: "Enterprise Solution",
      color: "bg-primary-50",
      textColor: "text-primary-700",
      features: [
        "Unlimited teacher accounts",
        "Custom implementation support",
        "API integration options",
        "Dedicated account manager",
      ],
      price: "Contact",
      licenseType: "Custom License",
      buttonText: "Contact Us",
    },
  ];

  const includedFeatures = [
    "Separate teacher logins",
    "Optional student access",
    "Progress tracking tools",
    "Printed book bundles available",
  ];

  return (
    <section id="school-plans" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">For Schools and Institutions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Multi-teacher licenses with comprehensive features for your entire English department.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <SchoolPricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">All school plans include:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {includedFeatures.map((feature, index) => (
              <div key={index} className="flex items-start">
                <Check className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <Button className="bg-black hover:bg-gray-800 text-white">
              Get a School Quote
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SchoolPlans;
