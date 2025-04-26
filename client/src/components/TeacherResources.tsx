import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Upload, Video, Gamepad2, BookOpen, Link, ExternalLink } from 'lucide-react';
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
  resourceType: 'video' | 'game' | 'activity' | 'other';
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
      embedCode: '',
      provider: '',
      sourceUrl: ''
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
            <Card className="p-6 border-2 bg-gray-50">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                {(newResource.resourceType || 'video') === 'video' && <Video className="h-5 w-5 mr-2 text-red-500" />}
                {(newResource.resourceType || 'video') === 'game' && <Gamepad2 className="h-5 w-5 mr-2 text-blue-500" />}
                {(newResource.resourceType || 'video') === 'activity' && <BookOpen className="h-5 w-5 mr-2 text-amber-500" />}
                {(newResource.resourceType || 'video') === 'other' && <Link className="h-5 w-5 mr-2 text-gray-500" />}
                Add New {((newResource.resourceType || 'video').charAt(0).toUpperCase() + (newResource.resourceType || 'video').slice(1))} Resource
              </h3>
              
              <div className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Resource Type</label>
                    <select 
                      value={newResource.resourceType || 'video'}
                      onChange={(e) => setNewResource(prev => ({ 
                        ...prev, 
                        resourceType: e.target.value as 'video' | 'game' | 'activity' | 'other'
                      }))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                    >
                      <option value="video">Video (YouTube, Vimeo, etc.)</option>
                      <option value="game">Game (Wordwall, etc.)</option>
                      <option value="activity">Activity (Online exercises)</option>
                      <option value="other">Other Embedded Content</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input 
                      type="text"
                      value={newResource.title}
                      onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                      placeholder={(newResource.resourceType || 'video') === 'video' ? "e.g., Good Morning Pinkfong" : 
                                  (newResource.resourceType || 'video') === 'game' ? "e.g., Wordwall - Greetings" : 
                                  "e.g., Times of the Day Activity"}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Embed Code
                    <span className="text-xs text-gray-500 ml-2">
                      (Copy & paste iframe code from YouTube, Wordwall, etc.)
                    </span>
                  </label>
                  <textarea 
                    value={newResource.embedCode}
                    onChange={(e) => setNewResource(prev => ({ ...prev, embedCode: e.target.value }))}
                    placeholder={`Paste embed code here. For example:\n\n<iframe width="560" height="315" src="https://www.youtube.com/embed/..." title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`}
                    className="w-full p-3 border rounded min-h-[120px] font-mono text-sm focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                  />
                </div>
                
                <div className="bg-amber-50 border border-amber-200 p-3 rounded-md text-amber-800 text-sm">
                  <p>
                    <strong>Tip:</strong> To get embed code from YouTube, click "Share" button below a video, 
                    then "Embed", and copy the iframe code provided.
                  </p>
                </div>
                
                <div className="flex justify-end space-x-3 pt-2">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    <X className="h-4 w-4 mr-1" /> Cancel
                  </Button>
                  <Button onClick={handleAddResource}>
                    <Plus className="h-4 w-4 mr-1" /> Add Resource
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
      
      {resources.length > 0 ? (
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="grid grid-cols-4 gap-2 mb-6">
            <TabsTrigger value="video" className="flex items-center gap-2">
              <Video className="h-4 w-4 text-red-500" />
              <span>Videos</span> 
              {getCategoryCount('video') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-red-100 text-red-700 rounded-full">
                  {getCategoryCount('video')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="game" className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-blue-500" />
              <span>Games</span>
              {getCategoryCount('game') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
                  {getCategoryCount('game')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span>Activities</span>
              {getCategoryCount('activity') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-amber-100 text-amber-700 rounded-full">
                  {getCategoryCount('activity')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-2">
              <Link className="h-4 w-4 text-gray-500" />
              <span>Other</span>
              {getCategoryCount('other') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-gray-100 text-gray-700 rounded-full">
                  {getCategoryCount('other')}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video">
            {videoResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videoResources.map((resource, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md bg-gray-50 border-gray-200">
                <Video className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No video resources available</p>
                {isEditMode && (
                  <p className="text-xs text-gray-400 mt-2">
                    Click "Add Teaching Resource" and select "Video" type to add YouTube videos
                  </p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="game">
            {gameResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {gameResources.map((resource, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md bg-gray-50 border-gray-200">
                <Gamepad2 className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No game resources available</p>
                {isEditMode && (
                  <p className="text-xs text-gray-400 mt-2">
                    Click "Add Teaching Resource" and select "Game" type to add Wordwall games
                  </p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity">
            {activityResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {activityResources.map((resource, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md bg-gray-50 border-gray-200">
                <BookOpen className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No activity resources available</p>
                {isEditMode && (
                  <p className="text-xs text-gray-400 mt-2">
                    Click "Add Teaching Resource" and select "Activity" type to add interactive activities
                  </p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="other">
            {otherResources.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherResources.map((resource, index) => (
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
                ))}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed rounded-md bg-gray-50 border-gray-200">
                <Link className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                <p className="text-gray-500">No other resources available</p>
                {isEditMode && (
                  <p className="text-xs text-gray-400 mt-2">
                    Click "Add Teaching Resource" and select "Other" type to add miscellaneous embeddable content
                  </p>
                )}
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="text-center py-10 border rounded-md bg-gray-50">
          <div className="flex justify-center space-x-3 mb-3">
            <Video className="h-8 w-8 text-gray-300" />
            <Gamepad2 className="h-8 w-8 text-gray-300" />
            <BookOpen className="h-8 w-8 text-gray-300" />
          </div>
          <p className="text-gray-500 mb-2">No teacher resources available for this unit</p>
          {isEditMode && (
            <div className="mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsAdding(true)}
                className="border-dashed bg-gray-50 hover:bg-white"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Teaching Resource
              </Button>
              <p className="text-xs text-gray-400 mt-3">Add videos, games, and other resources to help teachers with this unit</p>
            </div>
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
  // Determine provider icon based on embed code
  const getProviderIcon = () => {
    const code = resource.embedCode.toLowerCase();
    if (code.includes('youtube.com') || code.includes('youtu.be')) {
      return <Video className="h-4 w-4 text-red-600" />;
    } else if (code.includes('wordwall.net')) {
      return <Gamepad2 className="h-4 w-4 text-indigo-600" />;
    } else if (code.includes('google.com') || code.includes('docs.google.com')) {
      return <BookOpen className="h-4 w-4 text-blue-600" />;
    } else {
      return <Link className="h-4 w-4 text-gray-600" />;
    }
  };

  // Format embed code for responsive display
  const formatEmbedCode = (code: string) => {
    // Make embedded content responsive
    if (code.includes('<iframe')) {
      // Add responsive wrapper and styling
      if (!code.includes('class="')) {
        return code.replace('<iframe', '<iframe class="w-full aspect-video rounded-md shadow-sm max-w-full"');
      } else {
        return code.replace('class="', 'class="w-full aspect-video rounded-md shadow-sm max-w-full ');
      }
    }
    return code;
  };

  return (
    <Card className="p-5 relative overflow-hidden shadow-sm border-gray-200 hover:border-gray-300 transition-all">
      {isEditMode && !isEditing && (
        <div className="absolute top-3 right-3 flex space-x-2 z-10">
          <button
            onClick={onEdit}
            className="p-1.5 bg-white/90 rounded-full text-gray-600 hover:text-primary hover:bg-white transition-colors shadow-sm"
            title="Edit resource"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-1.5 bg-white/90 rounded-full text-red-500 hover:text-red-600 hover:bg-white transition-colors shadow-sm"
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
            <Input 
              type="text"
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Embed Code</label>
            <textarea 
              value={resource.embedCode}
              onChange={(e) => onChange('embedCode', e.target.value)}
              className="w-full p-2 border rounded min-h-[120px] font-mono text-sm"
              placeholder="Paste YouTube or Wordwall iframe code here"
            />
          </div>
          
          <div className="flex justify-end space-x-2 mt-4">
            <Button variant="outline" size="sm" onClick={onCancelEdit}>
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button size="sm" onClick={onUpdate}>
              <Save className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center mb-3">
            {getProviderIcon()}
            <h3 className="text-lg font-medium ml-2">{resource.title}</h3>
          </div>
          
          <div className="aspect-video relative overflow-hidden rounded-md bg-gray-50 mb-2">
            <div 
              className="embed-container w-full h-full" 
              dangerouslySetInnerHTML={{ __html: formatEmbedCode(resource.embedCode) }}
            />
          </div>
          
          {resource.sourceUrl && (
            <a 
              href={resource.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary hover:underline flex items-center mt-1"
            >
              <ExternalLink className="h-3 w-3 mr-1" /> 
              View original
            </a>
          )}
        </div>
      )}
    </Card>
  );
};

export default TeacherResources;