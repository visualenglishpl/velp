import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
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
  MessageSquare,
  Star,
  StarHalf,
  Check,
  X,
  Filter,
  Search,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Mail,
  User,
  Tag,
  Bookmark,
  AlertTriangle,
  Info,
  HelpCircle,
  Eye,
  Trash2
} from "lucide-react";

// Define types for user feedback
type FeedbackCategory = 'general' | 'content' | 'technical' | 'suggestion' | 'question';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';
type FeedbackStatus = 'new' | 'in_progress' | 'resolved' | 'closed';

type Feedback = {
  id: string;
  title: string;
  message: string;
  category: FeedbackCategory;
  priority: FeedbackPriority;
  status: FeedbackStatus;
  rating?: number;
  submittedBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  submittedAt: string;
  lastUpdatedAt?: string;
  assignedTo?: {
    id: string;
    name: string;
  };
  responseMessage?: string;
  responseAt?: string;
  responseBy?: {
    id: string;
    name: string;
  };
  tags: string[];
  bookId?: string;
  unitId?: string;
  path?: string;
};

type AdminUser = {
  id: string;
  name: string;
  role: string;
};

type Tag = {
  id: string;
  name: string;
  color: string;
};

const FeedbackViewerPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  // State for data
  const [feedbackItems, setFeedbackItems] = useState<Feedback[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Form state
  const [responseMessage, setResponseMessage] = useState("");
  const [newStatus, setNewStatus] = useState<FeedbackStatus>("in_progress");
  const [assignedUserId, setAssignedUserId] = useState<string>("");
  const [newPriority, setNewPriority] = useState<FeedbackPriority>("medium");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  // Load feedback data
  useEffect(() => {
    const fetchFeedbackData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, these would be API calls
        // const feedbackResponse = await fetch('/api/admin/feedback');
        // const usersResponse = await fetch('/api/admin/users?role=admin');
        // const tagsResponse = await fetch('/api/admin/feedback-tags');
        
        // Mock data for development
        const mockFeedback: Feedback[] = [
          {
            id: "feedback_1",
            title: "Issue with Q&A display in Book 2 Unit 5",
            message: "Some of the answers in Unit 5 of Book 2 appear cut off on smaller screens. The text doesn't wrap properly and gets truncated.",
            category: "technical",
            priority: "high",
            status: "new",
            submittedBy: {
              id: "user_123",
              name: "Emma Johnson",
              email: "emma.j@school.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-16T10:30:00Z",
            tags: ["ui-issue", "content-display"],
            bookId: "2",
            unitId: "5"
          },
          {
            id: "feedback_2",
            title: "Suggestion for Book 1 content improvement",
            message: "I think Book 1 would benefit from more listening exercises. The current content is heavily focused on reading and speaking, but lacks sufficient listening practice for young learners.",
            category: "suggestion",
            priority: "medium",
            status: "in_progress",
            rating: 4,
            submittedBy: {
              id: "user_456",
              name: "Michael Smith",
              email: "m.smith@academy.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-12T14:45:00Z",
            lastUpdatedAt: "2025-05-14T09:20:00Z",
            assignedTo: {
              id: "admin_2",
              name: "Content Manager"
            },
            tags: ["content-improvement", "book-1"],
            bookId: "1"
          },
          {
            id: "feedback_3",
            title: "Thank you for the new features!",
            message: "I just wanted to say thank you for adding the ability to save favorite slides. This has made my lesson planning much easier and more efficient!",
            category: "general",
            priority: "low",
            status: "resolved",
            rating: 5,
            submittedBy: {
              id: "user_789",
              name: "Sarah Williams",
              email: "s.williams@school.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-10T16:30:00Z",
            lastUpdatedAt: "2025-05-11T11:10:00Z",
            responseMessage: "Thank you for your kind feedback, Sarah! We're glad to hear that the new feature is helping with your lesson planning. We're always looking for ways to improve the platform based on teacher needs.",
            responseAt: "2025-05-11T11:10:00Z",
            responseBy: {
              id: "admin_1",
              name: "Admin User"
            },
            tags: ["positive-feedback", "feature-request-completed"]
          },
          {
            id: "feedback_4",
            title: "Question about subscription options",
            message: "I'm a new teacher at an international school, and I'm trying to understand the different subscription options. Is there a special pricing for educational institutions with multiple teachers?",
            category: "question",
            priority: "medium",
            status: "resolved",
            submittedBy: {
              id: "user_101",
              name: "Robert Chen",
              email: "r.chen@academy.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-08T09:15:00Z",
            lastUpdatedAt: "2025-05-09T10:30:00Z",
            responseMessage: "Hello Robert, thank you for your question. Yes, we do have special pricing for educational institutions. I've sent detailed information to your email, including our volume discount structure for schools with multiple teachers. Please feel free to reach out if you have any other questions.",
            responseAt: "2025-05-09T10:30:00Z",
            responseBy: {
              id: "admin_3",
              name: "Support Specialist"
            },
            tags: ["subscription", "pricing"]
          },
          {
            id: "feedback_5",
            title: "Page loading very slowly",
            message: "Over the past two days, I've noticed that the platform is loading very slowly, especially when trying to view content in Book 4. Sometimes it takes up to 30 seconds for slides to appear.",
            category: "technical",
            priority: "critical",
            status: "closed",
            submittedBy: {
              id: "user_202",
              name: "Lisa Parker",
              email: "l.parker@school.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-05T13:20:00Z",
            lastUpdatedAt: "2025-05-06T16:40:00Z",
            responseMessage: "Lisa, thank you for reporting this issue. We identified a server performance problem affecting Book 4 content delivery and have resolved it. All content should now load within 2-3 seconds. Please let us know if you continue to experience slow loading times.",
            responseAt: "2025-05-06T16:40:00Z",
            responseBy: {
              id: "admin_4",
              name: "Technical Support"
            },
            tags: ["performance", "resolved-issue", "book-4"],
            bookId: "4"
          },
          {
            id: "feedback_6",
            title: "Suggestion for pronunciation guide",
            message: "It would be very helpful to have a pronunciation guide or audio samples for vocabulary words in the early books (0a-1). Many of my younger students struggle with pronunciation.",
            category: "suggestion",
            priority: "medium",
            status: "new",
            submittedBy: {
              id: "user_303",
              name: "James Wilson",
              email: "j.wilson@academy.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-17T15:45:00Z",
            tags: ["feature-request", "pronunciation", "beginner-level"],
            bookId: "0a"
          },
          {
            id: "feedback_7",
            title: "Content error in Book 3 Unit 7",
            message: "There's a factual error in Book 3, Unit 7, slide 25-B-F about the solar system. It states that Venus is the hottest planet, which is correct, but then indicates its average temperature as 460°C, when it should be around 460°C.",
            category: "content",
            priority: "high",
            status: "in_progress",
            submittedBy: {
              id: "user_404",
              name: "David Thompson",
              email: "d.thompson@school.edu",
              role: "teacher"
            },
            submittedAt: "2025-05-15T08:30:00Z",
            lastUpdatedAt: "2025-05-16T11:15:00Z",
            assignedTo: {
              id: "admin_2",
              name: "Content Manager"
            },
            tags: ["content-error", "book-3", "science", "factual-correction"],
            bookId: "3",
            unitId: "7",
            path: "25-B-F"
          }
        ];
        
        const mockAdminUsers: AdminUser[] = [
          { id: "admin_1", name: "Admin User", role: "admin" },
          { id: "admin_2", name: "Content Manager", role: "content_manager" },
          { id: "admin_3", name: "Support Specialist", role: "support" },
          { id: "admin_4", name: "Technical Support", role: "tech_support" }
        ];
        
        const mockTags: Tag[] = [
          { id: "ui-issue", name: "UI Issue", color: "#EF4444" },
          { id: "content-display", name: "Content Display", color: "#F59E0B" },
          { id: "content-improvement", name: "Content Improvement", color: "#10B981" },
          { id: "content-error", name: "Content Error", color: "#DC2626" },
          { id: "book-1", name: "Book 1", color: "#FBBF24" },
          { id: "book-2", name: "Book 2", color: "#8B5CF6" },
          { id: "book-3", name: "Book 3", color: "#10B981" },
          { id: "book-4", name: "Book 4", color: "#3B82F6" },
          { id: "positive-feedback", name: "Positive Feedback", color: "#10B981" },
          { id: "feature-request", name: "Feature Request", color: "#8B5CF6" },
          { id: "feature-request-completed", name: "Feature Request Completed", color: "#10B981" },
          { id: "subscription", name: "Subscription", color: "#EC4899" },
          { id: "pricing", name: "Pricing", color: "#8B5CF6" },
          { id: "performance", name: "Performance", color: "#F59E0B" },
          { id: "resolved-issue", name: "Resolved Issue", color: "#10B981" },
          { id: "pronunciation", name: "Pronunciation", color: "#3B82F6" },
          { id: "beginner-level", name: "Beginner Level", color: "#FBBF24" },
          { id: "science", name: "Science", color: "#10B981" },
          { id: "factual-correction", name: "Factual Correction", color: "#DC2626" }
        ];
        
        setFeedbackItems(mockFeedback);
        setAdminUsers(mockAdminUsers);
        setTags(mockTags);
      } catch (err) {
        console.error("Error fetching feedback data:", err);
        setError("Failed to load feedback data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeedbackData();
  }, []);

  // Get count by status
  const getFeedbackCounts = () => {
    const counts = {
      all: feedbackItems.length,
      new: feedbackItems.filter(f => f.status === 'new').length,
      in_progress: feedbackItems.filter(f => f.status === 'in_progress').length,
      resolved: feedbackItems.filter(f => f.status === 'resolved').length,
      closed: feedbackItems.filter(f => f.status === 'closed').length
    };
    return counts;
  };

  const feedbackCounts = getFeedbackCounts();

  // Apply filters to feedback items
  const getFilteredFeedback = () => {
    return feedbackItems.filter(item => {
      // Filter by tab (status)
      if (activeTab !== 'all' && item.status !== activeTab) {
        return false;
      }
      
      // Filter by category
      if (categoryFilter && item.category !== categoryFilter) {
        return false;
      }
      
      // Filter by priority
      if (priorityFilter && item.priority !== priorityFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(query) ||
          item.message.toLowerCase().includes(query) ||
          item.submittedBy.name.toLowerCase().includes(query) ||
          (item.bookId && item.bookId.toLowerCase().includes(query)) ||
          (item.unitId && item.unitId.toLowerCase().includes(query)) ||
          item.tags.some(tag => tag.toLowerCase().includes(query))
        );
      }
      
      return true;
    }).sort((a, b) => {
      // Sort by priority (critical first), then by date (newest first)
      if (a.priority === 'critical' && b.priority !== 'critical') return -1;
      if (a.priority !== 'critical' && b.priority === 'critical') return 1;
      if (a.priority === 'high' && b.priority === 'medium') return -1;
      if (a.priority === 'medium' && b.priority === 'high') return 1;
      if (a.priority === 'high' && b.priority === 'low') return -1;
      if (a.priority === 'low' && b.priority === 'high') return 1;
      if (a.priority === 'medium' && b.priority === 'low') return -1;
      if (a.priority === 'low' && b.priority === 'medium') return 1;
      
      return new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime();
    });
  };

  const filteredFeedback = getFilteredFeedback();

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

  // Handle viewing feedback details
  const handleViewFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDetailDialogOpen(true);
  };

  // Handle replying to feedback
  const handleReplyToFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setResponseMessage(feedback.responseMessage || '');
    setNewStatus(feedback.status);
    setAssignedUserId(feedback.assignedTo?.id || '');
    setNewPriority(feedback.priority);
    setSelectedTags(feedback.tags || []);
    setIsResponseDialogOpen(true);
  };

  // Handle saving feedback response
  const handleSaveResponse = async () => {
    if (!selectedFeedback) return;
    
    try {
      const responseData = {
        id: selectedFeedback.id,
        responseMessage,
        status: newStatus,
        assignedUserId,
        priority: newPriority,
        tags: selectedTags
      };
      
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/feedback/${selectedFeedback.id}/respond`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(responseData)
      // });
      
      const assignedToUser = assignedUserId 
        ? adminUsers.find(u => u.id === assignedUserId)
        : undefined;
        
      const updatedFeedback: Feedback = {
        ...selectedFeedback,
        status: newStatus,
        priority: newPriority,
        lastUpdatedAt: new Date().toISOString(),
        assignedTo: assignedToUser 
          ? { id: assignedToUser.id, name: assignedToUser.name }
          : undefined,
        tags: selectedTags
      };
      
      // Only update response if provided
      if (responseMessage) {
        updatedFeedback.responseMessage = responseMessage;
        updatedFeedback.responseAt = new Date().toISOString();
        updatedFeedback.responseBy = {
          id: user?.id?.toString() || 'admin_1',
          name: user?.username || 'Admin User'
        };
      }
      
      setFeedbackItems(prevItems => 
        prevItems.map(item => item.id === selectedFeedback.id ? updatedFeedback : item)
      );
      
      toast({
        title: "Response Saved",
        description: "Your response has been saved successfully.",
      });
      
      setIsResponseDialogOpen(false);
    } catch (err) {
      console.error("Error saving response:", err);
      toast({
        title: "Error",
        description: "Failed to save response. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Handle deleting feedback
  const handleDeleteFeedback = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsDeleteDialogOpen(true);
  };

  // Confirm delete feedback
  const confirmDeleteFeedback = async () => {
    if (!selectedFeedback) return;
    
    try {
      // In a real app, this would be an API call
      // const response = await fetch(`/api/admin/feedback/${selectedFeedback.id}`, {
      //   method: 'DELETE'
      // });
      
      setFeedbackItems(prevItems => 
        prevItems.filter(item => item.id !== selectedFeedback.id)
      );
      
      toast({
        title: "Feedback Deleted",
        description: "The feedback has been deleted successfully.",
      });
      
      setIsDeleteDialogOpen(false);
      setSelectedFeedback(null);
    } catch (err) {
      console.error("Error deleting feedback:", err);
      toast({
        title: "Error",
        description: "Failed to delete feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Toggle tag selection
  const toggleTag = (tagId: string) => {
    setSelectedTags(prev => {
      if (prev.includes(tagId)) {
        return prev.filter(id => id !== tagId);
      } else {
        return [...prev, tagId];
      }
    });
  };

  // Helper to get category badge
  const getCategoryBadge = (category: FeedbackCategory) => {
    switch (category) {
      case 'general':
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200"><Info className="h-3 w-3 mr-1" /> General</Badge>;
      case 'content':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200"><BookmarkIcon className="h-3 w-3 mr-1" /> Content</Badge>;
      case 'technical':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200"><AlertTriangle className="h-3 w-3 mr-1" /> Technical</Badge>;
      case 'suggestion':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200"><ThumbsUp className="h-3 w-3 mr-1" /> Suggestion</Badge>;
      case 'question':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200"><HelpCircle className="h-3 w-3 mr-1" /> Question</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };

  // Helper to get priority badge
  const getPriorityBadge = (priority: FeedbackPriority) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">High</Badge>;
      case 'critical':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Critical</Badge>;
      default:
        return <Badge>{priority}</Badge>;
    }
  };

  // Helper to get status badge
  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case 'new':
        return <Badge className="bg-blue-100 text-blue-800">New</Badge>;
      case 'in_progress':
        return <Badge className="bg-yellow-100 text-yellow-800">In Progress</Badge>;
      case 'resolved':
        return <Badge className="bg-green-100 text-green-800">Resolved</Badge>;
      case 'closed':
        return <Badge className="bg-gray-100 text-gray-800">Closed</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  // Get tag by ID
  const getTagById = (tagId: string) => {
    return tags.find(tag => tag.id === tagId);
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
                <MessageSquare className="mr-2 h-5 w-5" /> User Feedback
              </CardTitle>
              <CardDescription>
                Review and respond to feedback from teachers and users
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">
                  All <span className="ml-1 text-xs bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.all}</span>
                </TabsTrigger>
                <TabsTrigger value="new">
                  New <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.new}</span>
                </TabsTrigger>
                <TabsTrigger value="in_progress">
                  In Progress <span className="ml-1 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.in_progress}</span>
                </TabsTrigger>
                <TabsTrigger value="resolved">
                  Resolved <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.resolved}</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative w-full sm:w-64">
                  <Input
                    placeholder="Search feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none">
                    <Search className="h-4 w-4 text-gray-500" />
                  </div>
                </div>
                
                <Select value={categoryFilter || ''} onValueChange={(value) => setCategoryFilter(value || null)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="content">Content</SelectItem>
                    <SelectItem value="technical">Technical</SelectItem>
                    <SelectItem value="suggestion">Suggestion</SelectItem>
                    <SelectItem value="question">Question</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={priorityFilter || ''} onValueChange={(value) => setPriorityFilter(value || null)}>
                  <SelectTrigger className="w-36">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Priorities</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Status</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFeedback.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center">
                        No feedback found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredFeedback.map((feedback) => (
                      <TableRow key={feedback.id} className={feedback.priority === 'critical' ? "bg-red-50" : ""}>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getStatusBadge(feedback.status)}
                            {feedback.priority === 'critical' && (
                              <span className="animate-pulse h-2 w-2 rounded-full bg-red-500"></span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {getCategoryBadge(feedback.category)}
                            {getPriorityBadge(feedback.priority)}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          <div className="max-w-xs truncate" title={feedback.title}>
                            {feedback.title}
                          </div>
                          {feedback.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-1">
                              {feedback.tags.slice(0, 2).map(tagId => {
                                const tag = getTagById(tagId);
                                return tag ? (
                                  <div 
                                    key={tagId}
                                    className="text-xs px-1.5 py-0.5 rounded-full" 
                                    style={{ 
                                      backgroundColor: `${tag.color}20`, // Add transparency
                                      color: tag.color,
                                      border: `1px solid ${tag.color}40`
                                    }}
                                  >
                                    {tag.name}
                                  </div>
                                ) : null;
                              })}
                              {feedback.tags.length > 2 && (
                                <div className="text-xs px-1.5 py-0.5 rounded-full bg-gray-100 text-gray-700">
                                  +{feedback.tags.length - 2}
                                </div>
                              )}
                            </div>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{feedback.submittedBy.name}</span>
                            <span className="text-xs text-muted-foreground">{feedback.submittedBy.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div title={formatDate(feedback.submittedAt)}>
                            {new Date(feedback.submittedAt).toLocaleDateString()}
                          </div>
                          {feedback.responseAt && (
                            <div className="text-xs text-green-600">
                              Responded: {new Date(feedback.responseAt).toLocaleDateString()}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewFeedback(feedback)}
                              className="h-8 w-8 p-0"
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReplyToFeedback(feedback)}
                              className="h-8 w-8 p-0 text-blue-600"
                              title="Respond"
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            
                            {(feedback.status === 'resolved' || feedback.status === 'closed') && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleDeleteFeedback(feedback)}
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
          </Tabs>
        </CardContent>
      </Card>

      {/* Feedback Details Dialog */}
      {selectedFeedback && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Feedback Details
              </DialogTitle>
              <DialogDescription>
                {getCategoryBadge(selectedFeedback.category)} {getPriorityBadge(selectedFeedback.priority)} {getStatusBadge(selectedFeedback.status)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold">{selectedFeedback.title}</h3>
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedFeedback.tags.map(tagId => {
                    const tag = getTagById(tagId);
                    return tag ? (
                      <div 
                        key={tagId}
                        className="text-xs px-2 py-1 rounded-full" 
                        style={{ 
                          backgroundColor: `${tag.color}20`,
                          color: tag.color,
                          border: `1px solid ${tag.color}40`
                        }}
                      >
                        {tag.name}
                      </div>
                    ) : null;
                  })}
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 text-blue-700 rounded-full h-10 w-10 flex items-center justify-center font-medium flex-shrink-0">
                  {selectedFeedback.submittedBy.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center">
                    <span className="font-medium">{selectedFeedback.submittedBy.name}</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      {selectedFeedback.submittedBy.role}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {formatDate(selectedFeedback.submittedAt)}
                  </div>
                  <div className="mt-2 p-4 bg-gray-50 rounded-md">
                    <p className="whitespace-pre-line">{selectedFeedback.message}</p>
                  </div>
                  
                  {selectedFeedback.bookId && (
                    <div className="mt-2 text-sm">
                      <span className="font-medium">Related content:</span> Book {selectedFeedback.bookId}
                      {selectedFeedback.unitId && `, Unit ${selectedFeedback.unitId}`}
                      {selectedFeedback.path && `, Slide ${selectedFeedback.path}`}
                    </div>
                  )}
                </div>
              </div>
              
              {selectedFeedback.rating && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">Rating:</span>
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i}>
                        {i < Math.floor(selectedFeedback.rating!) ? (
                          <Star className="h-4 w-4 fill-current" />
                        ) : i < selectedFeedback.rating! ? (
                          <StarHalf className="h-4 w-4 fill-current" />
                        ) : (
                          <Star className="h-4 w-4 text-gray-300" />
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {selectedFeedback.assignedTo && (
                <div className="flex items-center space-x-2 text-sm">
                  <span className="font-medium">Assigned to:</span>
                  <span>{selectedFeedback.assignedTo.name}</span>
                </div>
              )}
              
              {selectedFeedback.responseMessage && (
                <div className="mt-6 pt-6 border-t space-y-4">
                  <h4 className="font-medium">Response</h4>
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-700 rounded-full h-10 w-10 flex items-center justify-center font-medium flex-shrink-0">
                      {selectedFeedback.responseBy?.name.charAt(0) || 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center">
                        <span className="font-medium">
                          {selectedFeedback.responseBy?.name || 'Admin'}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {formatDate(selectedFeedback.responseAt!)}
                      </div>
                      <div className="mt-2 p-4 bg-green-50 rounded-md">
                        <p className="whitespace-pre-line">{selectedFeedback.responseMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsDetailDialogOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={() => {
                  setIsDetailDialogOpen(false);
                  handleReplyToFeedback(selectedFeedback);
                }}
              >
                {selectedFeedback.responseMessage ? 'Edit Response' : 'Respond'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Response Dialog */}
      {selectedFeedback && (
        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {selectedFeedback.responseMessage ? 'Edit Response' : 'Respond to Feedback'}
              </DialogTitle>
              <DialogDescription>
                Provide a response to the user's feedback
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Original Feedback</h3>
                <div className="p-4 bg-gray-50 rounded-md">
                  <h4 className="font-medium mb-2">{selectedFeedback.title}</h4>
                  <p className="text-sm text-gray-700">{selectedFeedback.message}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select value={newStatus} onValueChange={(value) => setNewStatus(value as FeedbackStatus)}>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={newPriority} onValueChange={(value) => setNewPriority(value as FeedbackPriority)}>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="assigned-to">Assign To</Label>
                <Select value={assignedUserId} onValueChange={(value) => setAssignedUserId(value)}>
                  <SelectTrigger id="assigned-to">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Unassigned</SelectItem>
                    {adminUsers.map(admin => (
                      <SelectItem key={admin.id} value={admin.id}>
                        {admin.name} ({admin.role})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <div className="border rounded-md p-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    {tags.map(tag => (
                      <div 
                        key={tag.id}
                        className={`px-2 py-1 rounded-full text-xs cursor-pointer transition-colors ${
                          selectedTags.includes(tag.id)
                            ? `bg-${tag.color} text-white`
                            : `bg-${tag.color}10 text-${tag.color} border border-${tag.color}30`
                        }`}
                        style={{
                          backgroundColor: selectedTags.includes(tag.id) ? tag.color : `${tag.color}10`,
                          color: selectedTags.includes(tag.id) ? 'white' : tag.color,
                          borderColor: `${tag.color}30`
                        }}
                        onClick={() => toggleTag(tag.id)}
                      >
                        {tag.name}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="response-message">Response Message</Label>
                <Textarea
                  id="response-message"
                  placeholder="Enter your response to the user..."
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsResponseDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveResponse}>
                {selectedFeedback.responseMessage ? 'Update Response' : 'Send Response'}
              </Button>
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
              Are you sure you want to delete this feedback? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteFeedback}
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

// Create a separate BookmarkIcon component for TypeScript to recognize
const BookmarkIcon = (props: React.ComponentProps<typeof Bookmark>) => (
  <Bookmark {...props} />
);

export default FeedbackViewerPage;