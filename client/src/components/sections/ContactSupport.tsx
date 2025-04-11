import { Button } from "@/components/ui/button";

const ContactSupport = () => {
  return (
    <section id="contact" className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Have Questions?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Our team is here to help you find the perfect plan for your teaching needs.
        </p>
        <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3">
          Contact Support
        </Button>
      </div>
    </section>
  );
};

export default ContactSupport;
