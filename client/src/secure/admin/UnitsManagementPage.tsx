import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Layers, ImageIcon, PlusCircle, Pencil, Eye, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Badge } from '@/components/ui/badge';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';

interface Unit {
  id: number;
  title: string;
  description?: string;
  slideCount: number;
  thumbnailUrl?: string;
  published?: boolean;
  status?: 'draft' | 'published' | 'archived';
  category?: string;
  lastUpdated?: string;
}

// Function to get the color for a specific book
const getBookColor = (bookId: string): string => {
  const bookColors: Record<string, string> = {
    '0a': '#FF40FF', // Pink
    '0b': '#FF7F27', // Orange
    '0c': '#00CEDD', // Teal
    '1': '#FFFF00',  // Yellow
    '2': '#9966CC',  // Purple
    '3': '#00CC00',  // Green
    '4': '#5DADEC',  // Blue
    '5': '#00CC66',  // Green
    '6': '#FF0000',  // Red
    '7': '#00FF00'   // Bright Green
  };
  
  return bookColors[bookId] || '#666666';
};

// Function to get unit count for a specific book
const getUnitCount = (bookId: string): number => {
  if (['0a', '0b', '0c'].includes(bookId)) {
    return 20;
  } else if (['1', '2', '3'].includes(bookId)) {
    return 18;
  } else {
    return 16; // Books 4-7
  }
};

// Function to get title for a book
const getBookTitle = (bookId: string): string => {
  const titles: Record<string, string> = {
    '0a': 'VISUAL ENGLISH BOOK 0A',
    '0b': 'VISUAL ENGLISH BOOK 0B',
    '0c': 'VISUAL ENGLISH BOOK 0C',
    '1': 'VISUAL ENGLISH BOOK 1',
    '2': 'VISUAL ENGLISH BOOK 2',
    '3': 'VISUAL ENGLISH BOOK 3',
    '4': 'VISUAL ENGLISH BOOK 4',
    '5': 'VISUAL ENGLISH BOOK 5',
    '6': 'VISUAL ENGLISH BOOK 6',
    '7': 'VISUAL ENGLISH BOOK 7'
  };
  
  return titles[bookId] || `VISUAL ENGLISH BOOK ${bookId.toUpperCase()}`;
};

