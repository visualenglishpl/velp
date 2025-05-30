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
import { TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  onSearch?: (query: string) => void; // Made optional
  onFilterByType?: (type: ResourceFilterType) => void; // Made optional
  onAddResource?: () => void;
  onEditResource?: (resource: TeacherResource) => void;
  onDeleteResource?: (resource: TeacherResource) => void;
  selectedType?: ResourceFilterType;
  searchQuery?: string;
  isLoading?: boolean;
  readOnly?: boolean;
  hideTabsInContentViewer?: boolean; // Used to hide tabs when component is in SimpleContentViewer
  emptyMessage?: string; // Message to display when no resources are found
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
  hideTabsInContentViewer = false,
  emptyMessage = "There are no resources available for this selection"
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
    // Check for YouTube videos - handle both direct youtubeVideoId and from sourceUrl
    if (resource.youtubeVideoId) {
      return `https://www.youtube.com/embed/${resource.youtubeVideoId}`;
    }
    
    if (resource.isYoutubeVideo && resource.sourceUrl) {
      // Extract YouTube ID from the sourceUrl
      const youtubeMatch = resource.sourceUrl.match(/(?:embed\/|v=|\/v\/|youtu\.be\/|\/v=|^https?:\/\/(?:www\.)?youtube\.com\/(?:(?:watch)?\?.*v=|(?:embed|v)\/))([^&?]+)/);
      if (youtubeMatch && youtubeMatch[1]) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}`;
      }
    }
    
    // Check for Wordwall games
    if (resource.wordwallGameId) {
      return `https://wordwall.net/embed/${resource.wordwallGameId}`;
    }
    
    if (resource.sourceUrl && resource.sourceUrl.includes('wordwall.net')) {
      // Extract Wordwall ID from the sourceUrl
      const wordwallMatch = resource.sourceUrl.match(/wordwall\.net\/(?:resource|embed)\/([a-zA-Z0-9]+)/);
      if (wordwallMatch && wordwallMatch[1]) {
        return `https://wordwall.net/embed/${wordwallMatch[1]}`;
      }
    }
    
    // Check for ISL Collective resources
    if (resource.islCollectiveId) {
      return `https://www.islcollective.com/preview/${resource.islCollectiveId}`;
    }
    
    // Check for PDFs
    if (resource.pdfUrl) {
      return resource.pdfUrl;
    }
    
    if (resource.sourceUrl && resource.resourceType === 'pdf') {
      return resource.sourceUrl;
    }
    
    // Check for content objects
    if (resource.content) {
      if (typeof resource.content === 'string') {
        return resource.content;
      } else if (resource.content.embedUrl) {
        return resource.content.embedUrl;
      }
    }
    
    // Use sourceUrl as a fallback
    if (resource.sourceUrl) {
      return resource.sourceUrl;
    }
    
    return '';
  };
  
  // Handle resource preview or direct open for PDFs
  const handlePreview = (resource: TeacherResource) => {
    // For PDF resources, open directly in a new tab without showing modal
    if (resource.resourceType === 'pdf') {
      const pdfUrl = resource.sourceUrl || resource.pdfUrl;
      if (pdfUrl) {
        window.open(pdfUrl, '_blank');
        return;
      }
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

  // Resource type filters with icon and count
  const resourceTypes: Array<{ type: ResourceFilterType, label: string }> = [
    { type: 'all', label: 'All Resources' },
    { type: 'video', label: 'Videos' },
    { type: 'game', label: 'Games' },
    { type: 'pdf', label: 'PDFs' },
    { type: 'lessonPlan', label: 'Lessons' }
  ];

  return (
    <div className="space-y-4">
      
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
              : emptyMessage}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources
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