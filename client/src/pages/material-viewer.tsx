import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { ArrowLeft, Download, Lock, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

type Material = {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentType: string;
  content: string;
  order: number;
  isLocked: boolean;
};

type Unit = {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description?: string;
};

type Book = {
  id: number;
  bookId: string;
  title: string;
};

export default function MaterialViewer() {
  const [location] = useLocation();
  const matches = location.match(/\/units\/(\d+)\/materials\/(\d+)/);
  const unitId = matches ? parseInt(matches[1], 10) : 0;
  const materialId = matches ? parseInt(matches[2], 10) : 0;
  const [currentSlideIndex, setCurrentSlideIndex] = useState(materialId === 0 ? 0 : -1); // Use -1 when specific material is requested
  const [showSidebar, setShowSidebar] = useState(true);

  // Fetch unit details
  const { data: unit, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/units/${unitId}`],
    enabled: !!unitId,
  });

  // Fetch book details
  const { data: book, isLoading: bookLoading } = useQuery<Book>({
    queryKey: [`/api/books/${unit?.bookId}`],
    enabled: !!unit?.bookId,
  });

  // Fetch materials for unit
  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });

  // Get current material
  const currentMaterial = materials && materials.length > 0 
    ? materials.find((m) => m.id === materialId) || materials[currentSlideIndex] 
    : null;

  // Track viewed slides
  const [viewedSlides, setViewedSlides] = useState<number[]>([]);
  
  useEffect(() => {
    if (currentMaterial && !viewedSlides.includes(currentMaterial.id)) {
      setViewedSlides(prev => [...prev, currentMaterial.id]);
    }
  }, [currentMaterial]);

  // Loading state
  if (unitLoading || bookLoading || materialsLoading) {
    return <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <Skeleton className="h-12 w-3/4 mb-4" />
      <Skeleton className="h-[60vh] w-full mb-4" />
      <Skeleton className="h-24 w-3/4" />
    </div>;
  }

  // No materials state
  if (!materials || materials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="h-16 w-16 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold mb-2">No Slides Available</h1>
          <p className="text-gray-500 mb-4">There are no slides available for this lesson. This might be due to:</p>
          <ul className="text-left text-gray-500 mb-6">
            <li className="flex items-start mb-2">
              <span className="mr-2">•</span>
              <span>Content is still being loaded from storage</span>
            </li>
            <li className="flex items-start mb-2">
              <span className="mr-2">•</span>
              <span>The slides are stored in a different format or location</span>
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              <span>The unit content is not yet available</span>
            </li>
          </ul>
          <Button className="flex items-center gap-2">
            <RefreshCw className="h-4 w-4" />
            Retry Loading Slides
          </Button>
        </div>
        <div className="w-full max-w-3xl">
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Teaching Guidance</h2>
            <p className="text-sm text-gray-500 mb-4">Unit-specific guidance for {book?.title}, Unit {unit?.unitNumber} - {unit?.title}</p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium mb-2">Presenting Questions</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Show the question on the slide and point to any key image details (e.g. facial expressions, actions, background objects).</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Clearly read the question aloud to the class — say it twice to help students process the language.</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Check Vocabulary Understanding</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Refer back to the textbook vocabulary section if available.</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Pause and explain any unfamiliar words using visuals, gestures, or simple definitions.</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Ask Follow-up Questions</h3>
              <p className="text-sm mb-2">To reinforce comprehension:</p>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"Why do you think so?"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"Can you describe it more?"</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>"What else can you see?"</span>
                </li>
              </ul>
              <p className="text-sm italic mt-2">Encourage full-sentence answers — especially with more advanced learners — and guide them toward more complete responses.</p>
            </div>

            <div className="mt-6">
              <h3 className="font-medium mb-2">Prompt Student Answers</h3>
              <p className="text-sm mb-2">Use structured sentence frames:</p>
              <div className="grid gap-y-1 gap-x-6 md:grid-cols-2 text-sm">
                <div>"Is it a cat or a dog?" → "It is a..."</div>
                <div>"Are they sitting or standing?" → "They are..."</div>
                <div>"Is he eating or sleeping?" → "He is..."</div>
                <div>"Is she happy or sad?" → "She is..."</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const totalSlides = materials.length;
  
  // Render content based on content type
  const renderContent = () => {
    if (!currentMaterial) return null;
    
    if (currentMaterial.isLocked) {
      return (
        <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <Lock className="h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-xl font-semibold mb-2">Content Locked</h3>
          <p className="text-gray-500 text-center max-w-md">
            This content is currently locked. Please upgrade your subscription to access all materials.
          </p>
        </div>
      );
    }

    switch (currentMaterial.contentType) {
      case 'IMAGE':
        return (
          <div className="flex items-center justify-center bg-black h-[60vh] rounded-lg overflow-hidden">
            <img
              src={currentMaterial.content}
              alt={currentMaterial.title}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        );
      case 'VIDEO':
        return (
          <div className="h-[60vh] rounded-lg overflow-hidden">
            <video 
              controls 
              className="w-full h-full"
              src={currentMaterial.content}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        );
      case 'PDF':
        return (
          <div className="h-[60vh] rounded-lg overflow-hidden bg-gray-50 flex flex-col items-center justify-center">
            <div className="text-center mb-4">
              <p className="text-gray-500">PDF Document</p>
              <h3 className="text-xl font-semibold">{currentMaterial.title}</h3>
            </div>
            <Button className="flex items-center gap-2" onClick={() => window.open(currentMaterial.content, '_blank')}>
              <Download className="h-4 w-4" />
              Open PDF
            </Button>
          </div>
        );
      case 'GAME':
        return (
          <div className="h-[60vh] rounded-lg overflow-hidden">
            <iframe
              src={currentMaterial.content}
              title={currentMaterial.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-50 rounded-lg">
            <p className="text-gray-500">{currentMaterial.contentType} content</p>
            <h3 className="text-xl font-semibold">{currentMaterial.title}</h3>
            <p className="text-gray-500 mt-2">{currentMaterial.description}</p>
          </div>
        );
    }
  };

  const navigateToSlide = (index: number) => {
    if (index >= 0 && index < materials.length) {
      setCurrentSlideIndex(index);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link href={`/books/${book?.id}/units/${unitId}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Unit
            </Button>
          </Link>
          <h1 className="text-xl font-semibold hidden md:block">
            {book?.title} – {unit?.title}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? 'Hide Sidebar' : 'Show Sidebar'}
          </Button>
        </div>
      </div>

      <div className="block md:hidden mb-4">
        <h1 className="text-xl font-semibold">
          {book?.title} – {unit?.title}
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Main content area */}
        <div className={cn(
          "flex-grow",
          showSidebar ? "md:w-3/4" : "md:w-full"
        )}>
          {/* Slide title and progress */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">
              {currentMaterial?.title}
            </h2>
            <div className="text-sm text-gray-500">
              {currentSlideIndex + 1}/{totalSlides} slides
            </div>
          </div>

          {/* Main Slide Viewer Area */}
          {renderContent()}

          {/* Slide Info & Question Panel */}
          <div className="mt-4 p-4 border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                {currentMaterial?.isLocked ? (
                  <Lock className="h-4 w-4 text-gray-500" />
                ) : (
                  <Check className="h-4 w-4 text-green-500" />
                )}
                <span className="text-sm font-medium">
                  {currentMaterial?.isLocked ? 'Locked Content' : 'Content Available'}
                </span>
              </div>
              {currentMaterial?.contentType === 'PDF' && (
                <Button size="sm" variant="outline" className="flex items-center gap-2"
                  onClick={() => window.open(currentMaterial.content, '_blank')}>
                  <Download className="h-4 w-4" />
                  Download
                </Button>
              )}
            </div>
            <p className="text-sm text-gray-500">{currentMaterial?.description}</p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            <Button
              variant="outline"
              onClick={() => navigateToSlide(currentSlideIndex - 1)}
              disabled={currentSlideIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => navigateToSlide(currentSlideIndex + 1)}
              disabled={currentSlideIndex === totalSlides - 1}
            >
              Next
            </Button>
          </div>
        </div>

        {/* Slide Navigation Sidebar */}
        {showSidebar && (
          <div className="md:w-1/4 bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-4">Slides</h3>
            <ul className="space-y-2">
              {materials.map((material: Material, index: number) => (
                <li key={material.id}>
                  <button
                    onClick={() => navigateToSlide(index)}
                    className={cn(
                      "flex items-center w-full text-left p-2 rounded hover:bg-gray-100 transition",
                      currentSlideIndex === index ? "bg-gray-200" : ""
                    )}
                  >
                    <div className="flex items-center gap-2 w-full">
                      {material.isLocked ? (
                        <Lock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                      ) : viewedSlides.includes(material.id) ? (
                        <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      ) : (
                        <div className="h-4 w-4 border border-gray-300 rounded-full flex-shrink-0" />
                      )}
                      <div className="truncate flex-grow">
                        <span className="text-sm font-medium block truncate">
                          Slide {index + 1}
                        </span>
                        <span className="text-xs text-gray-500 block truncate">
                          {material.contentType}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}