import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { Trash, Plus, Edit, Save, X, Upload, Video, Gamepad2, BookOpen, Link, ExternalLink, FileText, Download } from 'lucide-react';
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
  
  // Add pre-defined resources for Book 1, Unit 1 and Book 0b, Unit 1
  useEffect(() => {
    if (resources.length === 0 && bookId && unitId) {
      let predefinedResources: TeacherResource[] = [];
      
      // Book 0b, Unit 1 resources
      if (bookId === "0b" && unitId === "1") {
        predefinedResources = [
          {
            bookId: "0b",
            unitId: "1",
            title: "Good Morning, Good Night - LITTLE FOX",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          }
        ];
        setResources(predefinedResources);
      } 
      // Book 1, Unit 1 resources
      else if (bookId === "1" && unitId === "1") {
        predefinedResources = [
          {
            bookId: "1",
            unitId: "1",
            title: "Good Morning - PINKFONG",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=8rsR-SrYgJ8GhGSf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 0,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Good Morning, Good Night - LITTLE FOX",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/7CuZr1Dz3sk?si=xjDrz_iryoabkZjn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 1,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "The Greetings Song - MAPLE LEAF",
            resourceType: "video",
            embedCode: '<iframe width="560" height="315" src="https://www.youtube.com/embed/gVIFEVLzP4o?si=7yhM78fH9pFHwlgD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
            order: 2,
            provider: "YouTube"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Greetings Game - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/7a5f9c9d02764745b1b471a56483ddf2?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 3,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Times of the Day Game - Wordwall",
            resourceType: "game",
            embedCode: '<iframe style="max-width:100%" src="https://wordwall.net/embed/aa9083a0802940d7abd8dfbb0ea2113d?themeId=1&templateId=2&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>',
            order: 4,
            provider: "Wordwall"
          },
          {
            bookId: "1",
            unitId: "1",
            title: "Lesson Plan - Greetings and Times of Day",
            resourceType: "activity",
            embedCode: `<div style="padding: 20px; background-color: white; border-radius: 8px; border: 1px solid #e2e8f0;">
            <h2 style="font-size: 1.5rem; color: #2563eb; margin-bottom: 1rem;">Lesson Plan: Greetings and Times of Day</h2>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Lesson Objectives</h3>
              <ul style="list-style-type: disc; padding-left: 1.5rem;">
                <li>Students will learn greetings appropriate for different times of day</li>
                <li>Students will practice identifying times of day</li>
                <li>Students will be able to greet others correctly based on time</li>
              </ul>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Required Materials</h3>
              <ul style="list-style-type: disc; padding-left: 1.5rem;">
                <li>Visual English Book 1 - Unit 1 slides</li>
                <li>Time of day flashcards</li>
                <li>Role-play cards</li>
              </ul>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Warm-up (5 minutes)</h3>
              <p>Greet students as they enter with appropriate greetings. Ask students what time of day it is and which greeting is appropriate.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Presentation (10 minutes)</h3>
              <p>Go through slides 1-10 showing different greetings. Have students repeat each greeting and practice in pairs.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Practice (15 minutes)</h3>
              <p>Show time of day flashcards and have students call out appropriate greetings. Then have students practice time-based dialogues in pairs.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Production (15 minutes)</h3>
              <p>Role-play activity: Give each pair a different time of day scenario. Students must act out a short dialogue including appropriate greetings.</p>
            </div>
            
            <div style="margin-bottom: 1rem;">
              <h3 style="font-size: 1.2rem; color: #4b5563;">Extension Activities</h3>
              <ul style="list-style-type: disc; padding-left: 1.5rem;">
                <li>Have students create a daily schedule with different greeting times</li>
                <li>Play the Wordwall Greetings game as a class competition</li>
                <li>Watch the "Good Morning" song video and have students create actions</li>
              </ul>
            </div>
            
            <div>
              <h3 style="font-size: 1.2rem; color: #4b5563;">Assessment</h3>
              <p>Observe student participation during activities. Check correct usage of greetings in the role-play activity.</p>
            </div>
          </div>`,
            order: 5,
            provider: "Lesson Plan"
          }
        ];
        setResources(predefinedResources);
      }
    }
  }, [bookId, unitId, resources.length]);

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
  const pdfResources = resources.filter(r => r.resourceType === 'pdf');
  const otherResources = resources.filter(r => r.resourceType === 'other');
  
  // Add default PDF resource for Book 1, Unit 1 if not already present
  useEffect(() => {
    if (bookId === '1' && unitId === '1' && !pdfResources.length) {
      // Only add if we don't already have a PDF resource
      const pdfResource: TeacherResource = {
        bookId: "1",
        unitId: "1",
        title: "Visual English 1 - Unit 1 - Lesson PDF",
        resourceType: "pdf",
        embedCode: `<iframe src="/api/direct/book1/unit1/file?path=book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf" width="100%" height="600" style="border: none;"></iframe>`,
        order: resources.length,
        provider: "Visual English",
        sourceUrl: `/api/direct/book1/unit1/file?path=book1/unit1/00 A Visual English 1 – Unit 1 – New Version.pdf`
      };
      
      setResources(prev => [...prev, pdfResource]);
    }
  }, [bookId, unitId, pdfResources.length, resources.length]);

  return (
    <div className="mt-8 border-t pt-6 pb-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold mb-4 px-4 flex items-center">
        <BookOpen className="w-6 h-6 mr-2 text-primary" />
        Teacher Resources
      </h2>
      
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
                        resourceType: e.target.value as 'video' | 'game' | 'activity' | 'pdf' | 'other'
                      }))}
                      className="w-full p-2 border rounded focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                    >
                      <option value="video">Video (YouTube, Vimeo, etc.)</option>
                      <option value="game">Game (Wordwall, etc.)</option>
                      <option value="activity">Activity (Lesson plans, exercises)</option>
                      <option value="pdf">Lesson PDF (Materials, handouts)</option>
                      <option value="other">Other Embedded Content</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Provider (Optional)</label>
                    <Input 
                      placeholder="e.g., YouTube, Wordwall, etc."
                      value={newResource.provider || ''}
                      onChange={(e) => setNewResource(prev => ({ ...prev, provider: e.target.value }))}
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input 
                    placeholder="Resource title"
                    value={newResource.title || ''}
                    onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">External URL (Optional)</label>
                  <div className="flex items-center gap-2">
                    <Input 
                      placeholder="https://example.com/resource"
                      value={newResource.sourceUrl || ''}
                      onChange={(e) => setNewResource(prev => ({ ...prev, sourceUrl: e.target.value }))}
                      className="w-full"
                    />
                    {newResource.sourceUrl && (
                      <a 
                        href={newResource.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 inline-flex items-center justify-center px-3 py-2 border border-transparent text-sm rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Embed Code</label>
                  <textarea 
                    placeholder='<iframe src="..." width="..." height="..." frameborder="0" allowfullscreen></iframe>'
                    rows={5}
                    className="w-full resize-y p-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                    value={newResource.embedCode}
                    onChange={(e) => setNewResource(prev => ({ ...prev, embedCode: e.target.value }))}
                  />
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsAdding(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddResource}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Resource
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}
      
      {resources.length > 0 ? (
        <Tabs defaultValue="video" className="px-4">
          <TabsList className="grid grid-cols-5 mb-4">
            <TabsTrigger value="video" className="flex items-center gap-1">
              <Video className="h-4 w-4 text-red-500" />
              <span>Videos</span>
              {getCategoryCount('video') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                  {getCategoryCount('video')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="game" className="flex items-center gap-1">
              <Gamepad2 className="h-4 w-4 text-blue-500" />
              <span>Games</span>
              {getCategoryCount('game') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                  {getCategoryCount('game')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="activity" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4 text-amber-500" />
              <span>Lessons</span>
              {getCategoryCount('activity') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-amber-100 text-amber-800 rounded-full">
                  {getCategoryCount('activity')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="pdf" className="flex items-center gap-1">
              <FileText className="h-4 w-4 text-green-500" />
              <span>Lesson PDF</span>
              {getCategoryCount('pdf') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                  {getCategoryCount('pdf')}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="other" className="flex items-center gap-1">
              <Link className="h-4 w-4 text-gray-500" />
              <span>Other</span>
              {getCategoryCount('other') > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  {getCategoryCount('other')}
                </span>
              )}
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="video" className="space-y-4">
            {videoResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {videoResources.map((resource, index) => (
                  <ResourceItem 
                    key={resource.id || index}
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
              <div className="text-center py-8 text-gray-500">
                No video resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="game" className="space-y-4">
            {gameResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {gameResources.map((resource, index) => (
                  <ResourceItem 
                    key={resource.id || index}
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
                      const resourceIndex = resources.findIndex(r => r === resource);
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
              <div className="text-center py-8 text-gray-500">
                No game resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="activity" className="space-y-4">
            {activityResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {activityResources.map((resource, index) => (
                  <ResourceItem 
                    key={resource.id || index}
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
                      const resourceIndex = resources.findIndex(r => r === resource);
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
              <div className="text-center py-8 text-gray-500">
                No lesson or activity resources available.
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="pdf" className="space-y-4">
            {pdfResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {pdfResources.map((resource, index) => (
                  <div key={resource.id || index} className="border rounded-lg overflow-hidden shadow-sm bg-white">
                    <div className="p-4 flex flex-wrap items-center justify-between gap-2 border-b bg-gray-50">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-green-500" />
                        <h3 className="text-lg font-semibold">{resource.title}</h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {resource.sourceUrl && (
                          <a 
                            href={resource.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-2.5 py-1 border border-green-300 text-sm font-medium rounded-full shadow-sm text-green-700 bg-white hover:bg-green-50 transition-all"
                          >
                            <Download className="mr-1 h-4 w-4" />
                            Download PDF
                          </a>
                        )}
                        
                        {isEditMode && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteResource(index)}
                            className="h-8 w-8 p-0 rounded-full hover:bg-red-100 text-red-500"
                            title="Delete resource"
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div 
                        className="w-full overflow-hidden rounded-md" 
                        dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                {bookId === '1' && unitId === '1' ? (
                  <div className="flex flex-col items-center">
                    <p className="mb-4">Loading Lesson PDF...</p>
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  </div>
                ) : (
                  <p>No PDF resources available for this unit.</p>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="other" className="space-y-4">
            {otherResources.length > 0 ? (
              <div className="grid grid-cols-1 gap-6">
                {otherResources.map((resource, index) => (
                  <ResourceItem 
                    key={resource.id || index}
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
                      const resourceIndex = resources.findIndex(r => r === resource);
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
              <div className="text-center py-8 text-gray-500">
                No other resources available.
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <div className="p-8 text-center">
          <div className="text-gray-500 mb-4">No teaching resources available for this unit.</div>
          {isEditMode && (
            <Button 
              onClick={() => setIsAdding(true)}
              className="flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Teaching Resource
            </Button>
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
    <div className="border rounded-lg overflow-hidden shadow-sm bg-white">
      {/* Resource header */}
      <div className="p-4 flex flex-wrap items-center justify-between gap-2 border-b bg-gray-50">
        <div className="flex items-center gap-2">
          {resource.resourceType === 'video' && <Video className="h-5 w-5 text-red-500" />}
          {resource.resourceType === 'game' && <Gamepad2 className="h-5 w-5 text-blue-500" />}
          {resource.resourceType === 'activity' && <BookOpen className="h-5 w-5 text-amber-500" />}
          {resource.resourceType === 'pdf' && <FileText className="h-5 w-5 text-green-500" />}
          {resource.resourceType === 'other' && <Link className="h-5 w-5 text-gray-500" />}
          
          {isEditing ? (
            <Input 
              value={resource.title}
              onChange={(e) => onChange('title', e.target.value)}
              className="w-full"
            />
          ) : (
            <h3 className="text-lg font-semibold">{resource.title}</h3>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {resource.provider && !isEditing && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {resource.provider}
            </span>
          )}
          
          {resource.sourceUrl && !isEditing && (
            <a 
              href={resource.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <ExternalLink className="mr-1 h-3 w-3" />
              Source
            </a>
          )}
          
          {isEditMode && !isEditing && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onEdit}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                title="Edit resource"
              >
                <Edit className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onDelete}
                className="h-8 w-8 p-0 rounded-full hover:bg-red-100 text-red-500"
                title="Delete resource"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </>
          )}
          
          {isEditing && (
            <>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onUpdate}
                className="h-8 w-8 p-0 rounded-full hover:bg-green-100 text-green-500"
                title="Save changes"
              >
                <Save className="h-4 w-4" />
              </Button>
              
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onCancelEdit}
                className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                title="Cancel editing"
              >
                <X className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
      </div>
      
      {/* Resource content */}
      <div className="p-4">
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Provider (Optional)</label>
              <Input 
                placeholder="e.g., YouTube, Wordwall, etc."
                value={resource.provider || ''}
                onChange={(e) => onChange('provider', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">External URL (Optional)</label>
              <Input 
                placeholder="https://example.com/resource"
                value={resource.sourceUrl || ''}
                onChange={(e) => onChange('sourceUrl', e.target.value)}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Embed Code</label>
              <textarea 
                placeholder='<iframe src="..." width="..." height="..." frameborder="0" allowfullscreen></iframe>'
                rows={5}
                className="w-full resize-y p-2 border rounded-md focus:ring-2 focus:ring-primary/30 focus:border-primary/70"
                value={resource.embedCode}
                onChange={(e) => onChange('embedCode', e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div 
            className="w-full rounded-lg overflow-hidden border bg-white shadow-sm aspect-video max-w-full"
            dangerouslySetInnerHTML={{ __html: resource.embedCode }}
          />
        )}
      </div>
    </div>
  );
};

export default TeacherResources;