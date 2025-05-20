import { ReactNode, useEffect, useState } from 'react';
import { Redirect, Route, useLocation } from 'wouter';
import { Loader2 } from 'lucide-react';

interface TeacherRouteProps {
  path: string;
  children: ReactNode;
}

export function TeacherRoute({ path, children }: TeacherRouteProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);
  const [, navigate] = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      
      if (!userData) {
        setIsLoading(false);
        return;
      }
      
      try {
        const user = JSON.parse(userData);
        if (user.role === 'teacher') {
          setIsTeacher(true);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.error('Error parsing user data:', error);
      }
    };
    
    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="flex flex-col items-center">
            <Loader2 className="h-12 w-12 text-blue-600 animate-spin mb-4" />
            <p className="text-gray-600">Loading teacher dashboard...</p>
          </div>
        </div>
      </Route>
    );
  }

  if (!isTeacher) {
    return (
      <Route path={path}>
        <Redirect to="/teacher-login" />
      </Route>
    );
  }

  return <Route path={path}>{children}</Route>;
}

export default TeacherRoute;