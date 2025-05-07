import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

const Home = () => {
  // Book data with consistent colors
  const books = [
    { id: '0a', title: 'VISUAL ENGLISH', subtitle: 'BOOK 0A', color: '#FF40FF', hoverColor: '#E038E0', image: '/api/direct/content/covers/book0a.png' },
    { id: '0b', title: 'VISUAL ENGLISH', subtitle: 'BOOK 0B', color: '#FF7F27', hoverColor: '#E07022', image: '/api/direct/content/covers/book0b.png' },
    { id: '0c', title: 'VISUAL ENGLISH', subtitle: 'BOOK 0C', color: '#00CEDD', hoverColor: '#00B8C5', image: '/api/direct/content/covers/book0c.png' },
    { id: '1', title: 'VISUAL ENGLISH', subtitle: 'BOOK 1', color: '#FFFF00', hoverColor: '#E0E000', image: '/api/direct/content/covers/book1.png' },
    { id: '2', title: 'VISUAL ENGLISH', subtitle: 'BOOK 2', color: '#9966CC', hoverColor: '#8959B3', image: '/api/direct/content/covers/book2.png' },
    { id: '3', title: 'VISUAL ENGLISH', subtitle: 'BOOK 3', color: '#00CC00', hoverColor: '#00B300', image: '/api/direct/content/covers/book3.png' },
    { id: '4', title: 'VISUAL ENGLISH', subtitle: 'BOOK 4', color: '#5DADEC', hoverColor: '#4D99D6', image: '/api/direct/content/covers/book4.png' },
    { id: '5', title: 'VISUAL ENGLISH', subtitle: 'BOOK 5', color: '#00CC66', hoverColor: '#00B359', image: '/api/direct/content/covers/book5.png' },
    { id: '6', title: 'VISUAL ENGLISH', subtitle: 'BOOK 6', color: '#FF0000', hoverColor: '#E00000', image: '/api/direct/content/covers/book6.png' },
    { id: '7', title: 'VISUAL ENGLISH', subtitle: 'BOOK 7', color: '#00FF00', hoverColor: '#00E000', image: '/api/direct/content/covers/book7.png' }
  ];

  return (
    <>
      <HeroSection />
      
      {/* Books Section */}
      <section id="books" className="pt-20 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Our Books Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {books.map((book) => (
              <Card key={book.id} className="overflow-hidden flex flex-col items-center p-4 border-2 hover:shadow-lg transition-all">
                <div className="mb-4 w-full">
                  <img 
                    src={book.image} 
                    alt={`${book.title} ${book.subtitle}`}
                    className="w-full h-auto rounded-md"
                  />
                </div>
                <div className="text-center mb-4">
                  <h3 className="text-sm font-medium text-gray-600">{book.title}</h3>
                  <h4 className="text-lg font-bold">{book.subtitle}</h4>
                </div>
                <Link href={`/books/${book.id}`}>
                  <Button 
                    className="w-full"
                    style={{
                      backgroundColor: book.color,
                      color: '#fff',
                      border: 'none',
                    }}
                  >
                    View Book
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-20 pb-16">
        <PricingPlans />
      </section>
      
      <FAQSection />
      <EUProjectSection />
    </>
  );
};

export default Home;
