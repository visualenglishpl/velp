import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Maximize, Minimize, ExternalLink, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

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

interface ContentSlideProps {
  material: Material;
  isActive: boolean;
  bookId: string;
  unitNumber: number;
}

export default function ContentSlide({ material, isActive, bookId, unitNumber }: ContentSlideProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoomedIn, setZoomedIn] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isError, setIsError] = useState(false);

  // Format the S3 URL based on content path
  const getS3Url = () => {
    console.log(`Getting URL for material: contentType=${material.contentType}, content=${material.content}`);
    
    // Special direct path for book7/unit12
    if (bookId === '7' && unitNumber === 12) {
      // Use our direct endpoint that matches S3 structure exactly
      return `/api/viewer/book7/unit12/assets/${material.content}`;
    }
    
    // Check if the content is already a complete path
    if (material.content.includes('/')) {
      // If it has slashes, it might be a full path already
      return `/api/content/${material.content}`;
    }
    
    // Otherwise, construct the path based on bookId and unitNumber
    const formattedBookId = bookId.replace(/^(\d+[a-z]*)$/, (_, id) => `book${id}`);
    const formattedUnitNumber = unitNumber > 0 ? `unit${unitNumber}` : '';
    
    // Standard path for other books/units
    const basePath = `/api/assets/${formattedBookId}/${formattedUnitNumber}`;
    return `${basePath}/${material.content}`;
  };

  useEffect(() => {
    // Reset state when the active slide changes
    if (isActive) {
      setZoomedIn(false);
    }
  }, [isActive]);

  // Handle image load
  const handleImageLoad = () => {
    setImageLoaded(true);
    setIsError(false);
  };

  // Handle image error
  const handleImageError = () => {
    setIsError(true);
    setImageLoaded(true); // Still mark as loaded to remove skeleton
  };

  // Render based on content type
  const renderContent = () => {
    console.log("Rendering content type:", material.contentType, "Content:", material.content);
    
    // Simplify: For images, we'll render image component for all image-like content types
    // For html/text content, we'll render the HTML content with dangerouslySetInnerHTML
    const contentType = material.contentType.toLowerCase();
    
    // Detect if this is an image based on content type or file extension
    const isImage = ['image', 'img', 'jpg', 'png', 'gif', 'svg', 'jpeg', 'image'].includes(contentType) || 
                   (material.content && /\.(jpg|jpeg|png|gif|svg)$/i.test(material.content));
    
    if (isImage) {
      return (
        <div className={`relative overflow-hidden transition-all duration-300 ease-in-out ${zoomedIn ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}>
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse">
              <span className="sr-only">Loading...</span>
            </div>
          )}
          <motion.img
            src={getS3Url()}
            alt={material.title}
            className={`max-w-full max-h-[70vh] mx-auto object-contain transition-all duration-300 ${zoomedIn ? 'scale-150' : 'scale-100'}`}
            onClick={() => setZoomedIn(!zoomedIn)}
            onLoad={handleImageLoad}
            onError={handleImageError}
            initial={{ opacity: 0 }}
            animate={{ opacity: imageLoaded ? 1 : 0 }}
          />
          {imageLoaded && !isError && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm shadow-md"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedIn(!zoomedIn);
              }}
            >
              {zoomedIn ? <Minimize className="h-4 w-4 mr-1" /> : <Maximize className="h-4 w-4 mr-1" />}
              {zoomedIn ? 'Zoom Out' : 'Zoom In'}
            </Button>
          )}
          {isError && (
            <div className="text-center text-red-500 p-4">
              <p>Failed to load image. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
        
    if (contentType === 'video') {
      return (
        <div className="relative">
          <video
            src={getS3Url()}
            controls={isActive}
            className="max-w-full max-h-[70vh] mx-auto"
            autoPlay={isActive && isPlaying}
            muted={isMuted}
            playsInline
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onError={() => setIsError(true)}
          />
          <div className="absolute bottom-2 right-2 flex space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/80 backdrop-blur-sm shadow-md"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-1" /> : <Play className="h-4 w-4 mr-1" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/80 backdrop-blur-sm shadow-md"
              onClick={() => setIsMuted(!isMuted)}
            >
              {isMuted ? <VolumeX className="h-4 w-4 mr-1" /> : <Volume2 className="h-4 w-4 mr-1" />}
              {isMuted ? 'Unmute' : 'Mute'}
            </Button>
          </div>
          {isError && (
            <div className="text-center text-red-500 p-4">
              <p>Failed to load video. Please try again later.</p>
            </div>
          )}
        </div>
      );
    }
      
    if (contentType === 'text' || contentType === 'lesson') {
      return (
        <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
          {/* Handle different text formats */}
          {material.content.startsWith('http') ? (
            <div className="text-center">
              <p>External content is available at the link below:</p>
              <a 
                href={material.content} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline inline-flex items-center mt-2"
              >
                {material.title} <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          ) : (
            <div 
              dangerouslySetInnerHTML={{ __html: material.content }}
              className="break-words"
            />
          )}
        </div>
      );
    }
      
    if (contentType === 'exercise') {
      // For exercises, try to parse as JSON if it looks like JSON, otherwise treat as HTML
      if (material.content.trim().startsWith('{') && material.content.trim().endsWith('}')) {
        try {
          const exercise = JSON.parse(material.content);
          return (
            <Card className="p-4 max-w-2xl mx-auto">
              <h3 className="text-xl font-bold mb-4">{exercise.title || 'Exercise'}</h3>
              <div className="space-y-4">
                {exercise.questions?.map((question: any, index: number) => (
                  <div key={index} className="p-3 border rounded-md">
                    <p className="font-medium">{index + 1}. {question.text}</p>
                    {question.options && (
                      <div className="mt-2 space-y-2">
                        {question.options.map((option: string, optIndex: number) => (
                          <label key={optIndex} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-gray-50 rounded-md">
                            <input 
                              type="radio" 
                              name={`question-${index}`} 
                              className="h-4 w-4 text-blue-600" 
                            />
                            <span>{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          );
        } catch (e) {
          // If JSON parsing fails, fall back to treating it as HTML
          return (
            <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
              <div dangerouslySetInnerHTML={{ __html: material.content }} className="break-words" />
            </div>
          );
        }
      } else {
        // If it doesn't look like JSON, treat it as HTML content
        return (
          <div className="prose prose-lg max-w-none mx-auto px-4 py-2">
            <div dangerouslySetInnerHTML={{ __html: material.content }} className="break-words" />
          </div>
        );
      }
    }
      
    // Default case
    return (
      <div className="text-center p-4">
        <p>Unsupported content type: {material.contentType}</p>
        <pre className="mt-2 text-xs bg-gray-100 p-2 rounded overflow-auto">{material.content}</pre>
      </div>
    );
  };

  return (
    <div className="p-4 min-h-[50vh] flex flex-col">
      <h2 className="text-xl font-semibold text-center mb-4">{material.title}</h2>
      {material.description && (
        <p className="text-gray-600 text-center mb-6">{material.description}</p>
      )}
      <div className="flex-1 flex items-center justify-center">
        {renderContent()}
      </div>
    </div>
  );
}