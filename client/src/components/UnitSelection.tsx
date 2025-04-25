import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ChevronLeft } from 'lucide-react';

interface UnitSelectionProps {
  selectedBookId: string | null;
  selectedUnits: string[];
  setSelectedUnits: (units: string[]) => void;
  multipleUnits: boolean;
  setMultipleUnits: (value: boolean) => void;
  billingCycle: 'monthly' | 'yearly';
  bookOptions: Array<{ id: string; title: string }>;
  onSelectBook: (bookId: string) => void;
}

export function UnitSelection({
  selectedBookId,
  selectedUnits,
  setSelectedUnits,
  multipleUnits,
  setMultipleUnits,
  billingCycle,
  bookOptions,
  onSelectBook
}: UnitSelectionProps) {
  // Function to set a specific unit as selected (for single mode)
  const selectUnit = (unitId: string) => {
    if (multipleUnits) {
      // Toggle unit selection when multiple units are allowed
      setSelectedUnits(
        selectedUnits.includes(unitId)
          ? selectedUnits.filter(id => id !== unitId)
          : [...selectedUnits, unitId]
      );
    } else {
      // Select only this unit
      setSelectedUnits([unitId]);
    }
  };

  if (!selectedBookId) {
    return (
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3">Select a Book</h3>
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200 text-blue-800">
          <p className="text-sm mb-3">Please select a book to see available units:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
            {bookOptions.map(book => (
              <Button 
                key={book.id} 
                variant="outline"
                size="sm"
                onClick={() => onSelectBook(book.id)}
                className={`text-sm p-3 h-auto flex flex-col items-center justify-center`}
              >
                <span className="font-bold">BOOK {book.id.toUpperCase()}</span>
                {book.title && <span className="text-xs mt-1 text-gray-500">{book.title}</span>}
              </Button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Determine the number of units based on the book ID
  let unitCount = 10; // Default
  
  if (['0a', '0b', '0c'].includes(selectedBookId)) {
    unitCount = 20;
  } else if (['1', '2', '3'].includes(selectedBookId)) {
    unitCount = 18;
  } else if (['4', '5', '6', '7'].includes(selectedBookId)) {
    unitCount = 16;
  }
  
  // Generate unit elements
  const unitElements = [];
  for (let i = 1; i <= unitCount; i++) {
    const unitId = i.toString();
    const isSelected = selectedUnits.includes(unitId);
    
    unitElements.push(
      <div
        key={unitId}
        className={`cursor-pointer border-2 rounded-md overflow-hidden hover:bg-gray-50 p-2 text-center ${
          isSelected ? 'border-primary bg-primary/5' : 'border-gray-200'
        }`}
        onClick={() => selectUnit(unitId)}
      >
        <div className="font-medium">
          {isSelected && (
            <span className="text-primary mr-1">✓</span>
          )}
          UNIT {unitId}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-0 h-8 w-8"
              onClick={() => {
                // Clear unit selection and book selection
                setSelectedUnits([]);
                onSelectBook(null);
              }}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <h3 className="font-semibold text-lg">Select Units</h3>
          </div>
          <p className="text-sm text-gray-500 ml-8">
            {selectedBookId && `From BOOK ${selectedBookId.toUpperCase()}`}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Label htmlFor="multipleUnitsComponent" className="cursor-pointer text-sm font-medium">
            Add multiple units
          </Label>
          <Switch
            id="multipleUnitsComponent"
            checked={multipleUnits}
            onCheckedChange={setMultipleUnits}
          />
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 rounded-md border border-gray-200 mb-3">
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-9 gap-2">
          {unitElements}
        </div>
      </div>
      
      {selectedUnits.length > 0 && (
        <div className="mt-4 p-3 border rounded-md border-primary/20 bg-primary/5">
          <div className="flex flex-wrap gap-1 mb-2">
            {selectedUnits.map(unitId => (
              <div key={unitId} className="bg-primary/15 text-primary px-2 py-0.5 rounded text-xs font-medium">
                UNIT {unitId}
              </div>
            ))}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Units selected: {selectedUnits.length}</span>
            {selectedUnits.length > 1 && (
              <span className="text-sm font-bold text-primary">
                Total: €{billingCycle === 'monthly' ? 5 * selectedUnits.length : 40 * selectedUnits.length}
                <span className="text-xs ml-1 text-gray-500 font-normal">
                  ({billingCycle === 'monthly' ? 'monthly' : 'yearly'})
                </span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}