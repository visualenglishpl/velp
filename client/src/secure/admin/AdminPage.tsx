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
      
      <div className="min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg inline-block">
              Visual English Admin Dashboard
            </h1>
          </div>

          {/* Main Layout - Simple 2-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Content Management Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <BookOpen className="h-5 w-5 text-pink-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Content Management</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {contentManagement.map((feature, index) => (
                  <Link key={index} href={feature.link}>
                    <div 
                      className="p-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors border border-gray-100"
                      style={{ borderLeft: `4px solid ${feature.color}` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* User Management Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Users className="h-5 w-5 text-blue-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">User Management</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {userManagement.map((feature, index) => (
                  <Link key={index} href={feature.link}>
                    <div 
                      className="p-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors border border-gray-100"
                      style={{ borderLeft: `4px solid ${feature.color}` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Business Management Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Store className="h-5 w-5 text-green-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">Business Management</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {businessManagement.map((feature, index) => (
                  <Link key={index} href={feature.link}>
                    <div 
                      className="p-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors border border-gray-100"
                      style={{ borderLeft: `4px solid ${feature.color}` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* System Settings Section */}
            <div className="bg-white p-5 rounded-xl shadow-sm">
              <div className="flex items-center mb-4">
                <Settings className="h-5 w-5 text-teal-600 mr-2" />
                <h2 className="text-lg font-semibold text-gray-800">System Settings</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3">
                {systemSettings.map((feature, index) => (
                  <Link key={index} href={feature.link}>
                    <div 
                      className="p-3 rounded-lg flex items-center hover:bg-gray-50 transition-colors border border-gray-100"
                      style={{ borderLeft: `4px solid ${feature.color}` }}
                    >
                      <div 
                        className="w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0"
                        style={{ backgroundColor: feature.color }}
                      >
                        {React.cloneElement(feature.icon as React.ReactElement, { size: 20 })}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-800">{feature.title}</h3>
                        <p className="text-xs text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Quick Access Footer */}
          <div className="mt-6 bg-white rounded-lg p-3 shadow-sm border border-gray-100 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Welcome, Admin
            </div>
            <div className="flex space-x-2">
              <Link href="/book/1/unit/1">
                <Button size="sm" variant="outline" className="text-xs">
                  Content Viewer
                </Button>
              </Link>
              <Link href="/">
                <Button size="sm" variant="ghost" className="text-xs">
                  Home
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