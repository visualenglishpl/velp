import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  RefreshCw, 
  Edit,
  Trash2,
  Lock,
  Key,
  Shield,
  Pencil
} from "lucide-react";

// User type definition
type User = {
  id: number;
  username: string;
  email?: string;
  role: string;
  fullName?: string;
  permissions?: string[];
  status?: string;
  createdAt?: string;
  lastLogin?: string;
  profileImageUrl?: string;
};

// Role definitions
const roles = [
  { id: "admin", name: "Administrator", description: "Full access to all features and settings" },
  { id: "teacher", name: "Teacher", description: "Can access content and resources for teaching" },
  { id: "editor", name: "Content Editor", description: "Can edit and publish content" },
  { id: "school", name: "School Account", description: "School administration account" },
  { id: "subscriber", name: "Subscriber", description: "Standard user with subscription access" }
];

// Permission definitions
const permissions = [
  { id: "manage_users", name: "Manage Users", category: "Administration" },
  { id: "manage_content", name: "Manage Content", category: "Content" },
  { id: "view_content", name: "View Content", category: "Content" },
  { id: "edit_content", name: "Edit Content", category: "Content" },
  { id: "edit_own_content", name: "Edit Own Content", category: "Content" },
  { id: "publish_content", name: "Publish Content", category: "Content" },
  { id: "view_analytics", name: "View Analytics", category: "Analytics" },
  { id: "edit_settings", name: "Edit Settings", category: "Administration" },
  { id: "manage_payments", name: "Manage Payments", category: "Finance" }
];

// Grouped permissions by category for UI display
const permissionsByCategory = permissions.reduce((acc, permission) => {
  if (!acc[permission.category]) {
    acc[permission.category] = [];
  }
  acc[permission.category].push(permission);
  return acc;
}, {} as Record<string, typeof permissions>);

// Default permissions for each role
const roleDefaultPermissions: Record<string, string[]> = {
  admin: permissions.map(p => p.id),
  teacher: ["view_content", "edit_own_content"],
  editor: ["view_content", "edit_content", "publish_content"],
  school: ["view_content"],
  subscriber: ["view_content"]
};

