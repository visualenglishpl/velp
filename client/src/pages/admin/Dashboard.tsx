import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FileText, Users, School, BookOpen, Settings, LogOut, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const AdminDashboard = () => {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  // User auth check moved to useEffect to prevent constant redirects
  useEffect(() => {
    if (!user && !logoutMutation.isPending) {
      console.log("No user found on dashboard, redirecting to auth page");
      navigate("/auth");
    }
  }, [user, navigate, logoutMutation.isPending]);

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };

  const navigateToBooksAndContent = () => {
    navigate("/admin/books");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div>
        {/* Main Content Area */}
        <div className="container mx-auto px-4">
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

            {/* Content Management Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-purple-50 rounded-md mr-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Books</h3>
                  <p className="text-sm text-gray-500">Organize books, units, and learning materials</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button 
                  className="w-full py-2 text-white hover:bg-opacity-90 border-0"
                  style={{ backgroundColor: '#9333ea' }} // Bright purple color to match screenshot
                  onClick={navigateToBooksAndContent}
                >
                  Books
                </Button>
              </div>
            </div>

            {/* System Settings Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-md mr-4">
                  <Settings className="h-6 w-6 text-gray-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">System Settings</h3>
                  <p className="text-sm text-gray-500">Configure system preferences and global settings</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <Button className="w-full py-2 text-white hover:bg-opacity-90 border-0" style={{ backgroundColor: '#474e59' }}>System Settings</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;