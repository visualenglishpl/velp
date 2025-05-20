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
                <button className="ml-2 bg-blue-800 text-white hover:bg-blue-900 px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-sm hover:shadow flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
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