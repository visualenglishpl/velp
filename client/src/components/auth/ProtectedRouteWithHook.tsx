import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "wouter";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

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
  // First try to use the auth hook safely
  let hookUser = null;
  let hookIsLoading = true;
  
  try {
    const auth = useAuth();
    hookUser = auth.user;
    hookIsLoading = auth.isLoading;
  } catch (error) {
    console.error("Auth context error in ProtectedRoute:", error);
    // Will use direct fetch as fallback
  }
  
  // Fallback direct API state
  const [directUser, setDirectUser] = useState<null | { id: number; username: string; role: string }>(null);
  const [directIsLoading, setDirectIsLoading] = useState(true);
  
  // Fetch user data directly as fallback
  useEffect(() => {
    // Only run direct fetch if hook approach failed
    if (hookUser !== null || !hookIsLoading) return;
    
    const checkAuth = async () => {
      try {
        const res = await fetch('/api/user', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const userData = await res.json();
          setDirectUser(userData);
        } else {
          console.log("User not authenticated via direct fetch");
          setDirectUser(null);
        }
      } catch (err) {
        console.error("Error checking authentication via direct fetch:", err);
        setDirectUser(null);
      } finally {
        setDirectIsLoading(false);
      }
    };
    
    checkAuth();
  }, [hookUser, hookIsLoading]);
  
  // Use hook values if available, otherwise use direct fetch values
  const user = hookUser || directUser;
  const isLoading = hookIsLoading && directIsLoading;
  
  return (
    <Route path={path}>
      {() => {
        // Show loading state
        if (isLoading) {
          return (
            <div className="flex flex-col justify-center items-center h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-500 mb-4">Loading authentication...</p>
              <Link href="/login" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                <LogIn className="h-4 w-4 mr-1" /> Login directly if loading takes too long
              </Link>
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