/**
 * TeacherResourcesContainer
 * 
 * A simplified container component that manages teacher resources for a book/unit.
 * This component replaces the original TeacherResources component with a more
 * modular and maintainable architecture.
 */

import { useState, useCallback } from 'react';
import { TeacherResource } from '@/components/TeacherResources';
import { useTeacherResources } from '@/hooks/useTeacherResources';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import ResourceList from './ResourceList';
import ResourceEditor from './ResourceEditor';
import EmbeddedContentModal from '@/components/EmbeddedContentModal';
import { useToast } from '@/hooks/use-toast';
import { useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { Plus, CheckCircle, PenLine, FileText, RotateCw } from 'lucide-react';

interface TeacherResourcesContainerProps {
  bookId: string;
  unitId: string;
  initialResourceType?: 'video' | 'game' | 'lesson' | 'pdf';
  isEditMode?: boolean;
}

const TeacherResourcesContainer = ({
  bookId,
  unitId,
  initialResourceType = 'video',
  isEditMode: propIsEditMode = false
}: TeacherResourcesContainerProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const [isEditMode, setIsEditMode] = useState(propIsEditMode || urlParams.get('edit') === 'true');
  const [activeTab, setActiveTab] = useState(initialResourceType);
  const [isAddingResource, setIsAddingResource] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [viewingResource, setViewingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);

  // Special handling for Book 3 Unit 16 which has two versions
  const initialUnitType = urlParams.get('type') === 'sports' ? 'sports' : 'housechores';
  const [unitVersion, setUnitVersion] = useState(initialUnitType);
  
  // Load resources using our custom hook
  const {
    filteredResources: resources,
    isLoading,
    hasMultipleVersions,
    versionOptions,
    refetch: refetchResources,
    hasResourcesAvailable
  } = useTeacherResources({
    bookId,
    unitId,
    version: hasMultipleVersions ? unitVersion : 'default',
    resourceType: activeTab
  });
  
  // New resource template
  const emptyResource: TeacherResource = {
    bookId,
    unitId,
    title: '',
    resourceType: activeTab,
    provider: '',
    sourceUrl: '',
    embedCode: '',
  };
  
  // Add resource mutation
  const addResourceMutation = useMutation({
    mutationFn: async (resource: TeacherResource) => {
      const response = await apiRequest('POST', '/api/teacher-resources', resource);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      refetchResources();
    },
    onError: (error) => {
      toast({
        title: "Failed to add resource",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
  // Update resource mutation
  const updateResourceMutation = useMutation({
    mutationFn: async (resource: TeacherResource) => {
      const response = await apiRequest('PATCH', `/api/teacher-resources/${resource.id}`, resource);
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      refetchResources();
    },
    onError: (error) => {
      toast({
        title: "Failed to update resource",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
  // Delete resource mutation
  const deleteResourceMutation = useMutation({
    mutationFn: async (resourceId: string) => {
      await apiRequest('DELETE', `/api/teacher-resources/${resourceId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      refetchResources();
      setConfirmDelete(null);
    },
    onError: (error) => {
      toast({
        title: "Failed to delete resource",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    }
  });
  
  // Save resource handler
  const handleSaveResource = useCallback(async (resource: TeacherResource) => {
    if (resource.id) {
      await updateResourceMutation.mutateAsync(resource);
    } else {
      await addResourceMutation.mutateAsync(resource);
    }
  }, [updateResourceMutation, addResourceMutation]);
  
  // Delete resource handler
  const handleDeleteResource = (resource: TeacherResource) => {
    setConfirmDelete(resource);
  };
  
  // Add resource handler
  const handleAddResource = () => {
    setEditingResource(null);
    setIsAddingResource(true);
  };
  
  // Edit resource handler
  const handleEditResource = (resource: TeacherResource) => {
    setIsAddingResource(false);
    setEditingResource(resource);
  };
  
  // View resource handler
  const handleViewResource = (resource: TeacherResource) => {
    setViewingResource(resource);
  };
  
  // Render version selector if the unit has multiple versions
  const renderVersionSelector = () => {
    if (!hasMultipleVersions) return null;
    
    return (
      <div className="mb-4">
        <p className="mb-2 text-sm font-medium">Version:</p>
        <div className="flex space-x-2">
          {versionOptions.map((version) => (
            <Button
              key={version}
              variant={unitVersion === version ? "default" : "outline"}
              size="sm"
              onClick={() => setUnitVersion(version)}
            >
              {version === 'sports' ? 'Sports' : 'House Chores'}
            </Button>
          ))}
        </div>
      </div>
    );
  };
  
  // No resources available message
  if (!hasResourcesAvailable) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold">Teacher Resources for Book {bookId}, Unit {unitId}</h2>
          <div className="py-8 text-center text-muted-foreground">
            No teacher resources available for this unit.
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Main Content Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Teacher Resources for Book {bookId}, Unit {unitId}</h2>
          <div className="flex items-center gap-3 self-end md:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => refetchResources()}
              className="flex items-center gap-1"
            >
              <RotateCw className="h-4 w-4" />
              Refresh
            </Button>
            
            {isEditMode ? (
              <>
                <Button onClick={handleAddResource} className="bg-green-600 hover:bg-green-700">
                  <Plus className="h-4 w-4 mr-2" /> Add Resource
                </Button>
                <Button 
                  variant="outline" 
                  className="text-muted-foreground" 
                  onClick={() => setIsEditMode(false)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" /> Done Editing
                </Button>
              </>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => setIsEditMode(true)}
                className="whitespace-nowrap"
              >
                <PenLine className="h-4 w-4 mr-2" /> Manage Resources
              </Button>
            )}
          </div>
        </div>
        
        {/* Version selector for Book 3 Unit 16 */}
        {renderVersionSelector()}
        
        {/* Resource Tabs */}
        <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
          <TabsList className="w-full max-w-md mb-4">
            <TabsTrigger value="video" className="flex-1">Videos</TabsTrigger>
            <TabsTrigger value="game" className="flex-1">Games</TabsTrigger>
            <TabsTrigger value="lesson" className="flex-1">Lesson Plans</TabsTrigger>
            <TabsTrigger value="pdf" className="flex-1">Documents</TabsTrigger>
          </TabsList>
          
          {/* Tab Content */}
          <TabsContent value="video">
            <ResourceList 
              resources={resources}
              resourceType="video"
              isLoading={isLoading}
              isEditMode={isEditMode}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
              onViewResource={handleViewResource}
            />
          </TabsContent>
          
          <TabsContent value="game">
            <ResourceList 
              resources={resources}
              resourceType="game"
              isLoading={isLoading}
              isEditMode={isEditMode}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
              onViewResource={handleViewResource}
            />
          </TabsContent>
          
          <TabsContent value="lesson">
            <ResourceList 
              resources={resources}
              resourceType="lesson"
              isLoading={isLoading}
              isEditMode={isEditMode}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
              onViewResource={handleViewResource}
            />
          </TabsContent>
          
          <TabsContent value="pdf">
            <ResourceList 
              resources={resources}
              resourceType="pdf"
              isLoading={isLoading}
              isEditMode={isEditMode}
              onEditResource={handleEditResource}
              onDeleteResource={handleDeleteResource}
              onViewResource={handleViewResource}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Add Resource Dialog */}
      {isAddingResource && (
        <ResourceEditor
          isOpen={isAddingResource}
          onClose={() => setIsAddingResource(false)}
          onSave={handleSaveResource}
          resource={{...emptyResource, resourceType: activeTab}}
          bookId={bookId}
          unitId={unitId}
        />
      )}
      
      {/* Edit Resource Dialog */}
      {editingResource && (
        <ResourceEditor
          isOpen={!!editingResource}
          onClose={() => setEditingResource(null)}
          onSave={handleSaveResource}
          resource={editingResource}
          bookId={bookId}
          unitId={unitId}
        />
      )}
      
      {/* View Resource Dialog */}
      {viewingResource && (
        <EmbeddedContentModal
          isOpen={!!viewingResource}
          onClose={() => setViewingResource(null)}
          resource={viewingResource}
        />
      )}
      
      {/* Confirm Delete Dialog */}
      {confirmDelete && (
        <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete "{confirmDelete.title}"? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={() => confirmDelete.id && deleteResourceMutation.mutate(confirmDelete.id)}
                disabled={deleteResourceMutation.isPending}
              >
                {deleteResourceMutation.isPending ? 'Deleting...' : 'Delete'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default TeacherResourcesContainer;