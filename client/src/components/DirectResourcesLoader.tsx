import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { TeacherResource } from './TeacherResources.fixed';
// Import individual card rendering components
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Video, Gamepad2, FileText, Book, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Internal ResourceCard component 
const ResourceCard = ({ resource }: { resource: TeacherResource }) => {
  const getIcon = () => {
    switch(resource.resourceType) {
      case 'video': return <Video className="h-5 w-5 text-blue-500" />;
      case 'game': return <Gamepad2 className="h-5 w-5 text-green-500" />;
      case 'lesson': return <Book className="h-5 w-5 text-amber-500" />;
      case 'pdf': return <FileText className="h-5 w-5 text-red-500" />;
      default: return <ImageIcon className="h-5 w-5 text-purple-500" />;
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
        </div>
        <div className="flex mt-1 gap-2">
          {resource.provider && <Badge variant="outline" className="bg-white/50 text-xs font-normal">{resource.provider}</Badge>}
          <Badge variant="outline" className="bg-white/50 text-xs font-normal">{resource.resourceType}</Badge>
        </div>
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
      </CardFooter>
    </Card>
  );
};

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
            <ResourceCard key={resource.id || resource.title} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="videos" className="space-y-4">
          {videos.map((resource) => (
            <ResourceCard key={resource.id || resource.title} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="games" className="space-y-4">
          {games.map((resource) => (
            <ResourceCard key={resource.id || resource.title} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="lessons" className="space-y-4">
          {lessons.map((resource) => (
            <ResourceCard key={resource.id || resource.title} resource={resource} />
          ))}
        </TabsContent>
        
        <TabsContent value="others" className="space-y-4">
          {others.map((resource) => (
            <ResourceCard key={resource.id || resource.title} resource={resource} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DirectResourcesLoader;