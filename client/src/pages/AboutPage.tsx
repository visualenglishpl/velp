import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Visual English</title>
      </Helmet>

      <main className="pb-8">
        {/* Hero Section */}
        <section className="bg-white py-10 md:py-16" id="about-founders">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/yuga iza.png" 
                alt="Izabela and Yuga Buassa" 
                className="max-w-md w-full h-auto mx-auto rounded-md shadow-md"
              />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Visual English
            </h1>
            <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
              Igniting Young Minds for English Excellence!
            </h2>
            
            {/* Our Story Section */}
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left border-b pb-2 border-gray-200">
                  Our Story
                </h3>
                <div className="text-left space-y-4">
                  <p className="text-gray-700 leading-relaxed">
                    We are Izabela and Yuga Buassa, the visionary educators behind Visual English — a revolutionary 
                    teaching approach for young ESL learners.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed">
                    After many years of teaching, we saw a critical need for innovative resources that help improve 
                    verbal communication, real conversations, and student interaction in the classroom.
                  </p>
                </div>
              </div>
              
              {/* Our Approach Section */}
              <div className="bg-gray-50 rounded-lg p-6 mb-8">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left border-b pb-2 border-gray-200">
                  Our Approach
                </h3>
                <div className="text-left space-y-4">
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
                </div>
              </div>
              
              {/* What We Offer Section */}
              <div className="bg-white rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-left border-b pb-2 border-gray-200">
                  What We Offer
                </h3>
                <div className="text-left">
                  <p className="text-gray-700 leading-relaxed font-medium mb-4">
                    Today, Visual English empowers educators and language schools with:
                  </p>
                  
                  <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
                    <li>A 10-book series of printable units</li>
                    <li>200–300 image-based prompts per unit</li>
                    <li>Flashcards, games, and videos</li>
                    <li>Structured, conversation-based lessons</li>
                  </ul>
                  
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Our goal is simple: Make English learning fun, visual, and effective.
                  </p>
                  
                  <p className="text-gray-700 leading-relaxed mt-4">
                    Join our mission to transform how children learn English — with materials that speak their language.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gray-50 py-10" id="about-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to transform your English teaching?</h2>
            <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
              Join the Visual English community and provide your students with engaging, interactive learning materials.
            </p>
            
            <Link href="/books">
              <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Explore Our Books
              </a>
            </Link>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
    </>
  );
}