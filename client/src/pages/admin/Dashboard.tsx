import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FileText, Users, School, BookOpen, Settings, LogOut, ShoppingBag, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const AdminDashboard = () => {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  console.log("Admin Dashboard rendering, user:", user);

  // User auth check moved to useEffect to prevent constant redirects
  useEffect(() => {
    if (!user && !logoutMutation.isPending) {
      console.log("No user found on dashboard, redirecting to auth page");
      navigate("/auth");
    } else if (user && user.role !== "admin") {
      console.log("Non-admin user on admin dashboard, redirecting to home page");
      navigate("/");
    } else {
      console.log("Admin user authenticated, displaying dashboard");
    }
  }, [user, navigate, logoutMutation.isPending]);

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };

  const navigateToBooksAndContent = () => {
    navigate("/admin/books");
  };
  
  const navigateToShopManagement = () => {
    navigate("/admin/shop");
  };
  
  const navigateToContentOrganizer = () => {
    navigate("/admin/content-organizer?bookId=1&unitNumber=1");
  };

  return (
    <div className="min-h-screen bg-white">

      {/* Main Content */}
      <div className="py-10">
        {/* Main Content Area */}
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-2">Welcome, Admin</h2>
          <p className="text-gray-600 mb-8">Manage all aspects of the Visual English Learning Platform</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* File Management Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-blue-50 rounded-md mr-4">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">File Management</h3>
                  <p className="text-sm text-gray-500">Upload and manage educational files and resources</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button className="w-full py-2 bg-blue-600 text-white hover:bg-blue-700 border-0">Manage Files</Button>
              </div>
            </div>

            {/* User Management Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-amber-50 rounded-md mr-4">
                  <Users className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">User Management</h3>
                  <p className="text-sm text-gray-500">Add and manage users, roles, and permissions</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button className="w-full py-2 bg-amber-600 text-white hover:bg-amber-700 border-0">Manage Users</Button>
              </div>
            </div>

            {/* School Management Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-green-50 rounded-md mr-4">
                  <School className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">School Management</h3>
                  <p className="text-sm text-gray-500">Register and manage schools and their licenses</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button className="w-full py-2 bg-green-600 text-white hover:bg-green-700 border-0">Manage Schools</Button>
              </div>
            </div>

            {/* Books Management Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                  <CardTitle>Books Management</CardTitle>
                </div>
                <CardDescription>Organize books, units, and materials</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Create, edit, and organize books, units, and teaching materials. Manage your educational content collection.
                </p>
              </CardContent>
              <CardFooter className="bg-purple-50 text-purple-700 text-sm pt-2 pb-3 px-6 flex justify-between items-center">
                <span>View Books</span>
                <Button 
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                  onClick={navigateToBooksAndContent}
                >
                  Manage Books
                </Button>
              </CardFooter>
            </Card>

            {/* Shop Management Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <ShoppingBag className="h-5 w-5 text-rose-600" />
                  <CardTitle>Shop Management</CardTitle>
                </div>
                <CardDescription>Manage products and subscriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Manage subscription plans, printed book orders, and configure pricing for your educational products.
                </p>
              </CardContent>
              <CardFooter className="bg-rose-50 text-rose-700 text-sm pt-2 pb-3 px-6 flex justify-between items-center">
                <span>View Shop</span>
                <Button 
                  className="bg-rose-600 hover:bg-rose-700 text-white"
                  onClick={navigateToShopManagement}
                >
                  Manage Shop
                </Button>
              </CardFooter>
            </Card>
            
            {/* Content Organizer Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 mb-1">
                  <LayoutGrid className="h-5 w-5 text-blue-600" />
                  <CardTitle>Content Organizer</CardTitle>
                </div>
                <CardDescription>Arrange and organize slides</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500">
                  Rearrange slides, manage questions and answers, and organize the flow of content for each unit.
                </p>
              </CardContent>
              <CardFooter className="bg-blue-50 text-blue-700 text-sm pt-2 pb-3 px-6 flex justify-between items-center">
                <span>Edit Content</span>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={navigateToContentOrganizer}
                >
                  Open Organizer
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;