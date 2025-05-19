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
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

// Icons
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  Flag,
  BarChart,
  ShieldCheck,
  Bell,
  MessageSquare,
  CreditCard,
  PlusCircle,
  ChevronRight
} from "lucide-react";

// Admin Dashboard with direct access check
export default function AdminDashboard() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  
  // Verify admin access
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
          return;
        }
        
        const data = await res.json();
        if (data.user) {
          setAdminUser(data.user);
          // Store in session for future use
          sessionStorage.setItem('adminUser', JSON.stringify(data.user));
        }
      } catch (error) {
        console.error("Error checking admin access:", error);
        navigate('/admin');
      } finally {
        setLoading(false);
      }
    };
    
    checkAdminAccess();
  }, [navigate]);
  
  // Admin menu items
  const menuItems = [
    { 
      title: "Content Management", 
      description: "Manage books, units, and educational content",
      items: [
        { name: "Books", icon: <BookOpen className="h-4 w-4" />, link: "/admin/books" },
        { name: "Flagged Content", icon: <Flag className="h-4 w-4" />, link: "/admin/flagged" }
      ]
    },
    { 
      title: "User Management", 
      description: "Manage users, roles, and permissions",
      items: [
        { name: "Users", icon: <Users className="h-4 w-4" />, link: "/admin/users" },
        { name: "Access Roles", icon: <ShieldCheck className="h-4 w-4" />, link: "/admin/roles" }
      ]
    },
    { 
      title: "Communications", 
      description: "Manage notifications and messages",
      items: [
        { name: "Broadcast Messages", icon: <Bell className="h-4 w-4" />, link: "/admin/broadcast" },
        { name: "Feedback", icon: <MessageSquare className="h-4 w-4" />, link: "/admin/feedback" }
      ]
    },
    { 
      title: "Analytics & Reporting", 
      description: "View analytics and generate reports",
      items: [
        { name: "Analytics Dashboard", icon: <BarChart className="h-4 w-4" />, link: "/admin/analytics" },
        { name: "Payment History", icon: <CreditCard className="h-4 w-4" />, link: "/admin/payments" }
      ]
    },
    { 
      title: "System", 
      description: "System settings and configurations",
      items: [
        { name: "Site Settings", icon: <Settings className="h-4 w-4" />, link: "/admin/settings" }
      ]
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!adminUser) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center pt-6 pb-6">
            <div className="text-xl font-semibold mb-2">Admin Access Required</div>
            <p className="text-muted-foreground mb-4">You need admin privileges to access this page.</p>
            <button 
              onClick={() => navigate('/login')} 
              className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
            >
              Log In
            </button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mb-6">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <LayoutDashboard className="mr-2 h-5 w-5" /> Admin Dashboard
              </CardTitle>
              <CardDescription>
                Manage content, users, and system settings
              </CardDescription>
            </div>
            <div className="text-sm text-muted-foreground">
              Logged in as <span className="font-semibold">{adminUser.username}</span>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((section, i) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription className="text-xs">
                    {section.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="space-y-2">
                    {section.items.map((item, j) => (
                      <button
                        key={j}
                        onClick={() => navigate(item.link)}
                        className="w-full flex items-center justify-between p-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <div className="flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.name}</span>
                        </div>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="content">
          <Card>
            <CardHeader>
              <CardTitle>Content Management</CardTitle>
              <CardDescription>Manage books, units, and educational content</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/books')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <BookOpen className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Manage Books</h3>
                        <p className="text-sm text-muted-foreground">Add, edit and organize books</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/flagged')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <Flag className="h-8 w-8 mr-4 text-red-500" />
                      <div>
                        <h3 className="font-medium">Flagged Content</h3>
                        <p className="text-sm text-muted-foreground">Review and resolve reported content</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage users, roles, and permissions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/users')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <Users className="h-8 w-8 mr-4 text-primary" />
                      <div>
                        <h3 className="font-medium">Manage Users</h3>
                        <p className="text-sm text-muted-foreground">Add, edit and manage user accounts</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/roles')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <ShieldCheck className="h-8 w-8 mr-4 text-indigo-500" />
                      <div>
                        <h3 className="font-medium">Access Roles</h3>
                        <p className="text-sm text-muted-foreground">Manage roles and permissions</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure system settings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/settings')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <Settings className="h-8 w-8 mr-4 text-gray-500" />
                      <div>
                        <h3 className="font-medium">Site Settings</h3>
                        <p className="text-sm text-muted-foreground">Configure global site settings</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
                
                <Card className="border-dashed border cursor-pointer hover:border-primary transition-colors" 
                      onClick={() => navigate('/admin/analytics')}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center">
                      <BarChart className="h-8 w-8 mr-4 text-blue-500" />
                      <div>
                        <h3 className="font-medium">Analytics</h3>
                        <p className="text-sm text-muted-foreground">View usage statistics and reports</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}