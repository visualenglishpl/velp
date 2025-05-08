import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useRoute } from 'wouter';
import { useQuery } from '@tanstack/react-query';
import { 
  Loader2, 
  ChevronLeft, 
  ChevronRight, 
  Book, 
  Home, 
  Maximize2, 
  Minimize2, 
  LogOut,
  Lock,
  GraduationCap,
  Building,
  UserRound,
  LogIn
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Types
type S3Material = {
  id: number;
  path: string;
  title: string;
  description: string;
  contentType: string; 
  content: string;
  orderIndex: number;
  order: number;
  isPublished: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

type UnitInfo = {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
};

// Auth state type
interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

export default function SimpleViewerTest() {
  const [location, navigate] = useLocation();
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  
  // Authentication state
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
  
  // Check for existing authentication on component mount
  useEffect(() => {
    try {
      const userRole = window.localStorage.getItem("userRole");
      console.log("Initial auth check - userRole from localStorage:", userRole);
      
      if (userRole) {
        setAuthState({
          isAuthenticated: true,
          userRole
        });
      }
    } catch (error) {
      console.error("Error checking authentication state:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Handle login form submit
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      // Simulate successful login with localStorage
      window.localStorage.setItem("userRole", selectedRole);
      window.localStorage.setItem("hasFullAccess", "true");
      console.log("Login: stored userRole and hasFullAccess in localStorage");
      
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
    try {
      // Clear localStorage
      window.localStorage.removeItem("userRole");
      window.localStorage.removeItem("hasFullAccess");
      console.log("Logout: removed userRole and hasFullAccess from localStorage");
      
      // Update auth state
      setAuthState({
        isAuthenticated: false,
        userRole: null
      });
      
      toast({
        title: "Logged Out",
        description: "You have been logged out successfully",
      });
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Logout Failed",
        description: "There was a problem with the logout process",
        variant: "destructive",
      });
    }
  };
  
  // Content viewer state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [materials, setMaterials] = useState<S3Material[]>([]);
  
  // Extract bookId and unitNumber from URL path
  let bookId: string | null = null;
  let unitNumber: string | null = null;
  
  // Parse from /book/book4/unit/1 format
  const [match, params] = useRoute('/book/:bookId/unit/:unitNumber');
  
  if (params) {
    bookId = params.bookId;
    unitNumber = params.unitNumber;
    console.log(`Path match: Book ${bookId}, Unit ${unitNumber}`);
  } else {
    // Fallback to default values
    bookId = "4";
    unitNumber = "1";
  }
  
  // Build paths for API requests
  const bookPath = bookId.startsWith('book') ? bookId : `book${bookId}`;
  const unitPath = unitNumber.startsWith('unit') ? unitNumber : `unit${unitNumber}`;
  
  console.log(`SimpleViewer: Book=${bookPath}, Unit=${unitPath}`);
  
  // Determine content access level
  const hasPaidAccess = authState.isAuthenticated || 
    window.localStorage.getItem("hasFullAccess") === "true";
  const freeSlideLimit = /^0[a-c]$/i.test(bookId || '') ? 2 : 10;
  
  // Fetch unit information
  const { 
    data: unitData,
    error: unitError,
    isLoading: unitLoading
  } = useQuery<UnitInfo>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Fetch materials from S3
  const {
    data: fetchedMaterials, 
    error: materialsError,
    isLoading: materialsLoading
  } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
  });
  
  // Process materials when fetched
  useEffect(() => {
    if (!fetchedMaterials) return;
    
    // Filter out PDFs and SWFs
    const filteredMaterials = fetchedMaterials.filter(material => {
      const content = material.content.toLowerCase();
      return !(
        material.contentType === 'PDF' || 
        material.contentType === 'SWF' || 
        content.endsWith('.pdf') || 
        content.endsWith('.swf')
      );
    });
    
    // Sort materials
    const sortedMaterials = [...filteredMaterials].sort((a, b) => {
      const aContent = a.content.toLowerCase();
      const bContent = b.content.toLowerCase();
      
      // Sort by numeric prefix if both have them
      const aNumMatch = aContent.match(/^(\d+)/);
      const bNumMatch = bContent.match(/^(\d+)/);
      
      if (aNumMatch && bNumMatch) {
        return parseInt(aNumMatch[1]) - parseInt(bNumMatch[1]);
      }
      
      // If only one has numeric prefix, prioritize it
      if (aNumMatch) return -1;
      if (bNumMatch) return 1;
      
      // Otherwise sort alphabetically
      return aContent.localeCompare(bContent);
    });
    
    setMaterials(sortedMaterials);
  }, [fetchedMaterials]);
  
  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    if (sliderRef.current) {
      console.log(`Manually going to slide ${index}`);
      sliderRef.current.slickGoTo(index);
      setCurrentIndex(index);
    }
  }, []);
  
  const goToPrevSlide = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (sliderRef.current && currentIndex > 0) {
      console.log(`Going to previous slide from ${currentIndex}`);
      sliderRef.current.slickPrev();
    }
  }, [currentIndex]);
  
  const goToNextSlide = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    if (sliderRef.current && currentIndex < materials.length - 1) {
      console.log(`Going to next slide from ${currentIndex}`);
      sliderRef.current.slickNext();
    }
  }, [currentIndex, materials.length]);
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrevSlide();
      } else if (e.key === 'ArrowRight') {
        goToNextSlide();
      } else if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      } else if (e.key === 'f' || e.key === 'F') {
        setIsFullscreen(!isFullscreen);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrevSlide, goToNextSlide, isFullscreen]);
  
  // Handle fullscreen
  useEffect(() => {
    if (!containerRef.current) return;
    
    if (isFullscreen) {
      try {
        if (document.fullscreenElement !== containerRef.current) {
          containerRef.current.requestFullscreen();
        }
      } catch (error) {
        console.error('Error entering fullscreen:', error);
      }
    } else if (document.fullscreenElement) {
      try {
        document.exitFullscreen();
      } catch (error) {
        console.error('Error exiting fullscreen:', error);
      }
    }
  }, [isFullscreen]);
  
  // Initialize with first slide
  useEffect(() => {
    if (!materials.length) return;
    
    // Try to find a "00" prefixed slide to start with
    const startIndex = materials.findIndex(
      material => material.content.startsWith('00')
    );
    
    if (startIndex !== -1) {
      goToSlide(startIndex);
    } else {
      goToSlide(0);
    }
  }, [materials, goToSlide]);
  
  // Settings for react-slick
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // We're using custom arrows
    swipe: true,
    adaptiveHeight: false,
    afterChange: (current: number) => setCurrentIndex(current),
    lazyLoad: 'ondemand' as 'ondemand',
    beforeChange: (current: number, next: number) => {
      console.log(`Slide changing from ${current} to ${next}`);
      setCurrentIndex(next);
    }
  };
  
  // Function to determine if content should be blurred
  const shouldBlurContent = (index: number) => {
    // All videos should be blurred for non-authenticated users
    const material = materials[index];
    if (material?.contentType === 'VIDEO' || 
        material?.content.toLowerCase().includes('video')) {
      return !hasPaidAccess;
    }
    
    // For Books 0a/0b/0c, blur from 3rd image onwards for non-authenticated users
    if (["0a", "0b", "0c"].includes(bookId)) {
      return !hasPaidAccess && index >= 2;
    }
    
    // For standard books, first 10 slides available as preview, then locked
    return !hasPaidAccess && index >= freeSlideLimit;
  };
  
  // Get direct content URL
  const getContentUrl = (material: S3Material) => {
    // Parse the content path which could be a relative path or a full URL
    const content = material.content;
    
    // If already a full URL, return as is
    if (content.startsWith('http://') || content.startsWith('https://')) {
      return content;
    }
    
    // For content in S3, construct the API endpoint that will redirect to S3
    return `/api/direct/content/${encodeURIComponent(content)}`;
  };
  
  // Loading state
  if (isLoading || unitLoading || materialsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  // Error state
  if (unitError || materialsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <div className="bg-red-100 border border-red-200 text-red-700 p-4 rounded-md max-w-md mb-4">
          <h3 className="font-bold text-lg mb-2">Error Loading Content</h3>
          <p>{unitError?.message || materialsError?.message || "Could not load content"}</p>
        </div>
        <Button 
          onClick={() => navigate('/')}
          className="mt-4"
        >
          <Home className="mr-2 h-4 w-4" />
          Return Home
        </Button>
      </div>
    );
  }
  
  // If authenticated, show content viewer
  if (authState.isAuthenticated) {
    return (
      <div 
        ref={containerRef}
        className={`flex flex-col min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
      >
        {/* Header */}
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
        
        {/* Main content area */}
        <div className="flex-1 bg-gray-100 p-4">
          <div className="bg-white p-4 rounded-lg shadow-md mx-auto max-w-6xl">
            {materials.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Book className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-500">No content available</h3>
                <p className="text-gray-400 mt-2">This unit doesn't have any viewable content yet.</p>
              </div>
            ) : (
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden bg-gray-50 border rounded-lg">
                  <Slider ref={sliderRef} {...slickSettings}>
                    {materials.map((material, index) => {
                      const contentUrl = getContentUrl(material);
                      const isBlurred = shouldBlurContent(index);
                      
                      return (
                        <div key={material.id} className="outline-none">
                          <div className="relative aspect-[4/3] flex items-center justify-center bg-gray-50">
                            {/* Content based on type */}
                            {material.contentType === 'IMAGE' || 
                             material.content.toLowerCase().endsWith('.jpg') ||
                             material.content.toLowerCase().endsWith('.jpeg') ||
                             material.content.toLowerCase().endsWith('.png') ||
                             material.content.toLowerCase().endsWith('.gif') ? (
                              <img 
                                src={contentUrl} 
                                alt={material.title || `Slide ${index + 1}`}
                                className={`max-h-full max-w-full object-contain ${isBlurred ? 'blur-xl' : ''}`}
                              />
                            ) : material.contentType === 'VIDEO' || 
                                material.content.toLowerCase().endsWith('.mp4') ? (
                              <video 
                                src={contentUrl}
                                controls
                                className={`max-h-full max-w-full ${isBlurred ? 'blur-xl' : ''}`}
                              />
                            ) : (
                              <div className="p-4 bg-gray-100 rounded-lg">
                                <p className="text-gray-500">
                                  {material.description || material.content}
                                </p>
                              </div>
                            )}
                            
                            {/* Premium overlay */}
                            {isBlurred && (
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
                      );
                    })}
                  </Slider>
                </div>
                
                {/* Navigation controls */}
                <div className="flex items-center justify-between mt-4">
                  <Button
                    onClick={goToPrevSlide}
                    disabled={currentIndex === 0}
                    variant="outline"
                    size="sm"
                    className="flex items-center"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Previous
                  </Button>
                  
                  <div className="flex space-x-2 items-center">
                    <span className="text-sm font-medium">
                      Slide {currentIndex + 1} of {materials.length}
                    </span>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="h-4 w-4" />
                      ) : (
                        <Maximize2 className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  <Button
                    onClick={goToNextSlide}
                    disabled={currentIndex === materials.length - 1}
                    size="sm"
                    className="flex items-center"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                
                {/* Slide details */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-medium text-gray-800">{materials[currentIndex]?.title || `Slide ${currentIndex + 1}`}</h3>
                  <p className="text-sm text-gray-600 mt-1">{materials[currentIndex]?.description || ''}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
  
  // If not authenticated, show login form
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