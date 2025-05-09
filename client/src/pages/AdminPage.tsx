import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import BookThumbnailAdmin from '@/components/admin/BookThumbnailAdmin';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { 
  BookOpen, 
  Settings, 
  Image, 
  Users, 
  FileQuestion, 
  BarChart, 
  LogOut, 
  ShoppingBag, 
  Upload, 
  Loader2, 
  AlertTriangle, 
  Shield, 
  Database,
  Download,
  FolderOpen,
  RefreshCcw,
  PanelLeftOpen,
  PanelLeftClose,
  Search,
  PlusCircle,
  Cloud,
  BookText,
  FileText,
  ChevronRight,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  HelpCircle,
  Eye,
  EyeOff,
  Info
} from 'lucide-react';

// Mock user data for demonstration
const mockUsers = [
  { id: 1, username: 'teacher1', email: 'teacher1@school.edu', role: 'teacher', status: 'active', createdAt: '2023-12-01' },
  { id: 2, username: 'admin', email: 'admin@visualenglish.com', role: 'admin', status: 'active', createdAt: '2023-11-15' },
  { id: 3, username: 'teacher2', email: 'teacher2@school.edu', role: 'teacher', status: 'inactive', createdAt: '2023-12-10' },
  { id: 4, username: 'school_admin', email: 'principal@school.edu', role: 'school_admin', status: 'active', createdAt: '2023-11-20' },
  { id: 5, username: 'student1', email: 'student1@school.edu', role: 'student', status: 'active', createdAt: '2024-01-05' },
];

// Define content item types
type ContentItem = {
  type: string;
  name: string;
  path: string;
  updatedAt: string;
  size?: string;
};

// Mock content items for the content browser
const mockContentItems: ContentItem[] = [
  { type: 'folder', name: 'book1', path: 'book1/', updatedAt: '2024-01-15' },
  { type: 'folder', name: 'book2', path: 'book2/', updatedAt: '2024-01-16' },
  { type: 'folder', name: 'book3', path: 'book3/', updatedAt: '2024-01-17' },
  { type: 'folder', name: 'icons', path: 'icons/', updatedAt: '2023-12-20' },
];

// Mock sub-folder items with proper typing
const mockSubFolderItems: Record<string, ContentItem[]> = {
  'book1/': [
    { type: 'folder', name: 'unit1', path: 'book1/unit1/', updatedAt: '2024-01-15' },
    { type: 'folder', name: 'unit2', path: 'book1/unit2/', updatedAt: '2024-01-15' },
    { type: 'image', name: 'cover.png', path: 'book1/cover.png', size: '256 KB', updatedAt: '2024-01-10' },
    { type: 'image', name: 'animated.gif', path: 'book1/animated.gif', size: '1.2 MB', updatedAt: '2024-01-10' },
  ],
  'book1/unit1/': [
    { type: 'image', name: '01 I A.png', path: 'book1/unit1/01 I A.png', size: '150 KB', updatedAt: '2024-01-12' },
    { type: 'image', name: '01 I B.png', path: 'book1/unit1/01 I B.png', size: '142 KB', updatedAt: '2024-01-12' },
    { type: 'image', name: '01 I C.png', path: 'book1/unit1/01 I C.png', size: '138 KB', updatedAt: '2024-01-12' },
  ],
  'icons/': [
    { type: 'image', name: 'LOGO VISUAL ENGLISH.png', path: 'icons/LOGO VISUAL ENGLISH.png', size: '24 KB', updatedAt: '2023-12-15' },
    { type: 'image', name: 'VISUAL 1.gif', path: 'icons/VISUAL 1.gif', size: '128 KB', updatedAt: '2023-12-15' },
    { type: 'image', name: 'VISUAL 2.gif', path: 'icons/VISUAL 2.gif', size: '130 KB', updatedAt: '2023-12-15' },
  ]
};

