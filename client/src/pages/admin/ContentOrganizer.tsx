import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Loader2, ChevronLeft, FilePlus, UploadCloud, Save, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import DraggableContentList from "@/components/DraggableContentList";

// Define types for content items
interface ContentItem {
  id: string;
  title: string;
  type: string;
  content: string;
  orderIndex: number;
  thumbnail?: string;
}

interface Unit {
  path: string;
  bookId: string;
  unitNumber: number;
  title: string;
}

const ContentOrganizer: React.FC = () => {
  // Navigation and state management
  const [_, navigate] = useLocation();
  const { toast } = useToast();
  const { user } = useAuth();
  const params = new URLSearchParams(window.location.search);
  const bookId = params.get("bookId");
  const unitNumber = params.get("unitNumber");

  // State for content items
  const [contentItems, setContentItems] = useState<ContentItem[]>([]);
  const [isReordering, setIsReordering] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Path for accessing content
  const bookPath = `book${bookId}`;
  const unitPath = `unit${unitNumber}`;

  // Fetch unit data
  const { data: unitData, error: unitError, isLoading: unitLoading } = useQuery<Unit>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}`],
    enabled: Boolean(bookPath && unitPath)
  });

  // Fetch materials
  const { 
    data: materials, 
    error: materialsError, 
    isLoading: materialsLoading 
  } = useQuery<ContentItem[]>({
    queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`],
    enabled: Boolean(bookPath && unitPath)
  });

  // Set up content items once materials are loaded
  useEffect(() => {
    if (materials) {
      // Transform materials to ContentItem format
      const transformedItems = materials.map((material, index) => ({
        id: material.id.toString(),
        title: material.title || material.content,
        type: material.content.split('.').pop()?.toLowerCase() || 'unknown',
        content: material.content,
        orderIndex: material.orderIndex || index,
        thumbnail: `/api/direct/${bookPath}/${unitPath}/assets/${encodeURIComponent(material.content)}`
      }));

      // Sort by orderIndex
      const sortedItems = [...transformedItems].sort((a, b) => a.orderIndex - b.orderIndex);
      setContentItems(sortedItems);
    }
  }, [materials, bookPath, unitPath]);

  // Handle reordering content
  const handleReorder = (reorderedItems: ContentItem[]) => {
    setContentItems(reorderedItems);
    setIsReordering(true);
  };

  // Save reordered content
  const saveReorderedContentMutation = useMutation({
    mutationFn: async (items: ContentItem[]) => {
      return await apiRequest("POST", `/api/direct/${bookPath}/${unitPath}/reorder`, { items });
    },
    onSuccess: () => {
      toast({
        title: "Content reordered",
        description: "Your content order has been saved successfully.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`] });
      setIsReordering(false);
    },
    onError: (error: Error) => {
      toast({
        title: "Error saving order",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Handle delete dialog
  const handleDeleteClick = (id: string) => {
    setItemToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  // Delete content item
  const deleteContentMutation = useMutation({
    mutationFn: async (id: string) => {
      return await apiRequest("DELETE", `/api/direct/${bookPath}/${unitPath}/material/${id}`);
    },
    onSuccess: () => {
      toast({
        title: "Content deleted",
        description: "The content item has been removed.",
      });
      queryClient.invalidateQueries({ queryKey: [`/api/direct/${bookPath}/${unitPath}/materials`] });
      setIsDeleteDialogOpen(false);
      setItemToDelete(null);
    },
    onError: (error: Error) => {
      toast({
        title: "Error deleting content",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Function to handle delete confirmation
  const confirmDelete = () => {
    if (itemToDelete) {
      deleteContentMutation.mutate(itemToDelete);
    }
  };

  // Function to handle view content
  const handleViewContent = (id: string) => {
    const item = contentItems.find(item => item.id === id);
    if (item) {
      // Content viewer is currently being rebuilt
      toast({
        title: "Content Viewer Unavailable",
        description: "The content viewer is currently being rebuilt from scratch.",
        variant: "destructive"
      });
      // Return to the units page instead
      // navigate(`/book${bookId}/units`);
    }
  };

  // Handle saving reordered content
  const saveReorderedContent = () => {
    saveReorderedContentMutation.mutate(contentItems);
  };

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
  if (unitError || materialsError || !unitData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center max-w-xl mx-auto px-4">
        <h1 className="text-2xl font-bold mb-4 text-red-600">Content Not Available</h1>
        <p className="mb-4">We couldn't load the content for this unit.</p>
        <Button onClick={() => navigate("/admin/books")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button variant="outline" onClick={() => navigate(`/book${bookId}/units`)}>
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Units
          </Button>
          <h1 className="text-2xl font-bold mt-4">{unitData.title}</h1>
          <p className="text-gray-500">Content Organizer • Book {bookId} • Unit {unitNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <FilePlus className="mr-2 h-4 w-4" />
            Add Material
          </Button>
          <Button>
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Files
          </Button>
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Content Organization</CardTitle>
          <CardDescription>
            Drag and drop items to reorder them. Changes won't be saved until you click "Save Order".
          </CardDescription>
        </CardHeader>
        <CardContent>
          {contentItems.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No content items available for this unit.</p>
              <Button className="mt-4" variant="outline">
                <FilePlus className="mr-2 h-4 w-4" />
                Add Material
              </Button>
            </div>
          ) : (
            <DraggableContentList
              items={contentItems}
              onReorder={handleReorder}
              onDelete={handleDeleteClick}
              onView={handleViewContent}
            />
          )}
        </CardContent>
        {contentItems.length > 0 && (
          <CardFooter className="flex justify-end">
            <Button
              onClick={saveReorderedContent}
              disabled={!isReordering || saveReorderedContentMutation.isPending}
              className="flex items-center"
            >
              {saveReorderedContentMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Order
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Delete confirmation dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Content Item</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this content item? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleteContentMutation.isPending}
            >
              {deleteContentMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Trash2 className="mr-2 h-4 w-4" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ContentOrganizer;