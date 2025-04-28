import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Video, Gamepad2, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Card } from '@/components/ui/card';

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
  const { toast } = useToast();

  // Function to save resources to the server
  const saveResourcesToServer = async (resourcesToSave: TeacherResource[]) => {
    if (!bookId || !unitId || resourcesToSave.length === 0) return;
    
    try {
      await apiRequest('POST', `/api/direct/teacherResources/${bookId}/${unitId}`, resourcesToSave);
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
      const response = await apiRequest('GET', `/api/direct/teacherResources/${bookId}/${unitId}`);
      const data = await response.json();
      setResources(data);
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
  };

  // Handle updating a resource
  const handleUpdateResource = (index: number) => {
    setEditingResource(null);
    saveResourcesToServer(resources);
  };

  // Handle deleting a resource
  const handleDeleteResource = (index: number) => {
    setResources(resources.filter((_, i) => i !== index));
    saveResourcesToServer(resources.filter((_, i) => i !== index));
    toast({
      title: "Resource Deleted",
      description: "The resource has been deleted successfully.",
    });
  };

  // Handle changes to resource fields during editing
  const handleFieldChange = (index: number, field: string, value: string) => {
    const updatedResources = [...resources];
    (updatedResources[index] as any)[field] = value;
    setResources(updatedResources);
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
  
  // Add pre-defined resources for Book 1 units
  useEffect(() => {
    if (resources.length === 0 && bookId && unitId) {
      let predefinedResources: TeacherResource[] = [];
      
      // Book 1 - Add PDF lesson resources to all units
      if (bookId === "1") {
        // Map unit numbers to folder locations for units with special locations
        const unitLocationMap: Record<string, string> = {
          "3": "unit10", // Unit 3 PDF is in S3 unit10 folder
          "6": "unit10", // Unit 6 PDF is in S3 unit10 folder
          "10": "unit11", // Unit 10 PDF is in S3 unit11 folder
          "11": "unit10", // Unit 11 PDF is in S3 unit10 folder
          "16": "unit10", // Unit 16 PDF is in S3 unit10 folder
        };

        // Default folder location is unit11
        const folderLocation = unitLocationMap[unitId] || "unit11";
        
        // Create PDF resource for all Book 1 units
        const pdfFilename = `00 A Visual English 1 – Unit ${unitId} – New Version.pdf`;
        const encodedFilename = encodeURIComponent(pdfFilename);
        
        // Create the PDF resource object
        const pdfResource: TeacherResource = {
          bookId: "1",
          unitId: unitId,
          title: `Visual English Book 1 - Unit ${unitId} - Lesson PDF`,
          resourceType: "pdf",
          embedCode: `<div style="padding: 20px; background-color: #f8f9fa; border-radius: 8px; text-align: center;">
            <h3 style="margin-bottom: 15px; color: #2563eb;">Unit ${unitId} - Complete Lesson PDF</h3>
            <p style="margin-bottom: 20px;">This PDF contains the complete lesson materials for Unit ${unitId}</p>
            <a href="/api/direct/book1/${folderLocation}/assets/${encodedFilename}" 
               target="_blank" 
               style="display: inline-block; background-color: #2563eb; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-weight: 500;">
              <span style="display: flex; align-items: center; justify-content: center;">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <line x1="10" y1="9" x2="8" y2="9"></line>
                </svg>
                Download PDF
              </span>
            </a>
          </div>`,
          order: 0,
          provider: "Amazon S3"
        };
        
        // Start with the PDF resource
        predefinedResources = [pdfResource];
        
        // Add additional unit-specific resources if needed
        if (unitId === "2") {
          // Add School Objects specific resources
          // ... add additional resources for Unit 2 as needed
        }
        else if (unitId === "3") {
          // Add Classroom Rules specific resources
          // ... add additional resources for Unit 3 as needed
        }
        
        // Save predefined resources
        setResources(predefinedResources);
        saveResourcesToServer(predefinedResources);
      }
    }
  }, [resources.length, bookId, unitId]);

  // Render resource type icon based on type
  const renderResourceTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      default:
        return null;
    }
  };

  // No content to display if no bookId or unitId
  if (!bookId || !unitId) {
    return <div className="p-4 text-center text-gray-500">Please select a book and unit to view resources.</div>;
  }

  return (
    <div className="teacher-resources">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Teacher Resources</h2>
        {isEditMode && (
          <Button 
            onClick={() => setIsAdding(true)}
            className="flex items-center"
            size="sm"
          >
            <Plus className="mr-1 h-4 w-4" /> Add Resource
          </Button>
        )}
      </div>
      
      {resources.length === 0 ? (
        <div className="text-center p-8 border rounded-md bg-gray-50">
          <p className="text-gray-500">No teacher resources available for this unit yet.</p>
        </div>
      ) : (
        <div className="resources-list space-y-4">
          {resources.map((resource, index) => (
            <ResourceItem
              key={index}
              resource={resource}
              index={index}
              isEditing={editingResource === index}
              isEditMode={isEditMode}
              onEdit={() => handleEditResource(index)}
              onCancelEdit={handleCancelEdit}
              onUpdate={() => handleUpdateResource(index)}
              onDelete={() => handleDeleteResource(index)}
              onChange={(field, value) => handleFieldChange(index, field, value)}
            />
          ))}
        </div>
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
  onChange
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
      default:
        return null;
    }
  };

  return (
    <div className="resource-item border rounded-lg p-4 bg-white">
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center">
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
        <div className="media-wrapper">
          <div 
            className="media-embed"
            dangerouslySetInnerHTML={{ __html: resource.embedCode }}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherResources;