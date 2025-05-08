import { Helmet } from "react-helmet";
import EUProjectSection from "../components/sections/EUProjectSection";
import { useState } from "react";
import { X } from "lucide-react";

export default function MethodPage() {
  const [showImageModal, setShowImageModal] = useState(false);
  const [zoomImageSrc, setZoomImageSrc] = useState("");
  return (
    <>
      <Helmet>
        <title>Discover the Visual English Method</title>
      </Helmet>
      
      <main>
        {/* Method Hero Section */}
        <section className="bg-white py-6 md:py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-2xl md:text-3xl font-medium text-gray-800 mb-3">
                Discover the Visual English Method
              </h1>
              
              <p className="text-gray-600 mb-5 max-w-2xl mx-auto text-sm">
                A complete, image-based approach for teaching English to children aged 4–15 — designed for ESL teachers who want structured lessons, instant engagement, and minimal prep.
              </p>
              
              <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2 p-4 flex flex-col justify-center">
                    <h2 className="text-lg font-medium text-gray-700 mb-2">
                      Built by teachers, for teachers.
                    </h2>
                    <p className="text-gray-600 text-sm mb-2">
                      Visual English was created by Izabela Buassa, an English teacher with over 25 years of classroom experience. She constantly faced one challenge: finding consistent, conversation-based ESL materials that worked with young learners.
                    </p>
                    <p className="text-gray-600 text-sm mb-2">
                      There was always a gap in the market — a lack of ready-to-use content that helped children speak, not just memorize. Teachers were left pulling resources from dozens of places.
                    </p>
                    <p className="text-gray-600 text-sm">
                      The solution? Visual English — built around visual cues like images, GIFs, and videos to spark real conversation without translation.
                    </p>
                  </div>
                  <div className="md:w-1/2 flex items-center">
                    <img 
                      src="/api/direct/content/VISUAL WEBSITE/IZA 2.png" 
                      alt="Visual English Teacher"
                      className="w-full h-auto object-contain"
                      onClick={() => {
                        setZoomImageSrc("/api/direct/content/VISUAL WEBSITE/IZA 2.png");
                        setShowImageModal(true);
                      }}
                      style={{ cursor: 'pointer' }}
                    />
                  </div>
                </div>
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
                  Each 45–60 minute lesson includes:
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-2 mr-4">
                      <span className="text-blue-500 text-xl">🔹</span>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-700">Warm-up (10–15 min)</h3>
                      <p className="text-gray-600 font-light">Picture discussion or guessing game</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-2 mr-4">
                      <span className="text-green-500 text-xl">🔹</span>
                    </div>
                    <div>
                      <h3 className="text-md font-medium text-gray-700">Main Practice (25-30 min)</h3>
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
              <div className="md:w-1/2 relative group">
                <img 
                  src="/api/direct/content/VISUAL WEBSITE/lesson.png" 
                  alt="Household Chores Unit Sample" 
                  className="rounded-lg w-full h-auto cursor-pointer hover:opacity-90 transition-opacity shadow-md"
                  onClick={() => {
                    setZoomImageSrc("/api/direct/content/VISUAL WEBSITE/lesson.png");
                    setShowImageModal(true);
                  }}
                />
                <div className="absolute bottom-3 right-3 bg-white bg-opacity-80 rounded-full p-2 shadow-md opacity-80 group-hover:opacity-100 transition-opacity">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
                    <path d="M15 3h6v6"></path>
                    <path d="M10 14 21 3"></path>
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  </svg>
                </div>
              </div>
              <div className="md:w-1/2 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
                <p className="text-gray-600 font-light mb-4">
                  In "Household Chores," students view images of cleaning activities. The teacher asks:
                </p>
                <div className="space-y-3 mb-4 pl-4 border-l-2 border-teal-100">
                  <p className="font-medium text-gray-700">"Who is cleaning the house?"</p>
                  <p className="text-gray-600 font-light">→ Student: "The children are cleaning the house."</p>
                  
                  <p className="font-medium text-gray-700 mt-4">"Do you help clean at home?"</p> 
                  <p className="text-gray-600 font-light">→ Student: "Yes, I clean my room."</p>
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
              
              <div className="text-center mt-8 flex flex-col items-center">
                <a href="/books" className="inline-flex items-center px-8 py-3 border border-transparent text-base font-normal rounded-md shadow-sm text-white bg-teal-500 hover:bg-teal-600 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open mr-2">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                  </svg>
                  Explore Our Books
                </a>
                
                <div className="flex items-center gap-3 mt-4">
                  <span className="text-gray-500 text-sm">Follow Us:</span>
                  <a href="https://www.facebook.com/visualenglishpl" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@visualenglishbooks" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-teal-500 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* EU Project Section */}
        <EUProjectSection />
      </main>

      {/* Image Zoom Modal */}
      {showImageModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4"
          onClick={() => setShowImageModal(false)}
        >
          <div className="relative max-w-5xl max-h-[90vh] overflow-auto bg-white rounded-lg p-1">
            <button 
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                setShowImageModal(false);
              }}
            >
              <X className="h-6 w-6 text-gray-600" />
            </button>
            <img 
              src={zoomImageSrc} 
              alt="Enlarged View" 
              className="max-w-full h-auto rounded"
            />
          </div>
        </div>
      )}
    </>
  );
}