import React, { useEffect, useState } from 'react';
import { dynamicResourceImport } from '@/lib/resource-loader';
import { TeacherResource } from '@/types/teacher-resources';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface InlineResourceViewerProps {
  bookId: string;
  unitId: string;
  hasPaidAccess?: boolean;
}

export default function InlineResourceViewer({ bookId, unitId, hasPaidAccess = false }: InlineResourceViewerProps) {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('videos');
  const [selectedResource, setSelectedResource] = useState<TeacherResource | null>(null);

  // Filter resources by type (video, game, etc.)
  const videos = resources.filter(r => r.resourceType === 'video');
  const games = resources.filter(r => r.resourceType === 'game');

  useEffect(() => {
    const loadResources = async () => {
      if (!bookId || !unitId) {
        setResources([]);
        setLoading(false);
        return;
      }

      try {
        const unitNumber = parseInt(unitId);
        if (isNaN(unitNumber)) {
          setResources([]);
          setLoading(false);
          return;
        }

        const loadedResources = await dynamicResourceImport(bookId, unitNumber);
        setResources(loadedResources);

        // If resources are available, set the first one as selected
        if (loadedResources.length > 0) {
          const videos = loadedResources.filter(r => r.resourceType === 'video');
          const games = loadedResources.filter(r => r.resourceType === 'game');
          
          if (videos.length > 0) {
            setSelectedResource(videos[0]);
            setActiveTab('videos');
          } else if (games.length > 0) {
            setSelectedResource(games[0]);
            setActiveTab('games');
          }
        }
      } catch (error) {
        console.error('Error loading resources:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResources();
  }, [bookId, unitId]);

  const handleResourceSelect = (resource: TeacherResource) => {
    setSelectedResource(resource);
  };

  const renderResourceContent = (resource: TeacherResource) => {
    if (!resource) return null;

    if (resource.resourceType === 'video' && resource.content.embedId) {
      // Render YouTube embed
      return (
        <div className="relative pb-[56.25%] h-0 overflow-hidden max-w-full">
          <iframe 
            src={`https://www.youtube.com/embed/${resource.content.embedId}`}
            className="absolute top-0 left-0 w-full h-full"
            title={resource.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    } else if (resource.resourceType === 'game' && resource.content.embedUrl) {
      // Render Wordwall or other game embed
      return (
        <div className="relative pb-[75%] h-0 overflow-hidden max-w-full">
          <iframe 
            src={resource.content.embedUrl}
            className="absolute top-0 left-0 w-full h-full"
            title={resource.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );
    } else {
      return (
        <div className="p-4 bg-gray-100 rounded-md">
          <p>No preview available for this resource.</p>
        </div>
      );
    }
  };

  // If no resources are available
  if (!loading && resources.length === 0) {
    return null; // Don't show anything if no resources
  }

  // If no videos or games are available
  if (!loading && videos.length === 0 && games.length === 0) {
    return null; // Don't show anything if no videos or games
  }

  // Main content display for the selected resource
  const renderMainContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      );
    }

    if (!selectedResource) {
      return (
        <div className="p-4 bg-gray-100 rounded-md">
          <p>Select a resource to view.</p>
        </div>
      );
    }

    return renderResourceContent(selectedResource);
  };

  return (
    <div className="mt-2 mb-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger 
            value="videos" 
            disabled={videos.length === 0}
            className={videos.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Videos ({videos.length})
          </TabsTrigger>
          <TabsTrigger 
            value="games" 
            disabled={games.length === 0}
            className={games.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
          >
            Games ({games.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="mt-4">
          {videos.length > 0 ? (
            <>
              <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
                {videos.map((video) => (
                  <div 
                    key={video.id} 
                    className={`flex-shrink-0 w-36 cursor-pointer ${selectedResource?.id === video.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleResourceSelect(video)}
                  >
                    <Card>
                      <CardContent className="p-2">
                        <div className="aspect-video bg-gray-200 rounded mb-1 overflow-hidden">
                          {video.thumbnailUrl ? (
                            <img 
                              src={video.thumbnailUrl} 
                              alt={video.title} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-xs text-gray-500">No thumbnail</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs truncate">{video.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              {renderMainContent()}
            </>
          ) : (
            <div className="p-4 text-center bg-gray-100 rounded-md">
              <p>No videos available for this unit.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="games" className="mt-4">
          {games.length > 0 ? (
            <>
              <div className="flex overflow-x-auto pb-2 gap-2 mb-4">
                {games.map((game) => (
                  <div 
                    key={game.id} 
                    className={`flex-shrink-0 w-36 cursor-pointer ${selectedResource?.id === game.id ? 'ring-2 ring-primary' : ''}`}
                    onClick={() => handleResourceSelect(game)}
                  >
                    <Card>
                      <CardContent className="p-2">
                        <div className="aspect-video bg-gray-200 rounded mb-1 overflow-hidden">
                          {game.thumbnailUrl ? (
                            <img 
                              src={game.thumbnailUrl} 
                              alt={game.title} 
                              className="object-cover w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200">
                              <span className="text-xs text-gray-500">Game</span>
                            </div>
                          )}
                        </div>
                        <p className="text-xs truncate">{game.title}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
              {renderMainContent()}
            </>
          ) : (
            <div className="p-4 text-center bg-gray-100 rounded-md">
              <p>No games available for this unit.</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
