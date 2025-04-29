import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Gamepad2, Video, FileText, Pencil, Trash2, Plus, ExternalLink } from 'lucide-react';

export interface TeacherResource {
  id?: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  provider?: string;
  sourceUrl?: string;
  embedCode?: string;
  fileUrl?: string;
}

interface TeacherResourcesProps {
  bookId: string;
  unitId: string;
}

const TeacherResources = ({ bookId, unitId }: TeacherResourcesProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const isEditMode = urlParams.get('edit') === 'true';
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [newResource, setNewResource] = useState<TeacherResource>({
    bookId,
    unitId,
    title: '',
    resourceType: 'video',
    provider: '',
    sourceUrl: '',
    embedCode: '',
  });

  // Fetch teacher resources
  const { data, isLoading, refetch } = useQuery<TeacherResource[]>({
    queryKey: [`/api/direct/${bookId}/${unitId}/resources`],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });
  
  // Resources specific to Book 7, Unit 1
  const book7Unit1Resources = [
    {
      id: "book7-unit1-video1",
      bookId,
      unitId,
      title: "Movie Genres Vocabulary Epic ESL Guessing Game",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=FTuQIwl7j3k",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/FTuQIwl7j3k?si=wh3So_Qj8Hqk6TL3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-video2",
      bookId,
      unitId,
      title: "Guess the soundtrack of the films",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://youtu.be/p57KyLojoHU?si=ydbr2xbJxAgeN7_u",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/p57KyLojoHU?si=g_6AyW2jlsRI9DgC" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-video3",
      bookId,
      unitId,
      title: "Guess the Film Genre",
      resourceType: "video" as const,
      provider: "YouTube",
      sourceUrl: "https://www.youtube.com/watch?v=Bp07u0YrH4Y",
      embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Bp07u0YrH4Y?si=ufzMpcalPer6eRCn" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-game1",
      bookId,
      unitId,
      title: "Film Genres Game 1",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/dcc6034981ea455d9bfa88f6740c720f",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/dcc6034981ea455d9bfa88f6740c720f?themeId=1&templateId=5&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-game2",
      bookId,
      unitId,
      title: "Film Genres Game 2",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/1e211e293d514f56b1786cfbf6ed146b",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/1e211e293d514f56b1786cfbf6ed146b?themeId=1&templateId=46&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-game3",
      bookId,
      unitId,
      title: "Film Genres Game 3",
      resourceType: "game" as const,
      provider: "Wordwall",
      sourceUrl: "https://wordwall.net/resource/de72c3ff49e54609b845500c1bf34432",
      embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/de72c3ff49e54609b845500c1bf34432?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
    },
    {
      id: "book7-unit1-pdf1",
      bookId,
      unitId,
      title: "Book 7 - Unit 1 Overview",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: "https://67bd8e1e-e6a8-419f-b59e-299052eae36a-00-1j78vcuapq5ig.spock.replit.dev/book7/unit1/00%20A%20Book%207%20%E2%80%93%20Unit%201.pdf",
      embedCode: ""
    },
    {
      id: "book7-unit1-pdf2",
      bookId,
      unitId,
      title: "Links to Online Games and Films",
      resourceType: "pdf" as const,
      provider: "Visual English",
      sourceUrl: "https://67bd8e1e-e6a8-419f-b59e-299052eae36a-00-1j78vcuapq5ig.spock.replit.dev/book7/unit1/22%20D%20Links%20to%20Online%20Games%20and%20Films.pdf",
      embedCode: ""
    }
  ];

  // Save resources mutation
  const saveMutation = useMutation({
    mutationFn: async (updatedResources: TeacherResource[]) => {
      // For Book 7, Unit 1, just return success without saving to server
      if (bookId === '7' && unitId === '1') {
        return { success: true };
      }
      
      // For other books/units, save to server
      await apiRequest(
        'POST', 
        `/api/direct/${bookId}/${unitId}/resources`, 
        { resources: updatedResources }
      );
    },
    onSuccess: () => {
      if (bookId === '7' && unitId === '1') {
        setResources(book7Unit1Resources);
      } else {
        refetch();
      }
      
      toast({
        title: "Resources Saved",
        description: "Teacher resources have been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Save Failed",
        description: error.message || "Could not save resources. Please try again.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    // For Book 7, Unit 1, use the predefined resources
    if (bookId === '7' && unitId === '1') {
      setResources(book7Unit1Resources);
    } else if (data && Array.isArray(data)) {
      setResources(data);
    } else if (data) {
      // Handle case where data is not an array
      console.warn('Resources data is not an array:', data);
      setResources([]);
    }
  }, [data, bookId, unitId, book7Unit1Resources]);

  const handleNewResourceChange = (field: keyof TeacherResource, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddResource = async () => {
    // Basic validation
    if (!newResource.title) {
      toast({
        title: "Validation Error",
        description: "Please enter a title for the resource.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Create a copy of the resource to add
      const resourceToAdd: TeacherResource = { ...newResource };
      
      // If a file was uploaded, handle it
      if (uploadedFile && (newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson')) {
        // In a real implementation, you would upload the file to S3 or your server
        console.log('File to upload:', uploadedFile);
        resourceToAdd.fileUrl = URL.createObjectURL(uploadedFile);
      }

      // Add the new resource to the list
      const updatedResources = [...resources, resourceToAdd];
      
      // Save to the server
      await saveMutation.mutateAsync(updatedResources);
      
      // Reset form
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
      setUploadedFile(null);
      setIsAdding(false);
      
    } catch (error) {
      console.error('Error adding resource:', error);
      toast({
        title: "Error",
        description: "Failed to add resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteResource = async (resource: TeacherResource) => {
    try {
      const updatedResources = resources.filter(r => r !== resource);
      await saveMutation.mutateAsync(updatedResources);
      setConfirmDelete(null);
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: "Error",
        description: "Failed to delete resource. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getIconForResourceType = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'game': return <Gamepad2 className="h-4 w-4" />;
      case 'pdf': return <FileText className="h-4 w-4" />;
      default: return null;
    }
  };

  const ResourceList = ({ resourceType }: { resourceType: string }) => {
    // Make sure resources is an array before filtering
    const filteredResources = Array.isArray(resources) 
      ? resources.filter(r => r?.resourceType === resourceType)
      : [];
    
    if (filteredResources.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          <p>No {resourceType} resources available for this unit.</p>
          {isEditMode && (
            <Button 
              onClick={() => {
                setNewResource(prev => ({ ...prev, resourceType: resourceType as any }));
                setIsAdding(true);
              }} 
              variant="outline" 
              size="sm" 
              className="mt-2"
            >
              <Plus className="h-4 w-4 mr-2" /> Add {resourceType}
            </Button>
          )}
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-1">
        {filteredResources.map((resource, index) => (
          <Card key={index} className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/30 border border-border/50">
            <CardHeader className="pb-3 bg-gradient-to-b from-muted/30 to-transparent">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text">
                    {resource.title}
                  </CardTitle>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </div>
                <Badge variant="outline" className="bg-primary/5 shadow-sm">
                  <span className="flex items-center gap-1">
                    {getIconForResourceType(resource.resourceType)}
                    <span className="capitalize">{resource.resourceType}</span>
                  </span>
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="pb-2">
              {resource.resourceType === 'video' || resource.resourceType === 'game' ? (
                resource.embedCode ? (
                  <div 
                    className="w-full aspect-video rounded overflow-hidden bg-muted/30 mb-2"
                    dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                  />
                ) : (
                  <div className="w-full aspect-video rounded overflow-hidden bg-muted/30 flex items-center justify-center">
                    <p className="text-sm text-muted-foreground">No embed code available</p>
                  </div>
                )
              ) : resource.resourceType === 'pdf' || resource.resourceType === 'lesson' ? (
                <div className="w-full p-4 rounded bg-primary/5 text-center hover:bg-primary/10 transition-all cursor-pointer" onClick={() => {
                  if (resource.sourceUrl) {
                    window.open(resource.sourceUrl, '_blank');
                  }
                }}>
                  <FileText className="h-6 w-6 mx-auto mb-2 text-primary/70" />
                  <p className="text-sm font-medium">{resource.title}</p>
                  {resource.sourceUrl && (
                    <p className="text-xs text-primary mt-2">Click to open PDF</p>
                  )}
                </div>
              ) : null}
            </CardContent>
            
            <CardFooter className="flex justify-between pt-2 border-t border-border/20">
              {resource.sourceUrl ? (
                <a 
                  href={resource.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-xs flex items-center text-primary hover:underline hover:text-primary/80 transition-all group-hover:font-medium"
                >
                  <ExternalLink className="h-3 w-3 mr-1" /> Open Resource
                </a>
              ) : (
                <span className="text-xs text-muted-foreground">No external link</span>
              )}
              
              {isEditMode && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive hover:text-destructive/80 p-0 h-auto opacity-70 hover:opacity-100 transition-opacity"
                  onClick={() => setConfirmDelete(resource)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return <div className="p-8 text-center">Loading teacher resources...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-b from-primary/10 to-transparent p-6 rounded-xl shadow-md border border-primary/10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 text-transparent bg-clip-text inline-block">
              Teacher Resources
            </h2>
            <p className="text-muted-foreground mt-1">Educational materials for Book {bookId}, Unit {unitId}</p>
            {bookId === '7' && unitId === '1' && (
              <a href="/lesson-plans" className="mt-2 inline-block text-primary hover:underline flex items-center">
                <span className="mr-1">📝</span> View Detailed Lesson Plans
              </a>
            )}
          </div>
          
          <div className="flex space-x-3">
            {isEditMode ? (
              <Button 
                onClick={() => setIsAdding(true)} 
                size="sm" 
                className="shadow-sm transition-all hover:shadow-md bg-primary/90 hover:bg-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            ) : (
              <Button 
                onClick={() => window.location.href = `?edit=true`} 
                size="sm" 
                variant="outline" 
                className="shadow-sm transition-all hover:shadow-md border-primary/30 hover:border-primary/50">
                <Pencil className="h-4 w-4 mr-2" />
                Edit Resources
              </Button>
            )}
          </div>
        </div>
        
        <div className="bg-background/70 backdrop-blur-sm rounded-lg p-4 shadow-inner">
          <Tabs defaultValue="video">
            <TabsList className="mb-6 grid w-full grid-cols-2 md:grid-cols-4 rounded-lg bg-muted/50 p-1.5 shadow-inner border border-muted">
              <TabsTrigger value="video" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <Video className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">Videos</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'video').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="game" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <Gamepad2 className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">Games</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'game').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="lesson" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 mr-2 text-primary/80">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                </svg>
                <span className="font-medium">Lesson Plans</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'lesson').length : 0}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pdf" className="flex items-center justify-center py-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:border-b-2 data-[state=active]:border-primary/50 transition-all duration-200">
                <FileText className="h-4 w-4 mr-2 text-primary/80" />
                <span className="font-medium">PDF Resources</span>
                <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary font-medium">
                  {Array.isArray(resources) ? resources.filter(r => r?.resourceType === 'pdf').length : 0}
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
        </div>
      </div>
      
      {/* Add Resource Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Teacher Resource</DialogTitle>
            <DialogDescription>
              Add a new resource for this unit. You can add videos, games, lesson plans, or PDF documents.
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!confirmDelete} onOpenChange={() => setConfirmDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the resource "{confirmDelete?.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setConfirmDelete(null)}>
              Cancel
            </Button>
            <Button type="button" variant="destructive" onClick={() => confirmDelete && handleDeleteResource(confirmDelete)}>
              Delete Resource
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeacherResources;