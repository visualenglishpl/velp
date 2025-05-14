import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  Store, 
  Settings, 
  Users, 
  FileQuestion, 
  BarChart2, 
  Shield, 
  Bell,
  MessageSquare,
  CreditCard
} from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';

// Use a type that matches the User type from use-auth.tsx
interface UserType {
  id: number;
  username: string;
  role: "admin" | "teacher" | "school";
  email?: string;
  fullName?: string;
  password?: string; // Include password for the admin user
  [key: string]: any; // For any additional properties
}

const AdminPage = () => {
  // Try to use the auth context safely, with fallback to localStorage
  const [user, setUser] = useState<UserType | null>(null);
  
  useEffect(() => {
    try {
      const authContext = useAuth();
      if (authContext.user) {
        setUser(authContext.user);
      }
    } catch (error) {
      console.log("AdminPage: Auth context not available, using fallback");
      
      // Try to get user from localStorage or sessionStorage as fallback
      try {
        const localUser = localStorage.getItem('velp_user');
        const sessionUser = sessionStorage.getItem('velp_user');
        if (localUser || sessionUser) {
          setUser(JSON.parse(localUser || sessionUser || ""));
        }
      } catch (storageError) {
        console.error("AdminPage: Storage access error:", storageError);
      }
    }
    
    // Final attempt - try to get admin session directly
    setTimeout(() => {
      fetch('/api/direct/admin-login', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
      })
      .then(res => res.json())
      .then(data => {
        console.log("AdminPage: Last resort session recovery:", data);
        if (data.success && data.user) {
          // Update local storage
          try {
            const userString = JSON.stringify(data.user);
            localStorage.setItem('velp_user', userString);
            sessionStorage.setItem('velp_user', userString);
            
            // Force a component rerender by setting user object
            setUser(data.user);
          } catch (err) {
            console.error("AdminPage: Storage update error:", err);
          }
        }
      })
      .catch(err => console.error("AdminPage: Direct auth error:", err));
    }, 500);
  }, []); // Empty dependency array to run only once
  
  const [, setLocation] = useLocation();
  
  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/books');
    }
  }, [user, setLocation]);
  
  const adminFeatures = [
    {
      title: 'Books Management',
      description: 'Manage the list of educational books, units, and content',
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: '#FF40FF', // Pink (Book 0a)
      link: '/admin/books',
      featured: true
    },
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store className="h-10 w-10 text-white" />,
      color: '#FF7F27', // Orange (Book 0b)
      link: '/admin/shop'
    },
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings className="h-10 w-10 text-white" />,
      color: '#00CEDD', // Teal (Book 0c)
      link: '/admin/settings'
    },
    {
      title: 'User Management',
      description: 'Manage teachers, students and permissions',
      icon: <Users className="h-10 w-10 text-white" />,
      color: '#FFFF00', // Yellow (Book 1)
      link: '/admin/users'
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address content issues reported by users',
      icon: <FileQuestion className="h-10 w-10 text-white" />,
      color: '#9966CC', // Purple (Book 2)
      link: '/admin/flagged'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics and reports',
      icon: <BarChart2 className="h-10 w-10 text-white" />,
      color: '#00CC00', // Green (Book 3)
      link: '/admin/analytics'
    },
    {
      title: 'Access Roles',
      description: 'Configure role-based access controls',
      icon: <Shield className="h-10 w-10 text-white" />,
      color: '#5DADEC', // Blue (Book 4)
      link: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send announcements to users and manage notifications',
      icon: <Bell className="h-10 w-10 text-white" />,
      color: '#00CC66', // Green (Book 5)
      link: '/admin/broadcast'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and respond to user feedback and suggestions',
      icon: <MessageSquare className="h-10 w-10 text-white" />,
      color: '#FF0000', // Red (Book 6)
      link: '/admin/feedback'
    },
    {
      title: 'Payment History',
      description: 'View transaction history and manage subscriptions',
      icon: <CreditCard className="h-10 w-10 text-white" />,
      color: '#00FF00', // Bright Green (Book 7)
      link: '/admin/payments'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Visual English</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="bg-blue-600 text-white py-4 px-8 rounded-full inline-block mb-4">
              <h1 className="text-3xl font-bold">Visual English Admin</h1>
            </div>
            <p className="text-xl text-gray-600">
              Manage your educational platform from one central location
            </p>
          </div>

          {/* Admin feature cards start here */}

          {/* Admin feature cards - 5 in a row */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {adminFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden border-0 ${feature.featured ? 'shadow-xl ring-2 ring-purple-400' : 'shadow-md'} hover:scale-105 transition-transform`}
              >
                <CardHeader 
                  className="p-0"
                  style={{ backgroundColor: feature.color }}
                >
                  <div className="flex flex-col items-center justify-center py-3">
                    <div className="bg-white rounded-full p-2 mb-1">
                      <div style={{ color: feature.color }}>
                        {feature.icon}
                      </div>
                    </div>
                    <h2 className="text-lg font-bold text-white leading-tight">{feature.title}</h2>
                    {feature.featured && (
                      <span className="bg-white text-purple-600 px-2 py-0.5 rounded-full text-xs font-bold mt-1">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-2 pb-1 px-3">
                  <CardDescription className="text-center text-xs leading-tight">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pb-3 pt-0 flex justify-center">
                  <Link href={feature.link}>
                    <Button size="sm" className={feature.featured ? "bg-purple-600 hover:bg-purple-700" : "bg-indigo-600 hover:bg-indigo-700"}>
                      Manage
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 max-w-4xl mx-auto shadow-sm border border-purple-100">
            <div className="text-center mb-4">
              <h3 className="text-xl font-semibold text-purple-800">Quick Access Links</h3>
              <p className="text-sm text-gray-600">Access key features of the Visual English platform</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book/1/unit/1">
                <Button className="px-6 bg-purple-600 hover:bg-purple-700">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Content Viewer
                </Button>
              </Link>
              
              <Link href="/admin/books">
                <Button variant="outline" className="px-6 border-purple-400 text-purple-700 hover:bg-purple-50">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Books Management
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" className="px-6 border-blue-300 text-blue-600 hover:bg-blue-50">
                  <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;