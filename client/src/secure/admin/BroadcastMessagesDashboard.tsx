import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  Calendar,
  Megaphone,
  Users,
  PlusCircle,
  X,
  Edit,
  Trash2,
  Eye,
  RefreshCw,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  Globe,
  School,
  GraduationCap,
  Send,
  Search,
  Filter,
  ChevronDown
} from "lucide-react";
import { Helmet } from "react-helmet";

// Define types
type MessageStatus = 'draft' | 'scheduled' | 'sent' | 'cancelled';

type BroadcastMessage = {
  id: string;
  title: string;
  content: string;
  status: MessageStatus;
  targetAudience: 'all' | 'teachers' | 'schools' | 'admins' | 'custom';
  targetGroups?: string[];
  createdBy: {
    id: string;
    name: string;
  };
  createdAt: string;
  scheduledFor?: string;
  sentAt?: string;
  deliveryCount?: number;
  readCount?: number;
  isPinned: boolean;
  expireAt?: string;
};

type UserGroup = {
  id: string;
  name: string;
  type: 'role' | 'school' | 'tag';
  count: number;
};

const BroadcastMessagesDashboard = () => {
  // Get admin user data directly from storage
  const [adminUser, setAdminUser] = useState<any>(null);
  
  // Effect to fetch user data
  useEffect(() => {
    const fetchAdminUser = async () => {
      try {
        // Try regular auth endpoint
        const res = await fetch('/api/user', { credentials: 'include' });
        if (res.ok) {
          const userData = await res.json();
          setAdminUser(userData);
          return;
        }
        
        // Fallback to stored data
        const storedUser = localStorage.getItem('velp_user');
        if (storedUser) {
          setAdminUser(JSON.parse(storedUser));
          return;
        }
      } catch (error) {
        console.error("Failed to get admin user:", error);
      }
    };
    
    fetchAdminUser();
  }, []);
  
  const { toast } = useToast();
  
  // State for data
  const [messages, setMessages] = useState<BroadcastMessage[]>([]);
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<BroadcastMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Form state
  const [messageTitle, setMessageTitle] = useState("");
  const [messageContent, setMessageContent] = useState("");
  const [messageAudience, setMessageAudience] = useState<string>("all");
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [schedulingEnabled, setSchedulingEnabled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [isPinned, setIsPinned] = useState(false);
  const [expiryEnabled, setExpiryEnabled] = useState(false);
  const [expiryDate, setExpiryDate] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  
  // Load broadcast messages and user groups
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real application, these would be API calls
        // const messagesResponse = await fetch('/api/admin/broadcast-messages');
        // const userGroupsResponse = await fetch('/api/admin/user-groups');
        
        // Mock data for development
        const mockMessages: BroadcastMessage[] = [
          {
            id: "msg_1",
            title: "New Content Update: Book 3 Materials",
            content: "We're excited to announce that all Book 3 materials have been updated with improved questions and answers. The updated content is now available on the platform.",
            status: "sent",
            targetAudience: "teachers",
            createdBy: {
              id: "admin_1",
              name: "Admin User"
            },
            createdAt: "2025-05-10T10:30:00Z",
            sentAt: "2025-05-10T14:00:00Z",
            deliveryCount: 215,
            readCount: 178,
            isPinned: true
          },
          {
            id: "msg_2",
            title: "System Maintenance Notice",
            content: "We will be performing system maintenance on Sunday, May 22nd from 2:00 AM to 5:00 AM. During this time, the platform may be temporarily unavailable.",
            status: "scheduled",
            targetAudience: "all",
            createdBy: {
              id: "admin_1",
              name: "Admin User"
            },
            createdAt: "2025-05-15T11:20:00Z",
            scheduledFor: "2025-05-20T08:00:00Z",
            isPinned: false
          },
          {
            id: "msg_3",
            title: "Summer School Program Resources",
            content: "Special summer school resources are now available for all teachers. Find them in the 'Summer Program' section of your dashboard.",
            status: "draft",
            targetAudience: "teachers",
            createdBy: {
              id: "admin_2",
              name: "Content Manager"
            },
            createdAt: "2025-05-17T09:45:00Z",
            isPinned: false
          },
          {
            id: "msg_4",
            title: "School Admin Features Update",
            content: "We've added new features for school administrators, including improved reporting tools and student progress tracking. Check out the 'What's New' section for details.",
            status: "sent",
            targetAudience: "schools",
            createdBy: {
              id: "admin_1",
              name: "Admin User"
            },
            createdAt: "2025-05-05T15:10:00Z",
            sentAt: "2025-05-05T16:30:00Z",
            deliveryCount: 43,
            readCount: 38,
            isPinned: false,
            expireAt: "2025-06-05T23:59:59Z"
          },
          {
            id: "msg_5",
            title: "New Q&A Reporting Feature",
            content: "Teachers can now report content issues directly from the Q&A display. This feature allows you to suggest improvements to questions and answers when you notice a problem.",
            status: "sent",
            targetAudience: "all",
            createdBy: {
              id: "admin_2",
              name: "Content Manager"
            },
            createdAt: "2025-05-12T13:25:00Z",
            sentAt: "2025-05-12T14:00:00Z",
            deliveryCount: 358,
            readCount: 295,
            isPinned: true
          },
          {
            id: "msg_6",
            title: "Feature Request Survey",
            content: "We value your input! Please take a moment to complete our feature request survey. Your feedback helps us improve the platform to better serve your needs.",
            status: "scheduled",
            targetAudience: "teachers",
            createdBy: {
              id: "admin_1",
              name: "Admin User"
            },
            createdAt: "2025-05-16T16:20:00Z",
            scheduledFor: "2025-05-23T09:00:00Z",
            isPinned: false
          },
          {
            id: "msg_7",
            title: "Cancelled: Platform Downtime",
            content: "The previously announced platform downtime for May 18th has been cancelled. The platform will remain operational without interruption.",
            status: "cancelled",
            targetAudience: "all",
            createdBy: {
              id: "admin_1",
              name: "Admin User"
            },
            createdAt: "2025-05-14T10:15:00Z",
            isPinned: false
          }
        ];
        
        const mockUserGroups: UserGroup[] = [
          { id: "role_teachers", name: "All Teachers", type: "role", count: 215 },
          { id: "role_schools", name: "School Administrators", type: "role", count: 43 },
          { id: "role_admins", name: "Platform Administrators", type: "role", count: 3 },
          { id: "school_warsaw", name: "Warsaw Schools", type: "school", count: 15 },
          { id: "school_krakow", name: "Krakow Schools", type: "school", count: 12 },
          { id: "school_gdansk", name: "Gdansk Schools", type: "school", count: 8 },
          { id: "tag_premium", name: "Premium Users", type: "tag", count: 124 },
          { id: "tag_trial", name: "Trial Users", type: "tag", count: 33 }
        ];
        
        setMessages(mockMessages);
        setUserGroups(mockUserGroups);
      } catch (err) {
        console.error("Error fetching broadcast data:", err);
        setError("Failed to load broadcast messages. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter messages based on tab and search
  const filteredMessages = messages.filter(message => {
    // Filter by tab (status)
    if (activeTab !== "all" && message.status !== activeTab) {
      return false;
    }
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        message.title.toLowerCase().includes(query) ||
        message.content.toLowerCase().includes(query)
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by created date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

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

  // Get counts by status
  const getCounts = () => {
    const counts = {
      all: messages.length,
      draft: messages.filter(m => m.status === 'draft').length,
      scheduled: messages.filter(m => m.status === 'scheduled').length,
      sent: messages.filter(m => m.status === 'sent').length,
      cancelled: messages.filter(m => m.status === 'cancelled').length
    };
    return counts;
  };

  const messageCounts = getCounts();

  // Handle create message
  const handleCreateMessage = () => {
    setSelectedMessage(null);
    setMessageTitle("");
    setMessageContent("");
    setMessageAudience("all");
    setSelectedGroups([]);
    setSchedulingEnabled(false);
    setScheduleDate("");
    setScheduleTime("");
    setIsPinned(false);
    setExpiryEnabled(false);
    setExpiryDate("");
    setFormErrors({});
    setIsMessageDialogOpen(true);
  };

  // Handle edit message
  const handleEditMessage = (message: BroadcastMessage) => {
    setSelectedMessage(message);
    setMessageTitle(message.title);
    setMessageContent(message.content);
    setMessageAudience(message.targetAudience);
    setSelectedGroups(message.targetGroups || []);
    
    if (message.scheduledFor) {
      setSchedulingEnabled(true);
      const scheduledDate = new Date(message.scheduledFor);
      setScheduleDate(scheduledDate.toISOString().split('T')[0]);
      setScheduleTime(scheduledDate.toTimeString().slice(0, 5));
    } else {
      setSchedulingEnabled(false);
      setScheduleDate("");
      setScheduleTime("");
    }
    
    setIsPinned(message.isPinned);
    
    if (message.expireAt) {
      setExpiryEnabled(true);
      const expiryDate = new Date(message.expireAt);
      setExpiryDate(expiryDate.toISOString().split('T')[0]);
    } else {
      setExpiryEnabled(false);
      setExpiryDate("");
    }
    
    setFormErrors({});
    setIsMessageDialogOpen(true);
  };

  // Handle preview message
  const handlePreviewMessage = (message: BroadcastMessage) => {
    setSelectedMessage(message);
    setIsPreviewDialogOpen(true);
  };

  // Handle delete message
  const handleDeleteClick = (message: BroadcastMessage) => {
    setSelectedMessage(message);
    setIsDeleteDialogOpen(true);
  };

  // Validate message form
  const validateMessageForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!messageTitle.trim()) {
      errors.title = "Message title is required";
    }
    
    if (!messageContent.trim()) {
      errors.content = "Message content is required";
    }
    
    if (messageAudience === "custom" && selectedGroups.length === 0) {
      errors.audience = "Please select at least one user group";
    }
    
    if (schedulingEnabled) {
      if (!scheduleDate) {
        errors.scheduleDate = "Schedule date is required";
      }
      
      if (!scheduleTime) {
        errors.scheduleTime = "Schedule time is required";
      }
      
      const scheduledDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      if (scheduledDateTime <= new Date()) {
        errors.schedule = "Schedule time must be in the future";
      }
    }
    
    if (expiryEnabled && !expiryDate) {
      errors.expiryDate = "Expiry date is required";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle save message
  const handleSaveMessage = async () => {
    if (!validateMessageForm()) {
      return;
    }
    
    try {
      const isNew = !selectedMessage;
      
      // Prepare scheduled date if enabled
      let scheduledFor = undefined;
      if (schedulingEnabled && scheduleDate && scheduleTime) {
        scheduledFor = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
      }
      
      // Prepare expiry date if enabled
      let expireAt = undefined;
      if (expiryEnabled && expiryDate) {
        expireAt = new Date(`${expiryDate}T23:59:59`).toISOString();
      }
      
      // Determine status
      let status: MessageStatus = 'draft';
      if (selectedMessage?.status === 'sent') {
        status = 'sent';
      } else if (schedulingEnabled) {
        status = 'scheduled';
      }
      
      // Prepare message data
      const messageData = {
        title: messageTitle,
        content: messageContent,
        targetAudience: messageAudience,
        targetGroups: messageAudience === 'custom' ? selectedGroups : undefined,
        status,
        scheduledFor,
        isPinned,
        expireAt
      };
      
      // In a real app, this would be an API call
      // const response = await fetch(
      //   isNew ? '/api/admin/broadcast-messages' : `/api/admin/broadcast-messages/${selectedMessage.id}`,
      //   {
      //     method: isNew ? 'POST' : 'PUT',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(messageData)
      //   }
      // );
      
      if (isNew) {
        // Create new message
        const newMessage: BroadcastMessage = {
          id: `msg_${Date.now()}`,
          title: messageTitle,
          content: messageContent,
          status,
          targetAudience: messageAudience as any,
          targetGroups: messageAudience === 'custom' ? selectedGroups : undefined,
          createdBy: {
            id: adminUser?.id?.toString() || 'admin_1',
            name: adminUser?.username || 'Admin User'
          },
          createdAt: new Date().toISOString(),
          scheduledFor,
          isPinned,
          expireAt
        };
        
        setMessages(prev => [newMessage, ...prev]);
        
        toast({
          title: "Message Created",
          description: schedulingEnabled 
            ? "Message has been scheduled successfully." 
            : "Message has been saved as a draft.",
        });
      } else if (selectedMessage) {
        // Update existing message
        const updatedMessage = {
          ...selectedMessage,
          title: messageTitle,
          content: messageContent,
          targetAudience: messageAudience as any,
          targetGroups: messageAudience === 'custom' ? selectedGroups : undefined,
          status,
          scheduledFor,
          isPinned,
          expireAt
        };
        
        setMessages(prev => 
          prev.map(m => m.id === selectedMessage.id ? updatedMessage : m)
        );
        
        toast({
          title: "Message Updated",
          description: "Changes have been saved successfully."
        });
      }
      
      setIsMessageDialogOpen(false);
    } catch (error) {
      console.error("Error saving message:", error);
      toast({
        title: "Error",
        description: "Failed to save message. Please try again.",
        variant: "destructive"
      });
    }
  };

  // Handle cancel scheduled message
  const handleCancelScheduled = (message: BroadcastMessage) => {
    // In a real app, this would be an API call
    // await fetch(`/api/admin/broadcast-messages/${message.id}/cancel`, { method: 'POST' });
    
    const updatedMessage = {
      ...message,
      status: 'cancelled' as MessageStatus
    };
    
    setMessages(prev => 
      prev.map(m => m.id === message.id ? updatedMessage : m)
    );
    
    toast({
      title: "Message Cancelled",
      description: "The scheduled message has been cancelled."
    });
  };

  // Handle send draft message
  const handleSendDraft = (message: BroadcastMessage) => {
    // In a real app, this would be an API call
    // await fetch(`/api/admin/broadcast-messages/${message.id}/send`, { method: 'POST' });
    
    const updatedMessage = {
      ...message,
      status: 'sent' as MessageStatus,
      sentAt: new Date().toISOString(),
      deliveryCount: 0,
      readCount: 0
    };
    
    setMessages(prev => 
      prev.map(m => m.id === message.id ? updatedMessage : m)
    );
    
    toast({
      title: "Message Sent",
      description: "The message has been sent to recipients."
    });
  };

  // Handle delete message
  const handleDeleteMessage = () => {
    if (!selectedMessage) return;
    
    // In a real app, this would be an API call
    // await fetch(`/api/admin/broadcast-messages/${selectedMessage.id}`, { method: 'DELETE' });
    
    setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Message Deleted",
      description: "The message has been deleted successfully."
    });
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
      <Helmet>
        <title>Broadcast Messages | Visual English Admin</title>
      </Helmet>
      
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Megaphone className="mr-2 h-5 w-5" /> Broadcast Messages
              </CardTitle>
              <CardDescription>
                Send announcements and important updates to users
              </CardDescription>
            </div>
            <div>
              <Button onClick={handleCreateMessage} className="bg-blue-600 hover:bg-blue-700">
                <PlusCircle className="mr-2 h-4 w-4" /> New Message
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Dashboard Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Total Messages</p>
                    <h3 className="text-2xl font-bold text-blue-900">{messageCounts.all}</h3>
                  </div>
                  <Megaphone className="h-8 w-8 text-blue-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Sent Messages</p>
                    <h3 className="text-2xl font-bold text-green-900">{messageCounts.sent}</h3>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-amber-700">Scheduled</p>
                    <h3 className="text-2xl font-bold text-amber-900">{messageCounts.scheduled}</h3>
                  </div>
                  <Calendar className="h-8 w-8 text-amber-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Pinned Messages</p>
                    <h3 className="text-2xl font-bold text-purple-900">
                      {messages.filter(m => m.isPinned).length}
                    </h3>
                  </div>
                  <Bell className="h-8 w-8 text-purple-500 opacity-80" />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList className="bg-gray-100 p-1">
                <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  All <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">{messageCounts.all}</span>
                </TabsTrigger>
                <TabsTrigger value="draft" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Drafts <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{messageCounts.draft}</span>
                </TabsTrigger>
                <TabsTrigger value="scheduled" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Scheduled <span className="ml-1 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">{messageCounts.scheduled}</span>
                </TabsTrigger>
                <TabsTrigger value="sent" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Sent <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{messageCounts.sent}</span>
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                  Cancelled <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">{messageCounts.cancelled}</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                  <Input
                    type="search"
                    placeholder="Search messages..."
                    className="pl-8 w-full md:w-[250px]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Button variant="outline" size="sm" className="h-9">
                  <Filter className="h-4 w-4 mr-1" /> Filter
                </Button>
              </div>
            </div>
            
            <TabsContent value={activeTab} className="space-y-4">
              {/* Messages List */}
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Message</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead className="hidden md:table-cell">Created</TableHead>
                      <TableHead className="hidden md:table-cell">Schedule/Sent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          {searchQuery ? (
                            <>No messages match your search criteria.</>
                          ) : (
                            <>No messages found. Click "New Message" to create one.</>
                          )}
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMessages.map((message) => (
                        <TableRow key={message.id} className="group hover:bg-gray-50">
                          <TableCell className="font-medium">
                            <div className="flex flex-col">
                              <div className="flex items-center">
                                <span className="font-medium">{message.title}</span>
                                {message.isPinned && (
                                  <Badge variant="outline" className="ml-2 text-amber-500 border-amber-200 bg-amber-50">
                                    <Bell className="h-3 w-3 mr-1" /> Pinned
                                  </Badge>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground line-clamp-1 mt-1">
                                {message.content}
                              </div>
                              {message.status === 'sent' && message.deliveryCount !== undefined && (
                                <div className="flex items-center mt-1 text-xs text-gray-500">
                                  <span className="mr-3">Delivered: {message.deliveryCount}</span>
                                  <span>Read: {message.readCount || 0}</span>
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`
                                ${message.status === 'sent' ? 'bg-green-100 text-green-800 hover:bg-green-100' : ''}
                                ${message.status === 'draft' ? 'bg-gray-100 text-gray-800 hover:bg-gray-100' : ''}
                                ${message.status === 'scheduled' ? 'bg-blue-100 text-blue-800 hover:bg-blue-100' : ''}
                                ${message.status === 'cancelled' ? 'bg-red-100 text-red-800 hover:bg-red-100' : ''}
                              `}
                            >
                              {message.status === 'sent' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {message.status === 'draft' && <Edit className="h-3 w-3 mr-1" />}
                              {message.status === 'scheduled' && <Clock className="h-3 w-3 mr-1" />}
                              {message.status === 'cancelled' && <X className="h-3 w-3 mr-1" />}
                              {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {message.targetAudience === 'all' && <Globe className="h-3 w-3 mr-1" />}
                              {message.targetAudience === 'teachers' && <GraduationCap className="h-3 w-3 mr-1" />}
                              {message.targetAudience === 'schools' && <School className="h-3 w-3 mr-1" />}
                              {message.targetAudience === 'admins' && <Users className="h-3 w-3 mr-1" />}
                              {message.targetAudience === 'custom' && <Users className="h-3 w-3 mr-1" />}
                              {message.targetAudience.charAt(0).toUpperCase() + message.targetAudience.slice(1)}
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {formatDate(message.createdAt)}
                          </TableCell>
                          <TableCell className="hidden md:table-cell text-sm">
                            {message.status === 'sent' && formatDate(message.sentAt || '')}
                            {message.status === 'scheduled' && (
                              <div className="flex flex-col">
                                <span>{formatDate(message.scheduledFor || '')}</span>
                                {new Date(message.scheduledFor || '') > new Date() && (
                                  <span className="text-xs text-gray-500">
                                    {Math.ceil((new Date(message.scheduledFor || '').getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days left
                                  </span>
                                )}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-2 opacity-70 group-hover:opacity-100">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreviewMessage(message)}
                                title="Preview"
                                className="h-8 w-8 p-0"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {message.status === 'draft' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditMessage(message)}
                                  title="Edit"
                                  className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {message.status === 'scheduled' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleCancelScheduled(message)}
                                  title="Cancel Scheduled Message"
                                  className="h-8 w-8 p-0 text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {message.status === 'draft' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleSendDraft(message)}
                                  title="Send Now"
                                  className="h-8 w-8 p-0 text-green-600 hover:text-green-800 hover:bg-green-50"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              
                              {(message.status === 'draft' || message.status === 'cancelled') && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteClick(message)}
                                  title="Delete"
                                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
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

      {/* Message Form Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedMessage ? "Edit Message" : "Create Message"}
            </DialogTitle>
            <DialogDescription>
              {selectedMessage
                ? "Update an existing broadcast message"
                : "Compose a message to broadcast to users"
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title" className="required">Title</Label>
              <Input
                id="title"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder="Enter a concise title"
                className={formErrors.title ? "border-red-500" : ""}
              />
              {formErrors.title && (
                <p className="text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="content" className="required">Message Content</Label>
              <Textarea
                id="content"
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="Enter the message content"
                className={`min-h-[120px] ${formErrors.content ? "border-red-500" : ""}`}
              />
              {formErrors.content && (
                <p className="text-sm text-red-500">{formErrors.content}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="audience" className="required">Target Audience</Label>
              <Select
                value={messageAudience}
                onValueChange={setMessageAudience}
              >
                <SelectTrigger id="audience" className={formErrors.audience ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  <SelectItem value="teachers">Teachers Only ({userGroups.find(g => g.id === 'role_teachers')?.count ?? 0})</SelectItem>
                  <SelectItem value="schools">School Administrators ({userGroups.find(g => g.id === 'role_schools')?.count ?? 0})</SelectItem>
                  <SelectItem value="admins">Platform Administrators ({userGroups.find(g => g.id === 'role_admins')?.count ?? 0})</SelectItem>
                  <SelectItem value="custom">Custom Groups</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.audience && (
                <p className="text-sm text-red-500">{formErrors.audience}</p>
              )}
            </div>
            
            {messageAudience === 'custom' && (
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground mb-2">Select user groups to receive this message:</p>
                </div>
                {userGroups.map((group) => (
                  <div key={group.id} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={`group-${group.id}`}
                      checked={selectedGroups.includes(group.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGroups([...selectedGroups, group.id]);
                        } else {
                          setSelectedGroups(selectedGroups.filter(id => id !== group.id));
                        }
                      }}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <Label htmlFor={`group-${group.id}`} className="text-sm font-normal cursor-pointer">
                      {group.name} ({group.count})
                    </Label>
                  </div>
                ))}
                {formErrors.audience && (
                  <p className="text-sm text-red-500">{formErrors.audience}</p>
                )}
              </div>
            )}
            
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="schedule"
                  checked={schedulingEnabled}
                  onCheckedChange={setSchedulingEnabled}
                />
                <Label htmlFor="schedule">Schedule Message</Label>
              </div>
              
              {schedulingEnabled && (
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <Label htmlFor="scheduleDate" className="text-sm required">Date</Label>
                    <Input
                      id="scheduleDate"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className={formErrors.scheduleDate ? "border-red-500" : ""}
                    />
                    {formErrors.scheduleDate && (
                      <p className="text-xs text-red-500">{formErrors.scheduleDate}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="scheduleTime" className="text-sm required">Time</Label>
                    <Input
                      id="scheduleTime"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className={formErrors.scheduleTime ? "border-red-500" : ""}
                    />
                    {formErrors.scheduleTime && (
                      <p className="text-xs text-red-500">{formErrors.scheduleTime}</p>
                    )}
                  </div>
                  {formErrors.schedule && (
                    <p className="text-xs text-red-500 col-span-2">{formErrors.schedule}</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="pin"
                  checked={isPinned}
                  onCheckedChange={setIsPinned}
                />
                <Label htmlFor="pin">Pin Message</Label>
              </div>
              {isPinned && (
                <p className="text-xs text-muted-foreground">
                  Pinned messages appear at the top of the notification list and may be highlighted in the interface.
                </p>
              )}
            </div>
            
            <div className="grid gap-2">
              <div className="flex items-center space-x-2">
                <Switch
                  id="expiry"
                  checked={expiryEnabled}
                  onCheckedChange={setExpiryEnabled}
                />
                <Label htmlFor="expiry">Set Expiry Date</Label>
              </div>
              
              {expiryEnabled && (
                <div className="mt-2">
                  <Label htmlFor="expiryDate" className="text-sm required">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className={formErrors.expiryDate ? "border-red-500" : ""}
                  />
                  {formErrors.expiryDate && (
                    <p className="text-xs text-red-500">{formErrors.expiryDate}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsMessageDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMessage}>
              {selectedMessage ? "Save Changes" : "Create Message"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Message Preview Dialog */}
      {selectedMessage && (
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {selectedMessage.title}
                {selectedMessage.isPinned && (
                  <Badge variant="outline" className="ml-2 text-amber-500 border-amber-200 bg-amber-50">
                    <Bell className="h-3 w-3 mr-1" /> Pinned
                  </Badge>
                )}
              </DialogTitle>
              <div className="mt-1 flex items-center text-sm text-gray-500">
                <span className="mr-3">
                  Target: {selectedMessage.targetAudience.charAt(0).toUpperCase() + selectedMessage.targetAudience.slice(1)}
                </span>
                <span>
                  Status: 
                  <Badge
                    variant="outline"
                    className={`
                      ml-1
                      ${selectedMessage.status === 'sent' ? 'bg-green-100 text-green-800' : ''}
                      ${selectedMessage.status === 'draft' ? 'bg-gray-100 text-gray-800' : ''}
                      ${selectedMessage.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                      ${selectedMessage.status === 'cancelled' ? 'bg-red-100 text-red-800' : ''}
                    `}
                  >
                    {selectedMessage.status.charAt(0).toUpperCase() + selectedMessage.status.slice(1)}
                  </Badge>
                </span>
              </div>
            </DialogHeader>
            
            <div className="mt-4 mb-6">
              <p className="whitespace-pre-wrap">{selectedMessage.content}</p>
            </div>
            
            <div className="mb-4 pt-4 border-t border-gray-200 text-sm text-gray-500">
              <div className="flex justify-between mb-1">
                <span>Created by: {selectedMessage.createdBy.name}</span>
                <span>Created: {formatDate(selectedMessage.createdAt)}</span>
              </div>
              
              {selectedMessage.status === 'scheduled' && selectedMessage.scheduledFor && (
                <div className="flex justify-between mb-1">
                  <span>Scheduled for:</span>
                  <span>{formatDate(selectedMessage.scheduledFor)}</span>
                </div>
              )}
              
              {selectedMessage.status === 'sent' && selectedMessage.sentAt && (
                <>
                  <div className="flex justify-between mb-1">
                    <span>Sent at:</span>
                    <span>{formatDate(selectedMessage.sentAt)}</span>
                  </div>
                  {selectedMessage.deliveryCount !== undefined && (
                    <div className="flex justify-between mb-1">
                      <span>Delivery statistics:</span>
                      <span>
                        Delivered: {selectedMessage.deliveryCount} / 
                        Read: {selectedMessage.readCount || 0}
                        {selectedMessage.deliveryCount > 0 && selectedMessage.readCount !== undefined && (
                          ` (${Math.round((selectedMessage.readCount / selectedMessage.deliveryCount) * 100)}%)`
                        )}
                      </span>
                    </div>
                  )}
                </>
              )}
              
              {selectedMessage.expireAt && (
                <div className="flex justify-between">
                  <span>Expires at:</span>
                  <span>{formatDate(selectedMessage.expireAt)}</span>
                </div>
              )}
            </div>
            
            <DialogFooter>
              {selectedMessage.status === 'draft' && (
                <Button onClick={() => {
                  setIsPreviewDialogOpen(false);
                  handleSendDraft(selectedMessage);
                }}>
                  Send Now
                </Button>
              )}
              
              {selectedMessage.status === 'draft' && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsPreviewDialogOpen(false);
                    handleEditMessage(selectedMessage);
                  }}
                >
                  Edit
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the message "{selectedMessage?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMessage}
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

export default BroadcastMessagesDashboard;