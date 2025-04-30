import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2, RefreshCw, ExternalLink } from 'lucide-react';
import PDFObject from 'pdfobject';

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const pdfContainerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [useFallback, setUseFallback] = useState(false);

  // Convert AWS S3 URL to correct format if needed
  // This handles both s3://bucket/key and https://bucket.s3.amazonaws.com/key formats
  const normalizePdfUrl = (url: string): string => {
    if (url.startsWith('s3://')) {
      // Convert s3:// URL to https:// format
      const parts = url.replace('s3://', '').split('/');
      const bucket = parts.shift(); // Get the bucket name
      const key = parts.join('/'); // The rest is the object key
      return `https://${bucket}.s3.amazonaws.com/${key}`;
    }
    return url;
  };

  const normalizedUrl = normalizePdfUrl(pdfUrl);

  useEffect(() => {
    if (!pdfContainerRef.current || useFallback) return;
    
    setLoading(true);
    setError(null);
    
    const options = {
      height: '700px',
      width: '100%',
      pdfOpenParams: {
        navpanes: 1,
        toolbar: 1,
        statusbar: 1,
        view: 'FitH'
      }
    };

    try {
      // Embed PDF using PDFObject
      const success = PDFObject.embed(normalizedUrl, pdfContainerRef.current, options);
      
      // PDFObject.embed returns either false or the element it embeds into
      if (!success) {
        console.log('PDFObject could not embed PDF, trying fallback method...');
        setUseFallback(true);
      }
      
      setLoading(false);
    } catch (e) {
      console.error('PDF embedding error:', e);
      setUseFallback(true);
      setLoading(false);
    }
  }, [normalizedUrl, retryCount, useFallback]);

  const retryLoadPdf = () => {
    setRetryCount(retryCount + 1);
    setUseFallback(false);
    setError(null);
  };

  // Switch to alternate embed method
  const switchToFallback = () => {
    setUseFallback(true);
    setError(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      
      <div className="w-full overflow-auto border rounded-md p-2 bg-white min-h-[700px] flex items-center justify-center">
        {loading && !useFallback && (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 text-primary/60 animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        )}
        
        {error && !useFallback && (
          <div className="flex flex-col items-center justify-center p-8">
            <FileText className="h-12 w-12 text-destructive/60 mb-4" />
            <p className="text-sm text-destructive">{error}</p>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={retryLoadPdf}
              >
                <RefreshCw className="h-3.5 w-3.5 mr-1" />
                Try Again
              </Button>
              <Button 
                variant="outline"
                onClick={switchToFallback}
              >
                Use Simple Viewer
              </Button>
              <Button 
                variant="link"
                onClick={() => window.open(normalizedUrl, '_blank')}
              >
                Open in new tab
              </Button>
            </div>
          </div>
        )}
        
        {!useFallback && (
          <div 
            id="pdf-container" 
            ref={pdfContainerRef} 
            className="w-full min-h-[700px]"
            style={{ display: loading || error ? 'none' : 'block' }}
          ></div>
        )}

        {useFallback && (
          <div className="w-full h-[700px]">
            <iframe 
              src={normalizedUrl}
              className="w-full h-full border-0"
              title={title || "PDF Document"}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        {useFallback && (
          <Button 
            variant="outline" 
            onClick={retryLoadPdf}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Interactive Viewer
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={() => window.open(normalizedUrl, '_blank')}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Open in New Tab
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