const CombinedUserRolesPage = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [adminUser, setAdminUser] = useState<any>(null);
  
  // State for users and roles management
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("users");
  
  // User management states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  // Role management states
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
  // Form states for user management
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [role, setRole] = useState("teacher");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profileImageUrl, setProfileImageUrl] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Search and filtering
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Check for admin access
  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        const res = await fetch('/api/direct/admin-login', { 
          credentials: 'include',
          cache: 'no-store'
        });
        
        if (!res.ok) {
          console.error("Admin access check failed");
          navigate('/admin');
        } else {
          const data = await res.json();
          if (data.user) {
            setAdminUser(data.user);
          }
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate('/admin');
      }
    };
    
    checkAdminAccess();
  }, [navigate]);
  
  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        
        // In a real app, fetch from API
        // const response = await fetch("/api/admin/users");
        // const data = await response.json();
        // setUsers(data);
        
        // Mock data for development
        setTimeout(() => {
          setUsers([
            {
              id: 1,
              username: "admin",
              email: "admin@velp.com",
              role: "admin",
              fullName: "Admin User",
              permissions: ["manage_users", "manage_content", "view_analytics", "edit_settings"],
              status: "active",
              createdAt: "2023-01-01",
              lastLogin: "2025-05-15",
              profileImageUrl: "https://ui-avatars.com/api/?name=Admin+User&background=6d28d9&color=fff"
            },
            {
              id: 2,
              username: "teacher1",
              email: "teacher1@school.com",
              role: "teacher",
              fullName: "John Smith",
              permissions: ["view_content", "edit_own_content"],
              status: "active",
              createdAt: "2023-01-15",
              lastLogin: "2025-05-18",
              profileImageUrl: "https://ui-avatars.com/api/?name=John+Smith&background=3b82f6&color=fff"
            },
            {
              id: 3,
              username: "school1",
              email: "school1@edu.com",
              role: "school",
              fullName: "Springfield Elementary",
              permissions: ["view_content"],
              status: "active",
              createdAt: "2023-02-01",
              lastLogin: "2025-05-17",
              profileImageUrl: "https://ui-avatars.com/api/?name=Springfield+Elementary&background=10b981&color=fff"
            },
            {
              id: 4,
              username: "editor1",
              email: "editor@content.org",
              role: "editor",
              fullName: "Maria Garcia",
              permissions: ["view_content", "edit_content", "publish_content"],
              status: "inactive",
              createdAt: "2023-03-10",
              lastLogin: "2025-04-30",
              profileImageUrl: "https://ui-avatars.com/api/?name=Maria+Garcia&background=f59e0b&color=fff"
            },
            {
              id: 5,
              username: "teacher2",
              email: "teacher2@school.com",
              role: "teacher",
              fullName: "Anna Kowalski",
              permissions: ["view_content", "edit_own_content"],
              status: "active",
              createdAt: "2023-04-05",
              lastLogin: "2025-05-19",
              profileImageUrl: "https://ui-avatars.com/api/?name=Anna+Kowalski&background=3b82f6&color=fff"
            },
            {
              id: 6,
              username: "school2",
              email: "school2@edu.pl",
              role: "school",
              fullName: "Warsaw International",
              permissions: ["view_content"],
              status: "active",
              createdAt: "2023-03-15",
              lastLogin: "2025-05-16",
              profileImageUrl: "https://ui-avatars.com/api/?name=Warsaw+International&background=10b981&color=fff"
            },
            {
              id: 7,
              username: "subscriber1",
              email: "subscriber1@example.com",
              role: "subscriber",
              fullName: "Thomas Williams",
              permissions: ["view_content"],
              status: "active",
              createdAt: "2023-05-10",
              lastLogin: "2025-05-14",
              profileImageUrl: "https://ui-avatars.com/api/?name=Thomas+Williams&background=64748b&color=fff"
            },
            {
              id: 8,
              username: "subscriber2",
              email: "subscriber2@example.com",
              role: "subscriber",
              fullName: "Emma Brown",
              permissions: ["view_content"],
              status: "active",
              createdAt: "2023-05-11",
              lastLogin: "2025-05-13",
              profileImageUrl: "https://ui-avatars.com/api/?name=Emma+Brown&background=64748b&color=fff"
            }
          ]);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error("Error fetching users:", error);
        toast({
          title: "Error",
          description: "Failed to load users. Please try again.",
          variant: "destructive",
        });
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, [toast]);

  // Apply filters to users list
  const getFilteredUsers = () => {
    return users.filter(user => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const searchFields = [
          user.username.toLowerCase(),
          (user.email || "").toLowerCase(),
          (user.fullName || "").toLowerCase()
        ];
        if (!searchFields.some(field => field.includes(query))) {
          return false;
        }
      }
      
      // Filter by role
      if (roleFilter !== "all" && user.role !== roleFilter) {
        return false;
      }
      
      // Filter by status
      if (statusFilter !== "all" && user.status !== statusFilter) {
        return false;
      }
      
      return true;
    });
  };

  const filteredUsers = getFilteredUsers();
  
  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Reset form fields
  const resetForm = () => {
    setUsername("");
    setEmail("");
    setFullName("");
    setRole("teacher");
    setPassword("");
    setConfirmPassword("");
    setProfileImageUrl("");
    setFormErrors({});
  };
  
  // Handle opening user edit dialog
  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setUsername(user.username);
    setEmail(user.email || "");
    setFullName(user.fullName || "");
    setRole(user.role);
    setProfileImageUrl(user.profileImageUrl || "");
    setPassword("");
    setConfirmPassword("");
    setIsUserDialogOpen(true);
  };
  
  // Handle opening role dialog
  const handleEditRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    setSelectedPermissions(roleDefaultPermissions[roleId] || []);
    setIsRoleDialogOpen(true);
  };
  
  // Handle opening user delete dialog
  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };
  
  // Validate form fields
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (username.trim().length < 3) {
      errors.username = "Username must be at least 3 characters";
    }

    if (email && !/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }

    // Only validate password fields if this is a new user or if password is being changed
    if (!selectedUser || password) {
      if (!selectedUser && !password) {
        errors.password = "Password is required";
      } else if (password && password.length < 6) {
        errors.password = "Password must be at least 6 characters";
      }

      if (password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle user form submission
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const userData = {
        username,
        email: email || undefined,
        fullName: fullName || undefined,
        role,
        profileImageUrl: profileImageUrl || undefined,
        // Only include password if it's provided (for edits) or for new users
        ...(password ? { password } : {}),
      };

      // In a real app, call the API
      /*
      const url = selectedUser
        ? `/api/admin/users/${selectedUser.id}`
        : "/api/admin/users";
      
      const method = selectedUser ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Operation failed");
      }

      const data = await response.json();
      */
      
      // Mock API response for development
      // Update the users list
      if (selectedUser) {
        setUsers((prevUsers) =>
          prevUsers.map((u) => 
            u.id === selectedUser.id 
              ? { 
                ...u, 
                username, 
                email: email || u.email, 
                fullName: fullName || u.fullName, 
                profileImageUrl: profileImageUrl || u.profileImageUrl,
                role,
                permissions: roleDefaultPermissions[role] || []
              } 
              : u
          )
        );
        toast({
          title: "Success",
          description: "User updated successfully",
        });
      } else {
        // Add new user to the list
        const newUser: User = {
          id: Math.max(...users.map(u => u.id), 0) + 1,
          username,
          email: email || undefined,
          fullName: fullName || undefined,
          role,
          profileImageUrl: profileImageUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=random`,
          permissions: roleDefaultPermissions[role] || [],
          status: "active",
          createdAt: new Date().toISOString().split('T')[0],
          lastLogin: new Date().toISOString().split('T')[0],
        };
        setUsers((prevUsers) => [...prevUsers, newUser]);
        toast({
          title: "Success",
          description: "User added successfully",
        });
      }

      resetForm();
      setIsUserDialogOpen(false);
    } catch (error) {
      console.error("Operation failed:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Operation failed",
        variant: "destructive",
      });
    }
  };
  
  // Handle role form submission
  const handleRoleSubmit = () => {
    if (!selectedRoleId) return;
    
    // In a real application, save to the API
    // For now, just update the roleDefaultPermissions and any users with this role
    roleDefaultPermissions[selectedRoleId] = [...selectedPermissions];
    
    // Update any users who have this role to have the new permissions
    setUsers((prevUsers) =>
      prevUsers.map((user) => 
        user.role === selectedRoleId
          ? { ...user, permissions: [...selectedPermissions] }
          : user
      )
    );
    
    toast({
      title: "Success",
      description: `Role permissions updated for ${selectedRoleId}`,
    });
    
    setIsRoleDialogOpen(false);
  };
  
  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      // In a real app, call the API
      /*
      const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Deletion failed");
      }
      */
      
      // Remove the user from the list
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== selectedUser.id));
      
      toast({
        title: "Success",
        description: "User deleted successfully",
      });
    } catch (error) {
      console.error("Deletion failed:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Deletion failed",
        variant: "destructive",
      });
    } finally {
      setIsDeleteDialogOpen(false);
      setSelectedUser(null);
    }
  };
  
  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Get the appropriate status badge for a user
  const getUserStatusBadge = (status: string = 'active') => {
    switch (status.toLowerCase()) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800 border-green-300 text-[10px]">Active</Badge>;
      case 'inactive':
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300 text-[10px]">Inactive</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800 border-red-300 text-[10px]">Suspended</Badge>;
      default:
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">{status}</Badge>;
    }
  };
  
  // Get the appropriate role badge for a user
  const getUserRoleBadge = (userRole: string) => {
    switch (userRole) {
      case 'admin':
        return <Badge className="bg-purple-100 text-purple-800 border-purple-300 text-[10px]">Admin</Badge>;
      case 'teacher':
        return <Badge className="bg-blue-100 text-blue-800 border-blue-300 text-[10px]">Teacher</Badge>;
      case 'editor':
        return <Badge className="bg-amber-100 text-amber-800 border-amber-300 text-[10px]">Editor</Badge>;
      case 'school':
        return <Badge className="bg-green-100 text-green-800 border-green-300 text-[10px]">School</Badge>;
      case 'subscriber':
        return <Badge className="bg-sky-100 text-sky-800 border-sky-300 text-[10px]">Subscriber</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800 border-gray-300 text-[10px]">{userRole}</Badge>;
    }
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/admin')}
                  className="mr-3 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back
                </Button>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Users className="mr-2 h-5 w-5" /> User & Role Management
                </CardTitle>
              </div>
              <CardDescription>
                Manage users, roles, and permissions for the Visual English platform
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setSelectedUser(null);
                  resetForm();
                  setIsUserDialogOpen(true);
                }} 
                className="bg-blue-600 hover:bg-blue-700 text-xs h-8 px-3"
              >
                <UserPlus className="mr-2 h-3.5 w-3.5" /> Add User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid w-full md:w-auto grid-cols-2">
              <TabsTrigger value="users" className="text-xs">
                <Users className="h-3.5 w-3.5 mr-1" /> Users
              </TabsTrigger>
              <TabsTrigger value="roles" className="text-xs">
                <ShieldCheck className="h-3.5 w-3.5 mr-1" /> Roles & Permissions
              </TabsTrigger>
            </TabsList>
            
            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              {/* Search and filter section */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search users..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8 h-9 text-xs"
                  />
                </div>
                <div className="flex gap-3">
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-[110px] h-9 text-xs">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">All Roles</SelectItem>
                      {roles.map((r) => (
                        <SelectItem key={r.id} value={r.id} className="text-xs">
                          {r.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[110px] h-9 text-xs">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">All Status</SelectItem>
                      <SelectItem value="active" className="text-xs">Active</SelectItem>
                      <SelectItem value="inactive" className="text-xs">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm" onClick={() => {
                    setSearchQuery("");
                    setRoleFilter("all");
                    setStatusFilter("all");
                  }} className="h-9 text-xs">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset
                  </Button>
                </div>
              </div>
              
              {/* Users table */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">User Info</TableHead>
                      <TableHead className="text-xs">Email</TableHead>
                      <TableHead className="text-xs">Permissions</TableHead>
                      <TableHead className="text-xs">Status</TableHead>
                      <TableHead className="text-xs">Last Login</TableHead>
                      <TableHead className="text-xs text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-4 text-xs">
                          No users found. Try adjusting your search criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      currentUsers.map((user) => (
                        <TableRow key={user.id} className="group hover:bg-slate-50">
                          <TableCell className="py-2">
                            <div className="flex items-center gap-3">
                              <div className="h-9 w-9 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200">
                                <div className="h-full w-full flex items-center justify-center bg-primary text-white text-sm font-semibold">
                                  {(user.fullName || user.username).substring(0, 2).toUpperCase()}
                                </div>
                              </div>
                              <div className="flex flex-col">
                                <span className="font-medium text-xs">{user.username}</span>
                                <span className="text-xs text-muted-foreground max-w-[150px] truncate">{user.fullName || "-"}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs py-2 max-w-[180px] truncate">{user.email || "-"}</TableCell>
                          <TableCell className="py-2">
                            <div className="flex flex-col space-y-1">
                              {getUserRoleBadge(user.role)}
                              <div className="flex flex-wrap gap-1 mt-1 max-w-[180px]">
                                {(user.permissions || []).slice(0, 2).map((perm) => (
                                  <Badge key={perm} variant="outline" className="text-[9px] px-1 py-0 bg-slate-50">
                                    {perm.replace(/_/g, ' ')}
                                  </Badge>
                                ))}
                                {(user.permissions || []).length > 2 && (
                                  <Badge variant="outline" className="text-[9px] px-1 py-0 bg-slate-50">
                                    +{(user.permissions || []).length - 2} more
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="py-2">
                            {getUserStatusBadge(user.status)}
                          </TableCell>
                          <TableCell className="text-xs py-2">{user.lastLogin || "-"}</TableCell>
                          <TableCell className="text-right py-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditUser(user)}
                              className="h-6 w-6 p-0 mr-1 opacity-70 group-hover:opacity-100"
                              title="Edit User"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(user)}
                              className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 opacity-70 group-hover:opacity-100"
                              title="Delete User"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4">
                  <div className="flex space-x-1">
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="h-7 text-xs px-2"
                    >
                      Previous
                    </Button>
                    {[...Array(totalPages)].map((_, i) => (
                      <Button
                        key={i}
                        variant={currentPage === i + 1 ? "default" : "outline"}
                        onClick={() => handlePageChange(i + 1)}
                        className="h-7 w-7 p-0 text-xs"
                      >
                        {i + 1}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="h-7 text-xs px-2"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>
            
            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-4">
              <div className="space-y-6">
                <div className="text-sm">
                  <p className="text-muted-foreground text-xs mb-4">
                    Define the permissions assigned to each role. These permissions determine what actions users can perform.
                  </p>
                  
                  {/* Roles list */}
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {roles.map((role) => (
                      <Card key={role.id} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <Shield className="h-4 w-4 mr-2 text-primary" />
                              <CardTitle className="text-sm">{role.name}</CardTitle>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRole(role.id)}
                              className="h-6 w-6 p-0"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </Button>
                          </div>
                          <CardDescription className="text-xs mt-1">
                            {role.description}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-1">
                            <h4 className="text-xs font-medium text-muted-foreground mb-2">Permissions:</h4>
                            <div className="flex flex-wrap gap-1">
                              {(roleDefaultPermissions[role.id] || []).slice(0, 5).map((perm) => {
                                const permission = permissions.find(p => p.id === perm);
                                return (
                                  <Badge 
                                    key={perm} 
                                    variant="outline" 
                                    className="text-[10px] bg-blue-50"
                                  >
                                    {permission?.name || perm}
                                  </Badge>
                                );
                              })}
                              {(roleDefaultPermissions[role.id] || []).length > 5 && (
                                <Badge 
                                  variant="outline" 
                                  className="text-[10px] bg-slate-50"
                                >
                                  +{(roleDefaultPermissions[role.id] || []).length - 5} more
                                </Badge>
                              )}
                              {(roleDefaultPermissions[role.id] || []).length === 0 && (
                                <span className="text-xs text-muted-foreground">No permissions assigned</span>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      {/* Add/Edit User Dialog */}
      <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">
              {selectedUser ? "Edit User" : "Add New User"}
            </DialogTitle>
            <DialogDescription className="text-xs">
              {selectedUser
                ? "Update the user's information below"
                : "Enter the details for the new user"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleUserSubmit} className="space-y-3">
            <div className="grid gap-3">
              <div className="grid gap-1.5">
                <Label htmlFor="username" className="text-xs">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  className="h-8 text-xs"
                />
                {formErrors.username && (
                  <p className="text-[10px] text-red-500">{formErrors.username}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="email" className="text-xs">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="h-8 text-xs"
                />
                {formErrors.email && (
                  <p className="text-[10px] text-red-500">{formErrors.email}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="fullName" className="text-xs">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  className="h-8 text-xs"
                />
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="profileImageUrl" className="text-xs">
                  Profile Image URL <span className="text-[10px] text-muted-foreground">(optional)</span>
                </Label>
                <Input
                  id="profileImageUrl"
                  value={profileImageUrl}
                  onChange={(e) => setProfileImageUrl(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="h-8 text-xs"
                />
                {profileImageUrl && (
                  <div className="mt-1 flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full overflow-hidden border border-slate-200">
                      <img 
                        src={profileImageUrl} 
                        alt="Profile preview" 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName || username)}&background=random`;
                        }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">Preview</span>
                  </div>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="role" className="text-xs">Role</Label>
                <Select value={role} onValueChange={(value: any) => setRole(value)}>
                  <SelectTrigger className="h-8 text-xs">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((r) => (
                      <SelectItem key={r.id} value={r.id} className="text-xs">{r.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="password" className="text-xs">
                  {selectedUser ? 
                    <span>New Password <span className="text-[10px] text-muted-foreground">(leave blank to keep current)</span></span> 
                    : "Password"}
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="h-8 text-xs"
                />
                {formErrors.password && (
                  <p className="text-[10px] text-red-500">{formErrors.password}</p>
                )}
              </div>
              <div className="grid gap-1.5">
                <Label htmlFor="confirmPassword" className="text-xs">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                  className="h-8 text-xs"
                />
                {formErrors.confirmPassword && (
                  <p className="text-[10px] text-red-500">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>
            <DialogFooter className="gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  resetForm();
                  setIsUserDialogOpen(false);
                }}
                className="h-7 text-xs px-3"
              >
                Cancel
              </Button>
              <Button type="submit" className="h-7 text-xs px-3">
                {selectedUser ? "Save Changes" : "Create User"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Edit Role Permissions Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md max-h-[80vh] overflow-y-auto">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base">
              Edit Role Permissions
            </DialogTitle>
            <DialogDescription className="text-xs">
              Select the permissions you want to assign to this role
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 my-2">
            {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
              <div key={category} className="space-y-2">
                <h3 className="text-sm font-medium">{category}</h3>
                <div className="space-y-1.5">
                  {categoryPermissions.map((permission) => (
                    <div key={permission.id} className="flex items-center space-x-2">
                      <Checkbox 
                        id={permission.id}
                        checked={selectedPermissions.includes(permission.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedPermissions([...selectedPermissions, permission.id]);
                          } else {
                            setSelectedPermissions(selectedPermissions.filter(id => id !== permission.id));
                          }
                        }}
                      />
                      <Label htmlFor={permission.id} className="text-xs cursor-pointer">
                        {permission.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRoleDialogOpen(false)}
              className="h-7 text-xs px-3"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleRoleSubmit}
              className="h-7 text-xs px-3"
            >
              Save Permissions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete User Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="text-base">Confirm Deletion</DialogTitle>
            <DialogDescription className="text-xs pt-1">
              Are you sure you want to delete the user <span className="font-semibold">{selectedUser?.username}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
              className="h-7 text-xs px-3"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteUser}
              className="h-7 text-xs px-3"
            >
              Delete User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CombinedUserRolesPage;