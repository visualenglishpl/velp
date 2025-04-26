import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TeacherResource {
  id?: number;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'activity' | 'other';
  embedCode: string;
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
    embedCode: ''
  });
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<number | null>(null);
  const { toast } = useToast();

  // Load resources from localStorage
  useEffect(() => {
    if (bookId && unitId) {
      const savedResources = localStorage.getItem(`resources-${bookId}-${unitId}`);
      if (savedResources) {
        try {
          const parsed = JSON.parse(savedResources);
          if (Array.isArray(parsed)) {
            setResources(parsed);
          }
        } catch (error) {
          console.error('Error parsing saved resources:', error);
        }
      }
    }
  }, [bookId, unitId]);

  // Save resources to localStorage whenever they change
  useEffect(() => {
    if (bookId && unitId && resources.length > 0) {
      localStorage.setItem(`resources-${bookId}-${unitId}`, JSON.stringify(resources));
    }
  }, [resources, bookId, unitId]);

  const handleAddResource = () => {
    if (!newResource.title || !newResource.embedCode) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and embed code for the resource.',
        variant: 'destructive'
      });
      return;
    }

    const resourceToAdd: TeacherResource = {
      ...newResource as TeacherResource,
      bookId: bookId || '',
      unitId: unitId || '',
      order: resources.length,
      resourceType: newResource.resourceType || 'video'
    };

    setResources(prev => [...prev, resourceToAdd]);
    setNewResource({
      resourceType: 'video',
      title: '',
      embedCode: ''
    });
    setIsAdding(false);

    toast({
      title: 'Resource added',
      description: 'The teaching resource has been added successfully.'
    });
  };

  const handleDeleteResource = (index: number) => {
    setResources(prev => prev.filter((_, i) => i !== index));
    toast({
      title: 'Resource deleted',
      description: 'The teaching resource has been removed.'
    });
  };

  const handleUpdateResource = (index: number) => {
    const updatedResources = [...resources];
    const editedResource = updatedResources[index];
    
    if (!editedResource.title || !editedResource.embedCode) {
      toast({
        title: 'Missing information',
        description: 'Please provide both a title and embed code for the resource.',
        variant: 'destructive'
      });
      return;
    }
    
    setResources(updatedResources);
    setEditingResource(null);
    
    toast({
      title: 'Resource updated',
      description: 'The teaching resource has been updated successfully.'
    });
  };

  const getCategoryCount = (type: string) => {
    return resources.filter(r => r.resourceType === type).length;
  };
  
  if (!bookId || !unitId) {
    return null;
  }

  const videoResources = resources.filter(r => r.resourceType === 'video');
  const gameResources = resources.filter(r => r.resourceType === 'game');
  const activityResources = resources.filter(r => r.resourceType === 'activity');
  const otherResources = resources.filter(r => r.resourceType === 'other');

  return (
    <div className="mt-8 border-t pt-6">
      <h2 className="text-2xl font-bold mb-4">Teacher Resources</h2>
      
      {isEditMode && (
        <div className="mb-6">
          {!isAdding ? (
            <Button 
              onClick={() => setIsAdding(true)}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Teaching Resource
            </Button>
          ) : (
            <div className="p-4 border rounded-md bg-gray-50">
              <h3 className="text-lg font-medium mb-3">Add New Teaching Resource</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Resource Type</label>
                  <select 
                    value={newResource.resourceType}
                    onChange={(e) => setNewResource(prev => ({ 
                      ...prev, 
                      resourceType: e.target.value as 'video' | 'game' | 'activity' | 'other'
                    }))}
                    className="w-full p-2 border rounded"
                  >
                    <option value="video">Video</option>
                    <option value="game">Game</option>
                    <option value="activity">Activity</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input 
                    type="text"
                    value={newResource.title}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g., Good Morning Pinkfong Video"
                    className="w-full p-2 border rounded"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Embed Code</label>
                  <textarea 
                    value={newResource.embedCode}
                    onChange={(e) => setNewResource(prev => ({ ...prev, embedCode: e.target.value }))}
                    placeholder="Paste YouTube iframe or other embed code here"
                    className="w-full p-2 border rounded min-h-[100px] font-mono text-sm"
                  />
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddResource}>
                    Add Resource
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      {resources.length > 0 ? (
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="video">
              Videos {getCategoryCount('video') > 0 && `(${getCategoryCount('video')})`}
            </TabsTrigger>
            <TabsTrigger value="game">
              Games {getCategoryCount('game') > 0 && `(${getCategoryCount('game')})`}
            </TabsTrigger>
            <TabsTrigger value="activity">
              Activities {getCategoryCount('activity') > 0 && `(${getCategoryCount('activity')})`}
            </TabsTrigger>
            <TabsTrigger value="other">
              Other {getCategoryCount('other') > 0 && `(${getCategoryCount('other')})`}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="space-y-6">
            {videoResources.length > 0 ? (
              videoResources.map((resource, index) => (
                <ResourceItem
                  key={`video-${index}`}
                  resource={resource}
                  index={index}
                  isEditing={editingResource === index}
                  isEditMode={isEditMode}
                  onEdit={() => setEditingResource(index)}
                  onCancelEdit={() => setEditingResource(null)}
                  onUpdate={() => handleUpdateResource(index)}
                  onDelete={() => handleDeleteResource(index)}
                  onChange={(field, value) => {
                    const updatedResources = [...resources];
                    updatedResources[index] = {
                      ...updatedResources[index],
                      [field]: value
                    };
                    setResources(updatedResources);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No video resources available</p>
            )}
          </TabsContent>
          
          <TabsContent value="game" className="space-y-6">
            {gameResources.length > 0 ? (
              gameResources.map((resource, index) => (
                <ResourceItem
                  key={`game-${index}`}
                  resource={resource}
                  index={index}
                  isEditing={editingResource === resources.findIndex(r => r === resource)}
                  isEditMode={isEditMode}
                  onEdit={() => setEditingResource(resources.findIndex(r => r === resource))}
                  onCancelEdit={() => setEditingResource(null)}
                  onUpdate={() => handleUpdateResource(resources.findIndex(r => r === resource))}
                  onDelete={() => handleDeleteResource(resources.findIndex(r => r === resource))}
                  onChange={(field, value) => {
                    const resourceIndex = resources.findIndex(r => r === resource);
                    const updatedResources = [...resources];
                    updatedResources[resourceIndex] = {
                      ...updatedResources[resourceIndex],
                      [field]: value
                    };
                    setResources(updatedResources);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No game resources available</p>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-6">
            {activityResources.length > 0 ? (
              activityResources.map((resource, index) => (
                <ResourceItem
                  key={`activity-${index}`}
                  resource={resource}
                  index={index}
                  isEditing={editingResource === resources.findIndex(r => r === resource)}
                  isEditMode={isEditMode}
                  onEdit={() => setEditingResource(resources.findIndex(r => r === resource))}
                  onCancelEdit={() => setEditingResource(null)}
                  onUpdate={() => handleUpdateResource(resources.findIndex(r => r === resource))}
                  onDelete={() => handleDeleteResource(resources.findIndex(r => r === resource))}
                  onChange={(field, value) => {
                    const resourceIndex = resources.findIndex(r => r === resource);
                    const updatedResources = [...resources];
                    updatedResources[resourceIndex] = {
                      ...updatedResources[resourceIndex],
                      [field]: value
                    };
                    setResources(updatedResources);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No activity resources available</p>
            )}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-6">
            {otherResources.length > 0 ? (
              otherResources.map((resource, index) => (
                <ResourceItem
                  key={`other-${index}`}
                  resource={resource}
                  index={index}
                  isEditing={editingResource === resources.findIndex(r => r === resource)}
                  isEditMode={isEditMode}
                  onEdit={() => setEditingResource(resources.findIndex(r => r === resource))}
                  onCancelEdit={() => setEditingResource(null)}
                  onUpdate={() => handleUpdateResource(resources.findIndex(r => r === resource))}
                  onDelete={() => handleDeleteResource(resources.findIndex(r => r === resource))}
                  onChange={(field, value) => {
                    const resourceIndex = resources.findIndex(r => r === resource);
                    const updatedResources = [...resources];
                    updatedResources[resourceIndex] = {
                      ...updatedResources[resourceIndex],
                      [field]: value
                    };
                    setResources(updatedResources);
                  }}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No other resources available</p>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-8 border rounded-md bg-gray-50">
          <p className="text-gray-500 mb-2">No teacher resources available for this unit</p>
          {isEditMode && (
            <p className="text-sm text-gray-400">Click the "Add Teaching Resource" button to add videos, games, and other resources.</p>
          )}
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
  return (
    <div className="border rounded-md p-4 relative">
      {isEditMode && !isEditing && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            onClick={onEdit}
            className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
            title="Edit resource"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-red-500 hover:text-red-700 transition-colors"
            title="Delete resource"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      )}
      
      {isEditing ? (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input 
              type="text"
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Embed Code</label>
            <textarea 
              value={resource.embedCode}
              onChange={(e) => onChange('embedCode', e.target.value)}
              className="w-full p-2 border rounded min-h-[100px] font-mono text-sm"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button onClick={onUpdate}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-medium mb-3">{resource.title}</h3>
          <div 
            className="embed-container" 
            dangerouslySetInnerHTML={{ __html: resource.embedCode }}
          />
        </div>
      )}
    </div>
  );
};

export default TeacherResources;