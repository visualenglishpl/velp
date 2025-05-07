import React from 'react';
import { useContext } from 'react';
import AuthPage from './auth-page';
import { AuthContext } from '../hooks/use-auth';

// This wrapper is needed to handle the case where the auth page 
// is accessed directly without going through the app
const AuthPageWrapper = () => {
  // Check if auth context exists
  const authContext = useContext(AuthContext);
  
  // If context exists, render the auth page directly
  if (authContext) {
    return <AuthPage />;
  }
  
  // If no context (unlikely since we add AuthProvider in main.tsx),
  // display a fallback message
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Authentication Error</h1>
      <p className="text-gray-600 mb-4">
        There was a problem loading the authentication system.
      </p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Reload Page
      </button>
    </div>
  );
};

export default AuthPageWrapper;