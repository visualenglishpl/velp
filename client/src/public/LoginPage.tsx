import { useState, useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'wouter';
import { Loader2, LogIn, User, GraduationCap, Book, School } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';

export default function LoginPage() {
  const [location, navigate] = useLocation();
  const { user, isLoading: authLoading, loginMutation } = useAuth();
  
  // Form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<'admin' | 'teacher' | 'school'>('teacher');
  const [activeTab, setActiveTab] = useState<'login' | 'preview'>('login');
  
  // Check if user is already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/books');
      }
    }
  }, [user, navigate]);
  
  // Handle login form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    loginMutation.mutate({
      username,
      password,
      role: selectedRole
    });
  };
  
  // Handle preview content
  const handlePreviewContent = () => {
    navigate('/books');
  };
  
  // If already authenticated and waiting for redirect
  if (user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-lg text-gray-600">You are already logged in, redirecting...</p>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>Sign In | Visual English</title>
      </Helmet>
      
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-slate-50 to-slate-100 p-4">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <div className="mx-auto flex justify-center mb-4">
              <div className="flex items-center">
                <Book className="h-8 w-8 text-primary" />
                <span className="ml-2 font-bold text-xl text-primary">Visual English</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Portal</h1>
            <p className="text-gray-500 mt-2">Sign in to access content</p>
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
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="your.username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                    
                    {loginMutation.error && (
                      <div className="p-3 text-sm bg-red-50 text-red-600 rounded-md border border-red-200">
                        {loginMutation.error.message || 'Login failed. Please check your credentials.'}
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loginMutation.isPending || authLoading}
                    >
                      {loginMutation.isPending ? (
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
                  <p>Visual English Learning Platform</p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="preview">
              <Card>
                <CardHeader>
                  <CardTitle>Content Preview</CardTitle>
                  <CardDescription>
                    Preview Visual English content without logging in
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600">
                    You can access a limited preview of our learning content without creating an account.
                    This will allow you to browse our collection of Visual English books and view sample materials.
                  </p>
                  
                  <div className="flex flex-col space-y-2">
                    <Button 
                      onClick={handlePreviewContent}
                      className="w-full"
                    >
                      <Book className="mr-2 h-4 w-4" />
                      Browse as Guest
                    </Button>
                  </div>
                  
                  <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded border border-gray-200">
                    <p className="font-medium mb-1">Preview limitations:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Only the first few slides in each unit are available</li>
                      <li>No access to teacher resources</li>
                      <li>Cannot save progress</li>
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center text-sm text-gray-500">
                  <p>Sign in for full access to all features</p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-4">
            <RouterLink href="/">
              <Button 
                variant="link" 
                className="text-gray-500 hover:text-gray-700"
              >
                Return to main site
              </Button>
            </RouterLink>
          </div>
        </div>
      </div>
    </>
  );
}