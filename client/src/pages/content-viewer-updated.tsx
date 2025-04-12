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
  // Parse URL and get IDs
  const urlParts = window.location.pathname.split("/");
  const unitId = parseInt(urlParts[2] || "0", 10);
  const initialMaterialIndex = parseInt(urlParts[4] || "0", 10) || 0;
  
  // State
  const [currentIndex, setCurrentIndex] = useState(initialMaterialIndex);
  
  // Data fetching
  const { data: unit, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/units/${unitId}`],
    enabled: !!unitId,
  });

  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${unit?.bookId}`],
    enabled: !!unit?.bookId,
  });

  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });

  // Navigation
  const goToNext = () => {
    if (materials && currentIndex < materials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentIndex]);

  // Current material
  const currentMaterial = materials && materials.length > 0 ? materials[currentIndex] : null;
  
  // Debug paths when material or indices change
  useEffect(() => {
    if (book && unit && currentMaterial) {
      const primaryPath = `/api/content/${book.bookId}/unit${unit.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.png`;
      const alternatePath = `/api/content/${book.bookId}/unit${unit.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.png`;
      
      console.log('Content paths:', {
        materialId: currentMaterial.id,
        materialTitle: currentMaterial.title,
        materialContent: currentMaterial.content,
        materialIndex: currentIndex,
        constructedPrimaryPath: primaryPath,
        constructedAlternatePath: alternatePath,
        bookId: book.bookId,
        unitNumber: unit.unitNumber
      });
    }
  }, [book, unit, currentMaterial, currentIndex]);
  
  // Loading state
  if (unitLoading || bookLoading || materialsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-[60vh] w-full mb-4" />
        <Skeleton className="h-24 w-3/4" />
      </div>
    );
  }

  // No materials state
  if (!materials || materials.length === 0) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center mb-6">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-2"
            onClick={() => window.location.href = `/admin/books`}
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Button>
          <h1 className="text-xl font-semibold ml-4">
            {book?.title} – {unit?.title}
          </h1>
        </div>

        <div className="text-center p-8 border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">No Content Available</h2>
          <p className="text-gray-500 mb-4">There are no materials available for this unit.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-2"
          onClick={() => window.location.href = `/admin/books`}
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Books
        </Button>
        <h1 className="text-xl font-semibold ml-4">
          {book?.title} – {unit?.title}
        </h1>
      </div>

      {/* Unit info */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border">
        <h2 className="text-lg font-semibold">Unit {unit?.unitNumber} of {book?.title}</h2>
        <p className="text-sm text-gray-500">Educational content for this unit.</p>
      </div>
      
      {/* Content container */}
      <div className="relative bg-white border rounded-lg p-4 min-h-[60vh] mb-4">
        {/* Content title */}
        <div className="bg-gray-100 p-4 text-center mb-6 rounded">
          <h3 className="text-xl font-semibold">{currentMaterial?.title}</h3>
        </div>
        
        {/* Content display */}
        <div className="flex justify-center items-center">
          {currentMaterial && (
            <>
              {currentMaterial.contentType === 'IMAGE' && (
                <div className="max-w-full text-center">
                  <img 
                    src={
                      book && unit
                        ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.png`
                        : currentMaterial.content
                    }
                    alt={currentMaterial.title}
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
                        // PNG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.png`,
                        // Using '00 A.png' format for first slide
                        currentIndex === 0 ? `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00 A.png` : null,
                        // Using '00A.png' format for first slide
                        currentIndex === 0 ? `/api/content/${book?.bookId}/unit${unit?.unitNumber}/00A.png` : null,
                        // JPG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.jpg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.jpg`,
                        // JPEG format with different naming patterns
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.jpeg`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.jpeg`,
                        // GIF format with different naming patterns (based on s3://visualenglishmaterial/book3/unit12/01 D Ad the Children are Young – Middle Aged – Old.gif)
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.gif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.gif`,
                        // Format with letter variations (B, C, D, etc.) for books that use different lettering pattern
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} B.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} C.png`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} D.png`,
                        // AVIF format (newer image format)
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.avif`,
                        `/api/content/${book?.bookId}/unit${unit?.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1}A.avif`,
                        // Original material content as fallback
                        currentMaterial.content
                      ].filter(Boolean) as string[];
                      
                      // Start trying formats
                      tryAlternateFormats(possibleFormats);
                    }}
                  />
                </div>
              )}
              
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
                          const parent = e.target.parentNode as HTMLElement;
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
                        while ((e.target as HTMLVideoElement).firstChild) {
                          (e.target as HTMLVideoElement).removeChild((e.target as HTMLVideoElement).firstChild);
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
                    <source 
                      src={
                        book && unit
                          ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.mp4`
                          : currentMaterial.content
                      }
                    />
                    Your browser does not support video playback.
                  </video>
                </div>
              )}
              
              {(currentMaterial.contentType === 'PDF' || currentMaterial.contentType === 'DOCUMENT') && (
                <div className="w-full">
                  <iframe
                    src={currentMaterial.content}
                    className="w-full h-[50vh] border-0"
                    onLoad={(e) => {
                      // Check if frame loaded successfully
                      const frame = e.target as HTMLIFrameElement;
                      try {
                        // This will throw an error if the content failed to load
                        const frameContent = frame.contentWindow?.document?.body?.innerText || '';
                        
                        // Check if the content contains S3 error messages
                        if (frameContent.includes('NoSuchKey') || frameContent.includes('does not exist')) {
                          // Create error display
                          const errorContainer = document.createElement('div');
                          errorContainer.className = 'p-4 bg-red-50 border border-red-200 rounded-md text-red-600';
                          errorContainer.innerHTML = `
                            <div class="flex items-center mb-2">
                              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              <span class="font-medium">Content Not Available</span>
                            </div>
                            <p>The requested document could not be found. Please try an alternative format or contact support.</p>
                            <p class="mt-2 text-xs text-gray-600">Path: ${currentMaterial.content}</p>
                          `;
                          
                          // Replace iframe with error message
                          const parent = frame.parentNode as HTMLElement;
                          if (parent) {
                            parent.innerHTML = '';
                            parent.appendChild(errorContainer);
                          }
                        }
                      } catch (error) {
                        console.error("Error loading PDF content:", error);
                      }
                    }}
                  />
                </div>
              )}
              
              {currentMaterial.contentType === 'GAME' && (
                <iframe
                  src={
                    book && unit
                      ? `/api/content/${book.bookId}/unit${unit.unitNumber}/${currentIndex+1 < 10 ? '0' : ''}${currentIndex+1} A.html`
                      : currentMaterial.content
                  }
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
        Slide {currentIndex + 1} of {materials?.length || 0}
      </div>
      
      {/* Thumbnails/pagination */}
      <div className="mt-6 flex justify-center">
        <div className="flex gap-2 overflow-x-auto py-2 max-w-full">
          {materials.map((material, index) => (
            <button
              key={material.id}
              className={`flex-none w-10 h-10 rounded-md flex items-center justify-center border ${
                index === currentIndex 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-200'
              }`}
              onClick={() => setCurrentIndex(index)}
            >
              <span className="text-xs">{index + 1}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}