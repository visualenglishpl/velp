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
      <div className="mb-4">
        <h3 className="font-semibold text-lg mb-3">Select a Book</h3>
        <div className="p-4 bg-blue-50 rounded-md border border-blue-200">
          <p className="text-sm mb-3 text-blue-800">Please select a book to see available units:</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
            {bookOptions.map(book => {
              // Extract the description from the title if it exists
              const bookName = `BOOK ${book.id.toUpperCase()}`;
              const bookDesc = book.title?.replace(bookName, '')?.trim() || '';
              
              return (
                <div 
                  key={book.id}
                  onClick={() => onSelectBook(book.id)} 
                  className="cursor-pointer transition-all hover:scale-105 text-center"
                >
                  <div className="bg-white border border-blue-100 rounded-md overflow-hidden hover:border-primary">
                    <div className="h-16 bg-blue-50 flex items-center justify-center relative">
                      <img
                        src={`https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/icons/VISUAL ${book.id}.gif`}
                        alt={`Book ${book.id.toUpperCase()} thumbnail`}
                        className="w-full h-full object-contain opacity-90"
                        onError={(e) => {
                          // Fallback if image doesn't exist, display a colored background with book ID
                          const img = e.currentTarget;
                          if (img.parentElement) {
                            img.style.display = 'none';
                            // Create and append a new div instead of setting innerHTML
                            const fallbackDiv = document.createElement('div');
                            fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-blue-100 text-primary font-bold text-xl';
                            fallbackDiv.textContent = book.id.toUpperCase();
                            img.parentElement.appendChild(fallbackDiv);
                          }
                        }}
                      />
                    </div>
                    <div className="p-1 text-center">
                      <div className="font-bold text-primary text-xs">{book.id.toUpperCase()}</div>
                    </div>
                  </div>
                </div>
              );
            })}
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
        className={`cursor-pointer border rounded-md overflow-hidden transition-all relative ${
          isSelected ? 'border-primary shadow-sm' : 'border-gray-200'
        }`}
        onClick={() => selectUnit(unitId)}
      >
        {isSelected && (
          <div className="absolute top-0.5 right-0.5 z-10">
            <div className="bg-primary text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px]">✓</div>
          </div>
        )}
        <div className={`h-12 ${isSelected ? 'bg-primary/10' : 'bg-gray-50'} flex items-center justify-center`}>
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={`https://visualenglishmaterial.s3.eu-north-1.amazonaws.com/book${selectedBookId}/icons/unit${unitId}.jpg`}
              alt={`Unit ${unitId} thumbnail`}
              className="w-full h-full object-contain opacity-90"
              onError={(e) => {
                // Fallback if image doesn't exist, display a colored background with unit number
                const img = e.currentTarget;
                if (img.parentElement) {
                  img.style.display = 'none';
                  // Create and append a new div instead of setting innerHTML
                  const fallbackDiv = document.createElement('div');
                  fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-blue-100 text-primary font-bold text-base';
                  fallbackDiv.textContent = unitId;
                  img.parentElement.appendChild(fallbackDiv);
                }
              }}
            />
          </div>
        </div>
        <div className={`p-1 text-center ${isSelected ? 'bg-primary/5' : 'bg-white'}`}>
          <div className="font-medium">
            <div className={`text-xs ${isSelected ? 'text-primary font-bold' : ''}`}>
              {unitId}
            </div>
          </div>
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
        <div className="flex items-center space-x-2 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-200">
          <Label htmlFor="multipleUnitsComponent" className="cursor-pointer text-sm font-medium">
            Add multiple units
          </Label>
          <Switch
            id="multipleUnitsComponent"
            checked={multipleUnits}
            onCheckedChange={setMultipleUnits}
            className="data-[state=checked]:bg-primary"
          />
        </div>
      </div>
      
      <div className="p-3 bg-gray-50 rounded-md border border-gray-200 mb-4">
        <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
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