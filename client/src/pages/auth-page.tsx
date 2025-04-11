import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import VelpLogo from "@/components/ui/velp-logo";
import { User, UserRound, Laptop, School, BookOpen, Globe, Check } from "lucide-react";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState("login");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left Side - Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm flex flex-col items-center mb-8">
          <VelpLogo />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">VELP</h2>
          <p className="text-gray-600 text-sm">Visual English Learning Platform</p>
        </div>

        <div className="flex justify-center space-x-3 mb-6">
          <button
            onClick={() => setActiveTab("login")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "login"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("register")}
            className={`px-4 py-2 font-medium text-sm ${
              activeTab === "register"
                ? "text-primary border-b-2 border-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Register
          </button>
        </div>

        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {activeTab === "login" ? (
            // Login Form
            <div>
              <h3 className="text-xl font-semibold mb-2">Welcome back</h3>
              <p className="text-gray-600 text-sm mb-6">Sign in to your account to continue</p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full"
                  />
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-3">Select a role to login</p>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("admin")}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        selectedRole === "admin"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <UserRound className="h-5 w-5 mb-1" />
                      <span className="text-xs">Admin</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("teacher")}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        selectedRole === "teacher"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <BookOpen className="h-5 w-5 mb-1" />
                      <span className="text-xs">Teacher</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("school")}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        selectedRole === "school"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <School className="h-5 w-5 mb-1" />
                      <span className="text-xs">School</span>
                    </button>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-500">
                  or login with credentials
                </p>

                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800"
                >
                  Sign In
                </Button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Don't have an account?{' '}
                  <button 
                    onClick={() => setActiveTab("register")} 
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    Create an account
                  </button>
                </p>
              </div>
            </div>
          ) : (
            // Register Form
            <div>
              <h3 className="text-xl font-semibold mb-2">Create an account</h3>
              <p className="text-gray-600 text-sm mb-6">Register to get started with VELP</p>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Full Name"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="reg-username" className="block text-sm font-medium text-gray-700 mb-1">
                    Username
                  </label>
                  <Input
                    id="reg-username"
                    name="username"
                    type="text"
                    placeholder="Username"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="reg-password" className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <Input
                    id="reg-password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    className="w-full"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                    Account Type
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedRole("teacher")}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        selectedRole === "teacher"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <BookOpen className="h-5 w-5 mb-1" />
                      <span className="text-xs">Teacher</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedRole("school")}
                      className={`flex flex-col items-center justify-center p-3 rounded-md transition-colors ${
                        selectedRole === "school"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <School className="h-5 w-5 mb-1" />
                      <span className="text-xs">School</span>
                    </button>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gray-900 hover:bg-gray-800"
                >
                  Create Account
                </Button>

                <p className="mt-4 text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <button 
                    onClick={() => setActiveTab("login")} 
                    className="font-semibold text-primary hover:text-primary/80"
                  >
                    Sign in
                  </button>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Info Section */}
      <div className="flex-1 bg-gray-900 text-white p-10 hidden md:flex flex-col justify-center items-center">
        <div className="max-w-md">
          <h1 className="text-3xl font-bold mb-4">Join Visual English Learning Platform</h1>
          <p className="mb-8">
            A comprehensive platform for teaching and learning English through visual methods
          </p>

          <div className="space-y-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-blue-900/20 rounded-lg mr-4">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Interactive Learning</h3>
                <p className="text-gray-300 text-sm">
                  Visual methods for effective language acquisition
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-blue-900/20 rounded-lg mr-4">
                <Laptop className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Comprehensive Management</h3>
                <p className="text-gray-300 text-sm">
                  Organize schools, classes, and educational content
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 p-2 bg-blue-900/20 rounded-lg mr-4">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold mb-1">Multilingual Support</h3>
                <p className="text-gray-300 text-sm">
                  Platform available in English and Polish
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;