import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/api/asset/icons/LOGO%20VISUAL%20ENGLISH.png" 
                  alt="Visual English Logo"
                  className="h-10 mr-2"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">Home</span>
            </Link>
            <Link href="/method">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">Our Method</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">About Us</span>
            </Link>
            <Link href="/books">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">Books</span>
            </Link>
            <Link href="/#pricing">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">Pricing</span>
            </Link>
            <Link href="/contact">
              <span className="text-gray-700 hover:text-teal-600 text-sm font-medium">Contact</span>
            </Link>
            <Link href="/cart">
              <div className="flex items-center text-gray-700 hover:text-teal-600 cursor-pointer">
                <ShoppingCart size={18} />
              </div>
            </Link>
            <Link href="/auth">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-4 py-2 rounded-md text-sm font-medium">Sign In</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center">
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
