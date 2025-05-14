import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "wouter";
import { Loader2, LogIn } from "lucide-react";

interface AdminRouteProps {
  path: string;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, children }) => {
  // Safe fallback approach - don't use auth hooks
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<null | { id: number; username: string; role: string }>(null);
  
  // Fetch user data directly
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
        } else {
          console.log("User not authenticated");
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking authentication:", err);
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
            <div className="flex flex-col justify-center items-center h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-500 mb-4">Loading admin authentication...</p>
              <div className="flex flex-col items-center gap-2">
                <Link href="/login" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                  <LogIn className="h-4 w-4 mr-1" /> Login directly if loading takes too long
                </Link>
              </div>
            </div>
          );
        }
        
        // Redirect if user not authenticated
        if (!user) {
          console.log("User not authenticated, redirecting to login page");
          return <Redirect to="/login" />;
        }
        
        // Redirect if non-admin tries to access admin route
        if (user.role !== "admin") {
          console.log("Non-admin attempting to access admin page, redirecting to home");
          return <Redirect to="/books" />;
        }
        
        // Render the route content for admin
        return <>{children}</>;
      }}
    </Route>
  );
};

export default AdminRoute;