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
import { TeacherResource, ResourceType, ResourceFilter } from '@/types/TeacherResource';
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
  FileText as FileTextIcon, 
  ArrowRight as ArrowRightIcon
} from 'lucide-react';
import { Link } from 'wouter';

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
  initialFilter,
  showSelection = true,
  enableEditing = false,
  readOnly = false,
  showEmptyState = false,
  hideTabsInContentViewer = false
}: TeacherResourcesContainerProps) {
  // Check if component is being rendered within SimpleContentViewer tabs
  // Video, game, and PDF resources are now supported
  const isInTabsView = hideTabsInContentViewer || (initialFilter && 
    ['video', 'game', 'pdf'].includes(initialFilter.resourceType || ''));
    
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
          <LibraryIcon className="h-12 w-12 mb-4 text-muted-foreground" />
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
            <BookIcon className="mr-2 h-4 w-4" />
            View Example Resources
          </Button>
        </div>
      ) : (
        /* Resource List */
        <div>
          <div className="flex justify-end mb-4">
            <Link href="/lesson-plan">
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <FileTextIcon className="h-4 w-4" />
                <span>View 45-min Detailed Lesson Plan</span>
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
            </Link>
          </div>
          {/* Completely removed header text */}
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
            hideTabsInContentViewer={isInTabsView}
          />
        </div>
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