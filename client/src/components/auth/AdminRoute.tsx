import React from "react";
import { Route, Redirect } from "wouter";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AdminRouteProps {
  path: string;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, children }) => {
  const { user, isLoading } = useAuth();
  
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