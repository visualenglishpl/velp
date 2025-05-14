import { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'wouter';
import { Loader2, LogIn, User, GraduationCap, Book, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

// Create a safe wrapper for direct API calls when context isn't available
const useDirectAuth = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  const directLogin = async (credentials: { username: string; password: string; role: string }) => {
    setIsLoading(true);
    try {
      console.log("Visual English Login: Attempting direct login with credentials:", credentials);
      
      // Use fetch directly instead of apiRequest for more control over error handling
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
        credentials: "include",
      });
      
      // Log response status
      console.log("Visual English Login: Response status:", res.status);
      
      if (!res.ok) {
        // Try to get detailed error message from response
        const errorData = await res.json().catch(() => ({}));
        console.error("Visual English Login: Error response:", errorData);
        throw new Error(errorData.error || `Login failed with status ${res.status}`);
      }
      
      const userData = await res.json();
      console.log("Visual English Login: Success! User data:", userData);
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.username}!`,
      });
      
      // Redirect based on role
      if (userData.role === 'admin') {
        console.log("Redirecting to admin dashboard");
        window.location.href = "/admin";
      } else {
        console.log("Redirecting to books page");
        window.location.href = "/books";
      }
      
      return userData;
    } catch (error) {
      console.error("Login error details:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  const directRegister = async (userData: { 
    username: string; 
    password: string; 
    email: string;
    fullName: string;
    role: string;
  }) => {
    setIsLoading(true);
    try {
      const res = await apiRequest("POST", "/api/register", userData);
      const user = await res.json();
      
      toast({
        title: "Registration successful",
        description: `Welcome to VELP, ${user.username}!`,
      });
      
      // Redirect based on role
      if (user.role === 'admin') {
        window.location.href = "/admin";
      } else {
        window.location.href = "/books";
      }
      
      return user;
    } catch (error) {
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account. Please try again.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    directLogin,
    directRegister
  };
};

export default function LoginPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const directAuth = useDirectAuth();
  
  // Use try/catch to safely handle auth errors
  let user = null;
  let loginMutation = { mutate: (data: any) => {}, isPending: false };
  let registerMutation = { mutate: (data: any) => {}, isPending: false };
  let usingDirectAuth = false;
  
  try {
    const auth = useAuth();
    user = auth.user;
    loginMutation = auth.loginMutation;
    registerMutation = auth.registerMutation;
  } catch (error) {
    console.error("Auth context error in LoginPage:", error);
    // We'll use direct API calls instead of context
    usingDirectAuth = true;
  }
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'school'>('teacher');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);

  // If user is already logged in, redirect to appropriate page
  if (user) {
    if (user.role === 'admin') {
      return <Redirect to="/admin" />;
    } else {
      return <Redirect to="/books" />;
    }
  }
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    try {
      // Always use direct login for consistency
      await directAuth.directLogin({ 
        username, 
        password,
        role: selectedRole
      });
      
      // We don't need to use the context-based login since direct login is more reliable
      // and we're having issues with the auth context
    } catch (error) {
      console.error("Login error:", error);
      setAuthError("Failed to log in. Please try again.");
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    
    try {
      // Always use direct register for consistency
      await directAuth.directRegister({
        username,
        password,
        email,
        fullName,
        role: selectedRole
      });
      
      // We don't need to use the context-based register since direct register is more reliable
    } catch (error) {
      console.error("Registration error:", error);
      setAuthError("Failed to register. Please try again.");
    }
  };

  return (
    <>
      <Helmet>
        <title>Login | Visual English</title>
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl w-full space-y-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Hero/Info Section */}
          <div className="flex flex-col justify-center p-6 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg shadow-xl text-white">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl font-extrabold mb-4">Welcome to Visual English</h1>
              <p className="text-lg mb-6">
                A revolutionary platform for teaching and learning English through visual content
              </p>
              
              <div className="space-y-4 mt-8">
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <Book className="h-5 w-5" />
                  </div>
                  <span>Access to a full library of visual learning materials</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <span>Structured teaching and learning paths for all ages</span>
                </div>
                
                <div className="flex items-center">
                  <div className="rounded-full bg-white/20 p-2 mr-3">
                    <User className="h-5 w-5" />
                  </div>
                  <span>Student progress tracking and personalized content</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Login/Register Form */}
          <div>
            <Card className="shadow-lg">
              <CardHeader className="space-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <div className="h-20 flex items-center">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                      <rect width="24" height="24" fill="white"/>
                      <path d="M7 18H17V16H7V18Z" fill="#5E35B1"/>
                      <path d="M17 14H7V12H17V14Z" fill="#5E35B1"/>
                      <path d="M17 10H7V8H17V10Z" fill="#5E35B1"/>
                      <path d="M7 6H17V4H7V6Z" fill="#5E35B1"/>
                      <path d="M5 22H19C20.1 22 21 21.1 21 20V4C21 2.9 20.1 2 19 2H5C3.9 2 3 2.9 3 4V20C3 21.1 3.9 22 5 22ZM5 4H19V20H5V4Z" fill="#5E35B1"/>
                    </svg>
                    <h2 className="text-2xl font-bold tracking-tight">Visual English</h2>
                  </div>
                </div>
                <CardTitle className="text-2xl">Account Access</CardTitle>
                <CardDescription>
                  Sign in or create an account to access the platform
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <Tabs 
                  defaultValue="login" 
                  value={activeTab}
                  onValueChange={(value) => {
                    setActiveTab(value as 'login' | 'register');
                    setAuthError(null); // Clear error when switching tabs
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="register">Register</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="login">
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        <div className="flex">
                          <div className="py-1"><svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                          <div>
                            <p>{authError}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="username">Username</Label>
                        <Input
                          id="username"
                          placeholder="johndoe"
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
                      
                      <div className="space-y-2">
                        <Label>Login as</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={selectedRole === 'teacher' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'teacher' ? 'bg-blue-600 hover:bg-blue-700' : ''
                            }`}
                            onClick={() => setSelectedRole('teacher')}
                          >
                            <GraduationCap className="h-8 w-8 mb-1" />
                            <span className="text-xs">Teacher</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={selectedRole === 'school' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'school' ? 'bg-green-600 hover:bg-green-700' : ''
                            }`}
                            onClick={() => setSelectedRole('school')}
                          >
                            <School className="h-8 w-8 mb-1" />
                            <span className="text-xs">School</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={selectedRole === 'admin' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'admin' ? 'bg-purple-600 hover:bg-purple-700' : ''
                            }`}
                            onClick={() => setSelectedRole('admin')}
                          >
                            <User className="h-8 w-8 mb-1" />
                            <span className="text-xs">Admin</span>
                          </Button>
                        </div>
                      </div>
                      
                      <Button
                        className="w-full" 
                        type="submit"
                        disabled={directAuth.isLoading}
                      >
                        {directAuth.isLoading ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <LogIn className="h-4 w-4 mr-2" />
                        )}
                        Sign In
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="register">
                    {authError && (
                      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                        <div className="flex">
                          <div className="py-1"><svg className="h-5 w-5 text-red-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div>
                          <div>
                            <p>{authError}</p>
                          </div>
                        </div>
                      </div>
                    )}
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-username">Username</Label>
                        <Input
                          id="register-username"
                          placeholder="johndoe"
                          required
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-email">Email</Label>
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="john@example.com"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-name">Full Name</Label>
                        <Input
                          id="register-name"
                          placeholder="John Doe"
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password">Password</Label>
                        <Input
                          id="register-password"
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Register as</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            type="button"
                            variant={selectedRole === 'teacher' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'teacher' ? 'bg-blue-600 hover:bg-blue-700' : ''
                            }`}
                            onClick={() => setSelectedRole('teacher')}
                          >
                            <GraduationCap className="h-8 w-8 mb-1" />
                            <span className="text-xs">Teacher</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={selectedRole === 'school' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'school' ? 'bg-green-600 hover:bg-green-700' : ''
                            }`}
                            onClick={() => setSelectedRole('school')}
                          >
                            <School className="h-8 w-8 mb-1" />
                            <span className="text-xs">School</span>
                          </Button>
                          
                          <Button
                            type="button"
                            variant={selectedRole === 'admin' ? 'default' : 'outline'}
                            className={`flex flex-col items-center justify-center h-20 ${
                              selectedRole === 'admin' ? 'bg-purple-600 hover:bg-purple-700' : ''
                            }`}
                            onClick={() => setSelectedRole('admin')}
                          >
                            <User className="h-8 w-8 mb-1" />
                            <span className="text-xs">Admin</span>
                          </Button>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full"
                        type="submit"
                        disabled={registerMutation.isPending}
                      >
                        {registerMutation.isPending ? (
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        ) : (
                          <LogIn className="h-4 w-4 mr-2" />
                        )}
                        Create Account
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <div className="text-xs text-center text-gray-500 mt-2">
                  By signing in, you agree to our Terms of Service and Privacy Policy.
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}