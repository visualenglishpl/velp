import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, FileText, Video, MessageSquare, Check } from 'lucide-react';
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
    switch (contentType) {
      case 'image':
        return <ImageIcon className="h-4 w-4" />;
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'text':
        return <FileText className="h-4 w-4" />;
      case 'exercise':
        return <MessageSquare className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };
  
  // Truncate title to a reasonable length
  const truncateTitle = (title: string, maxLength = 15) => {
    return title.length > maxLength
      ? title.substring(0, maxLength) + '...'
      : title;
  };
  
  return (
    <div className="mt-4">
      <ScrollArea>
        <div 
          className="flex space-x-2 p-2 bg-gray-50 rounded-lg" 
          ref={scrollRef}
        >
          {materials.map((material, index) => {
            const isActive = index === currentIndex;
            const isViewed = viewedSlides.includes(material.id);
            
            return (
              <motion.div
                key={material.id}
                className={`
                  relative p-2 rounded-md cursor-pointer
                  ${isActive ? 'active-thumbnail bg-primary/10 border border-primary/30' : 'hover:bg-gray-100'}
                `}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.03 }}
                onClick={() => onSelectSlide(index)}
              >
                <div className="flex flex-col items-center w-20">
                  <div className={`
                    h-16 w-16 rounded flex items-center justify-center
                    ${isActive ? 'bg-primary/5' : 'bg-gray-100'}
                  `}>
                    {getContentTypeIcon(material.contentType)}
                  </div>
                  <span className="text-xs mt-2 text-center font-medium">
                    {truncateTitle(material.title)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {index + 1}/{materials.length}
                  </span>
                  
                  {/* Viewed indicator */}
                  {isViewed && !isActive && (
                    <div className="absolute top-1 right-1 h-4 w-4 bg-green-500 rounded-full flex items-center justify-center">
                      <Check className="h-3 w-3 text-white" />
                    </div>
                  )}
                  
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-full"
                      layoutId="activeIndicator"
                    />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelectSlide(currentIndex + 1)}
            disabled={currentIndex === materials.length - 1}
          >
            Next
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
      
      <div className="mt-4 flex justify-center">
        <div className="text-sm text-gray-500">
          Viewed: {viewedSlides.length} of {materials.length} slides
        </div>
      </div>
    </div>
  );
}