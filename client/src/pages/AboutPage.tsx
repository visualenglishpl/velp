import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";
import Footer from "../components/layout/Footer";
import Navbar from "../components/layout/Navbar";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Visual English</title>
      </Helmet>
      <Navbar />

      <main className="pt-16">
        {/* Hero Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex justify-center mb-10">
              <div className="flex gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src="/api/direct/content/VISUAL WEBSITE/izabela.jpg" 
                    alt="Izabela Buassa" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
                    }}
                  />
                </div>
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img 
                    src="/api/direct/content/VISUAL WEBSITE/yuga.jpg" 
                    alt="Yuga Buassa" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback if image fails to load
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/></svg>';
                    }}
                  />
                </div>
              </div>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visual English
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
              Igniting Young Minds for English Excellence!
            </h2>
            
            <div className="text-left space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We are Izabela and Yuga Buassa, the visionary minds of Visual English, which is a 
                revolutionary approach to teaching English language learning for ESL young learners.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                After teaching for many years, we recognized the critical need for innovative educational 
                materials to improve verbal communication, conversation, and direct interaction among 
                young learners during lessons.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Spearheaded by Izabela Buassa, this initiative was ignited by creating a dynamic and 
                engaging teaching approach that promotes meaningful conversations with young learners, 
                using funny images, GIFs, and videos that children can relate to.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Recognizing the lack of resources for English teachers to create vibrant conversational 
                content, we saw the challenges educators face in navigating different internet sources. 
                The struggle to gather information from various places without a central hub hindered the 
                possibility to create a captivating learning environment.
              </p>
              
              <p className="text-gray-700 leading-relaxed font-medium">
                This realization ignited the Visual English Platform.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Our platform addresses this gap by providing teachers and language schools with a 
                convenient repository of ready-made materials. We offer a set of 10 books containing 
                printable materials, as well as flashcards and video resources and games. This 
                significantly reduces prep time for educators. Our Interactive Learning Materials are 
                meticulously crafted to immerse students in 200–300 images per unit, ensuring a highly 
                engaging learning experience.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                These materials also feature thoughtfully crafted questions, employing the direct method 
                of teaching English. The key difference lies in students using images as a means of 
                communication, promoting maximum engagement and fostering active student 
                participation. This innovative approach not only enhances knowledge retention but also 
                makes the learning experience more dynamic and interactive.
              </p>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready to transform your English teaching?</h2>
            <p className="text-gray-700 mb-8 max-w-3xl mx-auto">
              Join the Visual English community and provide your students with engaging, interactive learning materials.
            </p>
            
            <a href="/books" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
              <span className="mr-2">□</span> View Books
            </a>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
      <Footer />
    </>
  );
}