/**
 * ResourceList Component
 * 
 * This component displays a list of teacher resources filtered by type.
 * It handles rendering different resource types appropriately and
 * provides UI for opening/previewing resources.
 */

import { useState } from 'react';
import { TeacherResource } from '@/types/resources';
import { EmbeddedContentModal } from '@/components/EmbeddedContentModal';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Youtube, FileText, Gamepad2, BookOpen, FileCode, Eye } from 'lucide-react';
import { truncateText } from '@/lib/textCleaners';

interface ResourceListProps {
  resources: TeacherResource[];
  title: string;
  icon?: React.ReactNode;
  emptyMessage?: string;
  onEdit?: (resource: TeacherResource) => void;
  onDelete?: (resource: TeacherResource) => void;
  isReadOnly?: boolean;
}

export function ResourceList({
  resources,
  title,
  icon,
  emptyMessage = 'No resources available.',
  onEdit,
  onDelete,
  isReadOnly = false
}: ResourceListProps) {
  const [selectedResource, setSelectedResource] = useState<TeacherResource | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Get icon based on resource type
  const getResourceIcon = (resource: TeacherResource) => {
    switch (resource.resourceType) {
      case 'video':
        return <Youtube className="h-5 w-5 text-red-500" />;
      case 'pdf':
        return <FileText className="h-5 w-5 text-blue-500" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5 text-green-500" />;
      case 'lesson':
        return <BookOpen className="h-5 w-5 text-amber-500" />;
      default:
        return <FileCode className="h-5 w-5 text-gray-500" />;
    }
  };

  // Handle opening preview for a resource
  const handlePreview = (resource: TeacherResource) => {
    setSelectedResource(resource);
    setPreviewOpen(true);
  };

  // Get content for preview based on resource type
  const getPreviewContent = (resource: TeacherResource): string => {
    if (resource.isYoutubeVideo && resource.youtubeVideoId) {
      return `https://www.youtube.com/embed/${resource.youtubeVideoId}`;
    }
    
    if (resource.isWordwallGame && resource.wordwallGameId) {
      return `https://wordwall.net/embed/${resource.wordwallGameId}`;
    }
    
    if (resource.isIslCollectiveResource && resource.islCollectiveId) {
      return `https://en.islcollective.com/preview/${resource.islCollectiveId}`;
    }
    
    if (resource.embedCode) {
      return resource.embedCode;
    }
    
    if (resource.pdfUrl) {
      return resource.pdfUrl;
    }
    
    if (resource.content) {
      return resource.content;
    }
    
    if (resource.sourceUrl) {
      return resource.sourceUrl;
    }
    
    return '';
  };

  // Handle closing the preview modal
  const handleClosePreview = () => {
    setPreviewOpen(false);
    setSelectedResource(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {resources.length === 0 ? (
        <p className="text-muted-foreground text-sm italic">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <Card key={resource.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2">
                  {getResourceIcon(resource)}
                  <CardTitle className="text-base">{truncateText(resource.title, 50)}</CardTitle>
                </div>
                {resource.description && (
                  <CardDescription className="text-xs">
                    {truncateText(resource.description, 120)}
                  </CardDescription>
                )}
              </CardHeader>
              
              <CardContent className="pb-2 pt-0">
                {resource.provider && (
                  <div className="text-xs text-muted-foreground">
                    Provider: {resource.provider}
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex justify-between pt-0">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => handlePreview(resource)}
                >
                  <Eye className="h-4 w-4 mr-1" />
                  Preview
                </Button>
                
                {resource.sourceUrl && (
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => window.open(resource.sourceUrl, '_blank')}
                  >
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Open
                  </Button>
                )}
                
                {!isReadOnly && onEdit && (
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => onEdit(resource)}
                  >
                    Edit
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
      
      {selectedResource && (
        <EmbeddedContentModal
          isOpen={previewOpen}
          onClose={handleClosePreview}
          content={getPreviewContent(selectedResource)}
          title={selectedResource.title}
          sourceUrl={selectedResource.sourceUrl}
        />
      )}
    </div>
  );
}