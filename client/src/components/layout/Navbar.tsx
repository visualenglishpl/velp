import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [, navigate] = useLocation();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const navigateToAuth = () => {
    window.location.href = "/auth";
  };
  
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      setMobileMenuOpen(false);
      
      // Add a larger offset to ensure the entire section is visible
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      // Add additional offset (120px) to ensure the section is fully visible including the contact box
      const extraOffset = 120;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight - extraOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
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
          <div className="hidden md:flex items-center space-x-6">
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
            
            <Link href="/books"
               className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
              Books
            </Link>

            <Link href="/books">
              <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                Store
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700"
              onClick={navigateToAuth}
            >
              Sign In
            </Button>
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
            
            <Link href="/books"
               className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
              Books
            </Link>

            <Link href="/books">
              <Button 
                variant="default" 
                className="bg-black hover:bg-gray-800 text-white w-full justify-start"
              >
                Store
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 w-full justify-start mt-1"
              onClick={navigateToAuth}
            >
              Sign In
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
