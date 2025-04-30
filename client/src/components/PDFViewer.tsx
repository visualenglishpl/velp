import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { FileText, Loader2, RefreshCw, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Set the worker source path
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfDocument, setPdfDocument] = useState<PDFDocumentProxy | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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

  // Load the PDF document
  useEffect(() => {
    if (useFallback) return;

    setLoading(true);
    setError(null);

    // Clean up function for the current PDF document
    const cleanup = () => {
      if (pdfDocument) {
        pdfDocument.destroy();
        setPdfDocument(null);
      }
    };

    // Load a new PDF document
    const loadPdf = async () => {
      try {
        cleanup();
        
        // Set fetch options with CORS support
        const loadingTask = pdfjs.getDocument({
          url: normalizedUrl,
          cMapUrl: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/cmaps/',
          cMapPacked: true,
          withCredentials: false
        });
        
        const newDocument = await loadingTask.promise;
        setPdfDocument(newDocument);
        setNumPages(newDocument.numPages);
        setCurrentPage(1);
        setLoading(false);
      } catch (err) {
        console.error('Error loading PDF:', err);
        setError('Failed to load PDF document. Using fallback viewer.');
        setLoading(false);
        setUseFallback(true);
      }
    };

    loadPdf();

    // Clean up when component unmounts or URL changes
    return cleanup;
  }, [normalizedUrl, useFallback]);

  // Render the PDF page
  useEffect(() => {
    if (!pdfDocument || !canvasRef.current || useFallback) return;

    const renderPage = async () => {
      try {
        const page = await pdfDocument.getPage(currentPage);
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        
        if (!context) {
          console.error('Canvas context is null');
          return;
        }
        
        const viewport = page.getViewport({ scale: scale });
        
        // Adjust canvas size to match the page dimensions
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        // Render the page content
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        
        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering page:', err);
        setError('Failed to render PDF page.');
      }
    };

    renderPage();
  }, [pdfDocument, currentPage, scale, useFallback]);

  const nextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 3.0));
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.5));
  };

  // Switch to fallback method
  const handleError = () => {
    setUseFallback(true);
    setError(null);
  };

  // Retry loading with PDF.js
  const retryWithPdfJs = () => {
    setUseFallback(false);
    setError(null);
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      
      {!useFallback && (
        <div className="w-full flex justify-center mb-4 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevPage} 
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center justify-center px-2 bg-muted rounded">
            <span className="text-sm">
              Page {currentPage} of {numPages}
            </span>
          </div>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextPage} 
            disabled={currentPage >= numPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button 
            variant="outline" 
            size="sm" 
            onClick={zoomOut} 
            disabled={scale <= 0.5}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={zoomIn} 
            disabled={scale >= 3.0}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      )}
      
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
                onClick={handleError}
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
          <div className="flex justify-center overflow-auto" 
               style={{ display: loading || error ? 'none' : 'flex' }}>
            <canvas ref={canvasRef} className="shadow-md"></canvas>
          </div>
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
            onClick={retryWithPdfJs}
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
