import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, Loader2, ZoomIn, ZoomOut } from 'lucide-react';

// Set up the worker for the PDF.js library
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
  title?: string;
}

const PDFViewer = ({ pdfUrl, title }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('PDF loading error:', error);
    setError('Failed to load PDF. Please try again later.');
    setLoading(false);
  };

  const goToPreviousPage = () => {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  };

  const goToNextPage = () => {
    if (numPages && pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  };

  const zoomIn = () => {
    setScale(Math.min(scale + 0.2, 2.5)); // Maximum zoom of 250%
  };

  const zoomOut = () => {
    setScale(Math.max(scale - 0.2, 0.5)); // Minimum zoom of 50%
  };

  return (
    <div className="w-full flex flex-col items-center">
      {title && <h3 className="text-lg font-medium mb-2">{title}</h3>}
      
      <div className="w-full flex justify-center mb-4 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToPreviousPage} 
          disabled={pageNumber <= 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        
        <div className="flex items-center justify-center px-2 bg-muted rounded">
          <span className="text-sm">
            Page {pageNumber} of {numPages || '--'}
          </span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={goToNextPage} 
          disabled={!numPages || pageNumber >= numPages}
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
          disabled={scale >= 2.5}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
      </div>

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
            <Button 
              variant="link" 
              className="mt-2" 
              onClick={() => window.open(pdfUrl, '_blank')}
            >
              Try opening in a new tab
            </Button>
          </div>
        )}
        
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          className="flex justify-center"
          loading={null} // We handle loading ourselves
        >
          <Page 
            pageNumber={pageNumber} 
            scale={scale}
            renderTextLayer={false}
            renderAnnotationLayer={false}
            className="shadow-md"
          />
        </Document>
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
