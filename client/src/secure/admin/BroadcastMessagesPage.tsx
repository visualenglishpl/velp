import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
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
  Search
} from "lucide-react";

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

const BroadcastMessagesPage = () => {
  const { user } = useAuth();
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
            id: user?.id?.toString() || 'admin_1',
            name: user?.username || 'Admin User'
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
      } else {
        // Update existing message
        const updatedMessage: BroadcastMessage = {
          ...selectedMessage!,
          title: messageTitle,
          content: messageContent,
          status,
          targetAudience: messageAudience as any,
          targetGroups: messageAudience === 'custom' ? selectedGroups : undefined,
          scheduledFor,
          isPinned,
          expireAt
        };
        
        setMessages(prev => 
          prev.map(msg => msg.id === selectedMessage!.id ? updatedMessage : msg)
        );
        
        toast({
          title: "Message Updated",
          description: "The broadcast message has been updated successfully.",
        });
      }
      
      setIsMessageDialogOpen(false);
    } catch (err) {
      console.error("Error saving message:", err);
      toast({
        title: "Error",
        description: "Failed to save message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle send draft message
  const handleSendDraft = async (message: BroadcastMessage) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/broadcast-messages/${message.id}/send`, {
      //   method: 'POST'
      // });
      
      const updatedMessage: BroadcastMessage = {
        ...message,
        status: 'sent',
        sentAt: new Date().toISOString(),
        deliveryCount: message.targetAudience === 'all' 
          ? 358 
          : message.targetAudience === 'teachers' 
          ? 215 
          : message.targetAudience === 'schools' 
          ? 43 
          : 3, // Default for admins or custom
        readCount: 0
      };
      
      setMessages(prev => 
        prev.map(msg => msg.id === message.id ? updatedMessage : msg)
      );
      
      toast({
        title: "Message Sent",
        description: "The broadcast message has been sent successfully.",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle cancel scheduled message
  const handleCancelScheduled = async (message: BroadcastMessage) => {
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/broadcast-messages/${message.id}/cancel`, {
      //   method: 'POST'
      // });
      
      const updatedMessage: BroadcastMessage = {
        ...message,
        status: 'cancelled'
      };
      
      setMessages(prev => 
        prev.map(msg => msg.id === message.id ? updatedMessage : msg)
      );
      
      toast({
        title: "Message Cancelled",
        description: "The scheduled broadcast has been cancelled.",
      });
    } catch (err) {
      console.error("Error cancelling message:", err);
      toast({
        title: "Error",
        description: "Failed to cancel message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle delete message
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/broadcast-messages/${selectedMessage.id}`, {
      //   method: 'DELETE'
      // });
      
      setMessages(prev => 
        prev.filter(msg => msg.id !== selectedMessage.id)
      );
      
      toast({
        title: "Message Deleted",
        description: "The broadcast message has been deleted successfully.",
      });
      
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting message:", err);
      toast({
        title: "Error",
        description: "Failed to delete message. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Helper to get audience label
  const getAudienceLabel = (audience: string): string => {
    switch (audience) {
      case 'all': return 'All Users';
      case 'teachers': return 'Teachers Only';
      case 'schools': return 'School Administrators';
      case 'admins': return 'Platform Administrators';
      case 'custom': return 'Custom Groups';
      default: return audience;
    }
  };

  // Helper to get status badge
  const getStatusBadge = (status: MessageStatus) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200"><Clock className="h-3 w-3 mr-1" /> Draft</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200"><Calendar className="h-3 w-3 mr-1" /> Scheduled</Badge>;
      case 'sent':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" /> Sent</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="h-3 w-3 mr-1" /> Cancelled</Badge>;
      default:
        return <Badge>{status}</Badge>;
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
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">
                  All <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">{messageCounts.all}</span>
                </TabsTrigger>
                <TabsTrigger value="draft">
                  Drafts <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{messageCounts.draft}</span>
                </TabsTrigger>
                <TabsTrigger value="scheduled">
                  Scheduled <span className="ml-1 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">{messageCounts.scheduled}</span>
                </TabsTrigger>
                <TabsTrigger value="sent">
                  Sent <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{messageCounts.sent}</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="relative w-full md:w-64">
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-500" />
                </div>
              </div>
            </div>
            
            <TabsContent value={activeTab} className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Status</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Audience</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Scheduled/Sent</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMessages.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="h-24 text-center">
                          No messages found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMessages.map((message) => (
                        <TableRow key={message.id} className={message.isPinned ? "bg-amber-50" : ""}>
                          <TableCell>
                            <div className="flex items-center">
                              {getStatusBadge(message.status)}
                              {message.isPinned && (
                                <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-700 border-amber-200">
                                  Pinned
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            <div className="max-w-xs truncate" title={message.title}>
                              {message.title}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              {message.targetAudience === 'all' && <Globe className="h-4 w-4 mr-1.5" />}
                              {message.targetAudience === 'teachers' && <GraduationCap className="h-4 w-4 mr-1.5" />}
                              {message.targetAudience === 'schools' && <School className="h-4 w-4 mr-1.5" />}
                              {message.targetAudience === 'admins' && <Users className="h-4 w-4 mr-1.5" />}
                              {message.targetAudience === 'custom' && <Users className="h-4 w-4 mr-1.5" />}
                              {getAudienceLabel(message.targetAudience)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-sm">{formatDate(message.createdAt)}</div>
                            <div className="text-xs text-muted-foreground">
                              by {message.createdBy.name}
                            </div>
                          </TableCell>
                          <TableCell>
                            {message.status === 'scheduled' ? (
                              <div className="text-sm">{formatDate(message.scheduledFor!)}</div>
                            ) : message.status === 'sent' ? (
                              <div>
                                <div className="text-sm">{formatDate(message.sentAt!)}</div>
                                <div className="text-xs text-muted-foreground">
                                  {message.readCount}/{message.deliveryCount} read ({Math.round((message.readCount! / message.deliveryCount!) * 100)}%)
                                </div>
                              </div>
                            ) : (
                              <div className="text-xs text-muted-foreground">—</div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePreviewMessage(message)}
                                className="h-8 w-8 p-0"
                                title="Preview"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              
                              {message.status === 'draft' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditMessage(message)}
                                    className="h-8 w-8 p-0"
                                    title="Edit"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleSendDraft(message)}
                                    className="h-8 w-8 p-0 text-green-600"
                                    title="Send Now"
                                  >
                                    <Send className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              {message.status === 'scheduled' && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditMessage(message)}
                                    className="h-8 w-8 p-0"
                                    title="Edit"
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCancelScheduled(message)}
                                    className="h-8 w-8 p-0 text-red-600"
                                    title="Cancel"
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </>
                              )}
                              
                              {(message.status === 'draft' || message.status === 'cancelled') && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteClick(message)}
                                  className="h-8 w-8 p-0 text-red-600"
                                  title="Delete"
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

      {/* Create/Edit Message Dialog */}
      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedMessage ? 'Edit Broadcast Message' : 'Create New Broadcast Message'}
            </DialogTitle>
            <DialogDescription>
              {selectedMessage 
                ? 'Update the message details below.'
                : 'Compose a message to broadcast to your users.'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="message-title">Message Title</Label>
              <Input
                id="message-title"
                placeholder="e.g., System Update Announcement"
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
              />
              {formErrors.title && (
                <p className="text-sm text-red-500">{formErrors.title}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="message-content">Message Content</Label>
              <Textarea
                id="message-content"
                placeholder="Enter the content of your broadcast message here..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                className="min-h-[150px]"
              />
              {formErrors.content && (
                <p className="text-sm text-red-500">{formErrors.content}</p>
              )}
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="target-audience">Target Audience</Label>
              <div className="flex flex-col space-y-4">
                <Select value={messageAudience} onValueChange={setMessageAudience}>
                  <SelectTrigger id="target-audience">
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users (Everyone)</SelectItem>
                    <SelectItem value="teachers">Teachers Only ({userGroups.find(g => g.id === 'role_teachers')?.count ?? 0})</SelectItem>
                    <SelectItem value="schools">School Administrators ({userGroups.find(g => g.id === 'role_schools')?.count ?? 0})</SelectItem>
                    <SelectItem value="admins">Platform Administrators ({userGroups.find(g => g.id === 'role_admins')?.count ?? 0})</SelectItem>
                    <SelectItem value="custom">Custom User Groups</SelectItem>
                  </SelectContent>
                </Select>
                
                {messageAudience === 'custom' && (
                  <div className="border rounded-md p-4 space-y-2">
                    <p className="text-sm text-muted-foreground mb-2">Select user groups to receive this message:</p>
                    
                    {userGroups.map((group) => (
                      <div key={group.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={group.id}
                          checked={selectedGroups.includes(group.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedGroups(prev => [...prev, group.id]);
                            } else {
                              setSelectedGroups(prev => prev.filter(id => id !== group.id));
                            }
                          }}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor={group.id} className="text-sm font-normal cursor-pointer">
                          {group.name} ({group.count})
                        </Label>
                      </div>
                    ))}
                    
                    {formErrors.audience && (
                      <p className="text-sm text-red-500">{formErrors.audience}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="schedule-toggle" className="font-medium">Schedule for later</Label>
                <Switch
                  id="schedule-toggle"
                  checked={schedulingEnabled}
                  onCheckedChange={setSchedulingEnabled}
                />
              </div>
              
              {schedulingEnabled && (
                <div className="grid grid-cols-2 gap-4 pl-4 border-l-2 border-gray-100">
                  <div className="grid gap-2">
                    <Label htmlFor="schedule-date">Date</Label>
                    <Input
                      id="schedule-date"
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                    {formErrors.scheduleDate && (
                      <p className="text-sm text-red-500">{formErrors.scheduleDate}</p>
                    )}
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="schedule-time">Time</Label>
                    <Input
                      id="schedule-time"
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                    {formErrors.scheduleTime && (
                      <p className="text-sm text-red-500">{formErrors.scheduleTime}</p>
                    )}
                  </div>
                  
                  {formErrors.schedule && (
                    <p className="text-sm text-red-500 col-span-2">{formErrors.schedule}</p>
                  )}
                </div>
              )}
            </div>
            
            <div className="grid gap-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="pin-toggle" className="font-medium">Pin message</Label>
                  <p className="text-sm text-muted-foreground">Pinned messages will appear at the top of the notifications</p>
                </div>
                <Switch
                  id="pin-toggle"
                  checked={isPinned}
                  onCheckedChange={setIsPinned}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="expiry-toggle" className="font-medium">Set expiry date</Label>
                  <p className="text-sm text-muted-foreground">Message will be automatically archived after this date</p>
                </div>
                <Switch
                  id="expiry-toggle"
                  checked={expiryEnabled}
                  onCheckedChange={setExpiryEnabled}
                />
              </div>
              
              {expiryEnabled && (
                <div className="grid gap-2 pl-4 border-l-2 border-gray-100">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input
                    id="expiry-date"
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                  {formErrors.expiryDate && (
                    <p className="text-sm text-red-500">{formErrors.expiryDate}</p>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleSaveMessage}>
              {schedulingEnabled 
                ? selectedMessage 
                  ? 'Update Scheduled Message' 
                  : 'Schedule Message'
                : selectedMessage 
                  ? 'Update Message' 
                  : 'Save as Draft'
              }
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Message Dialog */}
      {selectedMessage && (
        <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <Megaphone className="mr-2 h-5 w-5" />
                Message Preview
              </DialogTitle>
            </DialogHeader>
            
            <div className="border rounded-lg p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold">{selectedMessage.title}</h3>
                {selectedMessage.isPinned && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    Pinned
                  </Badge>
                )}
              </div>
              
              <div className="prose prose-sm max-w-none">
                <p>{selectedMessage.content}</p>
              </div>
              
              <div className="pt-4 border-t text-xs text-gray-500 flex justify-between items-center">
                <div>
                  Target: {getAudienceLabel(selectedMessage.targetAudience)}
                </div>
                <div>
                  {selectedMessage.status === 'sent'
                    ? `Sent ${formatDate(selectedMessage.sentAt!)}`
                    : selectedMessage.status === 'scheduled'
                    ? `Scheduled for ${formatDate(selectedMessage.scheduledFor!)}`
                    : `Created ${formatDate(selectedMessage.createdAt)}`
                  }
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsPreviewDialogOpen(false)}
              >
                Close
              </Button>
              
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

export default BroadcastMessagesPage;