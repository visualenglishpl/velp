import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
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
  DialogTitle, 
  DialogTrigger 
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
  Users, 
  ShieldCheck, 
  UserPlus, 
  Search, 
  RefreshCw, 
  Edit,
  Trash2,
  Lock,
  Key,
  BookOpen
} from "lucide-react";

// Mock user roles data
const mockUsers = [
  {
    id: 1,
    name: "Anna Kowalska",
    email: "anna.k@school.edu.pl",
    role: "admin",
    permissions: ["manage_users", "manage_content", "view_analytics", "edit_settings"],
    status: "active",
    lastLogin: "2025-05-15T12:30:00Z"
  },
  {
    id: 2,
    name: "Piotr Nowak",
    email: "p.nowak@school.pl",
    role: "teacher",
    permissions: ["view_content", "edit_own_content"],
    status: "active",
    lastLogin: "2025-05-17T10:15:00Z"
  },
  {
    id: 3,
    name: "Magdalena Wiśniewska",
    email: "m.wisniewska@edulearn.pl",
    role: "editor",
    permissions: ["view_content", "edit_content", "publish_content"],
    status: "inactive",
    lastLogin: "2025-05-10T09:20:00Z"
  }
];

// Role definitions
const roles = [
  { id: "admin", name: "Administrator", description: "Full access to all features and settings" },
  { id: "teacher", name: "Teacher", description: "Can access content and resources for teaching" },
  { id: "editor", name: "Content Editor", description: "Can edit and publish content" },
  { id: "subscriber", name: "Subscriber", description: "Standard user with subscription access" },
  { id: "guest", name: "Guest", description: "Limited access to preview content" }
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

// Grouped permissions by category
const permissionsByCategory = permissions.reduce((acc, permission) => {
  if (!acc[permission.category]) {
    acc[permission.category] = [];
  }
  acc[permission.category].push(permission);
  return acc;
}, {} as Record<string, typeof permissions>);

const AccessRolesPage = () => {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [users, setUsers] = useState(mockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [editingUser, setEditingUser] = useState<any>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState("");
  
  // Check for direct admin access - if it fails, redirect to the admin login page
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
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate('/admin');
      }
    };
    
    checkAdminAccess();
  }, [navigate]);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleEditUser = (user: any) => {
    setEditingUser(user);
    setSelectedPermissions(user.permissions);
    setSelectedRole(user.role);
    setEditDialogOpen(true);
  };

  const handleSaveUser = () => {
    const updatedUsers = users.map(user => 
      user.id === editingUser.id 
        ? { ...user, role: selectedRole, permissions: selectedPermissions } 
        : user
    );
    
    setUsers(updatedUsers);
    setEditDialogOpen(false);
    
    toast({
      title: "User role updated",
      description: `${editingUser.name}'s role and permissions have been updated.`,
    });
  };

  const handleDeleteUser = (userId: number) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    
    toast({
      title: "User removed",
      description: "The user has been removed from the system.",
    });
  };

  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(current => 
      current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Access Roles Management | Visual English Admin</title>
      </Helmet>
      
      <div className="flex justify-start mb-4">
        <Link href="/admin">
          <Button variant="outline" className="flex items-center">
            <svg className="h-4 w-4 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Admin
          </Button>
        </Link>
      </div>
      
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
                  <ShieldCheck className="mr-2 h-5 w-5" /> Access Roles Management
                </CardTitle>
              </div>
              <CardDescription className="text-sm text-gray-500">
                Manage user roles, permissions and access control
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="bg-white hover:bg-gray-50">
                <UserPlus className="mr-2 h-4 w-4" /> Add User
              </Button>
              <Button onClick={() => window.location.reload()} variant="outline" className="bg-white hover:bg-gray-50">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Role Definitions */}
          <Card className="mb-6 border-gray-200">
            <CardHeader className="bg-gray-50 py-3 px-4">
              <CardTitle className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="mr-2 h-4 w-4" /> Role Definitions
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map(role => (
                  <Card key={role.id} className="border-gray-100 shadow-sm">
                    <CardHeader className="py-3 px-4">
                      <CardTitle className="text-sm font-semibold">{role.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="py-2 px-4">
                      <p className="text-xs text-gray-600">{role.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Filters */}
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="search"
                  placeholder="Search users..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex gap-3">
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Roles</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>{role.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          {/* Users Table */}
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader className="bg-gray-50">
                <TableRow>
                  <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</TableHead>
                  <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</TableHead>
                  <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableHead>
                  <TableHead className="text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</TableHead>
                  <TableHead className="text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map(user => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell className="py-2">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium text-gray-900">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.email}</span>
                      </div>
                    </TableCell>
                    <TableCell className="py-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.role === 'admin' 
                          ? 'bg-purple-100 text-purple-800' 
                          : user.role === 'teacher' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'admin' 
                          ? 'Administrator' 
                          : user.role === 'teacher' 
                          ? 'Teacher' 
                          : 'Editor'}
                      </span>
                    </TableCell>
                    <TableCell className="py-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {user.status === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </TableCell>
                    <TableCell className="py-2 text-xs text-gray-500">
                      {new Date(user.lastLogin).toLocaleDateString()} at {new Date(user.lastLogin).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </TableCell>
                    <TableCell className="py-2 text-right">
                      <div className="flex justify-end space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => handleEditUser(user)}
                        >
                          <Edit className="h-3.5 w-3.5 text-gray-600" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-7 w-7 p-0"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5 text-gray-600" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Role Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit User Role & Permissions</DialogTitle>
            <DialogDescription>
              Manage access roles and permissions for {editingUser?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="role">User Role</Label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    {roles.map(role => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label>Permissions</Label>
                <div className="border rounded-md p-4 max-h-60 overflow-y-auto space-y-4">
                  {Object.entries(permissionsByCategory).map(([category, perms]) => (
                    <div key={category} className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-900">{category}</h4>
                      <div className="pl-4 space-y-2">
                        {perms.map(permission => (
                          <div key={permission.id} className="flex items-center space-x-2">
                            <Checkbox 
                              id={permission.id}
                              checked={selectedPermissions.includes(permission.id)}
                              onCheckedChange={() => togglePermission(permission.id)}
                            />
                            <Label 
                              htmlFor={permission.id}
                              className="text-sm font-normal"
                            >
                              {permission.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex space-x-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setEditDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveUser}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccessRolesPage;