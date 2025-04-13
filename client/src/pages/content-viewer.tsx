import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Types
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order: number;
  isLocked: boolean;
};

type Unit = {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description?: string;
};

type Book = {
  id: number;
  bookId: string;
  title: string;
};

export default function ContentViewer() {
  // Get the unit ID and material index from the URL
  const unitId = parseInt(window.location.pathname.split('/')[2]);
  const materialIndex = parseInt(window.location.pathname.split('/')[4] || '0');
  
  // State for tracking current material index
  const [currentIndex, setCurrentIndex] = useState<number>(materialIndex);
  
  // Fetch unit details
  const {
    data: unit,
    isLoading: unitLoading,
    error: unitError
  } = useQuery<Unit>({
    queryKey: ['/api/units', unitId],
    enabled: !!unitId,
  });
  
  // Fetch materials for the unit
  const {
    data: materials,
    isLoading: materialsLoading,
    error: materialsError
  } = useQuery<Material[]>({
    queryKey: ['/api/units', unitId, 'materials'],
    enabled: !!unitId,
  });
  
  // Fetch book details
  const {
    data: book,
    isLoading: bookLoading,
    error: bookError
  } = useQuery<Book>({
    queryKey: ['/api/books', unit?.bookId],
    enabled: !!unit?.bookId,
  });
  
  // Current material
  const currentMaterial = materials && materials.length > 0 ? 
    materials[currentIndex] : null;
  
  // Navigation handlers
  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      window.history.pushState({}, "", `/units/${unitId}/materials/${currentIndex - 1}`);
    }
  };
  
  const goToNext = () => {
    if (materials && currentIndex < materials.length - 1) {
      setCurrentIndex(currentIndex + 1);
      window.history.pushState({}, "", `/units/${unitId}/materials/${currentIndex + 1}`);
    }
  };
  
  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        goToPrev();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Debug content paths
    if (currentMaterial) {
      console.log("Content paths:", {
        materialId: currentMaterial.id,
        materialTitle: currentMaterial.title,
        materialContent: currentMaterial.content,
        materialIndex: currentIndex,
        constructedPrimaryPath: `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.png`,
        constructedAlternatePath: `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.png`,
        bookId: book?.bookId,
        unitNumber: unit?.unitNumber
      });
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex, materials, goToPrev, goToNext, currentMaterial, book?.bookId, unit?.unitNumber]);
  
  // Loading state
  if (unitLoading || materialsLoading || bookLoading) {
    return (
      <div className="p-8">
        <Skeleton className="h-8 w-64 mb-4" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-3/4 mb-8" />
        <Skeleton className="h-[60vh] w-full rounded-lg" />
      </div>
    );
  }
  
  // Error state
  if (unitError || materialsError || bookError) {
    return (
      <div className="p-8 text-red-500">
        <h2 className="text-xl font-bold mb-4">Error Loading Content</h2>
        <p>There was an error loading the content. Please try again later.</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={() => window.location.href = `/admin/books`}
        >
          Back to Books
        </Button>
      </div>
    );
  }
  
  // No materials state
  if (!materials || materials.length === 0) {
    return (
      <div className="p-8">
        <h2 className="text-xl font-bold mb-4">No Content Available</h2>
        <p>There are no materials available for this unit.</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="mt-4"
          onClick={() => window.location.href = `/admin/books`}
        >
          Back to Books
        </Button>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4 max-w-5xl">
      {/* Header with book and unit info */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2 mb-4"
          onClick={() => window.location.href = `/admin/books`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Button>
        
        <h1 className="text-2xl font-bold mb-1">{book?.title} – {unit?.title}</h1>
        <p className="text-gray-600">
          Unit {unit?.unitNumber} of {book?.title}
        </p>
      </div>
      
      {/* Content container */}
      <div className="relative bg-white border rounded-lg p-4 min-h-[60vh] mb-4">
        {/* Content title - hide for Unit Content since we display it in the formatted section */}
        {currentMaterial?.title !== "Unit Content" && (
          <div className="bg-gray-100 p-4 text-center mb-6 rounded">
            <h3 className="text-xl font-semibold">
              {currentMaterial?.title === "Unit Introduction" ? "" : currentMaterial?.title.replace(/^[A-Z]\s+/, '')}
            </h3>
            
            {/* Extract question from filename if present - only show if not displaying actual content */}
            {currentMaterial?.content && 
              (currentMaterial?.contentType !== 'IMAGE' && currentMaterial?.contentType !== 'VIDEO') && (
              <div className="mt-2 text-gray-700">
                {(() => {
                // Extract filename from path
                const contentPath = currentMaterial.content;
                const pathParts = contentPath.split('/');
                const filename = pathParts[pathParts.length - 1];
                
                // Try to extract question from filename
                // Common pattern in files: "01 D What is the Capital of Australia – the Capital is Canberra.jpg"
                // We want to display "What is the Capital of Australia?"
                try {
                  // Decode URI component to handle special characters
                  const decodedFilename = decodeURIComponent(filename);
                  
                  // Extract question and answer if available
                  // Pattern like: "01 D What is the Capital of Australia – the Capital is Canberra.jpg"
                  const contentParts = decodedFilename.split('–');
                  
                  if (contentParts.length >= 1) {
                    // Extract question from the first part, removing any lettering prefixes (like "E" or "J")
                    // More flexible regex that can handle various prefixes and patterns (numeric, letter combinations)
                    // This should handle "01 E Aa", "01 R A", and other prefix variations before the actual question
                    const questionMatch = contentParts[0].match(/(?:\d+\s+)?(?:[A-Z]\s+)?(?:[A-Za-z]+\s+)?([^.]+)/);
                    if (questionMatch && questionMatch[1]) {
                      let question = questionMatch[1].trim();
                      
                      // Further cleanup for Book 5 & 7 - remove any remaining alphabetic prefixes before actual question
                      if (book?.bookId === "5" || book?.bookId === "7") {
                        // Remove additional letter prefixes that might still be present
                        question = question.replace(/^[A-Za-z]+\s+/, '');
                      }
                      
                      // Format and correct the question
                      
                      // Fix common spelling errors
                      question = question
                        .replace(/\bthier\b/gi, "their")
                        .replace(/\bwere\b(?=.*\bfrom\b)/gi, "where")
                        .replace(/\bwhos\b/gi, "who's")
                        .replace(/\bits\b(?=.*\bname)/gi, "it's")
                        .replace(/\bcomon\b/gi, "common")
                        .replace(/\bwhats\b/gi, "what's")
                        .replace(/\bhows\b/gi, "how's")
                        .replace(/\bwhen\b(?=.*\bdo)/gi, "when do");
                      
                      // Capitalize first letter
                      question = question.charAt(0).toUpperCase() + question.slice(1);
                      
                      // Make sure country names and nationalities are capitalized
                      const countries = ["australia", "poland", "japan", "france", "germany", "italy", "england", "china", "korea", "brazil", "canada", "mexico", "russia", "ireland", "spain", "thailand", "vietnam"];
                      const nationalities = ["australian", "polish", "japanese", "french", "german", "italian", "english", "chinese", "korean", "brazilian", "canadian", "mexican", "russian", "irish", "spanish", "thai", "vietnamese"];
                      
                      countries.forEach(country => {
                        const regex = new RegExp(`\\b${country}\\b`, 'gi');
                        question = question.replace(regex, country.charAt(0).toUpperCase() + country.slice(1));
                      });
                      
                      nationalities.forEach(nationality => {
                        const regex = new RegExp(`\\b${nationality}\\b`, 'gi');
                        question = question.replace(regex, nationality.charAt(0).toUpperCase() + nationality.slice(1));
                      });
                      
                      // Check if the question is a question - should contain question words
                      const questionWords = ["what", "where", "when", "why", "who", "which", "how", "is", "are", "do", "does", "did", "can", "could", "will", "would"];
                      const isActuallyAQuestion = questionWords.some(word => 
                        question.toLowerCase().includes(word.toLowerCase()) && 
                        (question.toLowerCase().indexOf(word.toLowerCase()) < 5 || question.toLowerCase().startsWith(word.toLowerCase()))
                      );
                      
                      // Add question mark if it's a question and doesn't already have one
                      const formattedQuestion = isActuallyAQuestion && !question.endsWith('?') ? `${question}?` : question;
                      
                      // Extract answer if available (after the dash)
                      let answer = contentParts.length > 1 ? contentParts[1].trim() : null;
                      
                      // Remove file extensions from answers
                      if (answer) {
                        // Remove common file extensions (.jpg, .png, .gif, etc.)
                        answer = answer.replace(/\.(jpg|jpeg|png|gif|webp|avif)\.?$/i, '');
                      }
                      
                      // Format the answer - capitalize first letter, fix punctuation
                      if (answer) {
                        // Capitalize first letter
                        answer = answer.charAt(0).toUpperCase() + answer.slice(1);
                        
                        // Add period at the end if it doesn't have punctuation
                        if (!/[.!?]$/.test(answer)) {
                          answer += '.';
                        }
                        
                        // Capitalize country names and nationalities in answer
                        countries.forEach(country => {
                          if (answer) { // Additional null check
                            const regex = new RegExp(`\\b${country}\\b`, 'gi');
                            answer = answer.replace(regex, country.charAt(0).toUpperCase() + country.slice(1));
                          }
                        });
                        
                        nationalities.forEach(nationality => {
                          if (answer) { // Additional null check
                            const regex = new RegExp(`\\b${nationality}\\b`, 'gi');
                            answer = answer.replace(regex, nationality.charAt(0).toUpperCase() + nationality.slice(1));
                          }
                        });
                        
                        // Format yes/no answers with proper response format
                        // For "Do you have..." questions, use "Yes, I do / No, I don't"
                        // For "Is it a..." questions, use "Yes, it is / No, it isn't"
                        if (formattedQuestion.toLowerCase().startsWith("do you") || 
                            formattedQuestion.toLowerCase().startsWith("does")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, I do.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, I don't.";
                          }
                        } else if (formattedQuestion.toLowerCase().startsWith("is it")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, it is.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, it isn't.";
                          }
                        } else if (formattedQuestion.toLowerCase().startsWith("is he")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, he is.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, he isn't.";
                          }
                        } else if (formattedQuestion.toLowerCase().startsWith("is she")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, she is.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, she isn't.";
                          }
                        } else if (formattedQuestion.toLowerCase().startsWith("are they")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, they are.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, they aren't.";
                          }
                        } else if (formattedQuestion.toLowerCase().startsWith("are you")) {
                          if (answer && answer.toLowerCase().includes("yes")) {
                            answer = "Yes, I am.";
                          } else if (answer && answer.toLowerCase().includes("no")) {
                            answer = "No, I'm not.";
                          }
                        }
                      }
                      
                      return (
                        <>
                          <p className="font-medium text-center text-gray-800">{formattedQuestion}</p>
                          {answer && (
                            <p className="text-sm text-center text-gray-600 mt-1">
                              {answer}
                            </p>
                          )}
                        </>
                      );
                    }
                  }
                } catch (error) {
                  console.error("Error extracting question from filename:", error);
                }
                
                return null;
              })()}
              </div>
            )}
          </div>
        )}
        
        {/* Content display */}
        <div className="flex justify-center items-center">
          {currentMaterial && (
            <>
              {/* Special handling for Unit Content (text-based overview) */}
              {currentMaterial.title === "Unit Content" && (
                <div className="max-w-full w-full text-center bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                  <h3 className="text-xl font-semibold mb-4">Unit Content</h3>
                  <div className="text-left mx-auto max-w-3xl">
                    {/* Special handling for Book 5 - use text content directly without attempting to load images */}
                    {book?.bookId === "5" ? (
                      // Book 5-specific structured content
                      <div>
                        <p className="font-medium text-lg mb-2">Material Covered</p>
                        
                        {unit?.unitNumber === 1 && (
                          <>
                            <p className="mb-1">School Subjects - Learning subjects at school</p>
                            <p className="mb-1">Class Schedule - Weekly and daily school timetables</p>
                            <p className="mb-1">Classroom Objects - Items used in a classroom</p>
                            <p className="mb-1">School Supplies - Essentials for learning</p>
                            <p className="mb-1">School Types - Different educational institutions</p>
                          </>
                        )}
                        
                        {unit?.unitNumber === 2 && (
                          <>
                            <p className="mb-1">School Facilities - Areas and rooms in a school</p>
                            <p className="mb-1">School Tour - Navigation around a school</p>
                            <p className="mb-1">School Staff - People who work at school</p>
                            <p className="mb-1">School Activities - Things to do at school</p>
                            <p className="mb-1">School Rules - Important guidelines to follow</p>
                          </>
                        )}
                        
                        {unit?.unitNumber === 3 && (
                          <>
                            <p className="mb-1">Library - Using the school library</p>
                            <p className="mb-1">Library Books - Types of books and resources</p>
                            <p className="mb-1">Reading Areas - Places to read in school</p>
                            <p className="mb-1">Digital Resources - Electronic learning materials</p>
                            <p className="mb-1">Borrowing System - How to check out library materials</p>
                          </>
                        )}
                        
                        {unit?.unitNumber === 4 && (
                          <>
                            <p className="mb-1">Cafeteria - The school dining area</p>
                            <p className="mb-1">School Meals - Types of food served at school</p>
                            <p className="mb-1">Nutrition - Healthy eating at school</p>
                            <p className="mb-1">Lunchtime Activities - Things to do during lunch break</p>
                            <p className="mb-1">Cafeteria Rules - Expected behavior in the dining area</p>
                          </>
                        )}
                        
                        {unit?.unitNumber && unit.unitNumber >= 5 && (
                          <>
                            <p className="mb-1">School Facilities - Areas and spaces in the school</p>
                            <p className="mb-1">School Activities - Various educational activities</p>
                            <p className="mb-1">School Rules - Important guidelines to follow</p>
                            <p className="mb-1">School Community - People in the school environment</p>
                            <p className="mb-1">School Resources - Tools and materials for learning</p>
                          </>
                        )}
                      </div>
                    ) : currentMaterial.contentType === 'IMAGE' ? (
                      <div className="text-center">
                        <img 
                          src={currentMaterial.content}
                          alt="Unit Content"
                          className="max-w-full max-h-[50vh] mx-auto object-contain"
                          onError={(e) => {
                            console.log("Trying alternate format for Unit Content image");
                            
                            // Define all possible formats to try
                            const possibleFormats = [
                              // Standard formats for all books
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.png`,
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.png`,
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/Unit Content.png`,
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/unit content.png`,
                              
                              // Try different file extensions
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.jpg`,
                              `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.jpg`,
                            ].filter(Boolean) as string[];
                            
                            // Try each format
                            let currentIndex = 0;
                            
                            const tryNextFormat = () => {
                              if (currentIndex >= possibleFormats.length) {
                                console.error("Failed to load Unit Content image, showing text fallback");
                                // Hide the broken image
                                const img = e.target as HTMLImageElement;
                                img.style.display = 'none';
                                
                                // Show fallback text if available
                                const parent = img.parentNode as HTMLElement;
                                if (parent && typeof currentMaterial.content === 'string' && 
                                    currentMaterial.content.includes("Material Covered")) {
                                  parent.innerHTML = currentMaterial.content
                                    .split('\n')
                                    .map(line => `<p class="mb-1 text-left">${line}</p>`)
                                    .join('');
                                } else {
                                  // Generic content if nothing else is available
                                  parent.innerHTML = `
                                    <p class="font-medium text-lg mb-2">Material Covered</p>
                                    <p class="mb-1">This unit covers essential vocabulary and language patterns.</p>
                                    <p class="mb-1">Practice real-world conversations and interactive exercises.</p>
                                    <p class="mb-1">Learn key expressions for everyday situations.</p>
                                  `;
                                }
                                return;
                              }
                              
                              const format = possibleFormats[currentIndex];
                              console.log(`Trying format ${currentIndex + 1}/${possibleFormats.length}: ${format}`);
                              
                              const img = e.target as HTMLImageElement;
                              img.src = format;
                              
                              // Set up for the next format if this one fails
                              currentIndex++;
                              img.addEventListener('error', tryNextFormat, { once: true });
                            };
                            
                            // Start trying formats
                            tryNextFormat();
                          }}
                        />
                      </div>
                    ) : currentMaterial.content && typeof currentMaterial.content === 'string' && 
                       currentMaterial.content.includes("Material Covered") ? (
                      // For structured content with Material Covered format
                      currentMaterial.content.split('\n').map((line, index) => (
                        <p key={index} className={`mb-1 ${index === 0 ? 'font-medium text-lg' : ''}`}>
                          {line}
                        </p>
                      ))
                    ) : (
                      // For unstructured content - create a structured format
                      <div>
                        <p className="font-medium text-lg mb-2">Material Covered</p>
                        {currentMaterial.content && typeof currentMaterial.content === 'string' ? (
                          currentMaterial.content
                            .split(/[.:]/)
                            .filter(item => item.trim().length > 0)
                            .map((item, idx) => (
                              <p key={idx} className="mb-1">
                                {item.trim().replace(/\s+/g, ' ')}{idx < currentMaterial.content.split(/[.:]/).length - 2 ? '.' : ''}
                              </p>
                            ))
                        ) : (
                          // Fallback content if nothing else is available
                          <>
                            <p className="mb-1">This unit covers essential vocabulary and language patterns.</p>
                            <p className="mb-1">Practice real-world conversations and interactive exercises.</p>
                            <p className="mb-1">Learn key expressions for everyday situations.</p>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {/* Image content */}
              {currentMaterial.contentType === 'IMAGE' && currentMaterial.title !== "Unit Content" && (
                <div className="max-w-full text-center">
                  <img 
                    src={currentMaterial.content}
                    alt={currentMaterial.title === "Unit Introduction" ? "Slide Content" : currentMaterial.title.replace(/^[A-Z]\s+/, '')}
                    className="max-w-full max-h-[50vh] mx-auto object-contain"
                    onError={(e) => {
                      const tryAlternateFormats = (formats: string[], index = 0) => {
                        if (index >= formats.length) {
                          // All formats failed
                          console.error(`Error loading image (all formats tried): ${currentMaterial.content}`);
                          
                          // Hide the broken image
                          (e.target as HTMLImageElement).style.display = 'none';
                          
                          // Create a more detailed error message container
                          const container = document.createElement('div');
                          container.className = 'p-4 bg-red-50 border border-red-200 rounded-md text-red-600';
                          container.innerHTML = `
                            <div class="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span class="font-medium">Content Not Available</span>
                            </div>
                            <p>This image could not be displayed. Please try another slide.</p>
                            <p class="mt-2 text-xs text-gray-600">Book ${book?.bookId}, Unit ${unit?.unitNumber}, Material ID ${currentMaterial.id}</p>
                          `;
                          
                          // Add the error message to the DOM
                          const parent = (e.target as HTMLImageElement).parentNode as HTMLElement;
                          if (parent) {
                            parent.appendChild(container);
                          }
                          return;
                        }
                        
                        // Try the next format
                        const format = formats[index];
                        console.log(`Trying format ${index + 1}/${formats.length}: ${format}`);
                        (e.target as HTMLImageElement).src = format;
                        
                        // Set up handler for the next format if this one fails
                        const img = e.target as HTMLImageElement;
                        img.addEventListener('error', () => {
                          tryAlternateFormats(formats, index + 1);
                        });
                      };
                      
                      // Define all possible formats to try
                      const possibleFormats = [
                        // Special handling for Book 5 - try direct book5 path
                        ...(book?.bookId === "5" ? [
                          `/api/content/book5/unit${unit?.unitNumber}/00 A.png`,
                          `/api/content/book5/unit${unit?.unitNumber}/00A.png`,
                        ] : []),
                        
                        // Start with 00A pattern for ALL slides (as per requirement)
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.png`,
                        
                        // Then try regular numbering pattern if 00A fails
                        // PNG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.png`,
                        
                        // JPG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.jpg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.jpg`,
                        
                        // JPEG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.jpeg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.jpeg`,
                        
                        // GIF format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.gif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.gif`,
                        
                        // Format with letter variations (B, C, D, etc.) for books that use different lettering pattern
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} B.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} C.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} D.png`,
                        
                        // AVIF format (newer image format)
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.avif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.avif`,
                        
                        // Other file extensions for 00A pattern
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.jpg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.jpg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.jpeg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.jpeg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.gif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.gif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.avif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.avif`,
                        
                        // Original material content as fallback
                        currentMaterial.content
                      ].filter(Boolean) as string[];
                      
                      // Start trying formats
                      tryAlternateFormats(possibleFormats);
                    }}
                  />
                </div>
              )}
              
              {/* Video content */}
              {currentMaterial.contentType === 'VIDEO' && (
                <div className="max-w-full max-h-[50vh] mx-auto">
                  <video 
                    controls 
                    className="max-w-full max-h-[50vh]" 
                    onError={(e) => {
                      const tryAlternateVideoFormats = (formats: string[], index = 0) => {
                        if (index >= formats.length) {
                          // All formats failed
                          console.error(`Error loading video (all formats tried): ${currentMaterial.content}`);
                          
                          // Create error container
                          const container = document.createElement('div');
                          container.className = 'p-4 bg-red-50 border border-red-200 rounded-md text-red-600';
                          container.innerHTML = `
                            <div class="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span class="font-medium">Video Not Available</span>
                            </div>
                            <p>This video could not be displayed. Please try another slide.</p>
                            <p class="mt-2 text-xs text-gray-600">Book ${book?.bookId}, Unit ${unit?.unitNumber}, Material ID ${currentMaterial.id}</p>
                          `;
                          
                          // Replace video with error message
                          const videoElement = e.target as HTMLVideoElement;
                          const parent = videoElement.parentNode as HTMLElement;
                          if (parent) {
                            parent.innerHTML = '';
                            parent.appendChild(container);
                          }
                          return;
                        }
                        
                        // Try the next format
                        const format = formats[index];
                        console.log(`Trying video format ${index + 1}/${formats.length}: ${format}`);
                        
                        // Create a new source element
                        const source = document.createElement('source');
                        source.src = format;
                        
                        // Clear any existing sources
                        const videoElement = e.target as HTMLVideoElement;
                        while (videoElement.firstChild) {
                          const child = videoElement.firstChild;
                          if (child) {
                            videoElement.removeChild(child);
                          }
                        }
                        
                        // Add the new source
                        (e.target as HTMLVideoElement).appendChild(source);
                        
                        // Load the video again
                        (e.target as HTMLVideoElement).load();
                        
                        // Set up error handler for the next format
                        const video = e.target as HTMLVideoElement;
                        video.addEventListener('error', () => {
                          tryAlternateVideoFormats(formats, index + 1);
                        });
                      };
                      
                      // Define all possible video formats to try
                      const possibleVideoFormats = [
                        // Special handling for Book 5 videos
                        ...(book?.bookId === "5" ? [
                          `/api/content/book5/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.mp4`,
                          `/api/content/book5/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.mp4`,
                        ] : []),
                        
                        // MP4 format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.mp4`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.mp4`,
                        // Webm format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.webm`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.webm`,
                        // Format with letter variations
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} B.mp4`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} C.mp4`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} D.mp4`,
                        // Original material content as fallback
                        currentMaterial.content
                      ].filter(Boolean) as string[];
                      
                      // Start trying formats
                      tryAlternateVideoFormats(possibleVideoFormats);
                    }}
                  >
                    <source src={currentMaterial.content} />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              
              {/* PDF and DOCUMENT types are filtered out */}
              
              {currentMaterial.contentType === 'GAME' && (
                <iframe
                  src={currentMaterial.content}
                  className="w-full h-[50vh] border-0"
                />
              )}
            </>
          )}
        </div>
        
        {/* Navigation buttons */}
        <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={goToPrev}
            disabled={currentIndex === 0}
          >
            <ChevronLeft />
          </Button>
        </div>
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
          <Button 
            variant="outline"
            size="icon"
            onClick={goToNext}
            disabled={!materials || currentIndex === materials.length - 1}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      
      {/* Pagination info */}
      <div className="text-center text-sm text-gray-500">
        Slide {currentIndex + 1} of {materials.length}
      </div>
    </div>
  );
}