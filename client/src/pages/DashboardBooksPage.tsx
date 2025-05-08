import { useEffect, useState } from 'react';
import { useLocation } from 'wouter';
import { 
  Book, 
  ChevronLeft, 
  Search, 
  PlusCircle,
  Filter,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';

// Book type
interface BookInfo {
  id: string;
  title: string;
  coverImage: string;
  unitCount: number;
  level: string;
  status: 'published' | 'draft';
  color: string;
}

export default function DashboardBooksPage() {
  const [location, navigate] = useLocation();
  const { toast } = useToast();
  
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample books data
  const [books, setBooks] = useState<BookInfo[]>([
    { 
      id: '0a', 
      title: 'Visual English Book 0a', 
      coverImage: '/book-covers/book0a.jpg', 
      unitCount: 20, 
      level: 'Beginner', 
      status: 'published',
      color: '#FF40FF' // Pink
    },
    { 
      id: '0b', 
      title: 'Visual English Book 0b', 
      coverImage: '/book-covers/book0b.jpg', 
      unitCount: 20, 
      level: 'Beginner', 
      status: 'published',
      color: '#FF7F27' // Orange
    },
    { 
      id: '0c', 
      title: 'Visual English Book 0c', 
      coverImage: '/book-covers/book0c.jpg', 
      unitCount: 20, 
      level: 'Beginner', 
      status: 'published',
      color: '#00CEDD' // Teal
    },
    { 
      id: '1', 
      title: 'Visual English Book 1', 
      coverImage: '/book-covers/book1.jpg', 
      unitCount: 18, 
      level: 'Beginner', 
      status: 'published',
      color: '#FFFF00' // Yellow
    },
    { 
      id: '2', 
      title: 'Visual English Book 2', 
      coverImage: '/book-covers/book2.jpg', 
      unitCount: 18, 
      level: 'Elementary', 
      status: 'published',
      color: '#9966CC' // Purple
    },
    { 
      id: '3', 
      title: 'Visual English Book 3', 
      coverImage: '/book-covers/book3.jpg', 
      unitCount: 18, 
      level: 'Pre-Intermediate', 
      status: 'published',
      color: '#00CC00' // Green
    },
    { 
      id: '4', 
      title: 'Visual English Book 4', 
      coverImage: '/book-covers/book4.jpg', 
      unitCount: 16, 
      level: 'Intermediate', 
      status: 'published',
      color: '#5DADEC' // Blue
    },
    { 
      id: '5', 
      title: 'Visual English Book 5', 
      coverImage: '/book-covers/book5.jpg', 
      unitCount: 16, 
      level: 'Upper-Intermediate', 
      status: 'published',
      color: '#00CC66' // Green
    },
    { 
      id: '6', 
      title: 'Visual English Book 6', 
      coverImage: '/book-covers/book6.jpg', 
      unitCount: 16, 
      level: 'Advanced', 
      status: 'published',
      color: '#FF0000' // Red
    },
    { 
      id: '7', 
      title: 'Visual English Book 7', 
      coverImage: '/book-covers/book7.jpg', 
      unitCount: 16, 
      level: 'Proficient', 
      status: 'published',
      color: '#00FF00' // Bright Green
    }
  ]);
  
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
  
  // Filter books based on search query
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Navigate to specific book units
  const navigateToBookUnits = (bookId: string) => {
    navigate(`/dashboard/books/book${bookId}`);
  };
  
  // Back to dashboard
  const navigateToDashboard = () => {
    navigate('/dashboard');
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
                onClick={navigateToDashboard} 
                className="mr-2"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <h1 className="text-xl font-semibold">Books</h1>
            </div>
            
            {/* Actions */}
            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Button size="sm">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Book
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col space-y-6">
          {/* Search and Filters */}
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <ArrowUpDown className="h-4 w-4 mr-1" />
                  Sort
                </Button>
              </div>
            </div>
          </div>
          
          {/* Books grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map(book => (
              <Card 
                key={book.id}
                className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigateToBookUnits(book.id)}
              >
                <div 
                  className="h-32 flex items-center justify-center text-white text-2xl font-bold"
                  style={{ backgroundColor: book.color }}
                >
                  Book {book.id}
                </div>
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-gray-900 truncate">
                      Visual English {book.id}
                    </h3>
                    <Badge variant={book.status === 'published' ? "default" : "outline"}>
                      {book.status}
                    </Badge>
                  </div>
                  <div className="flex flex-col space-y-1 text-sm text-gray-500">
                    <div className="flex justify-between">
                      <span>Units:</span>
                      <span className="font-medium text-gray-700">{book.unitCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Level:</span>
                      <span className="font-medium text-gray-700">{book.level}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Empty state */}
          {filteredBooks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
              <Book className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No books found</h3>
              <p className="text-gray-500 mt-1">
                {searchQuery 
                  ? `No books match "${searchQuery}"`
                  : "No books are available yet"}
              </p>
              {isAdmin && (
                <Button className="mt-4">
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Book
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}