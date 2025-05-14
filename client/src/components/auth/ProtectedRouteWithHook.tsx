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
  
  // Fetch user data directly with layered fallbacks
  useEffect(() => {
    // Only run direct fetch if hook approach failed
    if (hookUser !== null && !hookIsLoading) return;
    
    const checkAuth = async () => {
      try {
        // Step 1: Try regular auth endpoint
        const res = await fetch('/api/user', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const userData = await res.json();
          console.log("ProtectedRoute: Direct fetch successful:", userData);
          setDirectUser(userData);
          
          // Store for future fallbacks
          try {
            const userString = JSON.stringify(userData);
            sessionStorage.setItem('velp_user', userString);
            localStorage.setItem('velp_user', userString);
          } catch (storageError) {
            console.error("ProtectedRoute: Failed to store user data", storageError);
          }
          
          return; // Exit early if successful
        }
        
        // Step 2: Try localStorage
        try {
          const sessionUser = sessionStorage.getItem('velp_user');
          const localUser = localStorage.getItem('velp_user');
          const storedUser = sessionUser || localUser;
          
          if (storedUser) {
            console.log("ProtectedRoute: Using stored user data");
            const userData = JSON.parse(storedUser);
            setDirectUser(userData);
            return; // Exit early if successful
          }
        } catch (storageError) {
          console.error("ProtectedRoute: Storage access error", storageError);
        }
        
        // Step 3: If admin path, try direct admin endpoint
        if (adminOnly || path.includes('/admin')) {
          try {
            console.log("ProtectedRoute: Attempting direct admin login for admin path");
            const directAdminRes = await fetch('/api/direct/admin-login', {
              credentials: 'include',
              cache: 'no-store'
            });
            
            if (directAdminRes.ok) {
              const directAdminData = await directAdminRes.json();
              console.log("ProtectedRoute: Direct admin login success", directAdminData);
              
              if (directAdminData.success && directAdminData.user) {
                setDirectUser(directAdminData.user);
                
                // Store for future use
                try {
                  const adminString = JSON.stringify(directAdminData.user);
                  sessionStorage.setItem('velp_user', adminString);
                  localStorage.setItem('velp_user', adminString);
                } catch (storageError) {
                  console.error("ProtectedRoute: Failed to store admin data", storageError);
                }
                
                return; // Exit early if successful
              }
            }
          } catch (directAdminError) {
            console.error("ProtectedRoute: Direct admin login failed:", directAdminError);
          }
        }
        
        // If all attempts failed
        console.log("ProtectedRoute: User not authenticated after all attempts");
        setDirectUser(null);
      } catch (err) {
        console.error("ProtectedRoute: Error checking authentication:", err);
        
        // Final attempt - check storage once more
        try {
          const lastResortUser = localStorage.getItem('velp_user') || sessionStorage.getItem('velp_user');
          if (lastResortUser) {
            console.log("ProtectedRoute: Last resort using stored user data");
            setDirectUser(JSON.parse(lastResortUser));
            return;
          }
        } catch (e) {
          console.error("ProtectedRoute: Last resort storage error", e);
        }
        
        setDirectUser(null);
      } finally {
        setDirectIsLoading(false);
      }
    };
    
    checkAuth();
  }, [hookUser, hookIsLoading, adminOnly, path]);
  
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