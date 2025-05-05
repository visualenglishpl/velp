import { useState, useEffect, useRef } from 'react';
import { Button } from './ui/button';
import { FileText, Loader2, RefreshCw, ExternalLink, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import * as pdfjs from 'pdfjs-dist';
import { PDFDocumentProxy, PDFPageProxy } from 'pdfjs-dist';

// Use local worker from node_modules
const pdfjsWorker = new URL('pdfjs-dist/build/pdf.worker.min.js', import.meta.url);
pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker.toString();

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

  // Convert S3 URL to API path for proxy access to improve security
  const getPdfProxyUrl = (url: string): string => {
    if (url.includes('s3.amazonaws.com')) {
      // Extract the path from S3 URL
      const matches = url.match(/\.amazonaws\.com\/(.+)/);
      if (matches && matches[1]) {
        return `/api/direct/pdf-proxy/${encodeURIComponent(matches[1])}`;
      }
    } else if (url.startsWith('s3://')) {
      // Extract bucket and key
      const parts = url.replace('s3://', '').split('/');
      const bucket = parts.shift(); // Get bucket name
      const key = parts.join('/'); // Get object key
      return `/api/direct/pdf-proxy/${encodeURIComponent(key)}`;
    }
    return url;
  };

  // Use proxy URL for PDF loading
  const proxyUrl = getPdfProxyUrl(normalizedUrl);

  // Load the PDF document
  useEffect(() => {
    if (useFallback) return;

    setLoading(true);
    setError(null);

    // Clean up function for the current PDF document
    const cleanup = () => {
      if (pdfDocument) {
        // We don't use destroy as it may not be available 
        // in all PDF.js versions
        try {
          // @ts-ignore - destroy exists but TypeScript doesn't know about it
          if (typeof pdfDocument.destroy === 'function') {
            pdfDocument.destroy();
          }
        } catch (e) {
          console.warn('PDF document destroy failed:', e);
        }
        setPdfDocument(null);
      }
    };

    // Load a new PDF document
    const loadPdf = async () => {
      try {
        cleanup();
        
        // Set fetch options with CORS support using proxy URL
        const loadingTask = pdfjs.getDocument({
          url: proxyUrl,
          cMapUrl: './cmaps/', // Relative path (could be replaced with actual path)
          cMapPacked: true,
          withCredentials: false
        });
        
        // Add progress monitoring
        loadingTask.onProgress = (progress) => {
          const percent = progress.loaded ? Math.round(progress.loaded / (progress.total || 1) * 100) : 0;
          console.log(`Loading PDF: ${percent}%`);
        };
        
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
  }, [proxyUrl, useFallback]);

  // Render the PDF page
  useEffect(() => {
    if (!pdfDocument || !canvasRef.current || useFallback) return;

    const renderPage = async () => {
      try {
        const page = await pdfDocument.getPage(currentPage);
        const canvas = canvasRef.current;
        
        // Skip if canvas is no longer available
        if (!canvas) return;
        
        const context = canvas.getContext('2d');
        
        if (!context) {
          console.error('Canvas context is null');
          return;
        }
        
        // Calculate scale to fit within container width
        // Get the parent container's width or fallback to reasonable defaults
        const containerElement = canvasRef.current.parentElement;
        const containerWidth = containerElement ? 
          containerElement.clientWidth - 20 : // 20px for padding
          Math.min(document.documentElement.clientWidth - 80, 1200);
        
        const viewportOriginal = page.getViewport({ scale: 1.0 });
        const scaleFactor = containerWidth / viewportOriginal.width;
        
        // Apply user scaling on top of fit-to-width scaling
        const adjustedScale = scaleFactor * scale;
        const viewport = page.getViewport({ scale: adjustedScale });
        
        // Adjust canvas size to match the page dimensions at appropriate scale
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
      // Reset scale to 1.0 (fit to width) when changing pages
      setScale(1.0);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      // Reset scale to 1.0 (fit to width) when changing pages
      setScale(1.0);
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
    <div className="flex flex-col items-center mx-auto w-full" style={{ maxWidth: '500px' }}>
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
      
      <div className="w-full overflow-auto border rounded-md p-3 bg-white min-h-[350px] max-h-[450px] flex items-center justify-center shadow-md transition-all duration-200 hover:shadow-lg">
        {loading && !useFallback && (
          <div className="flex flex-col items-center justify-center p-4">
            <Loader2 className="h-10 w-10 text-primary/60 animate-spin mb-2" />
            <p className="text-sm text-muted-foreground">Loading PDF...</p>
          </div>
        )}
        
        {error && !useFallback && (
          <div className="flex flex-col items-center justify-center p-4">
            <FileText className="h-10 w-10 text-destructive/60 mb-2" />
            <p className="text-sm text-destructive">{error}</p>
            <div className="flex gap-2 mt-2">
              <Button 
                variant="outline"
                onClick={handleError}
                size="sm"
              >
                Use Simple Viewer
              </Button>
              <Button 
                variant="link"
                onClick={() => window.open(proxyUrl, '_blank')}
                size="sm"
              >
                Open in new tab
              </Button>
            </div>
          </div>
        )}
        
        {!useFallback && (
          <div className="flex justify-center overflow-auto" 
               style={{ display: loading || error ? 'none' : 'flex', maxWidth: '100%' }}>
            <canvas ref={canvasRef} className="shadow-md max-w-full"></canvas>
          </div>
        )}

        {useFallback && (
          <div className="w-full h-[350px]">
            <iframe 
              src={proxyUrl} // Use the proxy URL instead of direct S3 URL
              className="w-full h-full border-0"
              title={title || "PDF Document"}
              sandbox="allow-scripts allow-same-origin allow-forms"
              loading="lazy"
            />
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <Button 
          variant="default" 
          onClick={() => window.open(proxyUrl, '_blank')}
          size="sm"
          className="mx-auto shadow-sm hover:shadow transition-all duration-200"
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>
    </div>
  );
};

export default PDFViewer;
