import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TeacherResource } from './TeacherResources';

interface ResourceDisplayProps {
  resource: TeacherResource;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ resource }) => {
  const renderResourceContent = () => {
    if (resource.embedCode) {
      return (
        <div 
          className="w-full rounded overflow-hidden aspect-video" 
          dangerouslySetInnerHTML={{ __html: resource.embedCode }} 
        />
      );
    }
    
    if (resource.sourceUrl && resource.resourceType === 'video') {
      return (
        <iframe
          src={resource.sourceUrl}
          className="w-full rounded aspect-video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          frameBorder="0"
          referrerPolicy="strict-origin-when-cross-origin"
          title={resource.title}
        />
      );
    }
    
    if (resource.sourceUrl && resource.resourceType === 'game') {
      return (
        <iframe
          src={resource.sourceUrl}
          className="w-full rounded aspect-video"
          style={{ maxWidth: '100%' }}
          width="500"
          height="380"
          frameBorder="0"
          allowFullScreen
          title={resource.title}
        />
      );
    }
    
    if (resource.sourceUrl && resource.resourceType === 'pdf') {
      return (
        <div className="flex justify-center">
          <a 
            href={resource.sourceUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/80"
          >
            View PDF
          </a>
        </div>
      );
    }
    
    return <div className="text-muted-foreground italic">No preview available</div>;
  };
  
  const getResourceTypeLabel = () => {
    switch (resource.resourceType) {
      case 'video': return 'Video';
      case 'game': return 'Interactive Game';
      case 'pdf': return 'PDF Document';
      case 'lesson': return 'Lesson Plan';
      case 'other': return 'Resource';
      default: return resource.resourceType;
    }
  };
  
  const getResourceTypeColor = () => {
    switch (resource.resourceType) {
      case 'video': return 'bg-red-500';
      case 'game': return 'bg-green-500';
      case 'pdf': return 'bg-blue-500';
      case 'lesson': return 'bg-yellow-500';
      case 'other': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };
  
  return (
    <Card className="shadow-md overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{resource.title}</CardTitle>
          <Badge variant="outline" className={`${getResourceTypeColor()} text-white`}>
            {getResourceTypeLabel()}
          </Badge>
        </div>
        <div className="text-xs text-muted-foreground">
          Provider: {resource.provider}
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        {renderResourceContent()}
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground bg-muted/30 pb-2">
        Book {resource.bookId} · Unit {resource.unitId}
      </CardFooter>
    </Card>
  );
};

export default ResourceDisplay;