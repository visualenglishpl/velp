import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { TeacherResource } from './TeacherResources';
import { AlertTriangle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ResourceType, 
  sanitizeEmbedCode, 
  detectResourceType,
  normalizeEmbed 
} from '@/lib/embedUtils';

interface EmbeddedContentModalProps {
  resource: TeacherResource | null;
  onClose: () => void;
}

export const EmbeddedContentModal: React.FC<EmbeddedContentModalProps> = ({ 
  resource, 
  onClose
}) => {
  const [processedEmbed, setProcessedEmbed] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasLoadError, setHasLoadError] = useState<boolean>(false);
  
  useEffect(() => {
    if (resource) {
      // Process the embed code or generate one from a URL if needed
      const processEmbed = () => {
        if (resource.embedCode) {
          // If we already have an embed code, just normalize it
          return normalizeEmbed(resource.embedCode);
        } else if (resource.sourceUrl) {
          // If we only have a source URL, try to generate an embed code
          return normalizeEmbed(resource.sourceUrl);
        } else if (resource.content?.embedUrl) {
          // Try to use content.embedUrl if available
          return normalizeEmbed(resource.content.embedUrl);
        }
        return '';
      };
      
      // Set the processed embed code
      setProcessedEmbed(processEmbed());
      setIsLoading(true);
      setHasLoadError(false);
    }
  }, [resource]);
  
  if (!resource) return null;
  
  // Determine content type for display purposes
  let contentType = ResourceType.Other;
  
  if (resource.embedCode) {
    contentType = detectResourceType(resource.embedCode);
  } else if (resource.sourceUrl) {
    contentType = detectResourceType(resource.sourceUrl);
  }
  
  const handleContentLoad = () => {
    setIsLoading(false);
  };
  
  const handleContentError = () => {
    setIsLoading(false);
    setHasLoadError(true);
  };

  return (
    <Dialog 
      open={!!resource} 
      onOpenChange={(open) => !open && onClose()}
    >
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center mb-4 flex items-center justify-center gap-2">
            {resource.title}
            {contentType === ResourceType.Wordwall && 
              <span className="text-sm text-muted-foreground">(Wordwall)</span>}
            {contentType === ResourceType.IslCollective && 
              <span className="text-sm text-muted-foreground">(ISL Collective)</span>}
            {contentType === ResourceType.YouTube && 
              <span className="text-sm text-muted-foreground">(YouTube)</span>}
          </DialogTitle>
        </DialogHeader>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        
        {hasLoadError && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              There was a problem loading this content. It may be blocked by the browser.
              {resource.sourceUrl && (
                <div className="mt-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                      Open in new tab <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                </div>
              )}
            </AlertDescription>
          </Alert>
        )}
        
        <div className="flex-1 overflow-auto flex items-center justify-center h-[80vh]" 
             onLoad={handleContentLoad} 
             onError={handleContentError}>
          {processedEmbed ? (
            <div className="w-full h-full" dangerouslySetInnerHTML={{ __html: processedEmbed }} />
          ) : resource.sourceUrl ? (
            <div className="flex flex-col items-center justify-center gap-4">
              <p>This resource doesn't have an embed code but is available externally.</p>
              <Button asChild>
                <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1">
                  Open resource <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              <p>No content available for this resource.</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmbeddedContentModal;