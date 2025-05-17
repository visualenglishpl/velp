import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { loadResources } from '@/lib/resourceRegistry';
import { TeacherResource } from '@/types/resources';
import { BookId, UnitId } from '@/types/content';

export default function TeacherResourceTest() {
  const [resources, setResources] = useState<TeacherResource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookId, setBookId] = useState<BookId>('1');
  const [unitId, setUnitId] = useState<UnitId>('1');

  const fetchResources = async () => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`Fetching resources for Book ${bookId} Unit ${unitId}...`);
      const result = await loadResources(bookId, unitId);
      console.log('Resource result:', result);
      
      setResources(result || []);
      
      if (!result || result.length === 0) {
        setError(`No resources found for Book ${bookId} Unit ${unitId}`);
      }
    } catch (err) {
      console.error('Error loading resources:', err);
      setError(`Error: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, [bookId, unitId]);

  const handleBookChange = (newBookId: string) => {
    setBookId(newBookId as BookId);
  };

  const handleUnitChange = (newUnitId: string) => {
    setUnitId(newUnitId as UnitId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Resource Test Page</h1>
      
      <div className="flex gap-4 mb-6">
        <div>
          <label className="block mb-2">Book ID:</label>
          <select 
            value={bookId} 
            onChange={(e) => handleBookChange(e.target.value)}
            className="p-2 border rounded"
          >
            {['1', '2', '3', '4', '5', '6', '7'].map(id => (
              <option key={id} value={id}>Book {id}</option>
            ))}
          </select>
        </div>
        
        <div>
          <label className="block mb-2">Unit ID:</label>
          <select 
            value={unitId} 
            onChange={(e) => handleUnitChange(e.target.value)}
            className="p-2 border rounded"
          >
            {Array.from({ length: 18 }, (_, i) => (i + 1).toString()).map(id => (
              <option key={id} value={id}>Unit {id}</option>
            ))}
          </select>
        </div>
        
        <div className="self-end">
          <Button onClick={fetchResources} disabled={loading}>
            {loading ? 'Loading...' : 'Refresh Resources'}
          </Button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-400 text-red-700 p-4 mb-6 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((resource) => (
          <Card key={resource.id} className="overflow-hidden">
            <CardHeader className="bg-primary/5">
              <CardTitle className="text-lg">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-muted-foreground mb-2">{resource.description}</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="px-2 py-1 bg-primary/10 rounded-full">
                  {resource.resourceType}
                </span>
                {resource.provider && (
                  <span className="px-2 py-1 bg-secondary/10 rounded-full">
                    {resource.provider}
                  </span>
                )}
              </div>
              
              {resource.resourceType === 'video' && resource.embedCode && (
                <div className="mt-4 border p-2 rounded bg-gray-50">
                  <div dangerouslySetInnerHTML={{ __html: resource.embedCode }} />
                </div>
              )}
              
              {resource.resourceType === 'pdf' && resource.pdfUrl && (
                <div className="mt-4">
                  <a 
                    href={resource.pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      
      {resources.length === 0 && !loading && !error && (
        <div className="text-center p-12 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-medium mb-2">No resources found</h3>
          <p className="text-muted-foreground">Try selecting a different book or unit.</p>
        </div>
      )}
    </div>
  );
}