import { useState } from "react";
import { useLocation } from "wouter";
import { FileText, Users, School, BookOpen, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";

const AdminDashboard = () => {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  if (!user || user.role !== "admin") {
    navigate("/auth");
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };

  const navigateToBooks = () => {
    navigate("/admin/books");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm px-6 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin User</h1>
        <div className="flex items-center space-x-4">
          <span>{user.username}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 min-h-screen bg-white shadow-md">
          <div className="p-6">
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold">
                AU
              </div>
              <div>
                <div className="font-semibold">Admin User</div>
                <div className="text-xs text-gray-500">Administrator</div>
              </div>
            </div>
          </div>

          <nav className="mt-4">
            <ul>
              <li>
                <Button variant="ghost" className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100">
                  <span className="flex items-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="mr-3">
                      <rect width="7" height="9" x="3" y="3" rx="1" fill="currentColor" fillOpacity=".2" />
                      <rect width="7" height="5" x="3" y="15" rx="1" fill="currentColor" fillOpacity=".2" />
                      <rect width="7" height="5" x="13" y="3" rx="1" fill="currentColor" fillOpacity=".2" />
                      <rect width="7" height="9" x="13" y="11" rx="1" fill="currentColor" fillOpacity=".2" />
                    </svg>
                    Dashboard
                  </span>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100">
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    Users Management
                  </span>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100">
                  <span className="flex items-center">
                    <School className="h-5 w-5 mr-3" />
                    Schools
                  </span>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100">
                  <span className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3" />
                    Visual English Books
                  </span>
                </Button>
              </li>
              <li>
                <Button variant="ghost" className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100">
                  <span className="flex items-center">
                    <Settings className="h-5 w-5 mr-3" />
                    Settings
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <span className="flex items-center">
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </span>
                </Button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8">
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
                <div className="text-sm text-gray-500 mb-1">6-Month License</div>
                <div className="text-2xl font-bold mb-2">€149</div>
                <Button variant="outline" className="w-full">Manage</Button>
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
                <div className="text-sm text-gray-500 mb-1">6-Month License</div>
                <div className="text-2xl font-bold mb-2">€299</div>
                <Button variant="outline" className="w-full">Manage</Button>
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
                <div className="text-sm text-gray-500 mb-1">6-Month License</div>
                <div className="text-2xl font-bold mb-2">€499</div>
                <Button variant="outline" className="w-full">Manage</Button>
              </div>
            </div>

            {/* Content Management Card */}
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <div className="flex items-start mb-4">
                <div className="p-2 bg-purple-50 rounded-md mr-4">
                  <BookOpen className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Content Management</h3>
                  <p className="text-sm text-gray-500">Organize books, units, and learning materials</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-sm text-gray-500 mb-1">6-Month License</div>
                <div className="text-2xl font-bold mb-2">€299</div>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={navigateToBooks}
                >
                  Manage
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
                <div className="text-sm text-gray-500 mb-1">Custom License</div>
                <div className="text-2xl font-bold mb-2">Contact</div>
                <Button variant="outline" className="w-full">Manage</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;