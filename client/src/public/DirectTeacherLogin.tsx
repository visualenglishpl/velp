import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function DirectTeacherLogin() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Check if already logged in
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.role === 'teacher') {
          navigate('/teacher-dashboard');
        }
      } catch (error) {
        // Ignore parsing errors
      }
    }
  }, [navigate]);

  const handleDirectLogin = async () => {
    setIsLoggingIn(true);
    setLoginError(null);
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: 'teacher',
          password: 'admin123',
          role: 'teacher'
        }),
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to log in');
      }
      
      const userData = await response.json();
      
      // Store user data
      localStorage.setItem('user', JSON.stringify(userData));
      
      toast({
        title: 'Logged in successfully',
        description: 'Welcome to the Teacher Dashboard',
      });
      
      // Navigate to teacher dashboard
      navigate('/teacher-dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setLoginError('Failed to log in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Visual English Teacher Portal</h1>
          <p className="mt-1">Quick access to teacher dashboard</p>
        </div>
        
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center my-4">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                <svg className="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12V4C20 2.89543 19.1046 2 18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M13 2V8L16 5L19 8V2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 14C10 13.4477 10.4477 13 11 13H21C21.5523 13 22 13.4477 22 14V20C22 20.5523 21.5523 21 21 21H11C10.4477 21 10 20.5523 10 20V14Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M13 17C13 17.5523 12.5523 18 12 18C11.4477 18 11 17.5523 11 17C11 16.4477 11.4477 16 12 16C12.5523 16 13 16.4477 13 17Z" fill="currentColor"/>
                </svg>
              </div>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">Direct Teacher Access</h2>
            <p className="text-sm text-gray-600 mt-1">
              Click the button below to instantly access the teacher dashboard
            </p>
          </div>
          
          {loginError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-4 text-sm">
              {loginError}
            </div>
          )}
          
          <Button 
            className="w-full py-6 bg-blue-600 hover:bg-blue-700 font-medium"
            onClick={handleDirectLogin}
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Logging in...
              </>
            ) : (
              'Access Teacher Dashboard'
            )}
          </Button>
          
          <div className="mt-6 text-center">
            <a 
              href="/"
              className="text-sm text-blue-600 hover:text-blue-800 font-medium"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}