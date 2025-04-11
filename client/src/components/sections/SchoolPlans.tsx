import SchoolPricingCard from "@/components/ui/school-pricing-card";
import { Star } from "lucide-react";

const SchoolPlans = () => {
  const plans = [
    {
      title: "Small School",
      subtitle: "Up to 5 Teachers",
      color: "bg-emerald-500",
      textColor: "text-white",
      features: [
        "5 teacher accounts",
        "All digital books included",
        "Interactive games & worksheets",
        "School admin dashboard",
      ],
      price: "€149",
      licenseType: "Starting at",
      buttonText: "Get School License",
    },
    {
      title: "Medium School",
      subtitle: "Up to 10 Teachers",
      color: "bg-blue-500",
      textColor: "text-white",
      features: [
        "10 teacher accounts",
        "All Small School features",
        "Department admin dashboard",
        "Email support",
      ],
      price: "€299",
      licenseType: "Best value",
      buttonText: "Get School License",
    },
    {
      title: "Large School",
      subtitle: "Up to 20 Teachers",
      color: "bg-primary",
      textColor: "text-white",
      features: [
        "20 teacher accounts",
        "All Medium School features",
        "Priority support",
        "Bulk printed books discount",
      ],
      price: "€499",
      licenseType: "Complete package",
      buttonText: "Get School License",
      valueTag: "Most Popular",
      highlight: true,
    },
    {
      title: "Custom Plan",
      subtitle: "Enterprise Solution",
      color: "bg-amber-500",
      textColor: "text-white",
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
