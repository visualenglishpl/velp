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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentSlide, materials.length]);

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
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => setLocation('/books')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Books
          </Button>
          <h1 className="text-2xl font-bold">
            Book {bookId} - Unit {unitId}
          </h1>
        </div>
      </div>
      
      {/* Content Viewer */}
      <div className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4">
        {/* Navigation Controls */}
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="outline" 
            onClick={prevSlide} 
            disabled={currentSlide === 0}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Previous
          </Button>
          
          <div className="text-sm text-gray-600 font-medium">
            {currentSlide + 1} / {materials.length}
          </div>
          
          <Button 
            variant="outline" 
            onClick={nextSlide} 
            disabled={currentSlide === materials.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Current Slide */}
        <div className="flex-1 flex flex-col">
          {currentMaterial && (() => {
            const imagePath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, currentMaterial.content);
            const qa = getQuestionAnswer(currentMaterial);
            const hasQuestion = qa.hasData && qa.question.trim() !== '';
            
            return (
              <div className="flex-1 flex flex-col">
                {/* Question-Answer section */}
                {hasQuestion && (
                  <div className="mb-6">
                    <div className="bg-white rounded-lg shadow-lg p-6 border">
                      <div className="text-center space-y-3">
                        <div className="text-xl font-semibold text-blue-700">
                          {qa.question}
                        </div>
                        <div className="text-lg text-gray-700 border-t pt-3">
                          {qa.answer}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Image */}
                <div className="flex-1 flex items-center justify-center bg-white rounded-lg shadow-sm border p-4">
                  <img 
                    src={imagePath} 
                    alt={currentMaterial.title || `Slide ${currentSlide + 1}`}
                    className="max-h-[60vh] max-w-full object-contain"
                  />
                </div>
              </div>
            );
          })()}
        </div>

        {/* Slide Dots Navigation */}
        <div className="flex justify-center mt-6 space-x-2">
          {materials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}