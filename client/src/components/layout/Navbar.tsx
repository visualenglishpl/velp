import React, { useState, useEffect } from "react";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Navbar = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);

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

    // Clean up
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);
  
  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                  alt="Visual English Logo" 
                  className="h-9 mr-2"
                />
                <span className="text-gray-800 font-bold text-lg">VISUAL ENGLISH</span>
              </div>
            </Link>
          </div>
          
          {/* Main Navigation Links - Enhanced spacing and consistency */}
          <div className="flex items-center">
            <div className="hidden md:flex items-center space-x-6 mr-6">
              <Link href="/">
                <span className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Home</span>
              </Link>
              <Link href="/method">
                <span className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Method</span>
              </Link>
              <Link href="/about">
                <span className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">About</span>
              </Link>
              <a href="/#books" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Books</a>
              <a href="/#pricing" className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Pricing</a>
              <Link href="/contact">
                <span className="text-gray-600 hover:text-blue-600 font-medium text-sm transition-colors">Contact</span>
              </Link>
            </div>
            
            {/* Action Items */}
            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <div className="flex items-center text-gray-700 hover:text-blue-600 cursor-pointer relative p-1">
                  <ShoppingCart size={20} />
                  {cartItemsCount > 0 && (
                    <Badge 
                      className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center text-[0.65rem] bg-blue-600 text-white" 
                    >
                      {cartItemsCount}
                    </Badge>
                  )}
                </div>
              </Link>
              
              <Link href="/login-select">
                <button className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow">
                  Sign In
                </button>
              </Link>
              
              <Link href="/teacher-quick-access">
                <button className="bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Teacher Portal
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;