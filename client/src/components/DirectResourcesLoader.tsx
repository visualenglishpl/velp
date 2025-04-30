import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TeacherResource } from './TeacherResources.fixed';
import ResourceCard from './ResourceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DirectResourcesLoaderProps {
  bookId: string;
  unitId: string;
}

const DirectResourcesLoader = ({ bookId, unitId }: DirectResourcesLoaderProps) => {
  const { toast } = useToast();
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Only use the no-auth endpoint for Book 7
  const isBook7 = bookId === '7' || bookId === 'book7';
  
  // Extract unit number from unitId (e.g., 'unit9' -> '9')
  const unitNumber = unitId.replace(/\D/g, '');

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Use the no-auth endpoint only for Book 7
        const endpoint = isBook7 
          ? `/api/no-auth/book7/${unitNumber}/resources`
          : `/api/direct/${bookId}/${unitId}/resources`;
        
        console.log(`Fetching resources from ${endpoint}`);
        
        const response = await fetch(endpoint, {
          credentials: "include",
          headers: {
            "Accept": "application/json",
          }
        });
        
        // Check content type before trying to parse as JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const data = await response.json();
          
          if (data.success && data.resources) {
            console.log(`Received ${data.resources.length} resources from ${endpoint}`);
            setResources(data.resources);
          } else {
            // Handle API error response
            setError(data.error || 'Failed to load resources');
            console.warn('API returned error:', data.error);
          }
        } else {
          // If not JSON, log the issue and set error
          const text = await response.text();
          console.warn('Received non-JSON response:', text.substring(0, 150) + '...');
          setError('Received invalid response format from server');
        }
      } catch (err) {
        console.error('Error fetching resources:', err);
        setError('Failed to fetch resources');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (bookId && unitId) {
      fetchResources();
    }
  }, [bookId, unitId, isBook7, unitNumber]);

  // Group resources by type for tab display
  const videos = resources.filter(r => r.resourceType === 'video');
  const games = resources.filter(r => r.resourceType === 'game');
  const lessons = resources.filter(r => r.resourceType === 'lesson');
  const others = resources.filter(r => !['video', 'game', 'lesson'].includes(r.resourceType));
  
  if (isLoading) {
    return (
      <div className="w-full p-6 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" />
        <p className="mt-2">Loading resources...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (resources.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Teacher Resources</CardTitle>
        </CardHeader>
        <CardContent>
          <p>No resources available for this unit.</p>
        </CardContent>
      </Card>
    );
  }

  // If we have resources, render them in tabs
  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Teacher Resources</h2>
      
      <Tabs defaultValue={videos.length > 0 ? "videos" : games.length > 0 ? "games" : "all"}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({resources.length})</TabsTrigger>
          {videos.length > 0 && <TabsTrigger value="videos">Videos ({videos.length})</TabsTrigger>}
          {games.length > 0 && <TabsTrigger value="games">Games ({games.length})</TabsTrigger>}
          {lessons.length > 0 && <TabsTrigger value="lessons">Lessons ({lessons.length})</TabsTrigger>}
          {others.length > 0 && <TabsTrigger value="others">Other ({others.length})</TabsTrigger>}
        </TabsList>
        
        <TabsContent value="all" className="space-y-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          {videos.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="games" className="space-y-4">
          {games.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-4">
          {lessons.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="others" className="space-y-4">
          {others.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DirectResourcesLoader;