import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import {
  User,
  Clock,
  MapPin,
  Calendar,
  Lock,
  Unlock,
  ShieldAlert,
  ShieldCheck,
  RefreshCw,
  X,
  Mail,
  Activity,
  AlertTriangle,
  Globe,
  Search,
  Filter,
  LogIn,
  LogOut,
  Laptop,
  Smartphone,
  Tablet,
  Database,
  Eye
} from "lucide-react";

// Define types
type LoginEvent = {
  id: string;
  userId: string;
  username: string;
  userRole: string;
  eventType: 'login' | 'logout' | 'failed_login' | 'password_reset' | 'account_locked';
  timestamp: string;
  ipAddress: string;
  location?: string;
  userAgent: string;
  deviceType: 'desktop' | 'mobile' | 'tablet' | 'unknown';
  browser: string;
  os: string;
  status: 'success' | 'failed' | 'suspicious';
  details?: string;
};

type UserAuthStatus = {
  id: string;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  isLocked: boolean;
  isSuspended: boolean;
  authMethod: 'password' | 'google' | 'oauth' | 'replit';
  lastLogin?: string;
  lastLoginIp?: string;
  lastLoginLocation?: string;
  failedLoginAttempts: number;
  passwordLastChanged?: string | null;
  requiresPasswordReset: boolean;
  twoFactorEnabled: boolean;
  totalLogins: number;
};

const AuthenticationManagementPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State for data
  const [loginEvents, setLoginEvents] = useState<LoginEvent[]>([]);
  const [userAuthStatuses, setUserAuthStatuses] = useState<UserAuthStatus[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAuthStatus | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<LoginEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [activeTab, setActiveTab] = useState<string>("logins");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [eventTypeFilter, setEventTypeFilter] = useState<string | null>(null);
  const [dateRangeFilter, setDateRangeFilter] = useState<string>("all");
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [isSuspendDialogOpen, setIsSuspendDialogOpen] = useState(false);
  const [isEventDetailsOpen, setIsEventDetailsOpen] = useState(false);
  
  // Load data
  useEffect(() => {
    const fetchAuthData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, these would be API calls
        // const loginEventsResponse = await fetch('/api/admin/auth/events');
        // const userStatusesResponse = await fetch('/api/admin/auth/user-statuses');
        
        // Mock data for development
        const mockLoginEvents: LoginEvent[] = [
          {
            id: "event_1",
            userId: "user_1",
            username: "emma.johnson",
            userRole: "teacher",
            eventType: "login",
            timestamp: "2025-05-19T09:30:00Z",
            ipAddress: "192.168.1.105",
            location: "Warsaw, Poland",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            deviceType: "desktop",
            browser: "Chrome",
            os: "Windows",
            status: "success"
          },
          {
            id: "event_2",
            userId: "user_2",
            username: "michael.smith",
            userRole: "teacher",
            eventType: "login",
            timestamp: "2025-05-19T10:15:00Z",
            ipAddress: "172.16.254.1",
            location: "Krakow, Poland",
            userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1",
            deviceType: "mobile",
            browser: "Safari",
            os: "iOS",
            status: "success"
          },
          {
            id: "event_3",
            userId: "user_1",
            username: "emma.johnson",
            userRole: "teacher",
            eventType: "logout",
            timestamp: "2025-05-19T12:45:00Z",
            ipAddress: "192.168.1.105",
            location: "Warsaw, Poland",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            deviceType: "desktop",
            browser: "Chrome",
            os: "Windows",
            status: "success"
          },
          {
            id: "event_4",
            userId: "user_3",
            username: "sarah.williams",
            userRole: "teacher",
            eventType: "failed_login",
            timestamp: "2025-05-19T11:05:00Z",
            ipAddress: "85.203.12.45",
            location: "Gdansk, Poland",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15",
            deviceType: "desktop",
            browser: "Safari",
            os: "macOS",
            status: "failed",
            details: "Incorrect password"
          },
          {
            id: "event_5",
            userId: "user_4",
            username: "robert.chen",
            userRole: "teacher",
            eventType: "login",
            timestamp: "2025-05-19T08:20:00Z",
            ipAddress: "77.111.246.78",
            location: "Wroclaw, Poland",
            userAgent: "Mozilla/5.0 (iPad; CPU OS 16_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/120.0.0.0 Mobile/15E148 Safari/604.1",
            deviceType: "tablet",
            browser: "Chrome",
            os: "iOS",
            status: "success"
          },
          {
            id: "event_6",
            userId: "user_5",
            username: "lisa.parker",
            userRole: "teacher",
            eventType: "failed_login",
            timestamp: "2025-05-19T14:30:00Z",
            ipAddress: "88.156.136.42",
            location: "Lodz, Poland",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            deviceType: "desktop",
            browser: "Chrome",
            os: "Windows",
            status: "suspicious",
            details: "Login attempt from new location"
          },
          {
            id: "event_7",
            userId: "user_5",
            username: "lisa.parker",
            userRole: "teacher",
            eventType: "failed_login",
            timestamp: "2025-05-19T14:31:00Z",
            ipAddress: "88.156.136.42",
            location: "Lodz, Poland",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            deviceType: "desktop",
            browser: "Chrome",
            os: "Windows",
            status: "failed",
            details: "Incorrect password"
          },
          {
            id: "event_8",
            userId: "user_5",
            username: "lisa.parker",
            userRole: "teacher",
            eventType: "account_locked",
            timestamp: "2025-05-19T14:32:00Z",
            ipAddress: "88.156.136.42",
            location: "Lodz, Poland",
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            deviceType: "desktop",
            browser: "Chrome",
            os: "Windows",
            status: "failed",
            details: "Account locked after 3 failed login attempts"
          },
          {
            id: "event_9",
            userId: "user_3",
            username: "sarah.williams",
            userRole: "teacher",
            eventType: "password_reset",
            timestamp: "2025-05-19T11:30:00Z",
            ipAddress: "85.203.12.45",
            location: "Gdansk, Poland",
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15",
            deviceType: "desktop",
            browser: "Safari",
            os: "macOS",
            status: "success",
            details: "Password reset by user"
          },
          {
            id: "event_10",
            userId: "user_6",
            username: "james.wilson",
            userRole: "teacher",
            eventType: "login",
            timestamp: "2025-05-18T16:45:00Z",
            ipAddress: "91.227.43.84",
            location: "Poznan, Poland",
            userAgent: "Mozilla/5.0 (Linux; Android 13; SM-S908B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Mobile Safari/537.36",
            deviceType: "mobile",
            browser: "Chrome",
            os: "Android",
            status: "success"
          }
        ];
        
        const mockUserStatuses: UserAuthStatus[] = [
          {
            id: "user_1",
            username: "emma.johnson",
            email: "emma.j@school.edu",
            role: "teacher",
            isActive: true,
            isLocked: false,
            isSuspended: false,
            authMethod: "password",
            lastLogin: "2025-05-19T09:30:00Z",
            lastLoginIp: "192.168.1.105",
            lastLoginLocation: "Warsaw, Poland",
            failedLoginAttempts: 0,
            passwordLastChanged: "2025-04-15T14:20:00Z",
            requiresPasswordReset: false,
            twoFactorEnabled: true,
            totalLogins: 152
          },
          {
            id: "user_2",
            username: "michael.smith",
            email: "m.smith@academy.edu",
            role: "teacher",
            isActive: true,
            isLocked: false,
            isSuspended: false,
            authMethod: "google",
            lastLogin: "2025-05-19T10:15:00Z",
            lastLoginIp: "172.16.254.1",
            lastLoginLocation: "Krakow, Poland",
            failedLoginAttempts: 0,
            passwordLastChanged: "",
            requiresPasswordReset: false,
            twoFactorEnabled: false,
            totalLogins: 87
          },
          {
            id: "user_3",
            username: "sarah.williams",
            email: "s.williams@school.edu",
            role: "teacher",
            isActive: true,
            isLocked: false,
            isSuspended: false,
            authMethod: "password",
            lastLogin: "2025-05-19T11:30:00Z",
            lastLoginIp: "85.203.12.45",
            lastLoginLocation: "Gdansk, Poland",
            failedLoginAttempts: 1,
            passwordLastChanged: "2025-05-19T11:30:00Z",
            requiresPasswordReset: false,
            twoFactorEnabled: false,
            totalLogins: 64
          },
          {
            id: "user_4",
            username: "robert.chen",
            email: "r.chen@academy.edu",
            role: "teacher",
            isActive: true,
            isLocked: false,
            isSuspended: false,
            authMethod: "oauth",
            lastLogin: "2025-05-19T08:20:00Z",
            lastLoginIp: "77.111.246.78",
            lastLoginLocation: "Wroclaw, Poland",
            failedLoginAttempts: 0,
            passwordLastChanged: "",
            requiresPasswordReset: false,
            twoFactorEnabled: true,
            totalLogins: 43
          },
          {
            id: "user_5",
            username: "lisa.parker",
            email: "l.parker@school.edu",
            role: "teacher",
            isActive: true,
            isLocked: true,
            isSuspended: false,
            authMethod: "password",
            lastLogin: "2025-05-18T10:45:00Z",
            lastLoginIp: "88.156.136.42",
            lastLoginLocation: "Lodz, Poland",
            failedLoginAttempts: 3,
            passwordLastChanged: "2025-03-20T09:15:00Z",
            requiresPasswordReset: false,
            twoFactorEnabled: false,
            totalLogins: 98
          },
          {
            id: "user_6",
            username: "james.wilson",
            email: "j.wilson@academy.edu",
            role: "teacher",
            isActive: true,
            isLocked: false,
            isSuspended: false,
            authMethod: "replit",
            lastLogin: "2025-05-18T16:45:00Z",
            lastLoginIp: "91.227.43.84",
            lastLoginLocation: "Poznan, Poland",
            failedLoginAttempts: 0,
            passwordLastChanged: "",
            requiresPasswordReset: false,
            twoFactorEnabled: true,
            totalLogins: 32
          },
          {
            id: "user_7",
            username: "david.thompson",
            email: "d.thompson@school.edu",
            role: "teacher",
            isActive: false,
            isLocked: false,
            isSuspended: true,
            authMethod: "password",
            lastLogin: "2025-05-12T14:30:00Z",
            lastLoginIp: "192.168.10.45",
            lastLoginLocation: "Warsaw, Poland",
            failedLoginAttempts: 0,
            passwordLastChanged: "2025-02-10T11:20:00Z",
            requiresPasswordReset: true,
            twoFactorEnabled: false,
            totalLogins: 75
          }
        ];
        
        // Sort login events by timestamp (newest first)
        mockLoginEvents.sort((a, b) => 
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
        );
        
        setLoginEvents(mockLoginEvents);
        setUserAuthStatuses(mockUserStatuses);
      } catch (err) {
        console.error("Error fetching authentication data:", err);
        setError("Failed to load authentication data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchAuthData();
  }, []);

  // Filter login events
  const getFilteredEvents = () => {
    return loginEvents.filter(event => {
      // Filter by event type
      if (eventTypeFilter && event.eventType !== eventTypeFilter) {
        return false;
      }
      
      // Filter by status
      if (statusFilter && event.status !== statusFilter) {
        return false;
      }
      
      // Filter by date range
      if (dateRangeFilter !== 'all') {
        const eventDate = new Date(event.timestamp);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);
        const lastMonth = new Date(today);
        lastMonth.setMonth(lastMonth.getMonth() - 1);
        
        if (
          (dateRangeFilter === 'today' && eventDate.toDateString() !== today.toDateString()) ||
          (dateRangeFilter === 'yesterday' && eventDate.toDateString() !== yesterday.toDateString()) ||
          (dateRangeFilter === 'last7days' && eventDate < lastWeek) ||
          (dateRangeFilter === 'last30days' && eventDate < lastMonth)
        ) {
          return false;
        }
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          event.username.toLowerCase().includes(query) ||
          event.ipAddress.includes(query) ||
          (event.location && event.location.toLowerCase().includes(query)) ||
          event.browser.toLowerCase().includes(query) ||
          event.os.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  // Filter user statuses
  const getFilteredUsers = () => {
    return userAuthStatuses.filter(user => {
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          user.username.toLowerCase().includes(query) ||
          user.email.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  const filteredEvents = getFilteredEvents();
  const filteredUsers = getFilteredUsers();

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Get time difference in human-readable format
  const getTimeDifference = (dateString: string) => {
    if (!dateString) return "";
    
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHrs = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHrs / 24);
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHrs > 0) {
      return `${diffHrs} hour${diffHrs > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return `${diffSec} second${diffSec !== 1 ? 's' : ''} ago`;
    }
  };

  // Handle viewing event details
  const handleViewEventDetails = (event: LoginEvent) => {
    setSelectedEvent(event);
    setIsEventDetailsOpen(true);
  };

  // Handle viewing user details
  const handleViewUserDetails = (user: UserAuthStatus) => {
    setSelectedUser(user);
    setIsUserDialogOpen(true);
  };

  // Handle resetting password
  const handleResetPassword = (user: UserAuthStatus) => {
    setSelectedUser(user);
    setIsResetDialogOpen(true);
  };

  // Confirm password reset
  const confirmResetPassword = async () => {
    if (!selectedUser) return;
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/auth/users/${selectedUser.id}/reset-password`, {
      //   method: 'POST'
      // });
      
      // Update user in local state
      const updatedUsers = userAuthStatuses.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            requiresPasswordReset: true,
            passwordLastChanged: new Date().toISOString()
          };
        }
        return user;
      });
      
      setUserAuthStatuses(updatedUsers);
      
      toast({
        title: "Password Reset",
        description: `Password reset initiated for ${selectedUser.username}. The user will be prompted to set a new password on next login.`,
      });
      
      setIsResetDialogOpen(false);
    } catch (err) {
      console.error("Error resetting password:", err);
      toast({
        title: "Error",
        description: "Failed to reset password. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle suspending/unsuspending user
  const handleToggleSuspend = (user: UserAuthStatus) => {
    setSelectedUser(user);
    setIsSuspendDialogOpen(true);
  };

  // Confirm suspend/unsuspend
  const confirmToggleSuspend = async () => {
    if (!selectedUser) return;
    
    try {
      const isSuspending = !selectedUser.isSuspended;
      
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/auth/users/${selectedUser.id}/${isSuspending ? 'suspend' : 'unsuspend'}`, {
      //   method: 'POST'
      // });
      
      // Update user in local state
      const updatedUsers = userAuthStatuses.map(user => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            isSuspended: isSuspending,
            isActive: !isSuspending
          };
        }
        return user;
      });
      
      setUserAuthStatuses(updatedUsers);
      
      toast({
        title: isSuspending ? "User Suspended" : "User Unsuspended",
        description: `${selectedUser.username} has been ${isSuspending ? 'suspended' : 'unsuspended'}.`,
      });
      
      setIsSuspendDialogOpen(false);
    } catch (err) {
      console.error("Error toggling suspension:", err);
      toast({
        title: "Error",
        description: `Failed to ${selectedUser.isSuspended ? 'unsuspend' : 'suspend'} user. Please try again.`,
        variant: "destructive",
      });
    }
  };

  // Handle unlocking account
  const handleUnlockAccount = async (user: UserAuthStatus) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/auth/users/${user.id}/unlock`, {
      //   method: 'POST'
      // });
      
      // Update user in local state
      const updatedUsers = userAuthStatuses.map(u => {
        if (u.id === user.id) {
          return {
            ...u,
            isLocked: false,
            failedLoginAttempts: 0
          };
        }
        return u;
      });
      
      setUserAuthStatuses(updatedUsers);
      
      toast({
        title: "Account Unlocked",
        description: `${user.username}'s account has been unlocked.`,
      });
    } catch (err) {
      console.error("Error unlocking account:", err);
      toast({
        title: "Error",
        description: "Failed to unlock account. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get event type badge
  const getEventTypeBadge = (eventType: string) => {
    switch (eventType) {
      case 'login':
        return <Badge className="bg-green-100 text-green-800"><LogIn className="h-3 w-3 mr-1" /> Login</Badge>;
      case 'logout':
        return <Badge className="bg-blue-100 text-blue-800"><LogOut className="h-3 w-3 mr-1" /> Logout</Badge>;
      case 'failed_login':
        return <Badge className="bg-red-100 text-red-800"><X className="h-3 w-3 mr-1" /> Failed Login</Badge>;
      case 'password_reset':
        return <Badge className="bg-purple-100 text-purple-800"><RefreshCw className="h-3 w-3 mr-1" /> Password Reset</Badge>;
      case 'account_locked':
        return <Badge className="bg-amber-100 text-amber-800"><Lock className="h-3 w-3 mr-1" /> Account Locked</Badge>;
      default:
        return <Badge>{eventType}</Badge>;
    }
  };

  // Get event status badge
  const getEventStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Success</Badge>;
      case 'failed':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Failed</Badge>;
      case 'suspicious':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Suspicious</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get device type icon
  const getDeviceTypeIcon = (deviceType: string) => {
    switch (deviceType) {
      case 'desktop':
        return <Laptop className="h-4 w-4" />;
      case 'mobile':
        return <Smartphone className="h-4 w-4" />;
      case 'tablet':
        return <Tablet className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  // Get user status badge
  const getUserStatusBadge = (user: UserAuthStatus) => {
    if (user.isSuspended) {
      return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
    } else if (user.isLocked) {
      return <Badge className="bg-amber-100 text-amber-800">Locked</Badge>;
    } else if (!user.isActive) {
      return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
    } else {
      return <Badge className="bg-green-100 text-green-800">Active</Badge>;
    }
  };

  // Get auth method badge
  const getAuthMethodBadge = (method: string) => {
    switch (method) {
      case 'password':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Lock className="h-3 w-3 mr-1" /> Password</Badge>;
      case 'google':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Google</Badge>;
      case 'oauth':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">OAuth</Badge>;
      case 'replit':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">Replit</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
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
                <Lock className="mr-2 h-5 w-5" /> Authentication Management
              </CardTitle>
              <CardDescription>
                Monitor login activity and manage user authentication
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList>
              <TabsTrigger value="logins">Login History</TabsTrigger>
              <TabsTrigger value="users">User Auth Status</TabsTrigger>
            </TabsList>
            
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <div className="relative w-full sm:w-64">
                <Input
                  placeholder={`Search ${activeTab === 'logins' ? 'login events' : 'users'}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              
              {activeTab === 'logins' && (
                <>
                  <Select value={eventTypeFilter || ''} onValueChange={(value) => setEventTypeFilter(value || null)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Events</SelectItem>
                      <SelectItem value="login">Login</SelectItem>
                      <SelectItem value="logout">Logout</SelectItem>
                      <SelectItem value="failed_login">Failed Login</SelectItem>
                      <SelectItem value="password_reset">Password Reset</SelectItem>
                      <SelectItem value="account_locked">Account Locked</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={statusFilter || ''} onValueChange={(value) => setStatusFilter(value || null)}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Statuses</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="suspicious">Suspicious</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Date Range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Time</SelectItem>
                      <SelectItem value="today">Today</SelectItem>
                      <SelectItem value="yesterday">Yesterday</SelectItem>
                      <SelectItem value="last7days">Last 7 Days</SelectItem>
                      <SelectItem value="last30days">Last 30 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </>
              )}
            </div>
            
            <TabsContent value="logins" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Event</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Device / Browser</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEvents.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No login events found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredEvents.map((event) => (
                        <TableRow 
                          key={event.id}
                          className={event.status === 'suspicious' ? "bg-yellow-50" : ""}
                        >
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {getEventTypeBadge(event.eventType)}
                              {getEventStatusBadge(event.status)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{event.username}</div>
                            <div className="text-xs text-muted-foreground">{event.userRole}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                              <span>{event.location || 'Unknown'}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">{event.ipAddress}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {getDeviceTypeIcon(event.deviceType)}
                              <span className="ml-1.5">{event.deviceType}</span>
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {event.browser} / {event.os}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div title={formatDate(event.timestamp)}>
                              {getTimeDifference(event.timestamp)}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(event.timestamp).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewEventDetails(event)}
                              className="h-8 w-8 p-0"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
            
            <TabsContent value="users" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Auth Method</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead>Security</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No users found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredUsers.map((user) => (
                        <TableRow 
                          key={user.id}
                          className={user.isLocked || user.isSuspended ? "bg-red-50" : user.failedLoginAttempts > 0 ? "bg-yellow-50" : ""}
                        >
                          <TableCell>
                            <div className="font-medium">{user.username}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </TableCell>
                          <TableCell>
                            {getUserStatusBadge(user)}
                            {user.failedLoginAttempts > 0 && (
                              <div className="mt-1 text-xs text-yellow-700">
                                {user.failedLoginAttempts} failed login attempts
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            {getAuthMethodBadge(user.authMethod)}
                          </TableCell>
                          <TableCell>
                            {user.lastLogin ? (
                              <>
                                <div title={formatDate(user.lastLogin)}>
                                  {getTimeDifference(user.lastLogin)}
                                </div>
                                <div className="text-xs text-muted-foreground flex items-center mt-1">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {user.lastLoginLocation || 'Unknown'}
                                </div>
                              </>
                            ) : (
                              <span className="text-muted-foreground">Never</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              {user.twoFactorEnabled ? (
                                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                                  <ShieldCheck className="h-3 w-3 mr-1" /> 2FA Enabled
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                                  <ShieldAlert className="h-3 w-3 mr-1" /> 2FA Disabled
                                </Badge>
                              )}
                            </div>
                            {user.passwordLastChanged && (
                              <div className="text-xs text-muted-foreground mt-1">
                                Password changed: {new Date(user.passwordLastChanged).toLocaleDateString()}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleViewUserDetails(user)}
                                className="h-8 w-8 p-0"
                                title="View Details"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {user.isLocked && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUnlockAccount(user)}
                                  className="h-8 w-8 p-0 text-amber-600"
                                  title="Unlock Account"
                                >
                                  <Unlock className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleResetPassword(user)}
                                className="h-8 w-8 p-0 text-blue-600"
                                title="Reset Password"
                              >
                                <RefreshCw className="h-4 w-4" />
                              </Button>
                              
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleToggleSuspend(user)}
                                className={`h-8 w-8 p-0 ${user.isSuspended ? "text-green-600" : "text-red-600"}`}
                                title={user.isSuspended ? "Unsuspend User" : "Suspend User"}
                              >
                                {user.isSuspended ? (
                                  <Activity className="h-4 w-4" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      {selectedEvent && (
        <Dialog open={isEventDetailsOpen} onOpenChange={setIsEventDetailsOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {getEventTypeBadge(selectedEvent.eventType)}
                <span className="ml-2">Event Details</span>
              </DialogTitle>
              <DialogDescription>
                {formatDate(selectedEvent.timestamp)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">User Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Username:</span>
                      <span className="text-sm font-medium">{selectedEvent.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">User ID:</span>
                      <span className="text-sm font-medium">{selectedEvent.userId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Role:</span>
                      <span className="text-sm font-medium">{selectedEvent.userRole}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Event Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Event Type:</span>
                      <span className="text-sm font-medium">{selectedEvent.eventType.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <span className="text-sm font-medium">{selectedEvent.status}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Timestamp:</span>
                      <span className="text-sm font-medium">{formatDate(selectedEvent.timestamp)}</span>
                    </div>
                    {selectedEvent.details && (
                      <div className="flex justify-between">
                        <span className="text-sm">Details:</span>
                        <span className="text-sm font-medium">{selectedEvent.details}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Location Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">IP Address:</span>
                      <span className="text-sm font-medium">{selectedEvent.ipAddress}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Location:</span>
                      <span className="text-sm font-medium">{selectedEvent.location || 'Unknown'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Device Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Device Type:</span>
                      <span className="text-sm font-medium">{selectedEvent.deviceType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Browser:</span>
                      <span className="text-sm font-medium">{selectedEvent.browser}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Operating System:</span>
                      <span className="text-sm font-medium">{selectedEvent.os}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">User Agent</h3>
                  <div className="bg-gray-50 p-2 rounded-md text-xs overflow-x-auto whitespace-nowrap">
                    {selectedEvent.userAgent}
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEventDetailsOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* User Details Dialog */}
      {selectedUser && (
        <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                User Authentication Details
              </DialogTitle>
              <DialogDescription>
                Authentication information for {selectedUser.username}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">User Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Username:</span>
                      <span className="text-sm font-medium">{selectedUser.username}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Email:</span>
                      <span className="text-sm font-medium">{selectedUser.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Role:</span>
                      <span className="text-sm font-medium">{selectedUser.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Status:</span>
                      <span className="text-sm font-medium">{getUserStatusBadge(selectedUser)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Authentication Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Auth Method:</span>
                      <span className="text-sm font-medium">{getAuthMethodBadge(selectedUser.authMethod)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Two-Factor Auth:</span>
                      <span className="text-sm font-medium">{selectedUser.twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Failed Login Attempts:</span>
                      <span className={`text-sm font-medium ${selectedUser.failedLoginAttempts > 0 ? 'text-yellow-600' : ''}`}>
                        {selectedUser.failedLoginAttempts}
                      </span>
                    </div>
                    {selectedUser.passwordLastChanged && (
                      <div className="flex justify-between">
                        <span className="text-sm">Password Last Changed:</span>
                        <span className="text-sm font-medium">{formatDate(selectedUser.passwordLastChanged)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-sm">Password Reset Required:</span>
                      <span className="text-sm font-medium">{selectedUser.requiresPasswordReset ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Login Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Total Logins:</span>
                      <span className="text-sm font-medium">{selectedUser.totalLogins}</span>
                    </div>
                    {selectedUser.lastLogin && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Login:</span>
                          <span className="text-sm font-medium">{formatDate(selectedUser.lastLogin)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Login IP:</span>
                          <span className="text-sm font-medium">{selectedUser.lastLoginIp}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Last Login Location:</span>
                          <span className="text-sm font-medium">{selectedUser.lastLoginLocation || 'Unknown'}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Actions</h3>
                  <div className="space-y-2">
                    {selectedUser.isLocked && (
                      <Button 
                        variant="outline"
                        className="w-full text-amber-600 border-amber-600 hover:bg-amber-50"
                        onClick={() => {
                          setIsUserDialogOpen(false);
                          handleUnlockAccount(selectedUser);
                        }}
                      >
                        <Unlock className="h-4 w-4 mr-2" />
                        Unlock Account
                      </Button>
                    )}
                    
                    <Button 
                      variant="outline"
                      className="w-full text-blue-600 border-blue-600 hover:bg-blue-50"
                      onClick={() => {
                        setIsUserDialogOpen(false);
                        handleResetPassword(selectedUser);
                      }}
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Reset Password
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className={`w-full ${selectedUser.isSuspended 
                        ? "text-green-600 border-green-600 hover:bg-green-50" 
                        : "text-red-600 border-red-600 hover:bg-red-50"}`}
                      onClick={() => {
                        setIsUserDialogOpen(false);
                        handleToggleSuspend(selectedUser);
                      }}
                    >
                      {selectedUser.isSuspended ? (
                        <>
                          <Activity className="h-4 w-4 mr-2" />
                          Unsuspend User
                        </>
                      ) : (
                        <>
                          <AlertTriangle className="h-4 w-4 mr-2" />
                          Suspend User
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsUserDialogOpen(false)}
              >
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Reset Password Confirmation Dialog */}
      <AlertDialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Password Reset</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to reset the password for <strong>{selectedUser?.username}</strong>? The user will be required to set a new password on their next login.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmResetPassword}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Reset Password
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Suspend User Confirmation Dialog */}
      <AlertDialog open={isSuspendDialogOpen} onOpenChange={setIsSuspendDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {selectedUser?.isSuspended ? 'Confirm Unsuspend User' : 'Confirm Suspend User'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {selectedUser?.isSuspended
                ? `Are you sure you want to unsuspend ${selectedUser?.username}? This will restore their access to the platform.`
                : `Are you sure you want to suspend ${selectedUser?.username}? This will prevent them from accessing the platform until unsuspended.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmToggleSuspend}
              className={selectedUser?.isSuspended ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}
            >
              {selectedUser?.isSuspended ? 'Unsuspend User' : 'Suspend User'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AuthenticationManagementPage;