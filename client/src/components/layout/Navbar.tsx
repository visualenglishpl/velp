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
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                  <path d="M30.9375 22.5C30.9375 25.6066 29.3022 28.4812 26.7188 30C24.1353 28.4812 22.5 25.6066 22.5 22.5C22.5 19.3934 24.1353 16.5188 26.7188 15C29.3022 16.5188 30.9375 19.3934 30.9375 22.5Z" fill="#56BAD8"/>
                  <path d="M32.8125 22.5C32.8125 26.3653 30.5841 29.7892 27.3214 31.4827C27.1314 31.582 26.9389 31.6753 26.7424 31.7623C26.5537 31.6753 26.3686 31.582 26.1873 31.4827C27.1072 30.9595 27.9191 30.2679 28.5839 29.4507C29.2487 28.6336 29.7539 27.7075 30.0719 26.7199C30.3899 25.7322 30.5147 24.6983 30.4398 23.6711" fill="#56BAD8"/>
                </svg>
                <div className="text-xl font-semibold text-gray-800">VISUAL ENGLISH</div>
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">Home</span>
            </Link>
            <Link href="/method">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">Our Method</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">About Us</span>
            </Link>
            <Link href="/books">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">Books</span>
            </Link>
            <a href="/#pricing">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">Pricing</span>
            </a>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">Contact</span>
            </Link>
            <Link href="/cart">
              <div className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={18} />
                {cartItemsCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center text-[0.65rem] bg-teal-600 text-white" 
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>
            <Link href="/auth">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-2 rounded-md text-sm font-medium">Sign In</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/cart">
              <div className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={18} />
                {cartItemsCount > 0 && (
                  <Badge 
                    className="absolute -top-2 -right-2 px-1.5 py-0.5 min-w-[1.2rem] min-h-[1.2rem] flex items-center justify-center text-[0.65rem] bg-teal-600 text-white" 
                  >
                    {cartItemsCount}
                  </Badge>
                )}
              </div>
            </Link>
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