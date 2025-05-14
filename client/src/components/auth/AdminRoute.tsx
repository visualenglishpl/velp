import React from "react";
import { Route, Redirect, Link } from "wouter";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AdminRouteProps {
  path: string;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, children }) => {
  // Use try/catch to safely handle auth errors
  let user = null;
  let isLoading = true;
  
  try {
    // Try to use the auth context first
    const auth = useAuth();
    user = auth.user;
    isLoading = auth.isLoading;
    
    // If no user but not loading, check session storage as backup
    if (!user && !isLoading) {
      try {
        const sessionUser = sessionStorage.getItem('velp_user');
        if (sessionUser) {
          console.log("AdminRoute: Recovering user from sessionStorage");
          user = JSON.parse(sessionUser);
          // This prevents immediate redirect while auth context catches up
          isLoading = true;
          // Force a refresh of auth state if we found a user in session storage
          setTimeout(() => window.location.reload(), 500);
        }
      } catch (e) {
        console.error("AdminRoute: Session storage access error:", e);
      }
    }
  } catch (error) {
    console.error("Auth context error in AdminRoute:", error);
    // Try sessionStorage as last resort
    try {
      const sessionUser = sessionStorage.getItem('velp_user');
      if (sessionUser) {
        console.log("AdminRoute: Error recovery - using sessionStorage");
        user = JSON.parse(sessionUser);
        isLoading = false;
      }
    } catch (e) {
      console.error("AdminRoute: Session storage access error:", e);
    }
  }
  
  return (
    <Route path={path}>
      {() => {
        // Show loading state
        if (isLoading) {
          return (
            <div className="flex flex-col justify-center items-center h-[50vh]">
              <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
              <p className="text-gray-500 mb-4">Loading admin authentication...</p>
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