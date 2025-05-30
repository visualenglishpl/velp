import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Flag, Check, X, RefreshCw } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface QAData {
  country: string;
  question: string;
  answer: string;
  hasData: boolean;
  category?: string;
}

interface QADatabaseEntry {
  code: string;
  question: string;
  answer: string;
  country?: string;
  category?: string;
}

interface FlaggedQuestion {
  materialId: number;
  questionText: string;
  answerText: string;
  suggestedQuestion?: string;
  suggestedAnswer?: string;
  reason?: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt?: Date;
}

interface ExcelQAEntry {
  filename: string;
  codePattern: string;
  question: string;
  answer: string;
}

interface QuestionAnswerDisplayProps {
  material: {
    id: number;
    description: string;
    content: string;
    title: string;
  };
  isEditMode?: boolean;
  showQuestions?: boolean;
  bookId?: string;
  unitId?: string;
}

// Utility functions
const formatText = {
  // Remove file extensions and code patterns, properly capitalize text
  cleanFileName: (filename: string): string => {
    if (!filename) return '';
    // Remove file extensions
    let cleaned = filename.replace(/\.(png|jpg|jpeg|gif|webp)$/i, '');
    // Remove technical codes like "01 RA" or "05 LC"
    cleaned = cleaned.replace(/\d+\s+[a-z]\s+[a-z]/i, '');
    // Properly capitalize first letter of each word
    cleaned = cleaned.split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
      .trim();
    return cleaned;
  },
  
  // Determine country from content
  determineCountry: (content: string): string => {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('poland') || contentLower.includes('01 r')) {
      return 'POLAND';
    } else if (contentLower.includes('britain') || contentLower.includes('uk') || contentLower.includes('02 n')) {
      return 'BRITAIN / UK';
    } else if (contentLower.includes('ireland') || contentLower.includes('03 g')) {
      return 'NORTHERN IRELAND';
    } else if (contentLower.includes('scotland') || contentLower.includes('04 l')) {
      return 'SCOTLAND';
    } else if (contentLower.includes('england') || contentLower.includes('05 l')) {
      return 'ENGLAND';
    } else if (contentLower.includes('wales') || contentLower.includes('06 h')) {
      return 'WALES';
    } else if (contentLower.includes('australia') || contentLower.includes('07 l')) {
      return 'AUSTRALIA';
    } else if (contentLower.includes('usa') || contentLower.includes('america') || contentLower.includes('08 m')) {
      return 'USA';
    }
    
    return '';
  },
  
  // Extract question and answer directly from filename
  extractQuestionsFromFilename: (filename: string): { question: string, answer: string } | null => {
    if (!filename) return null;
    
    const lowerFilename = filename.toLowerCase();
    // Try to extract format like "What is it - it is a pencil"
    const dashMatch = filename.match(/([^-]+)\s*[\–\-]\s*(.+?)(\.jpg|\.png|\.gif|$)/i);
    
    if (dashMatch) {
      const beforeDash = dashMatch[1].trim();
      const afterDash = dashMatch[2].trim();
      
      // Check if it looks like a question and answer
      if (
        beforeDash.match(/^(what|where|how|why|when|who|which|is|are|do|does|can|could|has|have)/i) && 
        afterDash.length > 0
      ) {
        // Format as proper question
        let question = beforeDash;
        if (!question.endsWith('?')) {
          question += '?';
        }
        
        // Capitalize first letter
        question = question.charAt(0).toUpperCase() + question.slice(1);
        
        // Format answer with proper capitalization
        let answer = afterDash.charAt(0).toUpperCase() + afterDash.slice(1);
        if (!answer.endsWith('.')) {
          answer += '.';
        }
        
        return {
          question,
          answer
        };
      }
    }
    
    return null;
  }
};

// Helper function to get question and answer for a material
function getQuestionAnswerFromData(material: any): QAData {
  const content = material.content || '';
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  
  // Extract country information
  const country = formatText.determineCountry(content);
  
  // Try to extract question and answer directly from the filename using dash patterns
  // Examples: "What is it – It is a pencil.gif", "Where is this flag from – It is from Poland.jpg"
  const extractedFromFilename = formatText.extractQuestionsFromFilename(content);
  if (extractedFromFilename) {
    console.log("Extracted question/answer from filename:", extractedFromFilename);
    return {
      country: country,
      question: extractedFromFilename.question,
      answer: extractedFromFilename.answer,
      hasData: true
    };
  }
  
  // No matches found - return empty data
  // This will be filled by Excel data from S3
  return {
    country: country || "",
    question: "",
    answer: "",
    hasData: false
  };
}

