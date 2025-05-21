/**
 * TeacherResourcesContainer Component
 * 
 * This component is the main container for the TeacherResources feature.
 * It integrates the ResourceList, resource editing, and resource selection.
 */

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResourceList } from './ResourceList';
import { v4 as uuidv4 } from 'uuid';
import { BookId, UnitId } from '@/types/content';
import { TeacherResource, ResourceType, ResourceFilter } from '@/types/TeacherResource';
import { useTeacherResources } from '@/hooks/useTeacherResources';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { LessonPlanTemplate } from './LessonPlanTemplate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
// Fixed imports for Lucide icons to prevent duplicates
import { FileText, Book, Library, ArrowRight, Layout, Video, Gamepad2, FileIcon, CheckCircle, Clock } from 'lucide-react';

// Define props for the container component
interface TeacherResourcesContainerProps {
  initialBookId?: BookId;
  initialUnitId?: UnitId;
  initialFilter?: ResourceFilter;
  showSelection?: boolean;
  enableEditing?: boolean;
  readOnly?: boolean;
  showEmptyState?: boolean;
  hideTabsInContentViewer?: boolean; // Hide tabs when component is in SimpleContentViewer
}

// Available book IDs for selection
const availableBookIds: BookId[] = [
  '1', '2', '3', '4', '5', '6', '7'
];

