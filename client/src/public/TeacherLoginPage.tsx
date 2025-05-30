import { useState } from 'react';
import { Redirect } from 'wouter';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Helmet } from 'react-helmet';

// Visual English logo SVG component
const VELogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="white"/>
    <ellipse cx="50" cy="50" rx="25" ry="30" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="3"/>
    <circle cx="50" cy="50" r="10" fill="currentColor"/>
  </svg>
);

export default function TeacherLoginPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Check if already logged in (from localStorage)
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (user && user.role === 'teacher') {
    return <Redirect to="/teacher-dashboard" />;
  }
  
  const handleTeacherLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    
    try {
      console.log("Visual English Teacher Login: Attempting login");
      
      // Force teacher role for this dedicated login page
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: 'teacher' // Hardcoded role - this page is exclusively for teacher login
        }),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Login failed with status ${res.status}`);
      }
      
      const userData = await res.json();
      
      // Additional verification to ensure only teachers can use this page
      if (userData.role !== 'teacher') {
        throw new Error("You don't have teacher access. Please log in with a teacher account.");
      }
      
      // Store user data for session recovery
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Teacher Login Successful",
        description: `Welcome back, ${userData.username}!`,
      });
      
      window.location.href = "/teacher-dashboard";
    } catch (error) {
      console.error("Teacher login error:", error);
      setAuthError(error instanceof Error 
        ? error.message 
        : "Invalid teacher credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Teacher Login | Visual English</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl">
          {/* Left side - Blue panel */}
          <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-blue-500 to-blue-700 p-12 text-white">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold mb-6">VELP</h1>
              <div className="text-lg text-white/70 mb-2">Visual English Learning Platform</div>
              <div className="border-t border-white/20 my-6"></div>
              <h2 className="text-2xl font-medium mb-4">Teacher Portal</h2>
              <p className="mb-4 text-white/80">Access your teaching tools and materials</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 5C19.89 4.65 18.67 4.5 17.5 4.5C15.55 4.5 13.45 4.9 12 6C10.55 4.9 8.45 4.5 6.5 4.5C4.55 4.5 2.45 4.9 1 6V20.65C1 20.9 1.25 21.15 1.5 21.15C1.6 21.15 1.65 21.1 1.75 21.1C3.1 20.45 5.05 20 6.5 20C8.45 20 10.55 20.4 12 21.5C13.35 20.65 15.8 20 17.5 20C19.15 20 20.85 20.3 22.25 21.05C22.35 21.1 22.4 21.1 22.5 21.1C22.75 21.1 23 20.85 23 20.6V6C22.4 5.55 21.75 5.25 21 5ZM21 18.5C19.9 18.15 18.7 18 17.5 18C15.8 18 13.35 18.65 12 19.5V8C13.35 7.15 15.8 6.5 17.5 6.5C18.7 6.5 19.9 6.65 21 7V18.5Z" fill="white"/>
                      <path d="M17.5 10.5C18.38 10.5 19.23 10.59 20 10.76V9.24C19.21 9.09 18.36 9 17.5 9C15.8 9 14.26 9.29 13 9.83V11.49C14.13 10.85 15.7 10.5 17.5 10.5Z" fill="white"/>
                      <path d="M13 12.49V14.15C14.13 13.51 15.7 13.16 17.5 13.16C18.38 13.16 19.23 13.25 20 13.42V11.9C19.21 11.75 18.36 11.66 17.5 11.66C15.8 11.66 14.26 11.96 13 12.49Z" fill="white"/>
                      <path d="M17.5 14.33C15.8 14.33 14.26 14.63 13 15.16V16.82C14.13 16.18 15.7 15.83 17.5 15.83C18.38 15.83 19.23 15.92 20 16.09V14.57C19.21 14.41 18.36 14.33 17.5 14.33Z" fill="white"/>
                    </svg>
                  </div>
                  <span>Access all teaching materials</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 2L4 5V11.09C4 16.14 7.41 20.85 12 22C16.59 20.85 20 16.14 20 11.09V5L12 2ZM18 11.09C18 15.09 15.45 18.79 12 19.92C8.55 18.79 6 15.1 6 11.09V6.39L12 4.14L18 6.39V11.09Z" fill="white"/>
                      <path d="M10 13L16 7L14.59 5.58L10 10.17L7.91 8.08L6.5 9.5L10 13Z" fill="white"/>
                    </svg>
                  </div>
                  <span>Track student progress</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="white"/>
                    </svg>
                  </div>
                  <span>Share resources with students</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="flex flex-col justify-center p-8 bg-white">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center mb-2">
                <VELogo />
                <span className="ml-2 text-2xl font-bold text-gray-900">Teacher Portal</span>
              </div>
              <p className="text-sm text-gray-500">Access your teaching materials and tools</p>
            </div>
            
            {authError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                <div className="flex">
                  <div className="py-1">
                    <svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <p>{authError}</p>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleTeacherLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="teacher username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              
              <div className="pt-4">
                <Button
                  className="w-full bg-blue-600 hover:bg-blue-700 py-6 text-base font-semibold shadow-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  Sign In as Teacher
                </Button>
              </div>
              
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button 
                type="button"
                variant="outline"
                className="w-full py-6 border-gray-300 font-medium"
                onClick={() => {
                  window.location.href = "/api/auth/google/teacher";
                }}
              >
                <svg className="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Sign in with Google
              </Button>
              
              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <a 
                  href="/" 
                  className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                >
                  Return to home page
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}