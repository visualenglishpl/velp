import { useState, useEffect } from 'react';
import { useLocation, useRoute } from 'wouter';
import { 
  Loader2, 
  Book, 
  Home, 
  LogIn, 
  UserRound, 
  GraduationCap, 
  Building, 
  LogOut,
  ArrowLeft,
  ArrowRight,
  Lock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

export default function SlickContentViewer() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Auth state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null
  });
  
  // Basic states
  const [isLoading, setIsLoading] = useState(true);
  const [loginData, setLoginData] = useState({ username: "", password: "" });
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Content states
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [contentSlides, setContentSlides] = useState<string[]>([
    "Visual English slide 1 - Introduction",
    "Visual English slide 2 - Basic concepts",
    "Visual English slide 3 - Advanced material",
    "Visual English slide 4 - Practice exercises",
    "Visual English slide 5 - Final quiz"
  ]);
  
  // Extract bookId and unitNumber from URL
  const [match, params] = useRoute('/book/:bookId/unit/:unitNumber');
  
  // Default book and unit
  let bookId = "1";
  let unitNumber = "1";
  
  if (params) {
    bookId = params.bookId;
    unitNumber = params.unitNumber;
  }
  
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
  
  // Login form submit handler
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
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
    } catch (error) {
      setLoginError("An error occurred during login. Please try again.");
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
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
    
    // Reset slide index
    setCurrentSlideIndex(0);
    
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };
  
  // Navigate through slides
  const goToNextSlide = () => {
    if (currentSlideIndex < contentSlides.length - 1) {
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };
  
  const goToPrevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex(currentSlideIndex - 1);
    }
  };
  
  // Determine if content should be blurred based on auth state and slide index
  const shouldBlurContent = (index: number) => {
    // For Books 0a/0b/0c, blur from 3rd image onwards for non-authenticated users
    if (["0a", "0b", "0c"].includes(bookId)) {
      return !authState.isAuthenticated && index >= 2;
    }
    
    // For standard books, first 10 slides available as preview, then locked
    return !authState.isAuthenticated && index >= 2; // Using 2 for demo purposes
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // Show viewer UI if authenticated
  if (authState.isAuthenticated) {
    return (
      <div className="flex flex-col min-h-screen">
        {/* Header bar */}
        <div className="bg-primary text-white p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              onClick={() => navigate('/')}
              className="text-white border-white hover:bg-white/20"
            >
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
            <h1 className="text-xl font-bold">
              Book {bookId} - Unit {unitNumber}
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="font-medium capitalize px-3 py-1 bg-white/20 rounded-full text-sm">
              {authState.userRole} mode
            </span>
            <Button 
              variant="outline" 
              onClick={handleLogout}
              className="text-white border-white hover:bg-white/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
        
        {/* Content viewer */}
        <div className="flex-1 flex flex-col items-center justify-center p-4 bg-gray-100">
          <div className="relative w-full max-w-3xl aspect-[4/3] mb-8 bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Content slide */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
              <div className={`text-center ${shouldBlurContent(currentSlideIndex) ? 'blur-lg' : ''}`}>
                <p className="text-2xl font-bold mb-4">Slide {currentSlideIndex + 1}</p>
                <div className="p-4 bg-gray-100 rounded-lg">
                  <p className="text-lg">{contentSlides[currentSlideIndex]}</p>
                </div>
                
                {/* Sample image placeholder */}
                <div className="w-full aspect-video bg-gray-200 mt-4 flex items-center justify-center">
                  <Book className="h-12 w-12 text-gray-400" />
                  <span className="ml-2 text-gray-500">Visual English Content</span>
                </div>
              </div>
              
              {/* Premium overlay */}
              {shouldBlurContent(currentSlideIndex) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white p-6">
                  <Lock className="w-16 h-16 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Premium Content</h3>
                  <p className="mb-6 text-center max-w-md">
                    This content is available only to subscribers. Please purchase a subscription to access all materials.
                  </p>
                  <Button 
                    onClick={() => navigate('/checkout')}
                    className="bg-white text-black hover:bg-white/90"
                  >
                    View Subscription Plans
                  </Button>
                </div>
              )}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="flex items-center justify-center space-x-6">
            <Button
              onClick={goToPrevSlide}
              disabled={currentSlideIndex === 0}
              variant="outline"
              className="px-6"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous
            </Button>
            <span className="text-lg font-medium min-w-[80px] text-center">
              {currentSlideIndex + 1} / {contentSlides.length}
            </span>
            <Button
              onClick={goToNextSlide}
              disabled={currentSlideIndex === contentSlides.length - 1}
              className="px-6"
            >
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Show login form if not authenticated
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Content Viewer Login</h1>
        <p className="mb-6 text-center text-gray-600">
          Please log in to view the content for Book {bookId} Unit {unitNumber}
        </p>
        
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {loginError}
          </div>
        )}
        
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={loginData.username}
              onChange={(e) => setLoginData({...loginData, username: e.target.value})}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={loginData.password}
              onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedRole("admin")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "admin" 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                <UserRound className="h-5 w-5 mb-1" />
                <span className="text-xs">Admin</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("teacher")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "teacher" 
                    ? "bg-green-600 text-white" 
                    : "bg-green-100 text-green-800"
                }`}
              >
                <GraduationCap className="h-5 w-5 mb-1" />
                <span className="text-xs">Teacher</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedRole("school")}
                className={`flex flex-col items-center justify-center p-3 rounded-md ${
                  selectedRole === "school" 
                    ? "bg-amber-600 text-white" 
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                <Building className="h-5 w-5 mb-1" />
                <span className="text-xs">School</span>
              </button>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full bg-primary hover:bg-primary/90 transition-colors"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
            ) : (
              <LogIn className="mr-2 h-4 w-4" />
            )}
            Log In
          </Button>
          
          <div className="text-center mt-4">
            <Button 
              variant="link" 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-gray-900"
            >
              <Home className="mr-2 h-4 w-4" />
              Return to Home
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}