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
                className="cursor-pointer transition-all hover:bg-primary/5 text-center p-2 rounded-md border border-gray-200 hover:border-primary"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 mb-1 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
                    <img 
                      src={`/api/direct/icons/VISUAL ${book.id}.gif`}
                      alt={`Book ${book.id.toUpperCase()}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // If the VISUAL gif fails, try the book icon path
                        const imgElement = e.target as HTMLImageElement;
                        
                        // Try the book unit1 thumbnail
                        imgElement.onerror = () => {
                          // Try first slide of unit
                          imgElement.onerror = () => {
                            // Final fallback with just text
                            const fallbackEl = e.target as HTMLImageElement;
                            fallbackEl.style.display = 'none'; // Hide the broken image
                          };
                          imgElement.src = `/api/direct/book${book.id}/unit1/00 A.png`;
                        };
                        imgElement.src = `/api/direct/book${book.id}/unit1/thumbnail.jpg`;
                      }}
                    />
                  </div>
                  <span className="text-xs font-medium text-primary">BOOK {book.id.toUpperCase()}</span>
                </div>
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
        className={`cursor-pointer transition-all text-center p-0.5 rounded-md border ${
          isSelected 
            ? 'border-primary bg-primary/10 text-primary' 
            : 'border-gray-200 hover:border-primary/60 hover:bg-gray-50'
        }`}
        onClick={() => selectUnit(unitId)}
      >
        <div className="flex items-center space-x-1">
          <div className="w-6 h-6 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
            <img 
              src={`/api/direct/book${selectedBookId}/icons/thumbnailsuni${selectedBookId}-${unitId}.png`}
              alt={`Unit ${unitId}`}
              className="w-full h-full object-cover"
              onError={(e) => {
                // If the unit thumbnail fails, try fallback paths
                const imgElement = e.target as HTMLImageElement;
                
                // Try the unit thumbnail.jpg
                imgElement.onerror = () => {
                  // If that fails, try the first slide of unit
                  imgElement.onerror = () => {
                    // Last fallback - just hide the image
                    const fallbackEl = e.target as HTMLImageElement;
                    fallbackEl.style.display = 'none';
                  };
                  imgElement.src = `/api/direct/book${selectedBookId}/unit${unitId}/00 A.png`;
                };
                imgElement.src = `/api/direct/book${selectedBookId}/unit${unitId}/thumbnail.jpg`;
              }}
            />
          </div>
          <span className="text-xs font-medium">{unitId}</span>
        </div>
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
      
      <div className="p-1.5 bg-gray-50 rounded-md border border-gray-200 mb-2">
        <div className="grid grid-cols-5 sm:grid-cols-7 md:grid-cols-9 gap-1">
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