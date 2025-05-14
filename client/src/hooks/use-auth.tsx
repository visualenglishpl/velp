import { createContext, ReactNode, useContext } from "react";
import {
  useQuery,
  useMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import { z } from "zod";
import { getQueryFn, apiRequest, queryClient } from "../lib/queryClient";
import { useToast } from "./use-toast";

// Define our own User type since we don't have access to the schema
type User = {
  id: number;
  username: string;
  email?: string;
  role: "admin" | "teacher" | "school";
  fullName?: string;
}

// Create our own insert schema
const insertUserSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string(),
  email: z.string().email("Invalid email address").optional(),
  fullName: z.string().optional(),
  role: z.enum(["admin", "teacher", "school"])
});

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  error: Error | null;
  loginMutation: UseMutationResult<User, Error, LoginData>;
  logoutMutation: UseMutationResult<void, Error, void>;
  registerMutation: UseMutationResult<User, Error, RegisterData>;
};

type LoginData = {
  username: string;
  password: string;
  role?: string;
};

// Extend the insertUserSchema for registration with confirmation fields
const registerSchema = insertUserSchema.extend({
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "teacher", "school"]),
});

type RegisterData = z.infer<typeof registerSchema>;

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { toast } = useToast();
  
  // Try to get user from API, with multiple fallbacks for resilience
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        // Step 1: Try to get user from API
        const response = await fetch('/api/user', {
          credentials: 'include', // Ensure cookies are sent
          cache: 'no-store' // Don't cache - we want fresh data
        });
        
        if (response.ok) {
          const userData = await response.json();
          
          // Store this authenticated user data for future fallbacks
          try {
            const userString = JSON.stringify(userData);
            sessionStorage.setItem('velp_user', userString);
            localStorage.setItem('velp_user', userString);
          } catch (storageError) {
            console.error("Failed to store API user data", storageError);
          }
          
          return userData;
        }
        
        // Step 2: If API request failed, try to get user from browser storage
        const sessionUser = sessionStorage.getItem('velp_user');
        const localUser = localStorage.getItem('velp_user');
        const storedUser = sessionUser || localUser;
        
        if (storedUser) {
          console.log("Session recovery: Using stored user data");
          const userData = JSON.parse(storedUser);
          
          // Ensure both storage locations have the latest data
          const userString = JSON.stringify(userData);
          try {
            sessionStorage.setItem('velp_user', userString);
            localStorage.setItem('velp_user', userString);
          } catch (storageError) {
            console.error("Failed to sync user data across storages", storageError);
          }
          
          return userData;
        }
        
        // Step 3 - Try the emergency admin endpoint as a last resort (only for admin paths)
        if (window.location.pathname.includes('/admin')) {
          console.log("Attempting emergency admin login for admin path");
          try {
            const directAdminResponse = await fetch('/api/direct/admin-login', {
              credentials: 'include',
              cache: 'no-store'
            });
            
            if (directAdminResponse.ok) {
              const directAdminData = await directAdminResponse.json();
              console.log("Direct admin login success:", directAdminData);
              
              if (directAdminData.success && directAdminData.user) {
                // Store for future use
                try {
                  const adminUserString = JSON.stringify(directAdminData.user);
                  sessionStorage.setItem('velp_user', adminUserString);
                  localStorage.setItem('velp_user', adminUserString);
                } catch (storageError) {
                  console.error("Failed to store direct admin data", storageError);
                }
                
                return directAdminData.user;
              }
            }
          } catch (directError) {
            console.error("Direct admin login failed:", directError);
          }
        }
        
        return null;
      } catch (error) {
        console.error("Error fetching user:", error);
        
        // Step 4: Final fallback - try any available browser storage
        try {
          const sessionUser = sessionStorage.getItem('velp_user');
          const localUser = localStorage.getItem('velp_user');
          const storedUser = sessionUser || localUser;
          
          if (storedUser) {
            console.log("Error recovery: Using stored user data");
            const userData = JSON.parse(storedUser);
            
            // Keep both storage locations in sync
            if (userData) {
              try {
                const userString = JSON.stringify(userData);
                localStorage.setItem('velp_user', userString);
                sessionStorage.setItem('velp_user', userString);
              } catch (storageError) {
                console.error("Storage sync error:", storageError);
              }
            }
            
            return userData;
          }
        } catch (e) {
          console.error("Browser storage access error:", e);
        }
        
        // Step 5: Last resort for admin paths
        if (window.location.pathname.includes('/admin')) {
          console.log("Attempting emergency admin login as last resort");
          try {
            const lastResortResponse = await fetch('/api/direct/admin-login', {
              credentials: 'include',
              cache: 'no-store'
            });
            
            if (lastResortResponse.ok) {
              const lastResortData = await lastResortResponse.json();
              console.log("Last-resort admin login success:", lastResortData);
              
              if (lastResortData.success && lastResortData.user) {
                // Store the admin user data
                try {
                  const adminString = JSON.stringify(lastResortData.user);
                  sessionStorage.setItem('velp_user', adminString);
                  localStorage.setItem('velp_user', adminString);
                } catch (e) {
                  console.error("Failed to store last-resort admin data", e);
                }
                
                return lastResortData.user;
              }
            }
          } catch (lastResortError) {
            console.error("Last-resort admin login failed:", lastResortError);
          }
        }
        
        return null;
      }
    },
    retry: 2, // Attempt up to 2 retries
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: LoginData) => {
      console.log("Login attempting with:", credentials);
      try {
        const res = await apiRequest("POST", "/api/login", credentials);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Login failed");
        }
        const data = await res.json();
        console.log("Login response:", data);
        return data;
      } catch (error) {
        console.error("Login error:", error);
        throw error;
      }
    },
    onSuccess: (user: User) => {
      console.log("Login successful:", user);
      queryClient.setQueryData(["/api/user"], user);
      
      // Store user data in both sessionStorage and localStorage for redundancy
      try {
        const userString = JSON.stringify(user);
        sessionStorage.setItem('velp_user', userString);
        localStorage.setItem('velp_user', userString);
        console.log("User data stored in browser storage for persistence");
      } catch (err) {
        console.error("Failed to store user backup in browser storage", err);
      }
      
      toast({
        title: "Login Successful",
        description: `Welcome back, ${user.username}!`,
      });
      
      // Redirect based on role using proper navigation
      setTimeout(() => {
        if (user.role === 'admin') {
          console.log("Admin user, redirecting to admin dashboard");
          window.location.href = "/admin";
        } else {
          console.log("Teacher/user, redirecting to books page");
          window.location.href = "/books";
        }
      }, 500); // Small delay to ensure the toast is shown and session is properly set
    },
    onError: (error: any) => {
      console.error("Login mutation error:", error);
      toast({
        title: "Login failed",
        description: error.message || "Invalid username or password",
        variant: "destructive",
      });
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: RegisterData) => {
      try {
        const res = await apiRequest("POST", "/api/register", userData);
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Registration failed");
        }
        return await res.json();
      } catch (error) {
        console.error("Registration error:", error);
        throw error;
      }
    },
    onSuccess: (user: User) => {
      // Update the query cache with the user data
      queryClient.setQueryData(["/api/user"], user);
      
      // Store user data in both sessionStorage and localStorage for redundancy
      try {
        const userString = JSON.stringify(user);
        sessionStorage.setItem('velp_user', userString);
        localStorage.setItem('velp_user', userString);
        console.log("User data stored in browser storage after registration");
      } catch (err) {
        console.error("Failed to store user data in browser storage after registration", err);
      }
      
      toast({
        title: "Registration successful",
        description: `Welcome to VELP, ${user.username}!`,
      });
      
      // Redirect based on role after registration
      if (user.role === 'admin') {
        window.location.href = "/admin";
      } else {
        window.location.href = "/books";
      }
    },
    onError: (error: any) => {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message || "Could not create account. Please try again.",
        variant: "destructive",
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      try {
        const res = await apiRequest("POST", "/api/logout");
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Logout failed");
        }
      } catch (error) {
        console.error("Logout error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["/api/user"], null);
      
      // Clear all user data from browser storage
      try {
        localStorage.removeItem('velp_user');
        sessionStorage.removeItem('velp_user');
        console.log("User data cleared from browser storage");
      } catch (err) {
        console.error("Failed to clear user data from browser storage", err);
      }
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      
      // Small delay to ensure session is properly cleared before redirect
      setTimeout(() => {
        window.location.href = "/";
      }, 300);
    },
    onError: (error: any) => {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: error.message || "Could not log out. Please try again.",
        variant: "destructive",
      });
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: user ?? null,
        isLoading,
        error,
        loginMutation,
        logoutMutation,
        registerMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}