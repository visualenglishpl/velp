import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import BookThumbnailAdmin from '@/components/admin/BookThumbnailAdmin';
import { useAuth } from '@/hooks/use-auth';
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
  Shield 
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';

const AdminPage = () => {
  const { user, logoutMutation } = useAuth();
  const [activeTab, setActiveTab] = useState('thumbnails');
  
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
        <div className="w-64 bg-white shadow-sm p-6 flex flex-col h-screen sticky top-0">
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">Admin Portal</h2>
            <p className="text-sm text-gray-500">Visual English Platform</p>
          </div>
          
          <div className="mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium">{user?.username}</p>
                <p className="text-xs text-gray-500">{user?.role}</p>
              </div>
            </div>
          </div>
          
          <nav className="flex-1 space-y-1">
            <button 
              onClick={() => setActiveTab('thumbnails')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'thumbnails' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Image className="h-5 w-5" />
              <span className="text-sm">Book Thumbnails</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('preview')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'preview' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <BookOpen className="h-5 w-5" />
              <span className="text-sm">Animation Preview</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('content')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'content' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <FileQuestion className="h-5 w-5" />
              <span className="text-sm">Content Management</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'users' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Users className="h-5 w-5" />
              <span className="text-sm">User Management</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('shop')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'shop' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="text-sm">Shop Settings</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center space-x-3 p-2 rounded-md text-left ${
                activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Settings className="h-5 w-5" />
              <span className="text-sm">Site Settings</span>
            </button>
          </nav>
          
          <div className="pt-4 mt-4 border-t border-gray-100">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 p-2 rounded-md text-left text-gray-700 hover:bg-gray-50"
              disabled={logoutMutation.isPending}
            >
              {logoutMutation.isPending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <LogOut className="h-5 w-5" />
              )}
              <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-8">
          <div className="max-w-6xl mx-auto">
            {/* Dashboard overview */}
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-2">Dashboard</h1>
              <p className="text-gray-600">Welcome back, {user?.fullName || user?.username}.</p>
            </div>
            
            {/* Admin stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Total Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">8</div>
                  <p className="text-xs text-gray-500 mt-1">Visual English Books Series</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Content Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">2,450+</div>
                  <p className="text-xs text-gray-500 mt-1">Images, videos, and resources</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">Active Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">24</div>
                  <p className="text-xs text-gray-500 mt-1">Teachers and schools</p>
                </CardContent>
              </Card>
            </div>
            
            {/* Main content tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="thumbnails">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Book Thumbnail Management</h2>
                  <p className="text-gray-600 mb-6">
                    Upload and manage book cover images and animated GIFs for the books carousel and unit pages.
                    Use PNG files for static cover images and GIF files for animations.
                  </p>
                  <BookThumbnailAdmin />
                </div>
              </TabsContent>
              
              <TabsContent value="preview">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Book Preview</h2>
                  <p className="text-gray-600 mb-6">
                    Preview how the book thumbnails appear on the website's homepage.
                    You can upload new thumbnails in the Book Thumbnail Management section.
                  </p>
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
                </div>
              </TabsContent>
              
              <TabsContent value="content">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Content Management</h2>
                  <p className="text-gray-600 mb-6">
                    Manage educational content including Q&A pairs, images, videos, and other resources.
                  </p>
                  
                  {isLoadingAdminData ? (
                    <div className="space-y-4">
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                      <Skeleton className="h-12 w-full" />
                    </div>
                  ) : adminDataError ? (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded mb-6">
                      <div className="flex items-center">
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
                        <p className="text-red-700">Failed to load content management data</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Flagged Questions</CardTitle>
                          <CardDescription>Review questions that need approval or correction</CardDescription>
                        </CardHeader>
                        <CardContent>
                          {adminData?.flaggedQuestions?.map((question, i) => (
                            <div key={i} className="py-3 border-b border-gray-100 last:border-0">
                              <div className="flex justify-between mb-1">
                                <span className="font-medium">{question.question}</span>
                                <Badge variant={question.status === 'pending' ? 'outline' : 'default'}>
                                  {question.status}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </CardContent>
                        <CardFooter>
                          <Button variant="outline" className="w-full">View All Flagged Questions</Button>
                        </CardFooter>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Upload Content</CardTitle>
                          <CardDescription>Upload new content items to the platform</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Drag and drop files here or click to browse</p>
                            <Button variant="outline" className="mt-4">Browse Files</Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">User Management</h2>
                  <p className="text-gray-600 mb-6">
                    Manage user accounts, permissions, and subscriptions.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700">
                      User management features are currently under development. Please check back later.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="shop">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Shop Settings</h2>
                  <p className="text-gray-600 mb-6">
                    Manage product listings, pricing, and subscription plans.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700">
                      Shop management features are currently under development. Please check back later.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="settings">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
                  <p className="text-gray-600 mb-6">
                    Configure global website settings including homepage layout, feature flags, and content visibility.
                  </p>
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700">
                      Site settings panel is currently under development. Please check back later.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;