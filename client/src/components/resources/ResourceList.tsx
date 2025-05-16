/**
 * ResourceList Component
 * 
 * A component that displays a grid of teacher resources, 
 * filtered by resource type.
 */

import { TeacherResource } from '@/components/TeacherResources';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ExternalLink, Edit, Trash, FileText, Youtube, Gamepad2 } from 'lucide-react';
import { useState } from 'react';

interface ResourceListProps {
  resources: TeacherResource[];
  resourceType?: 'video' | 'game' | 'lesson' | 'pdf' | 'other';
  isLoading: boolean;
  isEditMode?: boolean;
  onEditResource?: (resource: TeacherResource) => void;
  onDeleteResource?: (resource: TeacherResource) => void;
  onViewResource?: (resource: TeacherResource) => void;
}

const ResourceList = ({
  resources,
  resourceType,
  isLoading,
  isEditMode = false,
  onEditResource,
  onDeleteResource,
  onViewResource
}: ResourceListProps) => {
  // Filter resources by type if needed
  const filteredResources = resourceType
    ? resources.filter(resource => resource.resourceType === resourceType)
    : resources;
  
  // Loading state
  if (isLoading) {
    return (
      <div className="py-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto" />
        <p className="mt-4 text-muted-foreground">Loading resources...</p>
      </div>
    );
  }
  
  // Empty state
  if (!filteredResources.length) {
    return (
      <div className="py-8 text-center text-muted-foreground">
        No {resourceType === 'pdf' ? 'PDF' : resourceType} resources available for this unit.
        {isEditMode && <div className="mt-2">Click "Add Resource" to add one.</div>}
      </div>
    );
  }
  
  // Get icon based on resource type
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Youtube className="h-4 w-4 mr-1" />;
      case 'game':
        return <Gamepad2 className="h-4 w-4 mr-1" />;
      case 'lesson':
        return <FileText className="h-4 w-4 mr-1" />;
      default:
        return <FileText className="h-4 w-4 mr-1" />;
    }
  };
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {filteredResources.map((resource, index) => (
        <Card 
          key={resource.id || `resource-${index}`} 
          className="overflow-hidden hover:shadow-md transition-shadow"
        >
          <CardHeader className="pb-2">
            <div className="flex justify-between items-start">
              <CardTitle className="text-lg line-clamp-2">{resource.title}</CardTitle>
              <Badge variant="outline" className="ml-2 whitespace-nowrap">
                {getResourceIcon(resource.resourceType)}
                {resource.resourceType === 'pdf' ? 'PDF' : resource.resourceType}
              </Badge>
            </div>
            {resource.provider && (
              <CardDescription className="text-xs">
                Provider: {resource.provider}
              </CardDescription>
            )}
          </CardHeader>
          
          <CardContent className="pb-2">
            {resource.description && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {resource.description}
              </p>
            )}
          </CardContent>
          
          <CardFooter className="pt-0 flex justify-between">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onViewResource?.(resource)}
            >
              View
            </Button>
            
            {isEditMode && (
              <div className="flex gap-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onEditResource?.(resource)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-destructive" 
                  onClick={() => onDeleteResource?.(resource)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {!isEditMode && resource.sourceUrl && (
              <Button 
                variant="ghost" 
                size="sm" 
                asChild
              >
                <a 
                  href={resource.sourceUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Source
                </a>
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ResourceList;