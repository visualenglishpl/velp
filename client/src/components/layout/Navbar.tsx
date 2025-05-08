import React from "react";
import { Link } from "wouter";
import { ShoppingCart, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/ui/language-switcher";

const Navbar = () => {
  const { t } = useLanguage();
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                  alt="Visual English Logo" 
                  className="h-10"
                />
              </div>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">{t('nav.home')}</span>
            </Link>
            <Link href="/method">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">{t('nav.method')}</span>
            </Link>
            <Link href="/about">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">{t('nav.about')}</span>
            </Link>
            <a href="/#books" onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  // Target the book section in HeroSection component
                  const booksSection = document.getElementById('books');
                  if (booksSection) {
                    // Calculate screen center
                    const windowHeight = window.innerHeight;
                    const sectionHeight = booksSection.offsetHeight;
                    const navbarHeight = 64; // Height of the navbar in pixels
                    
                    // Get position of the section
                    const sectionTop = booksSection.getBoundingClientRect().top + window.pageYOffset;
                    
                    // Center the section in the viewport if possible
                    // If section is taller than viewport, align to top with navbar offset
                    let targetPosition;
                    if (sectionHeight > windowHeight) {
                      targetPosition = sectionTop - navbarHeight;
                    } else {
                      targetPosition = sectionTop - (windowHeight - sectionHeight) / 2 - navbarHeight;
                    }
                    
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }}>
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium cursor-pointer">{t('nav.books')}</span>
            </a>
            <a href="/#pricing" onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault();
                  const pricingSection = document.getElementById('pricing');
                  if (pricingSection) {
                    // Calculate screen center
                    const windowHeight = window.innerHeight;
                    const sectionHeight = pricingSection.offsetHeight;
                    const navbarHeight = 64; // Height of the navbar in pixels
                    
                    // Get position of the section
                    const sectionTop = pricingSection.getBoundingClientRect().top + window.pageYOffset;
                    
                    // Center the section in the viewport if possible
                    // If section is taller than viewport, align to top with navbar offset
                    let targetPosition;
                    if (sectionHeight > windowHeight) {
                      targetPosition = sectionTop - navbarHeight;
                    } else {
                      targetPosition = sectionTop - (windowHeight - sectionHeight) / 2 - navbarHeight;
                    }
                    
                    window.scrollTo({
                      top: targetPosition,
                      behavior: 'smooth'
                    });
                  }
                }
              }}>
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium cursor-pointer">{t('nav.pricing')}</span>
            </a>
            <Link href="/contact">
              <span className="text-gray-600 hover:text-teal-600 text-sm font-medium">{t('nav.contact')}</span>
            </Link>
            <Link href="/auth">
              <div className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={18} />
              </div>
            </Link>
            <LanguageSwitcher variant="minimal" />
            <Link href="/auth">
              <span className="bg-teal-600 text-white hover:bg-teal-700 px-6 py-2 rounded-md text-sm font-medium">Sign In</span>
            </Link>
          </div>
          <div className="md:hidden flex items-center space-x-4">
            <Link href="/auth">
              <div className="flex items-center text-gray-600 hover:text-teal-600 cursor-pointer relative">
                <ShoppingCart size={18} />
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