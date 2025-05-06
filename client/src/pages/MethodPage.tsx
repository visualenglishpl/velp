import { Helmet } from "react-helmet";
import EUProjectSection from "@/components/sections/EUProjectSection";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function MethodPage() {
  return (
    <>
      <Helmet>
        <title>The Method | Visual English</title>
      </Helmet>
      <Navbar />

      <main className="pt-16">
        {/* Method Hero Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start gap-12">
              {/* Left image */}
              <div className="md:w-2/5 rounded-lg overflow-hidden bg-purple-600">
                <img 
                  src="/api/direct/content/VISUAL WEBSITE/main page.png"
                  alt="Visual English Method" 
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Right content */}
              <div className="md:w-3/5">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  Discover Visual English - A Fun and Interactive Language Learning Method for Young Minds
                </h1>
                
                <p className="text-gray-700 mb-6">
                  Welcome to Visual English, a groundbreaking language learning method crafted by Izabela Buassa, 
                  an experienced English teacher with over two decades of expertise. Visual English is not just a 
                  method; it's a transformative approach designed to address the challenges faced by teachers 
                  and students in the language learning journey.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  The Visual English Solution.
                </h2>

                <p className="text-gray-700 mb-6">
                  Visual English is a revolutionary language learning method tailored for children aged 5 to 15. 
                  Our method stands out by immersing students in conversation-driven lessons supported by captivating 
                  visual aids. With a 10-book series featuring 200-300 images per unit, the method ensures structured 
                  questions, making it easy for teachers to deliver high-quality, consistent materials with minimal 
                  preparation time.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              Key Features.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Engagement</h3>
                <p className="text-gray-700">
                  Visual English taps into the natural curiosity and enthusiasm of young learners, making language learning 
                  a fun and interactive experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Structured Approach</h3>
                <p className="text-gray-700">
                  Each unit is meticulously designed with visuals, GIFs, photos, and videos, ensuring a well-rounded and 
                  comprehensive learning experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Ease of Implementation</h3>
                <p className="text-gray-700">
                  Visual English requires minimal preparation time for teachers, allowing them to focus on teaching rather 
                  than material creation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It's Taught Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              How It's taught.
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-6 border-l-4 border-blue-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">1. Conversation-Driven Lessons</h3>
                <p className="text-gray-700">
                  Visual English prioritizes conversation, allowing students to actively engage in the learning process.
                </p>
              </div>

              <div className="p-6 border-l-4 border-green-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">2. Captivating Visual Aids</h3>
                <p className="text-gray-700">
                  The method uses visuals, GIFs, photos, and videos to reinforce concepts and enhance understanding.
                </p>
              </div>

              <div className="p-6 border-l-4 border-purple-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">3. Structured Questions</h3>
                <p className="text-gray-700">
                  Each unit is equipped with structured questions, creating a cohesive and consistent learning experience.
                </p>
              </div>

              <div className="p-6 border-l-4 border-red-500">
                <h3 className="text-lg font-bold text-gray-900 mb-3">4. Teacher-Friendly Materials</h3>
                <p className="text-gray-700">
                  Teachers benefit from a ready-made 10-book series, reducing preparation time and ensuring high-quality instruction.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Market Potential */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Market Potential.
            </h2>

            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto">
              With millions of young learners globally eager to acquire English language skills, Visual English has the 
              potential to make a lasting impact. It can be implemented in various settings, including schools, language 
              centres, and homes, providing children with the tools they need to confidently communicate in English.
            </p>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Join Us.
            </h2>

            <p className="text-gray-700 mb-8 text-center max-w-3xl mx-auto">
              Support Visual English in revolutionizing English language learning for young minds. By investing in Visual 
              English, you're not just supporting a method; you're contributing to the future communication skills of 
              children worldwide. Let's make Visual English a beacon of hope and opportunity for every young learner 
              seeking to unlock their English language potential.
            </p>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
      <Footer />
    </>
  );
}