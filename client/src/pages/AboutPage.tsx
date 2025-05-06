import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Visual English</title>
      </Helmet>

      <main>
        {/* Hero Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-10">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/yuga iza.png" 
                alt="Izabela and Yuga Buassa" 
                className="max-w-md w-full h-auto mx-auto rounded-md"
              />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Visual English
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-8">
              Igniting Young Minds for English Excellence!
            </h2>
            
            <div className="text-left space-y-6">
              <p className="text-gray-700 leading-relaxed">
                We are Izabela and Yuga Buassa, the visionary educators behind Visual English — a revolutionary 
                teaching approach for young ESL learners.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                After many years of teaching, we saw a critical need for innovative resources that help improve 
                verbal communication, real conversations, and student interaction in the classroom.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Driven by Izabela's passion for interactive teaching, we created a fun, visual-based method 
                that uses GIFs, funny images, and relatable videos to spark conversation and engagement among 
                young learners.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                We recognized the challenges English teachers face — scattered resources, time-consuming 
                lesson prep, and a lack of engaging content. This frustration inspired the Visual English 
                platform: a central hub where teachers can access ready-made, interactive teaching materials.
              </p>
              
              <p className="text-gray-700 leading-relaxed font-medium mt-8">
                Today, Visual English empowers educators and language schools with:
              </p>
              
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>A 10-book series of printable units</li>
                <li>200–300 image-based prompts per unit</li>
                <li>Flashcards, games, and videos</li>
                <li>Structured, conversation-based lessons</li>
              </ul>
              
              <p className="text-gray-700 leading-relaxed font-medium mt-4">
                Our goal is simple: Make English learning fun, visual, and effective.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                Join our mission to transform how children learn English — with materials that speak their language.
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
            
            <a href="/books" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
              Explore Our Books
            </a>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
    </>
  );
}