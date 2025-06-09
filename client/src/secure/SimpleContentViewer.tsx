import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { createS3ImageUrl } from '@/lib/imageUtils';

import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useExcelQA } from '@/hooks/use-excel-qa';

type S3Material = {
  id: number;
  path: string;
  title: string;
  description: string;
  contentType: string; 
  content: string;
  orderIndex: number;
  order: number;
  isPublished: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default function SimpleContentViewer() {
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [imageLoading, setImageLoading] = useState(false);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  
  // Extract path parameters from /book/:bookId/unit/:unitNumber format
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');
  
  // Handle both /book/6/unit/1 and /book/book6/unit/unit1 formats
  let bookId, unitId;
  if (pathParts[1] === 'book' && pathParts[3] === 'unit') {
    // Format: /book/6/unit/1
    bookId = pathParts[2];
    unitId = pathParts[4];
  } else {
    // Fallback for other formats
    bookId = '1';
    unitId = '1';
  }
  
  // Ensure proper book/unit prefix for API calls
  const bookPath = bookId.startsWith('book') ? bookId : `book${bookId}`;
  const unitPath = unitId.startsWith('unit') ? unitId : `unit${unitId}`;

  // Use Excel QA hook for Q&A data
  const { findMatchingQA } = useExcelQA(bookId);
  const currentUnitId = unitPath;

  // Excel-only Q&A function - no overrides or conflicting logic
  const getQuestionAnswer = (material: S3Material) => {
    const defaultResult = { country: "", question: "", answer: "", hasData: false };
    
    if (!material.content) {
      return defaultResult;
    }
    
    // Use ONLY Excel-based Q&A data - let the Excel hook decide what's blank
    const matchingQA = findMatchingQA ? findMatchingQA(material.content, currentUnitId) : undefined;
    
    if (matchingQA && matchingQA.question && matchingQA.question.trim() !== '') {
      return {
        country: "",
        question: matchingQA.question,
        answer: matchingQA.answer || "",
        hasData: true
      };
    }
    
    // Return default if no Excel match found - slide will be blank
    return defaultResult;
  };

  // Fetch materials using the correct direct API endpoint
  const { data: allMaterials = [], isLoading, error } = useQuery<S3Material[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
  });

  // Filter out PDF files from the materials
  const materials = allMaterials.filter(material => {
    const fileName = material.content?.toLowerCase() || '';
    return !fileName.endsWith('.pdf');
  });

  // Navigation functions
  const nextSlide = () => {
    if (currentSlide < materials.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };



  // Preload adjacent images for faster navigation
  useEffect(() => {
    if (materials.length === 0) return;
    
    const preloadImage = (index: number) => {
      if (index >= 0 && index < materials.length) {
        const material = materials[index];
        const imagePath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, material.content);
        
        if (!preloadedImages.has(imagePath)) {
          const img = new Image();
          img.onload = () => {
            setPreloadedImages(prev => new Set(prev).add(imagePath));
          };
          img.src = imagePath;
        }
      }
    };

    // Preload current and adjacent images
    preloadImage(currentSlide);
    preloadImage(currentSlide + 1);
    preloadImage(currentSlide - 1);
  }, [currentSlide, materials, bookPath, unitPath, preloadedImages]);

  // Keyboard navigation with wrapping
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide((prev) => (prev - 1 + materials.length) % materials.length);
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide((prev) => (prev + 1) % materials.length);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [materials.length]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <div className="text-red-600 text-lg font-semibold mb-2">
            Failed to load content
          </div>
          <div className="text-gray-600 mb-4">
            {error.message || 'Unable to fetch materials'}
          </div>
          <Button onClick={() => setLocation('/books')} variant="outline">
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  if (!materials || materials.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <div className="text-gray-600 text-lg font-semibold mb-2">
            No content available
          </div>
          <div className="text-gray-500 mb-4">
            Book {bookId} - Unit {unitId} has no materials
          </div>
          <Button onClick={() => setLocation('/books')} variant="outline">
            Back to Books
          </Button>
        </div>
      </div>
    );
  }

  // Get current material
  const currentMaterial = materials[currentSlide];
  
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Minimal Header */}
      <div className="border-b border-gray-100 py-3 px-6">
        <div className="flex items-center justify-between max-w-5xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/books')}
            className="text-gray-500 hover:text-gray-700 p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="text-sm font-medium text-gray-600">
            Book {bookId} · Unit {unitId}
          </div>
        </div>
      </div>
      
      {/* Clean Content Area */}
      <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full py-4 px-6 relative">
        {/* Left Navigation Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + materials.length) % materials.length)}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          disabled={materials.length <= 1}
        >
          <ChevronLeft className="h-6 w-6 text-gray-700" />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % materials.length)}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105"
          disabled={materials.length <= 1}
        >
          <ChevronRight className="h-6 w-6 text-gray-700" />
        </button>

        {/* Current Slide */}
        <div className="flex-1 flex flex-col items-center px-20">
          {currentMaterial && (() => {
            const imagePath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, currentMaterial.content);
            const qa = getQuestionAnswer(currentMaterial);
            const hasQuestion = qa.hasData && qa.question.trim() !== '';
            const isVideo = currentMaterial.content.toLowerCase().includes('video') || 
                         currentMaterial.content.toLowerCase().includes('.mp4') ||
                         currentMaterial.content.toLowerCase().includes('.avi') ||
                         currentMaterial.content.toLowerCase().includes('.mov') ||
                         currentMaterial.content.toLowerCase().includes('.swf');
            

            
            return (
              <div className="w-full flex flex-col items-center space-y-3">
                {/* Question-Answer First (Top) */}
                {hasQuestion && (
                  <div className="w-full max-w-5xl">
                    <div className="text-center space-y-3 bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                      <p className="text-xl font-light text-gray-800 leading-relaxed">
                        {qa.question}
                      </p>
                      {qa.answer && (
                        <p className="text-base text-gray-600 leading-relaxed">
                          {qa.answer}
                        </p>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Optimized Container for Images/Videos - fits with thumbnails below */}
                <div className="w-full h-[calc(100vh-450px)] flex items-center justify-center bg-gray-50 rounded-lg relative overflow-hidden border border-gray-200">
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-50/90 z-10">
                      <div className="flex flex-col items-center space-y-2">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-400"></div>
                        <p className="text-sm text-gray-500">Loading...</p>
                      </div>
                    </div>
                  )}
                  
                  {isVideo ? (
                    <div className="relative w-full h-full">
                      <video 
                        controls
                        preload="metadata"
                        crossOrigin="anonymous"
                        className="w-full h-full object-contain"
                        onLoadStart={() => setImageLoading(true)}
                        onLoadedData={() => setImageLoading(false)}
                        onError={(e) => {
                          setImageLoading(false);
                          console.error('Video playback error:', e);
                        }}
                        poster={imagePath.replace(/\.(mp4|avi|mov|swf)$/i, '.png')}
                      >
                        <source src={imagePath} type="video/mp4" />
                        <source src={imagePath} type="video/quicktime" />
                        <p className="text-center text-gray-600 p-4">
                          Your browser does not support this video format. 
                          <br />
                          <a href={imagePath} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            Download video file
                          </a>
                        </p>
                      </video>
                      <div className="absolute top-3 left-3 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
                        VIDEO
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={imagePath} 
                      alt={currentMaterial.title || `Slide ${currentSlide + 1}`}
                      className="w-full h-full object-contain"
                      onLoadStart={() => setImageLoading(true)}
                      onLoad={() => setImageLoading(false)}
                      onError={() => setImageLoading(false)}
                    />
                  )}
                  
                  {/* Slide Counter */}
                  <div className="absolute bottom-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                    {currentSlide + 1} / {materials.length}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>

        {/* Minimal Navigation */}
        <div className="flex items-center justify-center space-x-8 mt-8 pt-6">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            className="p-3 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          
          <div className="text-sm text-gray-400 font-light min-w-[60px] text-center">
            {currentSlide + 1} / {materials.length}
          </div>
          
          <button
            onClick={nextSlide}
            disabled={currentSlide === materials.length - 1}
            className="p-3 rounded-full hover:bg-gray-50 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>



        {/* Thumbnail Preview Slider - Always Visible */}
        <div className="mt-3 w-full max-w-4xl">
          <div className="flex space-x-2 overflow-x-auto scrollbar-hide py-2 px-4">
            {materials.map((material, index) => {
              const thumbnailPath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, material.content);
              const isActive = index === currentSlide;
              const isVideo = material.content.toLowerCase().includes('video') || 
                           material.content.toLowerCase().includes('.mp4') ||
                           material.content.toLowerCase().includes('.avi') ||
                           material.content.toLowerCase().includes('.mov');
              
              return (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 relative transition-all duration-200 ${
                    isActive ? 'ring-2 ring-gray-800 ring-offset-2' : 'hover:ring-1 hover:ring-gray-400 hover:ring-offset-1'
                  }`}
                >
                  <div className="w-16 h-12 bg-gray-100 rounded overflow-hidden relative">
                    <img
                      src={thumbnailPath}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    {isVideo && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="w-4 h-4 bg-white rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-[3px] border-l-black border-y-[2px] border-y-transparent ml-0.5"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  {isActive && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-800 rounded-full"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Minimal Dots (Keep as backup navigation) */}
        <div className="flex justify-center mt-2 space-x-1">
          {materials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-1 h-1 rounded-full transition-all duration-200 ${
                index === currentSlide ? 'bg-gray-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}