import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ResourceList } from './ResourceList';
import { TeacherResource } from '@/types/TeacherResource';
import { LessonPlanTemplate } from './LessonPlanTemplate';
import { SlidesBasedLessonPlan } from './SlidesBasedLessonPlan';
import {
  ArrowLeftRight,
  BookOpen,
  Clock,
  Download,
  ExternalLink,
  FileText,
  Printer,
  Video,
  Gamepad2,
  FileCog,
  Layers
} from 'lucide-react';

interface SideBySideLessonPlanViewProps {
  bookId: string;
  unitId: string;
  resources: TeacherResource[];
  isLoading?: boolean;
}

export function SideBySideLessonPlanView({
  bookId,
  unitId,
  resources,
  isLoading = false
}: SideBySideLessonPlanViewProps) {
  const [layout, setLayout] = useState<'split' | 'resources' | 'plan'>('split');
  const [resourceType, setResourceType] = useState<'all' | 'video' | 'game' | 'pdf'>('all');
  
  // Filter resources by type
  const filteredResources = resourceType === 'all'
    ? resources
    : resources.filter(r => r.resourceType === resourceType);
  
  // Get resource count by type
  const resourceCounts = {
    all: resources.length,
    video: resources.filter(r => r.resourceType === 'video').length,
    game: resources.filter(r => r.resourceType === 'game').length,
    pdf: resources.filter(r => r.resourceType === 'pdf').length
  };
  
  return (
    <div className="space-y-4">
      {/* Controls header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-primary/5 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          <h2 className="font-medium">Book {bookId}, Unit {unitId} Lesson Plan</h2>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLayout('split')}
            className={layout === 'split' ? 'bg-primary/10' : ''}
          >
            <ArrowLeftRight className="h-4 w-4 mr-1" />
            <span>Side-by-Side</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLayout('resources')}
            className={layout === 'resources' ? 'bg-primary/10' : ''}
          >
            <FileCog className="h-4 w-4 mr-1" />
            <span>Resources</span>
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setLayout('plan')}
            className={layout === 'plan' ? 'bg-primary/10' : ''}
          >
            <Layers className="h-4 w-4 mr-1" />
            <span>Slides-Based Plan</span>
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-1" />
            <span>Print</span>
          </Button>
        </div>
      </div>
      
      {/* Main content area */}
      <div className={`grid ${layout === 'split' ? 'grid-cols-1 md:grid-cols-2 gap-6' : 'grid-cols-1'}`}>
        {/* Resources panel - always visible in split or resources mode */}
        {(layout === 'split' || layout === 'resources') && (
          <div className={layout === 'resources' ? 'col-span-full' : ''}>
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Unit Resources</CardTitle>
                  <div className="flex gap-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className={resourceType === 'all' ? 'bg-primary/10' : ''}
                      onClick={() => setResourceType('all')}
                    >
                      All ({resourceCounts.all})
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={resourceType === 'video' ? 'bg-primary/10' : ''}
                      onClick={() => setResourceType('video')}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      Videos ({resourceCounts.video})
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={resourceType === 'game' ? 'bg-primary/10' : ''}
                      onClick={() => setResourceType('game')}
                    >
                      <Gamepad2 className="h-4 w-4 mr-1" />
                      Games ({resourceCounts.game})
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className={resourceType === 'pdf' ? 'bg-primary/10' : ''}
                      onClick={() => setResourceType('pdf')}
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      PDFs ({resourceCounts.pdf})
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                {isLoading ? (
                  <div className="flex justify-center py-12">
                    <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
                  </div>
                ) : filteredResources.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <FileText className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No resources found for the selected filter.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredResources.map((resource) => (
                      <ResourceCard key={resource.id} resource={resource} />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Lesson plan panel - always visible in split or plan mode */}
        {(layout === 'split' || layout === 'plan') && (
          <div className={layout === 'plan' ? 'col-span-full' : ''}>
            <Card>
              <CardHeader className="bg-primary/5 pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center">
                    <Layers className="h-4 w-4 mr-2" />
                    <span>Slides-Based Lesson Plan</span>
                  </CardTitle>
                  
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    <span>Save</span>
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent className="p-4">
                <SlidesBasedLessonPlan 
                  bookId={bookId} 
                  unitId={unitId} 
                />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}

// Component for individual resource cards
function ResourceCard({ resource }: { resource: TeacherResource }) {
  const getResourceIcon = () => {
    switch (resource.resourceType) {
      case 'video':
        return <Video className="h-4 w-4 text-red-500" />;
      case 'game':
        return <Gamepad2 className="h-4 w-4 text-indigo-500" />;
      case 'pdf':
        return <FileText className="h-4 w-4 text-blue-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };
  
  // Get YouTube thumbnail for videos
  const getThumbnail = () => {
    if (resource.resourceType === 'video' && resource.youtubeVideoId) {
      return `https://img.youtube.com/vi/${resource.youtubeVideoId}/mqdefault.jpg`;
    }
    return null;
  };
  
  // Clean up title for display
  const getCleanTitle = () => {
    let title = resource.title;
    if (resource.resourceType === 'video') {
      title = title.replace(/^(video|video -|video:|00 c . video)\s*/i, '').trim();
    }
    if (resource.resourceType === 'game') {
      title = title.replace(/^(game|game -|game:|online game|wordwall)\s*/i, '').trim();
    }
    return title;
  };
  
  const thumbnail = getThumbnail();
  
  return (
    <div className="rounded-lg overflow-hidden border shadow-sm hover:shadow-md transition-shadow">
      {thumbnail ? (
        <div className="relative aspect-video bg-gray-100">
          <img src={thumbnail} alt={resource.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors">
            <div className="w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
              <Video className="h-4 w-4 text-primary ml-0.5" />
            </div>
          </div>
        </div>
      ) : (
        <div className={`
          aspect-video flex items-center justify-center
          ${resource.resourceType === 'game' ? 'bg-indigo-50' : ''}
          ${resource.resourceType === 'pdf' ? 'bg-blue-50' : ''}
          ${!resource.resourceType || resource.resourceType === 'other' ? 'bg-gray-50' : ''}
        `}>
          {getResourceIcon()}
        </div>
      )}
      
      <div className="p-2">
        <div className="flex items-center gap-1 mb-1">
          {getResourceIcon()}
          <span className="text-xs text-muted-foreground capitalize">{resource.resourceType}</span>
        </div>
        <h3 className="text-xs font-medium line-clamp-2">{getCleanTitle()}</h3>
      </div>
    </div>
  );
}