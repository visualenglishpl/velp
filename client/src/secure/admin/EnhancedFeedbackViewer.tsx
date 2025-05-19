import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
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
  MessageSquare,
  User,
  Star,
  Tag,
  BookOpen,
  Clock,
  CheckCircle,
  XCircle,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
  Download,
  ExternalLink,
  Trash2,
  Reply,
  Flag,
  Bookmark,
  Eye,
  Mail
} from "lucide-react";

// Define types
type FeedbackStatus = 'new' | 'in_progress' | 'resolved' | 'closed' | 'flagged';
type FeedbackCategory = 'question' | 'bug_report' | 'feature_request' | 'content_issue' | 'general';
type FeedbackPriority = 'low' | 'medium' | 'high' | 'critical';

interface Feedback {
  id: string;
  title: string;
  content: string;
  category: FeedbackCategory;
  status: FeedbackStatus;
  priority: FeedbackPriority;
  author: {
    id: string;
    name: string;
    email: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  updatedAt: string;
  assignedTo?: {
    id: string;
    name: string;
  };
  bookId?: string;
  unitId?: string;
  imageUrl?: string;
  responses: FeedbackResponse[];
  tags: string[];
  isBookmarked: boolean;
}

interface FeedbackResponse {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    role: string;
    avatar?: string;
  };
  createdAt: string;
  isInternal: boolean;
}

