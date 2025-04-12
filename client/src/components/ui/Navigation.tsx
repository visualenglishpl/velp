import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";

interface NavigationProps {
  allowBookChange?: boolean;
  showUnitSelector?: boolean;
  selectedBookId?: string;
  onBookChange?: (bookId: string) => void;
  selectedUnitId?: string;
  onUnitChange?: (unitId: string) => void;
  books?: { id: number; bookId: string; title: string }[];
  units?: { id: number; unitNumber: number; title: string }[];
}

export function Navigation({
  allowBookChange = true,
  showUnitSelector = true,
  selectedBookId,
  onBookChange,
  selectedUnitId,
  onUnitChange,
  books = [],
  units = [],
}: NavigationProps) {
  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-bold">Visual English Books</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:items-center w-full md:w-auto">
            {allowBookChange && books.length > 0 && (
              <div className="w-full md:w-60">
                <Select
                  value={selectedBookId}
                  onValueChange={(value) => onBookChange?.(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a book" />
                  </SelectTrigger>
                  <SelectContent>
                    {books.map((book) => (
                      <SelectItem key={book.id} value={book.bookId.toString()}>
                        {book.bookId} - {book.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {showUnitSelector && selectedBookId && units.length > 0 && (
              <div className="w-full md:w-60">
                <Select
                  value={selectedUnitId}
                  onValueChange={(value) => onUnitChange?.(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit.id} value={unit.id.toString()}>
                        Unit {unit.unitNumber} - {unit.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}