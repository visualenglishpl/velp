/**
 * Teacher Resources Test Page
 * 
 * This page tests the TeacherResourcesContainer component with various books and units
 */

import { useState } from 'react';
import { TeacherResourcesContainer } from '@/components/resources/TeacherResourcesContainer';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookId, UnitId } from '@/types/content';

export default function TeacherResourcesTest() {
  const [book, setBook] = useState<BookId>('1');
  const [unit, setUnit] = useState<UnitId>('1');
  
  // Generate book options
  const bookOptions = ['1', '2', '3', '4', '5', '6', '7'].map(id => ({
    id: id as BookId,
    name: `Book ${id}`
  }));
  
  // Generate unit options
  const getUnitOptions = (bookId: BookId) => {
    let unitCount = 18; // Default for Book 1
    
    if (bookId === '2' || bookId === '3') {
      unitCount = 18;
    } else if (bookId === '4' || bookId === '5' || bookId === '6' || bookId === '7') {
      unitCount = 16;
    }
    
    return Array.from({ length: unitCount }, (_, i) => ({
      id: `${i + 1}` as UnitId,
      name: `Unit ${i + 1}`
    }));
  };
  
  const unitOptions = getUnitOptions(book);

  return (
    <div className="container py-8 px-4 mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Teacher Resources Test Page
      </h1>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Select Book and Unit</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-2">Book</label>
              <Select 
                value={book} 
                onValueChange={(value) => {
                  setBook(value as BookId);
                  setUnit('1'); // Reset unit when book changes
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Book" />
                </SelectTrigger>
                <SelectContent>
                  {bookOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="w-full md:w-1/2">
              <label className="block text-sm font-medium mb-2">Unit</label>
              <Select value={unit} onValueChange={(value) => setUnit(value as UnitId)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent>
                  {unitOptions.map(option => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Resources for Book {book} Unit {unit}
        </h2>
        
        <TeacherResourcesContainer 
          initialBookId={book} 
          initialUnitId={unit} 
          showSelection={false}
          hideTabsInContentViewer={false} 
        />
      </div>
    </div>
  );
}