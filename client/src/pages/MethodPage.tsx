import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";

export default function MethodPage() {
  return (
    <>
      <Helmet>
        <title>Discover the Visual English Method</title>
      </Helmet>
      
      <main>
        {/* Method Hero Section */}
        <section className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Discover the Visual English Method
              </h1>
              
              <p className="text-gray-700 mb-6 max-w-3xl mx-auto">
                Crafted by experienced teacher Izabela Buassa, Visual English is a breakthrough teaching method designed 
                specifically for young ESL learners aged 4 to 15.
              </p>
            </div>
          </div>
        </section>

        {/* What Makes Visual English Unique */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ✅ What Makes Visual English Unique?
            </h2>

            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2"><span className="inline-block transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}>🎯</span> 1. Visual-Based Learning</h3>
                <p className="text-gray-700">Each unit includes 200–300 vibrant images, making English lessons memorable, interactive, and age-appropriate.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2"><span className="inline-block transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}>🗣️</span> 2. Conversation-Driven Approach</h3>
                <p className="text-gray-700">Lessons are centered on real spoken interaction using structured questions and prompts tied directly to visuals.</p>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-2"><span className="inline-block transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 1px 2px rgba(0,0,0,0.2)", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.1))" }}>⏱️</span> 3. Minimal Prep for Teachers</h3>
                <p className="text-gray-700">Our materials are fully prepared — just open the book and start teaching. Perfect for busy educators.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Age-Specific Content */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              <span className="inline-block transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>👩‍🏫</span> 4. Age-Specific Content
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ages 4–8 (Beginner)</h3>
                <p className="text-gray-700 mb-2">Simple vocabulary, phrases, and short sentences</p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>• Basic greetings and everyday phrases</li>
                  <li>• Simple question-answer structure</li>
                  <li>• Playful, age-appropriate visuals</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ages 9–12 (Intermediate)</h3>
                <p className="text-gray-700 mb-2">More complex sentences, conversation building</p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>• Extended vocabulary for daily topics</li>
                  <li>• Conversational skills development</li>
                  <li>• Engaging, topic-focused visuals</li>
                </ul>
              </div>

              <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ages 13–15 (Advanced)</h3>
                <p className="text-gray-700 mb-2">Reading, writing, and grammar through interactive dialogue</p>
                <ul className="mt-2 space-y-1 text-gray-700">
                  <li>• Nuanced language structures</li>
                  <li>• Discussion-oriented approach</li>
                  <li>• Relevant, age-specific visuals</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features at a Glance */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">
              <span className="inline-block transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>🌟</span> Key Features at a Glance
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)" }}>📸</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">200–300 images per unit</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>🧠</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Structured questions for better retention</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>🧑‍🏫</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">10 ready-made books</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>📽️</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Visuals, GIFs, and video content</h3>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center text-center">
                <div className="text-4xl mb-3 transform hover:scale-110 transition-transform duration-200" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.2)", filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.15))" }}>🔁</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Direct method: teaching through speaking</h3>
              </div>
            </div>
          </div>
        </section>

        {/* Example Visual Material */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/0E.png" 
                alt="Visual English Material Example" 
                className="max-w-full md:max-w-2xl rounded-lg shadow-md mb-8"
              />
            </div>
          </div>
        </section>

        {/* Closing Statement */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-gray-700 mb-6 text-center max-w-3xl mx-auto text-lg italic">
              Visual English isn't just a curriculum. It's a new way to connect with learners — through images, interaction, and imagination.
            </p>
            
            <div className="text-center mt-8">
              <a href="/books" className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md shadow-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-search mr-2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
                Explore Our Books
              </a>
            </div>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
    </>
  );
}