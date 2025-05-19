import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { Flag, Check, X, Edit, MessageSquare, Filter, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type FlaggedQuestion = {
  id: number;
  bookId: string;
  unitId: number;
  slideId: string;
  question: string;
  suggestedAnswer?: string;
  reportedBy: string;
  reportReason: string;
  status: "pending" | "approved" | "rejected";
  reviewedBy?: string;
  reviewNotes?: string;
  createdAt: string;
  updatedAt?: string;
};

const FlaggedQuestionsPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State for questions and filters
  const [flaggedQuestions, setFlaggedQuestions] = useState<FlaggedQuestion[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<FlaggedQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookFilter, setBookFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [selectedQuestion, setSelectedQuestion] = useState<FlaggedQuestion | null>(null);
  const [reviewDialogOpen, setReviewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  
  // Review form state
  const [reviewStatus, setReviewStatus] = useState<"approved" | "rejected">("approved");
  const [reviewNotes, setReviewNotes] = useState("");
  const [correctedQuestion, setCorrectedQuestion] = useState("");
  const [correctedAnswer, setCorrectedAnswer] = useState("");

  // Get unique book IDs for filtering
  const uniqueBookIds = [...new Set(flaggedQuestions.map(q => q.bookId))];

  // Load flagged questions
  useEffect(() => {
    const fetchFlaggedQuestions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch("/api/admin/flagged-questions", {
          credentials: "include",
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch flagged questions");
        }
        
        const data = await response.json();
        setFlaggedQuestions(data);
        setFilteredQuestions(data);
      } catch (err) {
        console.error("Error fetching flagged questions:", err);
        setError("Failed to load flagged questions. Please try again later.");
        
        // For development testing - mock data
        const mockData: FlaggedQuestion[] = [
          {
            id: 1,
            bookId: "1",
            unitId: 3,
            slideId: "08-M-A",
            question: "What is it? It is a sharpener.",
            suggestedAnswer: "What is it? It is a pencil sharpener.",
            reportedBy: "teacher1",
            reportReason: "The answer is incomplete. It should specify 'pencil sharpener' for clarity.",
            status: "pending",
            createdAt: "2025-05-18T10:30:00Z"
          },
          {
            id: 2,
            bookId: "2",
            unitId: 5,
            slideId: "12-C-B",
            question: "Do you collect stamps? Yes, I do.",
            suggestedAnswer: "Do you collect stamps? Yes, I collect stamps.",
            reportedBy: "teacher2",
            reportReason: "The answer should use the full sentence structure for better learning.",
            status: "approved",
            reviewedBy: "admin",
            reviewNotes: "Changed to use complete sentence structure as suggested.",
            createdAt: "2025-05-17T14:22:00Z",
            updatedAt: "2025-05-17T16:45:00Z"
          },
          {
            id: 3,
            bookId: "3",
            unitId: 8,
            slideId: "15-F-D",
            question: "Where is Venus? Venus is between Mercury and Earth.",
            reportedBy: "school1",
            reportReason: "The question is scientifically incorrect. Venus is the second planet from the Sun.",
            status: "rejected",
            reviewedBy: "admin",
            reviewNotes: "The answer is correct. Venus is indeed between Mercury and Earth in our solar system.",
            createdAt: "2025-05-16T09:15:00Z",
            updatedAt: "2025-05-16T11:20:00Z"
          },
          {
            id: 4,
            bookId: "1",
            unitId: 10,
            slideId: "22-B-C",
            question: "Is the apple red? Yes, it is red.",
            suggestedAnswer: "Is the apple red? Yes, it is.",
            reportedBy: "teacher3",
            reportReason: "The answer repeats 'red' unnecessarily. More natural to say 'Yes, it is.'",
            status: "pending",
            createdAt: "2025-05-18T08:45:00Z"
          },
          {
            id: 5,
            bookId: "4",
            unitId: 12,
            slideId: "30-A-F",
            question: "What is your favourite subject? My favourite subject is mathmatics.",
            suggestedAnswer: "What is your favourite subject? My favourite subject is mathematics.",
            reportedBy: "teacher1",
            reportReason: "Spelling error in 'mathematics'",
            status: "pending",
            createdAt: "2025-05-19T07:30:00Z"
          }
        ];
        setFlaggedQuestions(mockData);
        setFilteredQuestions(mockData);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFlaggedQuestions();
  }, []);

  // Apply filters when filter states change
  useEffect(() => {
    let filtered = [...flaggedQuestions];
    
    // Filter by status
    if (statusFilter !== "all") {
      filtered = filtered.filter(q => q.status === statusFilter);
    }
    
    // Filter by book
    if (bookFilter !== "all") {
      filtered = filtered.filter(q => q.bookId === bookFilter);
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(q => 
        q.question?.toLowerCase().includes(query) || 
        q.suggestedAnswer?.toLowerCase().includes(query) || 
        q.reportReason?.toLowerCase().includes(query) ||
        q.reviewNotes?.toLowerCase().includes(query)
      );
    }
    
    setFilteredQuestions(filtered);
  }, [flaggedQuestions, statusFilter, bookFilter, searchQuery]);

  // Handle opening review dialog
  const handleReviewClick = (question: FlaggedQuestion) => {
    setSelectedQuestion(question);
    setCorrectedQuestion(question.question);
    setCorrectedAnswer(question.suggestedAnswer || "");
    setReviewStatus(question.status === "approved" ? "approved" : "rejected");
    setReviewNotes(question.reviewNotes || "");
    setReviewDialogOpen(true);
  };

  // Handle opening delete dialog
  const handleDeleteClick = (question: FlaggedQuestion) => {
    setSelectedQuestion(question);
    setDeleteDialogOpen(true);
  };

  // Handle saving review
  const handleSaveReview = async () => {
    if (!selectedQuestion) return;
    
    try {
      const reviewData = {
        id: selectedQuestion.id,
        status: reviewStatus,
        reviewNotes,
        correctedQuestion,
        correctedAnswer: correctedAnswer || undefined,
        reviewedBy: user?.username
      };
      
      // Make API call to update the question
      const response = await fetch(`/api/admin/flagged-questions/${selectedQuestion.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(reviewData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to update question review");
      }
      
      // Update the questions state
      setFlaggedQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === selectedQuestion.id 
            ? { 
                ...q, 
                status: reviewStatus, 
                reviewNotes, 
                question: reviewStatus === "approved" ? correctedQuestion : q.question,
                suggestedAnswer: reviewStatus === "approved" ? correctedAnswer : q.suggestedAnswer,
                reviewedBy: user?.username,
                updatedAt: new Date().toISOString()
              } 
            : q
        )
      );
      
      toast({
        title: "Review Saved",
        description: `Question #${selectedQuestion.id} has been ${reviewStatus}.`,
      });
      
      setReviewDialogOpen(false);
    } catch (err) {
      console.error("Error saving review:", err);
      toast({
        title: "Error",
        description: "Failed to save review. Please try again.",
        variant: "destructive",
      });
      
      // For development - update state anyway (simulation)
      setFlaggedQuestions(prevQuestions => 
        prevQuestions.map(q => 
          q.id === selectedQuestion.id 
            ? { 
                ...q, 
                status: reviewStatus, 
                reviewNotes, 
                question: reviewStatus === "approved" ? correctedQuestion : q.question,
                suggestedAnswer: reviewStatus === "approved" ? correctedAnswer : q.suggestedAnswer,
                reviewedBy: user?.username,
                updatedAt: new Date().toISOString()
              } 
            : q
        )
      );
      
      setReviewDialogOpen(false);
    }
  };

  // Handle deleting a question
  const handleDelete = async () => {
    if (!selectedQuestion) return;
    
    try {
      // Make API call to delete the question
      const response = await fetch(`/api/admin/flagged-questions/${selectedQuestion.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      
      // Update the questions state
      setFlaggedQuestions(prevQuestions => 
        prevQuestions.filter(q => q.id !== selectedQuestion.id)
      );
      
      toast({
        title: "Question Deleted",
        description: `Question #${selectedQuestion.id} has been removed from the system.`,
      });
      
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Error deleting question:", err);
      toast({
        title: "Error",
        description: "Failed to delete question. Please try again.",
        variant: "destructive",
      });
      
      // For development - update state anyway (simulation)
      setFlaggedQuestions(prevQuestions => 
        prevQuestions.filter(q => q.id !== selectedQuestion.id)
      );
      
      setDeleteDialogOpen(false);
    }
  };

  // Format display date
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

  // Get status badge variant
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Pending</Badge>;
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Approved</Badge>;
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl font-bold flex items-center">
                <Flag className="mr-2 h-5 w-5" /> Flagged Questions
              </CardTitle>
              <CardDescription>
                Review and manage reported content issues
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-500">
                {filteredQuestions.length} question{filteredQuestions.length !== 1 ? 's' : ''} • 
                {flaggedQuestions.filter(q => q.status === 'pending').length} pending
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="status-filter" className="mb-2 block">Status</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger id="status-filter" className="w-full">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="book-filter" className="mb-2 block">Book</Label>
              <Select value={bookFilter} onValueChange={setBookFilter}>
                <SelectTrigger id="book-filter" className="w-full">
                  <SelectValue placeholder="Filter by book" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Books</SelectItem>
                  {uniqueBookIds.map(bookId => (
                    <SelectItem key={bookId} value={bookId}>
                      Book {bookId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="search" className="mb-2 block">Search</Label>
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search questions, answers, or notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
          </div>

          {/* Question list */}
          {loading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : error ? (
            <div className="bg-red-50 p-4 rounded-md text-red-700 mb-4">
              {error}
            </div>
          ) : filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Flag className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">No flagged questions found</p>
              <p className="text-sm mt-1">Try adjusting your filters or check back later</p>
            </div>
          ) : (
            <Tabs defaultValue="table" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>
              
              <TabsContent value="table">
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Book/Unit</TableHead>
                        <TableHead>Question/Answer</TableHead>
                        <TableHead>Reported By</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredQuestions.map((question) => (
                        <TableRow key={question.id}>
                          <TableCell className="font-medium">{question.id}</TableCell>
                          <TableCell>
                            Book {question.bookId} / Unit {question.unitId}
                            <div className="text-xs text-gray-500">{question.slideId}</div>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-sm">
                              <div className="font-medium">{question.question}</div>
                              {question.suggestedAnswer && (
                                <div className="text-sm text-gray-600 mt-1">
                                  Suggested: {question.suggestedAnswer}
                                </div>
                              )}
                              <div className="text-xs text-gray-500 mt-1 italic">
                                "{question.reportReason}"
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{question.reportedBy}</TableCell>
                          <TableCell>{getStatusBadge(question.status)}</TableCell>
                          <TableCell>
                            <div>{formatDate(question.createdAt)}</div>
                            {question.updatedAt && (
                              <div className="text-xs text-gray-500">
                                Updated: {formatDate(question.updatedAt)}
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReviewClick(question)}
                              className="h-8 w-8 p-0 mr-1"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteClick(question)}
                              className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
              
              <TabsContent value="cards">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredQuestions.map((question) => (
                    <Card key={question.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">Question #{question.id}</CardTitle>
                            <CardDescription>
                              Book {question.bookId} / Unit {question.unitId} / Slide {question.slideId}
                            </CardDescription>
                          </div>
                          {getStatusBadge(question.status)}
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-500">Current Question:</p>
                          <p className="mt-1">{question.question}</p>
                        </div>
                        
                        {question.suggestedAnswer && (
                          <div className="mb-3">
                            <p className="text-sm font-medium text-gray-500">Suggested Answer:</p>
                            <p className="mt-1">{question.suggestedAnswer}</p>
                          </div>
                        )}
                        
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-500">Report Reason:</p>
                          <p className="mt-1 text-sm italic">{question.reportReason}</p>
                        </div>
                        
                        <div className="text-xs text-gray-500 flex justify-between items-center mt-4">
                          <span>Reported by: {question.reportedBy}</span>
                          <span>{formatDate(question.createdAt)}</span>
                        </div>
                        
                        {question.reviewNotes && (
                          <div className="mt-4 p-3 bg-gray-50 rounded-md">
                            <p className="text-xs font-medium text-gray-500">Review Notes:</p>
                            <p className="mt-1 text-sm">{question.reviewNotes}</p>
                            <div className="text-xs text-gray-500 mt-2">
                              By {question.reviewedBy} on {question.updatedAt && formatDate(question.updatedAt)}
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-end mt-4 gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleReviewClick(question)}
                          >
                            <Edit className="h-4 w-4 mr-1" /> Review
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                            onClick={() => handleDeleteClick(question)}
                          >
                            <X className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>

      {/* Review Dialog */}
      {selectedQuestion && (
        <Dialog open={reviewDialogOpen} onOpenChange={setReviewDialogOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Review Flagged Question</DialogTitle>
              <DialogDescription>
                Review and update the content as needed.
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="original-question">Original Question</Label>
                <div id="original-question" className="p-3 bg-gray-50 rounded-md">
                  {selectedQuestion.question}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="corrected-question">Corrected Question</Label>
                <Input
                  id="corrected-question"
                  value={correctedQuestion}
                  onChange={(e) => setCorrectedQuestion(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="corrected-answer">Corrected Answer</Label>
                <Input
                  id="corrected-answer"
                  value={correctedAnswer}
                  onChange={(e) => setCorrectedAnswer(e.target.value)}
                  placeholder="Enter the corrected answer (if needed)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="report-reason">Report Reason</Label>
                <div id="report-reason" className="p-3 bg-gray-50 rounded-md text-sm">
                  {selectedQuestion.reportReason}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-status">Review Action</Label>
                <Select value={reviewStatus} onValueChange={(value: any) => setReviewStatus(value)}>
                  <SelectTrigger id="review-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="approved">
                      <div className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Approve Changes
                      </div>
                    </SelectItem>
                    <SelectItem value="rejected">
                      <div className="flex items-center">
                        <X className="h-4 w-4 mr-2 text-red-500" />
                        Reject Changes
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="review-notes">Review Notes</Label>
                <Input
                  id="review-notes"
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  placeholder="Add notes about your decision (optional)"
                />
              </div>
            </div>
            
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setReviewDialogOpen(false)}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this flagged question? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
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

export default FlaggedQuestionsPage;