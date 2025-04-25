import React, { useState, useEffect } from 'react';
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Flag, Check, X, RefreshCw } from "lucide-react";
import { findMatchingQA } from "@/data/qa-mapping";
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
    
    // For files with common question patterns without dashes
    // Examples: "Do You Have A Pen in Your Pencil Case.gif"
    
    const questionPatterns = [
      { regex: /^do you have (.+?)(\.|\?|$)/i, answerPositive: "Yes, I have $1.", answerNegative: "No, I don't have $1." },
      { regex: /^does (he|she) have (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 has $2.", answerNegative: "No, $1 doesn't have $2." },
      { regex: /^is (it|he|she|this) (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 is $2.", answerNegative: "No, $1 isn't $2." },
      { regex: /^are (you|they|these) (.+?)(\.|\?|$)/i, answerPositive: "Yes, $1 are $2.", answerNegative: "No, $1 aren't $2." },
      { regex: /^what is (.+?)(\.|\?|$)/i, answer: "It is $1." },
      { regex: /^what are (.+?)(\.|\?|$)/i, answer: "They are $1." },
      { regex: /^where is (.+?)(\.|\?|$)/i, answer: "It is in $1." },
      { regex: /^which (.+?) is (.+?)(\.|\?|$)/i, answer: "It is $2." }
    ];
    
    for (const pattern of questionPatterns) {
      const match = lowerFilename.match(pattern.regex);
      if (match) {
        // Format as proper question
        let question = match[0];
        if (!question.endsWith('?')) {
          question = question.replace(/\..*$/, '?');
        }
        question = question.charAt(0).toUpperCase() + question.slice(1);
        
        let answer;
        if ('answer' in pattern && pattern.answer) {
          // For single-answer patterns like "what is"
          answer = pattern.answer.replace(/\$(\d+)/g, (_, n) => match[parseInt(n)]);
        } else if ('answerPositive' in pattern && pattern.answerPositive) {
          // For yes/no questions
          answer = pattern.answerPositive.replace(/\$(\d+)/g, (_, n) => match[parseInt(n)]);
        } else {
          // Fallback
          answer = "It is " + match[0] + ".";
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
  const description = material.description || '';
  
  // Clean the title
  const title = material.title ? formatText.cleanFileName(material.title) : '';
  
  // First, try to find a matching Q&A from the Excel-processed mapping
  // This will ensure the correct question/answer pair is displayed based on the filename
  const filename = material.content || '';
  const mappedQA = findMatchingQA(filename);
  
  if (mappedQA) {
    console.log("Found matching Q&A from Excel mapping for:", filename);
    return {
      question: mappedQA.question,
      answer: mappedQA.answer,
      country: formatText.determineCountry(content),
      hasData: true
    };
  }
  
  // If no mapping found, fall back to the existing pattern matching logic
  console.log("No Excel mapping found for:", filename, "- using pattern matching");
  
  // Function to extract code pattern from filename (like "01 R A", "01 A b", "02 B c", etc.)
  const extractCodePattern = (text: string): string => {
    // Try to match patterns like "(01 A a)" from the pasted document format 
    const parenMatch = text.match(/\((\d{2})\s*([a-z])\s*([a-z])\)/i);
    if (parenMatch) {
      const result = `${parenMatch[1]} ${parenMatch[2].toLowerCase()} ${parenMatch[3].toLowerCase()}`;
      console.log("Extracted parenthesized code pattern:", result, "from text:", text);
      return result;
    }
    
    // Try to extract from more specific patterns first (look for code pattern at the beginning)
    const specificMatch = text.match(/^(\d{2})\s+([a-z])\s+([a-z](?:a)?)\s/i);
    if (specificMatch) {
      const result = `${specificMatch[1]} ${specificMatch[2].toLowerCase()} ${specificMatch[3].toLowerCase()}`;
      console.log("Extracted specific code pattern:", result, "from text:", text);
      return result;
    }

    // Match patterns like "01 R A" or "05 L C" anywhere in the text
    // Be more restrictive - require it to be followed by specific keywords or be at the start
    const codeMatch = text.match(/(\d{2})\s+([a-z])\s+([a-z](?:a)?)(\s|$|\s+what|\s+do|\s+is|\s+are|\s+how|\s+where|\s+who)/i);
    if (codeMatch) {
      // Return standardized format for matching: "01 r a"
      const result = `${codeMatch[1]} ${codeMatch[2].toLowerCase()} ${codeMatch[3].toLowerCase()}`;
      console.log("Extracted code pattern:", result, "from text:", text);
      return result;
    }
    
    return '';
  };
  
  // Extract code pattern from content and description
  const contentCode = extractCodePattern(content);
  const descriptionCode = extractCodePattern(description);
  
  // Use the first code pattern found
  const codePattern = contentCode || descriptionCode;
  
  // For debugging - log the source of the code pattern
  if (contentCode) console.log("Using code pattern from content:", contentCode);
  if (descriptionCode) console.log("Using code pattern from description:", descriptionCode);
  
  // If in filename, we may need to check if there's an actual country or subject match
  if (contentCode && (content.includes("Gadgets") || content.toLowerCase().includes("phone") || 
      content.toLowerCase().includes("charger") || content.toLowerCase().includes("gadget"))) {
    console.log("Found gadgets in content, prioritizing mobile phone category");
    
    // Clear any country detection from the material content to avoid showing Poland question
    if (formatText.determineCountry(content)) {
      console.log("Overriding country detection because this is a gadget slide");
    }
  }
  
  // No hard-coded questions - all questions will come from Excel files in S3
  const qaDatabase: QADatabaseEntry[] = [];
  
  // Check for an exact match in our database using the code pattern
  if (codePattern) {
    console.log("Found code pattern: ", codePattern);
    const matchedQA = qaDatabase.find(qa => qa.code === codePattern);
    if (matchedQA) {
      return { 
        country: matchedQA.country || matchedQA.category || "",
        question: matchedQA.question, 
        answer: matchedQA.answer, 
        hasData: true 
      };
    }
  }
  
  // Try to extract question and answer directly from the filename using dash patterns
  // Examples: "What is it – It is a pencil.gif", "Where is this flag from – It is from Poland.jpg"
  const extractedFromFilename = formatText.extractQuestionsFromFilename(content);
  if (extractedFromFilename) {
    console.log("Extracted question/answer from filename:", extractedFromFilename);
    return {
      country: formatText.determineCountry(content),
      question: extractedFromFilename.question,
      answer: extractedFromFilename.answer,
      hasData: true
    };
  }
  
  // Check for specific filename patterns
  const contentLower = content.toLowerCase();
  
  // Special cases for particular content types
  if (contentLower.includes('phone') || contentLower.includes('mobile')) {
    if (contentLower.includes('what is')) {
      return { 
        country: "MOBILE PHONES",
        question: "What is this?", 
        answer: "It is a phone.", 
        hasData: true 
      };
    }
    
    if (contentLower.includes('do you have')) {
      return { 
        country: "MOBILE PHONES",
        question: "Do you have a phone?", 
        answer: "Yes, I have a phone / No, I don't have a phone.", 
        hasData: true 
      };
    }
  }
  
  if (contentLower.includes('charger')) {
    if (contentLower.includes('what is')) {
      return { 
        country: "CHARGERS & BATTERIES",
        question: "What is this?", 
        answer: "It is a charger.", 
        hasData: true 
      };
    }

    if (contentLower.includes('do you have a charger') || contentLower.includes('have a charger')) {
      return { 
        country: "CHARGERS & BATTERIES",
        question: "Do you have a charger?", 
        answer: "Yes, I have a charger / No, I do not.", 
        hasData: true 
      };
    }
  }
  
  const country = formatText.determineCountry(content);
  
  // Try to match by the first part of the code (e.g., "01 r")
  if (codePattern) {
    const mainCode = codePattern.substring(0, 4); // Like "01 r" 
    const countryQAs = qaDatabase.filter(qa => qa.code.startsWith(mainCode));
    if (countryQAs.length > 0) {
      // Use the first question for this country
      return { 
        country: countryQAs[0].country || countryQAs[0].category || "",
        question: countryQAs[0].question, 
        answer: countryQAs[0].answer, 
        hasData: true 
      };
    }
  }
  
  // Try to match by filename content
  if (contentLower.includes('flag')) {
    if (country) {
      return { 
        country,
        question: "Where is this flag from?", 
        answer: `It is from ${country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()}.`, 
        hasData: true 
      };
    }
  } else if (contentLower.includes('capital')) {
    if (country === 'POLAND') {
      return { country, question: "What is the capital of Poland?", answer: "It is Warsaw.", hasData: true };
    } else if (country === 'ENGLAND') {
      return { country, question: "What is England's capital?", answer: "It is London.", hasData: true };
    } else if (country === 'SCOTLAND') {
      return { country, question: "What is Scotland's capital?", answer: "It is Edinburgh.", hasData: true };
    } else if (country === 'WALES') {
      return { country, question: "What is Wales's capital?", answer: "It is Cardiff.", hasData: true };
    }
  } else if (contentLower.includes('nationality')) {
    if (country === 'POLAND') {
      return { country, question: "What nationality are they?", answer: "They are Polish.", hasData: true };
    } else if (country === 'ENGLAND') {
      return { country, question: "What nationality is he?", answer: "He is English.", hasData: true };
    } else if (country === 'SCOTLAND') {
      return { country, question: "What nationality is he?", answer: "He is Scottish.", hasData: true };
    } else if (country === 'WALES') {
      return { country, question: "What nationality is he?", answer: "He is Welsh.", hasData: true };
    }
  }
  
  // No matches found - return empty data
  return {
    country: "",
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
    
    // Fall back to the legacy pattern matching logic if no Excel match
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
      
      const response = await apiRequest('POST', '/api/flagged-questions', flagData);
      
      if (response.ok) {
        toast({
          title: "Question flagged",
          description: "The question has been flagged for review. Thank you for your feedback!",
        });
        setShowForm(false);
        setFlagReason('');
        setEditedQuestion('');
        setEditedAnswer('');
      } else {
        toast({
          title: "Error",
          description: "There was an error flagging the question. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error flagging the question. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  if (!showQuestions) {
    return null;
  }
  
  if (isLoadingExcel) {
    return <div className="flex justify-center items-center p-4 text-gray-500">
      <RefreshCw className="animate-spin mr-2" size={16} />
      <span>Loading questions...</span>
    </div>;
  }
  
  return (
    <div className="bg-blue-50 p-4 rounded-lg shadow-sm mb-4 relative">
      {qaData.country && (
        <div className="absolute top-2 right-2 bg-blue-100 px-2 py-1 rounded-full text-xs font-medium flex items-center">
          <Flag className="h-3 w-3 mr-1" />
          {qaData.country}
        </div>
      )}
      
      <div className="flex flex-col items-center">
        {qaData.hasData ? (
          <>
            <div className="text-lg font-medium text-center mb-2">{qaData.question}</div>
            <div className="text-md text-center">{qaData.answer}</div>
            
            <div className="mt-3 flex gap-2">
              {isEditMode && (
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-xs px-2 py-1 rounded bg-blue-100 hover:bg-blue-200"
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              )}
              
              <button 
                onClick={() => setShowForm(!showForm)}
                className="text-xs px-2 py-1 rounded bg-red-100 hover:bg-red-200 flex items-center"
              >
                <Flag className="h-3 w-3 mr-1" />
                Flag Question
              </button>
            </div>
            
            {showForm && (
              <div className="mt-4 bg-white p-3 rounded-md shadow w-full">
                <h3 className="font-medium text-sm mb-2">Flag this question or answer as incorrect</h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs mb-1">Suggested Question (optional)</label>
                    <input 
                      type="text" 
                      value={editedQuestion} 
                      onChange={(e) => setEditedQuestion(e.target.value)}
                      className="w-full text-sm p-1 border rounded" 
                      placeholder="Enter corrected question" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs mb-1">Suggested Answer (optional)</label>
                    <input 
                      type="text" 
                      value={editedAnswer} 
                      onChange={(e) => setEditedAnswer(e.target.value)}
                      className="w-full text-sm p-1 border rounded" 
                      placeholder="Enter corrected answer" 
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs mb-1">Reason (required)</label>
                    <textarea 
                      value={flagReason} 
                      onChange={(e) => setFlagReason(e.target.value)}
                      className="w-full text-sm p-1 border rounded" 
                      placeholder="Why is this question or answer incorrect?" 
                      rows={2}
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    <button 
                      onClick={() => setShowForm(false)}
                      className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleFlagQuestion}
                      disabled={!flagReason.trim()}
                      className={`text-xs px-2 py-1 rounded flex items-center ${
                        flagReason.trim() 
                          ? 'bg-red-500 hover:bg-red-600 text-white' 
                          : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Flag className="h-3 w-3 mr-1" />
                      Submit Flag
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center text-gray-500">
            <p>No questions available for this slide.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionAnswerDisplay;