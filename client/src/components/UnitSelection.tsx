import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

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
      <div className="mb-4 p-3 bg-blue-50 rounded-md border border-blue-200 text-blue-800">
        <p className="text-sm">Please select a book to see available units</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
          {bookOptions.map(book => (
            <Button 
              key={book.id} 
              variant="outline"
              size="sm"
              onClick={() => onSelectBook(book.id)}
              className="text-xs"
            >
              Book {book.id.toUpperCase()}
            </Button>
          ))}
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
          {unitId}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-lg">Select Units</h3>
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
      
      <div className="grid grid-cols-5 md:grid-cols-9 gap-2">
        {unitElements}
      </div>
      
      <div className="mt-4 text-sm text-gray-600">
        {selectedUnits.length > 0 && (
          <p>
            <span className="font-medium">Selected:</span> {selectedUnits.map(unitId => `UNIT ${unitId}`).join(', ')}
            {selectedUnits.length > 1 && (
              <span className="font-medium text-primary ml-2">
                Total: €{billingCycle === 'monthly' ? 5 * selectedUnits.length : 40 * selectedUnits.length}
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
}