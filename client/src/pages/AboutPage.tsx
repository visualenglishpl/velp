import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";
import { Link } from "wouter";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Us | Visual English</title>
      </Helmet>

      <main className="pb-6">
        {/* Hero Section */}
        <section className="bg-white py-6 md:py-8" id="about-founders">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="md:w-1/3">
                <img 
                  src="/api/direct/content/VISUAL WEBSITE/yuga iza.png" 
                  alt="Izabela and Yuga Buassa" 
                  className="w-full h-auto rounded-md shadow-md"
                />
              </div>
              
              <div className="md:w-2/3 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Visual English
                </h1>
                <h2 className="text-lg md:text-xl font-medium text-gray-700 mb-4">
                  Igniting Young Minds for English Excellence!
                </h2>
                <p className="text-gray-600 text-sm">
                  Founded by Izabela and Yuga Buassa, Visual English is a revolutionary teaching approach designed 
                  specifically for young ESL learners, focusing on interactive visual learning.
                </p>
              </div>
            </div>
            
            {/* Info Sections */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Our Story Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                  Our Story
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    After years of teaching, we identified a critical need for resources that improve verbal communication 
                    and classroom interaction.
                  </p>
                  <p>
                    Our teaching experience showed us that students learn best when they're engaged in meaningful, 
                    visual-based conversation activities.
                  </p>
                </div>
              </div>
              
              {/* Our Approach Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                  Our Approach
                </h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>
                    We created a fun, visual method using GIFs, funny images, and relatable videos to spark natural 
                    conversation among young learners.
                  </p>
                  <p>
                    Visual English addresses the challenges teachers face by providing a central hub for ready-made, 
                    interactive teaching materials.
                  </p>
                </div>
              </div>
              
              {/* What We Offer Section */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">
                  What We Offer
                </h3>
                <div className="text-sm text-gray-600">
                  <p className="mb-2">
                    Today, Visual English empowers educators with:
                  </p>
                  
                  <ul className="list-disc pl-5 space-y-1 mb-3">
                    <li>10-book series with printable units</li>
                    <li>200–300 image prompts per unit</li>
                    <li>Flashcards, games, and videos</li>
                    <li>Conversation-based lessons</li>
                  </ul>
                  
                  <p className="font-medium">
                    Our goal: Make English learning fun, visual, and effective.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-gray-50 py-6" id="about-cta">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ready to transform your English teaching?</h2>
            <p className="text-gray-600 text-sm mb-4 max-w-2xl mx-auto">
              Join the Visual English community and provide your students with engaging, interactive learning materials.
            </p>
            
            <Link href="/books">
              <button className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Explore Our Books
              </button>
            </Link>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
    </>
  );
}