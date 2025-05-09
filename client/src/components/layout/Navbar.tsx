import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const { t } = useLanguage();

  // Update cart count when localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const storedCart = localStorage.getItem('visualEnglishCart');
        if (storedCart) {
          const items = JSON.parse(storedCart);
          setCartItemsCount(items.length);
        } else {
          setCartItemsCount(0);
        }
      } catch (error) {
        console.error('Failed to load cart items:', error);
        setCartItemsCount(0);
      }
    };

    // Initial count
    updateCartCount();

    // Set up storage event listener for cross-tab synchronization
    window.addEventListener('storage', updateCartCount);

    // Check for cart updates every 2 seconds
    const interval = setInterval(updateCartCount, 2000);

    // Clean up
    return () => {
      window.removeEventListener('storage', updateCartCount);
      clearInterval(interval);
    };
  }, []);
  
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                  alt="Visual English Logo" 
                  className="h-8 mr-3"
                />
                <span className="text-gray-700 font-medium text-lg tracking-wide">VISUAL ENGLISH</span>
              </div>
            </Link>
          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-gray-600 hover:text-teal-600 text-sm">Home</span>
            </Link>
            <Link href="/method">
              <span className="text-gray-600 hover:text-teal-600 text-sm">Method</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 hover:text-teal-600 text-sm">About Us</span>
            </Link>
            <Link href="/books">
              <span className="text-gray-600 hover:text-teal-600 text-sm">Books</span>
            </Link>
            <Link href="/#pricing">
              <span className="text-gray-600 hover:text-teal-600 text-sm">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-teal-600 text-sm">Contact</span>
            </Link>
            
            <Link href="/cart">
              <div className="flex items-center text-gray-700 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center text-[0.65rem] bg-teal-600 text-white" 
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>
            
            {/* Language Selector - PL */}
            <div className="text-gray-700 font-medium">
              PL
            </div>
            
            {/* Sign In Button */}
            <Link href="/login">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-5 py-2 rounded text-sm font-medium">Sign In</span>
            </Link>
          </div>
          
          {/* Mobile Navigation */}
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart">
              <div className="flex items-center text-gray-700 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={20} />
                {cartItemsCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center text-[0.65rem] bg-teal-600 text-white" 
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>
            
            {/* Language Selector - PL */}
            <div className="text-gray-700 font-medium">
              PL
            </div>
            
            {/* Sign In Button */}
            <Link href="/login">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-3 py-1 rounded text-xs font-medium">Sign In</span>
            </Link>
            
            {/* Mobile Menu Button */}
            <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;