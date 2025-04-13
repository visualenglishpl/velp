import { Link } from "wouter";

const Footer = () => {
  const scrollToSection = (sectionId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    
    const element = document.getElementById(sectionId);
    if (element) {
      // Add a small offset to account for the fixed navbar height
      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Visual English</h3>
            <p className="text-gray-400">
              Interactive English materials for effective language learning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Website</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="https://visualenglish.pl/method/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Our Method
                </a>
              </li>
              <li>
                <a href="https://visualenglish.pl/about/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="https://visualenglish.pl/video/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Video Materials
                </a>
              </li>
              <li>
                <a href="https://visualenglish.pl/contact-us/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#faq" 
                   onClick={scrollToSection('faq')}
                   className="hover:text-white">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#plans" 
                   onClick={scrollToSection('plans')}
                   className="hover:text-white">
                  Plans & Pricing
                </a>
              </li>
              <li>
                <a href="https://www.visualenglish.pl" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                  Bookstore
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Visual English. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
