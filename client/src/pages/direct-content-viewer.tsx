import { useEffect, useState, useCallback } from "react";
import { useLocation, useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import ContentSlide from "@/components/ContentSlide";
import ThumbnailsBar from "@/components/ThumbnailsBar";
import { Loader2 } from "lucide-react";
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
  // Get the book and unit parameters from the URL
  const { bookNumber, unitNumber } = useParams();
  
  // Construct the proper paths for S3
  const bookPath = `book${bookNumber}`;
  const unitPath = `unit${unitNumber}`;
  
  // State for carousel management
  const [slidesInView, setSlidesInView] = useState<number[]>([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: false,
    align: "center",
    containScroll: "keepSnaps",
    dragFree: true
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
        console.log("Materials received:", data);
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
        <p>Loading content...</p>
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
        <Button onClick={() => navigate("/")}>Return to Home</Button>
      </div>
    );
  }

  // If no materials are found
  if (!materialsData.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4">No Content Available</h1>
        <p className="mb-6">There is no content available for {unitData.title}.</p>
        <Button onClick={() => navigate("/")}>Return to Home</Button>
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
    <div className="flex flex-col min-h-screen">
      {/* Header with navigation */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              BOOK {bookPath ? bookPath.toUpperCase().replace('BOOK', '') : ''}
            </h1>
            <h2 className="text-lg text-gray-600">
              UNIT {unitPath ? unitPath.replace(/[^\d]/g, '') : ''} - {unitData?.title || ''}
            </h2>
          </div>
          <Button variant="ghost" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow container mx-auto px-4 pb-12 pt-4">
        {/* Carousel wrapper */}
        <div className="overflow-hidden mb-8" ref={emblaRef}>
          <div className="flex">
            {materials.map((material, index) => (
              <div key={index} className="flex-[0_0_100%] min-w-0 pl-4">
                <ContentSlide 
                  material={material}
                  isActive={index === currentSlideIndex}
                  bookId={bookPath || ""}
                  unitNumber={unitPath ? parseInt(unitPath.replace(/[^\d]/g, '') || "0") : 0} 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Thumbnails bar */}
        <ThumbnailsBar
          materials={materials}
          currentIndex={currentSlideIndex}
          onSelectSlide={onThumbnailClick}
          viewedSlides={slidesInView}
        />
      </main>
    </div>
  );
}