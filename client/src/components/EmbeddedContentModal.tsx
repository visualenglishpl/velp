/**
 * EmbeddedContentModal Component
 * 
 * This component displays embedded content from various sources in a modal.
 * It handles different types of embedded content including YouTube videos,
 * Wordwall games, ISL Collective resources, PDFs, and general HTML content.
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';

interface EmbeddedContentModalProps {
  isOpen: boolean;
  onClose: () => void;
  content: string;
  title: string;
  sourceUrl?: string;
}

export function EmbeddedContentModal({
  isOpen,
  onClose,
  content,
  title,
  sourceUrl
}: EmbeddedContentModalProps) {
  const [loading, setLoading] = useState(true);

  // Check if content is a YouTube URL
  const isYoutubeEmbed = content.includes('youtube.com/embed/');
  
  // Check if content is a Wordwall URL
  const isWordwallEmbed = content.includes('wordwall.net/embed/');
  
  // Check if content is an ISL Collective URL
  const isIslCollectiveEmbed = content.includes('islcollective.com/preview/');
  
  // Check if content is a PDF URL
  const isPdfUrl = content.toLowerCase().endsWith('.pdf');

  const handleIframeLoad = () => {
    setLoading(false);
  };

  // For PDFs, we'll open them directly in a new tab rather than embedding
  // This is more reliable than using Google Docs viewer
  if (isPdfUrl && isOpen) {
    // Automatically open the PDF in a new tab and close the modal
    window.open(content, '_blank');
    onClose();
    return null; // Return null to prevent rendering the dialog
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-[90vw] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex justify-between items-center">
            <DialogTitle>{title}</DialogTitle>
            {sourceUrl && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.open(sourceUrl, '_blank')}
                className="ml-2"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Original
              </Button>
            )}
          </div>
        </DialogHeader>
        
        <div className="flex-1 relative overflow-hidden min-h-[50vh]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted/20">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          
          {(isYoutubeEmbed || isWordwallEmbed || isIslCollectiveEmbed) && (
            <iframe
              src={content}
              className="w-full h-full border-0"
              allowFullScreen
              onLoad={handleIframeLoad}
              title={title}
              style={{ minHeight: '50vh' }}
            />
          )}
          
          {!isYoutubeEmbed && !isWordwallEmbed && !isIslCollectiveEmbed && !isPdfUrl && (
            <div className="p-4 overflow-auto max-h-[60vh]">
              {/* If content appears to be HTML, render it as HTML */}
              {content.includes('<') && content.includes('>') ? (
                <div dangerouslySetInnerHTML={{ __html: content }} />
              ) : (
                // Otherwise render as plain text or markdown
                <pre className="whitespace-pre-wrap">{content}</pre>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Add a default export for compatibility
export default EmbeddedContentModal;