const QuestionAnswerDisplay: React.FC<QuestionAnswerDisplayProps> = ({ material, isEditMode = false, showQuestions = true, bookId, unitId }) => {
  // Use Excel-based data for questions and answers
  const { 
    data: excelData,
    isLoading: isLoadingExcel,
    isError: excelError
  } = useQuery({
    queryKey: [bookId, unitId, 'excel-qa'],
    queryFn: async () => {
      if (!bookId || !unitId) return { success: false, entries: [] };
      
      try {
        const numericBookId = bookId.replace(/\D/g, '');
        const numericUnitId = unitId.replace(/\D/g, '');
        
        // Fetch Excel QA data for this specific book and unit
        const res = await apiRequest('GET', `/api/direct/${numericBookId}/${numericUnitId}/excel-qa`);
        if (!res.ok) {
          console.log(`Error loading Excel QA data for ${numericBookId}/${numericUnitId}: ${res.statusText}`);
          return { success: false, entries: [] };
        }
        
        const data = await res.json();
        console.log(`Loaded ${data.entries?.length || 0} QA entries from Excel for ${numericBookId}/${numericUnitId}`);
        return data;
      } catch (error) {
        console.error("Error fetching Excel QA data:", error);
        return { success: false, entries: [] };
      }
    },
    enabled: !!bookId && !!unitId
  });
  
  const [qaData, setQAData] = useState<QAData>({ country: '', question: '', answer: '', hasData: false });
  const [isEditing, setIsEditing] = useState(false);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [flagReason, setFlagReason] = useState('');
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    if (!material || !material.content) {
      setQAData({ country: '', question: '', answer: '', hasData: false });
      return;
    }
    
    // Try to match with Excel data first
    if (excelData?.entries?.length > 0) {
      // Get the filename
      const filename = material.content;
      const normalizedFilename = filename.toLowerCase();
      
      // Helper functions
      const normalizeString = (str: string) => str.toLowerCase().replace(/\s+/g, ' ').trim();
      const extractCodePattern = (text: string): string | null => {
        const matches = text.match(/(\d{2}\s*[A-Za-z]\s*[A-Za-z](?:\s+|$))/i);
        if (!matches) return null;
        
        let extractedCodePattern = matches[1].trim().toLowerCase();
        console.log("Extracted code pattern:", extractedCodePattern, "from filename:", filename);
        
        return extractedCodePattern;
      };
      
      // 1. First try exact filename match
      let matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
        normalizeString(entry.filename) === normalizedFilename
      );
      
      if (matchingEntry) {
        console.log("Found exact match for:", filename);
        console.log("Found local Excel mapping for:", filename);
        setQAData({ 
          country: formatText.determineCountry(filename),
          question: matchingEntry.question, 
          answer: matchingEntry.answer,
          hasData: true 
        });
        return;
      }
      
      // 2. Try to match code pattern
      const extractedCodePattern = extractCodePattern(filename);
      if (extractedCodePattern) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizeString(entry.codePattern) === normalizeString(extractedCodePattern)
        );
        
        if (matchingEntry) {
          console.log("Found exact code pattern match:", extractedCodePattern);
        }
      }
      
      // 3. If still no match, check if code pattern is contained in the filename
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizedFilename.includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern contained in filename:", matchingEntry.codePattern);
        }
      }
      
      // 4. If still no match, check if filename contains the question (without ? mark)
      if (!matchingEntry) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
          const questionWithoutQuestionMark = entry.question.replace(/\?$/, '');
          return normalizedFilename.includes(normalizeString(questionWithoutQuestionMark));
        });
        
        if (matchingEntry) {
          console.log("Found question match in filename for:", matchingEntry.question);
        }
      }
      
      // 5. If still no match, check if material description contains code pattern
      if (!matchingEntry && material.description) {
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => 
          normalizeString(material.description).includes(normalizeString(entry.codePattern))
        );
        
        if (matchingEntry) {
          console.log("Found code pattern in description:", matchingEntry.codePattern);
        }
      }
      
      // If we found a match from Excel data, use it
      if (matchingEntry) {
        console.log("Using Excel entry:", matchingEntry);
        setQAData({ 
          country: formatText.determineCountry(filename),
          question: matchingEntry.question, 
          answer: matchingEntry.answer,
          hasData: true 
        });
        return;
      }
    }
    
    // Fall back to the basic pattern matching logic if no Excel match
    // This section only extracts patterns from the filename, not hardcoded questions
    const processed = getQuestionAnswerFromData(material);
    setQAData(processed);
  }, [material, excelData]);
  
  const handleFlagQuestion = async () => {
    try {
      const flagData: Partial<FlaggedQuestion> = {
        materialId: material.id,
        questionText: qaData.question,
        answerText: qaData.answer,
        suggestedQuestion: editedQuestion || undefined,
        suggestedAnswer: editedAnswer || undefined,
        reason: flagReason || undefined,
        status: 'pending'
      };
      
      const res = await apiRequest('POST', '/api/flagged-questions', flagData);
      
      if (res.ok) {
        toast({
          title: "Flagged successfully",
          description: "Thank you for your feedback. An admin will review it soon.",
        });
        setShowForm(false);
        setFlagReason('');
        setEditedQuestion('');
        setEditedAnswer('');
      } else {
        throw new Error('Failed to flag question');
      }
    } catch (error) {
      toast({
        title: "Error flagging question",
        description: "There was a problem submitting your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!material) {
    return null;
  }
  
  return (
    <div className={`relative ${showQuestions ? 'flex flex-col items-center justify-center' : 'hidden'}`}>
      {/* Controls shown in edit mode */}
      {isEditMode && (
        <div className="absolute -top-2 right-0 flex space-x-2">
          <button
            onClick={() => {
              // Reset to default values from database or pattern matching
              const processed = getQuestionAnswerFromData(material);
              setQAData(processed);
              setIsEditing(false);
            }}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Reset to default"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {!isEditing ? (
            <button
              onClick={() => {
                setEditedQuestion(qaData.question);
                setEditedAnswer(qaData.answer);
                setIsEditing(true);
              }}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          ) : (
            <>
              <button
                onClick={() => {
                  setQAData(prev => ({ ...prev, question: editedQuestion, answer: editedAnswer }));
                  setIsEditing(false);
                }}
                className="p-1 text-green-500 hover:text-green-700 transition-colors"
                title="Save"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      )}
      
      {/* Loading state for Excel data */}
      {isLoadingExcel && (
        <div className="p-2 text-center">
          <svg className="animate-spin h-5 w-5 text-indigo-500 mx-auto mb-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-sm text-gray-500">Loading question data...</p>
        </div>
      )}
      
      {/* Display question and answer */}
      {!isLoadingExcel && qaData.hasData && (
        <div className="p-2 text-center">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <input
                  value={editedQuestion}
                  onChange={(e) => setEditedQuestion(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
              <div>
                <input
                  value={editedAnswer}
                  onChange={(e) => setEditedAnswer(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
            </div>
          ) : (
            <>
              <div className="mb-1 font-medium text-xl">{qaData.question}</div>
              <div className="text-lg">{qaData.answer}</div>
              
              {/* Flag button for users to report incorrect questions */}
              {!isEditMode && (
                <div className="mt-3">
                  {!showForm ? (
                    <button
                      onClick={() => setShowForm(true)}
                      className="inline-flex items-center text-xs text-gray-500 hover:text-red-500"
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      Flag as incorrect
                    </button>
                  ) : (
                    <div className="p-2 border rounded-md w-full max-w-sm mx-auto mt-2">
                      <h4 className="text-sm font-medium mb-1">Flag this Q&A as incorrect</h4>
                      <div className="space-y-2 text-left">
                        <div>
                          <label className="block text-xs mb-1">Reason</label>
                          <select
                            value={flagReason}
                            onChange={(e) => setFlagReason(e.target.value)}
                            className="w-full p-1 text-sm border rounded"
                          >
                            <option value="">Select a reason</option>
                            <option value="Wrong question">Wrong question</option>
                            <option value="Wrong answer">Wrong answer</option>
                            <option value="Both wrong">Both wrong</option>
                            <option value="Typo or grammar">Typo or grammar</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Suggested question (optional)</label>
                          <input
                            value={editedQuestion}
                            onChange={(e) => setEditedQuestion(e.target.value)}
                            placeholder={qaData.question}
                            className="w-full p-1 text-sm border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Suggested answer (optional)</label>
                          <input
                            value={editedAnswer}
                            onChange={(e) => setEditedAnswer(e.target.value)}
                            placeholder={qaData.answer}
                            className="w-full p-1 text-sm border rounded"
                          />
                        </div>
                        
                        <div className="flex justify-end space-x-2 mt-2">
                          <button
                            onClick={() => {
                              setShowForm(false);
                              setFlagReason('');
                              setEditedQuestion('');
                              setEditedAnswer('');
                            }}
                            className="px-2 py-1 text-xs text-gray-500 hover:text-gray-700"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleFlagQuestion}
                            disabled={!flagReason}
                            className={`px-2 py-1 text-xs text-white rounded ${flagReason ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 cursor-not-allowed'}`}
                          >
                            Submit
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}
      
      {/* No data found state */}
      {!isLoadingExcel && !qaData.hasData && (
        <div className="p-2 text-center text-gray-500">
          <p>No question available for this slide.</p>
          {qaData.country && <p className="text-xs">Country/Category: {qaData.country}</p>}
        </div>
      )}
    </div>
  );
};

export default QuestionAnswerDisplay;