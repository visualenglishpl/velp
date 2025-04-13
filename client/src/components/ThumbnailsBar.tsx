import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, FileText, Video, MessageSquare, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

// Define type for material
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
              <motion.div
                key={index} // Using index as key since material.id might not be reliable
                className={`
                  relative p-2 rounded-md cursor-pointer 
                  ${isActive ? 'active-thumbnail bg-primary/10 border border-primary/30' : 'hover:bg-gray-100'}
                  ${isVerticalLayout ? 'w-full' : 'w-24'}
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.01 }}
                onClick={() => onSelectSlide(index)}
              >
                <div className={`flex ${isVerticalLayout ? 'flex-row items-center' : 'flex-col items-center'}`}>
                  <div className={`
                    ${isVerticalLayout ? 'h-12 w-12 mr-3' : 'h-16 w-16'} 
                    rounded flex items-center justify-center overflow-hidden
                    ${isActive ? 'bg-primary/5 ring-2 ring-primary' : 'bg-gray-100'}
                  `}>
                    {thumbnailUrl ? (
                      <>
                        <img 
                          src={thumbnailUrl} 
                          alt={formattedTitle}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            // On error, fall back to icon
                            (e.target as HTMLElement).classList.add('hidden');
                            const fallback = e.currentTarget.parentElement?.querySelector('.thumbnail-fallback');
                            if (fallback) {
                              fallback.classList.remove('hidden');
                              fallback.classList.add('flex');
                            }
                          }}
                        />
                        <div 
                          className="h-full w-full items-center justify-center hidden thumbnail-fallback"
                        >
                          {getContentTypeIcon(material.contentType)}
                        </div>
                      </>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        {getContentTypeIcon(material.contentType)}
                      </div>
                    )}
                  </div>
                  
                  <div className={isVerticalLayout ? 'flex-1' : 'w-full text-center'}>
                    <div className="text-xs mt-1 font-medium">
                      {truncateTitle(formattedTitle, isVerticalLayout ? 30 : 20)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {index + 1}/{materials.length}
                    </div>
                  </div>
                  
                  {/* Viewed indicator */}
                  {isViewed && !isActive && (
                    <div className="absolute top-1 right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      className={`absolute ${isVerticalLayout ? 'left-0 top-0 bottom-0 w-1' : 'bottom-0 left-0 right-0 h-1'} bg-primary rounded-full`}
                      layoutId="activeIndicator"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation={isVerticalLayout ? "vertical" : "horizontal"} />
      </ScrollArea>
      
      {/* Navigation controls */}
      <div className="mt-4 flex justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectSlide(0)}
          disabled={currentIndex === 0}
        >
          First
        </Button>
        
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSlide(currentIndex - 1)}
            disabled={currentIndex === 0}
          >
            &lt;
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSlide(currentIndex + 1)}
            disabled={currentIndex === materials.length - 1}
          >
            &gt;
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectSlide(materials.length - 1)}
          disabled={currentIndex === materials.length - 1}
        >
          Last
        </Button>
      </div>
      
      {/* Progress indicator */}
      <div className="mt-4 flex justify-center">
        <div className="text-sm text-gray-500">
          Viewed: {viewedSlides.length} of {materials.length} slides
        </div>
      </div>
    </div>
  );
}