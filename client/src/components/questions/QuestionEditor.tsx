import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Loader2 } from "lucide-react";

interface QuestionEditorProps {
  isOpen: boolean;
  onClose: () => void;
  questionData: {
    id?: string;
    bookId: string;
    unitId: string;
    slideId: string;
    originalQuestion: string;
    originalAnswer: string;
    flagReason?: string;
  } | null;
  onSave: (updatedQuestion: any) => void;
}

export default function QuestionEditor({ isOpen, onClose, questionData, onSave }: QuestionEditorProps) {
  const { toast } = useToast();
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Reset form when new question data is loaded
  useEffect(() => {
    if (questionData) {
      setQuestion(questionData.originalQuestion);
      setAnswer(questionData.originalAnswer);
    }
  }, [questionData]);

  const handleSubmit = async () => {
    if (!questionData) return;
    
    setIsSubmitting(true);
    
    try {
      // If the question has an ID, update it, otherwise create a new one
      const endpoint = questionData.id 
        ? `/api/content/questions/${questionData.id}` 
        : `/api/content/questions`;
      
      const method = questionData.id ? "PATCH" : "POST";
      
      const response = await apiRequest(method, endpoint, {
        question,
        answer,
        bookId: questionData.bookId,
        unitId: questionData.unitId,
        slideId: questionData.slideId
      });
      
      if (!response.ok) {
        throw new Error("Failed to update question");
      }
      
      const updatedQuestion = await response.json();
      
      toast({
        title: questionData.id ? "Question updated" : "Question created",
        description: questionData.id 
          ? "The question has been successfully updated." 
          : "A new question has been created.",
      });
      
      onSave(updatedQuestion);
      onClose();
    } catch (error) {
      console.error("Error updating question:", error);
      toast({
        title: "Update failed",
        description: "Failed to update the question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!questionData) return null;

  return (
    <Dialog open={isOpen} onOpenChange={() => onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Edit Question</DialogTitle>
          <DialogDescription>
            Edit the question and answer as needed. Your changes will be reviewed by a moderator.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {questionData.flagReason && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm text-yellow-800">
              <p className="font-medium mb-1">Flag Reason:</p>
              <p>{questionData.flagReason}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <label htmlFor="question" className="text-sm font-medium">
              Question
            </label>
            <Textarea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Enter the corrected question"
              rows={3}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="answer" className="text-sm font-medium">
              Answer
            </label>
            <Textarea
              id="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Enter the corrected answer"
              rows={3}
              className="resize-none"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <span className="text-gray-500">
                Book: <span className="font-medium text-gray-700">{questionData.bookId}</span> | 
                Unit: <span className="font-medium text-gray-700">{questionData.unitId}</span> | 
                Slide ID: <span className="font-medium text-gray-700">{questionData.slideId}</span>
              </span>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!question || !answer || isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              questionData.id ? "Save Changes" : "Create Question"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}