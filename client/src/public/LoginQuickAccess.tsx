import React from 'react';
import { Link } from 'wouter';

// Visual English full logo component with text
const VEFullLogo = () => (
  <div className="flex items-center justify-center mb-8">
    <img 
      src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
      alt="Visual English Logo" 
      className="h-16 mr-3"
    />
    <span className="text-2xl font-bold text-gray-800">VISUAL ENGLISH</span>
  </div>
);

const LoginQuickAccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
      <div className="max-w-md w-full space-y-8">
        <VEFullLogo />
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-extrabold text-gray-900">Select Login Type</h2>
          <p className="mt-2 text-sm text-gray-600">
            Choose the appropriate login portal for your role
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/teacher-login">
            <div className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-colors cursor-pointer">
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Teacher Login
            </div>
          </Link>
          
          <Link href="/admin-login">
            <div className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 shadow-sm transition-colors cursor-pointer">
              <svg className="mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Admin Login
            </div>
          </Link>
        </div>
        
        <div className="text-center mt-8">
          <Link href="/">
            <span className="text-sm text-blue-600 hover:text-blue-800 transition-colors cursor-pointer">
              Return to home page
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginQuickAccess;