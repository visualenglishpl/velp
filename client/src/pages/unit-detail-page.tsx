import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useRoute } from "wouter";
import { Book, Unit, Material } from "@shared/schema";
import { 
  ArrowLeft, 
  BookOpen, 
  Play, 
  FileText, 
  Video, 
  Image as ImageIcon,
  Gamepad2,
  LockOpen,
  Lock,
  Plus
} from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

export default function UnitDetailPage() {
  const [, params] = useRoute("/units/:unitId");
  const [, setLocation] = useLocation();
  const unitId = params?.unitId ? parseInt(params.unitId) : 0;
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  
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
  
  // Fetch materials
  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: [`/api/units/${unitId}/materials`],
    enabled: !!unitId,
  });

  // Get content type icon
  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'IMAGE':
        return <ImageIcon className="h-5 w-5" />;
      case 'VIDEO':
        return <Video className="h-5 w-5" />;
      case 'PDF':
        return <FileText className="h-5 w-5" />;
      case 'GAME':
        return <Gamepad2 className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  // Loading state
  if (unitLoading || bookLoading || materialsLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center mb-6">
          <Skeleton className="h-10 w-24 mr-4" />
          <Skeleton className="h-8 w-64" />
        </div>
        <Skeleton className="h-40 w-full mb-8" />
        <Skeleton className="h-8 w-40 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full" />
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (!unit || !book) {
    return (
      <div className="container mx-auto py-16 px-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Unit Not Found</h2>
        <p className="text-gray-600 mb-8">We couldn't find the unit you were looking for.</p>
        <Button onClick={() => setLocation("/admin/books")}>Back to Books</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with back button and title */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setLocation(`/admin/books/${unit.bookId}`)}
            className="mr-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Book
          </Button>
          <h1 className="text-2xl font-bold">
            {book.title} - {unit.title}
          </h1>
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={() => setLocation(`/units/${unitId}/materials/0`)}
            className="flex items-center gap-2"
          >
            <Play className="h-4 w-4" />
            Start Lesson
          </Button>
          
          {isAdmin && (
            <Button 
              variant="outline"
              onClick={() => setLocation(`/admin/units/${unitId}/edit`)}
            >
              Edit Unit
            </Button>
          )}
        </div>
      </div>
      
      {/* Unit information card */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Unit Information</h2>
              <p className="text-gray-600 mb-4">
                {unit.description || "No description available for this unit."}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Unit Number</h3>
                  <p className="text-gray-900">{unit.unitNumber}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Book</h3>
                  <p className="text-gray-900">{book.title}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Status</h3>
                  <Badge variant={unit.isPublished ? "success" : "secondary"}>
                    {unit.isPublished ? "Published" : "Draft"}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center">
              {unit.thumbnailUrl ? (
                <img 
                  src={unit.thumbnailUrl} 
                  alt={`Thumbnail for ${unit.title}`}
                  className="max-h-48 object-contain rounded-lg"
                />
              ) : (
                <div className="w-64 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-gray-300" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Materials section */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-xl font-bold">Materials</h2>
        
        {isAdmin && (
          <Button
            size="sm"
            onClick={() => setLocation(`/admin/units/${unitId}/materials/create`)}
            className="flex items-center gap-1"
          >
            <Plus className="h-4 w-4" />
            Add Material
          </Button>
        )}
      </div>
      
      {/* Materials grid */}
      {materials && materials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          {materials.map((material, index) => (
            <Card 
              key={material.id} 
              className={cn(
                "hover:shadow-md transition-shadow overflow-hidden",
                material.isLocked ? "bg-gray-50" : "bg-white"
              )}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className="bg-primary/10 rounded-full p-2 mr-3">
                      {getContentTypeIcon(material.contentType)}
                    </div>
                    <CardTitle className="text-base truncate">
                      {material.title}
                    </CardTitle>
                  </div>
                  <div>
                    {material.isLocked ? (
                      <Lock className="h-4 w-4 text-gray-400" />
                    ) : (
                      <LockOpen className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {material.description || `${material.contentType} content for this unit.`}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <Badge variant="outline" className="text-xs">
                    {material.contentType}
                  </Badge>
                  <span className="text-xs text-gray-500">
                    Slide {index + 1} of {materials.length}
                  </span>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  size="sm" 
                  className="w-full"
                  onClick={() => setLocation(`/units/${unitId}/materials/${index}`)}
                  disabled={material.isLocked}
                >
                  View Content
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Materials Available</h3>
          <p className="text-gray-500 mb-4">
            This unit doesn't have any materials yet. 
            {isAdmin && " You can add materials using the 'Add Material' button."}
          </p>
          {isAdmin && (
            <Button 
              onClick={() => setLocation(`/admin/units/${unitId}/materials/create`)}
              className="flex items-center gap-2 mx-auto"
            >
              <Plus className="h-4 w-4" />
              Add First Material
            </Button>
          )}
        </div>
      )}
      
      {/* Start Lesson button */}
      {materials && materials.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button 
            size="lg"
            onClick={() => setLocation(`/units/${unitId}/materials/0`)}
            className="flex items-center gap-2"
          >
            <Play className="h-5 w-5" />
            Start Lesson
          </Button>
        </div>
      )}
    </div>
  );
}