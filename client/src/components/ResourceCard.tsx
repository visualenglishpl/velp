import React from 'react';
import { ExternalLink, PlayCircle, FileText, Gamepad2, Award, Trash2, Edit, FilePenLine } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TeacherResource } from '@/types/teacher-resources';
import { generateThumbnailUrl } from '@/lib/thumbnail-generator';

interface ResourceCardProps {
  resource: TeacherResource;
  isEditMode?: boolean;
  onEdit?: (resource: TeacherResource) => void;
  onDelete?: (resource: TeacherResource) => void;
  onView?: (resource: TeacherResource) => void;
}

export default function ResourceCard({
  resource,
  isEditMode = false,
  onEdit,
  onDelete,
  onView,
}: ResourceCardProps) {
  // Get appropriate icon based on resource type
  const getResourceIcon = () => {
    switch (resource.resourceType) {
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'pdf':
        return <FileText className="h-5 w-5" />;
      case 'game':
        return <Gamepad2 className="h-5 w-5" />;
      case 'lesson':
        return <FilePenLine className="h-5 w-5" />;
      default:
        return <Award className="h-5 w-5" />;
    }
  };

  // Get descriptive labels
  const getResourceTypeLabel = () => {
    switch (resource.resourceType) {
      case 'video':
        return 'Video';
      case 'pdf':
        return 'PDF Document';
      case 'game':
        return 'Interactive Game';
      case 'lesson':
        return 'Lesson Plan';
      default:
        return 'Resource';
    }
  };

  // Get thumbnail URL for the resource
  const thumbnailUrl = generateThumbnailUrl(resource);
  
  return (
    <Card className="overflow-hidden h-full flex flex-col">
      {/* Thumbnail area */}
      <div className="relative aspect-video bg-muted/20 overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={resource.title} 
            className="w-full h-full object-cover transition-all hover:scale-105"
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="p-4 rounded-full bg-muted/40">
              {getResourceIcon()}
            </div>
          </div>
        )}
        
        {/* Resource type badge */}
        <Badge className="absolute top-2 right-2">
          {getResourceTypeLabel()}
        </Badge>
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <div>
            <CardTitle className="text-base truncate">
              {resource.title}
            </CardTitle>
            <CardDescription className="text-xs mt-1">
              {resource.provider || 'Visual English'} 
              {resource.dateAdded && ` • ${new Date(resource.dateAdded).toLocaleDateString()}`}
            </CardDescription>
          </div>
          
          {/* Edit/Delete buttons */}
          {isEditMode && (
            <div className="flex space-x-1">
              {onEdit && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => onEdit(resource)}
                >
                  <Edit className="h-3.5 w-3.5" />
                </Button>
              )}
              {onDelete && (
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-7 w-7 text-destructive"
                  onClick={() => onDelete(resource)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              )}
            </div>
          )}
        </div>
      </CardHeader>
      
      {/* Tags area */}
      {resource.categories?.length || resource.tags?.length ? (
        <CardContent className="pb-2 pt-0">
          <div className="flex flex-wrap gap-1">
            {resource.categories?.map((category) => (
              <Badge key={category} variant="secondary" className="text-xs">
                {category}
              </Badge>
            ))}
            
            {resource.tags?.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      ) : null}
      
      {/* Description if available */}
      {resource.description && (
        <CardContent className="pt-0 text-sm text-muted-foreground">
          <p className="line-clamp-2">{resource.description}</p>
        </CardContent>
      )}
      
      <CardFooter className="pt-1 mt-auto">
        <Button
          className="w-full justify-between"
          variant="default"
          onClick={() => onView?.(resource)}
        >
          <span>View Resource</span>
          <ExternalLink className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
