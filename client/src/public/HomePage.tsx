import { useEffect, useState } from "react";
import { Link } from "wouter";
import HeroSection from "../components/sections/HeroSection";
import PricingPlans from "../components/sections/IndividualPlans";
import FAQSection from "../components/sections/FAQSection";
import EUProjectSection from "../components/sections/EUProjectSection";

const HomePage = () => {
  // To safely check if user is admin without crashing
  const [isAdmin, setIsAdmin] = useState(false);
  
  useEffect(() => {
    // Check if the user has admin status
    const checkAdminStatus = async () => {
      try {
        const response = await fetch('/api/user', { credentials: 'include' });
        if (response.ok) {
          const userData = await response.json();
          setIsAdmin(userData?.role === 'admin');
        }
      } catch (error) {
        console.error('Error checking admin status:', error);
      }
    };
    
    checkAdminStatus();
  }, []);

  return (
    <div className="space-y-0">
      <HeroSection />
      
      {/* Admin Quick Access - Only visible to admins */}
      {isAdmin && (
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="bg-purple-50 border border-purple-200 rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-purple-800">Admin Quick Access</h3>
                <p className="text-sm text-purple-600">Access your admin dashboard to manage content</p>
              </div>
              <Link href="/admin">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-5 py-2 rounded-md flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Admin Dashboard
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      
      {/* Pricing Section */}
      <section id="pricing" className="pt-12 pb-8">
        <PricingPlans />
      </section>
      
      <FAQSection />
      <EUProjectSection />
    </div>
  );
};

export default HomePage;