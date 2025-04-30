import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2 } from 'lucide-react';
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

  useEffect(() => {
    if (!pdfContainerRef.current) return;
    
    setLoading(true);
    setError(null);
    
    const options = {
      height: '750px',
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
      const success = PDFObject.embed(pdfUrl, pdfContainerRef.current, options);
      
      // PDFObject.embed returns either false or the element it embeds into
      if (!success) {
        setError('Could not embed PDF. Try using a different browser or viewing it in a new tab.');
      }
      
      setLoading(false);
    } catch (e) {
      console.error('PDF embedding error:', e);
      setError('Failed to embed PDF document. This could be due to browser settings or file format.');
      setLoading(false);
    }
  }, [pdfUrl, retryCount]);

  const retryLoadPdf = () => {
    setRetryCount(retryCount + 1);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      
      <div className="w-full overflow-auto border rounded-md p-2 bg-white min-h-[500px] flex items-center justify-center">
        {loading && (
          <div className="flex flex-col items-center justify-center p-8">
            <Loader2 className="h-12 w-12 text-primary/60 animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        )}
        
        {error && (
          <div className="flex flex-col items-center justify-center p-8">
            <FileText className="h-12 w-12 text-destructive/60 mb-4" />
            <p className="text-sm text-destructive">{error}</p>
            <div className="flex gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={retryLoadPdf}
              >
                <Loader2 className="h-3.5 w-3.5 mr-1" />
                Try Again
              </Button>
              <Button 
                variant="link"
                onClick={() => window.open(pdfUrl, '_blank')}
              >
                Open in new tab
              </Button>
            </div>
          </div>
        )}
        
        <div 
          id="pdf-container" 
          ref={pdfContainerRef} 
          className="w-full min-h-[650px]"
          style={{ display: loading || error ? 'none' : 'block' }}
        ></div>
      </div>

      <div className="mt-4">
        <Button 
          variant="outline" 
          onClick={() => window.open(pdfUrl, '_blank')}
        >
          <FileText className="mr-2 h-4 w-4" />
          Open in New Tab
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
