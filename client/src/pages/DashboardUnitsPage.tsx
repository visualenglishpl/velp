import { useEffect, useState } from 'react';
import { useLocation, useRoute } from 'wouter';
import { 
  Book, 
  ChevronLeft, 
  Search, 
  PlusCircle,
  Eye,
  Edit,
  MoreVertical,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from '@/components/ui/dropdown-menu';

// Unit type
interface UnitInfo {
  id: number;
  title: string;
  imageCount: number;
  lessonPlans: boolean;
  resources: boolean;
  status: 'published' | 'draft';
}

// Book info type
interface BookInfo {
  id: string;
  title: string;
  unitCount: number;
  color: string;
}

export default function DashboardUnitsPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get bookId from URL
  const [match, params] = useRoute('/dashboard/books/:bookId');
  const bookId = params?.bookId?.replace('book', '') || '';
  
  // Book data
  const [bookInfo, setBookInfo] = useState<BookInfo>({
    id: bookId,
    title: `Visual English Book ${bookId}`,
    unitCount: /^0[a-c]$/i.test(bookId) ? 20 : (parseInt(bookId) <= 3 ? 18 : 16),
    color: getBookColor(bookId)
  });
  
  // Sample units data
  const [units, setUnits] = useState<UnitInfo[]>([]);
  
  // Generate sample unit data based on book
  useEffect(() => {
    if (!bookId) return;
    
    const unitCount = /^0[a-c]$/i.test(bookId) ? 20 : (parseInt(bookId) <= 3 ? 18 : 16);
    
    const generatedUnits: UnitInfo[] = Array.from({ length: unitCount }, (_, i) => ({
      id: i + 1,
      title: `Unit ${i + 1}${i === 0 ? ' - Introduction' : ''}`,
      imageCount: Math.floor(Math.random() * 200) + 100, // Random between 100-300
      lessonPlans: Math.random() > 0.2, // 80% chance of having lesson plans
      resources: Math.random() > 0.3, // 70% chance of having resources
      status: Math.random() > 0.1 ? 'published' : 'draft' // 90% chance of being published
    }));
    
    setUnits(generatedUnits);
  }, [bookId]);
  
  // Check authentication
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const role = localStorage.getItem('userRole');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      setIsAuthenticated(true);
      setUserRole(role);
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate]);
  
  // Filter units based on search query
  const filteredUnits = units.filter(unit => 
    unit.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    unit.id.toString().includes(searchQuery)
  );
  
  // Actions
  const navigateToBooks = () => {
    navigate('/dashboard/books');
  };
  
  const viewUnit = (unitId: number) => {
    navigate(`/book/book${bookId}/unit/${unitId}`);
  };
  
  const editUnit = (unitId: number) => {
    // In a real application, this would navigate to an edit page
    toast({
      title: "Edit Unit",
      description: `Editing Unit ${unitId} of Book ${bookId}`,
    });
  };
  
  const toggleUnitStatus = (unitId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'published' ? 'draft' : 'published';
    
    // Update the unit status in the state
    setUnits(units.map(unit => 
      unit.id === unitId ? { ...unit, status: newStatus as 'published' | 'draft' } : unit
    ));
    
    toast({
      title: `Unit ${newStatus === 'published' ? 'Published' : 'Unpublished'}`,
      description: `Unit ${unitId} is now ${newStatus}`,
    });
  };
  
  // If not authenticated, show nothing (will redirect via useEffect)
  if (!isAuthenticated || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
          <div className="h-3 bg-gray-300 rounded w-32"></div>
        </div>
      </div>
    );
  }
  
  const isAdmin = userRole === 'admin';
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header/Navigation */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Back button and title */}
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                onClick={navigateToBooks} 
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-xl font-semibold flex items-center">
                <span>Book {bookId}</span>
                <span className="mx-2">•</span>
                <span>Units</span>
              </h1>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Unit
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Book header */}
          <div 
            className="p-6 rounded-lg text-white"
            style={{ backgroundColor: bookInfo.color }}
          >
            <h2 className="text-2xl font-bold mb-2">{bookInfo.title}</h2>
            <p className="opacity-90">
              {bookInfo.unitCount} units available
            </p>
          </div>
          
          {/* Search */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search units..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          {/* Units list */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Content
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUnits.map(unit => (
                    <tr key={unit.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-primary/10 text-primary">
                            {unit.id}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {unit.title}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {unit.imageCount} images
                        </div>
                        <div className="text-xs text-gray-500 flex items-center space-x-3 mt-1">
                          <span className={`flex items-center ${unit.lessonPlans ? 'text-green-600' : 'text-gray-400'}`}>
                            {unit.lessonPlans ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            Lesson Plans
                          </span>
                          <span className={`flex items-center ${unit.resources ? 'text-green-600' : 'text-gray-400'}`}>
                            {unit.resources ? (
                              <CheckCircle className="h-3 w-3 mr-1" />
                            ) : (
                              <XCircle className="h-3 w-3 mr-1" />
                            )}
                            Resources
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Badge variant={unit.status === 'published' ? "default" : "outline"}>
                          {unit.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => viewUnit(unit.id)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {isAdmin && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => editUnit(unit.id)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => viewUnit(unit.id)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Unit
                              </DropdownMenuItem>
                              {isAdmin && (
                                <>
                                  <DropdownMenuItem onClick={() => editUnit(unit.id)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit Unit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem onClick={() => toggleUnitStatus(unit.id, unit.status)}>
                                    {unit.status === 'published' ? (
                                      <>
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Unpublish
                                      </>
                                    ) : (
                                      <>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Publish
                                      </>
                                    )}
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                </>
                              )}
                              <DropdownMenuItem onClick={() => window.open(`/book/book${bookId}/unit/${unit.id}`, '_blank')}>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Open in New Tab
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Empty state */}
            {filteredUnits.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Book className="h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900">No units found</h3>
                <p className="text-gray-500 mt-1">
                  {searchQuery 
                    ? `No units match "${searchQuery}"`
                    : "No units are available yet"}
                </p>
                {isAdmin && (
                  <Button className="mt-4">
                    <PlusCircle className="h-4 w-4 mr-1" />
                    Add Unit
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function to get book color based on book ID
function getBookColor(bookId: string): string {
  const colorMap: Record<string, string> = {
    '0a': '#FF40FF', // Pink
    '0b': '#FF7F27', // Orange
    '0c': '#00CEDD', // Teal
    '1': '#FFFF00',  // Yellow
    '2': '#9966CC',  // Purple
    '3': '#00CC00',  // Green
    '4': '#5DADEC',  // Blue
    '5': '#00CC66',  // Green
    '6': '#FF0000',  // Red
    '7': '#00FF00',  // Bright Green
  };
  
  return colorMap[bookId] || '#5DADEC'; // Default to blue if not found
}