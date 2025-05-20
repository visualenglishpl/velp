import { useState } from 'react';
import { Redirect } from 'wouter';
import { Loader2, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from "@/hooks/use-toast";
import { Helmet } from 'react-helmet';

// Visual English logo SVG component
const VELogo = () => (
  <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-purple-700">
    <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" fill="white"/>
    <ellipse cx="50" cy="50" rx="25" ry="30" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="3"/>
    <circle cx="50" cy="50" r="10" fill="currentColor"/>
  </svg>
);

export default function AdminLoginPage() {
  const { toast } = useToast();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Check if already logged in (from localStorage)
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (user && user.role === 'admin') {
    return <Redirect to="/admin" />;
  }
  
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    
    try {
      console.log("Visual English Admin Login: Attempting login");
      
      // Special handling for admin login - force role to 'admin' 
      // regardless of what's selected in the UI to ensure this page is only for admin access
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: 'admin' // Hardcoded role - this page is exclusively for admin login
        }),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Login failed with status ${res.status}`);
      }
      
      const userData = await res.json();
      
      // Additional verification to ensure only admins can use this page
      if (userData.role !== 'admin') {
        throw new Error("You don't have admin access. Please log in with an admin account.");
      }
      
      // Store user data for session recovery
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: "Admin Login Successful",
        description: `Welcome to the admin dashboard, ${userData.username}!`,
      });
      
      window.location.href = "/admin";
    } catch (error) {
      console.error("Admin login error:", error);
      setAuthError(error instanceof Error 
        ? error.message 
        : "Invalid admin credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Admin Login | Visual English</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-4xl">
          {/* Left side - Purple panel */}
          <div className="hidden md:flex flex-col justify-center bg-gradient-to-b from-purple-600 to-purple-800 p-12 text-white">
            <div className="max-w-md mx-auto">
              <h1 className="text-4xl font-bold mb-6">VELP</h1>
              <div className="text-lg text-white/70 mb-2">Visual English Learning Platform</div>
              <div className="border-t border-white/20 my-6"></div>
              <h2 className="text-2xl font-medium mb-4">Admin Portal</h2>
              <p className="mb-4 text-white/80">Secure access to the administrative dashboard</p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12C2.73 16.39 7 19.5 12 19.5C17 19.5 21.27 16.39 23 12C21.27 7.61 17 4.5 12 4.5ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17ZM12 9C10.34 9 9 10.34 9 12C9 13.66 10.34 15 12 15C13.66 15 15 13.66 15 12C15 10.34 13.66 9 12 9Z" fill="white"/>
                    </svg>
                  </div>
                  <span>Content management & oversight</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="white"/>
                    </svg>
                  </div>
                  <span>User & subscription management</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM9 17H7V10H9V17ZM13 17H11V7H13V17ZM17 17H15V13H17V17Z" fill="white"/>
                    </svg>
                  </div>
                  <span>Analytics & reporting tools</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Login form */}
          <div className="flex flex-col justify-center p-8 bg-white">
            <div className="flex flex-col items-center justify-center mb-8">
              <div className="flex items-center mb-2">
                <VELogo />
                <span className="ml-2 text-2xl font-bold text-gray-900">Admin Portal</span>
              </div>
              <p className="text-sm text-gray-500">Secure administrative dashboard access</p>
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
            
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  placeholder="admin username"
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
                  className="w-full bg-purple-600 hover:bg-purple-700 py-6 text-base font-semibold shadow-md"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  ) : (
                    <LogIn className="h-5 w-5 mr-2" />
                  )}
                  Sign In as Administrator
                </Button>
              </div>
              
              <div className="text-center mt-6 pt-4 border-t border-gray-100">
                <a 
                  href="/" 
                  className="text-sm text-purple-600 hover:text-purple-800 transition-colors"
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