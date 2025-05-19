import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Users, ShieldCheck, UserPlus, Settings, Edit, Trash2, Eye, EyeOff, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Define types for roles and permissions
type Permission = {
  id: string;
  name: string;
  description: string;
  category: 'content' | 'user' | 'system' | 'analytics';
};

type Role = {
  id: string;
  name: string;
  description: string;
  isSystem: boolean;
  permissions: string[];
  userCount: number;
  createdAt: string;
  updatedAt?: string;
};

type RoleWithPermissions = Role & {
  permissionDetails: Permission[];
};

type PermissionsByCategory = {
  [key: string]: Permission[];
};

const AccessRolesPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // States for data
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [permissionsByCategory, setPermissionsByCategory] = useState<PermissionsByCategory>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // States for UI
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("roles");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form states
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Load roles and permissions
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, these would be separate API calls
        // const rolesResponse = await fetch('/api/admin/roles');
        // const permissionsResponse = await fetch('/api/admin/permissions');
        
        // Mock data for development
        const mockPermissions: Permission[] = [
          // Content permissions
          { id: 'content:view', name: 'View Content', description: 'Access to view all educational content', category: 'content' },
          { id: 'content:create', name: 'Create Content', description: 'Ability to create new educational content', category: 'content' },
          { id: 'content:edit', name: 'Edit Content', description: 'Ability to modify existing content', category: 'content' },
          { id: 'content:delete', name: 'Delete Content', description: 'Ability to remove content from the platform', category: 'content' },
          { id: 'content:publish', name: 'Publish Content', description: 'Ability to make content live on the platform', category: 'content' },
          { id: 'content:review', name: 'Review Flagged Content', description: 'Ability to review and resolve flagged content issues', category: 'content' },
          
          // User permissions
          { id: 'users:view', name: 'View Users', description: 'Access to view user accounts', category: 'user' },
          { id: 'users:create', name: 'Create Users', description: 'Ability to create new user accounts', category: 'user' },
          { id: 'users:edit', name: 'Edit Users', description: 'Ability to modify user account details', category: 'user' },
          { id: 'users:delete', name: 'Delete Users', description: 'Ability to delete user accounts', category: 'user' },
          { id: 'users:assign_roles', name: 'Assign Roles', description: 'Ability to assign roles to users', category: 'user' },
          
          // System permissions
          { id: 'system:settings', name: 'Manage Settings', description: 'Access to system settings and configuration', category: 'system' },
          { id: 'system:roles', name: 'Manage Roles', description: 'Ability to create and manage roles', category: 'system' },
          { id: 'system:logs', name: 'View Logs', description: 'Access to system logs and activity history', category: 'system' },
          { id: 'system:backup', name: 'Backup & Restore', description: 'Ability to create and restore backups', category: 'system' },
          { id: 'system:maintenance', name: 'System Maintenance', description: 'Access to maintenance functions', category: 'system' },
          
          // Analytics permissions
          { id: 'analytics:view', name: 'View Analytics', description: 'Access to view analytics data', category: 'analytics' },
          { id: 'analytics:export', name: 'Export Analytics', description: 'Ability to export analytics data', category: 'analytics' },
          { id: 'analytics:reports', name: 'Generate Reports', description: 'Ability to create custom reports', category: 'analytics' }
        ];
        
        const mockRoles: Role[] = [
          {
            id: 'admin',
            name: 'Administrator',
            description: 'Full access to all system features and functions',
            isSystem: true,
            permissions: mockPermissions.map(p => p.id),
            userCount: 3,
            createdAt: '2025-01-01T00:00:00Z'
          },
          {
            id: 'teacher',
            name: 'Teacher',
            description: 'Access to educational content and limited user management',
            isSystem: true,
            permissions: [
              'content:view', 'content:create', 'content:edit',
              'users:view', 'analytics:view'
            ],
            userCount: 215,
            createdAt: '2025-01-01T00:00:00Z'
          },
          {
            id: 'school',
            name: 'School Administrator',
            description: 'Manage school accounts and teachers',
            isSystem: true,
            permissions: [
              'content:view', 
              'users:view', 'users:create', 'users:edit',
              'analytics:view', 'analytics:reports'
            ],
            userCount: 43,
            createdAt: '2025-01-01T00:00:00Z'
          },
          {
            id: 'content_manager',
            name: 'Content Manager',
            description: 'Create and manage all educational content',
            isSystem: false,
            permissions: [
              'content:view', 'content:create', 'content:edit', 'content:delete', 'content:publish', 'content:review',
              'analytics:view'
            ],
            userCount: 8,
            createdAt: '2025-02-15T10:30:00Z',
            updatedAt: '2025-03-10T14:45:00Z'
          },
          {
            id: 'reviewer',
            name: 'Content Reviewer',
            description: 'Review and moderate educational content',
            isSystem: false,
            permissions: [
              'content:view', 'content:edit', 'content:review',
              'analytics:view'
            ],
            userCount: 12,
            createdAt: '2025-02-20T09:15:00Z',
            updatedAt: '2025-04-05T11:20:00Z'
          }
        ];
        
        // Group permissions by category
        const permissionGroups = mockPermissions.reduce((groups, permission) => {
          if (!groups[permission.category]) {
            groups[permission.category] = [];
          }
          groups[permission.category].push(permission);
          return groups;
        }, {} as PermissionsByCategory);
        
        setRoles(mockRoles);
        setPermissions(mockPermissions);
        setPermissionsByCategory(permissionGroups);
      } catch (err) {
        console.error("Error fetching roles and permissions:", err);
        setError("Failed to load roles and permissions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchRolesAndPermissions();
  }, []);

  // Filter roles based on search
  const filteredRoles = roles.filter(role => 
    role.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    role.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get role with full permission details
  const getRoleWithPermissions = (role: Role): RoleWithPermissions => {
    const permissionDetails = permissions.filter(p => role.permissions.includes(p.id));
    return { ...role, permissionDetails };
  };

  // Handle opening role dialog
  const handleAddRole = () => {
    setSelectedRole(null);
    setRoleName("");
    setRoleDescription("");
    setSelectedPermissions([]);
    setFormErrors({});
    setIsRoleDialogOpen(true);
  };

  // Handle editing a role
  const handleEditRole = (role: Role) => {
    setSelectedRole(role);
    setRoleName(role.name);
    setRoleDescription(role.description);
    setSelectedPermissions([...role.permissions]);
    setFormErrors({});
    setIsRoleDialogOpen(true);
  };

  // Handle opening delete dialog
  const handleDeleteClick = (role: Role) => {
    setSelectedRole(role);
    setIsDeleteDialogOpen(true);
  };

  // Toggle a permission for the current role being edited
  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(prev => {
      if (prev.includes(permissionId)) {
        return prev.filter(id => id !== permissionId);
      } else {
        return [...prev, permissionId];
      }
    });
  };

  // Toggle all permissions in a category
  const toggleCategoryPermissions = (category: string, categoryPermissions: Permission[]) => {
    const categoryPermissionIds = categoryPermissions.map(p => p.id);
    const allSelected = categoryPermissionIds.every(id => selectedPermissions.includes(id));
    
    if (allSelected) {
      // Remove all permissions in this category
      setSelectedPermissions(prev => prev.filter(id => !categoryPermissionIds.includes(id)));
    } else {
      // Add all permissions in this category that aren't already selected
      setSelectedPermissions(prev => {
        const newPermissions = categoryPermissionIds.filter(id => !prev.includes(id));
        return [...prev, ...newPermissions];
      });
    }
  };

  // Validate role form
  const validateRoleForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!roleName.trim()) {
      errors.name = "Role name is required";
    } else if (roleName.trim().length < 3) {
      errors.name = "Role name must be at least 3 characters";
    }
    
    if (!roleDescription.trim()) {
      errors.description = "Role description is required";
    }
    
    if (selectedPermissions.length === 0) {
      errors.permissions = "At least one permission must be selected";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle saving a role
  const handleSaveRole = async () => {
    if (!validateRoleForm()) {
      return;
    }
    
    try {
      const roleData = {
        name: roleName,
        description: roleDescription,
        permissions: selectedPermissions,
      };
      
      // Mock API call for development
      // const response = await fetch(selectedRole ? `/api/admin/roles/${selectedRole.id}` : '/api/admin/roles', {
      //   method: selectedRole ? 'PUT' : 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(roleData)
      // });
      
      if (selectedRole) {
        // Update existing role
        const updatedRole = {
          ...selectedRole,
          name: roleName,
          description: roleDescription,
          permissions: selectedPermissions,
          updatedAt: new Date().toISOString()
        };
        
        setRoles(prevRoles => 
          prevRoles.map(r => r.id === selectedRole.id ? updatedRole : r)
        );
        
        toast({
          title: "Role Updated",
          description: `The role "${roleName}" has been updated successfully.`,
        });
      } else {
        // Create new role
        const newRole: Role = {
          id: `role_${Date.now()}`,
          name: roleName,
          description: roleDescription,
          isSystem: false,
          permissions: selectedPermissions,
          userCount: 0,
          createdAt: new Date().toISOString()
        };
        
        setRoles(prevRoles => [...prevRoles, newRole]);
        
        toast({
          title: "Role Created",
          description: `The role "${roleName}" has been created successfully.`,
        });
      }
      
      setIsRoleDialogOpen(false);
    } catch (err) {
      console.error("Error saving role:", err);
      toast({
        title: "Error",
        description: "Failed to save role. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting a role
  const handleDeleteRole = async () => {
    if (!selectedRole) return;
    
    try {
      // Mock API call for development
      // const response = await fetch(`/api/admin/roles/${selectedRole.id}`, {
      //   method: 'DELETE'
      // });
      
      setRoles(prevRoles => prevRoles.filter(r => r.id !== selectedRole.id));
      
      toast({
        title: "Role Deleted",
        description: `The role "${selectedRole.name}" has been deleted successfully.`,
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedRole(null);
    } catch (err) {
      console.error("Error deleting role:", err);
      toast({
        title: "Error",
        description: "Failed to delete role. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Format date display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Check if all permissions in a category are selected
  const areCategoryPermissionsSelected = (categoryPermissions: Permission[]) => {
    return categoryPermissions.every(p => selectedPermissions.includes(p.id));
  };

  // Check if some but not all permissions in a category are selected
  const areSomeCategoryPermissionsSelected = (categoryPermissions: Permission[]) => {
    return categoryPermissions.some(p => selectedPermissions.includes(p.id)) && 
           !categoryPermissions.every(p => selectedPermissions.includes(p.id));
  };

  // Render loading state
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

  // Render error state
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-center h-96">
              <div className="text-red-500 text-lg mb-4">{error}</div>
              <Button onClick={() => window.location.reload()}>Retry</Button>
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
              <CardTitle className="text-2xl font-bold flex items-center">
                <ShieldCheck className="mr-2 h-5 w-5" /> Access Roles & Permissions
              </CardTitle>
              <CardDescription>
                Manage user roles and permission sets
              </CardDescription>
            </div>
            <div>
              <Button onClick={handleAddRole} className="bg-blue-600 hover:bg-blue-700">
                <UserPlus className="mr-2 h-4 w-4" /> Add New Role
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="roles">Roles</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>
            
            {/* Roles Tab */}
            <TabsContent value="roles" className="space-y-4">
              <div className="flex justify-between items-center">
                <div className="relative w-full max-w-sm">
                  <Input
                    placeholder="Search roles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  {filteredRoles.length} role{filteredRoles.length !== 1 ? 's' : ''}
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Role Name</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Users</TableHead>
                      <TableHead>Permissions</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRoles.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-10 text-gray-500">
                          No roles found
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRoles.map((role) => (
                        <TableRow key={role.id} className={role.isSystem ? "bg-slate-50" : ""}>
                          <TableCell className="font-medium flex items-center">
                            {role.name}
                            {role.isSystem && (
                              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200">
                                System
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{role.description}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Users className="h-4 w-4 mr-2 text-gray-400" />
                              {role.userCount}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-16 bg-gray-200 rounded-full h-2.5">
                                <div
                                  className="bg-blue-600 h-2.5 rounded-full"
                                  style={{ width: `${(role.permissions.length / permissions.length) * 100}%` }}
                                ></div>
                              </div>
                              <span className="ml-2 text-xs text-gray-500">
                                {role.permissions.length}/{permissions.length}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>{formatDate(role.createdAt)}</div>
                            {role.updatedAt && (
                              <div className="text-xs text-gray-500">
                                Updated: {formatDate(role.updatedAt)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleEditRole(role)}
                              disabled={role.isSystem}
                              className="h-8 w-8 p-0 mr-1"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(role)}
                              disabled={role.isSystem || role.userCount > 0}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
              
              {filteredRoles.length > 0 && (
                <div className="text-xs text-gray-500 mt-2">
                  * System roles cannot be edited or deleted.
                </div>
              )}
            </TabsContent>
            
            {/* Permissions Tab */}
            <TabsContent value="permissions" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                  <Card key={category}>
                    <CardHeader className="pb-2">
                      <CardTitle className="capitalize text-lg">{category} Permissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {categoryPermissions.map((permission) => (
                          <div key={permission.id} className="flex flex-col space-y-1">
                            <div className="flex items-center justify-between">
                              <Label className="font-medium">{permission.name}</Label>
                              <div className="flex justify-end space-x-2">
                                {roles.filter(r => r.permissions.includes(permission.id)).length > 0 ? (
                                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                    {roles.filter(r => r.permissions.includes(permission.id)).length} roles
                                  </Badge>
                                ) : (
                                  <Badge variant="outline" className="bg-gray-50 text-gray-500 border-gray-200">
                                    Unused
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-500">{permission.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Add/Edit Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md md:max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {selectedRole ? `Edit Role: ${selectedRole.name}` : 'Create New Role'}
            </DialogTitle>
            <DialogDescription>
              {selectedRole
                ? 'Update the role details and permissions below.'
                : 'Define a new role with specific permissions.'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role-name">Role Name</Label>
                <Input
                  id="role-name"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g., Content Manager"
                  disabled={selectedRole?.isSystem}
                />
                {formErrors.name && (
                  <p className="text-sm text-red-500">{formErrors.name}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="role-description">Description</Label>
                <Input
                  id="role-description"
                  value={roleDescription}
                  onChange={(e) => setRoleDescription(e.target.value)}
                  placeholder="e.g., Manages all educational content"
                  disabled={selectedRole?.isSystem}
                />
                {formErrors.description && (
                  <p className="text-sm text-red-500">{formErrors.description}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-4">
              <Label>Permissions</Label>
              {formErrors.permissions && (
                <p className="text-sm text-red-500">{formErrors.permissions}</p>
              )}
              
              {Object.entries(permissionsByCategory).map(([category, categoryPermissions]) => (
                <div key={category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium capitalize">{category}</h3>
                    <div className="flex items-center">
                      <Label
                        htmlFor={`select-all-${category}`}
                        className="mr-2 text-xs cursor-pointer"
                      >
                        Select All
                      </Label>
                      <Checkbox
                        id={`select-all-${category}`}
                        checked={areCategoryPermissionsSelected(categoryPermissions)}
                        // Indeterminate state handled via CSS when needed
                        data-indeterminate={areSomeCategoryPermissionsSelected(categoryPermissions)}
                        onCheckedChange={() => toggleCategoryPermissions(category, categoryPermissions)}
                        disabled={selectedRole?.isSystem}
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {categoryPermissions.map((permission) => (
                      <div
                        key={permission.id}
                        className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-50"
                      >
                        <Checkbox
                          id={permission.id}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                          disabled={selectedRole?.isSystem}
                        />
                        <div className="grid gap-0.5">
                          <Label
                            htmlFor={permission.id}
                            className="text-sm font-medium leading-none cursor-pointer"
                          >
                            {permission.name}
                          </Label>
                          <p className="text-xs text-gray-500">{permission.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRoleDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveRole}
              disabled={selectedRole?.isSystem}
            >
              {selectedRole ? 'Update Role' : 'Create Role'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the role "{selectedRole?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteRole}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AccessRolesPage;