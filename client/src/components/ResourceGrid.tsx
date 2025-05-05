import React, { useState, useMemo } from 'react';
import { ResourceCategory, ResourceType, TeacherResource } from '@/types/teacher-resources';
import ResourceCard from './ResourceCard';
import ResourceFilterBar from './ResourceFilterBar';
import ErrorBoundary from './ErrorBoundary';
import { Skeleton } from './ui/skeleton';

interface ResourceGridProps {
  resources: TeacherResource[];
  isLoading?: boolean;
  isEditMode?: boolean;
  onEdit?: (resource: TeacherResource) => void;
  onDelete?: (resource: TeacherResource) => void;
  onView?: (resource: TeacherResource) => void;
}

export default function ResourceGrid({
  resources,
  isLoading = false,
  isEditMode = false,
  onEdit,
  onDelete,
  onView,
}: ResourceGridProps) {
  // Filter and search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ResourceType[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ResourceCategory[]>([]);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTypes([]);
    setSelectedCategories([]);
  };

  // Filter resources based on current filters
  const filteredResources = useMemo(() => {
    if (!resources) return [];
    
    return resources.filter(resource => {
      // Filter by search query
      const matchesSearch = searchQuery.trim() === '' || 
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (resource.description && resource.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (resource.provider && resource.provider.toLowerCase().includes(searchQuery.toLowerCase()));
      
      // Filter by resource type
      const matchesType = selectedTypes.length === 0 || 
        selectedTypes.includes(resource.resourceType);
      
      // Filter by categories
      const matchesCategory = selectedCategories.length === 0 || 
        (resource.categories && resource.categories.some(category => 
          selectedCategories.includes(category)));
      
      return matchesSearch && matchesType && matchesCategory;
    });
  }, [resources, searchQuery, selectedTypes, selectedCategories]);

  // Loading skeletons
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="w-full h-12 bg-muted/30 animate-pulse rounded-md" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="w-full">
              <Skeleton className="aspect-video w-full h-auto rounded-md mb-3" />
              <Skeleton className="h-5 w-3/4 mb-2" />
              <Skeleton className="h-4 w-1/2 mb-4" />
              <Skeleton className="h-8 w-full" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // No resources state
  if (!resources || resources.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No resources available for this unit.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and filter bar */}
      <ResourceFilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        clearFilters={clearFilters}
        totalResources={resources.length}
        filteredCount={filteredResources.length}
      />

      {/* Resource cards */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No resources match your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredResources.map(resource => (
            <ErrorBoundary key={resource.id} fallbackType="content">
              <ResourceCard
                resource={resource}
                isEditMode={isEditMode}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            </ErrorBoundary>
          ))}
        </div>
      )}
    </div>
  );
}
