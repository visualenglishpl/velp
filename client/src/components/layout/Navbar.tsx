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

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <span className="font-bold text-xl md:text-2xl text-black">VISUAL ENGLISH</span>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="#individual-plans">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                Individual Plans
              </a>
            </Link>
            <Link href="#school-plans">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                School Plans
              </a>
            </Link>
            <Link href="#faq">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                FAQ
              </a>
            </Link>
            
            <Link href="/book7/unit12">
              <a className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm font-bold">
                Book7/Unit12
              </a>
            </Link>

            <a href="https://www.visualenglish.pl" target="_blank" rel="noopener noreferrer">
              <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
                Bookstore
              </Button>
            </a>
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
            <Link href="#individual-plans">
              <a className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                Individual Plans
              </a>
            </Link>
            <Link href="#school-plans">
              <a className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                School Plans
              </a>
            </Link>
            <Link href="#faq">
              <a className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                FAQ
              </a>
            </Link>
            
            <Link href="/book7/unit12">
              <a className="text-blue-600 hover:text-blue-800 block px-3 py-2 text-base font-bold">
                Book7/Unit12
              </a>
            </Link>

            <a href="https://www.visualenglish.pl" target="_blank" rel="noopener noreferrer">
              <Button 
                variant="default" 
                className="bg-black hover:bg-gray-800 text-white w-full justify-start"
              >
                Bookstore
              </Button>
            </a>
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
