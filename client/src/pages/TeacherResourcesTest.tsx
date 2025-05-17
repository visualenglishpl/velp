import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TeacherResourcesContainer } from '@/components/resources/TeacherResourcesContainer';
import { BookId, UnitId } from '@/types/content';

export default function TeacherResourcesTest() {
  const [bookId, setBookId] = useState<BookId>('1');
  const [unitId, setUnitId] = useState<UnitId>('1');

  const handleBookChange = (newBookId: string) => {
    setBookId(newBookId as BookId);
  };

  const handleUnitChange = (newUnitId: string) => {
    setUnitId(newUnitId as UnitId);
  };

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Teacher Resources Viewer</h1>
      
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
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <TeacherResourcesContainer 
          initialBookId={bookId}
          initialUnitId={unitId}
          showSelection={false}
          readOnly={true}
        />
      </div>
    </div>
  );
}