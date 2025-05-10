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
          <div className="flex items-center space-x-6">
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
            <a href="/book/book1/unit/unit1" target="_blank" className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium">
              Book Viewer
            </a>
            
            <Link href="/login">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-5 py-2 rounded text-sm font-medium">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;