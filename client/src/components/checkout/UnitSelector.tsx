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
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {units.map((unit) => (
          <Card 
            key={unit.unitNumber} 
            className={`p-3 cursor-pointer transition-all ${
              unit.selected ? 'border-blue-500 bg-blue-50' : ''
            }`}
            onClick={() => toggleUnitSelection(unit.unitNumber)}
          >
            <div className="flex items-start space-x-2">
              <Checkbox 
                id={`unit-${unit.unitNumber}`} 
                checked={unit.selected} 
                onCheckedChange={() => toggleUnitSelection(unit.unitNumber)}
                className="mt-1"
              />
              <div>
                <Label htmlFor={`unit-${unit.unitNumber}`} className="font-medium">
                  Unit {unit.unitNumber}
                </Label>
                {unit.thumbnailUrl && (
                  <div className="mt-2 w-full h-12 relative overflow-hidden rounded">
                    <img 
                      src={unit.thumbnailUrl} 
                      alt={`Thumbnail for unit ${unit.unitNumber}`}
                      className="object-cover w-full h-full"
                    />
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