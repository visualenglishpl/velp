import React from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ResourceCategory, ResourceType } from '@/types/teacher-resources';

interface ResourceFilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTypes: ResourceType[];
  setSelectedTypes: (types: ResourceType[]) => void;
  selectedCategories: ResourceCategory[];
  setSelectedCategories: (categories: ResourceCategory[]) => void;
  clearFilters: () => void;
  totalResources: number;
  filteredCount: number;
}

export default function ResourceFilterBar({
  searchQuery,
  setSearchQuery,
  selectedTypes,
  setSelectedTypes,
  selectedCategories,
  setSelectedCategories,
  clearFilters,
  totalResources,
  filteredCount,
}: ResourceFilterBarProps) {
  // Resource type options with icons
  const resourceTypes: { value: ResourceType; label: string; icon?: React.ReactNode }[] = [
    { value: 'video', label: 'Videos' },
    { value: 'game', label: 'Games' },
    { value: 'lesson', label: 'Lesson Plans' },
    { value: 'pdf', label: 'PDFs' },
    { value: 'other', label: 'Other' },
  ];

  // Resource category options
  const categoryOptions: { value: ResourceCategory; label: string }[] = [
    { value: 'activity', label: 'Activities' },
    { value: 'assessment', label: 'Assessments' },
    { value: 'flashcard', label: 'Flashcards' },
    { value: 'presentation', label: 'Presentations' },
    { value: 'printable', label: 'Printables' },
    { value: 'song', label: 'Songs' },
    { value: 'animation', label: 'Animations' },
    { value: 'tutorial', label: 'Tutorials' },
    { value: 'exercise', label: 'Exercises' },
    { value: 'discussion', label: 'Discussions' },
  ];

  // Toggle resource type selection
  const toggleResourceType = (type: ResourceType) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  // Toggle category selection
  const toggleCategory = (category: ResourceCategory) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  // Check if any filters are active
  const hasActiveFilters = selectedTypes.length > 0 || selectedCategories.length > 0 || searchQuery.trim() !== '';

  return (
    <div className="w-full space-y-4 mb-6">
      {/* Search and filter summary */}
      <div className="flex flex-col sm:flex-row gap-3 items-center">
        <div className="relative w-full">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search resources..."
            className="pl-9 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 whitespace-nowrap">
          <span className="text-sm text-muted-foreground">
            {filteredCount}/{totalResources} resources
          </span>
          
          {hasActiveFilters && (
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      </div>

      {/* Filter badges */}
      <div className="flex flex-wrap gap-2">
        {/* Resource type filters */}
        <div className="flex flex-wrap gap-2 mr-3">
          {resourceTypes.map((type) => (
            <Badge
              key={type.value}
              variant={selectedTypes.includes(type.value) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleResourceType(type.value)}
            >
              {type.label}
            </Badge>
          ))}
        </div>
        
        {/* Separator */}
        {selectedTypes.length > 0 && selectedCategories.length > 0 && (
          <div className="flex items-center mx-1">
            <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
        
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map((category) => (
            <Badge
              key={category.value}
              variant={selectedCategories.includes(category.value) ? "secondary" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleCategory(category.value)}
            >
              {category.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
