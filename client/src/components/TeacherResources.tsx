import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';
import { getQueryFn, apiRequest, queryClient } from '@/lib/queryClient';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

// Import resources for Book 7, Unit 6
import { unit6Resources, britishCurrencyLessonPlan, internationalMoneyLessonPlan, spendingSavingLessonPlan } from '@/data/unit6-resources';

// Add CSS for responsive grid layout
import "@/styles/teacher-resources-grid.css";
import { Gamepad2, Video, FileText, Pencil, Trash2, Plus, ExternalLink, Book, Printer, Image, PenLine, CheckCircle, Maximize2 } from 'lucide-react';
import LessonPlanTemplate, { LessonPlan } from '@/components/LessonPlanTemplate';
import PDFViewer from '@/components/PDFViewer';

// Import Unit implementations
import { getUnit6LessonPlans, getUnit6Resources } from '@/data/unit6-implementation';
import { getUnit7LessonPlans, getUnit7Resources } from '@/data/unit7-implementation';
import { getUnit8LessonPlans, getUnit8Resources } from '@/data/unit8-implementation';
import { getUnit9LessonPlans, getUnit9Resources } from '@/data/unit9-implementation';
import { getUnit10LessonPlans, getUnit10Resources } from '@/data/unit10-implementation';
import { getUnit11LessonPlans, getUnit11Resources } from '@/data/unit11-implementation';
import { getUnit12LessonPlans, getUnit12Resources } from '@/data/unit12-implementation';
import { getUnit13LessonPlans, getUnit13Resources } from '@/data/unit13-implementation';
import { getUnit14LessonPlans, getUnit14Resources } from '@/data/unit14-implementation';
import { getUnit15LessonPlans, getUnit15Resources } from '@/data/unit15-implementation';
import { getUnit16LessonPlans, getUnit16Resources } from '@/data/unit16-implementation';

// Book 6 implementations
import { getBook6Unit1LessonPlans, getBook6Unit1Resources } from '@/data/book6-unit1-implementation';
import { getBook6Unit2LessonPlans, getBook6Unit2Resources } from '@/data/book6-unit2-implementation';
import { getBook6Unit3LessonPlans, getBook6Unit3Resources } from '@/data/book6-unit3-implementation';
import { getBook6Unit4LessonPlans, getBook6Unit4Resources } from '@/data/book6-unit4-implementation';
import { getBook6Unit5LessonPlans, getBook6Unit5Resources } from '@/data/book6-unit5-implementation';
import { getBook6Unit6LessonPlans, getBook6Unit6Resources } from '@/data/book6-unit6-implementation';
import { getBook6Unit7LessonPlans, getBook6Unit7Resources } from '@/data/book6-unit7-implementation';

// Book 6 resources (direct imports)
import { book6Unit1Resources } from '@/data/book6-unit1-resources';
import { book6Unit2Resources } from '@/data/book6-unit2-resources';
import { book6Unit3Resources } from '@/data/book6-unit3-resources';
import { book6Unit4Resources } from '@/data/book6-unit4-resources';
import { book6Unit5Resources } from '@/data/book6-unit5-resources';
import { book6Unit6Resources } from '@/data/book6-unit6-resources';
import { book6Unit7Resources } from '@/data/book6-unit7-resources';

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
  lessonPlan?: LessonPlan;
}

interface TeacherResourcesProps {
  bookId: string;
  unitId: string;
}

