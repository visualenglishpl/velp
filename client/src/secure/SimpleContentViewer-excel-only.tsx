import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit2, Save, Trash2, Loader2 } from 'lucide-react';
import { createS3ImageUrl } from '@/lib/imageUtils';
import { useAuth } from '@/hooks/use-auth';
import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useExcelQA } from '@/hooks/use-excel-qa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

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
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const sliderRef = useRef<Slider>(null);
  
  // Extract path parameters
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');
  const bookPath = pathParts[2] || 'book1';
  const unitPath = pathParts[3] || 'unit1';
  const bookId = bookPath.replace('book', '');
  const unitId = unitPath.replace('unit', '');

  // Use Excel QA hook for Q&A data
  const { findMatchingQA } = useExcelQA(bookId);
  const currentUnitId = unitPath;

  // Simple Excel-only Q&A function
  const getQuestionAnswer = (material: S3Material) => {
    const defaultResult = { country: "", question: "", answer: "", hasData: false };
    
    if (!material.content) {
      return defaultResult;
    }
    
    // Check if this slide should be blank by design
    const filenameOnly = material.content.split('/').pop() || material.content;
    const lowerFilename = filenameOnly.toLowerCase();
    
    if (
      lowerFilename.includes('00 a') || // Title slides
      lowerFilename.endsWith('.pdf') || // PDF files
      lowerFilename.includes('video') || // Video resources
      lowerFilename.includes('game') || // Game resources
      lowerFilename.includes('wordwall') || // Wordwall games
      lowerFilename.startsWith('00') // Other intro resources
    ) {
      return { ...defaultResult, generatedBy: 'blank-by-design' };
    }
    
    // EXCEL-ONLY: Use only Excel-based Q&A data
    const matchingQA = findMatchingQA(material.content, currentUnitId);
    
    if (matchingQA) {
      return {
        country: "",
        question: matchingQA.question,
        answer: matchingQA.answer,
        hasData: true
      };
    }
    
    // Return default if no Excel match found
    return defaultResult;
  };

  // Fetch materials
  const { data: materials = [], isLoading } = useQuery({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
  });

  // Slider settings
  const slickSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true,
    arrows: true,
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

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
      
      {/* Slider with images */}
      <div className="relative h-full">
        <Slider ref={sliderRef} {...slickSettings} className="w-full h-full">
          {materials.map((material, index) => {
            const imagePath = createS3ImageUrl(`/api/direct/${bookPath}/${unitPath}/assets`, material.content);
            
            // Check for video content
            const isVideo = material.content.toLowerCase().includes('video') || 
                           material.content.toLowerCase().endsWith('.mp4');
            
            // Premium content check
            const freeSlideLimit = 15;
            const hasPaidAccess = isAuthenticated && user;
            const isPremiumContent = (index >= freeSlideLimit || isVideo) && !hasPaidAccess;
            
            return (
              <div key={index} className="outline-none h-[55vh] w-full flex flex-col justify-center relative px-3">
                {/* Question-Answer section - Excel data only */}
                {(() => {
                  const qa = getQuestionAnswer(material);
                  
                  // Check if question data exists from Excel
                  const hasQuestion = qa.hasData && qa.question.trim() !== '';
                  
                  // Check if this is a blank slide
                  const contentLower = material.content.toLowerCase();
                  const filenamePart = contentLower.split('/').pop() || contentLower;
                  
                  const isBlankByDesign = 
                    filenamePart.includes('00 a') ||
                    filenamePart.endsWith('.pdf') ||
                    filenamePart.endsWith('.mp4') ||
                    filenamePart.includes('video') ||
                    filenamePart.includes('game') ||
                    filenamePart.includes('wordwall') ||
                    filenamePart.startsWith('00');
                  
                  // Only show Q&A if we have Excel data and it's not a blank slide
                  if (!hasQuestion || isBlankByDesign) return null;
                  
                  return (
                    <div className="mb-1 p-2 mx-auto z-10 max-w-2xl">
                      <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-lg p-4 border">
                        <div className="text-center space-y-2">
                          <div className="text-lg font-semibold text-blue-700">
                            {qa.question}
                          </div>
                          <div className="text-base text-gray-700 border-t pt-2">
                            {qa.answer}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* Image */}
                <div className="flex-1 flex items-center justify-center relative">
                  {isPremiumContent ? (
                    <div className="relative">
                      <img 
                        src={imagePath} 
                        alt={material.title || `Slide ${index + 1}`}
                        className="max-h-[45vh] max-w-full object-contain filter blur-md"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg">
                        <div className="text-white text-center p-4">
                          <div className="text-lg font-semibold mb-2">Premium Content</div>
                          <div className="text-sm">Sign in to access all content</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <img 
                      src={imagePath} 
                      alt={material.title || `Slide ${index + 1}`}
                      className="max-h-[45vh] max-w-full object-contain"
                    />
                  )}
                </div>
                
                {/* Slide counter */}
                <div className="text-center text-sm text-gray-500 mt-2">
                  {index + 1} / {materials.length}
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
}