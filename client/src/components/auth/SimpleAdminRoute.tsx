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
        // First check if we have admin user in storage as emergency backup
        const storedUser = localStorage.getItem('velp_user') || sessionStorage.getItem('velp_user');
        if (storedUser) {
          try {
            const userData = JSON.parse(storedUser);
            if (userData && userData.role === 'admin') {
              console.log("Admin access granted through stored credentials");
              setIsAdmin(true);
              return;
            }
          } catch (err) {
            console.error("Error parsing stored user data:", err);
          }
        }
        
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4">
          <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-center mb-4">Admin Access Required</h2>
            <p className="text-gray-600 mb-6 text-center">
              You need admin access to view this page.
            </p>
            <div className="flex flex-col gap-3">
              <a 
                href="/direct-admin" 
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md text-center"
              >
                Go to Admin Login
              </a>
              <a 
                href="/" 
                className="w-full py-2 px-4 border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium rounded-md text-center"
              >
                Return to Home Page
              </a>
            </div>
          </div>
        </div>
      </Route>
    );
  }

  return <Route path={path}>{children}</Route>;
}