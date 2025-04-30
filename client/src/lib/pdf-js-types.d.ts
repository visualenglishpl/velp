declare module 'pdfjs-dist' {
  const GlobalWorkerOptions: {
    workerSrc: string;
  };
  
  export interface PDFDocumentProxy {
    numPages: number;
    getPage(pageNumber: number): Promise<PDFPageProxy>;
    getMetadata(): Promise<{ info: Record<string, any> }>;
    getOutline(): Promise<any[] | null>;
    getDestinations(): Promise<Record<string, any>>;
  }
  
  export interface PDFPageProxy {
    getViewport(options: { scale: number; rotation?: number }): PDFPageViewport;
    render(options: PDFRenderParams): PDFRenderTask;
    getTextContent(options?: any): Promise<TextContent>;
    getAnnotations(): Promise<any[]>;
  }
  
  export interface PDFPageViewport {
    width: number;
    height: number;
    scale: number;
    rotation: number;
    transform: number[];
    offsetX?: number;
    offsetY?: number;
  }
  
  export interface TextContent {
    items: TextItem[];
    styles: Record<string, any>;
  }
  
  export interface TextItem {
    str: string;
    dir: string;
    transform: number[];
    width: number;
    height: number;
    hasEOL: boolean;
  }
  
  export interface PDFRenderParams {
    canvasContext: CanvasRenderingContext2D;
    viewport: PDFPageViewport;
    enableWebGL?: boolean;
    renderInteractiveForms?: boolean;
    transform?: number[];
    imageLayer?: any;
    canvasFactory?: any;
    background?: any;
  }
  
  export interface PDFRenderTask {
    promise: Promise<void>;
    cancel(): void;
  }
  
  export interface GetDocumentParams {
    url?: string;
    data?: Uint8Array;
    cMapUrl?: string;
    cMapPacked?: boolean;
    disableRange?: boolean;
    disableStream?: boolean;
    disableAutoFetch?: boolean;
    disableCreateObjectURL?: boolean;
    disableFontFace?: boolean;
    nativeImageDecoderSupport?: string;
    rangeChunkSize?: number;
    withCredentials?: boolean;
    httpHeaders?: Record<string, string>;
    password?: string;
    standardFontDataUrl?: string;
  }

  export function getDocument(params: GetDocumentParams | string): PDFDocumentLoadingTask;
  
  export interface PDFDocumentLoadingTask {
    promise: Promise<PDFDocumentProxy>;
    onProgress?: (progressData: { loaded: number; total: number }) => void;
    cancel(): void;
  }

  const version: string;

  export { GlobalWorkerOptions, version };
}
