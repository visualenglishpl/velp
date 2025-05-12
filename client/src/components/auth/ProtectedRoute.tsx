import React, { useState, useEffect } from "react";
import { Route, Redirect } from "wouter";
import { Loader2 } from "lucide-react";
import { apiRequest } from "../../lib/queryClient";

interface ProtectedRouteProps {
  path: string;
  adminOnly?: boolean;
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  path, 
  adminOnly = false, 
  children 
}) => {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await apiRequest('GET', '/api/user');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  return (
    <Route path={path}>
      {() => {
        // Show loading state
        if (isLoading) {
          return (
            <div className="flex justify-center items-center h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          );
        }
        
        // Redirect if user not authenticated
        if (!user) {
          console.log("User not authenticated, redirecting to login page");
          return <Redirect to="/login" />;
        }
        
        // Redirect if admin-only route is accessed by non-admin
        if (adminOnly && user.role !== "admin") {
          console.log("Non-admin attempting to access admin page, redirecting to home");
          return <Redirect to="/" />;
        }
        
        // Render the route content if all checks pass
        return <>{children}</>;
      }}
    </Route>
  );
};

export default ProtectedRoute;