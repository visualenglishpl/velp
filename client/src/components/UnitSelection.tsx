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
  onSelectBook: (bookId: string | null) => void;
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
      <div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
          {bookOptions.map(book => {
            return (
              <button 
                key={book.id}
                onClick={() => onSelectBook(book.id)} 
                className="cursor-pointer transition-all hover:bg-primary/5 text-center p-3 rounded-md border border-gray-200 hover:border-primary font-medium text-primary"
              >
                BOOK {book.id.toUpperCase()}
              </button>
            );
          })}
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
      <button
        key={unitId}
        className={`cursor-pointer transition-all text-center p-1 rounded border text-xs ${
          isSelected 
            ? 'border-primary bg-primary/5 text-primary font-bold' 
            : 'border-gray-200 hover:border-primary hover:bg-gray-50'
        }`}
        onClick={() => selectUnit(unitId)}
      >
        {unitId}
      </button>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <button 
          className="text-primary text-sm flex items-center gap-1"
          onClick={() => {
            setSelectedUnits([]);
            onSelectBook(null);
          }}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to books
        </button>
        <div className="flex items-center space-x-2">
          <Label htmlFor="multipleUnitsComponent" className="cursor-pointer text-xs">
            Multiple units
          </Label>
          <Switch
            id="multipleUnitsComponent"
            checked={multipleUnits}
            onCheckedChange={setMultipleUnits}
            className="data-[state=checked]:bg-primary h-4 w-7"
          />
        </div>
      </div>
      <p className="text-sm font-medium mb-2">
        Book {selectedBookId.toUpperCase()} - Select units:
      </p>
      
      <div className="p-2 bg-gray-50 rounded-md border border-gray-200 mb-2">
        <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 gap-1">
          {unitElements}
        </div>
      </div>
      
      {selectedUnits.length > 0 && (
        <div className="mt-2 flex justify-between items-center border-t pt-2 text-sm">
          <span className="font-medium">Units selected: {selectedUnits.length}</span>
          {selectedUnits.length > 1 && (
            <span className="font-bold text-primary">
              Total: €{billingCycle === 'monthly' ? 5 * selectedUnits.length : 40 * selectedUnits.length}
              <span className="text-xs ml-1 text-gray-500 font-normal">
                ({billingCycle === 'monthly' ? 'monthly' : 'yearly'})
              </span>
            </span>
          )}
        </div>
      )}
    </div>
  );
}