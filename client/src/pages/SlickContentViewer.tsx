import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { Loader2, Book, Home, LogIn, UserRound, GraduationCap, Building } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SlickContentViewer() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Basic states
  const [isLoading, setIsLoading] = useState(false);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Extract bookId and unitNumber from URL
  const [match, params] = useRoute('/book/:bookId/unit/:unitNumber');
  
  // Default book and unit
  let bookId = "1";
  let unitNumber = "1";
  
  if (params) {
    bookId = params.bookId;
    unitNumber = params.unitNumber;
  }
  
  // Login form submit handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: loginData.username,
          password: loginData.password,
          role: selectedRole
        })
      });
      
      if (response.ok) {
        toast({
          title: "Login Successful",
          description: "You are now logged in",
        });
        // Refresh the page to load content
        window.location.reload();
      } else {
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Content Viewer Login</h1>
        <p className="mb-6 text-center text-gray-600">
          Please log in to view the content for Book {bookId} Unit {unitNumber}
        </p>
        
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "admin" 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <UserRound className="h-5 w-5 mb-1" />
                <span className="text-xs">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("teacher")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "teacher" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800"
                }`}
              >
                <GraduationCap className="h-5 w-5 mb-1" />
                <span className="text-xs">Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("school")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "school" 
                    ? "bg-amber-600 text-white" 
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <Building className="h-5 w-5 mb-1" />
                <span className="text-xs">School</span>
              </button>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Log In
          </Button>
          
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}