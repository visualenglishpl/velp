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
  resourceType: 'video' | 'game' | 'activity' | 'pdf' | 'lesson' | 'other';
  embedCode: string;
  provider?: string;
  sourceUrl?: string;
  order: number;
  fileUrl?: string;
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
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
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
      resourceType: newResource.resourceType as 'video' | 'game' | 'activity' | 'pdf' | 'lesson' | 'other',
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

  // Function to fetch PDF resources from S3 for the current book/unit
  const fetchAutomaticPdfResources = async (bookNumber: string, unitNumber: string) => {
    try {
      console.log(`Checking for automatic PDF resources for book ${bookNumber}, unit ${unitNumber}...`);
      
      // Array to hold any PDF resources found
      const pdfResources: TeacherResource[] = [];
      
      // Use the new endpoint to get a list of all available PDFs
      const response = await fetch(`/api/direct/${bookNumber}/${unitNumber}/pdf-resources`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`Found ${data.resources.length} PDF resources in S3:`, data.resources);
        
        if (data.success && data.resources && data.resources.length > 0) {
          // Process each found resource
          data.resources.forEach((resource: any, index: number) => {
            // Extract file name from key
            const fileName = resource.fileName || resource.key.split('/').pop() || 'PDF Resource';
            
            // Determine resource title based on file name pattern
            let title = fileName;
            const lowerFileName = fileName.toLowerCase();
            
            if (lowerFileName.includes('linki do filmy') || lowerFileName.includes('online games')) {
              title = `Online Games and Film Links: Unit ${unitNumber}`;
            } else if (lowerFileName.includes('book') && lowerFileName.includes('unit')) {
              title = `Curriculum: Book ${bookNumber} – Unit ${unitNumber}`;
            }
            
            // Add to resources list
            if (resource.url) {
              pdfResources.push({
                bookId: bookNumber,
                unitId: unitNumber,
                title: title,
                resourceType: 'pdf',
                embedCode: `<object data="${resource.url}" type="application/pdf" width="100%" height="600px"><p>Unable to display PDF file. <a href="${resource.url}" target="_blank">Download</a> instead.</p></object>`,
                order: index,
                provider: 'Visual English'
              });
            }
          });
        }
      } else {
        // Try the old methods as fallback if the new endpoint fails
        console.log('Using fallback methods to find PDF resources');
        
        // Check for curriculum PDF
        try {
          // Construct the URL for curriculum PDF
          const curriculumUrl = `/api/direct/book${bookNumber}/unit${unitNumber}/file?path=book${bookNumber}/unit${unitNumber}/00 A Book ${bookNumber} – Unit ${unitNumber} – New Version.pdf`;
          
          // Check if it exists by making a HEAD request
          const response = await fetch(curriculumUrl, { method: 'HEAD' });
          
          if (response.ok) {
            console.log(`Found curriculum PDF for book ${bookNumber}, unit ${unitNumber}`);
            pdfResources.push({
              bookId: bookNumber,
              unitId: unitNumber,
              title: `Curriculum: Book ${bookNumber} – Unit ${unitNumber}`,
              resourceType: 'pdf',
              embedCode: `<object data="${curriculumUrl}" type="application/pdf" width="100%" height="600px"><p>Unable to display PDF file. <a href="${curriculumUrl}" target="_blank">Download</a> instead.</p></object>`,
              order: 0,
              provider: 'Visual English'
            });
          }
        } catch (error) {
          console.warn(`Error checking for curriculum PDF: ${error}`);
        }
        
        // Check for "Online Games Links" PDF
        try {
          const gamesLinksUrl = `/api/direct/files/${bookNumber}/${unitNumber}/linki-do-filmy-i-gry`;
          
          // Check if it exists
          const response = await fetch(gamesLinksUrl, { method: 'HEAD' });
          
          if (response.ok) {
            console.log(`Found games/links PDF for book ${bookNumber}, unit ${unitNumber}`);
            pdfResources.push({
              bookId: bookNumber,
              unitId: unitNumber,
              title: `Online Games and Film Links: Unit ${unitNumber}`,
              resourceType: 'pdf',
              embedCode: `<object data="${gamesLinksUrl}" type="application/pdf" width="100%" height="600px"><p>Unable to display PDF file. <a href="${gamesLinksUrl}" target="_blank">Download</a> instead.</p></object>`,
              order: pdfResources.length,
              provider: 'Visual English'
            });
          }
        } catch (error) {
          console.warn(`Error checking for games links PDF: ${error}`);
        }
      }
      
      return pdfResources;
    } catch (error) {
      console.error(`Error fetching automatic PDF resources: ${error}`);
      return [];
    }
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
    const loadResources = async () => {
      if (resources.length === 0 && bookId && unitId) {
        let predefinedResources: TeacherResource[] = [];
        let automaticPdfResources: TeacherResource[] = [];
        
        console.log(`Attempting to load PDF resources for book ${bookId}, unit ${unitId}`);
        
        // Fetch automatic PDF resources first
        try {
          automaticPdfResources = await fetchAutomaticPdfResources(bookId, unitId);
          console.log(`Found ${automaticPdfResources.length} automatic PDF resources:`, 
            automaticPdfResources.map(r => r.title).join(', '));
        } catch (error) {
          console.error(`Error loading automatic PDF resources: ${error}`);
          automaticPdfResources = [];
        }
        
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
            }
          ];
          
          // Add any automatic PDF resources found
          if (automaticPdfResources.length > 0) {
            const pdfStartOrder = predefinedResources.length;
            automaticPdfResources.forEach((pdf, index) => {
              predefinedResources.push({
                ...pdf,
                order: pdfStartOrder + index
              });
            });
          }
        }
        
        // Book 4 - Unit 1 (Nationalities)
        else if (bookId === "4" && unitId === "1") {
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
              title: "Countries and Nationalities - Wordwall Game",
              resourceType: "game",
              embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/61b9b4b9c6e94e02811d8e0b34ed32f2?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
              order: 1,
              provider: "Wordwall"
            }
          ];
          
          // Add any automatic PDF resources
          if (automaticPdfResources.length > 0) {
            automaticPdfResources.forEach((pdf, index) => {
              unitResources.push({
                ...pdf,
                order: unitResources.length
              });
            });
          }
          
          predefinedResources = unitResources;
        }
        
        // For any other book/unit, use just automatic PDF resources if available
        else if (automaticPdfResources.length > 0) {
          predefinedResources = automaticPdfResources;
        }
        
        // Save the predefined resources
        if (predefinedResources.length > 0) {
          setResources(predefinedResources);
          saveResourcesToServer(predefinedResources);
        }
      }
    };
    
    // Execute the async function
    loadResources();
  }, [bookId, unitId, resources.length]);
  
  // Sortable Item Component
  const SortableItem = ({
    resource,
    index,
    isEditing
  }: {
    resource: TeacherResource,
    index: number,
    isEditing: boolean
  }) => {
    const { 
      attributes, 
      listeners, 
      setNodeRef, 
      isDragging 
    } = useSortable({ 
      id: resource.id?.toString() || index.toString(),
      data: {
        type: 'resource',
        resource
      }
    });
    
    const style = {
      opacity: isDragging ? 0.5 : 1,
    };
    
    return (
      <div 
        ref={setNodeRef} 
        style={style} 
        className={`p-4 border rounded-lg mb-4 ${isEditing ? 'bg-muted/50' : ''}`}
      >
        <div className="flex justify-between items-start mb-2">
          <div className="flex-1">
            {isEditing ? (
              <Input 
                type="text" 
                value={resource.title} 
                onChange={(e) => handleFieldChange(index, 'title', e.target.value)} 
                className="mb-2"
                placeholder="Resource Title"
              />
            ) : (
              <h3 className="text-lg font-semibold">{resource.title}</h3>
            )}
            {isEditing && (
              <div className="grid grid-cols-2 gap-2 mb-2">
                <Input 
                  type="text" 
                  value={resource.provider || ''} 
                  onChange={(e) => handleFieldChange(index, 'provider', e.target.value)} 
                  placeholder="Provider (e.g., YouTube)" 
                />
                <Input 
                  type="text" 
                  value={resource.sourceUrl || ''} 
                  onChange={(e) => handleFieldChange(index, 'sourceUrl', e.target.value)} 
                  placeholder="Source URL (optional)" 
                />
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {isEditMode && !isDragging && (
              <>
                {isEditing ? (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => handleUpdateResource(index)}>
                      <Save className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={handleCancelEdit}>
                      <X className="h-4 w-4" />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button size="sm" variant="ghost" onClick={() => handleEditResource(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDeleteResource(index)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </>
            )}
            {isEditMode && !isEditing && (
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab p-1"
              >
                <GripVertical className="h-4 w-4" />
              </div>
            )}
            {!isEditMode && (
              <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                {resource.resourceType}
              </div>
            )}
          </div>
        </div>
        
        {isEditing ? (
          <Input 
            type="text" 
            value={resource.embedCode} 
            onChange={(e) => handleFieldChange(index, 'embedCode', e.target.value)} 
            className="mb-2"
            placeholder="Embed Code"
          />
        ) : (
          <div 
            className="mt-2 embed-container" 
            dangerouslySetInnerHTML={{ __html: resource.embedCode }} 
          />
        )}
      </div>
    );
  };
  
  // Resource List Component (with DnD)
  const ResourceList = ({ resourceType }: { resourceType: string }) => {
    const filteredResources = resources
      .filter(r => r.resourceType === resourceType)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    if (filteredResources.length === 0) {
      return <p className="text-muted-foreground text-center my-8">No {resourceType} resources available</p>;
    }
    
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext 
          items={filteredResources.map(r => r.id?.toString() || filteredResources.indexOf(r).toString())}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {filteredResources.map((resource, index) => (
              <SortableItem
                key={`${resource.id || index}-${resource.title}`}
                resource={resource}
                index={resources.indexOf(resource)}
                isEditing={editingResource === resources.indexOf(resource)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    );
  };
  
  // Resource type icon
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'game': return <Gamepad2 className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return null;
    }
  };
  
  return (
    <div>
      <div className="mb-6 bg-gradient-to-b from-primary/5 to-transparent p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
              Teacher Resources
            </h2>
            <p className="text-muted-foreground text-sm">Educational materials for Book {bookId}, Unit {unitId}</p>
          </div>
          {isEditMode && (
            <Button onClick={() => setIsAdding(true)} size="sm" className="shadow-sm transition-all hover:shadow-md">
              <Plus className="h-4 w-4 mr-2" />
              Add Resource
            </Button>
          )}
        </div>
        
        <div className="text-sm text-muted-foreground bg-background/80 p-3 rounded-lg border border-border/50 shadow-sm">
          <p>Teaching resources for this unit include educational videos, interactive games, and curriculum documents.</p>
          <p>Resources are organized in tabs below for easy navigation.</p>
        </div>
      </div>
      
      <Tabs defaultValue="video" className="bg-card/50 rounded-lg p-4 shadow-sm border border-border/50">
        <TabsList className="mb-4 grid w-full grid-cols-4 rounded-lg bg-muted/80">
          <TabsTrigger value="video" className="flex items-center justify-center py-3 data-[state=active]:shadow-sm">
            <Video className="h-4 w-4 mr-2" />
            <span className="font-medium">Videos</span>
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {resources.filter(r => r.resourceType === 'video').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="game" className="flex items-center justify-center py-3 data-[state=active]:shadow-sm">
            <Gamepad2 className="h-4 w-4 mr-2" />
            <span className="font-medium">Games</span>
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {resources.filter(r => r.resourceType === 'game').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="lesson" className="flex items-center justify-center py-3 data-[state=active]:shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2">
              <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
            </svg>
            <span className="font-medium">Lesson Plans</span>
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {resources.filter(r => r.resourceType === 'lesson').length}
            </span>
          </TabsTrigger>
          <TabsTrigger value="pdf" className="flex items-center justify-center py-3 data-[state=active]:shadow-sm">
            <FileText className="h-4 w-4 mr-2" />
            <span className="font-medium">PDF Resources</span>
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
              {resources.filter(r => r.resourceType === 'pdf').length}
            </span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="video">
          <ResourceList resourceType="video" />
        </TabsContent>
        
        <TabsContent value="game">
          <ResourceList resourceType="game" />
        </TabsContent>
        
        <TabsContent value="lesson">
          <ResourceList resourceType="lesson" />
        </TabsContent>
        
        <TabsContent value="pdf">
          <ResourceList resourceType="pdf" />
        </TabsContent>
      </Tabs>
      
      {/* Add Resource Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Teacher Resource</DialogTitle>
            <DialogDescription>
              Add a new resource for this unit. Provide the embed code from YouTube, Wordwall, or other sources.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="flex items-center space-x-2">
              <label className="w-24">Type:</label>
              <div className="flex-1">
                <select 
                  className="w-full p-2 border rounded"
                  value={newResource.resourceType}
                  onChange={(e) => handleNewResourceChange('resourceType', e.target.value)}
                >
                  <option value="video">Video</option>
                  <option value="game">Game</option>
                  <option value="lesson">Lesson Plan</option>
                  <option value="pdf">PDF Document</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Title:</label>
              <Input 
                type="text"
                value={newResource.title}
                onChange={(e) => handleNewResourceChange('title', e.target.value)}
                placeholder="Resource Title"
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Provider:</label>
              <Input 
                type="text"
                value={newResource.provider}
                onChange={(e) => handleNewResourceChange('provider', e.target.value)}
                placeholder="YouTube, Wordwall, etc."
                className="flex-1"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <label className="w-24">Source URL:</label>
              <Input 
                type="text"
                value={newResource.sourceUrl}
                onChange={(e) => handleNewResourceChange('sourceUrl', e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
            </div>
            
            {(newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson') ? (
              <div className="space-y-2">
                <label>Upload File:</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx,.ppt,.pptx"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setUploadedFile(e.target.files[0]);
                      }
                    }}
                    className="flex-1"
                  />
                  {uploadedFile && (
                    <Badge variant="outline" className="p-2">
                      {uploadedFile.name}
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <label>Embed Code:</label>
                <textarea 
                  rows={5}
                  value={newResource.embedCode}
                  onChange={(e) => handleNewResourceChange('embedCode', e.target.value)}
                  placeholder="<iframe>...</iframe>"
                  className="w-full p-2 border rounded"
                />
              </div>
            )}
          </div>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setIsAdding(false)}>
              Cancel
            </Button>
            <Button type="button" onClick={handleAddResource}>
              Add Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherResources;