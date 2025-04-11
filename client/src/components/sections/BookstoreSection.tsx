import { Button } from "@/components/ui/button";

const BookstoreSection = () => {
  return (
    <section id="bookstore" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Visual English Bookstore</h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Explore our collection of printed materials, lesson packs, and educational resources
            designed for effective language learning.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Product 1 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Printed Lesson Books</h3>
              <p className="text-gray-600 mb-4">
                High-quality printed lessons with visual guides and worksheets.
              </p>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                View Details
              </Button>
            </div>
          </div>
          
          {/* Product 2 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Teacher Guides</h3>
              <p className="text-gray-600 mb-4">
                Comprehensive guides with lesson plans and teaching strategies.
              </p>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                View Details
              </Button>
            </div>
          </div>
          
          {/* Product 3 */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Classroom Materials</h3>
              <p className="text-gray-600 mb-4">
                Supplementary materials to enhance your classroom experience.
              </p>
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                View Details
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookstoreSection;