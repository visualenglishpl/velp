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
  
  // Try to get user from API, with fallback to session storage
  const {
    data: user,
    error,
    isLoading,
  } = useQuery<User | null, Error>({
    queryKey: ["/api/user"],
    queryFn: async () => {
      try {
        // Try to get user from API
        const response = await fetch('/api/user', {
          credentials: 'include' // Ensure cookies are sent
        });
        
        if (response.ok) {
          return await response.json();
        }
        
        // If API request failed, try to get user from session storage
        const sessionUser = sessionStorage.getItem('velp_user');
        if (sessionUser) {
          console.log("Session recovery: Using stored user data");
          return JSON.parse(sessionUser);
        }
        
        return null;
      } catch (error) {
        console.error("Error fetching user:", error);
        // Final fallback - try session storage
        try {
          const sessionUser = sessionStorage.getItem('velp_user');
          if (sessionUser) {
            console.log("Error recovery: Using stored user data");
            return JSON.parse(sessionUser);
          }
        } catch (e) {
          console.error("Session storage access error:", e);
        }
        return null;
      }
    },
    retry: 1,
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
      
      // Keep a backup of the user in sessionStorage as fallback
      try {
        sessionStorage.setItem('velp_user', JSON.stringify(user));
      } catch (err) {
        console.error("Failed to store user backup in sessionStorage", err);
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
      queryClient.setQueryData(["/api/user"], user);
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
      
      // Clear the backup in sessionStorage
      try {
        sessionStorage.removeItem('velp_user');
      } catch (err) {
        console.error("Failed to clear user backup from sessionStorage", err);
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