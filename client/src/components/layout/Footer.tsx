import { Link } from "wouter";
import { Facebook, Youtube, Instagram, Globe, Linkedin } from "lucide-react";
import { SiTiktok, SiPinterest } from "react-icons/si";

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Social Media Links */}
          <div className="flex flex-col">
            <h3 className="text-lg font-semibold mb-6">📚 Visual English</h3>
            <div className="flex items-center space-x-2 mb-6">
              <Globe size={16} className="text-gray-400" />
              <a href="https://visualenglish.pl" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                visualenglish.pl
              </a>
            </div>
            <div className="flex flex-wrap gap-4 mb-8">
              <a href="https://www.facebook.com/visualenglishpl" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.youtube.com/@visualenglishbooks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
              <a href="https://www.tiktok.com/@visualenglishbooks" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiTiktok size={20} />
              </a>
              <a href="https://www.linkedin.com/in/visualenglish/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://pl.pinterest.com/VisualEnglishConversation/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiPinterest size={20} />
              </a>
            </div>

            <h3 className="text-lg font-semibold mb-6">🎓 EduCentre DK / English School</h3>
            <div className="flex items-center space-x-2 mb-6">
              <Globe size={16} className="text-gray-400" />
              <a href="https://educentredk.pl" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition-colors">
                educentredk.pl
              </a>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="https://www.facebook.com/educentredk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@englishschoolpoland" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <SiTiktok size={20} />
              </a>
              <a href="https://www.instagram.com/englishschoolpoland" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.youtube.com/@EduCentreDK" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col">
            <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
            <div className="text-gray-300 space-y-4">
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Email</h4>
                <div className="space-y-1 text-sm">
                  <div>info@educentredk.pl</div>
                  <div>biuro@visualenglish.pl</div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-medium text-white mb-2">Phone</h4>
                <div className="space-y-1 text-sm">
                  <div>Office: +48 537 829 308</div>
                  <div>Sales & Marketing: +48 506 672 933</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
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
              <Link href="/admin-login" className="ml-2 text-gray-600 hover:text-gray-400 text-xs transition-colors">
                [Admin]
              </Link>
              <Link href="/admin/dev/tools" className="ml-2 text-gray-600 hover:text-gray-400 text-xs transition-colors">
                [Dev]
              </Link>
            </p>
          </div>
          
          {/* Back to Top Logo */}
          <div className="mt-8 pt-4 border-t border-gray-800 text-center">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="inline-block hover:opacity-75 transition-opacity duration-300 group"
              aria-label="Back to top"
            >
              <img 
                src="/api/direct/content/icons/LOGO VISUAL ENGLISH.png"
                alt="Visual English Logo - Back to Top" 
                className="h-12 mx-auto filter brightness-90 group-hover:brightness-100 transition-all duration-300"
              />
              <p className="text-xs text-gray-500 mt-1 group-hover:text-gray-400 transition-colors">Back to Top</p>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
