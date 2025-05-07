import { Link } from "wouter";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left side */}
          <div>
            <div className="flex items-center mb-4">
              <div className="bg-white p-2 rounded-md">
                <img 
                  src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png" 
                  alt="Visual English Logo"
                  className="h-16 mr-3"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-6 text-base">
              Interactive English learning for a visual generation.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiTiktok size={22} />
              </a>
            </div>
          </div>
          
          {/* Right side links */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-3">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/method" className="text-gray-400 hover:text-white transition-colors">
                    Method
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Books</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/books" className="text-gray-400 hover:text-white transition-colors">
                    All Books
                  </Link>
                </li>
                <li>
                  <a href="#plans" onClick={scrollToSection('plans')} className="text-gray-400 hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Support</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <a href="#faq" onClick={scrollToSection('faq')} className="text-gray-400 hover:text-white transition-colors">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-3">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-gray-400">
          <p className="text-sm mb-4 text-center">
            &copy; 2025 Visual English. All rights reserved.
          </p>
          <div className="text-xs text-center max-w-4xl mx-auto">
            <p className="mb-3">
              Zgodnie z art. 13 ust. 1 i ust. 2 ogólnego rozporządzenia o ochronie danych osobowych z dnia 27 kwietnia 2016 r. (RODO) informujemy, 
              iż administratorem Pani/Pana danych osobowych jest Visual English. Dane są przetwarzane w celach edukacyjnych i marketingowych.
            </p>
            <p className="mb-3">
              Więcej informacji na temat przetwarzania danych osobowych znajdziesz w naszej{" "}
              <Link href="/privacy" className="text-blue-400 hover:underline">
                Polityce Prywatności
              </Link>, {" "}
              <Link href="/cookies" className="text-blue-400 hover:underline">
                Polityce Cookies
              </Link>, {" "}
              <Link href="/withdrawal" className="text-blue-400 hover:underline">
                Prawie odstąpienia
              </Link>{" "}
              oraz{" "}
              <Link href="/terms" className="text-blue-400 hover:underline">
                Regulaminie
              </Link>.
            </p>
            <p className="mb-3">
              EDU-CENTRE DOLINA KARPIA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ | KRS: 0000806143 | NIP: 5492456552 | REGON: 384474200 | Adres: ul. RYNEK 2, 32-640 ZATOR, MAŁOPOLSKIE
            </p>
            <p className="mt-4">
              Platform was designed and built by EDU-CENTRE DOLINA KARPIA. To build a similar platform, contact us.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
