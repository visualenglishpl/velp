import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Video, Gamepad2, FileText, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { 
  DndContext, 
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  UniqueIdentifier
} from '@dnd-kit/core';
import { 
  SortableContext, 
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';

interface TeacherResource {
  id?: number;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'activity' | 'pdf' | 'other';
  embedCode: string;
  provider?: string;
  sourceUrl?: string;
  order: number;
}

interface TeacherResourcesProps {
  bookId?: string;
  unitId?: string;
  isEditMode?: boolean;
}

// Main TeacherResources component
const TeacherResources: React.FC<TeacherResourcesProps> = ({ 
  bookId, 
  unitId, 
  isEditMode = false 
}) => {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [newResource, setNewResource] = useState<Partial<TeacherResource>>({
    resourceType: 'video',
    title: '',
    embedCode: '',
    provider: '',
    sourceUrl: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<number | null>(null);
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  const [activeResourceType, setActiveResourceType] = useState<string>('video');
  const { toast } = useToast();
  
  // Set up DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor)
  );

  // Function to save resources to the server
  const saveResourcesToServer = async (resourcesToSave: TeacherResource[]) => {
    if (!bookId || !unitId || resourcesToSave.length === 0) return;
    
    try {
      await apiRequest('POST', `/api/direct/${bookId}/${unitId}/resources`, { resources: resourcesToSave });
      toast({
        title: "Resources Saved",
        description: "Teacher resources have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error Saving Resources",
        description: "There was an error saving teacher resources.",
        variant: "destructive",
      });
      console.error("Error saving teacher resources:", error);
    }
  };

  // Fetch resources from the server
  const fetchResources = async () => {
    if (!bookId || !unitId) return;
    
    try {
      const response = await apiRequest('GET', `/api/direct/${bookId}/${unitId}/resources`);
      const data = await response.json();
      // Check if the data structure has a resources property
      const resourcesData = data.resources || data;
      setResources(Array.isArray(resourcesData) ? resourcesData : []);
    } catch (error) {
      console.error("Error fetching teacher resources:", error);
    }
  };

  // Handle state for editing a resource
  const handleEditResource = (index: number) => {
    setEditingResource(index);
  };

  // Handle canceling an edit
  const handleCancelEdit = () => {
    setEditingResource(null);
    fetchResources(); // Reload resources to discard changes
  };

  // Handle updating a resource
  const handleUpdateResource = (index: number) => {
    const resourceToUpdate = resources[index];
    
    // Validate required fields
    if (!resourceToUpdate.title || !resourceToUpdate.embedCode) {
      toast({
        title: "Missing Information",
        description: "Title and embed code are required.",
        variant: "destructive",
      });
      return;
    }
    
    setEditingResource(null);
    saveResourcesToServer(resources);
    
    toast({
      title: "Resource Updated",
      description: "The resource has been updated successfully.",
    });
  };

  // Handle deleting a resource with confirmation
  const handleDeleteResource = (index: number) => {
    if (window.confirm(`Are you sure you want to delete "${resources[index].title}"?`)) {
      const resourcesAfterDelete = resources.filter((_, i) => i !== index);
      
      // Update order on remaining resources
      const reorderedResources = resourcesAfterDelete.map((res, idx) => ({
        ...res,
        order: idx
      }));
      
      setResources(reorderedResources);
      saveResourcesToServer(reorderedResources);
      
      toast({
        title: "Resource Deleted",
        description: "The resource has been deleted successfully.",
      });
    }
  };

  // Handle changes to resource fields during editing
  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedResources = [...resources];
    (updatedResources[index] as any)[field] = value;
    setResources(updatedResources);
  };
  
  // Handle changes to new resource fields
  const handleNewResourceChange = (field: string, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle adding a new resource
  const handleAddResource = () => {
    if (!bookId || !unitId) {
      toast({
        title: "Error Adding Resource",
        description: "Book ID and Unit ID are required.",
        variant: "destructive",
      });
      return;
    }
    
    // Validate required fields
    if (!newResource.title || !newResource.embedCode) {
      toast({
        title: "Missing Information",
        description: "Please provide a title and embed code for the resource.",
        variant: "destructive",
      });
      return;
    }
    
    // Create the complete resource object
    const completeResource: TeacherResource = {
      bookId: bookId,
      unitId: unitId,
      title: newResource.title || '',
      resourceType: newResource.resourceType as 'video' | 'game' | 'activity' | 'pdf' | 'other',
      embedCode: newResource.embedCode || '',
      provider: newResource.provider || '',
      sourceUrl: newResource.sourceUrl || '',
      order: resources.length  // Add at the end
    };
    
    // Add the new resource to the list
    const updatedResources = [...resources, completeResource];
    setResources(updatedResources);
    
    // Save to server
    saveResourcesToServer(updatedResources);
    
    // Reset the form and close dialog
    setNewResource({
      resourceType: 'video',
      title: '',
      embedCode: '',
      provider: '',
      sourceUrl: ''
    });
    setIsAdding(false);
    
    toast({
      title: "Resource Added",
      description: "The new resource has been added successfully.",
    });
  };
  
  // Drag and Drop handlers
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    setActiveId(active.id);
    
    // Find the resource type of the dragged item
    const draggedResource = resources.find(r => 
      (r.id && r.id.toString() === active.id.toString()) || 
      (resources.indexOf(r).toString() === active.id.toString())
    );
    
    if (draggedResource) {
      setActiveResourceType(draggedResource.resourceType);
    }
  };
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      // Get the filtered resources of the current type to determine correct indices
      const filteredResources = resources.filter(r => r.resourceType === activeResourceType);
      
      // Find the source and destination indices in the filtered list
      const activeIndex = filteredResources.findIndex(r => 
        (r.id && r.id.toString() === active.id.toString()) || 
        (filteredResources.indexOf(r).toString() === active.id.toString())
      );
      
      const overIndex = filteredResources.findIndex(r => 
        (r.id && r.id.toString() === over.id.toString()) || 
        (filteredResources.indexOf(r).toString() === over.id.toString())
      );
      
      if (activeIndex !== -1 && overIndex !== -1) {
        // Create a new array of filtered resources with the item moved
        const newFilteredOrder = [...filteredResources];
        const [movedItem] = newFilteredOrder.splice(activeIndex, 1);
        newFilteredOrder.splice(overIndex, 0, movedItem);
        
        // Create a new resources array with updated order
        const newResources = [...resources];
        
        // Find the indices of the filtered resources in the full resources array
        // and update their order
        newFilteredOrder.forEach((resource, index) => {
          const resourceIndex = newResources.findIndex(r => 
            (r.id && r.id === resource.id) || 
            (r === resource)
          );
          if (resourceIndex !== -1) {
            newResources[resourceIndex].order = index;
          }
        });
        
        // Update the resources state
        setResources(newResources);
        
        // Save the updated order to the server
        saveResourcesToServer(newResources);
        
        toast({
          title: "Resources Reordered",
          description: "Resource order has been updated successfully.",
        });
      }
    }
    
    // Reset active states
    setActiveId(null);
  };

  // Initial load of resources
  useEffect(() => {
    if (bookId && unitId) {
      fetchResources();
      
      // This ensures synchronization between admin and teacher pages
      const intervalId = setInterval(fetchResources, 5000);
      
      // Clean up interval on unmount or when bookId/unitId changes
      return () => clearInterval(intervalId);
    }
  }, [bookId, unitId]);
  
  // Add pre-defined resources for Book units
  useEffect(() => {
    if (resources.length === 0 && bookId && unitId) {
      let predefinedResources: TeacherResource[] = [];
      
      // Book 1 - Add special resources for Unit 1
      if (bookId === "1" && unitId === "1") {
        predefinedResources = [
          {
            bookId: "1",
            unitId: "1",
            title: "Hello Song for Kids - Super Simple Songs",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/_x5KQBtLcJI?si=qdTrTvpAGWxn-pTk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Hello! - Super Simple Songs",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/tVlcKp3bWH8?si=DZLTajD2AH9JfcpC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 1,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Greeting Words - Wordwall Game",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/2e7d4bdbcc23420689c5274d1df5a6af?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 2,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Online Games and Links for Unit 1",
            resourceType: "pdf" as "video" | "game" | "activity" | "pdf" | "other",
            embedCode: '<iframe src="https://docs.google.com/viewer?url=https://github.com/replit/replit.github.io/raw/master/media/linki-do-filmy-i-gry.pdf&embedded=true" width="100%" height="500px" frameborder="0"></iframe>',
            order: 3,
            provider: "Visual English"
          }
        ];
      }
      
      // Book 1 - Unit 2 (School Objects)
      if (bookId === "1" && unitId === "2") {
        predefinedResources = [
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Vocabulary - English Tree TV",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/1GDCiMbAZSI?si=tPtYXHVrFMZF5KaQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Song - English Sing Sing",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/RlE4WYPqRqo?si=R7Ib4oZoFf4YosMX" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 1,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "What's in My Pencil Case - Sing and Learn",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/S8KOHEFUoTs?si=Fcs8XNnYdqg0LDbO" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 2,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Matching Game",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/8eed2c82e2ac4ca4a70b0da6b79a1ced?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 3,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Supplies Quiz",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/56bb24a7e71d47bab3382f94cf2ec1eb?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 4,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "School Objects Lesson Plan",
            resourceType: "pdf",
            embedCode: '<iframe src="https://drive.google.com/file/d/1Gdb7Y_wUb0uSEaW7BwS09dFU7K0J1HKK/preview" width="640" height="480" allow="autoplay"></iframe>',
            order: 5,
            provider: "Google Drive"
          },
          {
            bookId: "1",
            unitId: "2",
            title: "Linki Do Filmy I Gry (Links to Films and Games)",
            resourceType: "pdf",
            embedCode: '<object data="/api/direct/files/1/2/linki-do-filmy-i-gry" type="application/pdf" width="100%" height="500px"><p>Your browser does not support PDFs. <a href="/api/direct/files/1/2/linki-do-filmy-i-gry">Download the PDF</a> instead.</p></object>',
            order: 6,
            provider: "Visual English"
          }
        ];
      }
      
      // Book 1 - Unit 3
      if (bookId === "1" && unitId === "3") {
        // Add a special resource for Unit 3 links to films and games
        const unitResources: TeacherResource[] = [
          {
            bookId: "1",
            unitId: "3",
            title: "Rooms of the House - Song by Planet Pop",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/FgWyY-RCaWk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "3",
            title: "Rooms of the House - Learn English with Steve",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/qJyW4dBh0Fc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 1,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "3",
            title: "Rooms in the House - Wordwall Game",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/b4f8d2af8aa947a19d2d75f74f2e5ef3?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 2,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "3",
            title: "Linki Do Filmy I Gry (Links to Films and Games)",
            resourceType: "pdf",
            embedCode: '<object data="/api/direct/files/1/3/linki-do-filmy-i-gry" type="application/pdf" width="100%" height="500px"><p>Your browser does not support PDFs. <a href="/api/direct/files/1/3/linki-do-filmy-i-gry">Download the PDF</a> instead.</p></object>',
            order: 3,
            provider: "Visual English"
          }
        ];
        predefinedResources = unitResources;
      }
      
      // Book 1 - Unit 4
      if (bookId === "1" && unitId === "4") {
        // Add a special resource for Unit 4 links to films and games
        const unitResources: TeacherResource[] = [
          {
            bookId: "1",
            unitId: "4",
            title: "Parts of the Face - English Singsing",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/K4DGm8gkM-A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "4",
            title: "Body Parts Matching Game",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/a6474c6c32a545e5b69a6c0573a6d66d?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 1,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "4",
            title: "Linki Do Filmy I Gry (Links to Films and Games)",
            resourceType: "pdf",
            embedCode: '<object data="/api/direct/files/1/4/linki-do-filmy-i-gry" type="application/pdf" width="100%" height="500px"><p>Your browser does not support PDFs. <a href="/api/direct/files/1/4/linki-do-filmy-i-gry">Download the PDF</a> instead.</p></object>',
            order: 2,
            provider: "Visual English"
          }
        ];
        predefinedResources = unitResources;
      }
      
      // Book 1 - Unit 5
      if (bookId === "1" && unitId === "5") {
        // Add a special resource for Unit 5 links to films and games
        const unitResources: TeacherResource[] = [
          {
            bookId: "1",
            unitId: "5",
            title: "Shapes Song - Super Simple Songs",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/tRNy2i75tCc" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "5",
            title: "2D Shapes Game - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/9a85b0e7dff745a2bd8c6f29da06f3d5?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 1,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "5",
            title: "Linki Do Filmy I Gry (Links to Films and Games)",
            resourceType: "pdf",
            embedCode: '<object data="/api/direct/files/1/5/linki-do-filmy-i-gry" type="application/pdf" width="100%" height="500px"><p>Your browser does not support PDFs. <a href="/api/direct/files/1/5/linki-do-filmy-i-gry">Download the PDF</a> instead.</p></object>',
            order: 2,
            provider: "Visual English"
          }
        ];
        predefinedResources = unitResources;
      }
      
      // Book 4 - Unit 1 (Nationalities)
      if (bookId === "4" && unitId === "1") {
        // Add resources for Book 4 Unit 1
        const unitResources: TeacherResource[] = [
          {
            bookId: "4",
            unitId: "1",
            title: "Countries and Nationalities - English with Lucy",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/i6G53BMgugo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "4",
            unitId: "1",
            title: "Countries and Nationalities Quiz - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/4df2de3c3c7d4b87910d4178d48c96cd?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 1,
            provider: "Wordwall"
          },
          {
            bookId: "4",
            unitId: "1",
            title: "Flags and Countries Matching - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/82ce5c3f9c484aa2b9c9e1a4a25e0be7?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 2,
            provider: "Wordwall"
          },
          {
            bookId: "4",
            unitId: "1",
            title: "Nationalities - Lesson Plan",
            resourceType: "pdf",
            embedCode: '<iframe src="https://docs.google.com/viewer?url=https://github.com/replit/replit.github.io/raw/master/media/nationalities-lesson-plan.pdf&embedded=true" width="100%" height="500px" frameborder="0"></iframe>',
            order: 3,
            provider: "Visual English"
          }
        ];
        predefinedResources = unitResources;
      }
      
      // Add the predefined resources
      if (predefinedResources.length > 0) {
        setResources(predefinedResources);
        saveResourcesToServer(predefinedResources);
      }
    }
  }, [resources.length, bookId, unitId]);

  return (
    <div className="teacher-resources p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Teacher Resources</h2>
        
        {isEditMode && (
          <Button onClick={() => setIsAdding(true)} variant="default">
            <Plus className="h-4 w-4 mr-1" /> Add Resource
          </Button>
        )}
      </div>
      
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Teacher Resource</DialogTitle>
            <DialogDescription>
              {newResource.resourceType === 'video' ? 
                "Add a YouTube video to help students learn. Copy the embed code from YouTube's share > embed option." :
               newResource.resourceType === 'game' ? 
                "Add a Wordwall game or other interactive activity. Copy the embed code from the game's share options." :
                "Add a new resource to this unit."}
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="title" className="text-right font-medium">
                Title
              </label>
              <Input
                id="title"
                value={newResource.title || ''}
                onChange={(e) => handleNewResourceChange('title', e.target.value)}
                className="col-span-3"
                placeholder="Enter a descriptive title"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="resourceType" className="text-right font-medium">
                Type
              </label>
              <select
                id="resourceType"
                value={newResource.resourceType}
                onChange={(e) => handleNewResourceChange('resourceType', e.target.value)}
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="video">Video</option>
                <option value="game">Game</option>
                <option value="activity">Activity</option>
                <option value="pdf">PDF</option>
                <option value="other">Other</option>
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="provider" className="text-right font-medium">
                Provider
              </label>
              <Input
                id="provider"
                value={newResource.provider || ''}
                onChange={(e) => handleNewResourceChange('provider', e.target.value)}
                className="col-span-3"
                placeholder="e.g., YouTube, Wordwall, etc."
              />
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="embedCode" className="text-right font-medium">
                Embed Code
              </label>
              <div className="col-span-3">
                <textarea
                  id="embedCode"
                  value={newResource.embedCode || ''}
                  onChange={(e) => handleNewResourceChange('embedCode', e.target.value)}
                  rows={6}
                  className="w-full rounded-md border border-input bg-background p-2 text-sm"
                  placeholder={newResource.resourceType === 'video' ? 
                    '<iframe width="560" height="315" src="https://www.youtube.com/embed/..." frameborder="0" allowfullscreen></iframe>' : 
                    newResource.resourceType === 'game' ? 
                    '<iframe style="max-width:100%" src="https://wordwall.net/embed/..." width="500" height="380" frameborder="0" allowfullscreen></iframe>' :
                    'Paste embed code here...'}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Paste the embed HTML code from the source website.
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddResource}
              disabled={!newResource.title || !newResource.embedCode}
            >
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {resources.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">No teacher resources available for this unit yet.</p>
          {isEditMode && (
            <Button 
              onClick={() => setIsAdding(true)} 
              variant="outline" 
              className="mt-4"
            >
              <Plus className="h-4 w-4 mr-1" /> Add Your First Resource
            </Button>
          )}
        </div>
      ) : (
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="games">Games</TabsTrigger>
            <TabsTrigger value="pdf">Lesson PDFs</TabsTrigger>
            <TabsTrigger value="activity">Lesson Plans</TabsTrigger>
          </TabsList>
          
          <TabsContent value="videos">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                setActiveResourceType('video');
                handleDragStart(event);
              }}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext 
                items={resources
                  .filter(r => r.resourceType === 'video')
                  .map((r, idx) => r.id?.toString() || `video-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter(r => r.resourceType === 'video')
                    .map((resource, index) => (
                      <SortableResourceItem
                        key={resource.id?.toString() || `video-${index}`}
                        id={resource.id?.toString() || `video-${index}`}
                        resource={resource}
                        index={resources.indexOf(resource)}
                        isEditing={editingResource === resources.indexOf(resource)}
                        isEditMode={isEditMode}
                        onEdit={() => handleEditResource(resources.indexOf(resource))}
                        onCancelEdit={handleCancelEdit}
                        onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                        onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                        onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
          
          <TabsContent value="games">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                setActiveResourceType('game');
                handleDragStart(event);
              }}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext 
                items={resources
                  .filter(r => r.resourceType === 'game')
                  .map((r, idx) => r.id?.toString() || `game-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter(r => r.resourceType === 'game')
                    .map((resource, index) => (
                      <SortableResourceItem
                        key={resource.id?.toString() || `game-${index}`}
                        id={resource.id?.toString() || `game-${index}`}
                        resource={resource}
                        index={resources.indexOf(resource)}
                        isEditing={editingResource === resources.indexOf(resource)}
                        isEditMode={isEditMode}
                        onEdit={() => handleEditResource(resources.indexOf(resource))}
                        onCancelEdit={handleCancelEdit}
                        onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                        onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                        onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
          
          <TabsContent value="pdf">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                setActiveResourceType('pdf');
                handleDragStart(event);
              }}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext 
                items={resources
                  .filter(r => r.resourceType === 'pdf')
                  .map((r, idx) => r.id?.toString() || `pdf-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter(r => r.resourceType === 'pdf')
                    .map((resource, index) => (
                      <SortableResourceItem
                        key={resource.id?.toString() || `pdf-${index}`}
                        id={resource.id?.toString() || `pdf-${index}`}
                        resource={resource}
                        index={resources.indexOf(resource)}
                        isEditing={editingResource === resources.indexOf(resource)}
                        isEditMode={isEditMode}
                        onEdit={() => handleEditResource(resources.indexOf(resource))}
                        onCancelEdit={handleCancelEdit}
                        onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                        onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                        onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
          
          <TabsContent value="activity">
            <DndContext 
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={(event) => {
                setActiveResourceType('activity');
                handleDragStart(event);
              }}
              onDragEnd={handleDragEnd}
              modifiers={[restrictToVerticalAxis]}
            >
              <SortableContext 
                items={resources
                  .filter(r => r.resourceType === 'activity')
                  .map((r, idx) => r.id?.toString() || `activity-${idx}`)}
                strategy={verticalListSortingStrategy}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {resources
                    .filter(r => r.resourceType === 'activity')
                    .map((resource, index) => (
                      <SortableResourceItem
                        key={resource.id?.toString() || `activity-${index}`}
                        id={resource.id?.toString() || `activity-${index}`}
                        resource={resource}
                        index={resources.indexOf(resource)}
                        isEditing={editingResource === resources.indexOf(resource)}
                        isEditMode={isEditMode}
                        onEdit={() => handleEditResource(resources.indexOf(resource))}
                        onCancelEdit={handleCancelEdit}
                        onUpdate={() => handleUpdateResource(resources.indexOf(resource))}
                        onDelete={() => handleDeleteResource(resources.indexOf(resource))}
                        onChange={(field, value) => handleFieldChange(resources.indexOf(resource), field, value)}
                      />
                    ))}
                </div>
              </SortableContext>
            </DndContext>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

interface ResourceItemProps {
  resource: TeacherResource;
  index: number;
  isEditing: boolean;
  isEditMode: boolean;
  onEdit: () => void;
  onCancelEdit: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onChange: (field: string, value: string) => void;
  dragHandle?: {
    attributes: any;
    listeners: any;
  };
  isDragging?: boolean;
}

// Create a sortable wrapper component for ResourceItem
interface SortableResourceItemProps extends ResourceItemProps {
  id: UniqueIdentifier;
}

const SortableResourceItem: React.FC<SortableResourceItemProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props.id });

  const style = {
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    transition,
    opacity: isDragging ? 0.5 : 1,
    position: 'relative' as const,
    zIndex: isDragging ? 1 : 0,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ResourceItem 
        {...props} 
        dragHandle={{ attributes, listeners }}
        isDragging={isDragging}
      />
    </div>
  );
}

const ResourceItem: React.FC<ResourceItemProps> = ({
  resource,
  index,
  isEditing,
  isEditMode,
  onEdit,
  onCancelEdit,
  onUpdate,
  onDelete,
  onChange,
  dragHandle,
  isDragging
}) => {
  // Render icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'activity':
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className={`resource-item border rounded-lg p-4 bg-white ${isDragging ? 'ring-2 ring-primary shadow-md' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
          {isEditMode && dragHandle && (
            <button
              className="cursor-grab hover:bg-gray-100 rounded p-1 mr-2"
              {...dragHandle.attributes}
              {...dragHandle.listeners}
              type="button"
            >
              <GripVertical className="h-4 w-4 text-gray-400" />
            </button>
          )}
          <div className="mr-2 text-primary">
            {getResourceIcon(resource.resourceType)}
          </div>
          {isEditing ? (
            <Input 
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="font-medium"
            />
          ) : (
            <h3 className="font-medium">{resource.title}</h3>
          )}
        </div>
        
        {isEditMode && (
          <div className="flex space-x-2">
            {isEditing ? (
              <>
                <Button size="sm" variant="outline" onClick={onCancelEdit}>
                  <X className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="default" onClick={onUpdate}>
                  <Save className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" variant="outline" onClick={onEdit}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="destructive" onClick={onDelete}>
                  <Trash className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        )}
      </div>
      
      <Separator className="my-2" />
      
      {isEditing ? (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-1">Resource Type</label>
            <select 
              value={resource.resourceType}
              onChange={(e) => onChange('resourceType', e.target.value)}
              className="w-full border rounded p-2"
            >
              <option value="video">Video</option>
              <option value="game">Game</option>
              <option value="activity">Activity</option>
              <option value="pdf">PDF</option>
              <option value="other">Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <Input 
              value={resource.provider || ''}
              onChange={(e) => onChange('provider', e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Embed Code / HTML</label>
            <textarea 
              rows={5}
              className="w-full border rounded p-2"
              value={resource.embedCode}
              onChange={(e) => onChange('embedCode', e.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className={`media-wrapper ${resource.resourceType === 'pdf' ? 'grid md:grid-cols-2 gap-4' : ''}`}>
          {resource.resourceType === 'pdf' ? (
            <>
              <div className="lesson-content-sidebar">
                <h4 className="font-medium text-blue-700 mb-2">Lesson Plan</h4>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-medium mb-2">Unit Overview</h5>
                  <p className="text-sm mb-4">This unit covers key concepts and vocabulary that students will need to master before moving forward.</p>
                  
                  <h5 className="font-medium mb-2">Learning Objectives</h5>
                  <ul className="list-disc pl-5 text-sm mb-4">
                    <li>Understand and use the target vocabulary</li>
                    <li>Practice pronunciation through activities</li>
                    <li>Engage with interactive materials</li>
                  </ul>
                  
                  <h5 className="font-medium mb-2">Key Vocabulary</h5>
                  <p className="text-sm mb-4">Review the vocabulary words highlighted in the PDF before class.</p>
                  
                  <h5 className="font-medium mb-2">Teaching Tips</h5>
                  <p className="text-sm">Use the PDF material alongside the interactive exercises for maximum comprehension.</p>
                </div>
              </div>
              <div className="pdf-viewer overflow-hidden rounded-lg border shadow-sm">
                <div 
                  className="media-embed h-full"
                  dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                />
              </div>
            </>
          ) : (
            <div 
              className="media-embed"
              dangerouslySetInnerHTML={{ __html: resource.embedCode }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TeacherResources;