// Kahoot AI-generated thumbnail component
const KahootThumbnail = ({ title }: { title: string }) => {
  // Generate random pastel background color
  const getRandomPastel = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`;
  };

  return (
    <div 
      className="aspect-video w-full rounded-md flex flex-col items-center justify-center text-center p-6"
      style={{ background: getRandomPastel() }}
    >
      <div className="bg-white/90 p-4 rounded-lg shadow-md w-full max-w-xs">
        <div className="flex justify-center mb-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-purple-500 rounded-md h-12 w-12"></div>
            <div className="bg-red-500 rounded-md h-12 w-12"></div>
            <div className="bg-blue-500 rounded-md h-12 w-12"></div>
            <div className="bg-yellow-500 rounded-md h-12 w-12"></div>
          </div>
        </div>
        <h3 className="font-bold text-sm mb-1">KAHOOT!</h3>
        <p className="text-xs font-medium text-gray-800">{title}</p>
        <div className="mt-3 text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white py-1 px-3 rounded-full inline-block">
          Play Now
        </div>
      </div>
    </div>
  );
};

const TeacherResources = ({ bookId, unitId }: TeacherResourcesProps) => {
  const { toast } = useToast();
  const urlParams = new URLSearchParams(window.location.search);
  const [isEditMode, setIsEditMode] = useState(urlParams.get('edit') === 'true');
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [customResources, setCustomResources] = useState<TeacherResource[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TeacherResource | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [viewingPdf, setViewingPdf] = useState<TeacherResource | null>(null);
  const [newResource, setNewResource] = useState<TeacherResource>({
    bookId,
    unitId,
    title: '',
    resourceType: 'video',
    provider: '',
    sourceUrl: '',
    embedCode: '',
  });
  
  // Check if this is a special book/unit with predefined resources
  const isSpecialBookUnit = (bookId === '7' || bookId === '6') && 
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'].includes(unitId);
    
  // Create custom constants for specific books and units to check for special resources
  const isBook7Unit6 = bookId === '7' && unitId === '6';
  
  // Handle initial data loading - bookUnitResources, local storage resources
  const { data: bookUnitResources = [], isLoading, error } = useQuery<TeacherResource[]>({
    queryKey: [`/api/teacher-resources/${bookId}/${unitId}`],
    queryFn: getQueryFn<TeacherResource[]>({ on401: "returnNull" }),
  });

  // Mutation to add a new resource
  const addResourceMutation = useMutation({
    mutationFn: async (newResource: TeacherResource) => {
      const formData = new FormData();
      
      // Add file if available
      if (uploadedFile) {
        formData.append('file', uploadedFile);
      }
      
      // Add other resource data
      formData.append('data', JSON.stringify(newResource));
      
      return apiRequest('POST', `/api/teacher-resources/${bookId}/${unitId}`, formData, { isFormData: true });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      setIsAdding(false);
      setEditingResource(null);
      setUploadedFile(null);
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
      toast({
        title: 'Success',
        description: 'Resource added successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to add resource: ' + (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  // Mutation to delete a resource
  const deleteResourceMutation = useMutation({
    mutationFn: async (resource: TeacherResource) => {
      if (!resource.id) return;
      return apiRequest('DELETE', `/api/teacher-resources/${bookId}/${unitId}/${resource.id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/teacher-resources/${bookId}/${unitId}`] });
      setConfirmDelete(null);
      toast({
        title: 'Success',
        description: 'Resource deleted successfully.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: 'Failed to delete resource: ' + (error as Error).message,
        variant: 'destructive',
      });
    },
  });

  // Effect to reset form when editing resource changes
  useEffect(() => {
    if (editingResource) {
      setNewResource(editingResource);
    } else {
      setNewResource({
        bookId,
        unitId,
        title: '',
        resourceType: 'video',
        provider: '',
        sourceUrl: '',
        embedCode: '',
      });
    }
  }, [editingResource, bookId, unitId]);

  // Effect to set initial resources from API data only when they change
  useEffect(() => {
    // Use a ref to track if this is the initial render
    const resourcesJSON = JSON.stringify(bookUnitResources);
    const currentResourcesJSON = JSON.stringify(resources);
    
    // Only update if the new resources are different from current resources
    if (resourcesJSON !== currentResourcesJSON) {
      setResources(bookUnitResources || []);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookUnitResources]);  // Intentionally omit resources to prevent infinite loop

  // Function to get additional resources for specific book/unit combinations
  const getMoreUnitResources = useCallback((): TeacherResource[] => {
    // Resources for Book 7, Unit 4 - Accommodation
    if (bookId === '7' && unitId === '4') {
      return [
        {
          id: "book7-unit4-pdf1",
          bookId,
          unitId,
          title: "Book 7 - Unit 4 Overview",
          resourceType: "pdf" as const,
          provider: "Visual English",
          sourceUrl: "https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book7/unit4/00%20A%20Book%207%20%E2%80%93%20Unit%204.pdf",
          embedCode: ""
        },
        {
          id: "book7-unit4-video1",
          bookId,
          unitId,
          title: "Accommodation Types",
          resourceType: "video" as const,
          provider: "YouTube",
          sourceUrl: "https://www.youtube.com/embed/I2t7h8XZC8A",
          embedCode: `<iframe width="560" height="315" src="https://www.youtube.com/embed/I2t7h8XZC8A?si=zYsHv0JsKf3VnYC4" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game1",
          bookId,
          unitId,
          title: "Accommodation Types Game",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/abe4d3f5a38b4ebfa7b2183c8adfdf1c",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/abe4d3f5a38b4ebfa7b2183c8adfdf1c?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game2",
          bookId,
          unitId,
          title: "Hotel Room Features",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/f1d6bb00c7f942d29b1efa5c2f94073f",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/f1d6bb00c7f942d29b1efa5c2f94073f?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        },
        {
          id: "book7-unit4-game3",
          bookId,
          unitId,
          title: "Hotel Vocabulary",
          resourceType: "game" as const,
          provider: "Wordwall",
          sourceUrl: "https://wordwall.net/resource/ead2718ebb544050a5077cc541d2e2a2",
          embedCode: `<iframe style="max-width:100%" src="https://wordwall.net/embed/ead2718ebb544050a5077cc541d2e2a2?themeId=1&templateId=3&fontStackId=0" width="500" height="380" frameborder="0" allowfullscreen></iframe>`
        }
      ];
    }

    // Resources for Book 7, Unit 6 - Money
    if (isBook7Unit6) {
      // Using resources from unit6-implementation.tsx
      try {
        return getUnit6Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 6 resources:', error);
        return [];
      }
    }

    // Resources for Book 7, Unit 7 - DIY & Tools
    if (bookId === '7' && unitId === '7') {
      // Using resources from unit7-implementation.tsx
      try {
        return getUnit7Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 7 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 8 - Musical Instruments
    if (bookId === '7' && unitId === '8') {
      // Using resources from unit8-implementation.tsx
      try {
        return getUnit8Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 8 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 9 - Jobs
    if (bookId === '7' && unitId === '9') {
      // Using resources from unit9-implementation.tsx
      try {
        return getUnit9Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 9 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 10 - Sports
    if (bookId === '7' && unitId === '10') {
      // Using resources from unit10-implementation.tsx
      try {
        return getUnit10Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 10 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 11 - Natural Disasters
    if (bookId === '7' && unitId === '11') {
      // Using resources from unit11-implementation.tsx
      try {
        return getUnit11Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 11 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 12 - Healthy Lifestyle
    if (bookId === '7' && unitId === '12') {
      // Using resources from unit12-implementation.tsx
      try {
        return getUnit12Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 12 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 13 - City Tour
    if (bookId === '7' && unitId === '13') {
      // Using resources from unit13-implementation.tsx
      try {
        return getUnit13Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 13 resources:', error);
        return [];
      }
    }

    // Resources for Book 7, Unit 14 - Climate Change
    if (bookId === '7' && unitId === '14') {
      // Using resources from unit14-implementation.tsx
      try {
        return getUnit14Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 14 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 15 - Holidays and Festivals
    if (bookId === '7' && unitId === '15') {
      // Using resources from unit15-implementation.tsx
      try {
        return getUnit15Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 15 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 7, Unit 16 - Food and Cuisine
    if (bookId === '7' && unitId === '16') {
      // Using resources from unit16-implementation.tsx
      try {
        return getUnit16Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Unit 16 resources:', error);
        return [];
      }
    }
    
    // Book 6 Units
    // Resources for Book 6, Unit 1 - Jobs and Occupations
    if (bookId === '6' && unitId === '1') {
      try {
        console.log('Loading Book 6 Unit 1 resources');
        // Use the getBook6Unit1Resources function from the implementation file
        return getBook6Unit1Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Book 6 Unit 1 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 2 - Household Appliances
    if (bookId === '6' && unitId === '2') {
      try {
        console.log('Loading Book 6 Unit 2 resources');
        // Use the getBook6Unit2Resources function from the implementation file
        return getBook6Unit2Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Book 6 Unit 2 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 3 - Future
    if (bookId === '6' && unitId === '3') {
      try {
        console.log('Loading Book 6 Unit 3 resources');
        // Use the getBook6Unit3Resources function from the implementation file
        return getBook6Unit3Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Book 6 Unit 3 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 4 - Animal Classification
    if (bookId === '6' && unitId === '4') {
      try {
        console.log('Loading Book 6 Unit 4 resources');
        // Use the getBook6Unit4Resources function from the implementation file
        return getBook6Unit4Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Book 6 Unit 4 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 5 - Theme Park Stalls
    if (bookId === '6' && unitId === '5') {
      try {
        console.log('Loading Book 6 Unit 5 resources');
        // Use the getBook6Unit5Resources function from the implementation file
        return getBook6Unit5Resources(bookId, unitId);
      } catch (error) {
        console.error('Error getting Book 6 Unit 5 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 6 - In the Kitchen
    if (bookId === '6' && unitId === '6') {
      try {
        console.log('Loading Book 6 Unit 6 resources');
        // Use the getBook6Unit6Resources function from the implementation file
        return getBook6Unit6Resources();
      } catch (error) {
        console.error('Error getting Book 6 Unit 6 resources:', error);
        return [];
      }
    }
    
    // Resources for Book 6, Unit 7 - What Your Body Can Do
    if (bookId === '6' && unitId === '7') {
      try {
        console.log('Loading Book 6 Unit 7 resources');
        // Use the getBook6Unit7Resources function from the implementation file
        return getBook6Unit7Resources();
      } catch (error) {
        console.error('Error getting Book 6 Unit 7 resources:', error);
        return [];
      }
    }
    
    // If no specific resources, return an empty array
    return [];
  }, [bookId, unitId]);

  // Function to render resources based on type
  const renderResources = (resourceType: 'video' | 'game' | 'pdf' | 'lesson') => {
    // Get all resources of the specified type
    const allResources = [...resources, ...getMoreUnitResources()]
      .filter(r => r.resourceType === resourceType);

    // Return early if there are no resources
    if (allResources.length === 0) {
      return (
        <div className="py-8 text-center text-muted-foreground">
          No {resourceType === 'pdf' ? 'PDF' : resourceType} resources available for this unit.
          {isEditMode && <div className="mt-2">Click "Add Resource" to add one.</div>}
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {allResources.map((resource, index) => {
          if (resourceType === 'video') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <Video className="h-3 w-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div 
                      className="aspect-video w-full rounded overflow-hidden bg-muted" 
                      dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                    />
                  ) : (
                    <div className="aspect-video w-full rounded overflow-hidden bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <Video className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Video preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => window.open(resource.sourceUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Watch Source
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }
          
          if (resourceType === 'game') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <Gamepad2 className="h-3 w-3 mr-1" />
                      Game
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  {resource.embedCode ? (
                    <div 
                      className="w-full rounded overflow-hidden bg-muted" 
                      dangerouslySetInnerHTML={{ __html: resource.embedCode }}
                    />
                  ) : resource.provider?.toLowerCase().includes('kahoot') ? (
                    <KahootThumbnail title={resource.title} />
                  ) : (
                    <div className="aspect-video w-full rounded overflow-hidden bg-muted flex items-center justify-center">
                      <div className="text-center p-4">
                        <Gamepad2 className="h-10 w-10 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Game preview not available</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {resource.sourceUrl && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => window.open(resource.sourceUrl, '_blank')}
                    >
                      <ExternalLink className="h-3 w-3 mr-2" />
                      Play Game
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }

          if (resourceType === 'pdf' || resourceType === 'lesson') {
            return (
              <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <Badge variant="outline" className="ml-2">
                      <FileText className="h-3 w-3 mr-1" />
                      {resourceType === 'pdf' ? 'PDF' : 'Lesson'}
                    </Badge>
                  </div>
                  {resource.provider && (
                    <CardDescription className="text-xs">
                      Provider: {resource.provider}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="rounded overflow-hidden mb-4 border bg-white hover:shadow-md transition-all cursor-pointer"
                       onClick={() => resource.fileUrl && setViewingPdf(resource)}
                  >
                    <div className="p-4 flex flex-col items-center">
                      <div className="bg-muted/20 w-16 h-24 flex items-center justify-center rounded mb-3 border relative overflow-hidden hover:border-primary/50 transition-all">
                        <FileText className="h-8 w-8 text-primary/60" />
                        <div className="absolute bottom-0 left-0 right-0 bg-primary/10 text-center text-xs py-1 font-medium">PDF</div>
                      </div>
                      <h4 className="text-sm font-medium text-center mb-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground text-center">{resource.provider || 'Visual English'}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between bg-muted/20 pt-3 pb-3">
                  {(resource.fileUrl || resource.sourceUrl) && (
                    <Button 
                      variant="secondary" 
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        if (resource.fileUrl) {
                          setViewingPdf(resource);
                        } else if (resource.sourceUrl) {
                          window.open(resource.sourceUrl, '_blank');
                        }
                      }}
                    >
                      {resource.fileUrl ? (
                        <>
                          <Maximize2 className="h-3 w-3 mr-2" />
                          View PDF
                        </>
                      ) : (
                        <>
                          <ExternalLink className="h-3 w-3 mr-2" />
                          View Resource
                        </>
                      )}
                    </Button>
                  )}
                  {isEditMode && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="ml-2 text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          }
          
          return null;
        })}
      </div>
    );
  };

  const renderLessonPlans = () => {
    // First, check if there are any lesson plans specifically for this book/unit in the resources list
    const lessonPlansFromResources = resources.filter(r => r.resourceType === 'lesson');
    
    // If there are any lesson plans in resources, render them first
    const resourceLessonPlans = lessonPlansFromResources.length > 0 ? (
      <div className="mt-6 mb-10">
        <h3 className="text-lg font-semibold mb-4">Uploaded Lesson Plans</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {lessonPlansFromResources.map((resource, index) => (
            <Card key={resource.id || index} className="overflow-hidden hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                  <Badge variant="outline" className="ml-2">
                    <FileText className="h-3 w-3 mr-1" />
                    Lesson Plan
                  </Badge>
                </div>
                {resource.provider && (
                  <CardDescription className="text-xs">
                    Provider: {resource.provider}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pt-0">
                {resource.fileUrl && (
                  <div className="rounded overflow-hidden mb-4 border bg-white hover:shadow-md transition-all">
                    <div className="p-4 flex flex-col items-center">
                      <a 
                        href={resource.fileUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="cursor-pointer"
                      >
                        <div className="bg-muted/20 w-24 h-32 flex items-center justify-center rounded mb-3 border relative overflow-hidden hover:border-primary/50 transition-all">
                          <FileText className="h-12 w-12 text-primary/60" />
                          <div className="absolute bottom-0 left-0 right-0 bg-primary/10 text-center text-xs py-1 font-medium">PDF</div>
                        </div>
                      </a>
                      <h4 className="text-sm font-medium text-center mb-1">{resource.title}</h4>
                      <p className="text-xs text-muted-foreground mb-3 text-center">Provider: {resource.provider || 'Visual English'}</p>
                      <Button 
                        size="sm"
                        variant="default" 
                        className="w-full mt-2 bg-primary/90 hover:bg-primary"
                        onClick={() => window.open(resource.fileUrl, '_blank')}
                      >
                        <FileText className="h-3 w-3 mr-2" />
                        View Lesson Plan
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="bg-muted/20 pt-3 pb-3">
                <div className="w-full flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Created with Visual English</span>
                  {isEditMode && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => setConfirmDelete(resource)}
                    >
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  )}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    ) : null;

    // Now render the built-in lesson plans depending on book and unit
    let builtInLessonPlans = null;
    
    // Book 6 Unit 5 - Theme Park Stalls lesson plans
    if (bookId === '6' && unitId === '5') {
      // Get Book 6 Unit 5 lesson plans
      let themeParkPlans: LessonPlan[] = [];
      try {
        themeParkPlans = getBook6Unit5LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 5 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Theme Park Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {themeParkPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `theme-park-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 6 - In the Kitchen lesson plans
    if (bookId === '6' && unitId === '6') {
      // Get Book 6 Unit 6 lesson plans
      let kitchenPlans: LessonPlan[] = [];
      try {
        kitchenPlans = getBook6Unit6LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 6 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Kitchen Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {kitchenPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `kitchen-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 6 Unit 7 - What Your Body Can Do lesson plans
    if (bookId === '6' && unitId === '7') {
      // Get Book 6 Unit 7 lesson plans
      let bodyPlans: LessonPlan[] = [];
      try {
        bodyPlans = getBook6Unit7LessonPlans();
      } catch (error) {
        console.error('Error getting Book 6 Unit 7 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Body Movement Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {bodyPlans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `body-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Book 7 Units specific lesson plans
    // Check if this book/unit combination has built-in lesson plans and render them if available
    if (isBook7Unit6) {
      // Get Unit 6 lesson plans
      let unit6Plans: LessonPlan[] = [];
      try {
        unit6Plans = getUnit6LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 6 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Money-Themed Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit6Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `money-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 7 - DIY & Tools lesson plans
    if (bookId === '7' && unitId === '7') {
      // Get Unit 7 lesson plans
      let unit7Plans: LessonPlan[] = [];
      try {
        unit7Plans = getUnit7LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 7 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">DIY & Tools Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit7Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `diy-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 8 - Musical Instruments lesson plans
    if (bookId === '7' && unitId === '8') {
      // Get Unit 8 lesson plans
      let unit8Plans: LessonPlan[] = [];
      try {
        unit8Plans = getUnit8LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 8 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Musical Instruments Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit8Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `music-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 9 - Jobs lesson plans
    if (bookId === '7' && unitId === '9') {
      // Get Unit 9 lesson plans
      let unit9Plans: LessonPlan[] = [];
      try {
        unit9Plans = getUnit9LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 9 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Jobs & Careers Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit9Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `jobs-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 10 - Sports lesson plans
    if (bookId === '7' && unitId === '10') {
      // Get Unit 10 lesson plans
      let unit10Plans: LessonPlan[] = [];
      try {
        unit10Plans = getUnit10LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 10 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Sports Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit10Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `sports-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 11 - Natural Disasters lesson plans
    else if (bookId === '7' && unitId === '11') {
      // Get Unit 11 lesson plans
      let unit11Plans: LessonPlan[] = [];
      try {
        unit11Plans = getUnit11LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 11 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Natural Disasters Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit11Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `natural-disasters-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 12 - Healthy Lifestyle lesson plans
    else if (bookId === '7' && unitId === '12') {
      // Get Unit 12 lesson plans
      let unit12Plans: LessonPlan[] = [];
      try {
        unit12Plans = getUnit12LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 12 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">Healthy Lifestyle Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit12Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `healthy-lifestyle-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Unit 13 - City Tour lesson plans
    else if (bookId === '7' && unitId === '13') {
      // Get Unit 13 lesson plans
      let unit13Plans: LessonPlan[] = [];
      try {
        unit13Plans = getUnit13LessonPlans();
      } catch (error) {
        console.error('Error getting Unit 13 lesson plans:', error);
      }
      
      builtInLessonPlans = (
        <div className="mt-6 space-y-8">
          <h3 className="text-lg font-semibold mb-4">City Tour Lesson Plans</h3>
          <div className="lesson-plan-grid">
            {unit13Plans.map((plan, index) => (
              <div key={index}>
                <Card className="h-full">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg truncate">
                          <span>{plan.title}</span>
                        </CardTitle>
                        <CardDescription className="text-xs mt-1">
                          45-minute lesson plan by Visual English
                        </CardDescription>
                      </div>
                      {isEditMode && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs flex items-center text-destructive" 
                          onClick={() => setConfirmDelete({ id: `city-tour-${index}`, title: plan.title, bookId, unitId, resourceType: 'lesson' } as TeacherResource)}
                        >
                          <Trash2 className="h-3 w-3 mr-1" />
                          Delete
                        </Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="max-h-[500px] overflow-y-auto">
                    <LessonPlanTemplate plan={plan} />
                  </CardContent>
                  <CardFooter className="bg-muted/20 pt-3 pb-3">
                    <Button variant="secondary" size="sm" className="w-full" onClick={() => window.print()}>
                      <Printer className="h-4 w-4 mr-2" /> Print Lesson Plan
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    // Return both resource plans and built-in plans
    return (
      <div className="space-y-8">
        {resourceLessonPlans}
        {builtInLessonPlans}
        {!resourceLessonPlans && !builtInLessonPlans && (
          <div className="py-8 text-center text-muted-foreground">
            No lesson plans available for this unit.
            {isEditMode && <div className="mt-2">Click "Add Resource" to add one.</div>}
          </div>
        )}
      </div>
    );
  };

  const handleNewResourceChange = (field: keyof TeacherResource, value: string) => {
    setNewResource(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddResource = async () => {
    if (!newResource.title) {
      toast({
        title: 'Missing Information',
        description: 'Please provide at least a title for the resource.',
        variant: 'destructive',
      });
      return;
    }

    addResourceMutation.mutate(newResource);
  };

  const handleDeleteResource = async (resource: TeacherResource) => {
    setConfirmDelete(null);
    deleteResourceMutation.mutate(resource);
  };

  if (isLoading) {
    return <div className="py-8 text-center">Loading resources...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col space-y-4">
        {/* Main Content Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">Teacher Resources for Book {bookId}, Unit {unitId}</h2>
          <div className="flex items-center gap-3 self-end md:self-auto">
            {isEditMode ? (
              <>
                <Button onClick={() => setIsAdding(true)} className="bg-green-600 hover:bg-green-700">
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

        {/* Tabs Navigation */}
        <Tabs defaultValue="videos">
          <TabsList className="mb-4">
            <TabsTrigger value="videos" className="flex items-center">
              <Video className="h-4 w-4 mr-2" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center">
              <Gamepad2 className="h-4 w-4 mr-2" />
              Games
            </TabsTrigger>
            <TabsTrigger value="materials" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              PDF Lesson
            </TabsTrigger>
            <TabsTrigger value="lessonplans" className="flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              45-min Lesson Plans
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos">
            {renderResources('video')}
          </TabsContent>

          <TabsContent value="games">
            {renderResources('game')}
          </TabsContent>

          <TabsContent value="materials">
            {/* Using the same grid layout for PDFs/Lessons */}
            {renderResources('pdf')}
            {renderResources('lesson')}
          </TabsContent>

          <TabsContent value="lessonplans">
            {renderLessonPlans()}
          </TabsContent>
        </Tabs>

        {/* Add Resource Dialog */}
        <Dialog open={isAdding} onOpenChange={setIsAdding}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{editingResource ? 'Edit Resource' : 'Add New Resource'}</DialogTitle>
              <DialogDescription>
                Complete the form below to add a new teacher resource for this unit.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Title:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.title} 
                  onChange={(e) => handleNewResourceChange('title', e.target.value)} 
                  placeholder="Resource title" 
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Type:</span>
                <div className="col-span-3">
                  <select 
                    className="w-full p-2 border rounded-md" 
                    value={newResource.resourceType} 
                    onChange={(e) => handleNewResourceChange('resourceType', e.target.value as any)}
                  >
                    <option value="video">Video</option>
                    <option value="game">Game</option>
                    <option value="lesson">Worksheet/Lesson</option>
                    <option value="pdf">PDF</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">Provider:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.provider || ''} 
                  onChange={(e) => handleNewResourceChange('provider', e.target.value)} 
                  placeholder="e.g., YouTube, Wordwall, etc." 
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <span className="text-right font-medium">URL:</span>
                <Input 
                  className="col-span-3" 
                  value={newResource.sourceUrl || ''} 
                  onChange={(e) => handleNewResourceChange('sourceUrl', e.target.value)} 
                  placeholder="External link to resource" 
                />
              </div>

              {(newResource.resourceType === 'video' || newResource.resourceType === 'game') && (
                <div className="grid grid-cols-4 items-start gap-4">
                  <span className="text-right font-medium">Embed Code:</span>
                  <textarea 
                    className="col-span-3 p-2 border rounded-md min-h-[100px]" 
                    value={newResource.embedCode || ''} 
                    onChange={(e) => handleNewResourceChange('embedCode', e.target.value)} 
                    placeholder="<iframe ...>" 
                  />
                </div>
              )}

              {(newResource.resourceType === 'pdf' || newResource.resourceType === 'lesson') && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <span className="text-right font-medium">File:</span>
                  <div className="col-span-3">
                    <Input 
                      type="file" 
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setUploadedFile(e.target.files[0]);
                        }
                      }} 
                    />
                    <p className="text-xs mt-1 text-muted-foreground">
                      {uploadedFile ? `Selected: ${uploadedFile.name}` : 'No file chosen'}
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              <Button onClick={handleAddResource}>Save Resource</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Confirm Delete Dialog */}
        <Dialog open={!!confirmDelete} onOpenChange={(open) => !open && setConfirmDelete(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Delete</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this resource? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDelete(null)}>Cancel</Button>
              <Button 
                variant="destructive" 
                onClick={() => confirmDelete && handleDeleteResource(confirmDelete)}
              >
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* PDF Viewer Dialog */}
        <Dialog 
          open={!!viewingPdf} 
          onOpenChange={(open) => !open && setViewingPdf(null)}
        >
          <DialogContent className="max-w-3xl w-[90vw] max-h-[90vh] overflow-hidden">
            <DialogHeader>
              <DialogTitle className="text-center mb-4">
                {viewingPdf?.title}
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto flex items-center justify-center">
              {viewingPdf?.fileUrl && (
                <PDFViewer pdfUrl={viewingPdf.fileUrl} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default TeacherResources;