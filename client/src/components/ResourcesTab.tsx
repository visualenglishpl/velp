import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TeacherResource } from '@/types/teacher-resources';
import { Gamepad2, Video } from 'lucide-react';
import { dynamicResourceImport } from '../lib/resource-loader';

interface ResourcesTabProps {
  bookId?: string;
  unitId?: string;
  hasPaidAccess?: boolean;
}

export default function ResourcesTab({ bookId, unitId, hasPaidAccess = false }: ResourcesTabProps) {
  const [videos, setVideos] = useState<TeacherResource[]>([]);
  const [games, setGames] = useState<TeacherResource[]>([]);
  const [selectedResource, setSelectedResource] = useState<TeacherResource | null>(null);
  const [activeTab, setActiveTab] = useState('videos');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadResources = async () => {
      if (!bookId || !unitId) return;
      
      setIsLoading(true);
      try {
        // Load resources dynamically
        const resources = await dynamicResourceImport(bookId, parseInt(unitId));
        
        if (resources) {
          // Filter resources by type
          const fetchedVideos = resources.filter((r: TeacherResource) => r.resourceType === 'video');
          const fetchedGames = resources.filter((r: TeacherResource) => r.resourceType === 'game');
          
          setVideos(fetchedVideos);
          setGames(fetchedGames);
          
          // Auto-select the first resource if available
          if (fetchedVideos.length > 0 && activeTab === 'videos') {
            setSelectedResource(fetchedVideos[0]);
          } else if (fetchedGames.length > 0 && activeTab === 'games') {
            setSelectedResource(fetchedGames[0]);
          }
        }
      } catch (error) {
        console.error('Error loading interactive resources:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadResources();
  }, [bookId, unitId, activeTab]);

  const handleSelectResource = (resource: TeacherResource) => {
    setSelectedResource(resource);
  };

  const renderResourceList = (resources: TeacherResource[]) => {
    if (resources.length === 0) {
      return (
        <div className="text-center py-8 text-muted-foreground">
          No resources available for this unit.
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4">
        {resources.map((resource) => (
          <Button
            key={resource.id}
            variant={selectedResource?.id === resource.id ? "default" : "outline"}
            className="h-auto py-2 px-2 flex-col text-xs justify-start items-center text-center truncate"
            onClick={() => handleSelectResource(resource)}
          >
            {resource.resourceType === 'video' ? (
              <Video className="h-4 w-4 mb-1" />
            ) : (
              <Gamepad2 className="h-4 w-4 mb-1" />
            )}
            <span className="w-full truncate">{resource.title}</span>
          </Button>
        ))}
      </div>
    );
  };

  const renderResourceContent = () => {
    if (!selectedResource) {
      return (
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          Select a resource to view
        </div>
      );
    }

    if (!hasPaidAccess) {
      return (
        <div className="relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm text-white z-10 p-4 text-center">
            <h3 className="text-xl font-semibold mb-2">Premium Content</h3>
            <p className="text-sm mb-4">Subscribe to access all interactive resources</p>
            <Button 
              size="sm" 
              variant="default"
              className="bg-primary text-white hover:bg-primary/90"
              onClick={() => window.location.href = '/auth'}
            >
              Upgrade Now
            </Button>
          </div>

          {/* Blurred background content */}
          <div className="blur-md brightness-75 h-64 flex items-center justify-center">
            {renderResourceContentByType(selectedResource)}
          </div>
        </div>
      );
    }

    return renderResourceContentByType(selectedResource);
  };

  const renderResourceContentByType = (resource: TeacherResource) => {
    if (resource.resourceType === 'video' && resource.content?.type === 'youtube') {
      return (
        <div className="aspect-video w-full">
          <iframe
            src={`https://www.youtube.com/embed/${resource.content.embedId}`}
            title={resource.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    } else if (resource.resourceType === 'game' && resource.content?.type === 'wordwall') {
      return (
        <div className="w-full">
          <iframe
            src={resource.content.embedUrl}
            title={resource.title}
            className="w-full h-[380px] max-w-full"
            allowFullScreen
          ></iframe>
        </div>
      );
    }

    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Resource format not supported
      </div>
    );
  };

  return (
    <Card>
      <CardContent className="p-4">
        <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="videos" className="flex items-center">
              <Video className="h-4 w-4 mr-1" /> Videos
              {videos.length > 0 && (
                <span className="ml-1 text-xs bg-primary/20 text-primary rounded-full px-1.5">
                  {videos.length}
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger value="games" className="flex items-center">
              <Gamepad2 className="h-4 w-4 mr-1" /> Games
              {games.length > 0 && (
                <span className="ml-1 text-xs bg-primary/20 text-primary rounded-full px-1.5">
                  {games.length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {renderResourceList(videos)}
                <div className="mt-4 border-t pt-4">
                  {renderResourceContent()}
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="games" className="mt-0">
            {isLoading ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {renderResourceList(games)}
                <div className="mt-4 border-t pt-4">
                  {renderResourceContent()}
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
