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
import { Badge } from "@/components/ui/badge";
import { 
  ShieldCheck, 
  Edit,
  Trash2,
  Lock,
  Key,
  Shield
} from "lucide-react";

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
  
  // Role management states
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  
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
  
  // Handle opening role dialog
  const handleEditRole = (roleId: string) => {
    setSelectedRoleId(roleId);
    setSelectedPermissions(roleDefaultPermissions[roleId] || []);
    setIsRoleDialogOpen(true);
  };
  
  // Toggle permission selection
  const togglePermission = (permissionId: string) => {
    setSelectedPermissions(current => 
      current.includes(permissionId)
        ? current.filter(id => id !== permissionId)
        : [...current, permissionId]
    );
  };
  
  // Handle role form submission
  const handleRoleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRoleId) return;
    
    try {
      // In a real app, update via API
      // const response = await fetch(`/api/admin/roles/${selectedRoleId}`, {
      //   method: "PUT",
      //   headers: { "Content-Type": "application/json" },
      //   credentials: "include",
      //   body: JSON.stringify({ permissions: selectedPermissions }),
      // });
      
      // if (!response.ok) {
      //   throw new Error("Failed to update role permissions");
      // }
      
      // Mock update for development
      roleDefaultPermissions[selectedRoleId] = [...selectedPermissions];
      
      toast({
        title: "Success",
        description: `Permissions updated for ${roles.find(r => r.id === selectedRoleId)?.name || 'role'}`,
      });
      
      setIsRoleDialogOpen(false);
    } catch (error) {
      console.error("Failed to update role:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update role permissions",
        variant: "destructive",
      });
    }
  };
  
  // If admin user is not loaded yet, show loading
  if (!adminUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  return (
    <div className="container max-w-7xl mx-auto p-4">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => navigate("/admin")}
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 px-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back
                </Button>
                <CardTitle className="text-xl font-bold flex items-center">
                  <Shield className="mr-2 h-5 w-5" /> Access Roles Management
                </CardTitle>
              </div>
              <CardDescription>
                Manage roles and permissions for the Visual English platform
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-medium">Role Permissions</h3>
            </div>
            
            {/* Roles content */}
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
          </div>
        </CardContent>
      </Card>
      
      {/* Edit Role Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Role Permissions</DialogTitle>
            <DialogDescription>
              Modify the permissions for the {roles.find(r => r.id === selectedRoleId)?.name} role.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleRoleSubmit}>
            <div className="space-y-4 py-2">
              {Object.entries(permissionsByCategory).map(([category, perms]) => (
                <div key={category} className="space-y-2">
                  <h3 className="text-sm font-medium">{category}</h3>
                  <div className="border rounded-md p-3 space-y-2">
                    {perms.map((permission) => (
                      <div key={permission.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`permission-${permission.id}`}
                          checked={selectedPermissions.includes(permission.id)}
                          onCheckedChange={() => togglePermission(permission.id)}
                        />
                        <Label
                          htmlFor={`permission-${permission.id}`}
                          className="text-xs cursor-pointer"
                        >
                          {permission.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsRoleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-blue-600 hover:bg-blue-700">
                Save Changes
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CombinedUserRolesPage;