import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="py-4 md:py-6 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
          Flexible Plans for Teachers and Schools
        </h1>
        <p className="max-w-3xl mx-auto text-lg text-gray-600 mb-3">
          Access engaging visual lessons, interactive games, worksheets, and more – designed for young learners and busy classrooms.
        </p>
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          <Link href="/checkout/free_trial">
            <Button className="bg-black hover:bg-gray-800 text-white px-4 py-2 text-sm">
              Try a Free Sample
            </Button>
          </Link>
          <Link href="/books">
            <Button variant="outline" className="border-gray-300 text-gray-700 px-4 py-2 text-sm">
              Visit Bookstore
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
