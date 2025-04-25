import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, LogOut, User, Book, BookOpen, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();
  const { user, logoutMutation } = useAuth();
  
  const isAdmin = user?.role === 'admin';
  const isTeacher = user?.role === 'teacher';
  const isLoggedIn = !!user;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navigateToAuth = () => {
    window.location.href = "/auth";
  };
  
  const handleLogout = () => {
    logoutMutation.mutate(undefined, {
      onSuccess: () => {
        // Use window.location instead of navigate to force a full page reload
        window.location.href = '/';
        setMobileMenuOpen(false);
      }
    });
  };
  
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    
    // For plans section, use window.scrollTo with a specific calculation
    if (sectionId === 'plans') {
      // Get the position of the plans section from the top of the page
      const plansSection = document.getElementById(sectionId);
      if (plansSection) {
        // Calculate the top position of the plans section
        const sectionTop = plansSection.getBoundingClientRect().top + window.pageYOffset;
        
        // Get navbar height for offset calculation
        const navbar = document.querySelector('nav');
        const navbarHeight = navbar ? navbar.offsetHeight : 0;
        
        // Calculate scroll position (section top minus navbar height minus extra padding)
        const offsetPosition = sectionTop - navbarHeight - 50;
        
        // Scroll to position with smooth animation
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // For other sections, use default scrollIntoView
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <img 
                  src="/api/asset/icons/LOGO VISUAL ENGLISH.png" 
                  alt="Visual English Logo"
                  className="h-12 mr-2 border border-gray-200 bg-white p-1 rounded-md"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {/* Admin Navigation */}
            {isAdmin && (
              <>
                <Link href="/admin" className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-sm font-medium">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Admin</span>
                </Link>
                <Link href="/admin/books" className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-sm font-medium">
                  <Book className="h-4 w-4" />
                  <span>Books</span>
                </Link>
                <Link href="/admin/flagged-questions" className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" />
                  <span>Flagged Questions</span>
                </Link>
              </>
            )}
            
            {/* Teacher Navigation */}
            {isTeacher && (
              <>
                <Link href="/" className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-sm font-medium">
                  <LayoutDashboard className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
              </>
            )}
            
            {/* Common Navigation for All Logged In Users */}
            {isLoggedIn && (
              <>
                <Link href="/books">
                  <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                    <Book className="h-4 w-4 mr-1" />
                    Bookstore
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            )}
            
            {/* Guest Navigation */}
            {!isLoggedIn && (
              <>
                <a href="#plans" 
                   onClick={scrollToSection('plans')}
                   className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  Plans & Pricing
                </a>
                <a href="#faq"
                   onClick={scrollToSection('faq')}
                   className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                  FAQ
                </a>
                
                <Link href="/books">
                  <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                    <Book className="h-4 w-4 mr-1" />
                    Bookstore
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700"
                  onClick={navigateToAuth}
                >
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </>
            )}
          </div>
          <div className="flex md:hidden items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-600"
              onClick={toggleMobileMenu}
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Admin Mobile Navigation */}
            {isAdmin && (
              <>
                <Link href="/admin">
                  <div className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-base font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Admin</span>
                  </div>
                </Link>
                <Link href="/admin/books">
                  <div className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-base font-medium">
                    <Book className="h-4 w-4" />
                    <span>Books</span>
                  </div>
                </Link>
                <Link href="/admin/flagged-questions">
                  <div className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-base font-medium">
                    <BookOpen className="h-4 w-4" />
                    <span>Flagged Questions</span>
                  </div>
                </Link>
              </>
            )}
            
            {/* Teacher Mobile Navigation */}
            {isTeacher && (
              <>
                <Link href="/">
                  <div className="text-gray-600 hover:text-primary flex items-center gap-1 px-3 py-2 text-base font-medium">
                    <LayoutDashboard className="h-4 w-4" />
                    <span>Dashboard</span>
                  </div>
                </Link>
              </>
            )}
            
            {/* Common Mobile Navigation for All Logged In Users */}
            {isLoggedIn && (
              <>
                <Link href="/books">
                  <Button 
                    variant="default" 
                    className="bg-black hover:bg-gray-800 text-white w-full justify-start"
                  >
                    <Book className="h-4 w-4 mr-1" />
                    Bookstore
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 w-full justify-start mt-1"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Sign Out
                </Button>
              </>
            )}
            
            {/* Guest Mobile Navigation */}
            {!isLoggedIn && (
              <>
                <a href="#plans" 
                   onClick={scrollToSection('plans')}
                   className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                  Plans & Pricing
                </a>
                <a href="#faq"
                   onClick={scrollToSection('faq')}
                   className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                  FAQ
                </a>
                
                <Link href="/books">
                  <Button 
                    variant="default" 
                    className="bg-black hover:bg-gray-800 text-white w-full justify-start"
                  >
                    <Book className="h-4 w-4 mr-1" />
                    Bookstore
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="border-gray-300 text-gray-700 w-full justify-start mt-1"
                  onClick={navigateToAuth}
                >
                  <User className="h-4 w-4 mr-1" />
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
