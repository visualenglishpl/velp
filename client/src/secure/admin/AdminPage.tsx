import React, { useEffect } from 'react';
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

const AdminPage = () => {
  // Try to use the auth context safely, with fallback to localStorage
  let user = null;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.log("AdminPage: Auth context not available, using fallback");
    
    // Try to get user from localStorage or sessionStorage as fallback
    try {
      const localUser = localStorage.getItem('velp_user');
      const sessionUser = sessionStorage.getItem('velp_user');
      if (localUser || sessionUser) {
        user = JSON.parse(localUser || sessionUser || "");
      }
    } catch (storageError) {
      console.error("AdminPage: Storage access error:", storageError);
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
            user = data.user;
            
            // Force refresh after a short delay
            setTimeout(() => {
              window.location.reload();
            }, 1000);
          } catch (err) {
            console.error("AdminPage: Storage update error:", err);
          }
        }
      })
      .catch(err => console.error("AdminPage: Direct auth error:", err));
    }, 500);
  }
  
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

          {/* Featured navigation path card */}
          <div className="mb-12 mx-auto max-w-4xl">
            <Card className="border-2 border-purple-300 bg-purple-50 shadow-xl overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6">
                <div className="flex items-center justify-center mb-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                    <path d="M22 11.08V12C21.9988 14.1564 21.3005 16.2547 20.0093 17.9818C18.7182 19.709 16.9033 20.9725 14.8354 21.5839C12.7674 22.1953 10.5573 22.1219 8.53447 21.3746C6.51168 20.6273 4.78465 19.2461 3.61096 17.4371C2.43727 15.628 1.87979 13.4881 2.02168 11.3363C2.16356 9.18455 2.99721 7.13631 4.39828 5.49706C5.79935 3.85781 7.69279 2.71537 9.79619 2.24013C11.8996 1.7649 14.1003 1.98232 16.07 2.85999" 
                      stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M22 4L12 14.01L9 11.01" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h2 className="text-2xl font-bold text-center">Complete Navigation Path</h2>
                </div>
                <p className="text-center text-white opacity-90 mt-1">Follow this path to manage content and view resources</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-3 text-center">
                  <div className="bg-white px-4 py-3 rounded-lg shadow-sm">
                    <span className="text-purple-600 font-semibold">Admin Dashboard</span>
                    <span className="text-xs text-purple-400 block">(Current Page)</span>
                  </div>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Link href="/admin/books">
                    <div className="bg-white px-4 py-3 rounded-lg shadow-sm cursor-pointer hover:bg-purple-100">
                      <span className="text-purple-600 font-semibold">Books Management</span>
                      <span className="text-xs text-purple-400 block">Organize all books</span>
                    </div>
                  </Link>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Link href="/admin/book-units/1">
                    <div className="bg-white px-4 py-3 rounded-lg shadow-sm cursor-pointer hover:bg-purple-100">
                      <span className="text-purple-600 font-semibold">Units Management</span>
                      <span className="text-xs text-purple-400 block">Manage a book's units</span>
                    </div>
                  </Link>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <Link href="/book/1/unit/1">
                    <div className="bg-white px-4 py-3 rounded-lg shadow-sm cursor-pointer hover:bg-purple-100">
                      <span className="text-purple-600 font-semibold">Content Viewer</span>
                      <span className="text-xs text-purple-400 block">View learning materials</span>
                    </div>
                  </Link>
                </div>
                
                <div className="mt-5 bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                  <p className="text-sm text-indigo-800 flex items-start">
                    <svg className="h-5 w-5 mr-2 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>This navigation path allows you to manage all aspects of the Visual English content. Click any step to jump directly to that section.</span>
                  </p>
                </div>
              </CardContent>
              <CardFooter className="bg-purple-100 p-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/admin/books">
                  <Button className="bg-purple-600 hover:bg-purple-700 w-48">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                    Start with Books
                  </Button>
                </Link>
                <Link href="/book/1/unit/1">
                  <Button variant="outline" className="w-48 border-purple-400 text-purple-700">
                    <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Content Now
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Admin feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {adminFeatures.map((feature, index) => (
              <Card 
                key={index} 
                className={`overflow-hidden border-0 ${feature.featured ? 'shadow-xl ring-2 ring-purple-400' : 'shadow-md'}`}
              >
                <CardHeader 
                  className="p-0"
                  style={{ backgroundColor: feature.color }}
                >
                  <div className="flex flex-col items-center justify-center py-5">
                    <div className="bg-white rounded-full p-3 mb-2">
                      <div style={{ color: feature.color }}>
                        {feature.icon}
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-white">{feature.title}</h2>
                    {feature.featured && (
                      <span className="bg-white text-purple-600 px-2 py-1 rounded-full text-xs font-bold mt-2">
                        RECOMMENDED
                      </span>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 pb-2">
                  <CardDescription className="text-center">
                    {feature.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="pb-4 pt-0 flex justify-center">
                  <Link href={feature.link}>
                    <Button className={feature.featured ? "bg-purple-600 hover:bg-purple-700" : "bg-indigo-600 hover:bg-indigo-700"}>
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