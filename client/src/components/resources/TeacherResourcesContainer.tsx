/**
 * TeacherResourcesContainer Component
 * 
 * This component is the main container for the TeacherResources feature.
 * It integrates the ResourceList, resource editing, and resource selection.
 */

import { useState } from 'react';
import { ResourceList } from './ResourceList';
import { v4 as uuidv4 } from 'uuid';
import { BookId, UnitId } from '@/types/content';
import { TeacherResource, ResourceType } from '@/types/resources';
import { useTeacherResources } from '@/hooks/useTeacherResources';
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
import { Button } from '@/components/ui/button';
import { 
  BookIcon, 
  LibraryIcon,
} from 'lucide-react';

// Define props for the container component
interface TeacherResourcesContainerProps {
  initialBookId?: BookId;
  initialUnitId?: UnitId;
  showSelection?: boolean;
  enableEditing?: boolean;
  readOnly?: boolean;
  showEmptyState?: boolean;
}

// Available book IDs for selection
const availableBookIds: BookId[] = [
  '1', '2', '3', '4', '5', '6', '7'
];

// Function to get book title
function getBookTitle(bookId: BookId): string {
  return `Book ${bookId}`;
}

// Function to get unit title
function getUnitTitle(unitId: UnitId): string {
  return `Unit ${unitId}`;
}

export function TeacherResourcesContainer({
  initialBookId,
  initialUnitId,
  showSelection = true,
  enableEditing = false,
  readOnly = false,
  showEmptyState = false
}: TeacherResourcesContainerProps) {
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
    initialUnitId
  });

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
  const handleAddResource = () => {
    if (!bookId || !unitId) return;
    
    const newResource: TeacherResource = {
      id: uuidv4(),
      title: 'New Resource',
      description: 'Resource description',
      resourceType: 'video',
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
    if (resourceToDelete) {
      removeResource(resourceToDelete.id);
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

  return (
    <div className="flex flex-col space-y-4">
      {/* Error message */}
      {error && (
        <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-md mb-4">
          <h3 className="font-semibold">Error loading resources</h3>
          <p>{error.message}</p>
        </div>
      )}
      
      {/* Book and unit selection */}
      {showSelection && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Resource Selection</CardTitle>
            <CardDescription>
              Select a book and unit to view its resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Book</label>
                <Select 
                  value={bookId || ''} 
                  onValueChange={handleBookSelect}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBookIds.map((id) => (
                      <SelectItem key={id} value={id}>
                        {getBookTitle(id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex-1">
                <label className="text-sm font-medium mb-1 block">Unit</label>
                <Select
                  value={unitId || ''}
                  onValueChange={handleUnitSelect}
                  disabled={!bookId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {bookId && getAvailableUnits(bookId).map((id) => (
                      <SelectItem key={id} value={id}>
                        {getUnitTitle(id)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* No Selection State */}
      {showNoSelectionState ? (
        <Card className="border-dashed">
          <CardContent className="pt-8 pb-8 flex flex-col items-center justify-center text-center">
            <LibraryIcon className="h-12 w-12 mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">No Resources Selected</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Select a book and unit to view its teacher resources, or use the 
              filters to find specific types of resources.
            </p>
            {showSelection ? (
              <p className="text-sm text-muted-foreground">
                Use the selection controls above to choose a book and unit.
              </p>
            ) : (
              <Button 
                variant="outline" 
                onClick={() => {
                  setBookId('1' as BookId);
                  setUnitId('1' as UnitId);
                }}
              >
                <BookIcon className="mr-2 h-4 w-4" />
                View Example Resources
              </Button>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Resource List */
        <Card>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>
                  {bookId && unitId ? (
                    <>
                      {getBookTitle(bookId)} {getUnitTitle(unitId)} Resources
                      {bookId === '3' && unitId === '16' && (
                        <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Sports
                        </span>
                      )}
                      {bookId === '3' && unitId === '17' && (
                        <span className="ml-2 text-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Household Chores
                        </span>
                      )}
                    </>
                  ) : (
                    'Teacher Resources'
                  )}
                </CardTitle>
                <CardDescription>
                  {resources.length} resources available
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <ResourceList
              resources={filteredResources}
              onSearch={setSearchQuery}
              onFilterByType={setResourceTypeFilter}
              selectedType={filter.resourceType}
              searchQuery={filter.searchQuery}
              isLoading={isLoading}
              readOnly={readOnly}
              onAddResource={enableEditing ? handleAddResource : undefined}
              onEditResource={enableEditing ? handleEditResource : undefined}
              onDeleteResource={enableEditing ? handleDeleteResource : undefined}
            />
          </CardContent>
        </Card>
      )}
      
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the resource 
              "{resourceToDelete?.title}". This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}