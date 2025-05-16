/**
 * EmbeddedContentModal Component
 * 
 * A modal component to display embedded content from various sources including:
 * - YouTube videos (with privacy-enhanced mode)
 * - Wordwall games
 * - ISL Collective resources
 * - PDF documents
 * - Raw HTML content (sanitized)
 */

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { AlertCircle, X, ExternalLink, Loader2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  extractYoutubeVideoId,
  getYoutubeEmbedUrl,
  extractWordwallGameId,
  getWordwallEmbedUrl,
  extractIslCollectiveId,
  isPdfUrl,
  createSafeIframe,
  detectEmbedType
} from '@/lib/embedUtils';

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
  const [embedContent, setEmbedContent] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [embedType, setEmbedType] = useState<string>('unknown');

  useEffect(() => {
    if (!isOpen) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const type = detectEmbedType(content);
      setEmbedType(type);
      
      switch (type) {
        case 'youtube':
          const videoId = extractYoutubeVideoId(content);
          if (videoId) {
            setEmbedContent(`<iframe 
              title="${title}" 
              width="100%" 
              height="400" 
              src="${getYoutubeEmbedUrl(videoId)}" 
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen></iframe>`);
          } else {
            setError('Could not extract YouTube video ID.');
          }
          break;
          
        case 'wordwall':
          const gameId = extractWordwallGameId(content);
          if (gameId) {
            setEmbedContent(`<iframe 
              title="${title}" 
              style="width: 100%; height: 500px; border: none" 
              src="${getWordwallEmbedUrl(gameId)}" 
              allowfullscreen></iframe>`);
          } else {
            setError('Could not extract Wordwall game ID.');
          }
          break;
          
        case 'islcollective':
          const resourceId = extractIslCollectiveId(content);
          if (resourceId) {
            setEmbedContent(`<iframe 
              title="${title}" 
              style="width: 100%; height: 600px; border: none" 
              src="https://en.islcollective.com/preview/${resourceId}" 
              allowfullscreen></iframe>`);
          } else {
            setError('Could not extract ISL Collective resource ID.');
          }
          break;
          
        case 'pdf':
          if (isPdfUrl(content)) {
            setEmbedContent(`<iframe 
              title="${title}" 
              style="width: 100%; height: 600px; border: none" 
              src="https://docs.google.com/viewer?url=${encodeURIComponent(content)}&embedded=true" 
              allowfullscreen></iframe>`);
          } else {
            setError('Invalid PDF URL.');
          }
          break;
          
        case 'html':
          // Use our createSafeIframe to handle raw HTML with sanitization
          setEmbedContent(createSafeIframe(content, title));
          break;
          
        default:
          setError('Unsupported content type.');
          break;
      }
    } catch (err) {
      setError('Failed to process embedded content.');
      console.error('Error in EmbeddedContentModal:', err);
    } finally {
      setLoading(false);
    }
  }, [isOpen, content, title]);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col overflow-hidden">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle>{title}</DialogTitle>
          <div className="flex items-center gap-2">
            {sourceUrl && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(sourceUrl, '_blank')}
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open in New Tab
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 overflow-auto p-1">
          {loading && (
            <div className="h-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {!loading && !error && (
            <div 
              className="h-full w-full"
              dangerouslySetInnerHTML={{ __html: embedContent }} 
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}