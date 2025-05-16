/**
 * ResourceList Component
 * 
 * This component displays a list of resources with filtering options
 * and supports various resource types.
 */

import { useState } from 'react';
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  FileIcon,
  FilmIcon,
  GamepadIcon,
  FileTextIcon,
  SearchIcon,
  ExternalLinkIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon
} from 'lucide-react';
import { TeacherResource, ResourceType, ResourceFilterType } from '@/types/resources';
import EmbeddedContentModal from '@/components/EmbeddedContentModal';
import { 
  extractYoutubeVideoId,
  extractWordwallGameId
} from '@/lib/embedUtils';

interface ResourceListProps {
  resources: TeacherResource[];
  onSearch: (query: string) => void;
  onFilterByType: (type: ResourceFilterType) => void;
  onAddResource?: () => void;
  onEditResource?: (resource: TeacherResource) => void;
  onDeleteResource?: (resource: TeacherResource) => void;
  selectedType?: ResourceFilterType;
  searchQuery?: string;
  isLoading?: boolean;
  readOnly?: boolean;
}

export function ResourceList({
  resources,
  onSearch,
  onFilterByType,
  onAddResource,
  onEditResource,
  onDeleteResource,
  selectedType = 'all',
  searchQuery = '',
  isLoading = false,
  readOnly = false
}: ResourceListProps) {
  const [previewResource, setPreviewResource] = useState<TeacherResource | null>(null);
  
  // Get resource type icon
  const getResourceTypeIcon = (type: ResourceType) => {
    switch (type) {
      case 'video':
        return <FilmIcon className="h-4 w-4" />;
      case 'game':
        return <GamepadIcon className="h-4 w-4" />;
      case 'pdf':
        return <FileIcon className="h-4 w-4" />;
      case 'lessonPlan':
        return <FileTextIcon className="h-4 w-4" />;
      default:
        return <FileTextIcon className="h-4 w-4" />;
    }
  };
  
  // Get embed content for preview
  const getEmbedContent = (resource: TeacherResource): string => {
    if (resource.youtubeVideoId) {
      return `https://www.youtube.com/embed/${resource.youtubeVideoId}`;
    }
    
    if (resource.wordwallGameId) {
      return `https://wordwall.net/embed/${resource.wordwallGameId}`;
    }
    
    if (resource.islCollectiveId) {
      return `https://www.islcollective.com/preview/${resource.islCollectiveId}`;
    }
    
    if (resource.pdfUrl) {
      return resource.pdfUrl;
    }
    
    if (resource.content) {
      return resource.content;
    }
    
    return '';
  };
  
  // Handle resource preview
  const handlePreview = (resource: TeacherResource) => {
    setPreviewResource(resource);
  };
  
  // Handle closing preview
  const handleClosePreview = () => {
    setPreviewResource(null);
  };
  
  // Resource type filters
  const resourceTypes: Array<{ type: ResourceFilterType, label: string }> = [
    { type: 'all', label: 'All Resources' },
    { type: 'video', label: 'Videos' },
    { type: 'game', label: 'Games' },
    { type: 'pdf', label: 'PDFs' },
    { type: 'lessonPlan', label: 'Lesson Plans' }
  ];

  return (
    <div className="space-y-4">
      {/* Filters and search */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-2">
          {resourceTypes.map(({ type, label }) => (
            <Button
              key={type}
              variant={selectedType === type ? "default" : "outline"}
              size="sm"
              onClick={() => onFilterByType(type)}
            >
              {type !== 'all' && getResourceTypeIcon(type as ResourceType)}
              <span className="ml-1">{label}</span>
              {type !== 'all' && (
                <Badge variant="secondary" className="ml-2">
                  {resources.filter(r => r.resourceType === (type as ResourceType)).length}
                </Badge>
              )}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 items-center">
          <div className="relative">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search resources..."
              className="pl-8 w-[200px]"
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
          
          {!readOnly && onAddResource && (
            <Button onClick={onAddResource} size="sm">
              <PlusIcon className="h-4 w-4 mr-1" />
              Add Resource
            </Button>
          )}
        </div>
      </div>
      
      {/* Resources grid with thumbnails */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
        </div>
      ) : resources.length === 0 ? (
        <div className="text-center py-8 border rounded-md bg-muted/20">
          <FileTextIcon className="h-8 w-8 mx-auto text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No resources found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery 
              ? "Try adjusting your search or filters"
              : "There are no resources available for this selection"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => {
            // Generate thumbnail URL based on resource type
            const thumbnailUrl = resource.resourceType === 'video' && resource.youtubeVideoId
              ? `https://img.youtube.com/vi/${resource.youtubeVideoId}/mqdefault.jpg`
              : resource.resourceType === 'game' && resource.wordwallGameId
              ? `https://az779572.vo.msecnd.net/screens-200/4c26c3b6d7784cc4a1b09c09b6e0ab5a`
              : resource.resourceType === 'video'
              ? 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/video_thumb.png'
              : resource.resourceType === 'game'
              ? 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/game_thumb.png'
              : resource.resourceType === 'pdf'
              ? 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/pdf_thumb.png'
              : resource.resourceType === 'lessonPlan'
              ? 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/lesson_thumb.png'
              : 'https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/resource_thumb.png';
            
            return (
              <div key={resource.id} className="bg-card border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all">
                {/* Thumbnail area with preview overlay */}
                <div 
                  className="relative h-40 bg-cover bg-center cursor-pointer" 
                  style={{ backgroundImage: `url(${thumbnailUrl})` }}
                  onClick={() => handlePreview(resource)}
                >
                  {/* Resource type badge */}
                  <div className="absolute top-2 left-2 bg-primary/80 text-primary-foreground px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    {getResourceTypeIcon(resource.resourceType)}
                    <span>{resource.resourceType}</span>
                  </div>
                  
                  {/* Provider badge if available */}
                  {resource.provider && (
                    <div className="absolute bottom-2 right-2 bg-background/80 px-2 py-1 rounded text-xs">
                      {resource.provider}
                    </div>
                  )}
                  
                  {/* Preview overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Button size="sm" variant="secondary" className="gap-2">
                      <EyeIcon className="h-4 w-4" />
                      Preview
                    </Button>
                  </div>
                </div>
                
                {/* Resource info */}
                <div className="p-3">
                  <h3 className="font-medium line-clamp-1">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2 h-10">
                    {resource.description}
                  </p>
                  
                  {/* Action buttons (minimal) */}
                  <div className="flex justify-end gap-1 mt-2">
                    {resource.sourceUrl && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => window.open(resource.sourceUrl, '_blank')}
                        title="Open original"
                      >
                        <ExternalLinkIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {!readOnly && onEditResource && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onEditResource(resource)}
                        title="Edit"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </Button>
                    )}
                    
                    {!readOnly && onDeleteResource && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDeleteResource(resource)}
                        title="Delete"
                        className="text-destructive hover:text-destructive/90"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Preview modal */}
      {previewResource && (
        <EmbeddedContentModal
          isOpen={!!previewResource}
          onClose={handleClosePreview}
          title={previewResource.title}
          content={getEmbedContent(previewResource)}
          sourceUrl={previewResource.sourceUrl}
        />
      )}
    </div>
  );
}