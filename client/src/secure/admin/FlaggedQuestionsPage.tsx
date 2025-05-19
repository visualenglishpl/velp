import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  AlertTriangle,
  Check,
  X,
  Eye,
  Filter,
  Search,
  Flag,
  Clock,
  Calendar,
  Trash2,
  MessageSquare,
  AlertCircle
} from "lucide-react";

// Types for flagged content
type FlaggedItem = {
  id: string;
  bookId: string;
  unitId: string;
  slideId: string;
  originalContent: string;
  suggestedContent: string | null;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  reportedBy: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
  reportedAt: string;
  reviewedBy?: {
    id: string;
    name: string;
  };
  reviewedAt?: string;
  reviewNotes?: string;
};

const FlaggedQuestionsPage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [adminUser, setAdminUser] = useState<any>(null);
  
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
  
  // States for data
  const [flaggedItems, setFlaggedItems] = useState<FlaggedItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<FlaggedItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // States for UI
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookFilter, setBookFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  
  // Form states
  const [reviewNotes, setReviewNotes] = useState("");
  const [isApproved, setIsApproved] = useState(false);
  const [implementImmediately, setImplementImmediately] = useState(true);
  
  // Load flagged items
  useEffect(() => {
    const fetchFlaggedItems = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real app, this would be an API call
        // const response = await fetch('/api/admin/flagged-content');
        // const data = await response.json();
        
        // Mock data for development
        const mockFlaggedItems: FlaggedItem[] = [
          {
            id: 'flag_1',
            bookId: '1',
            unitId: '3',
            slideId: '08-M-A',
            originalContent: 'What is it? It is a sharpener',
            suggestedContent: 'What is this? It is a sharpener',
            reason: 'Grammar improvement - "What is it" should be "What is this" when referring to an object being shown',
            status: 'pending',
            reportedBy: {
              id: 'user_123',
              name: 'Emma Johnson',
              email: 'emma.j@school.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-15T10:30:00Z'
          },
          {
            id: 'flag_2',
            bookId: '2',
            unitId: '5',
            slideId: '12-C-B',
            originalContent: 'Do you collect stamps? Yes, I collect stamps.',
            suggestedContent: 'Do you collect stamps? Yes, I do. / No, I don\'t.',
            reason: 'The answer should be shorter for elementary level students',
            status: 'approved',
            reportedBy: {
              id: 'user_456',
              name: 'Michael Smith',
              email: 'm.smith@academy.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-10T14:45:00Z',
            reviewedBy: {
              id: 'admin_1',
              name: 'Admin User'
            },
            reviewedAt: '2025-05-12T09:20:00Z',
            reviewNotes: 'Approved. The suggestion makes the answer more natural and easier for students.'
          },
          {
            id: 'flag_3',
            bookId: '1',
            unitId: '7',
            slideId: '15-F-D',
            originalContent: 'Is that an orange? Yes, it is a orange.',
            suggestedContent: 'Is that an orange? Yes, it is an orange.',
            reason: 'Article error - should be "an orange" not "a orange"',
            status: 'approved',
            reportedBy: {
              id: 'user_789',
              name: 'Sarah Williams',
              email: 's.williams@school.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-14T16:30:00Z',
            reviewedBy: {
              id: 'admin_2',
              name: 'Content Reviewer'
            },
            reviewedAt: '2025-05-16T11:10:00Z',
            reviewNotes: 'Fixed the article error.'
          },
          {
            id: 'flag_4',
            bookId: '3',
            unitId: '4',
            slideId: '10-A-C',
            originalContent: 'What planet is closest to the sun? Mercury is closest to the sun.',
            suggestedContent: null,
            reason: 'The planet image shown is Venus, not Mercury. Please correct the image or question.',
            status: 'pending',
            reportedBy: {
              id: 'user_101',
              name: 'Robert Chen',
              email: 'r.chen@academy.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-17T09:15:00Z'
          },
          {
            id: 'flag_5',
            bookId: '2',
            unitId: '1',
            slideId: '05-D-E',
            originalContent: 'What season is it? It is Spring.',
            suggestedContent: 'What season is it? It is spring.',
            reason: 'Capitalization issue - "spring" should not be capitalized',
            status: 'rejected',
            reportedBy: {
              id: 'user_202',
              name: 'Lisa Parker',
              email: 'l.parker@school.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-11T13:20:00Z',
            reviewedBy: {
              id: 'admin_1',
              name: 'Admin User'
            },
            reviewedAt: '2025-05-13T10:40:00Z',
            reviewNotes: 'In this context, we\'re treating the seasons as proper nouns in our curriculum materials to maintain consistency across books.'
          },
          {
            id: 'flag_6',
            bookId: '4',
            unitId: '6',
            slideId: '30-A-F',
            originalContent: 'What is your favourite subject? My favourite subject is math.',
            suggestedContent: 'What is your favorite subject? My favorite subject is math.',
            reason: 'American English spelling should be used for consistency with other slides',
            status: 'pending',
            reportedBy: {
              id: 'user_303',
              name: 'James Wilson',
              email: 'j.wilson@academy.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-16T15:45:00Z'
          },
          {
            id: 'flag_7',
            bookId: '3',
            unitId: '8',
            slideId: '25-B-F',
            originalContent: 'Where is Venus? Venus is between Mercury and Earth.',
            suggestedContent: 'Where is Venus? Venus is the second planet from the Sun, between Mercury and Earth.',
            reason: 'Additional information would be helpful for clarity',
            status: 'pending',
            reportedBy: {
              id: 'user_404',
              name: 'David Thompson',
              email: 'd.thompson@school.edu',
              role: 'teacher'
            },
            reportedAt: '2025-05-18T08:30:00Z'
          }
        ];
        
        setFlaggedItems(mockFlaggedItems);
      } catch (err) {
        console.error("Error fetching flagged items:", err);
        setError("Failed to load flagged content. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchFlaggedItems();
  }, []);

  // Get unique books for filtering
  const uniqueBooks = Array.from(new Set(flaggedItems.map(item => item.bookId))).sort((a, b) => {
    // Ensure we're working with strings for comparison
    const numA = parseInt(a);
    const numB = parseInt(b);
    // Handle potential NaN values
    if (isNaN(numA) && isNaN(numB)) return 0;
    if (isNaN(numA)) return -1;
    if (isNaN(numB)) return 1;
    return numA - numB;
  });

  // Apply filters to flagged items
  const getFilteredItems = () => {
    return flaggedItems.filter(item => {
      // Filter by tab (status)
      if (activeTab !== 'all' && item.status !== activeTab) {
        return false;
      }
      
      // Filter by book
      if (bookFilter && item.bookId !== bookFilter) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          item.originalContent.toLowerCase().includes(query) ||
          (item.suggestedContent && item.suggestedContent.toLowerCase().includes(query)) ||
          item.reason.toLowerCase().includes(query) ||
          `${item.bookId}-${item.unitId}-${item.slideId}`.toLowerCase().includes(query) ||
          item.reportedBy.name.toLowerCase().includes(query)
        );
      }
      
      return true;
    });
  };

  const filteredItems = getFilteredItems();

  // Open review dialog
  const handleReviewItem = (item: FlaggedItem) => {
    setSelectedItem(item);
    setReviewNotes(item.reviewNotes || '');
    setIsApproved(item.status === 'approved');
    setIsReviewDialogOpen(true);
  };

  // Handle reviewing a flagged item
  const handleSaveReview = async () => {
    if (!selectedItem) return;
    
    try {
      const reviewData = {
        id: selectedItem.id,
        status: isApproved ? 'approved' : 'rejected',
        reviewNotes,
        implementImmediately,
      };
      
      // Mock API call for development
      // const response = await fetch(`/api/admin/flagged-content/${selectedItem.id}/review`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(reviewData)
      // });
      
      // Update the item in the local state
      const updatedItem: FlaggedItem = {
        ...selectedItem,
        status: isApproved ? 'approved' : 'rejected',
        reviewNotes,
        reviewedBy: {
          id: adminUser?.id?.toString() || 'admin_1',
          name: adminUser?.username || 'Admin User'
        },
        reviewedAt: new Date().toISOString()
      };
      
      setFlaggedItems(prevItems => 
        prevItems.map(item => item.id === selectedItem.id ? updatedItem : item)
      );
      
      toast({
        title: `Review ${isApproved ? 'Approved' : 'Rejected'}`,
        description: `The flagged content has been ${isApproved ? 'approved' : 'rejected'} successfully.`,
      });
      
      setIsReviewDialogOpen(false);
    } catch (err) {
      console.error("Error saving review:", err);
      toast({
        title: "Error",
        description: "Failed to save review. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Get status badge component
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><Check className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><X className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

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

  // Helper to get content ID
  const getContentId = (item: FlaggedItem) => {
    return `Book ${item.bookId}, Unit ${item.unitId}, Slide ${item.slideId}`;
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
              <div className="flex items-center mb-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/admin')}
                  className="mr-3 flex items-center gap-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                  Back to Admin
                </Button>
                <CardTitle className="text-2xl font-bold flex items-center">
                  <Flag className="mr-2 h-5 w-5" /> Flagged Content
                </CardTitle>
              </div>
              <CardDescription>
                Review and resolve content issues reported by users
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
              <TabsList>
                <TabsTrigger value="all">All Reports</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending <span className="ml-1 text-xs bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full">
                    {flaggedItems.filter(item => item.status === 'pending').length}
                  </span>
                </TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 items-end sm:items-center">
                <div className="w-full sm:w-auto">
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="h-9"
                  />
                </div>
                
                <div className="w-full sm:w-auto">
                  <select
                    value={bookFilter || ''}
                    onChange={(e) => setBookFilter(e.target.value || null)}
                    className="h-9 w-full rounded-md border border-input px-3 py-1 text-sm"
                  >
                    <option value="">All Books</option>
                    {uniqueBooks.map((bookId) => (
                      <option key={bookId} value={bookId}>
                        Book {bookId}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border overflow-hidden">
              <Table className="text-xs">
                <TableHeader>
                  <TableRow>
                    <TableHead className="py-1">Status</TableHead>
                    <TableHead className="py-1">Content ID</TableHead>
                    <TableHead className="py-1">Issue</TableHead>
                    <TableHead className="py-1">Reported By</TableHead>
                    <TableHead className="py-1">Date</TableHead>
                    <TableHead className="py-1 text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredItems.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="h-24 text-center text-sm">
                        No flagged content found.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredItems.map((item) => (
                      <TableRow key={item.id} className="text-xs">
                        <TableCell className="py-1">
                          {getStatusBadge(item.status)}
                        </TableCell>
                        <TableCell className="font-medium py-1">
                          {getContentId(item)}
                        </TableCell>
                        <TableCell className="py-1 max-w-[200px]">
                          <div className="whitespace-normal break-words text-xs leading-tight" title={item.reason}>
                            {item.reason}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col">
                            <span>{item.reportedBy.name}</span>
                            <span className="text-xs text-muted-foreground">{item.reportedBy.role}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div title={formatDate(item.reportedAt)}>
                            {new Date(item.reportedAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleReviewItem(item)}
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Review</span>
                          </Button>
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

      {/* Review Dialog */}
      {selectedItem && (
        <Dialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-yellow-500" />
                Review Flagged Content
              </DialogTitle>
              <DialogDescription>
                {getContentId(selectedItem)}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4">
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Reported By</Label>
                <div className="flex items-center">
                  <div className="bg-blue-100 text-blue-700 rounded-full h-8 w-8 flex items-center justify-center font-medium">
                    {selectedItem.reportedBy.name.charAt(0)}
                  </div>
                  <div className="ml-2">
                    <div className="font-medium">{selectedItem.reportedBy.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {selectedItem.reportedBy.email} • {selectedItem.reportedBy.role}
                    </div>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground flex items-center mt-1">
                  <Calendar className="h-3 w-3 mr-1" /> Reported {formatDate(selectedItem.reportedAt)}
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label className="text-muted-foreground">Issue Description</Label>
                <div className="rounded-md bg-yellow-50 border border-yellow-200 p-3 text-sm">
                  {selectedItem.reason}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">Current Content</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {selectedItem.originalContent}
                  </div>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-sm font-medium mb-2">Suggested Content</h3>
                  <div className="bg-gray-50 p-3 rounded-md">
                    {selectedItem.suggestedContent || 
                      <span className="text-muted-foreground italic">No specific content change suggested</span>
                    }
                  </div>
                </div>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Enter your review notes here..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="flex flex-col space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="approve-switch"
                    checked={isApproved}
                    onCheckedChange={setIsApproved}
                  />
                  <Label htmlFor="approve-switch">
                    {isApproved ? "Approve this change" : "Reject this change"}
                  </Label>
                </div>
                
                {isApproved && selectedItem.suggestedContent && (
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="implement-switch"
                      checked={implementImmediately}
                      onCheckedChange={setImplementImmediately}
                    />
                    <Label htmlFor="implement-switch">
                      Implement change immediately
                    </Label>
                  </div>
                )}
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsReviewDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveReview}>
                Save Review
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default FlaggedQuestionsPage;