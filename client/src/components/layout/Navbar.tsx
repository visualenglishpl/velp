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
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                  alt="Visual English Logo" 
                  className="h-8 mr-2"
                />
                <span className="text-gray-700 font-medium text-lg">VISUAL ENGLISH</span>
              </div>
            </Link>
          </div>
          
          {/* Main Navigation Links - Simplified */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4 mr-2">
              <Link href="/">
                <span className="text-gray-600 hover:text-teal-600 text-sm">Home</span>
              </Link>
              <Link href="/method">
                <span className="text-gray-600 hover:text-teal-600 text-sm">Method</span>
              </Link>
              <a href="/#books" className="text-gray-600 hover:text-teal-600 text-sm">Books</a>
              <a href="/#pricing" className="text-gray-600 hover:text-teal-600 text-sm">Pricing</a>
            </div>
            
            {/* Action Items */}
            <Link href="/cart" className="mr-1">
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
            
            <Link href="/login">
              <span className="bg-purple-600 text-white hover:bg-purple-700 px-4 py-2 rounded text-sm font-medium">
                Sign In
              </span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;