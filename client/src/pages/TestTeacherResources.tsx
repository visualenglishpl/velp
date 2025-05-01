import { useState, useEffect } from 'react';
import TeacherResources from '@/components/TeacherResources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const TestTeacherResources = () => {
  const [bookId, setBookId] = useState('7');
  const [unitId, setUnitId] = useState('6');
  
  // Parse query parameters on component mount
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const bookParam = searchParams.get('book');
    const unitParam = searchParams.get('unit');
    
    if (bookParam) {
      setBookId(bookParam);
    }
    
    if (unitParam) {
      setUnitId(unitParam);
    }
  }, []);
  
  return (
    <div className="container mx-auto py-8">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Teacher Resources Test Page</CardTitle>
          <CardDescription>
            This page tests the TeacherResources component independently of the content viewer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium mb-1">Book ID:</label>
              <select 
                className="border rounded p-2"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
              >
                {Array.from({length: 7}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num.toString()}>{num}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Unit ID:</label>
              <select 
                className="border rounded p-2"
                value={unitId}
                onChange={(e) => setUnitId(e.target.value)}
              >
                {Array.from({length: 16}, (_, i) => i + 1).map(num => (
                  <option key={num} value={num.toString()}>{num}</option>
                ))}
              </select>
            </div>
            <div className="self-end">
              <Button 
                variant="default"
                onClick={() => window.location.href = `/test-teacher-resources?book=${bookId}&unit=${unitId}`}
              >
                Load Resources
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <TeacherResources bookId={bookId} unitId={unitId} />
    </div>
  );
};

export default TestTeacherResources;