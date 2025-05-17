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
      {/* Hide tabs navigation as requested */}
      
      {/* Hide search bar as requested */}
      
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((resource) => {
            // Create video thumbnail cards with play button
            if (resource.resourceType === 'video') {
              const youtubeId = resource.youtubeVideoId || 
                (resource.sourceUrl ? extractYoutubeVideoId(resource.sourceUrl) : '');
              const thumbnailUrl = youtubeId ? 
                `https://img.youtube.com/vi/${youtubeId}/mqdefault.jpg` : '';
              
              return (
                <div 
                  key={resource.id} 
                  className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-md"
                  onClick={() => handlePreview(resource)}
                >
                  {/* Video thumbnail with play button overlay */}
                  <div className="relative aspect-video bg-gray-100">
                    {thumbnailUrl ? (
                      <img 
                        src={thumbnailUrl} 
                        alt={resource.title} 
                        className="w-full h-full object-cover" 
                      />
                    ) : (
                      <div className="flex items-center justify-center w-full h-full bg-gradient-to-br from-red-500 to-orange-500">
                        <FilmIcon className="h-12 w-12 text-white/80" />
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-primary ml-1">
                          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Game resource cards
            else if (resource.resourceType === 'game') {
              return (
                <div 
                  key={resource.id} 
                  className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-md"
                  onClick={() => handlePreview(resource)}
                >
                  <div className="bg-gradient-to-br from-purple-600 to-indigo-600 aspect-video flex items-center justify-center">
                    <div className="text-center px-3">
                      <GamepadIcon className="h-10 w-10 mx-auto text-white/90 mb-2" />
                      <p className="text-white text-sm font-medium">{resource.title}</p>
                    </div>
                  </div>
                </div>
              );
            }
            
            // PDF resource cards
            else if (resource.resourceType === 'pdf') {
              const unitMatch = resource.title.match(/Unit (\d+)/i);
              const unitNumber = unitMatch ? unitMatch[1] : '';
              
              return (
                <div 
                  key={resource.id} 
                  className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-md"
                  onClick={() => handlePreview(resource)}
                >
                  <div className="bg-indigo-100 aspect-[3/2] flex flex-col items-center justify-center p-3">
                    <div className="w-full bg-indigo-600 text-white py-2 px-3 rounded-md flex items-center justify-between">
                      <span className="font-medium text-sm flex items-center">
                        <FileIcon className="h-4 w-4 mr-1" />
                        {unitNumber ? `Unit ${unitNumber}` : 'PDF'}
                      </span>
                      <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">PDF</span>
                    </div>
                    
                    <div className="flex items-center mt-3 text-indigo-600 text-sm font-medium">
                      <DownloadIcon className="h-4 w-4 mr-1" />
                      <span>Download</span>
                    </div>
                  </div>
                </div>
              );
            }
            
            // Other resource cards (lesson plans, etc.)
            else {
              return (
                <div 
                  key={resource.id} 
                  className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-md"
                  onClick={() => handlePreview(resource)}
                >
                  <div className="bg-gradient-to-br from-teal-600 to-green-600 aspect-[3/2] flex items-center justify-center">
                    <div className="text-center px-3">
                      <FileTextIcon className="h-10 w-10 mx-auto text-white/90 mb-2" />
                      <p className="text-white text-sm font-medium">{resource.title}</p>
                    </div>
                  </div>
                </div>
              );
            }
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