import PricingCard from "@/components/ui/pricing-card";
import { Star } from "lucide-react";

const IndividualPlans = () => {
  const plans = [
    {
      title: "One visual Engish\nlesson",
      color: "bg-emerald-500",
      features: [
        "Images, video, game",
        "Sample from a full unit",
        "Access: 6 months",
      ],
      price: "€5",
      priceSubtext: "Starting at",
      buttonText: "Buy This Lesson",
      valueSubtext: "",
    },
    {
      title: "one visual english\ndigital book",
      color: "bg-blue-500",
      features: [
        "16-20 lessons",
        "Full digital access",
        "Interactive activities & games",
        "Access: 6 months",
      ],
      price: "€25",
      priceSubtext: "Best value",
      buttonText: "Buy Book Digital",
      valueSubtext: "",
    },
    {
      title: "one visual english\ndigital + print",
      color: "bg-primary",
      features: [
        "Digital access + printed book",
        "All digital features included",
        "Shipping included",
        "Access: 6 months",
      ],
      price: "€39",
      priceSubtext: "Complete package",
      buttonText: "Buy Book Digital + Print",
      valueSubtext: "Most Popular",
      highlight: true,
    },
    {
      title: "Already bought\na lesson",
      color: "bg-amber-500",
      features: [
        "Upgrade to the full book",
        "Only pay the difference",
        "Keep your existing access period",
        "Instant upgrade - no waiting",
      ],
      price: "+€20",
      priceSubtext: "Upgrade price",
      buttonText: "Upgrade Lesson",
      valueSubtext: "",
    },
  ];

  return (
    <section id="individual-plans" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">For Independent Teachers</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for your teaching style and classroom needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <PricingCard key={index} plan={plan} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <p className="text-gray-600 flex items-center justify-center">
            <Star className="h-5 w-5 text-amber-500 mr-2" fill="currentColor" />
            Schools can also order printed books in bulk.
          </p>
        </div>
      </div>
    </section>
  );
};

export default IndividualPlans;
