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
  File,
  Film,
  Gamepad,
  FileText,
  Search,
  ExternalLink,
  Plus,
  Eye,
  Pencil,
  Trash,
  Download
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
        return <Film className="h-4 w-4" />;
      case 'game':
        return <Gamepad className="h-4 w-4" />;
      case 'pdf':
        return <File className="h-4 w-4" />;
      case 'lessonPlan':
        return <FileText className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
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

  // Resource type filters with icon and count - video, game, and lesson resources only
  const resourceTypes: Array<{ type: ResourceFilterType, label: string }> = [
    { type: 'all', label: 'All Resources' },
    { type: 'video', label: 'Videos' },
    { type: 'game', label: 'Games' },
    { type: 'lessonPlan', label: 'Lessons' }
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
          <FileText className="h-8 w-8 mx-auto text-muted-foreground" />
          <h3 className="mt-2 text-lg font-medium">No resources found</h3>
          <p className="text-muted-foreground mt-1">
            {searchQuery 
              ? "Try adjusting your search or filters"
              : "There are no resources available for this selection"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Filter resources to show only one PDF for Unit 1 */}
          {resources
            .filter((resource) => {
              // For PDF resources, only show unit-specific content
              if (resource.resourceType === 'pdf') {
                // Only show PDFs that match the current unit
                return resource.unitId === resource.currentUnitId;
              }
              // Keep all non-PDF resources
              return true;
            })
            .map((resource) => {
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
                        <Film className="h-10 w-10 text-white/80" />
                      </div>
                    )}
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-primary ml-0.5">
                          <path d="M8 6.82v10.36c0 .79.87 1.27 1.54.84l8.14-5.18c.62-.39.62-1.29 0-1.69L9.54 5.98C8.87 5.55 8 6.03 8 6.82z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Simple minimal title below the thumbnail */}
                  <div className="p-2 bg-white">
                    <h3 className="text-gray-800 text-xs font-medium truncate">
                      {resource.title.replace(/^(video|video -|video:|00 c . video)\s*/i, '').trim()}
                    </h3>
                  </div>
                </div>
              );
            }
            
            // Game resource cards - add preview buttons
            else if (resource.resourceType === 'game') {
              // Clean up game title
              const cleanTitle = resource.title
                .replace(/^(game|game -|game:|online game|wordwall|wordwall game)\s*/i, '')
                .replace(/^(online\s*-?\s*game:?\s*)/i, '')
                .trim();
              
              // Extract Wordwall ID if available
              const wordwallId = resource.wordwallGameId || 
                (resource.sourceUrl ? extractWordwallGameId(resource.sourceUrl) : '');
                
              return (
                <div 
                  key={resource.id} 
                  className="rounded-lg overflow-hidden cursor-pointer transform transition-transform hover:scale-105 shadow-md"
                  onClick={() => handlePreview(resource)}
                >
                  <div className="relative aspect-video bg-indigo-50 flex flex-col items-center justify-center">
                    {/* Game preview placeholder */}
                    <Gamepad className="h-12 w-12 text-indigo-400 mb-2" />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-colors">
                      <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                        <Eye className="w-5 h-5 text-indigo-600" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Title below */}
                  <div className="p-2 bg-white">
                    <h3 className="text-gray-800 text-xs font-medium truncate">{cleanTitle}</h3>
                  </div>
                </div>
              );
            }
            
            // PDF resource cards - simplified design
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
                        <File className="h-4 w-4 mr-1" />
                        {unitNumber ? `Unit ${unitNumber}` : 'PDF Lesson'}
                      </span>
                      <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">PDF</span>
                    </div>
                    
                    <div className="flex items-center mt-3 text-indigo-600 text-sm font-medium">
                      <Eye className="h-4 w-4 mr-1" />
                      <span>View Lesson</span>
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
                      <FileText className="h-10 w-10 mx-auto text-white/90 mb-2" />
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