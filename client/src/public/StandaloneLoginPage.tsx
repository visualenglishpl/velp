import { useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, LogIn, User, GraduationCap, Book, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Helmet } from 'react-helmet';

export default function StandaloneLoginPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [fullName, setFullName] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'school'>('teacher');
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Testing credentials - add this as a helper for development
  const fillTestCredentials = () => {
    if (selectedRole === 'admin') {
      setUsername('admin');
      setPassword('admin123');
    } else if (selectedRole === 'teacher') {
      setUsername('teacher');
      setPassword('teacher123');
    } else {
      setUsername('school');
      setPassword('school123');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    
    try {
      console.log("Attempting login with:", { username, password, role: selectedRole });
      
      // For development, log more detailed information
      console.log("Login endpoint: /api/login");
      console.log("Full credentials being sent:", JSON.stringify({ 
        username, 
        password,
        role: selectedRole
      }, null, 2));
      
      const res = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username, 
          password,
          role: selectedRole
        }),
        credentials: "include",
      });
      
      console.log("Login response status:", res.status);
      
      if (!res.ok) {
        // Try to get detailed error message from response
        let errorMessage = "Login failed";
        try {
          const errorData = await res.json();
          console.error("Login error response:", errorData);
          errorMessage = errorData.error || `Login failed with status ${res.status}`;
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          errorMessage = `Login failed with status ${res.status}`;
        }
        throw new Error(errorMessage);
      }
      
      // Parse the user data
      let userData;
      try {
        userData = await res.json();
        console.log("Login successful, user data:", userData);
      } catch (jsonError) {
        console.error("Failed to parse user data:", jsonError);
        throw new Error("Login was successful but failed to get user details");
      }
      
      // Show success toast
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.username}!`,
      });
      
      // Small delay to allow the toast to be seen
      setTimeout(() => {
        // Redirect based on role
        if (userData.role === 'admin') {
          console.log("Redirecting to admin dashboard");
          window.location.href = "/admin";
        } else {
          console.log("Redirecting to books page");
          window.location.href = "/books";
        }
      }, 500);
    } catch (error) {
      console.error("Login error details:", error);
      toast({
        title: "Login failed",
        description: error instanceof Error ? error.message : "Invalid username or password",
        variant: "destructive",
      });
      setAuthError(error instanceof Error ? error.message : "Failed to log in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsLoading(true);
    
    try {
      console.log("Attempting registration with:", { username, password, email, fullName, role: selectedRole });
      
      // For development, log more detailed information
      console.log("Registration endpoint: /api/register");
      console.log("Full data being sent:", JSON.stringify({ 
        username, 
        password,
        email,
        fullName,
        role: selectedRole
      }, null, 2));
      
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          username, 
          password,
          email,
          fullName,
          role: selectedRole
        }),
        credentials: "include",
      });
      
      console.log("Registration response status:", res.status);
      
      if (!res.ok) {
        // Try to get detailed error message from response
        let errorMessage = "Registration failed";
        try {
          const errorData = await res.json();
          console.error("Registration error response:", errorData);
          errorMessage = errorData.error || `Registration failed with status ${res.status}`;
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
          errorMessage = `Registration failed with status ${res.status}`;
        }
        throw new Error(errorMessage);
      }
      
      // Parse the user data
      let userData;
      try {
        userData = await res.json();
        console.log("Registration successful, user data:", userData);
      } catch (jsonError) {
        console.error("Failed to parse user data:", jsonError);
        throw new Error("Registration was successful but failed to get user details");
      }
      
      // Show success toast
      toast({
        title: "Registration Successful",
        description: `Welcome to Visual English, ${userData.username}!`,
      });
      
      // Small delay to allow the toast to be seen
      setTimeout(() => {
        // Redirect based on role
        if (userData.role === 'admin') {
          console.log("Redirecting to admin dashboard");
          window.location.href = "/admin";
        } else {
          console.log("Redirecting to books page");
          window.location.href = "/books";
        }
      }, 500);
    } catch (error) {
      console.error("Registration error details:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "Could not create account. Please try again.",
        variant: "destructive",
      });
      setAuthError(error instanceof Error ? error.message : "Failed to register. Please try again.");
    } finally {
      setIsLoading(false);
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
                      
                      <div className="space-y-4">
                        {process.env.NODE_ENV !== 'production' && (
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              className="w-full text-xs bg-slate-100 text-slate-700 hover:bg-slate-200" 
                              type="button"
                              variant="outline"
                              onClick={fillTestCredentials}
                            >
                              Fill Test Credentials
                            </Button>
                            
                            <Button
                              className="w-full text-xs bg-purple-100 text-purple-700 hover:bg-purple-200" 
                              type="button"
                              variant="outline"
                              onClick={async () => {
                                setUsername('admin');
                                setPassword('admin123');
                                setSelectedRole('admin');
                                
                                // Immediately submit login after setting credentials
                                setIsLoading(true);
                                try {
                                  const loginRes = await fetch("/api/login", {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({ 
                                      username: "admin", 
                                      password: "admin123",
                                      role: "admin"
                                    }),
                                    credentials: "include",
                                  });
                                  
                                  if (!loginRes.ok) {
                                    throw new Error("Login failed");
                                  }
                                  
                                  const userData = await loginRes.json();
                                  
                                  toast({
                                    title: "Admin Login Successful",
                                    description: `Welcome back, ${userData.username}!`,
                                  });
                                  
                                  // Redirect to admin dashboard
                                  setTimeout(() => {
                                    window.location.href = "/admin";
                                  }, 500);
                                } catch (error) {
                                  toast({
                                    title: "Admin Login Failed",
                                    description: "Could not automatically log in as admin. Please try manually.",
                                    variant: "destructive",
                                  });
                                  setIsLoading(false);
                                }
                              }}
                            >
                              Quick Admin Login
                            </Button>
                          </div>
                        )}
                        
                        <Button
                          className="w-full" 
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <LogIn className="h-4 w-4 mr-2" />
                          )}
                          Sign In
                        </Button>
                      </div>
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
                      
                      <div className="space-y-4">
                        {process.env.NODE_ENV !== 'production' && (
                          <div className="grid grid-cols-2 gap-2">
                            <Button
                              className="w-full text-xs bg-slate-100 text-slate-700 hover:bg-slate-200" 
                              type="button"
                              variant="outline"
                              onClick={() => {
                                fillTestCredentials();
                                setEmail(`${selectedRole}@example.com`);
                                setFullName(`${selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} User`);
                              }}
                            >
                              Fill Test Credentials
                            </Button>
                            
                            <Button
                              className="w-full text-xs bg-purple-100 text-purple-700 hover:bg-purple-200" 
                              type="button"
                              variant="outline"
                              onClick={() => {
                                setUsername('admin');
                                setPassword('admin123');
                                setSelectedRole('admin');
                                setEmail('admin@example.com');
                                setFullName('Admin User');
                              }}
                            >
                              Quick Admin Signup
                            </Button>
                          </div>
                        )}
                        
                        <Button 
                          className="w-full" 
                          type="submit"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          ) : (
                            <User className="h-4 w-4 mr-2" />
                          )}
                          Create Account
                        </Button>
                      </div>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}