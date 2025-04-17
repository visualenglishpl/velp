import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import { ChevronLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FlaggedQuestion {
  id: number;
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion: string | null;
  suggestedAnswer: string | null;
  reason: string | null;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  bookId?: string;
  unitId?: string;
  createdAt: string;
  reviewedAt: string | null;
  adminNotes?: string | null;
}

export default function FlaggedQuestions() {
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState('pending');
  const [adminNotes, setAdminNotes] = useState('');
  const queryClient = useQueryClient();

  // Query for flagged questions
  const { data, isLoading, error } = useQuery({
    queryKey: ['/api/direct/flagged-questions', activeTab],
    queryFn: async () => {
      const res = await apiRequest('GET', `/api/direct/flagged-questions?status=${activeTab === 'all' ? 'all' : activeTab}`);
      const data = await res.json();
      return data.questions as FlaggedQuestion[];
    }
  });

  // Mutation for updating question status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status, notes }: { id: number; status: string; notes: string }) => {
      const res = await apiRequest('PATCH', `/api/direct/flagged-questions/${id}`, {
        status,
        adminNotes: notes
      });
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/direct/flagged-questions'] });
      toast({
        title: 'Status updated',
        description: 'The flagged question status has been updated.',
      });
      setAdminNotes('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Error',
        description: `Failed to update status: ${error.message}`,
        variant: 'destructive',
      });
    }
  });

  // Handle status update
  const handleStatusUpdate = (id: number, status: 'approved' | 'rejected') => {
    updateStatusMutation.mutate({ id, status, notes: adminNotes });
  };

  // Handle viewing the flagged content
  const handleViewContent = (bookId?: string, unitId?: string) => {
    if (bookId && unitId) {
      setLocation(`/book${bookId}/unit${unitId}`);
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  // Get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200"><CheckCircle className="h-3 w-3 mr-1" /> Approved</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200"><XCircle className="h-3 w-3 mr-1" /> Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex items-center mb-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setLocation('/admin/dashboard')}
          className="mr-4"
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
        </Button>
        <h1 className="text-2xl font-bold">Flagged Questions</h1>
      </div>

      <Tabs defaultValue="pending" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="approved">Approved</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading flagged questions...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-600">
              Error loading flagged questions. Please try again.
            </div>
          ) : !data || data.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-500">No {activeTab === 'all' ? '' : activeTab} flagged questions found.</p>
            </div>
          ) : (
            data.map((question) => (
              <Card key={question.id} className="mb-6">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Material ID: {question.materialId}</CardTitle>
                      <CardDescription>
                        Flagged on {formatDate(question.createdAt)} 
                        {question.reviewedAt && ` • Reviewed on ${formatDate(question.reviewedAt)}`}
                      </CardDescription>
                    </div>
                    <div>
                      {getStatusBadge(question.status)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-700">Current Question</h3>
                      <div className="bg-gray-50 p-3 rounded border">{question.questionText}</div>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-700">Current Answer</h3>
                      <div className="bg-gray-50 p-3 rounded border">{question.answerText}</div>
                    </div>
                  </div>

                  {(question.suggestedQuestion || question.suggestedAnswer) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                      {question.suggestedQuestion && (
                        <div className="space-y-2">
                          <h3 className="font-medium text-emerald-700">Suggested Question</h3>
                          <div className="bg-emerald-50 p-3 rounded border border-emerald-100">{question.suggestedQuestion}</div>
                        </div>
                      )}
                      {question.suggestedAnswer && (
                        <div className="space-y-2">
                          <h3 className="font-medium text-emerald-700">Suggested Answer</h3>
                          <div className="bg-emerald-50 p-3 rounded border border-emerald-100">{question.suggestedAnswer}</div>
                        </div>
                      )}
                    </div>
                  )}

                  {question.reason && (
                    <div className="space-y-2 pt-2">
                      <h3 className="font-medium text-gray-700">Reason for Flagging</h3>
                      <div className="bg-amber-50 p-3 rounded border border-amber-100">{question.reason}</div>
                    </div>
                  )}

                  {question.adminNotes && (
                    <div className="space-y-2 pt-2">
                      <h3 className="font-medium text-indigo-700">Admin Notes</h3>
                      <div className="bg-indigo-50 p-3 rounded border border-indigo-100">{question.adminNotes}</div>
                    </div>
                  )}

                  {question.bookId && question.unitId && (
                    <div className="pt-2">
                      <h3 className="font-medium text-gray-700 mb-2">Location</h3>
                      <div className="flex items-center">
                        <span className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-medium mr-2">
                          Book {question.bookId}
                        </span>
                        <span className="bg-purple-50 px-3 py-1 rounded-full text-purple-700 text-sm font-medium mr-2">
                          Unit {question.unitId}
                        </span>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleViewContent(question.bookId, question.unitId)}
                          className="ml-auto"
                        >
                          View Content
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>

                {question.status === 'pending' && (
                  <CardFooter className="flex flex-col space-y-4">
                    <div className="w-full">
                      <Textarea
                        placeholder="Add admin notes (optional)"
                        value={adminNotes}
                        onChange={(e) => setAdminNotes(e.target.value)}
                        className="w-full"
                      />
                    </div>
                    <div className="flex justify-end gap-2 w-full">
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(question.id, 'rejected')}
                        className="border-red-200 hover:bg-red-50 text-red-700"
                      >
                        <XCircle className="h-4 w-4 mr-1" /> Reject
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusUpdate(question.id, 'approved')}
                        className="border-green-200 hover:bg-green-50 text-green-700"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" /> Approve
                      </Button>
                    </div>
                  </CardFooter>
                )}
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}