// S3 Content Browser Component
const S3ContentBrowser = () => {
  const [currentPath, setCurrentPath] = useState('/');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentItems, setCurrentItems] = useState(mockContentItems);
  const [breadcrumbs, setBreadcrumbs] = useState<{name: string, path: string}[]>([
    {name: 'Root', path: '/'}
  ]);

  // Simulate fetching data
  useEffect(() => {
    setIsLoading(true);
    
    setTimeout(() => {
      if (currentPath === '/') {
        setCurrentItems(mockContentItems);
      } else {
        const pathKey = currentPath.replace(/^\//, ''); // Remove leading slash
        setCurrentItems(mockSubFolderItems[pathKey] || []);
      }
      setIsLoading(false);
    }, 500);
    
  }, [currentPath]);
  
  // Handle navigation to a folder
  const navigateToFolder = (path: string, name: string) => {
    // Add to breadcrumbs
    const newPath = path.startsWith('/') ? path : `/${path}`;
    
    // Update breadcrumbs
    const newBreadcrumbs = [...breadcrumbs];
    const existingIndex = newBreadcrumbs.findIndex(b => b.path === newPath);
    
    if (existingIndex >= 0) {
      // If it exists, truncate breadcrumbs to this point
      setBreadcrumbs(newBreadcrumbs.slice(0, existingIndex + 1));
    } else {
      // Add new breadcrumb
      setBreadcrumbs([...newBreadcrumbs, {name, path: newPath}]);
    }
    
    setCurrentPath(newPath);
    setSelectedItems([]);
  };
  
  // Handle file selection
  const toggleSelectItem = (path: string) => {
    setSelectedItems(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path) 
        : [...prev, path]
    );
  };
  
  // Handle breadcrumb navigation
  const handleBreadcrumbClick = (path: string, index: number) => {
    // Update breadcrumbs
    setBreadcrumbs(breadcrumbs.slice(0, index + 1));
    setCurrentPath(path);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white">
      {/* Toolbar */}
      <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setCurrentPath('/');
              setBreadcrumbs([{name: 'Root', path: '/'}]);
            }}
          >
            <BookText size={18} />
            <span className="ml-1">Root</span>
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              // Reload current folder
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 500);
            }}
          >
            <RefreshCcw size={18} />
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search files..." 
              className="pl-8 h-9 w-[180px] md:w-[300px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
          >
            {viewMode === 'list' ? 'Grid View' : 'List View'}
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              toast({
                title: 'Upload Request Received',
                description: 'The upload functionality is available through S3 directly.',
              });
            }}
          >
            <Upload size={18} />
            <span className="ml-1">Upload</span>
          </Button>
        </div>
      </div>
      
      <div className="flex">
        {/* Sidebar */}
        {!sidebarCollapsed && (
          <div className="w-64 border-r p-4 h-[70vh] overflow-y-auto">
            <h3 className="font-medium mb-2 text-sm text-gray-500 uppercase">Quick Access</h3>
            <div className="space-y-1">
              <button 
                className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-100 rounded"
                onClick={() => navigateToFolder('/', 'Root')}
              >
                <Database size={16} />
                <span>All Content</span>
              </button>
              <button 
                className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-100 rounded"
                onClick={() => navigateToFolder('/book1/', 'Book 1')}
              >
                <BookOpen size={16} />
                <span>Book 1</span>
              </button>
              <button 
                className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-100 rounded"
                onClick={() => navigateToFolder('/icons/', 'Icons')}
              >
                <Image size={16} />
                <span>Icons</span>
              </button>
            </div>
            
            <h3 className="font-medium mt-6 mb-2 text-sm text-gray-500 uppercase">Recent Uploads</h3>
            <div className="space-y-1">
              <button className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-100 rounded">
                <FileText size={16} />
                <span className="truncate">book1/unit1/01 I A.png</span>
              </button>
              <button className="w-full flex items-center space-x-2 p-2 text-sm text-left hover:bg-gray-100 rounded">
                <FileText size={16} />
                <span className="truncate">book1/animated.gif</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Main content */}
        <div className="flex-1 h-[70vh] overflow-auto">
          {/* Breadcrumb */}
          <div className="p-2 border-b bg-gray-50 flex items-center space-x-1 text-sm text-gray-600">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.path}>
                <button 
                  onClick={() => handleBreadcrumbClick(crumb.path, index)}
                  className="hover:text-blue-600"
                >
                  {crumb.name}
                </button>
                {index < breadcrumbs.length - 1 && <ChevronRight size={14} />}
              </React.Fragment>
            ))}
          </div>
          
          {/* Content List */}
          {isLoading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
            </div>
          ) : viewMode === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[30px]"></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Last Modified</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item) => (
                  <TableRow key={item.path}>
                    <TableCell>
                      <input 
                        type="checkbox"
                        checked={selectedItems.includes(item.path)}
                        onChange={() => toggleSelectItem(item.path)}
                        className="h-4 w-4"
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {item.type === 'folder' ? (
                          <FolderOpen className="h-5 w-5 text-blue-500" />
                        ) : (
                          <FileText className="h-5 w-5 text-gray-500" />
                        )}
                        <span 
                          className={item.type === 'folder' ? "text-blue-600 cursor-pointer" : ""}
                          onClick={() => item.type === 'folder' && navigateToFolder(item.path, item.name)}
                        >
                          {item.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      {item.type === 'folder' ? 'Folder' : item.name.split('.').pop()?.toUpperCase()}
                    </TableCell>
                    <TableCell>{item.type === 'folder' ? '--' : item.size}</TableCell>
                    <TableCell>{item.updatedAt}</TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {item.type !== 'folder' && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
              {currentItems.map((item) => (
                <div 
                  key={item.path}
                  className="border rounded-lg p-2 hover:bg-gray-50 cursor-pointer flex flex-col items-center"
                  onClick={item.type === 'folder' ? () => navigateToFolder(item.path, item.name) : undefined}
                >
                  {item.type === 'folder' ? (
                    <FolderOpen className="h-16 w-16 text-blue-500 mb-2" />
                  ) : item.name.endsWith('.png') || item.name.endsWith('.jpg') || item.name.endsWith('.gif') ? (
                    <div className="h-16 w-16 flex items-center justify-center mb-2">
                      <img 
                        src={`/api/direct/content/${item.path}`} 
                        alt={item.name}
                        className="max-h-16 max-w-16 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '';
                          (e.target as HTMLImageElement).style.display = 'none';
                          const parent = (e.target as HTMLImageElement).parentNode;
                          if (parent) {
                            const icon = document.createElement('div');
                            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-12 w-12 text-gray-400"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>';
                            parent.appendChild(icon);
                          }
                        }}
                      />
                    </div>
                  ) : (
                    <FileText className="h-16 w-16 text-gray-500 mb-2" />
                  )}
                  <span className="text-xs text-center truncate w-full">{item.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// User Management Component
const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [newUserDialogOpen, setNewUserDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'teacher',
    password: ''
  });

  const filteredUsers = users.filter(user => 
    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Reset form on dialog close
  useEffect(() => {
    if (!newUserDialogOpen) {
      setNewUser({
        username: '',
        email: '',
        role: 'teacher',
        password: ''
      });
    }
  }, [newUserDialogOpen]);

  const handleCreateUser = () => {
    // In a real app, this would call an API
    const newUserWithId = {
      ...newUser,
      id: Math.max(...users.map(u => u.id)) + 1,
      status: 'active',
      createdAt: new Date().toISOString().split('T')[0]
    };
    
    setUsers([...users, newUserWithId]);
    setNewUserDialogOpen(false);
    
    toast({
      title: 'User created successfully',
      description: `${newUser.username} has been added as a ${newUser.role}`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    
    toast({
      title: 'User deleted',
      description: 'The user has been removed from the system',
      variant: 'destructive',
    });
  };

  const handleStatusChange = (userId: number, newStatus: 'active' | 'inactive') => {
    setUsers(users.map(user => 
      user.id === userId ? {...user, status: newStatus} : user
    ));
    
    toast({
      title: `User ${newStatus === 'active' ? 'activated' : 'deactivated'}`,
      description: `The user's status has been updated to ${newStatus}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-72">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Dialog open={newUserDialogOpen} onOpenChange={setNewUserDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New User
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New User</DialogTitle>
              <DialogDescription>
                Add a new user to the Visual English platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input 
                  id="username" 
                  value={newUser.username}
                  onChange={e => setNewUser({...newUser, username: e.target.value})}
                  placeholder="johndoe" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email"
                  value={newUser.email}
                  onChange={e => setNewUser({...newUser, email: e.target.value})}
                  placeholder="john@example.com" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select 
                  value={newUser.role} 
                  onValueChange={value => setNewUser({...newUser, role: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="school_admin">School Admin</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={newUser.password}
                  onChange={e => setNewUser({...newUser, password: e.target.value})}
                  placeholder="••••••••" 
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setNewUserDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser}>
                Create User
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="w-[150px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map(user => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Badge 
                    variant="outline" 
                    className={
                      user.role === 'admin' ? 'bg-red-50 text-red-700 border-red-200' :
                      user.role === 'teacher' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                      user.role === 'school_admin' ? 'bg-purple-50 text-purple-700 border-purple-200' :
                      'bg-gray-50 text-gray-700 border-gray-200'
                    }
                  >
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={user.status === 'active' ? 'default' : 'secondary'}
                    className={user.status === 'active' ? 'bg-green-100 text-green-800 hover:bg-green-100' : 'bg-gray-100 text-gray-800 hover:bg-gray-100'}
                  >
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-1">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => {
                        handleStatusChange(
                          user.id, 
                          user.status === 'active' ? 'inactive' : 'active'
                        );
                      }}
                    >
                      {user.status === 'active' ? 
                        <EyeOff className="h-4 w-4" /> : 
                        <Eye className="h-4 w-4" />
                      }
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 text-red-500"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

// QA Management Component
const QAManagement = () => {
  const [selectedBook, setSelectedBook] = useState('1');
  const [selectedUnit, setSelectedUnit] = useState('all');
  const [isLoading, setIsLoading] = useState(false);
  const [qaItems, setQaItems] = useState([
    { id: 1, question: 'What is this?', answer: 'It is a pencil.', status: 'approved', imageUrl: '/api/direct/content/book1/unit1/01 I A.png' },
    { id: 2, question: 'Is this a pen?', answer: 'Yes, it is.', status: 'pending', imageUrl: '/api/direct/content/book1/unit1/01 I B.png' },
    { id: 3, question: 'What color is the pencil?', answer: 'It is yellow.', status: 'flagged', imageUrl: '/api/direct/content/book1/unit1/01 I C.png' },
  ]);
  
  const bookOptions = [
    { id: '0a', title: 'Book 0A - To The Moon' },
    { id: '0b', title: 'Book 0B - Barn In The Farm' },
    { id: '0c', title: 'Book 0C - At The Farm' },
    { id: '1', title: 'Book 1 - Vegetables' },
    { id: '2', title: 'Book 2 - Sports' },
    { id: '3', title: 'Book 3 - Bugs' },
    { id: '4', title: 'Book 4 - At The Circus' },
    { id: '5', title: 'Book 5 - Movie Time' },
    { id: '6', title: 'Book 6 - Fashion Accessories' },
    { id: '7', title: 'Book 7 - Social Problems' },
  ];
  
  const unitOptions = Array.from({ length: 20 }, (_, i) => ({
    id: `${i + 1}`,
    title: `Unit ${i + 1}`
  }));
  
  const handleApprove = (id: number) => {
    setQaItems(qaItems.map(item => 
      item.id === id ? {...item, status: 'approved'} : item
    ));
    
    toast({
      title: 'Question approved',
      description: 'The question has been marked as approved',
    });
  };
  
  const handleFlag = (id: number) => {
    setQaItems(qaItems.map(item => 
      item.id === id ? {...item, status: 'flagged'} : item
    ));
    
    toast({
      title: 'Question flagged',
      description: 'The question has been flagged for review',
      variant: 'destructive',
    });
  };
  
  const handleDelete = (id: number) => {
    setQaItems(qaItems.filter(item => item.id !== id));
    
    toast({
      title: 'Question deleted',
      description: 'The question has been removed from the system',
      variant: 'destructive',
    });
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          <Label>Select Book</Label>
          <Select value={selectedBook} onValueChange={setSelectedBook}>
            <SelectTrigger>
              <SelectValue placeholder="Select a book" />
            </SelectTrigger>
            <SelectContent>
              {bookOptions.map(book => (
                <SelectItem key={book.id} value={book.id}>{book.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3">
          <Label>Select Unit</Label>
          <Select value={selectedUnit} onValueChange={setSelectedUnit}>
            <SelectTrigger>
              <SelectValue placeholder="Select a unit" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Units</SelectItem>
              {unitOptions.map(unit => (
                <SelectItem key={unit.id} value={unit.id}>{unit.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-1/3 flex items-end">
          <Button 
            onClick={() => {
              setIsLoading(true);
              setTimeout(() => setIsLoading(false), 800);
            }}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Find Questions
              </>
            )}
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        {qaItems.map(item => (
          <Card key={item.id}>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-1/4">
                  <div className="border rounded-lg overflow-hidden h-48 flex items-center justify-center bg-gray-50">
                    <img 
                      src={item.imageUrl} 
                      alt="Question visual"
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '';
                        (e.target as HTMLImageElement).parentElement!.innerHTML = `
                          <div class="flex flex-col items-center justify-center text-gray-400">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/><line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/><line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/><line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/><line x1="17" y1="7" x2="22" y2="7"/></svg>
                            <p class="text-sm mt-2">Image not available</p>
                          </div>
                        `;
                      }}
                    />
                  </div>
                </div>
                
                <div className="w-full md:w-3/4">
                  <div className="flex items-start justify-between">
                    <div>
                      <Badge 
                        variant="outline" 
                        className={
                          item.status === 'approved' ? 'bg-green-50 text-green-700 border-green-200' :
                          item.status === 'flagged' ? 'bg-red-50 text-red-700 border-red-200' :
                          'bg-yellow-50 text-yellow-700 border-yellow-200'
                        }
                      >
                        {item.status === 'approved' && <CheckCircle className="h-3 w-3 mr-1" />}
                        {item.status === 'flagged' && <AlertTriangle className="h-3 w-3 mr-1" />}
                        {item.status === 'pending' && <HelpCircle className="h-3 w-3 mr-1" />}
                        {item.status}
                      </Badge>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleApprove(item.id)}
                        disabled={item.status === 'approved'}
                      >
                        <CheckCircle className="h-4 w-4 mr-1 text-green-600" />
                        Approve
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleFlag(item.id)}
                        disabled={item.status === 'flagged'}
                      >
                        <AlertTriangle className="h-4 w-4 mr-1 text-amber-600" />
                        Flag
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-red-600"
                        onClick={() => handleDelete(item.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-4 space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Question</h3>
                      <p className="text-lg">{item.question}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Answer</h3>
                      <p className="text-lg">{item.answer}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Last Updated</h3>
                      <p className="text-sm">2024-01-15 by admin</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// Enhanced Dashboard Stats Component
const DashboardStats = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Books</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">8</div>
            <p className="text-xs text-gray-500 mt-1">Visual English Books Series</p>
            <div className="mt-4 h-1 bg-gray-100 rounded">
              <div className="h-1 bg-blue-500 rounded" style={{ width: '100%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Total: 8</span>
              <span>Target: 8</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Content Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">2,450+</div>
            <p className="text-xs text-gray-500 mt-1">Images, videos, and resources</p>
            <div className="mt-4 h-1 bg-gray-100 rounded">
              <div className="h-1 bg-blue-500 rounded" style={{ width: '82%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Current: 2,450</span>
              <span>Target: 3,000</span>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">24</div>
            <p className="text-xs text-gray-500 mt-1">Teachers and schools</p>
            <div className="mt-4 h-1 bg-gray-100 rounded">
              <div className="h-1 bg-green-500 rounded" style={{ width: '48%' }}></div>
            </div>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <span>Current: 24</span>
              <span>Target: 50</span>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates from the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-blue-100">
                  <Upload className="h-4 w-4 text-blue-700" />
                </div>
                <div>
                  <p className="font-medium text-sm">New content uploaded</p>
                  <p className="text-xs text-gray-500">50 new images added to Book 1, Unit 3</p>
                  <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-green-100">
                  <Users className="h-4 w-4 text-green-700" />
                </div>
                <div>
                  <p className="font-medium text-sm">New teacher registered</p>
                  <p className="text-xs text-gray-500">John Smith joined the platform</p>
                  <p className="text-xs text-gray-400 mt-1">5 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="p-1.5 rounded-full bg-amber-100">
                  <FileQuestion className="h-4 w-4 text-amber-700" />
                </div>
                <div>
                  <p className="font-medium text-sm">Question flagged</p>
                  <p className="text-xs text-gray-500">3 questions flagged in Book 2</p>
                  <p className="text-xs text-gray-400 mt-1">Yesterday</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Platform performance metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">S3 Storage</Label>
                  <span className="text-xs text-gray-500">76% Used</span>
                </div>
                <div className="h-2 bg-gray-100 rounded">
                  <div className="h-2 bg-blue-500 rounded" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">Database</Label>
                  <span className="text-xs text-gray-500">32% Used</span>
                </div>
                <div className="h-2 bg-gray-100 rounded">
                  <div className="h-2 bg-green-500 rounded" style={{ width: '32%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <Label className="text-xs">API Requests (24h)</Label>
                  <span className="text-xs text-gray-500">5,234 requests</span>
                </div>
                <div className="h-2 bg-gray-100 rounded">
                  <div className="h-2 bg-amber-500 rounded" style={{ width: '52%' }}></div>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <Card className="w-1/2">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium">Uptime</p>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        100%
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="w-1/2">
                  <CardContent className="p-3">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-medium">Response Time</p>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        142ms
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Main AdminPage Component
const AdminPage = () => {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Query for admin dashboard data
  const { 
    data: adminData,
    isLoading: isLoadingAdminData,
    error: adminDataError,
  } = useQuery({
    queryKey: ['/api/admin-data'],
    // The endpoint is already set up in mock-auth.ts
  });

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Admin sidebar navigation */}
        <div className={`${sidebarCollapsed ? 'w-20' : 'w-64'} bg-white shadow-sm p-6 flex flex-col h-screen sticky top-0 transition-all duration-200`}>
          <div className="mb-8 flex items-center justify-between">
            {!sidebarCollapsed && (
              <>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Admin Portal</h2>
                  <p className="text-sm text-gray-500">Visual English</p>
                </div>
                <button 
                  onClick={() => setSidebarCollapsed(true)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <PanelLeftClose size={20} />
                </button>
              </>
            )}
            {sidebarCollapsed && (
              <>
                <Shield className="h-8 w-8 text-blue-600 mx-auto" />
                <button 
                  onClick={() => setSidebarCollapsed(false)}
                  className="text-gray-400 hover:text-gray-600 absolute right-2 top-2"
                >
                  <PanelLeftOpen size={20} />
                </button>
              </>
            )}
          </div>
          
          {!sidebarCollapsed && (
            <div className="mb-6 pb-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium">{user?.username}</p>
                  <p className="text-xs text-gray-500">{user?.role || 'Admin'}</p>
                </div>
              </div>
            </div>
          )}
          
          <nav className="flex-1 space-y-1">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Dashboard' : ''}
            >
              <BarChart className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Dashboard</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('thumbnails')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'thumbnails' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Book Thumbnails' : ''}
            >
              <Image className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Book Thumbnails</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('preview')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'preview' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Book Preview' : ''}
            >
              <BookOpen className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Book Preview</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('questions')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'questions' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Q&A Management' : ''}
            >
              <FileQuestion className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Q&A Management</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('s3browser')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 's3browser' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Content Browser' : ''}
            >
              <Cloud className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Content Browser</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'User Management' : ''}
            >
              <Users className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">User Management</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('shop')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'shop' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Shop Settings' : ''}
            >
              <ShoppingBag className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Shop Settings</span>}
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left ${
                activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
              title={sidebarCollapsed ? 'Site Settings' : ''}
            >
              <Settings className="h-5 w-5" />
              {!sidebarCollapsed && <span className="text-sm">Site Settings</span>}
            </button>
          </nav>
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className={`w-full flex ${sidebarCollapsed ? 'justify-center' : 'items-center space-x-3'} p-2 rounded-md text-left text-gray-700 hover:bg-gray-50`}
              title={sidebarCollapsed ? 'Logout' : ''}
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              {!sidebarCollapsed && <span className="text-sm">Logout</span>}
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className={`flex-1 p-8 ${sidebarCollapsed ? 'ml-20' : 'ml-64'} transition-all duration-200`}>
          <div className="max-w-6xl mx-auto">
            {/* Dashboard overview */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">
                {activeTab === 'dashboard' && 'Dashboard Overview'}
                {activeTab === 'thumbnails' && 'Book Thumbnail Management'}
                {activeTab === 'preview' && 'Book Preview'}
                {activeTab === 'questions' && 'Q&A Management'}
                {activeTab === 's3browser' && 'Content Browser'}
                {activeTab === 'users' && 'User Management'}
                {activeTab === 'shop' && 'Shop Settings'}
                {activeTab === 'settings' && 'Site Settings'}
              </h1>
              <p className="text-gray-600">
                {activeTab === 'dashboard' && `Welcome back, ${user?.fullName || user?.username || 'Admin'}.`}
                {activeTab === 'thumbnails' && 'Upload and manage book cover images and animations.'}
                {activeTab === 'preview' && 'Preview how book thumbnails appear on the website.'}
                {activeTab === 'questions' && 'Manage question-answer pairs for educational content.'}
                {activeTab === 's3browser' && 'Browse and manage content stored in Amazon S3.'}
                {activeTab === 'users' && 'Manage user accounts, permissions, and access.'}
                {activeTab === 'shop' && 'Configure product listings and subscription plans.'}
                {activeTab === 'settings' && 'Manage global website settings and configurations.'}
              </p>
            </div>
            
            {/* Main content tabs */}
            <div className="w-full">
              {activeTab === 'dashboard' && <DashboardStats />}
              
              {activeTab === 'thumbnails' && <BookThumbnailAdmin />}
              
              {activeTab === 'preview' && (
                <Card className="p-6">
                  <CardContent>
                    <div className="flex items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
                      <div className="text-center">
                        <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium mb-2">Book Preview</h3>
                        <p className="text-sm text-gray-500 mb-4">
                          Book animation carousel has been replaced with a static grid layout 
                          showing all books at once for better visibility.
                        </p>
                        <Button onClick={() => window.open('/', '_blank')}>
                          View Homepage
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === 'questions' && <QAManagement />}
              
              {activeTab === 's3browser' && <S3ContentBrowser />}
              
              {activeTab === 'users' && <UserManagement />}
              
              {activeTab === 'shop' && (
                <div className="mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Shop Configuration</CardTitle>
                      <CardDescription>
                        Manage product listings, pricing, and subscription plans.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 p-4 bg-blue-50 text-blue-800 rounded-lg mb-6">
                        <Info className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">
                          The shop settings panel is currently under development. Basic functionality is 
                          available, but some advanced features are coming soon.
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Subscription Plans</h3>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">Single Lesson Access</h4>
                                    <p className="text-sm text-gray-500">Monthly: €5 / Yearly: €40</p>
                                  </div>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">Full Book Access</h4>
                                    <p className="text-sm text-gray-500">Monthly: €25 / Yearly: €200</p>
                                  </div>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Button className="w-full">
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add New Plan
                            </Button>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">Physical Products</h3>
                          
                          <div className="space-y-4">
                            <Card>
                              <CardContent className="p-4">
                                <div className="flex justify-between">
                                  <div>
                                    <h4 className="font-medium">Printed Book</h4>
                                    <p className="text-sm text-gray-500">€20 + €20 (DPD delivery)</p>
                                  </div>
                                  <Button variant="outline" size="sm">Edit</Button>
                                </div>
                              </CardContent>
                            </Card>
                            
                            <Button className="w-full">
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add New Product
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === 'settings' && (
                <div className="mb-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Site Settings</CardTitle>
                      <CardDescription>
                        Configure global website settings including homepage layout and content visibility.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center space-x-2 p-4 bg-blue-50 text-blue-800 rounded-lg mb-6">
                        <Info className="h-5 w-5 flex-shrink-0" />
                        <p className="text-sm">
                          The settings panel is currently under development. Basic functionality is 
                          available, but some advanced features are coming soon.
                        </p>
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <h3 className="text-lg font-medium mb-4">Content Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">Preview Image Count</h4>
                                <p className="text-sm text-gray-500">
                                  Number of free images shown before blurring content
                                </p>
                              </div>
                              <div className="w-32">
                                <Input type="number" defaultValue="10" />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">Blur Videos</h4>
                                <p className="text-sm text-gray-500">
                                  Blur all videos for non-authenticated users
                                </p>
                              </div>
                              <div>
                                <Button variant="outline">Enabled</Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">Free Trial Downloads</h4>
                                <p className="text-sm text-gray-500">
                                  Number of downloads allowed during free trial
                                </p>
                              </div>
                              <div className="w-32">
                                <Input type="number" defaultValue="3" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-4">System Settings</h3>
                          
                          <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">Maintenance Mode</h4>
                                <p className="text-sm text-gray-500">
                                  Put the site in maintenance mode
                                </p>
                              </div>
                              <div>
                                <Button variant="outline">Disabled</Button>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                              <div>
                                <h4 className="font-medium">Clear Cache</h4>
                                <p className="text-sm text-gray-500">
                                  Clear all cached content
                                </p>
                              </div>
                              <div>
                                <Button variant="outline">Clear Now</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex justify-end space-x-2">
                          <Button variant="outline">Reset to Defaults</Button>
                          <Button>Save Changes</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;