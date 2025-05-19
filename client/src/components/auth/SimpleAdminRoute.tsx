import { useState, useEffect, ReactNode } from "react";
import { Redirect, Route } from "wouter";
import { Loader2 } from "lucide-react";

interface SimpleAdminRouteProps {
  path: string;
  children: ReactNode;
}

export function SimpleAdminRoute({ path, children }: SimpleAdminRouteProps) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Try to get admin access through direct endpoint
        const res = await fetch('/api/direct/admin-login', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (res.ok) {
          console.log("Admin access granted through direct endpoint");
          setIsAdmin(true);
        } else {
          console.log("Admin access denied through direct endpoint");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        setIsAdmin(false);
      }
    };
    
    checkAdminAccess();
  }, []);

  if (isAdmin === null) {
    return (
      <Route path={path}>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-border" />
        </div>
      </Route>
    );
  }

  if (!isAdmin) {
    return (
      <Route path={path}>
        <Redirect to="/admin" />
      </Route>
    );
  }

  return <Route path={path}>{children}</Route>;
}