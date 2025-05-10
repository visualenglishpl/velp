import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Loader2, LogIn, User, GraduationCap, Book, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// The logo is now implemented directly in the JSX below

export default function LoginPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'school'>('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'login' | 'preview'>('login');
  
  // Check for existing authentication on component mount
  useEffect(() => {
    try {
      const userRole = window.localStorage.getItem("userRole");
      const authToken = window.localStorage.getItem("authToken");
      
      if (userRole && authToken) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
    }
  }, [navigate]);
  
  // This is for demonstration purposes - in a real app, this would be an API call
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Simulating API call with a timeout
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // For demo purposes, we're directly setting localStorage items
      // In production, this would be done after a successful API login response
      
      // Generate a fake token
      const token = `demo-token-${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
      
      // Store session data in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', selectedRole);
      localStorage.setItem('hasFullAccess', 'true');
      localStorage.setItem('userEmail', email);
      
      toast({
        title: 'Login successful',
        description: `You're now logged in as a ${selectedRole}`,
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password. Please try again.');
      toast({
        title: 'Login failed',
        description: 'Please check your credentials and try again',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleQuickLogin = () => {
    // For demo purposes, we're directly setting localStorage items
    localStorage.setItem('authToken', `demo-token-${Date.now()}`);
    localStorage.setItem('userRole', selectedRole);
    localStorage.setItem('hasFullAccess', 'true');
    
    toast({
      title: 'Quick login successful',
      description: `You're now logged in as a ${selectedRole}`,
    });
    
    // Redirect to content viewer
    navigate('/simple-viewer');
  };
  
  const handlePreviewContent = () => {
    // Redirect to content viewer without authentication
    navigate('/simple-viewer');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="mx-auto flex justify-center mb-4">
            <div className="flex items-center">
              <Book className="h-8 w-8 text-primary" />
              <span className="ml-2 font-bold text-xl text-primary">VELP</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">VELP Portal</h1>
          <p className="text-gray-500 mt-2">Visual English Learning Platform</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'preview')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="login">
              <LogIn className="h-4 w-4 mr-2" /> 
              Sign In
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Book className="h-4 w-4 mr-2" />
              Quick Preview
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Sign In</CardTitle>
                <CardDescription>
                  Enter your credentials to access the platform
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="grid grid-cols-3 gap-2 mt-1">
                      <button
                        type="button"
                        onClick={() => setSelectedRole('admin')}
                        className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                          selectedRole === 'admin'
                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <User className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">Admin</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedRole('teacher')}
                        className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                          selectedRole === 'teacher'
                            ? 'border-green-600 bg-green-50 text-green-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <GraduationCap className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">Teacher</span>
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => setSelectedRole('school')}
                        className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                          selectedRole === 'school'
                            ? 'border-amber-600 bg-amber-50 text-amber-700'
                            : 'border-gray-200 hover:border-gray-300 text-gray-700'
                        }`}
                      >
                        <School className="h-5 w-5 mb-1" />
                        <span className="text-sm font-medium">School</span>
                      </button>
                    </div>
                  </div>
                  
                  {error && (
                    <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200">
                      {error}
                    </div>
                  )}
                  
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Sign In
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>VELP - Visual English Learning Platform</p>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Content Preview</CardTitle>
                <CardDescription>
                  Quick access to preview content or test the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Role for Quick Login</Label>
                  <div className="grid grid-cols-3 gap-2 mt-1">
                    <button
                      type="button"
                      onClick={() => setSelectedRole('admin')}
                      className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                        selectedRole === 'admin'
                          ? 'border-blue-600 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <User className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Admin</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedRole('teacher')}
                      className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                        selectedRole === 'teacher'
                          ? 'border-green-600 bg-green-50 text-green-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <GraduationCap className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">Teacher</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => setSelectedRole('school')}
                      className={`flex flex-col items-center justify-center p-3 rounded-md border-2 transition-colors ${
                        selectedRole === 'school'
                          ? 'border-amber-600 bg-amber-50 text-amber-700'
                          : 'border-gray-200 hover:border-gray-300 text-gray-700'
                      }`}
                    >
                      <School className="h-5 w-5 mb-1" />
                      <span className="text-sm font-medium">School</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <Button 
                    onClick={handleQuickLogin}
                    className="w-full"
                  >
                    <LogIn className="mr-2 h-4 w-4" />
                    Quick Login as {selectedRole}
                  </Button>
                  
                  <Button 
                    onClick={handlePreviewContent}
                    variant="outline"
                    className="w-full"
                  >
                    <Book className="mr-2 h-4 w-4" />
                    Preview Without Login
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center text-sm text-gray-500">
                <p>Preview mode has limited access to content</p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="text-center mt-4">
          <Button 
            variant="link" 
            onClick={() => navigate('/')}
            className="text-gray-500 hover:text-gray-700"
          >
            Return to main site
          </Button>
        </div>
      </div>
    </div>
  );
}