import React, { useState, useEffect } from "react";
import { Route, Redirect, Link } from "wouter";
import { Loader2, LogIn } from "lucide-react";

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
  // Use direct authentication without hooks to avoid context issues
  const [user, setUser] = useState<null | { id: number; username: string; role: string }>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try regular auth endpoint first
        const res = await fetch('/api/user', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const userData = await res.json();
          setUser(userData);
          return;
        }
        
        // Try stored user data
        const storedUser = sessionStorage.getItem('velp_user') || localStorage.getItem('velp_user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          return;
        }
        
        // For admin paths, try direct admin endpoint
        if (adminOnly || path.includes('/admin')) {
          const directAdminRes = await fetch('/api/direct/admin-login', {
            credentials: 'include',
            cache: 'no-store'
          });
          
          if (directAdminRes.ok) {
            const directAdminData = await directAdminRes.json();
            if (directAdminData.success && directAdminData.user) {
              setUser(directAdminData.user);
              return;
            }
          }
        }
        
        setUser(null);
      } catch (err) {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, [adminOnly, path]);
  
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
          return <Redirect to="/standalone-login" />;
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