const EnhancedFeedbackViewer = () => {
  const { toast } = useToast();
  
  // State for data
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for UI
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [isResponseDialogOpen, setIsResponseDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  
  // Form state
  const [responseContent, setResponseContent] = useState("");
  const [isInternalResponse, setIsInternalResponse] = useState(false);
  
  // Fetch feedback data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/feedback');
        // const data = await response.json();
        
        // Mock data for development
        const mockFeedback: Feedback[] = [
          {
            id: "f1",
            title: "Question about Book 3 Unit 7",
            content: "I found an issue with one of the questions in Book 3, Unit 7. The answer provided for question #12 seems incorrect as it contradicts the information in the image.",
            category: "content_issue",
            status: "new",
            priority: "medium",
            author: {
              id: "user1",
              name: "Anna Kowalska",
              email: "anna.k@example.com",
              role: "teacher",
              avatar: "https://ui-avatars.com/api/?name=Anna+K&background=0D8ABC&color=fff"
            },
            createdAt: "2025-05-15T14:30:00Z",
            updatedAt: "2025-05-15T14:30:00Z",
            bookId: "3",
            unitId: "7",
            responses: [],
            tags: ["book-3", "content-error"],
            isBookmarked: false
          },
          {
            id: "f2",
            title: "Feature Request: Print Multiple Units",
            content: "It would be very helpful to have the ability to print multiple units at once instead of having to print each unit separately. This would save a lot of time when preparing lessons.",
            category: "feature_request",
            status: "in_progress",
            priority: "medium",
            author: {
              id: "user2",
              name: "Jan Nowak",
              email: "jan.n@example.com",
              role: "school_admin",
              avatar: "https://ui-avatars.com/api/?name=Jan+N&background=00AA55&color=fff"
            },
            createdAt: "2025-05-10T09:15:00Z",
            updatedAt: "2025-05-12T11:20:00Z",
            assignedTo: {
              id: "admin1",
              name: "Admin User"
            },
            responses: [
              {
                id: "r1",
                content: "Thank you for the suggestion! We're currently working on implementing batch printing for multiple units. It should be available in the next update.",
                author: {
                  id: "admin1",
                  name: "Admin User",
                  role: "admin"
                },
                createdAt: "2025-05-12T11:20:00Z",
                isInternal: false
              },
              {
                id: "r2",
                content: "This feature is currently in development and scheduled for release next week. Assigned to dev team.",
                author: {
                  id: "admin1",
                  name: "Admin User",
                  role: "admin"
                },
                createdAt: "2025-05-12T11:22:00Z",
                isInternal: true
              }
            ],
            tags: ["printing", "enhancement"],
            isBookmarked: true
          },
          {
            id: "f3",
            title: "Bug: Images Not Loading in Book 1 Unit 5",
            content: "The images in Book 1 Unit 5 are not loading properly. I've tried refreshing the page and using different browsers, but the issue persists. This makes it difficult to use the material in class.",
            category: "bug_report",
            status: "resolved",
            priority: "high",
            author: {
              id: "user3",
              name: "Monika Wiśniewska",
              email: "monika.w@example.com",
              role: "teacher",
              avatar: "https://ui-avatars.com/api/?name=Monika+W&background=9900EE&color=fff"
            },
            createdAt: "2025-05-08T15:45:00Z",
            updatedAt: "2025-05-09T10:30:00Z",
            bookId: "1",
            unitId: "5",
            responses: [
              {
                id: "r3",
                content: "We've identified the issue with the image loading and have resolved it. Please try accessing the unit again and let us know if you still experience any problems.",
                author: {
                  id: "admin2",
                  name: "Tech Support",
                  role: "admin"
                },
                createdAt: "2025-05-09T10:30:00Z",
                isInternal: false
              }
            ],
            tags: ["bug", "images", "book-1"],
            isBookmarked: false
          },
          {
            id: "f4",
            title: "Suggestion for Book 2 Content",
            content: "I would like to suggest adding more examples of conversations using the introduced vocabulary. Students often struggle with context, and having model dialogues would greatly help with their comprehension.",
            category: "feature_request",
            status: "new",
            priority: "low",
            author: {
              id: "user4",
              name: "Tomasz Kowalczyk",
              email: "tomasz.k@example.com",
              role: "teacher",
              avatar: "https://ui-avatars.com/api/?name=Tomasz+K&background=FF5500&color=fff"
            },
            createdAt: "2025-05-16T08:20:00Z",
            updatedAt: "2025-05-16T08:20:00Z",
            bookId: "2",
            responses: [],
            tags: ["book-2", "content-improvement"],
            isBookmarked: false
          },
          {
            id: "f5",
            title: "Question About Subscription",
            content: "I recently purchased the annual subscription for my school, but I'm unable to access all the content. Can you please check our account and ensure all features are activated?",
            category: "question",
            status: "closed",
            priority: "high",
            author: {
              id: "user5",
              name: "Agnieszka Lewandowska",
              email: "agnieszka.l@example.com",
              role: "school_admin",
              avatar: "https://ui-avatars.com/api/?name=Agnieszka+L&background=5500FF&color=fff"
            },
            createdAt: "2025-05-05T11:30:00Z",
            updatedAt: "2025-05-06T14:15:00Z",
            responses: [
              {
                id: "r4",
                content: "I've checked your account and found that the subscription was activated correctly, but there was an issue with the role assignment. I've fixed the problem, and you should now have full access to all content. Please let me know if you encounter any further issues.",
                author: {
                  id: "admin3",
                  name: "Customer Support",
                  role: "admin"
                },
                createdAt: "2025-05-06T09:45:00Z",
                isInternal: false
              },
              {
                id: "r5",
                content: "Thank you for your help. I can now access all the content without any issues.",
                author: {
                  id: "user5",
                  name: "Agnieszka Lewandowska",
                  role: "school_admin"
                },
                createdAt: "2025-05-06T14:15:00Z",
                isInternal: false
              }
            ],
            tags: ["subscription", "access-issue"],
            isBookmarked: false
          },
          {
            id: "f6",
            title: "Inappropriate Content in Book 5",
            content: "I noticed that one of the images in Book 5, Unit 3 may be inappropriate for young learners. The image on page 27 shows a character wearing clothing with text that could be considered offensive.",
            category: "content_issue",
            status: "flagged",
            priority: "critical",
            author: {
              id: "user6",
              name: "Piotr Zieliński",
              email: "piotr.z@example.com",
              role: "teacher",
              avatar: "https://ui-avatars.com/api/?name=Piotr+Z&background=AA0000&color=fff"
            },
            createdAt: "2025-05-17T16:10:00Z",
            updatedAt: "2025-05-17T16:45:00Z",
            bookId: "5",
            unitId: "3",
            responses: [
              {
                id: "r6",
                content: "Thank you for bringing this to our attention. We've flagged this content for immediate review by our editorial team.",
                author: {
                  id: "admin1",
                  name: "Admin User",
                  role: "admin"
                },
                createdAt: "2025-05-17T16:45:00Z",
                isInternal: false
              },
              {
                id: "r7",
                content: "Forwarded to the content team with high priority. Need replacement image ASAP.",
                author: {
                  id: "admin1",
                  name: "Admin User",
                  role: "admin"
                },
                createdAt: "2025-05-17T16:50:00Z",
                isInternal: true
              }
            ],
            tags: ["content-issue", "flagged", "book-5"],
            isBookmarked: true
          },
          {
            id: "f7",
            title: "Website Performance Issues",
            content: "I've noticed that the website has been running quite slowly for the past few days, especially when loading units with many images. This is affecting our classroom activities as we can't quickly move between slides.",
            category: "bug_report",
            status: "in_progress",
            priority: "high",
            author: {
              id: "user7",
              name: "Katarzyna Majewska",
              email: "katarzyna.m@example.com",
              role: "teacher",
              avatar: "https://ui-avatars.com/api/?name=Katarzyna+M&background=00AAAA&color=fff"
            },
            createdAt: "2025-05-14T10:05:00Z",
            updatedAt: "2025-05-14T11:30:00Z",
            assignedTo: {
              id: "admin2",
              name: "Tech Support"
            },
            responses: [
              {
                id: "r8",
                content: "We're aware of the performance issues and our technical team is working on resolving them. We've identified that the recent addition of high-resolution images is causing longer load times, and we're implementing optimizations to improve performance.",
                author: {
                  id: "admin2",
                  name: "Tech Support",
                  role: "admin"
                },
                createdAt: "2025-05-14T11:30:00Z",
                isInternal: false
              }
            ],
            tags: ["performance", "technical-issue"],
            isBookmarked: false
          }
        ];
        
        setFeedback(mockFeedback);
      } catch (err) {
        console.error("Error fetching feedback data:", err);
        setError("Failed to load feedback data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  // Filter feedback based on active tab, search, and filters
  const filteredFeedback = feedback.filter(item => {
    // Filter by tab (status group)
    if (activeTab === "new" && item.status !== "new") return false;
    if (activeTab === "in_progress" && item.status !== "in_progress") return false;
    if (activeTab === "resolved" && item.status !== "resolved") return false;
    if (activeTab === "closed" && item.status !== "closed") return false;
    if (activeTab === "flagged" && item.status !== "flagged") return false;
    if (activeTab === "bookmarked" && !item.isBookmarked) return false;
    
    // Filter by status
    if (statusFilter !== "all" && item.status !== statusFilter) return false;
    
    // Filter by category
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    
    // Filter by priority
    if (priorityFilter !== "all" && item.priority !== priorityFilter) return false;
    
    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        item.author.name.toLowerCase().includes(query) ||
        item.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    
    return true;
  }).sort((a, b) => {
    // Sort by date (newest first)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // Get counts by status
  const getCounts = () => {
    return {
      all: feedback.length,
      new: feedback.filter(item => item.status === "new").length,
      in_progress: feedback.filter(item => item.status === "in_progress").length,
      resolved: feedback.filter(item => item.status === "resolved").length,
      closed: feedback.filter(item => item.status === "closed").length,
      flagged: feedback.filter(item => item.status === "flagged").length,
      bookmarked: feedback.filter(item => item.isBookmarked).length
    };
  };

  const feedbackCounts = getCounts();

  // Format date for display
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

  // View feedback details
  const handleViewFeedback = (item: Feedback) => {
    setSelectedFeedback(item);
    setIsDetailDialogOpen(true);
  };

  // Open response dialog
  const handleOpenResponseDialog = (item: Feedback) => {
    setSelectedFeedback(item);
    setResponseContent("");
    setIsInternalResponse(false);
    setIsResponseDialogOpen(true);
  };

  // Submit response
  const handleSubmitResponse = () => {
    if (!selectedFeedback || !responseContent.trim()) return;
    
    const newResponse: FeedbackResponse = {
      id: `r${Date.now()}`,
      content: responseContent,
      author: {
        id: "admin1",
        name: "Admin User",
        role: "admin"
      },
      createdAt: new Date().toISOString(),
      isInternal: isInternalResponse
    };
    
    const updatedFeedback = {
      ...selectedFeedback,
      responses: [...selectedFeedback.responses, newResponse],
      status: isInternalResponse ? selectedFeedback.status : "in_progress" as FeedbackStatus,
      updatedAt: new Date().toISOString()
    };
    
    // Update feedback list
    setFeedback(prev => 
      prev.map(item => item.id === selectedFeedback.id ? updatedFeedback : item)
    );
    
    setIsResponseDialogOpen(false);
    
    // Show notification
    toast({
      title: "Response Added",
      description: isInternalResponse ? 
        "Internal note has been added." : 
        "Response has been sent to the user.",
    });
  };

  // Update feedback status
  const handleUpdateStatus = (item: Feedback, newStatus: FeedbackStatus) => {
    const updatedFeedback = {
      ...item,
      status: newStatus,
      updatedAt: new Date().toISOString()
    };
    
    // Update feedback list
    setFeedback(prev => 
      prev.map(f => f.id === item.id ? updatedFeedback : f)
    );
    
    // Show notification
    toast({
      title: "Status Updated",
      description: `Feedback has been marked as ${newStatus.replace('_', ' ')}.`,
    });
    
    // Close detail dialog if open
    if (isDetailDialogOpen && selectedFeedback?.id === item.id) {
      setSelectedFeedback(updatedFeedback);
    }
  };

  // Toggle bookmark
  const handleToggleBookmark = (item: Feedback) => {
    const updatedFeedback = {
      ...item,
      isBookmarked: !item.isBookmarked
    };
    
    // Update feedback list
    setFeedback(prev => 
      prev.map(f => f.id === item.id ? updatedFeedback : f)
    );
    
    // Show notification
    toast({
      title: updatedFeedback.isBookmarked ? "Feedback Bookmarked" : "Bookmark Removed",
      description: updatedFeedback.isBookmarked ? 
        "Feedback has been added to your bookmarks." : 
        "Feedback has been removed from your bookmarks.",
    });
    
    // Update selected feedback if open
    if (isDetailDialogOpen && selectedFeedback?.id === item.id) {
      setSelectedFeedback(updatedFeedback);
    }
  };

  // Delete feedback
  const handleConfirmDelete = () => {
    if (!selectedFeedback) return;
    
    // Remove feedback from list
    setFeedback(prev => prev.filter(item => item.id !== selectedFeedback.id));
    
    // Close dialogs
    setIsDeleteDialogOpen(false);
    setIsDetailDialogOpen(false);
    
    // Show notification
    toast({
      title: "Feedback Deleted",
      description: "The feedback item has been permanently deleted.",
    });
  };

  // Get priority badge
  const getPriorityBadge = (priority: FeedbackPriority) => {
    switch (priority) {
      case "low":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Low</Badge>;
      case "medium":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Medium</Badge>;
      case "high":
        return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">High</Badge>;
      case "critical":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Critical</Badge>;
      default:
        return null;
    }
  };

  // Get status badge
  const getStatusBadge = (status: FeedbackStatus) => {
    switch (status) {
      case "new":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">New</Badge>;
      case "in_progress":
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100">In Progress</Badge>;
      case "resolved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Resolved</Badge>;
      case "closed":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Closed</Badge>;
      case "flagged":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Flagged</Badge>;
      default:
        return null;
    }
  };

  // Get category icon
  const getCategoryIcon = (category: FeedbackCategory) => {
    switch (category) {
      case "question":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "bug_report":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "feature_request":
        return <Star className="h-4 w-4 text-purple-500" />;
      case "content_issue":
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case "general":
        return <MessageSquare className="h-4 w-4 text-gray-500" />;
      default:
        return null;
    }
  };

  // Get category label
  const getCategoryLabel = (category: FeedbackCategory) => {
    switch (category) {
      case "question":
        return "Question";
      case "bug_report":
        return "Bug Report";
      case "feature_request":
        return "Feature Request";
      case "content_issue":
        return "Content Issue";
      case "general":
        return "General Feedback";
      default:
        return category;
    }
  };

  // Render loading state
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex justify-center items-center h-96">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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
        <title>Feedback Management | Visual English Admin</title>
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
              <CardTitle className="text-2xl font-bold flex items-center">
                <MessageSquare className="mr-2 h-6 w-6" /> Feedback Management
              </CardTitle>
              <CardDescription>
                Review and respond to user feedback and content issues
              </CardDescription>
            </div>
            <div>
              <Button onClick={() => window.location.reload()} variant="outline" className="bg-white hover:bg-gray-50">
                <RefreshCw className="mr-2 h-4 w-4" /> Refresh
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
                    <p className="text-sm font-medium text-blue-700">New Feedback</p>
                    <h3 className="text-2xl font-bold text-blue-900">{feedbackCounts.new}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-blue-200 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-blue-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-purple-50 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">In Progress</p>
                    <h3 className="text-2xl font-bold text-purple-900">{feedbackCounts.in_progress}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-purple-200 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-purple-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Resolved</p>
                    <h3 className="text-2xl font-bold text-green-900">{feedbackCounts.resolved}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-green-200 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-red-700">Flagged Issues</p>
                    <h3 className="text-2xl font-bold text-red-900">{feedbackCounts.flagged}</h3>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-red-200 flex items-center justify-center">
                    <Flag className="h-5 w-5 text-red-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-4">
            {/* Filters and Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 mb-4">
                <TabsList className="bg-gray-100 p-1">
                  <TabsTrigger value="all" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    All <span className="ml-1 text-xs bg-gray-200 text-gray-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.all}</span>
                  </TabsTrigger>
                  <TabsTrigger value="new" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    New <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.new}</span>
                  </TabsTrigger>
                  <TabsTrigger value="in_progress" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    In Progress <span className="ml-1 text-xs bg-purple-100 text-purple-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.in_progress}</span>
                  </TabsTrigger>
                  <TabsTrigger value="resolved" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Resolved <span className="ml-1 text-xs bg-green-100 text-green-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.resolved}</span>
                  </TabsTrigger>
                  <TabsTrigger value="flagged" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Flagged <span className="ml-1 text-xs bg-red-100 text-red-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.flagged}</span>
                  </TabsTrigger>
                  <TabsTrigger value="bookmarked" className="data-[state=active]:bg-white data-[state=active]:shadow-sm">
                    Bookmarked <span className="ml-1 text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full">{feedbackCounts.bookmarked}</span>
                  </TabsTrigger>
                </TabsList>
                
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <Input
                      type="search"
                      placeholder="Search feedback..."
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
              
              {/* Advanced Filters */}
              <div className="flex flex-wrap gap-3 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Status:</span>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="new">New</SelectItem>
                      <SelectItem value="in_progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                      <SelectItem value="closed">Closed</SelectItem>
                      <SelectItem value="flagged">Flagged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Category:</span>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="h-8 w-[150px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="question">Question</SelectItem>
                      <SelectItem value="bug_report">Bug Report</SelectItem>
                      <SelectItem value="feature_request">Feature Request</SelectItem>
                      <SelectItem value="content_issue">Content Issue</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Priority:</span>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="h-8 w-[120px]">
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-8 text-xs"
                  onClick={() => {
                    setStatusFilter("all");
                    setCategoryFilter("all");
                    setPriorityFilter("all");
                    setSearchQuery("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
              
              <TabsContent value={activeTab} className="space-y-4">
                {filteredFeedback.length === 0 ? (
                  <div className="bg-white rounded-md border p-8 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <MessageSquare className="h-12 w-12 text-gray-300 mb-3" />
                      <h3 className="text-xl font-medium text-gray-700 mb-1">No feedback found</h3>
                      <p className="text-sm text-gray-500 mb-4 max-w-md mx-auto">
                        {searchQuery || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all" ? 
                          "No feedback matches your current filters. Try adjusting your search criteria or clearing filters." : 
                          "There are no feedback items to display in this category."
                        }
                      </p>
                      
                      {(searchQuery || statusFilter !== "all" || categoryFilter !== "all" || priorityFilter !== "all") && (
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            setStatusFilter("all");
                            setCategoryFilter("all");
                            setPriorityFilter("all");
                            setSearchQuery("");
                          }}
                        >
                          Clear Filters
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md border overflow-hidden">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[40%]">Feedback</TableHead>
                          <TableHead className="w-[15%]">Author</TableHead>
                          <TableHead className="hidden md:table-cell w-[15%]">Category</TableHead>
                          <TableHead className="hidden md:table-cell w-[15%]">Status</TableHead>
                          <TableHead className="hidden md:table-cell w-[15%]">Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredFeedback.map(item => (
                          <TableRow key={item.id} className="group hover:bg-gray-50">
                            <TableCell>
                              <div className="flex items-start space-x-3">
                                <div className="flex flex-col flex-grow min-w-0">
                                  <div className="flex items-center">
                                    <span className="font-medium truncate hover:text-blue-700 cursor-pointer" onClick={() => handleViewFeedback(item)}>
                                      {item.title}
                                    </span>
                                    {item.isBookmarked && (
                                      <Bookmark className="ml-2 h-4 w-4 text-amber-500" />
                                    )}
                                  </div>
                                  <div className="mt-1 text-xs text-gray-500 truncate w-full">
                                    {item.content.substring(0, 80)}...
                                  </div>
                                  <div className="mt-1.5 flex flex-wrap gap-1">
                                    {getPriorityBadge(item.priority)}
                                    {item.bookId && (
                                      <Badge variant="outline" className="text-xs">
                                        Book {item.bookId}
                                        {item.unitId && ` / Unit ${item.unitId}`}
                                      </Badge>
                                    )}
                                    {item.tags.slice(0, 2).map((tag, index) => (
                                      <Badge key={index} variant="outline" className="text-xs">
                                        {tag}
                                      </Badge>
                                    ))}
                                    {item.tags.length > 2 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{item.tags.length - 2} more
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                                  {item.author.avatar ? (
                                    <img src={item.author.avatar} alt={item.author.name} className="h-full w-full object-cover" />
                                  ) : (
                                    <div className="h-full w-full flex items-center justify-center bg-indigo-500 text-white text-sm font-medium">
                                      {item.author.name.charAt(0)}
                                    </div>
                                  )}
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium">{item.author.name}</span>
                                  <span className="text-xs text-gray-500 capitalize">{item.author.role.replace('_', ' ')}</span>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              <div className="flex items-center space-x-1">
                                {getCategoryIcon(item.category)}
                                <span className="text-sm">{getCategoryLabel(item.category)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {getStatusBadge(item.status)}
                            </TableCell>
                            <TableCell className="hidden md:table-cell text-sm">
                              <div className="flex flex-col">
                                <span>{formatDate(item.createdAt)}</span>
                                {item.updatedAt !== item.createdAt && (
                                  <span className="text-xs text-gray-500">
                                    Updated: {formatDate(item.updatedAt)}
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end space-x-1 opacity-70 group-hover:opacity-100">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleViewFeedback(item)}
                                  title="View Details"
                                  className="h-8 w-8 p-0"
                                >
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleOpenResponseDialog(item)}
                                  title="Respond"
                                  className="h-8 w-8 p-0"
                                >
                                  <Reply className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleToggleBookmark(item)}
                                  title={item.isBookmarked ? "Remove Bookmark" : "Bookmark"}
                                  className={`h-8 w-8 p-0 ${item.isBookmarked ? "text-amber-500" : ""}`}
                                >
                                  <Bookmark className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Feedback Detail Dialog */}
      {selectedFeedback && (
        <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
          <DialogContent className="sm:max-w-[700px] max-h-[85vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center">
                <div className="mr-2">
                  {getCategoryIcon(selectedFeedback.category)}
                </div>
                {selectedFeedback.title}
              </DialogTitle>
              <div className="flex flex-wrap gap-2 mt-2">
                {getStatusBadge(selectedFeedback.status)}
                {getPriorityBadge(selectedFeedback.priority)}
                {selectedFeedback.bookId && (
                  <Badge variant="outline">
                    Book {selectedFeedback.bookId}
                    {selectedFeedback.unitId && ` / Unit ${selectedFeedback.unitId}`}
                  </Badge>
                )}
              </div>
            </DialogHeader>
            
            {/* Feedback Content */}
            <div className="bg-gray-50 p-4 rounded-md border my-2">
              <div className="flex items-center space-x-2 mb-3">
                <div className="h-8 w-8 rounded-full overflow-hidden bg-gray-200">
                  {selectedFeedback.author.avatar ? (
                    <img 
                      src={selectedFeedback.author.avatar} 
                      alt={selectedFeedback.author.name} 
                      className="h-full w-full object-cover" 
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center bg-indigo-500 text-white text-sm font-medium">
                      {selectedFeedback.author.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-sm font-medium">{selectedFeedback.author.name}</div>
                  <div className="text-xs text-gray-500 capitalize">{selectedFeedback.author.role.replace('_', ' ')}</div>
                </div>
                <div className="flex-grow"></div>
                <div className="text-xs text-gray-500">
                  {formatDate(selectedFeedback.createdAt)}
                </div>
              </div>
              <div className="whitespace-pre-wrap text-sm">{selectedFeedback.content}</div>
            </div>
            
            {/* Feedback Tags */}
            {selectedFeedback.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 my-3">
                <span className="text-sm text-gray-500 flex items-center">
                  <Tag className="h-3.5 w-3.5 mr-1" /> Tags:
                </span>
                {selectedFeedback.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {/* Book/Unit References */}
            {selectedFeedback.bookId && (
              <div className="my-3 flex items-center">
                <span className="text-sm text-gray-500 flex items-center mr-2">
                  <BookOpen className="h-3.5 w-3.5 mr-1" /> Referenced content:
                </span>
                <Button variant="outline" size="sm" className="h-7 text-xs px-2 py-0">
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  View Book {selectedFeedback.bookId}
                  {selectedFeedback.unitId && `, Unit ${selectedFeedback.unitId}`}
                </Button>
              </div>
            )}
            
            {/* Responses */}
            {selectedFeedback.responses.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Responses ({selectedFeedback.responses.length})</h3>
                <div className="space-y-3">
                  {selectedFeedback.responses.map((response) => (
                    <div 
                      key={response.id} 
                      className={`rounded-md border p-3 ${
                        response.isInternal ? 'bg-amber-50 border-amber-200' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="h-6 w-6 rounded-full overflow-hidden bg-gray-200">
                          {response.author.avatar ? (
                            <img src={response.author.avatar} alt={response.author.name} className="h-full w-full object-cover" />
                          ) : (
                            <div className="h-full w-full flex items-center justify-center bg-indigo-500 text-white text-xs font-medium">
                              {response.author.name.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="text-xs font-medium">{response.author.name}</div>
                        <div className="flex-grow"></div>
                        <div className="text-xs text-gray-500">
                          {formatDate(response.createdAt)}
                        </div>
                      </div>
                      <div className="text-sm whitespace-pre-wrap">
                        {response.content}
                      </div>
                      {response.isInternal && (
                        <div className="text-xs text-amber-600 mt-1.5 flex items-center">
                          <Eye className="h-3 w-3 mr-1" />
                          Internal note (not visible to user)
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t mt-4">
              <div className="flex flex-wrap gap-2 sm:justify-start justify-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedFeedback, 'resolved')}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                  disabled={selectedFeedback.status === 'resolved'}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Mark Resolved
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleUpdateStatus(selectedFeedback, 'flagged')}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  disabled={selectedFeedback.status === 'flagged'}
                >
                  <Flag className="h-4 w-4 mr-1" />
                  Flag
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleToggleBookmark(selectedFeedback)}
                  className={`${selectedFeedback.isBookmarked ? 'text-amber-600 border-amber-200 hover:bg-amber-50' : ''}`}
                >
                  <Bookmark className="h-4 w-4 mr-1" />
                  {selectedFeedback.isBookmarked ? 'Bookmarked' : 'Bookmark'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsDetailDialogOpen(false);
                    setSelectedFeedback(selectedFeedback);
                    setIsDeleteDialogOpen(true);
                  }}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
              <div className="flex gap-2 justify-center">
                <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                  Close
                </Button>
                <Button 
                  onClick={() => {
                    setIsDetailDialogOpen(false);
                    handleOpenResponseDialog(selectedFeedback);
                  }}
                >
                  <Reply className="h-4 w-4 mr-1" />
                  Respond
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Response Dialog */}
      {selectedFeedback && (
        <Dialog open={isResponseDialogOpen} onOpenChange={setIsResponseDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Respond to Feedback</DialogTitle>
              <DialogDescription>
                You are responding to: <span className="font-medium">{selectedFeedback.title}</span>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Response</label>
                <textarea
                  className="w-full rounded-md border border-gray-300 p-3 min-h-[150px] focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Type your response..."
                  value={responseContent}
                  onChange={(e) => setResponseContent(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="internal-note"
                  checked={isInternalResponse}
                  onChange={() => setIsInternalResponse(!isInternalResponse)}
                  className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor="internal-note" className="text-sm">
                  Internal note (not visible to the user)
                </label>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-md border border-blue-200 text-sm">
                <div className="flex items-center text-blue-700 mb-1">
                  <Info className="h-4 w-4 mr-1.5" />
                  <span className="font-medium">Response will be sent to:</span>
                </div>
                <p>
                  {selectedFeedback.author.name} ({selectedFeedback.author.email})
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsResponseDialogOpen(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSubmitResponse}
                disabled={!responseContent.trim()}
                className={isInternalResponse ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                {isInternalResponse ? (
                  <>
                    <Eye className="h-4 w-4 mr-1" />
                    Save Internal Note
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-1" />
                    Send Response
                  </>
                )}
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
              onClick={handleConfirmDelete}
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

export default EnhancedFeedbackViewer;