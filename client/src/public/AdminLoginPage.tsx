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
  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" fill="white"/>
    <path d="M7 18H17V16H7V18Z" fill="#5E35B1"/>
    <path d="M17 14H7V12H17V14Z" fill="#5E35B1"/>
    <path d="M17 10H7V8H17V10Z" fill="#5E35B1"/>
    <path d="M7 6H17V4H7V6Z" fill="#5E35B1"/>
    <path d="M5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22ZM5 4H19V20H5V4Z" fill="#5E35B1"/>
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
      
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          role: 'admin'
        }),
        credentials: "include",
      });
      
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || `Login failed with status ${res.status}`);
      }
      
      const userData = await res.json();
      
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
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 text-center pb-6">
            <div className="flex justify-center mb-2">
              <VELogo />
            </div>
            <CardTitle className="text-2xl font-bold">Visual English Admin</CardTitle>
          </CardHeader>
          
          <CardContent>
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
              
              <Button
                className="w-full bg-purple-600 hover:bg-purple-700"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4 mr-2" />
                )}
                Admin Login
              </Button>
              
              <div className="text-center mt-4">
                <a 
                  href="/" 
                  className="text-sm text-purple-600 hover:text-purple-800"
                >
                  Return to home page
                </a>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}