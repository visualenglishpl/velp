import { TeacherResource } from './TeacherResources.fixed';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Gamepad2, FileText, Book, Image, ExternalLink, Printer } from 'lucide-react';

interface ResourceCardProps {
  resource: TeacherResource;
  isEditMode?: boolean;
  onEdit?: (resource: TeacherResource) => void;
  onDelete?: (resource: TeacherResource) => void;
}

const ResourceCard = ({ 
  resource, 
  isEditMode = false, 
  onEdit, 
  onDelete 
}: ResourceCardProps) => {
  
  const getIcon = () => {
    switch(resource.resourceType) {
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      case 'game': return <Gamepad2 className="h-5 w-5 text-green-500" />;
      case 'lesson': return <Book className="h-5 w-5 text-amber-500" />;
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      default: return <Image className="h-5 w-5 text-purple-500" />;
    }
  };

  return (
    <Card className="mb-4 transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            {getIcon()}
            <CardTitle className="text-lg">{resource.title}</CardTitle>
          </div>
          {isEditMode && onEdit && onDelete && (
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" onClick={() => onEdit(resource)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil">
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/>
                  <path d="m15 5 4 4"/>
                </svg>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onDelete(resource)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-red-500">
                  <path d="M3 6h18"/>
                  <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                  <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  <line x1="10" y1="11" x2="10" y2="17"/>
                  <line x1="14" y1="11" x2="14" y2="17"/>
                </svg>
              </Button>
            </div>
          )}
        </div>
        <CardDescription>
          {resource.provider && <Badge variant="outline" className="mr-2">{resource.provider}</Badge>}
          <Badge>{resource.resourceType}</Badge>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {resource.resourceType === 'video' && resource.embedCode && (
          <div className="aspect-video mb-2" dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
        )}
        {resource.resourceType === 'game' && resource.embedCode && (
          <div className="min-h-[400px] mb-2" dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
        )}
        {resource.resourceType === 'lesson' && resource.lessonPlan && (
          <div className="mb-2">
            <p className="text-sm mb-2"><strong>Level:</strong> {resource.lessonPlan?.level}</p>
            <p className="text-sm mb-2"><strong>Duration:</strong> {resource.lessonPlan?.duration}</p>
            <p className="text-sm"><strong>Objectives:</strong> {resource.lessonPlan?.objectives?.slice(0, 2).join(', ')}{resource.lessonPlan?.objectives?.length > 2 ? '...' : ''}</p>
          </div>
        )}
      </CardContent>
      <CardFooter className="pt-0 flex justify-between">
        {resource.sourceUrl && (
          <Button variant="outline" size="sm" asChild>
            <a href={resource.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center">
              <ExternalLink className="h-4 w-4 mr-2" /> Visit Source
            </a>
          </Button>
        )}
        {resource.resourceType === 'lesson' && resource.lessonPlan ? (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => {
              if (resource.lessonPlan?.id) {
                window.open(`/lesson-plan/${resource.lessonPlan.id}`, '_blank');
              }
            }}
          >
            <Printer className="h-4 w-4 mr-2" /> Print Lesson
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
};

export default ResourceCard;