export function TeacherResourcesContainer({
  initialBookId,
  initialUnitId,
  initialFilter,
  showSelection = true,
  enableEditing = false,
  readOnly = false,
  showEmptyState = false,
  hideTabsInContentViewer = false
}: TeacherResourcesContainerProps) {
  // Tab state
  const [activeTab, setActiveTab] = useState<string>('videos');

  // Use the hook to manage resources
  const {
    resources,
    filteredResources,
    bookId,
    unitId,
    setBookId,
    setUnitId,
    isLoading,
    error,
    filter,
    setFilter,
    setResourceTypeFilter,
    setSearchQuery,
    updateResource,
    removeResource,
    addResource
  } = useTeacherResources({
    initialBookId,
    initialUnitId,
    initialFilter
  });
  
  // Ensure that we always show all four main tabs regardless of resource availability
  // This is to maintain consistency across all books/units

  // Resource editing state
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [resourceToDelete, setResourceToDelete] = useState<TeacherResource | null>(null);
  
  // Get available units for the selected book
  const getAvailableUnits = (bookId: BookId): UnitId[] => {
    let unitCount = 18; // Default for Books 1-3
    
    if (bookId === '0a' || bookId === '0b' || bookId === '0c') {
      unitCount = 20;
    } else if (['4', '5', '6', '7'].includes(bookId)) {
      unitCount = 16;
    }
    
    return Array.from({ length: unitCount }, (_, i) => (i + 1).toString() as UnitId);
  };

  // Handle book selection
  const handleBookSelect = (value: string) => {
    setBookId(value as BookId);
  };
  
  // Handle unit selection
  const handleUnitSelect = (value: string) => {
    setUnitId(value as UnitId);
  };
  
  // Handle adding a new resource
  const handleAddResource = (type: 'video' | 'game') => {
    if (!bookId || !unitId) return;
    
    const newResource: TeacherResource = {
      id: uuidv4(),
      title: `New ${type === 'video' ? 'Video' : 'Game'} Resource`,
      description: `${type === 'video' ? 'Video' : 'Game'} description`,
      resourceType: type,
      bookId,
      unitId
    };
    
    addResource(newResource);
  };
  
  // Handle editing a resource
  const handleEditResource = (resource: TeacherResource) => {
    // In a real application, this would open a form modal
    console.log('Edit resource:', resource);
  };
  
  // Handle delete resource
  const handleDeleteResource = (resource: TeacherResource) => {
    setResourceToDelete(resource);
    setIsDeleteDialogOpen(true);
  };
  
  // Handle deletion confirmation
  const handleDeleteConfirm = () => {
    if (resourceToDelete && resourceToDelete.id) {
      // Cast to string to satisfy the TypeScript requirement
      removeResource(resourceToDelete.id as string);
      setResourceToDelete(null);
      setIsDeleteDialogOpen(false);
    }
  };
  
  // Handle delete dialog cancel
  const handleDeleteCancel = () => {
    setResourceToDelete(null);
    setIsDeleteDialogOpen(false);
  };
  
  // Determine if we should show the no-selection empty state
  const showNoSelectionState = showEmptyState || (!bookId && !unitId);

  // Filter resources by type for each tab
  const videoResources = resources.filter(r => r.resourceType === 'video');
  const gameResources = resources.filter(r => r.resourceType === 'game');
  const pdfResources = resources.filter(r => r.resourceType === 'pdf');
  const lessonResources = resources.filter(r => r.resourceType === 'lessonPlan' || r.resourceType === 'lesson');
  
  // For PDF resources, only show the ones that match the current unit (but keep the tab visible)
  const filteredPdfResources = pdfResources.filter(r => r.unitId === unitId).map(r => ({
    ...r,
    currentUnitId: unitId  // Add current unit ID to each resource for comparison
  }));

  return (
    <div className="flex flex-col space-y-4">
      {/* Error message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-4">
          <h3 className="font-semibold">Error loading resources</h3>
          <p>{error.message}</p>
        </div>
      )}
      
      {/* No Selection State */}
      {showNoSelectionState ? (
        <div className="flex flex-col items-center justify-center text-center p-8 bg-muted/10 rounded-lg border border-dashed">
          <Library className="h-12 w-12 mb-4 text-muted-foreground" />
          <h3 className="text-lg font-medium mb-2">No Resources Selected</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            Please select a book and unit to view its teacher resources.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setBookId('1' as BookId);
              setUnitId('1' as UnitId);
            }}
          >
            <Book className="mr-2 h-4 w-4" />
            View Example Resources
          </Button>
        </div>
      ) : (
        /* Resource Tabs */
        <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full bg-muted/30">
            <TabsTrigger value="videos" className="flex items-center gap-1">
              <Video className="h-4 w-4" />
              <span>Videos</span>
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center gap-1">
              <Gamepad2 className="h-4 w-4" />
              <span>Games</span>
            </TabsTrigger>
            <TabsTrigger value="pdfs" className="flex items-center gap-1">
              <FileIcon className="h-4 w-4" />
              <span>PDFs</span>
            </TabsTrigger>
            <TabsTrigger value="lessons" className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              <span>Lessons</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Videos Tab */}
          <TabsContent value="videos">
            <ResourceList
              resources={videoResources}
              isLoading={isLoading}
              readOnly={readOnly}
              onAddResource={enableEditing ? () => handleAddResource('video') : undefined}
              onEditResource={enableEditing ? handleEditResource : undefined}
              onDeleteResource={enableEditing ? handleDeleteResource : undefined}
              hideTabsInContentViewer={hideTabsInContentViewer}
            />
          </TabsContent>
          
          {/* Games Tab */}
          <TabsContent value="games">
            <ResourceList
              resources={gameResources}
              isLoading={isLoading}
              readOnly={readOnly}
              onAddResource={enableEditing ? () => handleAddResource('game') : undefined}
              onEditResource={enableEditing ? handleEditResource : undefined}
              onDeleteResource={enableEditing ? handleDeleteResource : undefined}
              hideTabsInContentViewer={hideTabsInContentViewer}
            />
          </TabsContent>
          
          {/* PDFs Tab */}
          <TabsContent value="pdfs">
            <ResourceList
              resources={filteredPdfResources}
              isLoading={isLoading}
              readOnly={readOnly}
              onEditResource={enableEditing ? handleEditResource : undefined}
              onDeleteResource={enableEditing ? handleDeleteResource : undefined}
              hideTabsInContentViewer={hideTabsInContentViewer}
            />
          </TabsContent>
          
          {/* Lessons Tab */}
          <TabsContent value="lessons">
            <ResourceList
              resources={lessonResources}
              isLoading={isLoading}
              readOnly={readOnly}
              onEditResource={enableEditing ? handleEditResource : undefined}
              onDeleteResource={enableEditing ? handleDeleteResource : undefined}
              hideTabsInContentViewer={hideTabsInContentViewer}
            />
            
            {/* Fallback content when no lesson resources are available */}
            {lessonResources.length === 0 && !isLoading && (
              <div className="space-y-4 mt-4">
                {/* Side by Side Lesson Plans */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Green Lesson Plan on Left */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-emerald-500 text-white p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <h3 className="text-lg font-medium">Hello Lesson Plan</h3>
                      </div>
                      <div className="bg-white text-emerald-500 px-3 py-1 rounded-full text-sm font-medium">
                        45 minutes
                      </div>
                    </div>
                  
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Objectives:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Learn vocabulary related to hello</li>
                          <li>Practice speaking and listening skills</li>
                          <li>Engage in interactive activities</li>
                        </ul>
                      </div>
                    
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Lesson Steps:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Warm-up: Introduction to hello vocabulary</p>
                              <p className="text-xs text-gray-500">(5-7 minutes)</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Main Activity: Interactive practice</p>
                              <p className="text-xs text-gray-500">(20-25 minutes)</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="bg-emerald-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-emerald-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Game/Activity: Reinforcement</p>
                              <p className="text-xs text-gray-500">(10 minutes)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Blue Lesson Plan on Right */}
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-blue-500 text-white p-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        <h3 className="text-lg font-medium">Greetings Lesson Plan</h3>
                      </div>
                      <div className="bg-white text-blue-500 px-3 py-1 rounded-full text-sm font-medium">
                        45 minutes
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Objectives:</h4>
                        <ul className="list-disc pl-5 space-y-1 text-sm">
                          <li>Learn different greetings for various times of day</li>
                          <li>Practice conversation skills with partners</li>
                          <li>Create greeting cards for practice</li>
                        </ul>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Lesson Steps:</h4>
                        <div className="space-y-3">
                          <div className="flex items-start gap-2">
                            <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Warm-up: Good morning song</p>
                              <p className="text-xs text-gray-500">(5 minutes)</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Main Activity: Greeting practice</p>
                              <p className="text-xs text-gray-500">(20 minutes)</p>
                            </div>
                          </div>
                          
                          <div className="flex items-start gap-2">
                            <div className="bg-blue-100 rounded-full p-1 mt-0.5">
                              <CheckCircle className="h-4 w-4 text-blue-500" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">Wrap-up: Greeting cards craft</p>
                              <p className="text-xs text-gray-500">(15 minutes)</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Resource</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this resource? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}