import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, FileText, Video, MessageSquare, Check, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Import Material type from content-viewer
// This should match the Material type defined in content-viewer.tsx
type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order?: number;
  orderIndex?: number;
  isLocked?: boolean;
  isPublished?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
};

interface ThumbnailsBarProps {
  materials: Material[];
  currentIndex: number;
  onSelectSlide: (index: number) => void;
  viewedSlides: number[];
}

export default function ThumbnailsBar({
  materials,
  currentIndex,
  onSelectSlide,
  viewedSlides,
}: ThumbnailsBarProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // Scroll to the active thumbnail
  useEffect(() => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const activeThumb = container.querySelector('.active-thumbnail');
      
      if (activeThumb) {
        const containerWidth = container.clientWidth;
        const thumbLeft = (activeThumb as HTMLElement).offsetLeft;
        const thumbWidth = (activeThumb as HTMLElement).clientWidth;
        
        // Center the active thumbnail
        container.scrollLeft = thumbLeft - containerWidth / 2 + thumbWidth / 2;
      }
    }
  }, [currentIndex]);
  
  // Get icon based on content type
  const getContentTypeIcon = (contentType: string) => {
    const type = contentType.toLowerCase();
    if (type === 'image' || type.includes('gif') || type.includes('png') || type.includes('jpg')) {
      return <ImageIcon className="h-4 w-4" />;
    } else if (type === 'video' || type.includes('mp4')) {
      return <Video className="h-4 w-4" />;
    } else if (type === 'text' || type.includes('pdf') || type.includes('doc')) {
      return <FileText className="h-4 w-4" />;
    } else if (type === 'exercise') {
      return <MessageSquare className="h-4 w-4" />;
    } else {
      return <FileText className="h-4 w-4" />;
    }
  };
  
  // Format the title from the content
  const formatTitle = (content: string) => {
    try {
      // Strip out the leading number codes (like "01 N A")
      const titleMatch = content.match(/^\d+\s+[A-Z]\s+[A-Z]\s+(.*?)(?:\.[a-zA-Z0-9]+)?$/);
      
      // Just return the cleaned filename if no match
      if (!titleMatch) {
        return formatSlideTitle(content);
      }
      
      let title = titleMatch[1];
      
      // Format questions to ensure they have question marks
      if (title.toLowerCase().includes("what is") || 
          title.toLowerCase().includes("whose is") || 
          title.toLowerCase().includes("where is") ||
          title.toLowerCase().includes("how many")) {
        
        // Ensure there's a question mark for questions
        if (!title.includes("?")) {
          title = title + "?";
        }
      }
      
      return title;
    } catch (error) {
      return formatSlideTitle(content);
    }
  };
  
  // Format slide title from filename
  const formatSlideTitle = (content: string) => {
    // Remove file extension
    const withoutExtension = content.replace(/\.[^/.]+$/, "");
    
    // Handle special formats that have dashes or special characters
    if (withoutExtension.includes(" – ")) {
      // Split by the dash and use parts intelligently
      const parts = withoutExtension.split(" – ");
      if (parts.length > 1) {
        // For question-answer format
        const firstPart = parts[0].trim();
        
        // Add question mark if it's a question without one
        if (isQuestion(firstPart) && !firstPart.endsWith("?")) {
          return firstPart + "?";
        }
        return firstPart;
      }
    }
    
    // Default truncation if other formatting fails
    return truncateTitle(withoutExtension);
  };
  
  // Check if text is likely a question
  const isQuestion = (text: string) => {
    const questionWords = ['what', 'where', 'when', 'why', 'how', 'which', 'who', 'whose', 'is it', 'are they'];
    const lowerText = text.toLowerCase();
    return questionWords.some(word => lowerText.includes(word));
  };
  
  // Truncate title to a reasonable length
  const truncateTitle = (title: string, maxLength = 20) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  };
  
  // Get content thumbnail URL or placeholder
  const getThumbnailUrl = (material: Material) => {
    // Analyze content type to determine if we can show a thumbnail
    const contentType = material.contentType.toLowerCase();
    const content = material.content.toLowerCase();
    
    if (contentType === 'image' || 
        content.endsWith('.png') || 
        content.endsWith('.jpg') || 
        content.endsWith('.jpeg') || 
        content.endsWith('.gif')) {
      // Extract bookId and unitNumber from props - these were missing before!
      const bookMatch = window.location.pathname.match(/\/([^\/]+)\/([^\/]+)/);
      
      if (bookMatch && bookMatch.length >= 3) {
        const bookId = bookMatch[1]; // e.g., "book3"
        const unitPath = bookMatch[2]; // e.g., "unit12"
        
        // For image content, we can use the actual image as thumbnail
        // This path needs to match how ContentSlide component gets its URLs
        return `/api/direct/${bookId}/${unitPath}/assets/${encodeURIComponent(material.content)}`;
      }
    }
    
    return null; // No thumbnail available
  };
  
  // Check if the layout should be vertical (for sidebar) or horizontal (original)
  // We'll detect this by checking the parent element's width vs height
  const [isVerticalLayout, setIsVerticalLayout] = useState(false);

  useEffect(() => {
    const checkLayout = () => {
      if (scrollRef.current) {
        const parent = scrollRef.current.parentElement;
        if (parent) {
          // If parent is taller than it is wide, we'll use vertical layout
          const isVertical = parent.clientHeight > parent.clientWidth * 1.2; 
          setIsVerticalLayout(isVertical);
        }
      }
    };

    checkLayout();
    window.addEventListener('resize', checkLayout);
    return () => window.removeEventListener('resize', checkLayout);
  }, []);

  return (
    <div className="flex-1 flex flex-col">
      {/* Thumbnail grid/list with side navigation */}
      <div className="relative">
        <button 
          onClick={() => onSelectSlide(Math.max(0, currentIndex - 1))}
          className="absolute -left-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-1.5 z-20 border border-gray-200"
          aria-label="Previous thumbnail"
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <button 
          onClick={() => onSelectSlide(Math.min(materials.length - 1, currentIndex + 1))}
          className="absolute -right-2 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white shadow-md rounded-full p-1.5 z-20 border border-gray-200"
          aria-label="Next thumbnail"
          disabled={currentIndex === materials.length - 1}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        
        {/* Thumbnail grid/list */}
        <ScrollArea className="flex-1">
          <div 
            className={`p-2 bg-gray-50 rounded-lg ${isVerticalLayout ? 'flex flex-col space-y-2' : 'flex flex-row space-x-2'}`}
            ref={scrollRef}
          >
            {materials.map((material, index) => {
              const isActive = index === currentIndex;
              const isViewed = viewedSlides.includes(index);
              const thumbnailUrl = getThumbnailUrl(material);
              const formattedTitle = formatTitle(material.content);
              
              return (
                <div
                  key={index}
                  className={`
                    relative cursor-pointer rounded-md
                    ${isActive ? 'active-thumbnail border border-primary' : 'border border-transparent hover:border-gray-200'}
                    ${isVerticalLayout ? 'w-full' : 'w-16'}
                  `}
                  onClick={() => onSelectSlide(index)}
                >
                  <div className={`flex ${isVerticalLayout ? 'flex-row items-center' : 'flex-col items-center'} p-1`}>
                    <div className={`
                      ${isVerticalLayout ? 'h-10 w-10 mr-2' : 'h-12 w-12'} 
                      rounded flex items-center justify-center overflow-hidden
                      ${isActive ? 'bg-white shadow-sm' : 'bg-gray-50'}
                    `}>
                      {thumbnailUrl ? (
                        <img 
                          src={thumbnailUrl} 
                          alt={formattedTitle}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                            (e.currentTarget.parentElement as HTMLElement).innerHTML = material.contentType === 'video' ? 
                              '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-video"><path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/></svg></div>' : 
                              '<div class="flex items-center justify-center w-full h-full"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg></div>';
                          }}
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          {getContentTypeIcon(material.contentType)}
                        </div>
                      )}
                    </div>
                    
                    {isActive && (
                      <div className="absolute inset-0 border-2 border-primary rounded-md"/>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          <ScrollBar orientation={isVerticalLayout ? "vertical" : "horizontal"} />
        </ScrollArea>
      </div>
      
      {/* Removed navigation controls to reduce clutter */}
    </div>
  );
}