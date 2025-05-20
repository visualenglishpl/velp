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
  CreditCard,
  Globe
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
      // Try auth context first
      const authContext = useAuth();
      if (authContext.user) {
        setUser(authContext.user);
        return;
      }
      
      // Try browser storage as fallback
      const localUser = localStorage.getItem('velp_user');
      const sessionUser = sessionStorage.getItem('velp_user');
      if (localUser || sessionUser) {
        setUser(JSON.parse(localUser || sessionUser || ""));
        return;
      }
      
      // Last resort - direct API call
      fetch('/api/direct/admin-login', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache'
      })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.user) {
          const userString = JSON.stringify(data.user);
          localStorage.setItem('velp_user', userString);
          sessionStorage.setItem('velp_user', userString);
          setUser(data.user);
        }
      })
      .catch(() => {
        // Silent fail - all auth methods exhausted
      });
    } catch (error) {
      // Silent error handling
    }
  }, []); // Empty dependency array to run only once
  
  const [, setLocation] = useLocation();
  
  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/books');
    }
  }, [user, setLocation]);
  
  // Organize admin features into logical categories
  const contentManagement = [
    {
      title: 'Books Management',
      description: 'Manage the list of educational books, units, and content',
      icon: <BookOpen className="h-10 w-10 text-white" size={42} />,
      color: '#FF40FF', // Pink (Book 0a)
      link: '/admin/books',
      featured: true
    },
    {
      title: 'Flagged Questions',
      description: 'Review and address content issues reported by users',
      icon: <FileQuestion className="h-10 w-10 text-white" size={42} />,
      color: '#9966CC', // Purple (Book 2)
      link: '/admin/flagged'
    },
    {
      title: 'Language Manager',
      description: 'Manage translations, edit text labels, and UI language per user',
      icon: <Globe className="h-10 w-10 text-white" size={42} />,
      color: '#FFFF00', // Yellow (Book 1)
      link: '/admin/languages'
    }
  ];
  
  const userManagement = [
    {
      title: 'Access Roles',
      description: 'Configure role-based access controls',
      icon: <Shield className="h-10 w-10 text-white" size={42} />,
      color: '#5DADEC', // Blue (Book 4)
      link: '/admin/roles'
    },
    {
      title: 'Broadcast Messages',
      description: 'Send announcements to users and manage notifications',
      icon: <Bell className="h-10 w-10 text-white" size={42} />,
      color: '#00CC66', // Green (Book 5)
      link: '/admin/broadcast'
    },
    {
      title: 'Feedback Viewer',
      description: 'View and respond to user feedback and suggestions',
      icon: <MessageSquare className="h-10 w-10 text-white" size={42} />,
      color: '#FF0000', // Red (Book 6)
      link: '/admin/feedback'
    }
  ];
  
  const businessManagement = [
    {
      title: 'Shop Management',
      description: 'Configure products, pricing, and shop settings',
      icon: <Store className="h-10 w-10 text-white" size={42} />,
      color: '#FF7F27', // Orange (Book 0b)
      link: '/admin/shop'
    },
    {
      title: 'Payment History',
      description: 'View transaction history and manage subscriptions',
      icon: <CreditCard className="h-10 w-10 text-white" size={42} />,
      color: '#00FF00', // Bright Green (Book 7)
      link: '/admin/payments'
    },
    {
      title: 'Analytics Panel',
      description: 'View platform usage statistics and reports',
      icon: <BarChart2 className="h-10 w-10 text-white" size={42} />,
      color: '#00CC00', // Green (Book 3)
      link: '/admin/analytics'
    }
  ];
  
  const systemSettings = [
    {
      title: 'Site Settings',
      description: 'Customize platform appearance and behavior',
      icon: <Settings className="h-10 w-10 text-white" size={42} />,
      color: '#00CEDD', // Teal (Book 0c)
      link: '/admin/settings'
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

          {/* Content Management Section */}
          <div className="mb-8">
            <div className="flex items-center mb-4 bg-pink-50 p-2 rounded-md">
              <BookOpen className="h-6 w-6 text-pink-600 mr-2" />
              <h2 className="text-xl font-semibold text-pink-800">Content Management</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {contentManagement.map((feature: any, index: number) => (
                <Card 
                  key={index} 
                  className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex flex-col items-center justify-center py-3 w-full px-4">
                      <div className="mb-2 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex items-center justify-center">
                        <h2 className="text-base font-bold text-white text-center w-full truncate">{feature.title}</h2>
                      </div>
                    </div>
                  </CardHeader>

                  <CardFooter className="pb-3 pt-3 flex justify-center">
                    <Link href={feature.link}>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 w-20 text-xs font-medium">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* User Management Section */}
            <div className="flex items-center mb-4 bg-blue-50 p-2 rounded-md">
              <Users className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold text-blue-800">User Management</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {userManagement.map((feature: any, index: number) => (
                <Card 
                  key={index} 
                  className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex flex-col items-center justify-center py-3 w-full px-4">
                      <div className="mb-2 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex items-center justify-center">
                        <h2 className="text-base font-bold text-white text-center w-full truncate">{feature.title}</h2>
                      </div>
                    </div>
                  </CardHeader>

                  <CardFooter className="pb-3 pt-3 flex justify-center">
                    <Link href={feature.link}>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 w-20 text-xs font-medium">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* Business Management Section */}
            <div className="flex items-center mb-4 bg-green-50 p-2 rounded-md">
              <Store className="h-6 w-6 text-green-600 mr-2" />
              <h2 className="text-xl font-semibold text-green-800">Business Management</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {businessManagement.map((feature: any, index: number) => (
                <Card 
                  key={index} 
                  className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex flex-col items-center justify-center py-3 w-full px-4">
                      <div className="mb-2 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex items-center justify-center">
                        <h2 className="text-base font-bold text-white text-center w-full truncate">{feature.title}</h2>
                      </div>
                    </div>
                  </CardHeader>

                  <CardFooter className="pb-3 pt-3 flex justify-center">
                    <Link href={feature.link}>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 w-20 text-xs font-medium">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            
            {/* System Settings Section */}
            <div className="flex items-center mb-4 bg-teal-50 p-2 rounded-md">
              <Settings className="h-6 w-6 text-teal-600 mr-2" />
              <h2 className="text-xl font-semibold text-teal-800">System Settings</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {systemSettings.map((feature: any, index: number) => (
                <Card 
                  key={index} 
                  className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl"
                    style={{ backgroundColor: feature.color }}
                  >
                    <div className="flex flex-col items-center justify-center py-3 w-full px-4">
                      <div className="mb-2 flex items-center justify-center">
                        {feature.icon}
                      </div>
                      <div className="flex items-center justify-center">
                        <h2 className="text-base font-bold text-white text-center w-full truncate">{feature.title}</h2>
                      </div>
                    </div>
                  </CardHeader>

                  <CardFooter className="pb-3 pt-3 flex justify-center">
                    <Link href={feature.link}>
                      <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 w-20 text-xs font-medium">
                        Manage
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
          
          {/* Quick Access Links - simplified */}
          <div className="mt-8 bg-white rounded-lg p-4 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h3 className="text-lg font-medium text-gray-800">Quick Access</h3>
              </div>
              
              <div className="flex space-x-3">
                <Link href="/book/1/unit/1">
                  <Button size="sm" variant="outline" className="border-indigo-200 text-indigo-700">
                    Content Viewer
                  </Button>
                </Link>
                
                <Link href="/">
                  <Button size="sm" variant="ghost" className="text-gray-600">
                    Home
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPage;