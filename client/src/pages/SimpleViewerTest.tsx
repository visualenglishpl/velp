import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'wouter';
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
  Lock,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

interface AuthState {
  isAuthenticated: boolean;
  userRole: string | null;
}

interface ContentProps {
  bookId: string;
  unitNumber: string;
  hasFullAccess: boolean;
  role?: string | null;
}

// Sample content for demonstration
const DEMO_CONTENT = [
  {
    id: 1,
    title: "Introduction",
    src: `/api/direct/content/book4/unit3/01 Intro.jpg`,
    isVideo: false
  },
  {
    id: 2,
    title: "Basic Concepts",
    src: `/api/direct/content/book4/unit3/02 Concepts.jpg`,
    isVideo: false
  },
  {
    id: 3,
    title: "Learning Materials",
    src: `/api/direct/content/book4/unit3/03 Materials.jpg`,
    isVideo: false
  },
  {
    id: 4,
    title: "Practice Exercises",
    src: `/api/direct/content/book4/unit3/04 Exercises.jpg`,
    isVideo: false
  },
  {
    id: 5,
    title: "Visual English Video",
    src: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    isVideo: true
  }
];

// Real content viewer component
function RealSlickContentViewer({ bookId, unitNumber, hasFullAccess, role }: ContentProps) {
  const [location, navigate] = useLocation();
  const sliderRef = useRef<Slider | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { toast } = useToast();
  
  // State for the viewer
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [slides, setSlides] = useState(DEMO_CONTENT);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading content
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

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
    if (sliderRef.current && currentIndex < slides.length - 1) {
      console.log(`Going to next slide from ${currentIndex}`);
      sliderRef.current.slickNext();
    }
  }, [currentIndex, slides.length]);

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

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

  // Blur logic for premium content
  const shouldBlurContent = (index: number) => {
    // Check if user has full access (via localStorage)
    if (hasFullAccess) return false;
    
    // For Books 0a/0b/0c, blur from 3rd image onwards for non-authenticated users
    if (["0a", "0b", "0c"].includes(bookId)) {
      return index >= 2;
    }
    
    // For standard books, first 10 slides available as preview, then locked
    return index >= 2; // Using 2 for demo instead of 10
  };

  // Settings for react-slick
  const slickSettings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Using custom arrows
    swipe: true,
    adaptiveHeight: false,
    lazyLoad: 'ondemand' as 'ondemand',
    beforeChange: (current: number, next: number) => {
      console.log(`Slide changing from ${current} to ${next}`);
      setCurrentIndex(next);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`flex flex-col min-h-screen bg-white ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}
    >
      {/* Header */}
      <div className="sticky top-0 z-10 bg-primary text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="text-white border-white hover:bg-white/20"
          >
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
          <div>
            <h1 className="text-xl font-bold">
              Book {bookId} • Unit {unitNumber}
            </h1>
            <p className="text-sm text-white/80">
              Visual English Learning Content
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={toggleFullscreen}
            className="text-white border-white hover:bg-white/20"
          >
            {isFullscreen ? (
              <><Minimize2 className="h-4 w-4 mr-2" /> Exit Fullscreen</>
            ) : (
              <><Maximize2 className="h-4 w-4 mr-2" /> Fullscreen</>
            )}
          </Button>
          <span className="font-medium capitalize px-3 py-1 bg-white/20 rounded-full text-sm">
            {role || 'Guest'} mode
          </span>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 bg-gray-100 p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <Slider ref={sliderRef} {...slickSettings}>
            {slides.map((slide, index) => (
              <div key={slide.id} className="outline-none">
                <div className="relative aspect-video">
                  {slide.isVideo ? (
                    // Video content
                    <div className={`w-full h-full ${shouldBlurContent(index) ? 'blur-md' : ''}`}>
                      <iframe
                        src={slide.src}
                        title={slide.title}
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  ) : (
                    // Image content
                    <div className={`w-full h-full ${shouldBlurContent(index) ? 'blur-md' : ''}`}>
                      <div className="flex items-center justify-center w-full h-full bg-gray-200">
                        {/* Simulated content - replace with actual image */}
                        <div className="text-center p-8">
                          <Book className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                          <h3 className="text-xl font-bold mb-2">Slide {index + 1}</h3>
                          <p className="text-gray-600">{slide.title}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Premium content overlay */}
                  {shouldBlurContent(index) && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white p-6">
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

                {/* Slide information */}
                <div className="p-4 border-t">
                  <h3 className="font-bold text-lg">{slide.title}</h3>
                  <p className="text-gray-600">Book {bookId} • Unit {unitNumber} • Slide {index + 1}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>

        {/* Navigation controls */}
        <div className="flex items-center justify-center mt-6 space-x-6">
          <Button
            onClick={goToPrevSlide}
            disabled={currentIndex === 0}
            variant="outline"
            className="px-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>
          <span className="text-lg font-medium min-w-[80px] text-center">
            {currentIndex + 1} / {slides.length}
          </span>
          <Button
            onClick={goToNextSlide}
            disabled={currentIndex === slides.length - 1}
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

// Login form component
const LoginFormComponent = () => {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Login form state
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("admin");
  
  // Handle login
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setLoginError("");
    
    try {
      // Simulate successful login with localStorage
      window.localStorage.setItem("userRole", selectedRole);
      console.log("Login: stored userRole in localStorage:", selectedRole);
      
      // For full access
      window.localStorage.setItem("hasFullAccess", "true");
      
      toast({
        title: "Login Successful",
        description: `You are now logged in as ${selectedRole}`,
      });
      
      // Force refresh to update auth state
      window.location.reload();
    } catch (error) {
      console.error("Error during login:", error);
      setLoginError("An error occurred during login. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Content Viewer Login</h1>
        <p className="mb-6 text-center text-gray-600">
          Please log in to view the premium content
        </p>
        
        {loginError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {loginError}
          </div>
        )}
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role Selection
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
            onClick={handleLogin}
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
        </div>
      </div>
    </div>
  );
};

// Main component (SimpleViewerTest)
export default function SimpleViewerTest() {
  const [location, navigate] = useLocation();
  
  // Auth state
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    userRole: null
  });
  
  // Loading state
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract bookId and unitNumber from URL or use defaults
  const pathRegex = /\/book\/(\w+)\/unit\/(\d+)/;
  const pathMatch = location.match(pathRegex);
  
  // Default values or extracted from URL
  const bookId = pathMatch ? pathMatch[1] : "4";
  const unitNumber = pathMatch ? pathMatch[2] : "3";
  
  // Check for existing authentication on component mount
  useEffect(() => {
    try {
      const userRole = window.localStorage.getItem("userRole");
      const hasFullAccess = window.localStorage.getItem("hasFullAccess") === "true";
      
      console.log("Simple Viewer - Auth check:", { userRole, hasFullAccess });
      
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
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }
  
  if (!authState.isAuthenticated) {
    return <LoginFormComponent />;
  }
  
  return (
    <RealSlickContentViewer
      bookId={bookId}
      unitNumber={unitNumber}
      hasFullAccess={true}
      role={authState.userRole}
    />
  );
}