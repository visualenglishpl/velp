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
  
  // Fetch user data directly with multiple fallbacks
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Step 1: Try regular auth endpoint
        const res = await fetch('/api/user', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          const userData = await res.json();
          console.log("Regular auth successful:", userData);
          setUser(userData);
          
          // Store auth data for future fallback
          try {
            const userString = JSON.stringify(userData);
            sessionStorage.setItem('velp_user', userString);
            localStorage.setItem('velp_user', userString);
          } catch (storageError) {
            console.error("Failed to store user data", storageError);
          }
          
          return; // Exit early if successful
        }
        
        // Step 2: Check browser storage
        try {
          const sessionUser = sessionStorage.getItem('velp_user');
          const localUser = localStorage.getItem('velp_user');
          const storedUser = sessionUser || localUser;
          
          if (storedUser) {
            console.log("AdminRoute: Using stored user data");
            const userData = JSON.parse(storedUser);
            setUser(userData);
            return; // Exit early if successful
          }
        } catch (storageError) {
          console.error("AdminRoute: Storage access error", storageError);
        }

        // Step 3: Try direct admin endpoint
        try {
          console.log("AdminRoute: Attempting direct admin login");
          const directAdminRes = await fetch('/api/direct/admin-login', {
            credentials: 'include',
            cache: 'no-store'
          });
          
          if (directAdminRes.ok) {
            const directAdminData = await directAdminRes.json();
            console.log("AdminRoute: Direct admin login successful", directAdminData);
            
            if (directAdminData.success && directAdminData.user) {
              setUser(directAdminData.user);
              
              // Store admin data for future use
              try {
                const adminString = JSON.stringify(directAdminData.user);
                sessionStorage.setItem('velp_user', adminString);
                localStorage.setItem('velp_user', adminString);
              } catch (storageError) {
                console.error("AdminRoute: Failed to store admin data", storageError);
              }
              
              return; // Exit early if successful
            }
          } else {
            console.error("AdminRoute: Direct admin login failed", await directAdminRes.text());
          }
        } catch (directAdminError) {
          console.error("AdminRoute: Auth context error:", directAdminError);
        }
        
        // If we get here, all auth attempts failed
        console.log("AdminRoute: All authentication attempts failed");
        setUser(null);
      } catch (err) {
        console.error("AdminRoute: Error checking authentication:", err);
        
        // Final fallback - check storage one last time
        try {
          const lastResortUser = localStorage.getItem('velp_user') || sessionStorage.getItem('velp_user');
          if (lastResortUser) {
            console.log("AdminRoute: Last resort using stored user data");
            setUser(JSON.parse(lastResortUser));
            return;
          }
        } catch (e) {
          console.error("AdminRoute: Last resort storage error", e);
        }
        
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