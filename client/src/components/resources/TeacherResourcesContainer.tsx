/**
 * TeacherResourcesContainer Component
 * 
 * This is the main container component for teacher resources.
 * It handles resource selection, editing, and viewing,
 * replacing the original 4400+ lines component with a modular architecture.
 */

import { useState } from 'react';
import { TeacherResource } from '@/types/resources';
import { BookId, UnitId } from '@/types/content';
import { useTeacherResources, isMultiVersionUnit, getMultiVersionOptions, UnitVersion } from '@/hooks/useTeacherResources';
import { ResourceList } from '@/components/resources/ResourceList';
import { ResourceEditor } from '@/components/resources/ResourceEditor';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, RefreshCw, BookOpen, Youtube, Gamepad2, FileText, Library, Settings2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TeacherResourcesContainerProps {
  initialBookId?: BookId;
  initialUnitId?: UnitId;
  readOnly?: boolean;
  showEmptyState?: boolean;
  enableEditing?: boolean;
  showSelection?: boolean;
  className?: string;
}

export function TeacherResourcesContainer({
  initialBookId,
  initialUnitId,
  readOnly = false,
  showEmptyState = true,
  enableEditing = true,
  showSelection = true,
  className = ''
}: TeacherResourcesContainerProps) {
  const { toast } = useToast();
  
  // State for book, unit, and version selection
  const [selectedBookId, setSelectedBookId] = useState<BookId | undefined>(initialBookId);
  const [selectedUnitId, setSelectedUnitId] = useState<UnitId | undefined>(initialUnitId);
  const [selectedVersion, setSelectedVersion] = useState<UnitVersion>();
  
  // State for resource editing
  const [editingResource, setEditingResource] = useState<TeacherResource | null>(null);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('videos');
  
  // Calculate if this is a unit with multiple versions
  const hasMultipleVersions = selectedBookId && selectedUnitId 
    ? isMultiVersionUnit(selectedBookId, selectedUnitId) 
    : false;
  
  // Get version options if applicable
  const versionOptions = selectedBookId && selectedUnitId && hasMultipleVersions
    ? getMultiVersionOptions(selectedBookId, selectedUnitId)
    : [];
  
  // Get resources using the custom hook
  const { 
    resources, 
    loading, 
    error, 
    filteredResources, 
    hasResourceType,
    reload,
    availableBooks,
    availableUnits
  } = useTeacherResources(selectedBookId, selectedUnitId, selectedVersion);

  // Handle saving a resource
  const handleSaveResource = async (resource: TeacherResource) => {
    try {
      // In a real implementation, this would save to backend
      // For now, just update local state and show confirmation
      toast({
        title: 'Resource Saved',
        description: `${editingResource ? 'Updated' : 'Added'} "${resource.title}" successfully.`,
      });
      
      // Close editor and refresh resources
      setEditingResource(null);
      setIsAdding(false);
      await reload();
    } catch (error) {
      console.error('Error saving resource:', error);
      toast({
        title: 'Error Saving Resource',
        description: 'There was a problem saving the resource. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle deleting a resource
  const handleDeleteResource = async (resource: TeacherResource) => {
    try {
      // In a real implementation, this would delete from backend
      // For now, just show confirmation
      toast({
        title: 'Resource Deleted',
        description: `"${resource.title}" has been removed.`,
      });
      
      // Refresh resources
      await reload();
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast({
        title: 'Error Deleting Resource',
        description: 'There was a problem deleting the resource. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle book selection change
  const handleBookChange = (bookId: BookId) => {
    setSelectedBookId(bookId);
    setSelectedUnitId(undefined);
    setSelectedVersion(undefined);
  };

  // Handle unit selection change
  const handleUnitChange = (unitId: UnitId) => {
    setSelectedUnitId(unitId);
    setSelectedVersion(undefined);
    
    // If multi-version unit, set default version
    if (selectedBookId && isMultiVersionUnit(selectedBookId, unitId)) {
      const options = getMultiVersionOptions(selectedBookId, unitId);
      if (options.length > 0) {
        setSelectedVersion(options[0] as UnitVersion);
      }
    }
  };

  // Handle version selection change
  const handleVersionChange = (version: string) => {
    setSelectedVersion(version as UnitVersion);
  };

  // Render empty state when no book/unit selected
  if (!selectedBookId || !selectedUnitId) {
    if (!showEmptyState) return null;
    
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle>Teacher Resources</CardTitle>
          <CardDescription>
            Select a book and unit to view available resources.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Book</label>
              <Select value={selectedBookId} onValueChange={handleBookChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {availableBooks.map((bookId) => (
                    <SelectItem key={bookId} value={bookId}>
                      Book {bookId}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {selectedBookId && (
              <div className="space-y-2">
                <label className="text-sm font-medium">Unit</label>
                <Select value={selectedUnitId} onValueChange={handleUnitChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map((unitId) => (
                      <SelectItem key={unitId} value={unitId}>
                        Unit {unitId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // If editing/adding, show editor
  if (editingResource || isAdding) {
    return (
      <ResourceEditor
        resource={editingResource}
        onSave={handleSaveResource}
        onCancel={() => {
          setEditingResource(null);
          setIsAdding(false);
        }}
        bookId={selectedBookId}
        unitId={selectedUnitId}
      />
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Book/Unit Selector */}
      {showSelection && (
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Teacher Resources</CardTitle>
            <CardDescription>
              {hasMultipleVersions 
                ? 'This unit has multiple versions. Select the version to view resources.' 
                : 'View and manage resources for the selected book and unit.'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium">Book</label>
                <Select value={selectedBookId} onValueChange={handleBookChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableBooks.map((bookId) => (
                      <SelectItem key={bookId} value={bookId}>
                        Book {bookId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium">Unit</label>
                <Select value={selectedUnitId} onValueChange={handleUnitChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableUnits.map((unitId) => (
                      <SelectItem key={unitId} value={unitId}>
                        Unit {unitId}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {hasMultipleVersions && (
                <div>
                  <label className="text-sm font-medium">Version</label>
                  <Select value={selectedVersion} onValueChange={handleVersionChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select version" />
                    </SelectTrigger>
                    <SelectContent>
                      {versionOptions.map((version) => (
                        <SelectItem key={version} value={version}>
                          {version.charAt(0).toUpperCase() + version.slice(1)} Version
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CardContent>
          
          {!readOnly && enableEditing && (
            <CardFooter className="flex justify-between pt-0">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={reload} 
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              
              <Button 
                size="sm" 
                onClick={() => setIsAdding(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </CardFooter>
          )}
        </Card>
      )}
      
      {/* Resource Categories */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="videos" className="flex items-center gap-1">
            <Youtube className="h-4 w-4" />
            <span className="hidden sm:inline">Videos</span>
          </TabsTrigger>
          <TabsTrigger value="games" className="flex items-center gap-1">
            <Gamepad2 className="h-4 w-4" />
            <span className="hidden sm:inline">Games</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Documents</span>
          </TabsTrigger>
          <TabsTrigger value="lessons" className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Lessons</span>
          </TabsTrigger>
          <TabsTrigger value="all" className="flex items-center gap-1">
            <Library className="h-4 w-4" />
            <span className="hidden sm:inline">All</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="videos" className="space-y-4">
          <ResourceList
            resources={filteredResources('video')}
            title="Videos"
            icon={<Youtube className="h-5 w-5 text-red-500" />}
            emptyMessage="No videos available for this unit."
            onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
            onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
            isReadOnly={readOnly}
          />
        </TabsContent>
        
        <TabsContent value="games" className="space-y-4">
          <ResourceList
            resources={filteredResources('game')}
            title="Interactive Games"
            icon={<Gamepad2 className="h-5 w-5 text-green-500" />}
            emptyMessage="No games available for this unit."
            onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
            onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
            isReadOnly={readOnly}
          />
        </TabsContent>
        
        <TabsContent value="documents" className="space-y-4">
          <ResourceList
            resources={filteredResources('pdf')}
            title="Documents & Worksheets"
            icon={<FileText className="h-5 w-5 text-blue-500" />}
            emptyMessage="No documents available for this unit."
            onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
            onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
            isReadOnly={readOnly}
          />
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-4">
          <ResourceList
            resources={filteredResources('lesson')}
            title="Lesson Plans"
            icon={<BookOpen className="h-5 w-5 text-amber-500" />}
            emptyMessage="No lesson plans available for this unit."
            onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
            onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
            isReadOnly={readOnly}
          />
        </TabsContent>
        
        <TabsContent value="all" className="space-y-8">
          {hasResourceType('video') && (
            <ResourceList
              resources={filteredResources('video')}
              title="Videos"
              icon={<Youtube className="h-5 w-5 text-red-500" />}
              onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
              onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
              isReadOnly={readOnly}
            />
          )}
          
          {hasResourceType('game') && (
            <ResourceList
              resources={filteredResources('game')}
              title="Interactive Games"
              icon={<Gamepad2 className="h-5 w-5 text-green-500" />}
              onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
              onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
              isReadOnly={readOnly}
            />
          )}
          
          {hasResourceType('pdf') && (
            <ResourceList
              resources={filteredResources('pdf')}
              title="Documents & Worksheets"
              icon={<FileText className="h-5 w-5 text-blue-500" />}
              onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
              onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
              isReadOnly={readOnly}
            />
          )}
          
          {hasResourceType('lesson') && (
            <ResourceList
              resources={filteredResources('lesson')}
              title="Lesson Plans"
              icon={<BookOpen className="h-5 w-5 text-amber-500" />}
              onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
              onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
              isReadOnly={readOnly}
            />
          )}
          
          {hasResourceType('other') && (
            <ResourceList
              resources={filteredResources('other')}
              title="Other Resources"
              icon={<Settings2 className="h-5 w-5 text-gray-500" />}
              onEdit={!readOnly && enableEditing ? setEditingResource : undefined}
              onDelete={!readOnly && enableEditing ? handleDeleteResource : undefined}
              isReadOnly={readOnly}
            />
          )}
          
          {resources.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              No resources available for this unit.
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}