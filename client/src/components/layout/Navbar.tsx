import { Link } from "wouter";

const Navbar = () => {
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
          <div className="flex items-center space-x-4">
            <Link href="/books">
              <span className="text-gray-600 hover:text-primary text-sm font-medium">Bookstore</span>
            </Link>
            <Link href="/auth">
              <span className="text-gray-600 hover:text-primary text-sm font-medium">Sign In</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
