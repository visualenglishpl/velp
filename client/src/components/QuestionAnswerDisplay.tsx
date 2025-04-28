import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Flag, Check, X, RefreshCw, EyeOff, Trash2 } from "lucide-react";
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
  hasPaidAccess?: boolean;
  index?: number;
  freeSlideLimit?: number;
  onSlideDelete?: (id: number) => void;
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

const QuestionAnswerDisplay: React.FC<QuestionAnswerDisplayProps> = ({ 
  material, 
  isEditMode = false, 
  showQuestions = true, 
  bookId, 
  unitId,
  hasPaidAccess = false,
  index = 0,
  freeSlideLimit = 10,
  onSlideDelete
}) => {
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
        // Use the full bookId and unitId format instead of just extracting numeric parts
        // This ensures we match the correct path in our server's API endpoints
        
        // Fetch Excel QA data for this specific book and unit
        const res = await apiRequest('GET', `/api/direct/${bookId}/${unitId}/excel-qa`);
        if (!res.ok) {
          console.log(`Error loading Excel QA data for ${bookId}/${unitId}: ${res.statusText}`);
          return { success: false, entries: [] };
        }
        
        const data = await res.json();
        console.log(`Loaded ${data.entries?.length || 0} QA entries from Excel for ${bookId}/${unitId}`);
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
  const [isDeleted, setIsDeleted] = useState(false);
  const [hideImage, setHideImage] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [serverSynced, setServerSynced] = useState(false);
  // Always show answers directly, no need for reveal feature
  const { toast } = useToast();

  // Load saved Q&A data from server and localStorage when component mounts
  useEffect(() => {
    if (bookId && unitId && material?.id) {
      // First try to get edits from localStorage (for immediate display)
      try {
        const savedQAString = localStorage.getItem(`qa-${bookId}-${unitId}`);
        if (savedQAString) {
          const savedQA = JSON.parse(savedQAString);
          if (savedQA[material.id]) {
            const savedItem = savedQA[material.id];
            
            // Check if this Q&A was deleted
            if (savedItem.deleted) {
              setIsDeleted(true);
            }
            
            // Apply saved edits
            else if (savedItem.question && savedItem.answer) {
              setQAData(prev => ({ 
                ...prev, 
                question: savedItem.question, 
                answer: savedItem.answer,
                hasData: true 
              }));
            }
          }
        }
      } catch (error) {
        console.error("Error loading saved Q&A data from localStorage:", error);
      }
      
      // Then try to fetch from server (which will override localStorage if newer)
      const fetchServerEdits = async () => {
        try {
          const response = await apiRequest('GET', `/api/direct/content-edits/${bookId}/${unitId}`);
          if (response.ok) {
            const data = await response.json();
            
            if (data.success && data.edits && data.edits.length > 0) {
              // Find edits for this specific material
              const materialEdits = data.edits.filter((edit: any) => 
                edit.materialId === material.id
              );
              
              if (materialEdits.length > 0) {
                // Get the most recent edit
                const latestEdit = materialEdits.reduce((latest: any, edit: any) => {
                  const latestDate = latest?.updatedAt || latest?.createdAt || '';
                  const currentDate = edit.updatedAt || edit.createdAt || '';
                  return new Date(currentDate) > new Date(latestDate) ? edit : latest;
                }, null);
                
                if (latestEdit) {
                  setServerSynced(true);
                  
                  // Apply server edits based on edit type
                  if (latestEdit.editType === 'qa_delete' || latestEdit.isDeleted) {
                    setIsDeleted(true);
                  } 
                  else if (latestEdit.editType === 'qa_edit' && latestEdit.questionText && latestEdit.answerText) {
                    setQAData(prev => ({ 
                      ...prev, 
                      question: latestEdit.questionText, 
                      answer: latestEdit.answerText,
                      hasData: true 
                    }));
                    
                    // Update localStorage with server data
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { 
                      question: latestEdit.questionText, 
                      answer: latestEdit.answerText 
                    };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                }
              }
            }
          }
        } catch (error) {
          console.error("Error fetching content edits from server:", error);
        }
      };
      
      fetchServerEdits();
    }
  }, [bookId, unitId, material?.id]);
  
  useEffect(() => {
    if (!material || !material.content) {
      setQAData({ country: '', question: '', answer: '', hasData: false });
      return;
    }
    
    // Don't load data if this Q&A is marked as deleted
    if (isDeleted) {
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
        // Special case for ruler, scissors, and sharpener sections
        if (text.toLowerCase().includes('ruler') || 
            text.toLowerCase().includes('scissors') || 
            text.toLowerCase().includes('sharpener')) {
          
          // Check for the standard pattern first (most specific)
          let specialMatches = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])(?:\s+|$)/i);
          if (specialMatches) {
            let specialPattern = `${specialMatches[1]} ${specialMatches[2].toUpperCase()} ${specialMatches[3].toUpperCase()}`;
            console.log("Extracted special section pattern:", specialPattern, "from filename:", filename);
            return specialPattern;
          }
          
          // For these special sections, try to extract the pattern in a more flexible way
          // Look for pattern like "11 N" or "12 N" which are common for these objects
          specialMatches = text.match(/(\d{2})\s*([A-Za-z])/i);
          if (specialMatches) {
            let specialSimplePattern = `${specialMatches[1]} ${specialMatches[2].toUpperCase()}`;
            console.log("Extracted simplified special section pattern:", specialSimplePattern, "from filename:", filename);
            return specialSimplePattern;
          }
        }
        
        // Try the standard format like "01 I A"
        let matches = text.match(/(\d{2})\s*([A-Za-z])\s*([A-Za-z])(?:\s+|$)/i);
        if (matches) {
          // Standardize the code pattern format as "XX Y Z" (e.g., "01 I A")
          let extractedCodePattern = `${matches[1]} ${matches[2].toUpperCase()} ${matches[3].toUpperCase()}`;
          console.log("Extracted standard code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        // Try alternative format like "01I"
        matches = text.match(/(\d{2})\s*([A-Za-z])/i);
        if (matches) {
          // Standardize as "XX Y" (e.g., "01 I")
          let extractedCodePattern = `${matches[1]} ${matches[2].toUpperCase()}`;
          console.log("Extracted simplified code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        // Try just the numeric part like "01"
        matches = text.match(/^.*?(\d{2}).*$/i);
        if (matches) {
          let extractedCodePattern = matches[1];
          console.log("Extracted numeric code pattern:", extractedCodePattern, "from filename:", filename);
          return extractedCodePattern;
        }
        
        return null;
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
        console.log(`Searching for match with extracted code pattern: "${extractedCodePattern}"`);
        
        // Convert to more flexible matching by standardizing both sides
        matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
          const normalizedEntryPattern = normalizeString(entry.codePattern);
          const normalizedExtractedPattern = normalizeString(extractedCodePattern);
          
          // Try exact match
          if (normalizedEntryPattern === normalizedExtractedPattern) {
            console.log(`Found exact code pattern match: "${entry.codePattern}" = "${extractedCodePattern}"`);
            return true;
          }
          
          // Try prefix match (e.g., "01 I" matches "01 I A")
          if (normalizedEntryPattern.startsWith(normalizedExtractedPattern) || 
              normalizedExtractedPattern.startsWith(normalizedEntryPattern)) {
            console.log(`Found prefix code pattern match: "${entry.codePattern}" starts with "${extractedCodePattern}" (or vice versa)`);
            return true;
          }
          
          // Special case for scissors, ruler, and sharpener sections
          if (filename.toLowerCase().includes('scissors') || 
              filename.toLowerCase().includes('ruler') || 
              filename.toLowerCase().includes('sharpener')) {
              
            // For these sections, we should be more flexible with numeric patterns
            // Extract just the numeric part of both patterns
            const entryNumeric = entry.codePattern.match(/(\d{2})/);
            const extractedNumeric = extractedCodePattern.match(/(\d{2})/);
            
            if (entryNumeric && extractedNumeric && entryNumeric[1] === extractedNumeric[1]) {
              // If the numeric parts match (11, 12, 07, etc.), this is likely a match
              console.log(`Found special section numeric match: "${entry.codePattern}" and "${extractedCodePattern}" share numeric part ${extractedNumeric[1]}`);
              return true;
            }
            
            // Also check if the section name is in the question
            const questionLower = entry.question.toLowerCase();
            if ((filename.toLowerCase().includes('scissors') && questionLower.includes('scissors')) ||
                (filename.toLowerCase().includes('ruler') && questionLower.includes('ruler')) ||
                (filename.toLowerCase().includes('sharpener') && questionLower.includes('sharpener'))) {
              console.log(`Found match based on special section name in question: "${entry.question}"`);
              return true;
            }
          }
          
          return false;
        });
        
        if (matchingEntry) {
          console.log(`Found match using code pattern "${extractedCodePattern}" against entry with pattern "${matchingEntry.codePattern}"`);
        } else {
          console.log(`No entries matched the code pattern "${extractedCodePattern}"`);
          // Debug - print all available code patterns
          console.log("Available code patterns:", excelData.entries.map((e: ExcelQAEntry) => e.codePattern).join(", "));
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
      
      // Special additional check for scissors, ruler, and sharpener sections
      if (!matchingEntry) {
        if (filename.toLowerCase().includes('scissors') || 
            filename.toLowerCase().includes('ruler') || 
            filename.toLowerCase().includes('sharpener')) {
            
          // Try to match based on the specific object type in the question
          matchingEntry = excelData.entries.find((entry: ExcelQAEntry) => {
            const questionLower = entry.question.toLowerCase();
            
            return (filename.toLowerCase().includes('scissors') && questionLower.includes('scissors')) ||
                   (filename.toLowerCase().includes('ruler') && questionLower.includes('ruler')) ||
                   (filename.toLowerCase().includes('sharpener') && questionLower.includes('sharpener'));
          });
          
          if (matchingEntry) {
            console.log("Found special section match based on object type:", matchingEntry.question);
          }
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
            onClick={async () => {
              setIsSaving(true);
              
              // Reset to default values from database or pattern matching
              const processed = getQuestionAnswerFromData(material);
              setQAData(processed);
              setIsEditing(false);
              setIsDeleted(false);
              setServerSynced(false);

              // Save this reset to localStorage
              if (bookId && unitId) {
                const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                delete savedQA[material.id];
                localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
              }
              
              // Try to reset on server
              try {
                if (bookId && unitId && material?.id) {
                  const response = await apiRequest('DELETE', `/api/direct/content-edits/${bookId}/${unitId}/${material.id}`);
                  const result = await response.json();
                  
                  if (result.success) {
                    toast({
                      title: "Reset complete",
                      description: result.dbAvailable === false 
                        ? "Content has been reset on this device." 
                        : "Content has been reset on the server and this device.",
                    });
                  } else {
                    // If server reset failed, still inform user that local reset worked
                    toast({
                      title: "Partial reset",
                      description: "Content has been reset on this device but the server reset failed.",
                    });
                  }
                } else {
                  toast({
                    title: "Reset complete",
                    description: "Content has been reset to default values.",
                  });
                }
              } catch (error) {
                console.error('Error resetting content on server:', error);
                toast({
                  title: "Partial reset",
                  description: "Content has been reset on this device but the server reset failed.",
                });
              } finally {
                setIsSaving(false);
              }
            }}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Reset to default"
          >
            <RefreshCw className="h-4 w-4" />
          </button>
          
          {!isEditing && !isDeleted ? (
            <>
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
              
              <button
                onClick={async () => {
                  // Delete the Q&A but keep track of this decision
                  setIsDeleted(true);
                  setIsSaving(true);
                  
                  // Save this deletion to localStorage
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { deleted: true };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_delete',
                        isDeleted: true
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Question removed",
                          description: result.dbAvailable === false 
                            ? "The question has been removed from this slide and saved to this device." 
                            : "The question has been removed and this change will persist across devices.",
                        });
                      } else {
                        console.error('Error saving deletion to server:', result.error);
                        toast({
                          title: "Question removed",
                          description: "The question has been removed from this slide but the change could not be saved to the server.",
                        });
                      }
                    } else {
                      toast({
                        title: "Question removed",
                        description: "The question and answer have been removed from this slide.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving deletion to server:', error);
                    toast({
                      title: "Question removed",
                      description: "The question has been removed from this slide but the change could not be saved to the server.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="p-1 text-red-500 hover:text-red-700 transition-colors"
                title="Delete Question/Answer"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              <button
                onClick={async () => {
                  // Delete the Q&A but keep track of this decision
                  setIsDeleted(true);
                  setIsSaving(true);
                  
                  // Save this deletion to localStorage
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { deleted: true };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_delete',
                        isDeleted: true
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Question hidden",
                          description: result.dbAvailable === false 
                            ? "The question has been hidden from this slide and saved to this device." 
                            : "The question has been hidden and this change will persist across devices.",
                        });
                      } else {
                        console.error('Error saving deletion to server:', result.error);
                        toast({
                          title: "Question hidden",
                          description: "The question has been hidden from this slide but the change could not be saved to the server.",
                        });
                      }
                    } else {
                      toast({
                        title: "Question hidden",
                        description: "The question and answer have been hidden from this slide.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving deletion to server:', error);
                    toast({
                      title: "Question hidden",
                      description: "The question has been hidden from this slide but the change could not be saved to the server.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
                }}
                className="p-1 text-amber-500 hover:text-amber-700 transition-colors"
                title="Hide Q&A"
              >
                <EyeOff className="h-4 w-4" />
              </button>
              
              {/* Video slide delete button - only show for MP4 files */}
              {material.content.toLowerCase().endsWith('.mp4') && onSlideDelete && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSlideDelete && material.id && confirm("Are you sure you want to remove this video slide from the unit?")) {
                      onSlideDelete(material.id);
                    }
                  }}
                  className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  title="Remove video slide from unit"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </>
          ) : isEditing ? (
            <>
              <button
                onClick={async () => {
                  setIsSaving(true);
                  const updatedQA = {
                    ...qaData,
                    question: editedQuestion,
                    answer: editedAnswer,
                    hasData: true
                  };
                  setQAData(updatedQA);
                  setIsEditing(false);
                  
                  // Save changes to localStorage for persistence
                  if (bookId && unitId) {
                    const savedQA = JSON.parse(localStorage.getItem(`qa-${bookId}-${unitId}`) || "{}");
                    savedQA[material.id] = { question: editedQuestion, answer: editedAnswer };
                    localStorage.setItem(`qa-${bookId}-${unitId}`, JSON.stringify(savedQA));
                  }
                  
                  // Try to save to server
                  try {
                    // Function to save edits to server
                    if (bookId && unitId && material?.id) {
                      const editData = {
                        bookId,
                        unitId,
                        materialId: material.id,
                        editType: 'qa_edit',
                        questionText: editedQuestion,
                        answerText: editedAnswer
                      };
                      
                      const response = await apiRequest('POST', '/api/direct/content-edits', editData);
                      const result = await response.json();
                      
                      if (result.success) {
                        setServerSynced(true);
                        toast({
                          title: "Changes saved",
                          description: result.dbAvailable === false 
                            ? "Your edits have been saved to this device." 
                            : "Your edits have been saved to the server and will persist across devices.",
                        });
                      } else {
                        console.error('Error saving to server:', result.error);
                        toast({
                          title: "Changes saved locally",
                          description: "Your edits could not be saved to the server but are saved on this device.",
                        });
                      }
                    } else {
                      toast({
                        title: "Changes saved locally",
                        description: "Your edits have been saved to this device.",
                      });
                    }
                  } catch (error) {
                    console.error('Error saving edit to server:', error);
                    toast({
                      title: "Changes saved locally",
                      description: "Your edits could not be saved to the server but are saved on this device.",
                    });
                  } finally {
                    setIsSaving(false);
                  }
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
          ) : null}
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
      
      {/* Display question and answer - unless it's been deleted */}
      {!isLoadingExcel && qaData.hasData && !isDeleted && (
        <div className="p-2 text-center relative">
          {isEditing ? (
            <div className="space-y-2">
              <div>
                <input
                  value={editedQuestion}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedQuestion(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
              <div>
                <input
                  value={editedAnswer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAnswer(e.target.value)}
                  className="w-full p-2 border rounded text-center"
                />
              </div>
            </div>
          ) : (
            <>
              {/* Handle premium content for questions and answers */}
              {!hasPaidAccess && index >= freeSlideLimit ? (
                <div className="py-4 relative">
                  <div className="blur-lg brightness-75">
                    <div className="mb-3 font-semibold text-2xl">Premium Content</div>
                    <div className="text-lg">Subscribe to view questions and answers</div>
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm text-white z-10 p-4 text-center">
                    <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
                    <p className="text-sm mb-4">Subscribe to access all learning materials</p>
                    <button 
                      className="px-4 py-1 bg-primary text-white rounded-md text-sm hover:bg-primary/90"
                      onClick={() => window.location.href = '/checkout/single_lesson'}
                    >
                      Upgrade Now
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {/* Callan-style centered question with larger font */}
                  <div className="mb-4 font-medium text-2xl bg-primary/5 py-3 px-4 rounded-md border border-primary/20">
                    {qaData.question}
                  </div>
                  
                  {/* Answer - shown directly */}
                  <div className="text-lg bg-gray-50 py-2 px-4 rounded-md border border-gray-200 transition-all">
                    {qaData.answer}
                  </div>
                </>
              )}
              
              {/* Flag button for users to report incorrect questions - only show for paid users */}
              {!isEditMode && hasPaidAccess && (
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
                            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setFlagReason(e.target.value)}
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
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedQuestion(e.target.value)}
                            placeholder={qaData.question}
                            className="w-full p-1 text-sm border rounded"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs mb-1">Suggested answer (optional)</label>
                          <input
                            value={editedAnswer}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEditedAnswer(e.target.value)}
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
      
      {/* No data found state - now hidden per user request */}
      {/* We're hiding the "No question available for this slide" message */}
    </div>
  );
};

export default QuestionAnswerDisplay;