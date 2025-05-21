import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import {
  Users,
  Book,
  BookOpen,
  LogOut,
  CheckSquare,
  MessageSquare,
  User,
  GraduationCap,
  FileText,
  BarChart3,
  Settings,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

// Types
interface StudentClass {
  id: number;
  name: string;
  studentsCount: number;
  recentActivity?: string;
}

interface UpcomingClass {
  id: number;
  className: string;
  date: string;
  time: string;
  bookId: string;
  unitId: string;
}

export default function TeacherDashboardPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Sample data for teacher dashboard
  const [classes, setClasses] = useState<StudentClass[]>([
    { id: 1, name: 'English Beginners A', studentsCount: 12, recentActivity: '2 days ago' },
    { id: 2, name: 'English Intermediate B', studentsCount: 8, recentActivity: '1 day ago' },
    { id: 3, name: 'English Advanced C', studentsCount: 6, recentActivity: '4 hours ago' }
  ]);
  
  const [upcomingClasses, setUpcomingClasses] = useState<UpcomingClass[]>([
    { id: 1, className: 'English Beginners A', date: 'Today', time: '14:30', bookId: '1', unitId: '3' },
    { id: 2, className: 'English Intermediate B', date: 'Tomorrow', time: '10:15', bookId: '2', unitId: '5' },
    { id: 3, className: 'English Advanced C', date: 'May 22', time: '15:45', bookId: '3', unitId: '7' }
  ]);
  
  const [recentResources, setRecentResources] = useState([
    { id: 1, title: 'Colors Vocabulary Game', type: 'game', bookId: '1', unitId: '6' },
    { id: 2, title: 'Months and Seasons Song', type: 'video', bookId: '2', unitId: '10' },
    { id: 3, title: 'My Town - Lesson Plan', type: 'pdf', bookId: '3', unitId: '14' }
  ]);
  
  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const userData = localStorage.getItem('user');
      if (!userData) {
        navigate('/teacher-login');
        return;
      }
      
      try {
        const user = JSON.parse(userData);
        if (user.role !== 'teacher') {
          navigate('/teacher-login');
          return;
        }
        
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        navigate('/teacher-login');
      }
    };
    
    checkAuth();
  }, [navigate]);
  
  // Handle logout
  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('user');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
    
    // Redirect to login
    navigate('/teacher-login');
  };
  
  // Navigate to resource management
  const navigateToResources = () => {
    navigate('/teacher/resources');
  };
  
  // Navigate to student management
  const navigateToStudents = () => {
    navigate('/teacher/students');
  };
  
  // Navigate to assessment tools
  const navigateToAssessments = () => {
    navigate('/teacher/assessments');
  };
  
  // Navigate to messaging center
  const navigateToMessages = () => {
    navigate('/teacher/messages');
  };
  
  // Navigate to profile settings
  const navigateToSettings = () => {
    navigate('/teacher/settings');
  };
  
  // If not authenticated, show loading state (will redirect via useEffect)
  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-blue-300 rounded-full mb-4"></div>
          <div className="h-4 bg-blue-300 rounded w-32 mb-2"></div>
          <div className="h-3 bg-blue-300 rounded w-40"></div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Logo / Title */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <Book className="h-8 w-8 text-blue-600" />
                <span className="ml-2 font-bold text-xl">Visual English</span>
              </div>
              <div className="ml-6 flex space-x-4">
                <Badge variant="outline" className="border-blue-200 text-blue-600">Teacher Portal</Badge>
              </div>
            </div>
            
            {/* User info and logout */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="flex items-center space-x-3">
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-medium text-gray-700">
                      {JSON.parse(localStorage.getItem('user') || '{}').fullName || 'Teacher'}
                    </span>
                    <span className="text-xs text-gray-500">
                      Teacher Account
                    </span>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                    <GraduationCap className="h-4 w-4" />
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
            <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage your classes, resources, and students</p>
          </div>
          

          
          {/* Main Dashboard Tabs */}
          <Tabs defaultValue="books" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="books">My Books</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="classes">My Classes</TabsTrigger>
            </TabsList>
            
            {/* Books Tab */}
            <TabsContent value="books" className="space-y-8">
              {/* My Books Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">My Teaching Materials</h2>
              </div>
              


              {/* Purchased Books & Progress */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Purchased Books & Progress</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Book 1 - Full Access */}
                  <Card className="overflow-hidden border border-gray-200">
                    <div className="h-3 bg-yellow-400"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Book 1</span>
                        <Badge className="bg-green-600">Full Access</Badge>
                      </CardTitle>
                      <CardDescription>Book 1</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress: 72%</span>
                          <span className="text-sm text-gray-500">13/18 units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Link href="/teacher/book/1">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View Book
                          </button>
                        </Link>
                        <Link href="/teacher/book/1/resources">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Resources
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Book 2 - Full Access */}
                  <Card className="overflow-hidden border border-gray-200">
                    <div className="h-3 bg-purple-600"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Book 2</span>
                        <Badge className="bg-green-600">Full Access</Badge>
                      </CardTitle>
                      <CardDescription>Book 2</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress: 44%</span>
                          <span className="text-sm text-gray-500">8/18 units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '44%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Link href="/teacher/book/2">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View Book
                          </button>
                        </Link>
                        <Link href="/teacher/book/2/resources">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            Resources
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {/* Book 4 - Limited Access */}
                  <Card className="overflow-hidden border border-gray-200 border-dashed">
                    <div className="h-3 bg-blue-500"></div>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>Book 4</span>
                        <Badge variant="outline" className="border-amber-500 text-amber-600">Units 1-5 only</Badge>
                      </CardTitle>
                      <CardDescription>Book 4</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-2">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Progress: 80%</span>
                          <span className="text-sm text-gray-500">4/5 units</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                        </div>
                      </div>
                      <div className="flex justify-between mt-4">
                        <Link href="/teacher/book/4">
                          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                            View Book
                          </button>
                        </Link>
                        <Link href="/checkout">
                          <button className="text-sm text-amber-600 hover:text-amber-800 font-medium">
                            Upgrade
                          </button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              

            </TabsContent>
            
            {/* Classes Tab */}
            <TabsContent value="classes">
              <Card>
                <CardHeader>
                  <CardTitle>My Classes</CardTitle>
                  <CardDescription>
                    Manage your teaching classes and track progress
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Class 1 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">English Beginners A</h4>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            <div><span className="font-medium">Location:</span> Room 101, Main Building</div>
                            <div><span className="font-medium">Time:</span> Mondays, 14:30-15:30</div>
                            <div><span className="font-medium">Students:</span> 12</div>
                            <div><span className="font-medium">Current:</span> Book 1, Unit 13 (Colors)</div>
                            <div><span className="font-medium">Last lesson:</span> Stopped at slide 15 - Color identification</div>
                          </div>
                        </div>
                        <Badge className="bg-yellow-400 text-black h-fit">Book 1</Badge>
                      </div>
                    </div>
                    
                    {/* Class 2 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">English Intermediate B</h4>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            <div><span className="font-medium">Location:</span> Room 203, Language Center</div>
                            <div><span className="font-medium">Time:</span> Wednesdays, 10:15-11:30</div>
                            <div><span className="font-medium">Students:</span> 8</div>
                            <div><span className="font-medium">Current:</span> Book 2, Unit 8 (Shopping)</div>
                            <div><span className="font-medium">Last lesson:</span> Stopped at slide 23 - Price expressions</div>
                          </div>
                        </div>
                        <Badge className="bg-purple-600 h-fit">Book 2</Badge>
                      </div>
                    </div>
                    
                    {/* Class 3 */}
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="font-medium">English Advanced C</h4>
                          <div className="text-sm text-gray-500 mt-1 space-y-1">
                            <div><span className="font-medium">Location:</span> Room 315, Online (Zoom)</div>
                            <div><span className="font-medium">Time:</span> Fridays, 15:45-17:00</div>
                            <div><span className="font-medium">Students:</span> 6</div>
                            <div><span className="font-medium">Current:</span> Book 4, Unit 3 (Home Sweet Home)</div>
                            <div><span className="font-medium">Last lesson:</span> Stopped at slide 18 - Types of houses</div>
                          </div>
                        </div>
                        <Badge className="bg-blue-500 h-fit">Book 4</Badge>
                      </div>
                    </div>
                    
                    {/* Add new class button */}
                    <div className="mt-4">
                      <Button onClick={() => {
                        toast({
                          title: "Create New Class",
                          description: "The class creation feature will be available soon.",
                        });
                      }}>
                        <Users className="mr-2 h-4 w-4" />
                        Create New Class
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Resources Tab */}
            <TabsContent value="resources">
              <Card>
                <CardHeader>
                  <CardTitle>Teaching Resources</CardTitle>
                  <CardDescription>
                    Access lesson plans, activities, and educational materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Videos</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <BookOpen className="h-8 w-8 text-blue-600 mr-3" />
                          <span>Educational videos for classroom use</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Games</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <CheckSquare className="h-8 w-8 text-blue-600 mr-3" />
                          <span>Interactive learning activities</span>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card className="hover:shadow-md transition-shadow cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">PDFs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center">
                          <FileText className="h-8 w-8 text-blue-600 mr-3" />
                          <span>Lesson plans and printable materials</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            

          </Tabs>
        </div>
      </div>
    </div>
  );
}