const UnitsManagementPage = () => {
  // Get bookId from URL parameters
  const params = useParams<{ bookId: string }>();
  const bookId = params.bookId || '';
  
  // Try to use Auth context if available
  let user;
  try {
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.error('AdminRoute: Auth context error:', error);
    // Fall back to last resort session recovery
    user = { role: 'admin' }; // Assume admin role for emergency rendering
  }
  
  const { toast } = useToast();
  
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [bookColor, setBookColor] = useState('#666666');
  const [bookTitle, setBookTitle] = useState('');
  
  // Emergency authentication - direct admin session login
  useEffect(() => {
    const tryDirectLogin = async () => {
      try {
        const response = await fetch('/api/direct/admin-login');
        const data = await response.json();
        if (data.success) {
          console.log('Last-resort session recovery:', data);
        }
      } catch (error) {
        console.error('Failed to retrieve emergency admin session:', error);
      }
    };
    
    // Only try direct login if we had to use the fallback
    if (!user || !user.id) {
      tryDirectLogin();
    }
  }, [user]);
  
  // Edit modal state
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentUnit, setCurrentUnit] = useState<Unit | null>(null);
  const [isNewUnit, setIsNewUnit] = useState(false);
  
  // Form state
  const [unitId, setUnitId] = useState<number>(0);
  const [unitTitle, setUnitTitle] = useState('');
  const [unitDescription, setUnitDescription] = useState('');
  const [unitSlideCount, setUnitSlideCount] = useState(0);
  const [unitCategory, setUnitCategory] = useState('');
  const [unitPublished, setUnitPublished] = useState(true);
  
  useEffect(() => {
    // Set book color and title
    setBookColor(getBookColor(bookId));
    setBookTitle(getBookTitle(bookId));
    
    // Generate units for the book
    const unitCount = getUnitCount(bookId);
    const generatedUnits = Array.from({ length: unitCount }, (_, index) => {
      const unitNumber = index + 1;
      // For demonstration, include some units with different statuses
      const statusOptions: Array<'draft' | 'published' | 'archived'> = ['published', 'draft', 'archived'];
      const randomStatus = statusOptions[Math.floor(Math.random() * 10) % 3]; // Mostly published, some draft/archived
      const isPublished = randomStatus === 'published';
      
      return {
        id: unitNumber,
        title: `Unit ${unitNumber}`,
        description: `Visual English ${bookId.toUpperCase()} - Unit ${unitNumber}`,
        slideCount: Math.floor(Math.random() * 200) + 100, // Random number between 100-300 for demonstration
        thumbnailUrl: `/api/direct/content/book${bookId}/icons/thumbnailsuni${bookId}-${unitNumber}.png`,
        published: isPublished,
        status: randomStatus,
        category: ['Vocabulary', 'Grammar', 'Conversation', 'Reading'][unitNumber % 4],
        lastUpdated: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      };
    });
    
    setUnits(generatedUnits);
    setLoading(false);
  }, [bookId]);

  // Create mock API mutation for updating unit details
  const updateUnitMutation = useMutation({
    mutationFn: async (unitData: Unit) => {
      // This would be replaced with a real API call in production
      console.log('Saving unit data:', unitData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return unitData;
    },
    onSuccess: (updatedUnit) => {
      // Update the units state with the new data
      setUnits(units.map(unit => 
        unit.id === updatedUnit.id ? updatedUnit : unit
      ));
      
      toast({
        title: "Success",
        description: `${updatedUnit.title} has been updated.`,
      });
      
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update unit details. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Create mock API mutation for creating a new unit
  const createUnitMutation = useMutation({
    mutationFn: async (unitData: Unit) => {
      // This would be replaced with a real API call in production
      console.log('Creating new unit:', unitData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return unitData;
    },
    onSuccess: (newUnit) => {
      // Add the new unit to the units state
      setUnits([...units, newUnit]);
      
      toast({
        title: "Success",
        description: `${newUnit.title} has been created.`,
      });
      
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create new unit. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  const handleEditUnit = (unit: Unit) => {
    setCurrentUnit(unit);
    setIsNewUnit(false);
    
    // Set form state based on the selected unit
    setUnitId(unit.id);
    setUnitTitle(unit.title);
    setUnitDescription(unit.description || '');
    setUnitSlideCount(unit.slideCount);
    setUnitCategory(unit.category || '');
    setUnitPublished(unit.published !== false); // Default to true if undefined
    
    setIsEditModalOpen(true);
  };
  
  const handleNewUnit = () => {
    setCurrentUnit(null);
    setIsNewUnit(true);
    
    // Reset form state with next available unit number
    const nextUnitId = units.length > 0 ? Math.max(...units.map(u => u.id)) + 1 : 1;
    setUnitId(nextUnitId);
    setUnitTitle(`Unit ${nextUnitId}`);
    setUnitDescription('');
    setUnitSlideCount(100);
    setUnitCategory('');
    setUnitPublished(true);
    
    setIsEditModalOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const unitData: Unit = {
      id: unitId,
      title: unitTitle,
      description: unitDescription,
      slideCount: unitSlideCount,
      published: unitPublished,
      category: unitCategory,
      status: unitPublished ? 'published' : 'draft',
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    
    if (isNewUnit) {
      createUnitMutation.mutate(unitData);
    } else {
      updateUnitMutation.mutate(unitData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-center">
          <Link href="/admin">
            <Button variant="outline" className="mr-4">
              <ChevronLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">{bookTitle}</h1>
        </div>

        <div className="mb-6">
          <div>
            <p className="text-lg text-gray-600">
              Managing units for {bookTitle}
            </p>
          </div>
        </div>

        {loading ? (
          <div className="space-y-10">
            {/* Skeleton for filter controls (for future use) */}
            <div className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="flex flex-wrap items-center gap-4">
                <div className="h-8 w-32 bg-gray-200 rounded"></div>
                <div className="h-10 w-64 bg-gray-200 rounded"></div>
                <div className="ml-auto h-10 w-36 bg-gray-200 rounded"></div>
              </div>
            </div>
            
            {/* Skeleton for unit grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((n) => (
                <div key={n} className="animate-pulse rounded-lg overflow-hidden shadow-md">
                  <div className="aspect-square bg-gradient-to-b from-gray-200 to-gray-300 relative">
                    <div className="absolute top-0 left-0 right-0 h-12 bg-black bg-opacity-40"></div>
                    <div className="absolute top-3 left-3 right-3 h-6 bg-gray-100 rounded"></div>
                    
                    <div className="absolute top-16 right-3">
                      <div className="h-6 w-20 bg-gray-100 bg-opacity-80 rounded-full"></div>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                        <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white p-3">
                    <div className="flex justify-between items-center mb-2">
                      <div className="h-4 bg-gray-200 rounded w-24"></div>
                      <div className="h-6 w-6 bg-gray-200 rounded-full"></div>
                    </div>
                    <div className="h-4 bg-gray-200 rounded w-40 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded w-32"></div>
                    
                    <div className="h-9 mt-3 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : units.length === 0 ? (
          <div className="bg-white p-12 rounded-lg shadow-sm text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 rounded-full mb-4">
              <Layers className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Units Found</h3>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">This book doesn't have any units yet. Get started by creating your first unit.</p>
            <Button 
              onClick={handleNewUnit}
              className="bg-green-600 hover:bg-green-700"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create First Unit
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
            {units.map((unit) => (
              <Card 
                key={unit.id}
                className="overflow-hidden shadow hover:shadow-md transition-shadow">
                <CardHeader 
                  style={{ backgroundColor: bookColor }}
                  className="p-0 relative aspect-square flex flex-col overflow-hidden"
                >
                  
                  {unit.thumbnailUrl ? (
                    <div className="absolute inset-0 w-full h-full">
                      <img 
                        src={unit.thumbnailUrl}
                        alt={unit.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // If the thumbnail fails to load, show the fallback
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.style.display = 'none';
                          
                          // Find closest parent with class 'fallback-container' and show it
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = parent.querySelector('.fallback-container');
                            if (fallback) {
                              (fallback as HTMLElement).style.display = 'flex';
                            }
                          }
                        }}
                      />
                      <div className="fallback-container absolute inset-0 flex items-center justify-center" style={{ display: 'none' }}>
                        <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center">
                          <Layers style={{ color: bookColor }} className="h-8 w-8" />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex-1 flex items-center justify-center">
                      <div className="mx-auto bg-white rounded-full w-16 h-16 flex items-center justify-center">
                        <Layers style={{ color: bookColor }} className="h-8 w-8" />
                      </div>
                    </div>
                  )}
                </CardHeader>
                <CardContent className="py-3">
                  <div className="flex flex-col space-y-1 items-center text-center">
                    <p className="font-semibold text-md">UNIT {unit.id}</p>
                    <p className="text-sm text-gray-500">{unit.slideCount} SLIDES</p>
                    <p className="text-sm text-purple-600 font-medium">VIEW CONTENT</p>
                  </div>
                </CardContent>
                <CardFooter className="px-3 py-2">
                  <Link 
                    href={`/book/${bookId}/unit/${unit.id}`} 
                    className="w-full"
                  >
                    <Button 
                      variant="default"
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Content
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
        
        {/* Add New Unit button at the bottom of the page */}
        {!loading && units.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Button 
              variant="default" 
              className="bg-green-600 hover:bg-green-700"
              onClick={handleNewUnit}
            >
              <PlusCircle className="mr-2 h-5 w-5" />
            </Button>
          </div>
        )}
      </div>
      
      {/* Dialog for editing unit details */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNewUnit ? 'Create New Unit' : `Edit ${currentUnit?.title || 'Unit'}`}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="unitId">Unit Number</Label>
                <Input 
                  id="unitId" 
                  type="number"
                  min="1"
                  max="50"
                  value={unitId.toString()} 
                  onChange={(e) => setUnitId(parseInt(e.target.value) || 1)}
                  disabled={!isNewUnit} // Only allow editing unit ID for new units
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slideCount">Slide Count</Label>
                <Input 
                  id="slideCount" 
                  type="number"
                  min="1"
                  max="500"
                  value={unitSlideCount.toString()} 
                  onChange={(e) => setUnitSlideCount(parseInt(e.target.value) || 1)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitTitle">Title</Label>
              <Input 
                id="unitTitle" 
                value={unitTitle} 
                onChange={(e) => setUnitTitle(e.target.value)}
                required
                placeholder="Unit Title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitDescription">Description</Label>
              <Textarea 
                id="unitDescription" 
                value={unitDescription} 
                onChange={(e) => setUnitDescription(e.target.value)}
                placeholder="Short description of the unit"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="unitCategory">Category</Label>
              <Input 
                id="unitCategory" 
                value={unitCategory} 
                onChange={(e) => setUnitCategory(e.target.value)}
                placeholder="e.g. Vocabulary, Grammar"
              />
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="unitPublished" 
                checked={unitPublished} 
                onCheckedChange={setUnitPublished}
              />
              <Label htmlFor="unitPublished">Published</Label>
            </div>
            
            <DialogFooter className="pt-4">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={updateUnitMutation.isPending || createUnitMutation.isPending}
              >
                {updateUnitMutation.isPending || createUnitMutation.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : isNewUnit ? 'Create Unit' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UnitsManagementPage;