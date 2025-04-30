import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Resource interface matching our server's response
interface Resource {
  id: string;
  bookId: string;
  unitId: string;
  title: string;
  resourceType: string;
  provider: string;
  sourceUrl: string;
  embedCode: string;
}

// Interface for the debug endpoint response
interface DebugResponse {
  success: boolean;
  resources: Resource[];
  message: string;
}

const ResourceCard = ({ resource }: { resource: Resource }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{resource.title}</CardTitle>
        <CardDescription>
          {resource.provider} | {resource.resourceType}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {resource.embedCode ? (
          <div 
            className="w-full overflow-hidden rounded-md" 
            dangerouslySetInnerHTML={{ __html: resource.embedCode }} 
          />
        ) : (
          <div className="flex flex-col items-center justify-center p-6 bg-muted rounded-md">
            <p className="text-muted-foreground mb-2">No embed code available</p>
            <a 
              href={resource.sourceUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Open Resource Link
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function TestResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch resources from our debug endpoint
  const fetchDebugResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Log the request 
      console.log("Fetching from debug endpoint: /api/debug/book7-unit9");
      
      const response = await fetch('/api/debug/book7-unit9', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Check if the response is ok
      if (!response.ok) {
        // Get the response text to help diagnose the issue
        const errorText = await response.text();
        console.error("Response not OK:", response.status, errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      // Parse the JSON
      try {
        const data: DebugResponse = await response.json();
        console.log("Debug endpoint response:", data);
        
        if (data.success) {
          setResources(data.resources);
        } else {
          setError(data.message || "Unknown error");
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error('Failed to parse response as JSON');
      }
    } catch (error) {
      setError(`Error fetching resources: ${error instanceof Error ? error.message : String(error)}`);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch resources from our no-auth endpoint
  const fetchNoAuthResources = async (unitId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Log the request 
      console.log(`Fetching from no-auth endpoint: /api/no-auth/book7/${unitId}/resources`);
      
      const response = await fetch(`/api/no-auth/book7/${unitId}/resources`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Check if the response is ok
      if (!response.ok) {
        // Get the response text to help diagnose the issue
        const errorText = await response.text();
        console.error("Response not OK:", response.status, errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      // Parse the JSON
      try {
        const data = await response.json();
        console.log("No-auth endpoint response:", data);
        
        if (data.success) {
          setResources(data.resources);
        } else {
          setError(data.message || "Unknown error");
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error('Failed to parse response as JSON');
      }
    } catch (error) {
      setError(`Error fetching resources: ${error instanceof Error ? error.message : String(error)}`);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch resources from direct endpoint
  const fetchDirectResources = async (bookId: string, unitId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // Log the request 
      console.log(`Fetching from direct endpoint: /api/direct/${bookId}/${unitId}/materials`);
      
      const response = await fetch(`/api/direct/${bookId}/${unitId}/materials`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Cache-Control': 'no-cache'
        }
      });
      
      // Check if the response is ok
      if (!response.ok) {
        // Get the response text to help diagnose the issue
        const errorText = await response.text();
        console.error("Response not OK:", response.status, errorText);
        throw new Error(`Server responded with ${response.status}: ${errorText}`);
      }
      
      // Parse the JSON
      try {
        const data = await response.json();
        console.log("Direct endpoint response:", data);
        
        // Handle different response formats
        if (Array.isArray(data)) {
          setResources(data);
        } else if (data.resources) {
          setResources(data.resources);
        } else {
          setError("Unexpected response format");
        }
      } catch (jsonError) {
        console.error("Failed to parse JSON:", jsonError);
        throw new Error('Failed to parse response as JSON');
      }
    } catch (error) {
      setError(`Error fetching resources: ${error instanceof Error ? error.message : String(error)}`);
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call API on component mount
  useEffect(() => {
    fetchDebugResources();
  }, []);

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Test Resources Page</h1>
      
      <Tabs defaultValue="debug" className="w-full mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="debug">Debug Endpoint</TabsTrigger>
          <TabsTrigger value="noauth">No-Auth Endpoint</TabsTrigger>
          <TabsTrigger value="direct">Direct Endpoint</TabsTrigger>
        </TabsList>
        
        <TabsContent value="debug">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Debug Endpoint Test</h2>
            <p className="text-muted-foreground mb-4">
              This tests our special debug endpoint for Book 7 Unit 9 resources.
            </p>
            <Button onClick={fetchDebugResources} disabled={loading}>
              {loading ? "Loading..." : "Fetch from Debug Endpoint"}
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="noauth">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">No-Auth Endpoint Test</h2>
            <p className="text-muted-foreground mb-4">
              This tests our no-auth endpoint for Book 7 resources by unit.
            </p>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => fetchNoAuthResources("6")} disabled={loading}>
                Unit 6 (Money)
              </Button>
              <Button onClick={() => fetchNoAuthResources("9")} disabled={loading}>
                Unit 9 (Jobs)
              </Button>
              <Button onClick={() => fetchNoAuthResources("11")} disabled={loading}>
                Unit 11 (Disasters)
              </Button>
              <Button onClick={() => fetchNoAuthResources("14")} disabled={loading}>
                Unit 14 (Social)
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="direct">
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Direct Endpoint Test</h2>
            <p className="text-muted-foreground mb-4">
              This tests our direct endpoint for accessing book and unit materials.
            </p>
            <div className="flex gap-2 mb-4">
              <Button onClick={() => fetchDirectResources("book7", "unit6")} disabled={loading}>
                Book 7 Unit 6
              </Button>
              <Button onClick={() => fetchDirectResources("book7", "unit9")} disabled={loading}>
                Book 7 Unit 9
              </Button>
              <Button onClick={() => fetchDirectResources("book7", "unit11")} disabled={loading}>
                Book 7 Unit 11
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Error display */}
      {error && (
        <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">
          <h3 className="font-semibold">Error</h3>
          <p>{error}</p>
        </div>
      )}
      
      {/* Loading indicator */}
      {loading && (
        <div className="flex justify-center my-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Results */}
      {!loading && resources.length === 0 && !error && (
        <div className="text-center my-8 p-6 bg-muted rounded-md">
          <p className="text-muted-foreground">No resources found</p>
        </div>
      )}
      
      {resources.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Resources ({resources.length})</h2>
          <div className="grid gap-6">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}