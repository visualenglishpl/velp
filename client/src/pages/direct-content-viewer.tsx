import { useEffect, useState, useCallback } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import ContentSlide from "@/components/ContentSlide";
import ThumbnailsBar from "@/components/ThumbnailsBar";
import { Loader2, ChevronLeft, ChevronRight, Book, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

// Direct material type from the new S3 direct paths
type DirectMaterial = {
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

// Simple unit type for direct access
type DirectUnit = {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
};

export default function DirectContentViewer() {
  // Get the path from the URL directly - more reliable than useParams
  const [location] = useLocation();
  const pathParts = location.split('/').filter(Boolean);
  
  // Extract bookPath and unitPath from URL
  const bookPath = pathParts[0]; // e.g., "book3"
  const unitPath = pathParts[1]; // e.g., "unit12"
  
  console.log(`Direct Content Viewer: Book path=${bookPath}, Unit path=${unitPath}`);
  
  // Extract unit number for API calls
  const unitNumber = unitPath ? parseInt(unitPath.replace(/\D/g, '')) : 0;
  
  // State for carousel management
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "keepSnaps",
    dragFree: false
  });

  // Navigate hook for routing
  const [_, navigate] = useLocation();

  // Handle a user selecting a slide from the thumbnails bar
  const onThumbnailClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  // Navigate to next or previous slide
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Track which slides have been viewed
  useEffect(() => {
    if (!emblaApi) return;
    
    const onSelect = () => {
      const currentSlide = emblaApi.selectedScrollSnap();
      setCurrentSlideIndex(currentSlide);
      
      // Add current slide to viewed slides
      setSlidesInView((prev) => {
        if (prev.includes(currentSlide)) return prev;
        return [...prev, currentSlide];
      });
    };

    emblaApi.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Use more robust custom queries with better error handling
  const { data: unitData, error: unitError, isLoading: unitLoading } = useQuery<DirectUnit>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: !!bookPath && !!unitPath,
    queryFn: async () => {
      console.log(`Fetching unit data from: /api/direct/${bookPath}/${unitPath}`);
      const res = await fetch(`/api/direct/${bookPath}/${unitPath}`);
      
      if (!res.ok) {
        console.error(`Failed to load unit: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to load unit: ${res.status}`);
      }
      
      try {
        const data = await res.json();
        console.log("Unit data received:", data);
        return data;
      } catch (err) {
        console.error("Invalid JSON in unit response:", err);
        throw new Error("Invalid response format");
      }
    }
  });

  // Query for direct materials data with improved error handling
  const { data: materialsData, error: materialsError, isLoading: materialsLoading } = useQuery<DirectMaterial[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: !!bookPath && !!unitPath,
    queryFn: async () => {
      console.log(`Fetching materials from: /api/direct/${bookPath}/${unitPath}/materials`);
      const res = await fetch(`/api/direct/${bookPath}/${unitPath}/materials`);
      
      if (!res.ok) {
        console.error(`Failed to load materials: ${res.status} ${res.statusText}`);
        throw new Error(`Failed to load materials: ${res.status}`);
      }
      
      try {
        const data = await res.json();
        console.log(`Materials received: ${data.length} items`);
        return data;
      } catch (err) {
        console.error("Invalid JSON in materials response:", err);
        throw new Error("Invalid response format");
      }
    }
  });

  // Loading state
  if (unitLoading || materialsLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin mb-4" />
        <p>Loading content from {bookPath}/{unitPath}...</p>
      </div>
    );
  }

  // Error state
  if (unitError || materialsError || !unitData || !materialsData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Content Not Available</h1>
        <p className="mb-4">We couldn't load the content for this unit. This could be because:</p>
        <ul className="list-disc text-left mb-6">
          <li className="ml-8 mb-2">The path is incorrect</li>
          <li className="ml-8 mb-2">You don't have access to this content</li>
          <li className="ml-8 mb-2">There was a connection issue</li>
        </ul>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    );
  }

  // If no materials are found
  if (!materialsData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-6">There is no content available for {unitData.title}.</p>
        <div className="flex gap-4">
          <Button onClick={() => navigate("/admin/books")}>
            <Book className="mr-2 h-4 w-4" />
            Books
          </Button>
          <Button onClick={() => navigate("/")} variant="outline">
            <Home className="mr-2 h-4 w-4" />
            Home
          </Button>
        </div>
      </div>
    );
  }

  // Convert materials for our components
  const materials = materialsData?.map((material: DirectMaterial) => ({
    ...material,
    // For ContentSlide component compatibility
    unitId: 0, // Not needed for direct access
  })) || [];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <div>
            <h1 className="text-2xl font-bold uppercase">
              Book {bookPath ? bookPath.replace(/[^\d]/g, '') : ''}
            </h1>
            <h2 className="text-lg text-gray-600 uppercase">
              Unit {unitPath ? unitPath.replace(/[^\d]/g, '') : ''} {unitData?.title ? `- ${unitData.title}` : ''}
            </h2>
            <p className="text-sm text-gray-500">
              Slide {currentSlideIndex + 1} of {materials.length}
            </p>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => navigate("/admin/books")} variant="outline" size="sm">
              <Book className="mr-2 h-4 w-4" />
              Books List
            </Button>
            <Button onClick={() => navigate("/")} variant="ghost" size="sm">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pb-12 pt-4">
        {/* Carousel wrapper */}
        <div className="relative bg-white shadow rounded-lg overflow-hidden mb-8">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {materials.map((material, index) => (
                <div key={index} className="flex-[0_0_100%] min-w-0">
                  <ContentSlide 
                    material={material}
                    isActive={index === currentSlideIndex}
                    bookId={bookPath || ""}
                    unitNumber={unitNumber} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Navigation controls */}
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 p-4">
            <Button 
              onClick={scrollPrev} 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-md"
              disabled={currentSlideIndex === 0}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 p-4">
            <Button 
              onClick={scrollNext} 
              variant="secondary" 
              size="icon" 
              className="rounded-full shadow-md"
              disabled={currentSlideIndex === materials.length - 1}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Thumbnails bar */}
        <div className="bg-white shadow rounded-lg p-4">
          <ThumbnailsBar
            materials={materials}
            currentIndex={currentSlideIndex}
            onSelectSlide={onThumbnailClick}
            viewedSlides={slidesInView}
          />
        </div>
      </main>
    </div>
  );
}