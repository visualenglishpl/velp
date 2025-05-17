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
  TrashIcon,
  DownloadIcon
} from 'lucide-react';
import { TeacherResource, ResourceType, ResourceFilterType } from '@/types/TeacherResource';
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
  hideTabsInContentViewer?: boolean; // Used to hide tabs when component is in SimpleContentViewer
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
  readOnly = false,
  hideTabsInContentViewer = false
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
      if (typeof resource.content === 'string') {
        return resource.content;
      } else if (resource.content.embedUrl) {
        return resource.content.embedUrl;
      }
    }
    
    return '';
  };
  
  // Handle resource preview or direct open for PDFs
  const handlePreview = (resource: TeacherResource) => {
    // For PDF resources, open directly in a new tab
    if (resource.resourceType === 'pdf' && resource.sourceUrl) {
      window.open(resource.sourceUrl, '_blank');
      return;
    }
    
    // For other resource types, show the preview modal
    setPreviewResource(resource);
  };
  
  // Handle closing preview
  const handleClosePreview = () => {
    setPreviewResource(null);
  };
  
  // Count resources by type
  const getResourceCount = (type: ResourceFilterType): number => {
    if (type === 'all') return resources.length;
    return resources.filter(r => r.resourceType === type).length;
  };

  // Resource type filters with icon and count - video, game, and PDF resources
  const resourceTypes: Array<{ type: ResourceFilterType, label: string }> = [
    { type: 'all', label: 'All Resources' },
    { type: 'video', label: 'Videos' },
    { type: 'game', label: 'Games' },
    { type: 'pdf', label: 'PDF Downloads' }
  ];

  return (
    <div className="space-y-4">
      {/* Simplified tabs navigation - only show if not in content viewer tabs */}
      {!hideTabsInContentViewer && (
        <div className="border-b">
          <div className="flex overflow-x-auto">
            {resourceTypes.map(({ type, label }) => {
              const count = getResourceCount(type);
              const isActive = selectedType === type;
              
              return (
                <button
                  key={type}
                  onClick={() => onFilterByType(type)}
                  className={`flex items-center px-4 py-3 border-b-2 whitespace-nowrap transition-colors ${
                    isActive 
                      ? 'border-primary text-primary font-medium' 
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                  }`}
                  title={`View ${label}`}
                >
                  {getResourceTypeIcon(type as ResourceType)}
                  <span className="ml-2">{label}</span>
                  <span className={`ml-2 px-1.5 py-0.5 rounded-full text-xs ${
                    isActive ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}
      
      {/* Search bar */}
      <div className="flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources..."
            className="pl-10 pr-4"
            value={searchQuery}
            onChange={(e) => onSearch(e.target.value)}
          />
        </div>
        
        {!readOnly && onAddResource && (
          <Button onClick={onAddResource} size="sm" className="ml-4">
            <PlusIcon className="h-4 w-4 mr-1" />
            Add Resource
          </Button>
        )}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {resources.map((resource) => {
            // Determine icon color based on resource type
            const typeColors = {
              'video': 'from-red-500 to-orange-500',
              'game': 'from-purple-600 to-indigo-600',
              'pdf': 'from-blue-600 to-indigo-600',
              'lessonPlan': 'from-teal-600 to-green-600',
              'document': 'from-gray-600 to-slate-700'
            };
            
            const colorClass = typeColors[resource.resourceType as keyof typeof typeColors] || 'from-gray-500 to-gray-700';
            
            return (
              <div 
                key={resource.id} 
                className="border rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={() => handlePreview(resource)}
              >
                {/* Compact resource card with icon */}
                <div className={`bg-gradient-to-r ${colorClass} p-2 text-white`}>
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-xs flex items-center">
                      {getResourceTypeIcon(resource.resourceType)}
                      <span className="ml-1">{resource.resourceType === 'pdf' ? 'PDF' : resource.resourceType}</span>
                    </h4>
                    {resource.resourceType === 'pdf' && (
                      <span className="bg-white/20 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                        Download
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="p-2 bg-white">
                  {/* Resource title */}
                  <h3 className="font-medium line-clamp-2 text-xs">{resource.title}</h3>
                  
                  {/* Action buttons (compact row) */}
                  <div className="flex justify-end gap-1 mt-1.5">
                    {resource.sourceUrl && resource.resourceType !== 'pdf' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(resource.sourceUrl, '_blank');
                        }}
                        title="Open original"
                      >
                        <ExternalLinkIcon className="h-3 w-3" />
                      </Button>
                    )}
                    
                    {!readOnly && onEditResource && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditResource(resource);
                        }}
                        title="Edit"
                      >
                        <PencilIcon className="h-3 w-3" />
                      </Button>
                    )}
                    
                    {!readOnly && onDeleteResource && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-destructive hover:text-destructive/90"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteResource(resource);
                        }}
                        title="Delete"
                      >
                        <TrashIcon className="h-3 w-3" />
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