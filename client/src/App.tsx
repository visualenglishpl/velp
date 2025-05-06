import { Toaster } from "./components/ui/toaster";
import React from "react";

// TestTeacherResources page has been removed as it's not necessary

function App() {
  console.log('Rendering minimal test component');
  
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white">
        <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Visual English Application
          </h1>
          <p className="text-center text-gray-600 mb-8">
            This is a minimal test component to verify application loading.
          </p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
              onClick={() => window.location.reload()}
            >
              Refresh Application
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}

export default App;
