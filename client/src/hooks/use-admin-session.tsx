import { useState, useEffect, createContext, useContext, ReactNode } from "react";
import { useToast } from "./use-toast";

// Define types
type AdminUser = {
  id: number;
  username: string;
  role: string;
  email: string;
};

type AdminContextType = {
  adminUser: AdminUser | null;
  isLoading: boolean;
  error: string | null;
  checkAdminAccess: () => Promise<boolean>;
  logout: () => Promise<void>;
};

// Create context
const AdminContext = createContext<AdminContextType | null>(null);

// Create provider component
export function AdminProvider({ children }: { children: ReactNode }) {
  const [adminUser, setAdminUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Check admin session on mount
  useEffect(() => {
    checkAdminAccess().catch(err => {
      console.error("Initial admin access check failed:", err);
    });
  }, []);

  // Function to check admin access
  const checkAdminAccess = async (): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    
    try {
      // First try to get session from storage
      const storedUser = sessionStorage.getItem('adminUser');
      if (storedUser) {
        setAdminUser(JSON.parse(storedUser));
        setIsLoading(false);
        return true;
      }
      
      // If no stored session, try direct endpoint
      const res = await fetch('/api/direct/admin-login', { 
        credentials: 'include',
        cache: 'no-store'
      });
      
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          setAdminUser(data.user);
          // Store in session for future use
          sessionStorage.setItem('adminUser', JSON.stringify(data.user));
          setIsLoading(false);
          return true;
        }
      }
      
      // If we get here, no admin access
      setAdminUser(null);
      setError("Admin access denied");
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error("Error checking admin access:", error);
      setError("Error checking admin access");
      setIsLoading(false);
      return false;
    }
  };

  // Logout function
  const logout = async (): Promise<void> => {
    try {
      await fetch('/api/logout', { 
        method: 'POST',
        credentials: 'include'
      });
      setAdminUser(null);
      sessionStorage.removeItem('adminUser');
      toast({
        title: "Logged out",
        description: "You have been logged out successfully"
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout failed",
        description: "There was an error logging out",
        variant: "destructive"
      });
    }
  };

  return (
    <AdminContext.Provider value={{ 
      adminUser, 
      isLoading, 
      error,
      checkAdminAccess,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
}

// Hook to use admin context
export function useAdminSession() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdminSession must be used within an AdminProvider");
  }
  return context;
}