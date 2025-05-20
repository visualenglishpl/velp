import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { Loader2, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function QuickTeacherAccess() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loginTeacher = async () => {
      try {
        // Try to log in with teacher credentials
        const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: 'teacher',
            password: 'admin123',
            role: 'teacher'
          }),
          credentials: 'include'
        });

        if (response.ok) {
          const userData = await response.json();
          localStorage.setItem('user', JSON.stringify(userData));
          
          setStatus('success');
          toast({
            title: 'Login successful',
            description: 'Welcome to the Teacher Dashboard!'
          });
          
          // Redirect after a short delay to show the success message
          setTimeout(() => {
            navigate('/teacher-dashboard');
          }, 1500);
        } else {
          throw new Error('Login failed');
        }
      } catch (err) {
        console.error('Error during auto-login:', err);
        setError('Failed to log in. Please try again.');
        setStatus('error');
      }
    };

    loginTeacher();
  }, [navigate, toast]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-blue-600 p-6 text-white">
          <div className="flex items-center mb-2">
            <GraduationCap className="h-7 w-7 mr-2" />
            <h1 className="text-2xl font-bold">Teacher Access</h1>
          </div>
          <p className="text-blue-100">Visual English Learning Platform</p>
        </div>
        
        <div className="p-8 text-center">
          {status === 'loading' && (
            <div className="flex flex-col items-center">
              <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
              <h2 className="text-xl font-semibold mb-2">Logging in...</h2>
              <p className="text-gray-600">Accessing teacher dashboard</p>
            </div>
          )}
          
          {status === 'success' && (
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-green-600">Login Successful!</h2>
              <p className="text-gray-600">Redirecting to teacher dashboard...</p>
            </div>
          )}
          
          {status === 'error' && (
            <div className="flex flex-col items-center">
              <div className="h-12 w-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-4">
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold mb-2 text-red-600">Login Failed</h2>
              <p className="text-gray-600 mb-4">{error}</p>
              
              <div className="flex gap-3">
                <Button 
                  variant="outline"
                  className="border-gray-300"
                  onClick={() => navigate('/')}
                >
                  Go Home
                </Button>
                <Button 
                  onClick={() => setStatus('loading')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Try Again
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}