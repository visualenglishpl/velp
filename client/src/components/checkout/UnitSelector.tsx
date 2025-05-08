import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

type Unit = {
  unitNumber: string;
  title: string;
  thumbnailUrl?: string;
  description?: string;
  selected?: boolean;
};

type UnitSelectorProps = {
  bookId: string;
  initialSelectedUnit?: string;
  onUnitsSelected: (units: string[]) => void;
};

export default function UnitSelector({ bookId, initialSelectedUnit, onUnitsSelected }: UnitSelectorProps) {
  const { toast } = useToast();
  const [units, setUnits] = useState<Unit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Load units for this book
  useEffect(() => {
    const fetchUnits = async () => {
      try {
        setIsLoading(true);
        const res = await apiRequest('GET', `/api/books/${bookId}/units`);
        if (!res.ok) {
          throw new Error(`Failed to fetch units for book ${bookId}`);
        }
        
        const fetchedUnits = await res.json();
        
        // Mark the initial selected unit if provided
        const unitsWithSelection = fetchedUnits.map((unit: Unit) => ({
          ...unit,
          selected: initialSelectedUnit ? unit.unitNumber === initialSelectedUnit : false
        }));
        
        setUnits(unitsWithSelection);
        
        // If there's an initial selection, trigger the callback with it
        if (initialSelectedUnit) {
          onUnitsSelected([initialSelectedUnit]);
        }
      } catch (error) {
        console.error('Failed to load units', error);
        toast({
          title: 'Error',
          description: 'Failed to load units. Please try again.',
          variant: 'destructive'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (bookId) {
      fetchUnits();
    }
  }, [bookId, initialSelectedUnit, onUnitsSelected, toast]);

  // Handle unit selection toggle
  const toggleUnitSelection = (unitNumber: string) => {
    const updatedUnits = units.map(unit => {
      if (unit.unitNumber === unitNumber) {
        return {
          ...unit,
          selected: !unit.selected
        };
      }
      return unit;
    });
    
    setUnits(updatedUnits);
    
    // Notify parent component about selected units
    const selectedUnitNumbers = updatedUnits
      .filter(unit => unit.selected)
      .map(unit => unit.unitNumber);
      
    onUnitsSelected(selectedUnitNumbers);
  };

  // Handle select all units
  const selectAllUnits = () => {
    const updatedUnits = units.map(unit => ({
      ...unit,
      selected: true
    }));
    
    setUnits(updatedUnits);
    onUnitsSelected(updatedUnits.map(unit => unit.unitNumber));
  };

  // Handle clear all selections
  const clearAllSelections = () => {
    const updatedUnits = units.map(unit => ({
      ...unit,
      selected: false
    }));
    
    setUnits(updatedUnits);
    onUnitsSelected([]);
  };

  // If loading, show skeleton
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between mb-4">
          <h3 className="text-lg font-medium">Select Units</h3>
          <div className="space-x-2">
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse inline-block"></div>
            <div className="h-8 w-20 bg-gray-200 rounded animate-pulse inline-block"></div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 rounded animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-medium">Select Units</h3>
        <div className="space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={selectAllUnits}
            className="text-xs"
          >
            Select All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={clearAllSelections}
            className="text-xs"
          >
            Clear
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {units.map((unit) => (
          <Card 
            key={unit.unitNumber} 
            className={`p-4 cursor-pointer transition-all hover:shadow-md ${
              unit.selected ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => toggleUnitSelection(unit.unitNumber)}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <Label htmlFor={`unit-${unit.unitNumber}`} className="font-medium text-lg">
                  Unit {unit.unitNumber}
                </Label>
                <Checkbox 
                  id={`unit-${unit.unitNumber}`} 
                  checked={unit.selected} 
                  onCheckedChange={() => toggleUnitSelection(unit.unitNumber)}
                />
              </div>
              <div className="w-full aspect-square relative overflow-hidden rounded border">
                {unit.thumbnailUrl ? (
                  <img 
                    src={`/api/direct/content/${unit.thumbnailUrl}`} 
                    alt={`Thumbnail for unit ${unit.unitNumber}`}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      // If thumbnail fails to load, show No Preview
                      const img = e.currentTarget;
                      img.style.display = "none";
                      const container = img.parentElement;
                      if (container) {
                        const noPreview = document.createElement('div');
                        noPreview.className = "h-full w-full bg-gray-100 flex items-center justify-center";
                        noPreview.innerHTML = '<span class="text-gray-400 text-sm">No Preview</span>';
                        container.appendChild(noPreview);
                      }
                    }}
                  />
                ) : (
                  <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No Preview</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      <div className="mt-4 text-right">
        <div className="text-sm text-blue-600 font-medium">
          {units.filter(u => u.selected).length} units selected
        </div>
      </div>
    </div>
  );
}