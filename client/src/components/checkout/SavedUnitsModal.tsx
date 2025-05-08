import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkPlus, Trash2 } from "lucide-react";

interface SavedUnit {
  bookId: string;
  bookTitle: string;
  unitNumbers: string[];
  timestamp: Date;
}

interface SavedUnitsModalProps {
  savedUnits: SavedUnit[];
  onClearSaved: () => void;
  onRestoreSaved: (savedUnit: SavedUnit) => void;
  onRemoveSaved: (index: number) => void;
}

export function SavedUnitsModal({
  savedUnits,
  onClearSaved,
  onRestoreSaved,
  onRemoveSaved,
}: SavedUnitsModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="ml-2 text-blue-600">
          <Bookmark className="w-4 h-4 mr-1" />
          <span className="hidden sm:inline">Saved</span> ({savedUnits.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Saved Units for Later</DialogTitle>
          <DialogDescription>
            Restore your previously saved units or remove them from your saved list.
          </DialogDescription>
        </DialogHeader>
        
        <div className="max-h-80 overflow-y-auto py-2">
          {savedUnits.length === 0 ? (
            <div className="text-center p-8 text-gray-500">
              <BookmarkPlus className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p>You haven't saved any units yet.</p>
              <p className="text-sm mt-1">
                Use the "Save for Later" button when selecting units to bookmark them for future sessions.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {savedUnits.map((saved, index) => (
                <div key={index} className="border rounded-md p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-medium">{saved.bookTitle || `Book ${saved.bookId}`}</h4>
                      <p className="text-sm text-gray-500">
                        {saved.unitNumbers.length} unit{saved.unitNumbers.length !== 1 ? 's' : ''} saved
                        <span className="ml-2 text-xs opacity-70">
                          {new Date(saved.timestamp).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-red-500 h-8 px-2"
                      onClick={() => onRemoveSaved(index)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {saved.unitNumbers.map((unitNumber) => (
                      <span key={unitNumber} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-md">
                        Unit {unitNumber}
                      </span>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-blue-600"
                    onClick={() => {
                      onRestoreSaved(saved);
                      setIsOpen(false);
                    }}
                  >
                    Restore these units
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <DialogFooter>
          {savedUnits.length > 0 && (
            <Button 
              variant="outline" 
              className="text-red-600" 
              onClick={onClearSaved}
            >
              Clear All Saved Units
            </Button>
          )}
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}