import { useState, useEffect } from 'react';
import { Book, LogIn, LogOut, Lock, Unlock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

export default function ContentViewerTester() {
  const { toast } = useToast();
  
  // Auth state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null
  });
  
  // Basic states
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  
  // Check for existing authentication on component mount
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    
    if (userRole) {
      setAuthState({
        isAuthenticated: true,
        userRole
      });
    }
    
    setIsLoading(false);
  }, []);
  
  // Handle login
  const handleLogin = () => {
    // Simulate successful login with localStorage
    localStorage.setItem("userRole", selectedRole);
    
    // Update auth state
    setAuthState({
      isAuthenticated: true,
      userRole: selectedRole
    });
    
    toast({
      title: "Login Successful",
      description: `You are now logged in as ${selectedRole}`,
    });
  };
  
  // Handle logout
  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("userRole");
    
    // Update auth state
    setAuthState({
      isAuthenticated: false,
      userRole: null
    });
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="p-6 border rounded-lg bg-white shadow-sm animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-20 bg-gray-200 rounded mb-4"></div>
        <div className="h-10 bg-gray-200 rounded w-1/2"></div>
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm">
      <h3 className="text-xl font-semibold mb-4">Content Access Tester</h3>
      
      {authState.isAuthenticated ? (
        <div className="space-y-4">
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center">
            <Unlock className="h-5 w-5 text-green-500 mr-2" />
            <div>
              <p className="font-medium text-green-800">
                Authenticated as <span className="font-bold capitalize">{authState.userRole}</span>
              </p>
              <p className="text-sm text-green-600">
                You have full access to premium content
              </p>
            </div>
          </div>
          <div className="flex flex-col space-y-4">
            <Button 
              onClick={() => window.location.href = "/viewer"}
              className="w-full"
            >
              <Book className="mr-2 h-4 w-4" />
              Open Content Viewer
            </Button>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="w-full"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-center">
            <Lock className="h-5 w-5 text-amber-500 mr-2" />
            <div>
              <p className="font-medium text-amber-800">
                You are not authenticated
              </p>
              <p className="text-sm text-amber-600">
                Premium content will be restricted
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role Selection
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole("admin")}
                  className={`py-2 px-3 rounded-md text-sm font-medium ${
                    selectedRole === "admin" 
                      ? "bg-blue-600 text-white" 
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  Admin
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("teacher")}
                  className={`py-2 px-3 rounded-md text-sm font-medium ${
                    selectedRole === "teacher" 
                      ? "bg-green-600 text-white" 
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  Teacher
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole("school")}
                  className={`py-2 px-3 rounded-md text-sm font-medium ${
                    selectedRole === "school" 
                      ? "bg-amber-600 text-white" 
                      : "bg-amber-100 text-amber-800"
                  }`}
                >
                  School
                </button>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button 
                onClick={handleLogin}
                className="flex-1"
              >
                <LogIn className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button 
                onClick={() => window.location.href = "/viewer"}
                variant="outline"
                className="flex-1"
              >
                <Book className="mr-2 h-4 w-4" />
                Preview Content
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}