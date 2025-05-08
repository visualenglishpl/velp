import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface BookData {
  id: string;
  title: string;
  thumbnailUrl?: string;
  color: string;
}

interface BookSelectionStepProps {
  books: BookData[];
  selectedBooks: string[];
  onSelectionChange: (selectedBooks: string[]) => void;
  isLoading: boolean;
}

export function BookSelectionStep({ 
  books, 
  selectedBooks, 
  onSelectionChange,
  isLoading
}: BookSelectionStepProps) {
  
  // Toggle book selection
  const toggleBookSelection = (bookId: string) => {
    if (selectedBooks.includes(bookId)) {
      onSelectionChange(selectedBooks.filter(id => id !== bookId));
    } else {
      onSelectionChange([...selectedBooks, bookId]);
    }
  };

  // Select all books
  const selectAllBooks = () => {
    onSelectionChange(books.map(book => book.id));
  };

  // Clear all selections
  const clearSelections = () => {
    onSelectionChange([]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold">Select Books</h3>
        <div className="space-x-2">
          <Button variant="outline" size="sm" onClick={selectAllBooks}>
            Select All
          </Button>
          <Button variant="outline" size="sm" onClick={clearSelections}>
            Clear
          </Button>
        </div>
      </div>
          
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {isLoading ? (
          [...Array(10)].map((_, i) => (
            <div key={i} className="border rounded-md p-4 h-40 animate-pulse bg-gray-100"></div>
          ))
        ) : (
          books.map((book) => (
            <div 
              key={book.id}
              className={`border rounded-md p-3 cursor-pointer ${
                selectedBooks.includes(book.id) 
                  ? "border-blue-500 bg-blue-50" 
                  : "hover:border-gray-300"
              }`}
              onClick={() => toggleBookSelection(book.id)}
            >
              <div className="flex justify-between mb-2">
                <Checkbox 
                  id={`book-select-${book.id}`} 
                  checked={selectedBooks.includes(book.id)} 
                  onCheckedChange={() => toggleBookSelection(book.id)}
                />
                <Label htmlFor={`book-select-${book.id}`} className="font-medium">
                  Book {book.id}
                </Label>
              </div>
              <div className="h-24 bg-gray-100 rounded-md flex items-center justify-center">
                <img 
                  src={`/api/direct/content/icons/VISUAL ${book.id}${book.id === '3' ? ' ' : ''}.gif`}
                  alt={`Book ${book.id}`}
                  className="h-full w-full object-contain p-2"
                  onError={(e) => {
                    console.log(`Error loading thumbnail for book ${book.id}`);
                    e.currentTarget.src = `https://via.placeholder.com/150/${book.color.replace('#', '')}/FFFFFF/?text=Book+${book.id}`;
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="text-blue-600 font-medium">
        {selectedBooks.length} books selected
      </div>
    </div>
  );
}