import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { FileText, Users, School, BookOpen, Settings, LogOut } from "lucide-react";
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

  const navigateToBooks = () => {
    navigate("/admin/books");
  };
  
  const navigateToContent = () => {
    navigate("/admin/content");
  };
  
  const navigateToFiles = () => {
    console.log("Navigating to file management");
    // Will be implemented in future
    // navigate("/admin/files");
  };
  
  const navigateToUsers = () => {
    console.log("Navigating to user management");
    // Will be implemented in future
    // navigate("/admin/users");
  };
  
  const navigateToSchools = () => {
    console.log("Navigating to school management");
    // Will be implemented in future
    // navigate("/admin/schools");
  };
  
  const navigateToSettings = () => {
    console.log("Navigating to system settings");
    // Will be implemented in future
    // navigate("/admin/settings");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white shadow-sm px-6 py-2 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Admin User</h1>
        <div className="flex items-center space-x-4">
          <span>{user?.username || "Loading..."}</span>
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
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToUsers}
                >
                  <span className="flex items-center">
                    <Users className="h-5 w-5 mr-3" />
                    Users Management
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToSchools}
                >
                  <span className="flex items-center">
                    <School className="h-5 w-5 mr-3" />
                    Schools
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToBooks}
                >
                  <span className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3" />
                    Visual English Books
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToContent}
                >
                  <span className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-3" />
                    Content Management
                  </span>
                </Button>
              </li>
              <li>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start px-6 py-3 text-gray-700 hover:bg-gray-100"
                  onClick={navigateToSettings}
                >
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

          {/* Management Icons Row */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {/* File Management Icon */}
            <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={navigateToFiles}>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors">
                  <FileText className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold">Files</h3>
            </div>

            {/* User Management Icon */}
            <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={navigateToUsers}>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-amber-50 rounded-full hover:bg-amber-100 transition-colors">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold">Users</h3>
            </div>

            {/* School Management Icon */}
            <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={navigateToSchools}>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-green-50 rounded-full hover:bg-green-100 transition-colors">
                  <School className="h-8 w-8 text-green-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold">Schools</h3>
            </div>

            {/* Content Management Icon */}
            <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={navigateToContent}>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-purple-50 rounded-full hover:bg-purple-100 transition-colors">
                  <BookOpen className="h-8 w-8 text-purple-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold">Content</h3>
            </div>

            {/* System Settings Icon */}
            <div className="text-center cursor-pointer hover:opacity-80 transition-opacity" onClick={navigateToSettings}>
              <div className="flex justify-center mb-3">
                <div className="p-4 bg-gray-50 rounded-full hover:bg-gray-200 transition-colors">
                  <Settings className="h-8 w-8 text-gray-600" />
                </div>
              </div>
              <h3 className="text-sm font-semibold">Settings</h3>
            </div>
          </div>
          
          {/* Management Cards - Additional section that can be uncommented if needed
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Recent Activity</h3>
              <p className="text-sm text-gray-500">View your most recent platform activities</p>
            </div>
            
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">System Status</h3>
              <p className="text-sm text-gray-500">Monitor the health of your system</p>
            </div>
            
            <div className="bg-white rounded-md shadow-sm p-6 border border-gray-100">
              <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
              <p className="text-sm text-gray-500">Perform common administrative tasks</p>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;