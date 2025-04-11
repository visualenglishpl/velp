import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          Flexible Plans for Teachers and Schools
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-10">
          Access engaging visual lessons, interactive games, worksheets, and more – designed for young learners and busy classrooms.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button className="bg-black hover:bg-gray-800 text-white px-5 py-3">
            Try a Free Sample
          </Button>
          <Button variant="outline" className="border-gray-300 text-gray-700 px-5 py-3">
            Visit New Bookstore
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
