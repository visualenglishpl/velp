import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { Link } from 'wouter';
import { useExcelQA } from '@/hooks/use-excel-qa';

// Test material data to demonstrate Excel QA mapping
const testMaterials = [
  {
    id: 1,
    path: 'book4/unit1/01 A What is the name of this country.png',
    title: '01 A What is the name of this country',
    content: '01 A What is the name of this country',
    contentType: 'image/png'
  },
  {
    id: 2,
    path: 'book4/unit1/01 B Where is this flag from.png',
    title: '01 B Where is this flag from',
    content: '01 B Where is this flag from',
    contentType: 'image/png'
  },
  {
    id: 3,
    path: 'book4/unit1/02 A What nationality is he.png',
    title: '02 A What nationality is he',
    content: '02 A What nationality is he',
    contentType: 'image/png'
  },
  {
    id: 4,
    path: 'book4/unit1/02 B What nationality is she.png',
    title: '02 B What nationality is she',
    content: '02 B What nationality is she',
    contentType: 'image/png'
  },
  {
    id: 5,
    path: 'book4/unit1/03 A Is he Polish.png',
    title: '03 A Is he Polish',
    content: '03 A Is he Polish',
    contentType: 'image/png'
  }
];

export default function ContentViewerTest() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [excelData, setExcelData] = useState<any>({});
  const { findMatchingQA } = useExcelQA('4');

  console.log("ContentViewerTest - component mounted");

  useEffect(() => {
    // Load Excel QA data for testing
    const loadExcelData = async () => {
      try {
        const response = await fetch('/src/data/qa-mapping-book4.json');
        const data = await response.json();
        setExcelData(data);
        console.log("Excel QA data loaded:", Object.keys(data).length, "entries");
      } catch (error) {
        console.error("Failed to load Excel data:", error);
      }
    };
    
    loadExcelData();
  }, []);

  const currentMaterial = testMaterials[currentIndex];
  
  // Test Excel QA matching
  const getQuestionAnswer = (material: any) => {
    console.log("Testing Excel QA match for:", material.content);
    
    const matchingQA = findMatchingQA(material.content);
    console.log("Excel QA match result:", matchingQA);
    
    if (matchingQA && matchingQA.question && matchingQA.question.trim() !== '') {
      return {
        question: matchingQA.question,
        answer: matchingQA.answer || "",
        hasData: true,
        source: "Excel"
      };
    }
    
    return {
      question: "",
      answer: "",
      hasData: false,
      source: "None - slide will be blank"
    };
  };

  const qaData = getQuestionAnswer(currentMaterial);

  const goToNext = () => {
    if (currentIndex < testMaterials.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Home
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">Content Viewer Test - Excel QA System</h1>
          <div className="text-sm text-gray-600">
            Slide {currentIndex + 1} of {testMaterials.length}
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-4xl w-full">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">
                Book 4 - Unit 1 - {currentMaterial.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Content Display */}
              <div className="bg-blue-50 p-6 rounded-lg text-center">
                <div className="text-lg font-medium text-blue-800 mb-2">
                  Content: {currentMaterial.content}
                </div>
                <div className="text-sm text-blue-600">
                  Path: {currentMaterial.path}
                </div>
              </div>

              {/* Excel QA Display */}
              <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Excel QA Mapping Result:</h3>
                
                {qaData.hasData ? (
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-800 font-medium mb-2">
                      ✓ Excel Match Found ({qaData.source})
                    </div>
                    <div className="space-y-2">
                      <div>
                        <span className="font-semibold">Question:</span> {qaData.question}
                      </div>
                      <div>
                        <span className="font-semibold">Answer:</span> {qaData.answer}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-600 font-medium mb-2">
                      ✗ No Excel Match - Slide Will Be Blank
                    </div>
                    <div className="text-sm text-gray-500">
                      Source: {qaData.source}
                    </div>
                  </div>
                )}
              </div>

              {/* Debug Information */}
              <div className="bg-yellow-50 p-4 rounded-lg text-sm">
                <h4 className="font-semibold mb-2">Debug Information:</h4>
                <div className="space-y-1 text-gray-700">
                  <div>Excel entries loaded: {Object.keys(excelData).length}</div>
                  <div>Current filename: "{currentMaterial.content}"</div>
                  <div>Exact match required for Excel lookup</div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4">
                <Button 
                  onClick={goToPrevious} 
                  disabled={currentIndex === 0}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Previous
                </Button>
                
                <div className="text-sm text-gray-600">
                  {currentIndex + 1} / {testMaterials.length}
                </div>
                
                <Button 
                  onClick={goToNext} 
                  disabled={currentIndex === testMaterials.length - 1}
                  variant="outline"
                  className="flex items-center gap-2"
                >
                  Next
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}