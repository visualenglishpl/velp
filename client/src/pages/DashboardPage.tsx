import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Book, 
  LayoutDashboard, 
  Users, 
  Upload, 
  LogOut, 
  Settings, 
  BookOpen, 
  CheckSquare, 
  BarChart,
  Building,
  User,
  GraduationCap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

// Types
interface DashboardStats {
  totalBooks: number;
  totalUnits: number;
  totalUsers: number;
  recentActivity: Array<{
    id: number;
    action: string;
    user: string;
    timestamp: string;
  }>;
}

export default function DashboardPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Demo data
  const [stats, setStats] = useState<DashboardStats>({
    totalBooks: 8,
    totalUnits: 156,
    totalUsers: 248,
    recentActivity: [
      { id: 1, action: 'Edited Unit 3 in Book 4', user: 'Admin User', timestamp: '2 hours ago' },
      { id: 2, action: 'Added new material to Book 7', user: 'Content Creator', timestamp: '4 hours ago' },
      { id: 3, action: 'Updated Book 2 metadata', user: 'Admin User', timestamp: '1 day ago' },
      { id: 4, action: 'Uploaded new images to Unit 5', user: 'Content Creator', timestamp: '2 days ago' },
    ]
  });
  
  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      setIsAuthenticated(true);
      setUserRole(role);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('hasFullAccess');
    localStorage.removeItem('userEmail');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    
    // Redirect to login
    navigate('/login');
  };
  
  // Navigate to books page
  const navigateToBooks = () => {
    navigate('/dashboard/books');
  };
  
  // If not authenticated, show nothing (will redirect via useEffect)
  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }
  
  const isAdmin = userRole === 'admin';
  const isTeacher = userRole === 'teacher';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo / Title */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Book className="h-8 w-8 text-primary" />
                <span className="ml-2 font-bold text-xl">Visual English</span>
              </div>
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">
                      {localStorage.getItem('userEmail') || 'User'}
                    </span>
                    <span className="text-xs text-gray-500 capitalize">
                      {userRole} Account
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
                    {isAdmin ? (
                      <User className="h-4 w-4" />
                    ) : (
                      <GraduationCap className="h-4 w-4" />
                    )}
                  </div>
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-8">
          {/* Welcome section */}
          <div>
            <h1 className="text-2xl font-bold">Welcome to your dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your Visual English content and users</p>
          </div>
          
          {/* Stats overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Books</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <BookOpen className="h-8 w-8 text-primary/80 mr-3" />
                  <span className="text-3xl font-bold">{stats.totalBooks}</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Units</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Book className="h-8 w-8 text-primary/80 mr-3" />
                  <span className="text-3xl font-bold">{stats.totalUnits}</span>
                </div>
              </CardContent>
            </Card>
            
            {isAdmin && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Users className="h-8 w-8 text-primary/80 mr-3" />
                    <span className="text-3xl font-bold">{stats.totalUsers}</span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            {isTeacher && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Assignments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckSquare className="h-8 w-8 text-primary/80 mr-3" />
                    <span className="text-3xl font-bold">12</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Quick actions */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              <Card className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={navigateToBooks}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <BookOpen className="h-10 w-10 text-primary mb-3" />
                  <CardTitle className="text-base mb-1">Books</CardTitle>
                  <CardDescription>View and manage content</CardDescription>
                </CardContent>
              </Card>
              
              {isAdmin && (
                <>
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Users className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">Users</CardTitle>
                      <CardDescription>Manage user accounts</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Upload className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">Upload</CardTitle>
                      <CardDescription>Upload new content</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Settings className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">Settings</CardTitle>
                      <CardDescription>System configuration</CardDescription>
                    </CardContent>
                  </Card>
                </>
              )}
              
              {isTeacher && (
                <>
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <CheckSquare className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">Lessons</CardTitle>
                      <CardDescription>View and prepare lessons</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <BarChart className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">Progress</CardTitle>
                      <CardDescription>Student progress reports</CardDescription>
                    </CardContent>
                  </Card>
                  
                  <Card className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Building className="h-10 w-10 text-primary mb-3" />
                      <CardTitle className="text-base mb-1">School</CardTitle>
                      <CardDescription>School information</CardDescription>
                    </CardContent>
                  </Card>
                </>
              )}
            </div>
          </div>
          
          {/* Recent activity */}
          {isAdmin && (
            <div>
              <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
              <Card>
                <CardContent className="p-0">
                  <ul className="divide-y divide-gray-200">
                    {stats.recentActivity.map(activity => (
                      <li key={activity.id} className="p-4 hover:bg-gray-50">
                        <div className="flex justify-between">
                          <div>
                            <p className="font-medium text-gray-800">{activity.action}</p>
                            <p className="text-sm text-gray-500">By {activity.user}</p>
                          </div>
                          <p className="text-sm text-gray-500">{activity.timestamp}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}