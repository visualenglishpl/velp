import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <a className="text-primary font-bold text-xl">Visual English</a>
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
            <Link href="#contact">
              <a className="text-gray-600 hover:text-primary px-3 py-2 text-sm font-medium">
                Contact
              </a>
            </Link>
            <Button variant="default" className="bg-black hover:bg-gray-800 text-white">
              New Bookstore
            </Button>
            <Button variant="outline" className="border-gray-300 text-gray-700">
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
            <Link href="#contact">
              <a className="text-gray-600 hover:text-primary block px-3 py-2 text-base font-medium">
                Contact
              </a>
            </Link>
            <Button 
              variant="default" 
              className="bg-black hover:bg-gray-800 text-white w-full justify-start"
            >
              New Bookstore
            </Button>
            <Button 
              variant="outline" 
              className="border-gray-300 text-gray-700 w-full justify-start mt-1"
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
