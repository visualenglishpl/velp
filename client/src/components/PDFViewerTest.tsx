import PDFViewer from "./PDFViewer";

const PDFViewerTest = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">PDF Viewer Test</h1>
      <div className="flex justify-center">
        <PDFViewer 
          pdfUrl="/pdfs/sample.html" 
          title="Sample PDF Document"
        />
      </div>
    </div>
  );
};

export default PDFViewerTest;
