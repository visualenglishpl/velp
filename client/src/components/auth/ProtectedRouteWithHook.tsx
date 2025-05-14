import React from "react";
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
  // Use try/catch to safely handle auth errors
  let user = null;
  let isLoading = true;
  
  try {
    const auth = useAuth();
    user = auth.user;
    isLoading = auth.isLoading;
  } catch (error) {
    console.error("Auth context error in ProtectedRoute:", error);
    // Fall back to loading state, will lead to login redirect
  }
  
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