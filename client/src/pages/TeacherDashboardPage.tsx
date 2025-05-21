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
  Calendar,
  X,
  Trash2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
  
  // New class dialog state
  const [isCreateClassDialogOpen, setIsCreateClassDialogOpen] = useState(false);
  const [newClassName, setNewClassName] = useState('');
  const [newClassLocation, setNewClassLocation] = useState('');
  const [newClassTime, setNewClassTime] = useState('');
  const [selectedBook, setSelectedBook] = useState('');
  
  // Confirmation dialog state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [classToDelete, setClassToDelete] = useState<number | null>(null);
  
  // Book filtering state
  const [bookFilterType, setBookFilterType] = useState('all'); // all, full-access, limited-access
  
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
  
  // Handle creating a new class
  const handleCreateClass = () => {
    if (!newClassName || !newClassLocation || !newClassTime || !selectedBook) {
      toast({
        title: "Missing information",
        description: "Please fill in all the required fields",
        variant: "destructive"
      });
      return;
    }
    
    // Create a new class with the form data
    const newClass: StudentClass = {
      id: classes.length + 1,
      name: newClassName,
      studentsCount: 0,
      recentActivity: 'Just created'
    };
    
    setClasses([...classes, newClass]);
    
    // Reset form and close dialog
    setNewClassName('');
    setNewClassLocation('');
    setNewClassTime('');
    setSelectedBook('');
    setIsCreateClassDialogOpen(false);
    
    toast({
      title: "Class created",
      description: `Successfully created class "${newClassName}"`,
    });
  };
  
  // Handle deleting a class
  const handleDeleteClass = (id: number) => {
    setClassToDelete(id);
    setIsDeleteDialogOpen(true);
  };
  
  // Confirm class deletion
  const confirmDeleteClass = () => {
    if (classToDelete === null) return;
    
    setClasses(classes.filter(cls => cls.id !== classToDelete));
    setIsDeleteDialogOpen(false);
    setClassToDelete(null);
    
    toast({
      title: "Class deleted",
      description: "The class has been removed from your dashboard",
    });
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
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="books">My Books</TabsTrigger>
              <TabsTrigger value="classes">My Classes</TabsTrigger>
            </TabsList>
            
            {/* Books Tab */}
            <TabsContent value="books" className="space-y-8">
              {/* My Books Section */}
              <div>
                <h2 className="text-xl font-semibold mb-4">My Teaching Materials</h2>
              </div>
              
              {/* Quick Access Section */}
              <div className="bg-blue-50 rounded-lg p-4 mb-6 border border-blue-100">
                <h3 className="font-medium text-blue-700 mb-3">Quick Access</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Link href="/teacher/book/1/unit/13/viewer">
                    <div className="bg-white rounded-md p-3 border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer flex flex-col">
                      <div className="text-sm font-medium">Book 1</div>
                      <div className="text-xs text-gray-500">Unit 13: Colors</div>
                      <Badge className="mt-2 bg-yellow-400 text-black h-fit w-fit">Recent</Badge>
                    </div>
                  </Link>
                  <Link href="/teacher/book/2/unit/8/viewer">
                    <div className="bg-white rounded-md p-3 border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer flex flex-col">
                      <div className="text-sm font-medium">Book 2</div>
                      <div className="text-xs text-gray-500">Unit 8: Shopping</div>
                      <Badge className="mt-2 bg-purple-600 h-fit w-fit">Recent</Badge>
                    </div>
                  </Link>
                  <Link href="/teacher/book/4/unit/3/viewer">
                    <div className="bg-white rounded-md p-3 border border-blue-100 hover:border-blue-300 transition-colors cursor-pointer flex flex-col">
                      <div className="text-sm font-medium">Book 4</div>
                      <div className="text-xs text-gray-500">Unit 3: Home Sweet Home</div>
                      <Badge className="mt-2 bg-blue-500 h-fit w-fit">Recent</Badge>
                    </div>
                  </Link>
                  <div className="bg-white rounded-md p-3 border border-dashed border-blue-200 hover:border-blue-300 transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <span className="text-sm text-blue-600">+ Add Favorite</span>
                  </div>
                </div>
              </div>


              {/* Purchased Books & Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Purchased Books & Progress</h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Filter:</span>
                    <div className="flex border rounded-md overflow-hidden">
                      <button 
                        className={`px-3 py-1 text-xs font-medium ${bookFilterType === 'all' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}`}
                        onClick={() => setBookFilterType('all')}
                      >
                        All
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs font-medium border-l ${bookFilterType === 'full-access' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}`}
                        onClick={() => setBookFilterType('full-access')}
                      >
                        Full Access
                      </button>
                      <button 
                        className={`px-3 py-1 text-xs font-medium border-l ${bookFilterType === 'limited-access' ? 'bg-blue-100 text-blue-800' : 'bg-white text-gray-600'}`}
                        onClick={() => setBookFilterType('limited-access')}
                      >
                        Limited Access
                      </button>
                    </div>
                  </div>
                </div>
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
                      <div className="mt-4">
                        <div className="flex justify-between mb-3">
                          <Link href="/teacher/book/1">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              View Book
                            </button>
                          </Link>
                          <Link href="/teacher/book/1/viewer">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              View Content
                            </button>
                          </Link>
                        </div>
                        
                        {/* Unit Explorer */}
                        <div className="mt-2 border-t pt-2">
                          <div className="text-xs font-medium text-gray-500 mb-2">Jump to Unit:</div>
                          <div className="grid grid-cols-3 gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((unitNumber) => (
                              <Link key={unitNumber} href={`/teacher/book/1/unit/${unitNumber}/viewer`}>
                                <div className={`text-center text-xs p-1 rounded cursor-pointer
                                  ${unitNumber <= 13 ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                  {unitNumber}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
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
                      <div className="mt-4">
                        <div className="flex justify-between mb-3">
                          <Link href="/teacher/book/2">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              View Book
                            </button>
                          </Link>
                          <Link href="/teacher/book/2/viewer">
                            <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                              View Content
                            </button>
                          </Link>
                        </div>
                        
                        {/* Unit Explorer */}
                        <div className="mt-2 border-t pt-2">
                          <div className="text-xs font-medium text-gray-500 mb-2">Jump to Unit:</div>
                          <div className="grid grid-cols-3 gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].map((unitNumber) => (
                              <Link key={unitNumber} href={`/teacher/book/2/unit/${unitNumber}/viewer`}>
                                <div className={`text-center text-xs p-1 rounded cursor-pointer
                                  ${unitNumber <= 8 ? 'bg-purple-100 text-purple-800 hover:bg-purple-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                                  {unitNumber}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
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
                      <div className="mt-4">
                        <div className="flex justify-between mb-3">
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
                        
                        {/* Unit Explorer - Limited Access */}
                        <div className="mt-2 border-t pt-2">
                          <div className="text-xs font-medium text-gray-500 mb-2">Jump to Unit:</div>
                          <div className="grid grid-cols-3 gap-1">
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((unitNumber) => (
                              <Link key={unitNumber} href={unitNumber <= 5 ? `/teacher/book/4/unit/${unitNumber}/viewer` : '/checkout'}>
                                <div className={`text-center text-xs p-1 rounded cursor-pointer
                                  ${unitNumber <= 5 ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : 'bg-gray-100 text-gray-400 border border-dashed border-gray-300'}`}>
                                  {unitNumber <= 5 ? unitNumber : <span>🔒</span>}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
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
                    {/* Display the list of classes */}
                    {classes.map(cls => (
                      <div key={cls.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between">
                          <div>
                            <div className="flex items-center">
                              <h4 className="font-medium">{cls.name}</h4>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 ml-2 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteClass(cls.id);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="text-sm text-gray-500 mt-1 space-y-1">
                              {cls.id === 1 && (
                                <>
                                  <div><span className="font-medium">Location:</span> Room 101, Main Building</div>
                                  <div><span className="font-medium">Time:</span> Mondays, 14:30-15:30</div>
                                  <div><span className="font-medium">Students:</span> {cls.studentsCount}</div>
                                  <div><span className="font-medium">Current:</span> Book 1, Unit 13 (Colors)</div>
                                  <div><span className="font-medium">Last lesson:</span> Stopped at slide 15 - Color identification</div>
                                  <div className="mt-2">
                                    <Link href="/teacher/book/1/unit/13/viewer?slide=15">
                                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 w-full">
                                        Resume Class
                                      </Button>
                                    </Link>
                                  </div>
                                </>
                              )}
                              {cls.id === 2 && (
                                <>
                                  <div><span className="font-medium">Location:</span> Room 203, Language Center</div>
                                  <div><span className="font-medium">Time:</span> Wednesdays, 10:15-11:30</div>
                                  <div><span className="font-medium">Students:</span> {cls.studentsCount}</div>
                                  <div><span className="font-medium">Current:</span> Book 2, Unit 8 (Shopping)</div>
                                  <div><span className="font-medium">Last lesson:</span> Stopped at slide 23 - Price expressions</div>
                                  <div className="mt-2">
                                    <Link href="/teacher/book/2/unit/8/viewer?slide=23">
                                      <Button size="sm" className="bg-purple-600 hover:bg-purple-700 w-full">
                                        Resume Class
                                      </Button>
                                    </Link>
                                  </div>
                                </>
                              )}
                              {cls.id === 3 && (
                                <>
                                  <div><span className="font-medium">Location:</span> Room 315, Online (Zoom)</div>
                                  <div><span className="font-medium">Time:</span> Fridays, 15:45-17:00</div>
                                  <div><span className="font-medium">Students:</span> {cls.studentsCount}</div>
                                  <div><span className="font-medium">Current:</span> Book 4, Unit 3 (Home Sweet Home)</div>
                                  <div><span className="font-medium">Last lesson:</span> Stopped at slide 18 - Types of houses</div>
                                  <div className="mt-2">
                                    <Link href="/teacher/book/4/unit/3/viewer?slide=18">
                                      <Button size="sm" className="bg-blue-500 hover:bg-blue-600 w-full">
                                        Resume Class
                                      </Button>
                                    </Link>
                                  </div>
                                </>
                              )}
                              {cls.id > 3 && (
                                <>
                                  <div><span className="font-medium">Location:</span> {newClassLocation || "Not assigned"}</div>
                                  <div><span className="font-medium">Time:</span> {newClassTime || "Not scheduled"}</div>
                                  <div><span className="font-medium">Students:</span> {cls.studentsCount}</div>
                                  <div><span className="font-medium">Current:</span> Book {selectedBook || "Not assigned"}, Unit 1</div>
                                  <div><span className="font-medium">Last lesson:</span> Starting new class</div>
                                </>
                              )}
                            </div>
                          </div>
                          <Badge className={`h-fit ${cls.id === 1 ? 'bg-yellow-400 text-black' : cls.id === 2 ? 'bg-purple-600' : 'bg-blue-500'}`}>
                            {cls.id === 1 ? 'Book 1' : cls.id === 2 ? 'Book 2' : cls.id === 3 ? 'Book 4' : `Book ${selectedBook || '?'}`}
                          </Badge>
                        </div>
                      </div>
                    ))}
                    
                    {/* Add new class button */}
                    <div className="mt-4">
                      <Button onClick={() => setIsCreateClassDialogOpen(true)}>
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
          
          {/* Delete Class Confirmation Dialog */}
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Delete Class</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this class? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={confirmDeleteClass}>
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          {/* Create Class Dialog */}
          <Dialog open={isCreateClassDialogOpen} onOpenChange={setIsCreateClassDialogOpen}>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Class</DialogTitle>
                <DialogDescription>
                  Enter the details for your new class
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="className" className="text-right">
                    Class Name
                  </Label>
                  <Input
                    id="className"
                    value={newClassName}
                    onChange={(e) => setNewClassName(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., English Beginners A"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location" className="text-right">
                    Location
                  </Label>
                  <Input
                    id="location"
                    value={newClassLocation}
                    onChange={(e) => setNewClassLocation(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., Room 101, Main Building"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    value={newClassTime}
                    onChange={(e) => setNewClassTime(e.target.value)}
                    className="col-span-3"
                    placeholder="e.g., Mondays, 14:30-15:30"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="book" className="text-right">
                    Book
                  </Label>
                  <Select value={selectedBook} onValueChange={setSelectedBook}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a book" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Book 1</SelectItem>
                      <SelectItem value="2">Book 2</SelectItem>
                      <SelectItem value="3">Book 3</SelectItem>
                      <SelectItem value="4">Book 4</SelectItem>
                      <SelectItem value="5">Book 5</SelectItem>
                      <SelectItem value="6">Book 6</SelectItem>
                      <SelectItem value="7">Book 7</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateClassDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateClass}>Create Class</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}