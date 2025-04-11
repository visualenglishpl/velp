import SubscriptionCard from "@/components/ui/subscription-card";

const SubscriptionLengths = () => {
  const subscriptions = [
    {
      duration: "3 Months",
      description: "Try it out or use for summer classes.",
    },
    {
      duration: "6 Months",
      description: "Standard school term.",
      isHighlighted: true,
    },
    {
      duration: "9 Months",
      description: "Full academic year.",
    },
    {
      duration: "12 Months",
      description: "Best value.",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Flexible Subscription Lengths</h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the time period that works best for your teaching schedule.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subscriptions.map((subscription, index) => (
            <SubscriptionCard key={index} subscription={subscription} />
          ))}
        </div>

        <div className="text-center mt-6">
          <p className="text-gray-600">
            All durations apply to both individual and school plans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionLengths;
