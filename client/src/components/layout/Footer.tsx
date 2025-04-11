import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Visual English</h3>
            <p className="text-gray-400">
              Interactive English materials for effective language learning.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Plans</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="#individual-plans">
                  <a className="hover:text-white">Individual Plans</a>
                </Link>
              </li>
              <li>
                <Link href="#school-plans">
                  <a className="hover:text-white">School Plans</a>
                </Link>
              </li>
              <li>
                <Link href="#school-plans">
                  <a className="hover:text-white">Custom Solutions</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/">
                  <a className="hover:text-white">Free Samples</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="hover:text-white">Bookstore</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="hover:text-white">Teaching Tips</a>
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/">
                  <a className="hover:text-white">Help Center</a>
                </Link>
              </li>
              <li>
                <Link href="#contact">
                  <a className="hover:text-white">Contact Us</a>
                </Link>
              </li>
              <li>
                <Link href="/">
                  <a className="hover:text-white">Privacy Policy</a>
                </Link>
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
