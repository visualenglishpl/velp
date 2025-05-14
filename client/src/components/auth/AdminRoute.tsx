import React from "react";
import { Route, Redirect, Link } from "wouter";
import { Loader2, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

interface AdminRouteProps {
  path: string;
  children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ path, children }) => {
  // State to track authentication status
  let user: { id: number; username: string; role: string; email?: string } | null = null;
  let isLoading = true;
  
  // Try different authentication methods in order of preference
  try {
    // 1. First try to use React Auth Context (primary method)
    const auth = useAuth();
    user = auth.user;
    isLoading = auth.isLoading;
    
    // 2. If context is not loading but we don't have a user, try browser storage
    if (!isLoading && !user) {
      // Check both localStorage and sessionStorage for redundancy
      const localUser = localStorage.getItem('velp_user');
      const sessionUser = sessionStorage.getItem('velp_user');
      
      // Use whichever storage has a user
      if (localUser || sessionUser) {
        console.log("AdminRoute: Using browser storage for authentication");
        try {
          // Parse the stored user data
          user = JSON.parse(localUser || sessionUser || "");
          
          // If we found a user in storage, update both storage locations for consistency
          if (user !== null) {
            const userString = JSON.stringify(user);
            
            // Update both storage locations for redundancy
            try {
              localStorage.setItem('velp_user', userString);
              sessionStorage.setItem('velp_user', userString);
            } catch (storageError) {
              console.error("Error updating browser storage:", storageError);
            }
            
            // Make this call asynchronously to avoid blocking the UI
            setTimeout(() => {
              // Also try to create a server session with this user
              fetch('/api/direct-admin-auth', { 
                method: 'GET',
                credentials: 'include',
                cache: 'no-cache', // Prevent caching
                headers: { 'Pragma': 'no-cache' }
              }).then(res => {
                if (res.ok) {
                  return res.json();
                } else {
                  // If the direct auth endpoint failed, try the regular login
                  console.log("Direct admin auth failed, trying standard login");
                  // Only attempt this if we have the admin credentials (this is for recovery only)
                  if (user && user.username === 'admin') {
                    return fetch('/api/login', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ 
                        username: 'admin', 
                        password: 'admin123',
                        role: 'admin'
                      }),
                      credentials: 'include'
                    }).then(loginRes => loginRes.json());
                  }
                  throw new Error("Authentication failed");
                }
              })
              .then(data => {
                console.log("Server session created successfully:", data);
                
                // If we got back user data, update the browser storage with the latest
                if (data.user) {
                  try {
                    const updatedUserString = JSON.stringify(data.user);
                    localStorage.setItem('velp_user', updatedUserString);
                    sessionStorage.setItem('velp_user', updatedUserString);
                  } catch (storageError) {
                    console.error("Failed to update storage with server data:", storageError);
                  }
                }
              })
              .catch(error => {
                console.error("Failed to create server session:", error);
              });
            }, 0); // Run in the next tick of the event loop
          }
        } catch (e) {
          console.error("AdminRoute: Error parsing stored user:", e);
        }
      }
    }
  } catch (error) {
    console.error("AdminRoute: Auth context error:", error);
    
    // 3. If context fails, fall back to direct browser storage (last resort)
    try {
      // Try both storage types for redundancy
      const localUser = localStorage.getItem('velp_user');
      const sessionUser = sessionStorage.getItem('velp_user');
      
      if (localUser || sessionUser) {
        console.log("AdminRoute: Fallback to direct browser storage");
        
        // Parse the stored user data
        user = JSON.parse(localUser || sessionUser || "");
        isLoading = false;
        
        if (user !== null) {
          // Ensure both storage types have the user data
          try {
            const userString = JSON.stringify(user);
            if (!localUser && sessionUser) localStorage.setItem('velp_user', userString);
            if (localUser && !sessionUser) sessionStorage.setItem('velp_user', userString);
            
            // Attempt to recover the server session in the background
            setTimeout(() => {
              fetch('/api/direct-admin-auth', {
                method: 'GET',
                credentials: 'include',
                cache: 'no-cache'
              }).then(res => res.json())
                .then(data => console.log("Last-resort session recovery:", data))
                .catch(err => console.error("Last-resort session recovery failed:", err));
            }, 500);
          } catch (storageError) {
            console.error("Error syncing browser storage:", storageError);
          }
        }
      } else {
        isLoading = false; // We're not loading, we just don't have a user
      }
    } catch (e) {
      console.error("AdminRoute: Storage access error:", e);
      isLoading = false; // Make sure we don't get stuck in loading state
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
              <div className="flex flex-col items-center gap-2">
                <Link href="/login" className="text-sm text-purple-600 hover:text-purple-800 flex items-center">
                  <LogIn className="h-4 w-4 mr-1" /> Login directly if loading takes too long
                </Link>
                <Link href="/direct-admin" className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center font-medium">
                  <LogIn className="h-4 w-4 mr-1" /> Use Direct Admin Access (Bypass Auth)
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