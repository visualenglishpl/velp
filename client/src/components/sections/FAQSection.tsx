import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const FAQSection = () => {
  const faqItems = [
    {
      question: "How do I access the digital materials?",
      answer:
        "After purchasing, you'll receive login credentials to our secure portal. From there, you can access all your digital content, including interactive lessons, worksheets, and games. All content works on computers, tablets, and interactive whiteboards.",
    },
    {
      question: "Can I share materials with my students?",
      answer:
        "Yes! All plans allow you to share materials with your students. Individual plans include teacher-only access, but you can display content in your classroom. School plans offer an option to create student accounts with limited access to assigned materials.",
    },
    {
      question: "How long does shipping take for printed books?",
      answer:
        "Shipping times vary by location. Within Europe, printed books typically arrive within 5-7 business days. International shipping may take 10-14 business days. You'll receive an email with tracking information when your order ships.",
    },
    {
      question: "Can I extend my subscription?",
      answer:
        "Yes, you can extend your subscription at any time through your account dashboard. We offer discounted renewal rates for existing customers. You'll receive email reminders 30 days before your subscription expires.",
    },
    {
      question: "Are there discounts for larger schools?",
      answer:
        "Absolutely! We offer custom pricing for schools with more than 20 teachers. Contact our education specialists for a personalized quote based on your school's specific needs and number of teaching staff.",
    },
  ];

  return (
    <section id="faq" className="py-10 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg overflow-hidden shadow-sm"
            >
              <AccordionTrigger className="px-4 py-3 bg-white text-left hover:no-underline">
                <span className="text-gray-900 font-medium">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-4 py-3 bg-gray-50 border-t border-gray-200">
                <p className="text-gray-600 text-sm">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
