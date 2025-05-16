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
import { TeacherResource, ResourceType } from '@/types/resources';
import { EmbeddedContentModal } from '@/components/EmbeddedContentModal';
import { 
  extractYoutubeVideoId,
  extractWordwallGameId
} from '@/lib/embedUtils';

interface ResourceListProps {
  resources: TeacherResource[];
  onSearch: (query: string) => void;
  onFilterByType: (type: ResourceType | 'all') => void;
  onAddResource?: () => void;
  onEditResource?: (resource: TeacherResource) => void;
  onDeleteResource?: (resource: TeacherResource) => void;
  selectedType?: ResourceType | 'all';
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
  const resourceTypes: Array<{ type: ResourceType | 'all', label: string }> = [
    { type: 'all', label: 'All Resources' },
    { type: 'video', label: 'Videos' },
    { type: 'game', label: 'Games' },
    { type: 'pdf', label: 'PDFs' },
    { type: 'lesson', label: 'Lesson Plans' }
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
              {type !== 'all' && getResourceTypeIcon(type)}
              <span className="ml-1">{label}</span>
              {type !== 'all' && (
                <Badge variant="secondary" className="ml-2">
                  {resources.filter(r => type === 'all' || r.resourceType === type).length}
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
      
      {/* Resources table */}
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
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">Type</TableHead>
                <TableHead>Resource</TableHead>
                <TableHead className="w-[150px]">Provider</TableHead>
                <TableHead className="text-right w-[150px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {resources.map((resource) => (
                <TableRow key={resource.id}>
                  <TableCell>
                    <div className="bg-muted p-1.5 rounded-md inline-flex">
                      {getResourceTypeIcon(resource.resourceType)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{resource.title}</div>
                      <div className="text-sm text-muted-foreground">{resource.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {resource.provider ? (
                      <Badge variant="outline" className="font-normal">
                        {resource.provider}
                      </Badge>
                    ) : (
                      <span className="text-muted-foreground text-sm">Not specified</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handlePreview(resource)}
                        title="Preview"
                      >
                        <EyeIcon className="h-4 w-4" />
                      </Button>
                      
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
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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