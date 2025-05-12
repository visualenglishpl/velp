import React from 'react';

export default function TestPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center mb-4">Test Page</h1>
        <p className="text-gray-600 text-center mb-6">
          This is a simple test page to verify routing is working properly.
        </p>
        <div className="flex justify-center">
          <a 
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back Home
          </a>
        </div>
      </div>
    </div>
  );
}