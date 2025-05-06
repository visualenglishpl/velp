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
              <h1 className="text-3xl md:text-4xl font-medium text-gray-800 mb-6">
                Discover the Visual English Method
              </h1>
              
              <p className="text-gray-600 mb-8 max-w-3xl mx-auto text-lg font-light">
                A complete, image-based approach for teaching English to children aged 4–15 — designed for ESL teachers who want structured lessons, instant engagement, and minimal prep.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg max-w-3xl mx-auto">
                <h2 className="text-xl font-medium text-gray-700 mb-3">
                  Built by teachers, for teachers.
                </h2>
                <p className="text-gray-600 font-light">
                  Visual English was created by Izabela Buassa, an experienced English teacher, to solve a real classroom problem: young learners struggle with speaking English when lessons rely on traditional textbooks or translation.
                </p>
                <p className="text-gray-600 font-light mt-4">
                  The solution? A direct method that uses visual cues — images, GIFs, videos — to spark full-sentence conversation, without needing to translate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Banner Image */}
        <section className="bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-lg overflow-hidden shadow-sm">
              <img 
                src="/api/direct/content/VISUAL WEBSITE/main page.png" 
                alt="Visual English Method Banner"
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 left-4">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png" 
                  alt="Visual English Logo"
                  className="h-16 md:h-20"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Core Teaching Features */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              Core Teaching Features
            </h2>

            <div className="space-y-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  <span className="mr-2">📸</span>Visual-Based Learning
                </h3>
                <p className="text-gray-600 font-light">
                  Each unit includes 200–300 themed images. Teachers display them while asking questions like:
                  "What's she doing?" or "What do you do in the morning?"
                </p>
                <div className="mt-4 space-y-1">
                  <p className="text-gray-600 font-light">✓ No reading required for beginners</p>
                  <p className="text-gray-600 font-light">✓ Great for mixed-ability classrooms</p>
                  <p className="text-gray-600 font-light">✓ Builds vocabulary naturally</p>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  <span className="mr-2">🗣️</span>Conversation-Driven Lessons
                </h3>
                <p className="text-gray-600 font-light">
                  Each unit comes with pre-written question-and-answer flows, helping students practice speaking without needing grammar explanations or translation.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <h3 className="text-lg font-medium text-gray-700 mb-3">
                  <span className="mr-2">⏱️</span>Minimal Prep Time for Teachers
                </h3>
                <p className="text-gray-600 font-light">
                  Everything is ready:
                </p>
                <div className="mt-3 pl-5 space-y-1">
                  <p className="text-gray-600 font-light">• Printable books</p>
                  <p className="text-gray-600 font-light">• Flashcards</p>
                  <p className="text-gray-600 font-light">• PDF slides</p>
                  <p className="text-gray-600 font-light">• Video and GIF folders</p>
                </div>
                <p className="text-gray-600 font-light mt-3">
                  Use in-person, online, or hybrid.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Age Group Breakdown */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              Age Group Breakdown
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Level</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Style & Focus</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">4–8</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Beginner</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-light">
                        Simple Q&A, vocabulary, visuals only (Pre-A1 – A1)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">9–12</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Intermediate</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-light">
                        Extended answers, daily routines, present tense (A1 – A2)
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700">13–15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">Advanced</td>
                      <td className="px-6 py-4 text-sm text-gray-600 font-light">
                        Grammar in use, discussion, written prompts (A2 – B1)
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
        
        {/* Lesson Format Overview */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              Lesson Format Overview
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-600 font-light text-center mb-6">
                  Each 30–40 minute lesson includes:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="text-blue-500 text-xl">🔹</span>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-700">Warm-up (5–10 min)</h3>
                      <p className="text-gray-600 font-light">Picture discussion or guessing game</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
                      <span className="text-green-500 text-xl">🔹</span>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-700">Main Practice (20 min)</h3>
                      <p className="text-gray-600 font-light">Guided Q&A with visual materials</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-2 mr-4">
                      <span className="text-purple-500 text-xl">🔹</span>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-700">Student Talk Time (10–15 min)</h3>
                      <p className="text-gray-600 font-light">Pair or group work, games, roleplay</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sample Visual Activity */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-medium text-gray-800 mb-8 text-center">
              Sample Visual Activity
            </h2>
            
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <img 
                  src="/api/direct/content/VISUAL WEBSITE/0E.png" 
                  alt="Visual English Material Example" 
                  className="rounded-lg w-full h-auto"
                />
              </div>
              <div className="md:w-1/2 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-600 font-light mb-4">
                  In "Daily Routines," students view images of brushing teeth, eating breakfast, and packing a bag. The teacher asks:
                </p>
                <div className="space-y-3 mb-4 pl-4 border-l-2 border-teal-100">
                  <p className="font-medium text-gray-700">"What does she do in the morning?"</p>
                  <p className="text-gray-600 font-light">→ Student: "She brushes her teeth."</p>
                  
                  <p className="font-medium text-gray-700 mt-4">"Do you eat breakfast?"</p> 
                  <p className="text-gray-600 font-light">→ Student: "Yes, I eat eggs."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-12 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-xl font-medium text-gray-800 mb-6 text-center">
                Start Teaching in Minutes
              </h2>
              
              <div className="space-y-3 mb-6 text-center">
                <p className="text-gray-600 font-light">✅ Ready-to-use PDFs</p>
                <p className="text-gray-600 font-light">✅ Flashcards and slides included</p>
                <p className="text-gray-600 font-light">✅ No prep. No translation. Just speaking.</p>
              </div>
              
              <div className="text-center mt-8">
                <a href="/books" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open mr-2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Explore Our Books
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>
    </>
  );
}