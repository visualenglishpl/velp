import SchoolPricingCard from "@/components/ui/school-pricing-card";
import { Star } from "lucide-react";

const SchoolPlans = () => {
  const plans = [
    {
      title: "Yearly Digital Access",
      subtitle: "For Schools",
      color: "bg-emerald-500",
      textColor: "text-white",
      features: [
        "Full access to one Visual English digital book",
        "All images, questions, games",
        "Tools for classroom use",
        "Annual subscription only",
      ],
      price: "€249",
      licenseType: "per school per year",
      buttonText: "Get School Access",
    },
    {
      title: "Free Trial",
      subtitle: "1-Week Trial",
      color: "bg-blue-500",
      textColor: "text-white",
      features: [
        "Try the platform before subscribing",
        "Full access for evaluation",
        "No credit card required",
        "Includes admin dashboard",
      ],
      price: "Free",
      licenseType: "7-day evaluation",
      buttonText: "Start Free Trial",
    },
    {
      title: "Printed Books",
      subtitle: "For Schools",
      color: "bg-primary",
      textColor: "text-white",
      features: [
        "Purchase printed books for your school",
        "Special discount for 10+ copies",
        "Each teacher needs their own copy",
        "Combine with digital access for best results",
      ],
      price: "€39",
      licenseType: "per book + discount for bulk orders",
      buttonText: "Order School Books",
      valueTag: "Most Popular",
      highlight: true,
    },
    {
      title: "Custom Solution",
      subtitle: "For Large Institutions",
      color: "bg-amber-500",
      textColor: "text-white",
      features: [
        "Custom implementation for your school",
        "Multiple books access",
        "Teacher training support",
        "Integration with school systems",
      ],
      price: "Contact",
      licenseType: "Custom Quote",
      buttonText: "Contact Us",
    },
  ];

  return (
    <section id="school-plans" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">For Schools and Institutions</h2>
          <p className="mt-4 text-lg text-gray-600">
            Designed for classroom integration and group learning with special institutional benefits.
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
            Special discount on printed books for orders of 10 or more copies.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SchoolPlans;
