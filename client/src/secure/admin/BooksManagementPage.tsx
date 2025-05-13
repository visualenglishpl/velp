import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlusCircle, Pencil, Eye, BookOpen, CheckCircle, Ban, Filter } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Type definition for book data
interface Book {
  bookId: string;
  title: string;
  description: string;
  color: string;
  units: number;
  thumbnailUrl?: string;
  published?: boolean;
  level?: string;
}

const BooksManagementPage = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isNewBook, setIsNewBook] = useState(false);
  
  // Filtering options
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  // Book form state
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#666666');
  const [level, setLevel] = useState('');
  const [units, setUnits] = useState(16);
  const [published, setPublished] = useState(true);

  // Redirect non-admin users
  useEffect(() => {
    if (user && user.role !== 'admin') {
      setLocation('/books');
    }
  }, [user, setLocation]);

  // Use react-query to fetch book data
  const { data: bookThumbnails, error, isLoading } = useQuery({
    queryKey: ['/api/assets/book-thumbnails'],
    retry: 2,
  });

  useEffect(() => {
    // Default book data if API fails
    const defaultBooks: Book[] = [
      { bookId: '0a', title: 'VISUAL ENGLISH BOOK 0A', description: 'Visual English Series', color: '#FF40FF', units: 20, published: true, level: 'Beginner' },
      { bookId: '0b', title: 'VISUAL ENGLISH BOOK 0B', description: 'Visual English Series', color: '#FF7F27', units: 20, published: true, level: 'Beginner' },
      { bookId: '0c', title: 'VISUAL ENGLISH BOOK 0C', description: 'Visual English Series', color: '#00CEDD', units: 20, published: true, level: 'Beginner' },
      { bookId: '1', title: 'VISUAL ENGLISH BOOK 1', description: 'Visual English Series', color: '#FFFF00', units: 18, published: true, level: 'Elementary' },
      { bookId: '2', title: 'VISUAL ENGLISH BOOK 2', description: 'Visual English Series', color: '#9966CC', units: 18, published: true, level: 'Elementary' },
      { bookId: '3', title: 'VISUAL ENGLISH BOOK 3', description: 'Visual English Series', color: '#00CC00', units: 18, published: true, level: 'Pre-Intermediate' },
      { bookId: '4', title: 'VISUAL ENGLISH BOOK 4', description: 'Visual English Series', color: '#5DADEC', units: 16, published: true, level: 'Intermediate' },
      { bookId: '5', title: 'VISUAL ENGLISH BOOK 5', description: 'Visual English Series', color: '#00CC66', units: 16, published: true, level: 'Intermediate' },
      { bookId: '6', title: 'VISUAL ENGLISH BOOK 6', description: 'Visual English Series', color: '#FF0000', units: 16, published: true, level: 'Upper-Intermediate' },
      { bookId: '7', title: 'VISUAL ENGLISH BOOK 7', description: 'Visual English Series', color: '#00FF00', units: 16, published: true, level: 'Advanced' }
    ];
    
    if (bookThumbnails && Array.isArray(bookThumbnails)) {
      // If data is available from the API, use it
      const transformedBooks = bookThumbnails.map((book: any) => ({
        ...book,
        color: defaultBooks.find(b => b.bookId === book.bookId)?.color || '#666666',
        units: defaultBooks.find(b => b.bookId === book.bookId)?.units || 16,
        thumbnailUrl: book.gifUrl || '' // Store the pre-signed URL from the API response
      }));
      setBooks(transformedBooks);
    } else {
      // Otherwise use default data
      setBooks(defaultBooks);
    }
    
    setLoading(false);
  }, [bookThumbnails]);
  
  // Extract unique levels for the filter
  const availableLevels = useMemo(() => {
    const levels = new Set<string>();
    books.forEach(book => {
      if (book.level) {
        levels.add(book.level);
      }
    });
    return Array.from(levels).sort();
  }, [books]);
  
  // Filter books based on selected criteria
  const filteredBooks = useMemo(() => {
    return books.filter(book => {
      // Filter by publication status
      if (filterStatus !== 'all') {
        if (filterStatus === 'published' && !book.published) return false;
        if (filterStatus === 'draft' && book.published) return false;
      }
      
      // Filter by level
      if (filterLevel !== 'all' && book.level !== filterLevel) return false;
      
      return true;
    });
  }, [books, filterStatus, filterLevel]);

  // Create mock API mutation for updating book details
  const updateBookMutation = useMutation({
    mutationFn: async (bookData: Book) => {
      // This would be replaced with a real API call in production
      console.log('Saving book data:', bookData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return bookData;
    },
    onSuccess: (updatedBook) => {
      // Update the books state with the new data
      setBooks(books.map(book => 
        book.bookId === updatedBook.bookId ? updatedBook : book
      ));
      
      toast({
        title: "Success",
        description: `${updatedBook.title} has been updated.`,
      });
      
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update book details. Please try again.",
        variant: "destructive",
      });
    }
  });
  
  // Create mock API mutation for creating a new book
  const createBookMutation = useMutation({
    mutationFn: async (bookData: Book) => {
      // This would be replaced with a real API call in production
      console.log('Creating new book:', bookData);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      return bookData;
    },
    onSuccess: (newBook) => {
      // Add the new book to the books state
      setBooks([...books, newBook]);
      
      toast({
        title: "Success",
        description: `${newBook.title} has been created.`,
      });
      
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create new book. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSelectBook = (bookId: string) => {
    setLocation(`/admin/book-units/${bookId}`);
  };
  
  const handleEditBook = (book: Book) => {
    setCurrentBook(book);
    setIsNewBook(false);
    
    // Set form state based on the selected book
    setBookId(book.bookId);
    setTitle(book.title);
    setDescription(book.description || '');
    setColor(book.color);
    setLevel(book.level || '');
    setUnits(book.units);
    setPublished(book.published !== false); // Default to true if undefined
    
    setIsEditModalOpen(true);
  };
  
  const handleNewBook = () => {
    setCurrentBook(null);
    setIsNewBook(true);
    
    // Reset form state
    setBookId('');
    setTitle('');
    setDescription('');
    setColor('#666666');
    setLevel('');
    setUnits(16);
    setPublished(true);
    
    setIsEditModalOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const bookData: Book = {
      bookId,
      title,
      description,
      color,
      units,
      published,
      level
    };
    
    if (isNewBook) {
      createBookMutation.mutate(bookData);
    } else {
      updateBookMutation.mutate(bookData);
    }
  };

  return (
    <>
      <Helmet>
        <title>Books Management | Visual English Admin</title>
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 flex items-center">
            <Link href="/admin">
              <Button variant="outline" className="mr-4">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Back to Admin
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Books Management</h1>
          </div>

          <div className="mb-6 flex flex-wrap items-center justify-between">
            <div>
              <p className="text-lg text-gray-600">
                Manage the complete collection of Visual English books and their units. Select a book to view its units.
              </p>
            </div>
            <Button 
              variant="default" 
              className="mt-4 md:mt-0 bg-green-600 hover:bg-green-700"
              onClick={handleNewBook}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </div>
          
          {/* Filtering controls */}
          <div className="mb-8 bg-white p-4 rounded-lg shadow">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center">
                <Filter className="h-5 w-5 mr-2 text-gray-500" />
                <span className="font-medium">Filters:</span>
              </div>
              
              <Tabs 
                value={filterStatus} 
                onValueChange={(value) => setFilterStatus(value as 'all' | 'published' | 'draft')}
                className="w-auto"
              >
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="all" className="px-4">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="published" className="px-4">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Published
                  </TabsTrigger>
                  <TabsTrigger value="draft" className="px-4">
                    <Ban className="h-4 w-4 mr-1" />
                    Draft
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {availableLevels.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Label htmlFor="levelFilter" className="whitespace-nowrap">Level:</Label>
                  <select
                    id="levelFilter"
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="px-3 py-1 border rounded-md text-sm"
                  >
                    <option value="all">All Levels</option>
                    {availableLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              )}
              
              {filterStatus !== 'all' || filterLevel !== 'all' ? (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterLevel('all');
                  }}
                  className="ml-auto"
                >
                  Clear Filters
                </Button>
              ) : null}
            </div>
            
            {filteredBooks.length !== books.length && (
              <div className="mt-2 text-sm text-gray-500">
                Showing {filteredBooks.length} of {books.length} books
              </div>
            )}
          </div>

          {loading ? (
            <div className="space-y-10">
              {/* Skeleton for filter controls */}
              <div className="bg-white p-4 rounded-lg shadow animate-pulse">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="h-8 w-20 bg-gray-200 rounded"></div>
                  <div className="h-10 w-64 bg-gray-200 rounded"></div>
                  <div className="h-8 w-40 bg-gray-200 rounded"></div>
                </div>
              </div>
              
              {/* Skeleton for book grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <div key={n} className="animate-pulse rounded-lg overflow-hidden shadow-md">
                    <div className="aspect-square bg-gradient-to-b from-gray-200 to-gray-300 relative">
                      <div className="absolute top-0 left-0 right-0 h-12 bg-black bg-opacity-40"></div>
                      <div className="absolute top-3 left-3 h-6 w-3/4 bg-gray-100 rounded"></div>
                      
                      <div className="absolute top-20 right-3">
                        <div className="h-6 w-20 bg-gray-100 bg-opacity-80 rounded-full"></div>
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-4">
                      <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                      
                      <div className="h-9 mt-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="bg-white p-10 text-center rounded shadow">
              <Ban className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium mb-1">No Books Found</h3>
              <p className="text-gray-500 mb-4">No books match your current filter criteria.</p>
              <Button 
                variant="outline"
                onClick={() => {
                  setFilterStatus('all');
                  setFilterLevel('all');
                }}
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {filteredBooks.map((book) => (
                <Card key={book.bookId} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <CardHeader 
                    className="p-0 relative aspect-square flex flex-col overflow-hidden"
                  >
                    <CardTitle className="text-white text-lg p-2 z-10 bg-black bg-opacity-50 w-full text-center">{book.title}</CardTitle>
                    {book.published !== false ? (
                      <Badge variant="default" className="absolute top-10 right-2 z-10 bg-green-600">
                        Published
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="absolute top-10 right-2 z-10 bg-gray-800 text-white">
                        Draft
                      </Badge>
                    )}
                    <img 
                      src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                      alt={book.title} 
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ backgroundColor: book.color }}
                      onError={(e) => {
                        // If the image fails to load, show a colored background
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.style.display = 'none';
                      }}
                    />
                  </CardHeader>
                  <CardContent className="py-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500">{book.units} units</p>
                        {book.level && (
                          <p className="text-xs font-medium text-gray-700">Level: {book.level}</p>
                        )}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditBook(book)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0 pb-3">
                    <Button 
                      className="w-full" 
                      onClick={() => handleSelectBook(book.bookId)}
                    >
                      <Eye className="mr-2 h-4 w-4" /> View Units
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Dialog for editing book details */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isNewBook ? 'Create New Book' : 'Edit Book Details'}</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bookId">Book ID</Label>
                <Input 
                  id="bookId" 
                  value={bookId} 
                  onChange={(e) => setBookId(e.target.value)}
                  disabled={!isNewBook} // Only allow editing book ID for new books
                  required
                  placeholder="e.g. 1, 2, 3a"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="color">Color</Label>
                <div className="flex items-center space-x-2">
                  <Input 
                    id="color" 
                    type="color"
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-10 p-1"
                  />
                  <Input 
                    value={color} 
                    onChange={(e) => setColor(e.target.value)}
                    className="flex-1"
                    placeholder="#RRGGBB"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)}
                required
                placeholder="Book Title"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description of the book"
                rows={2}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="level">Level</Label>
                <Input 
                  id="level" 
                  value={level} 
                  onChange={(e) => setLevel(e.target.value)}
                  placeholder="e.g. Beginner, Intermediate"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="units">Units</Label>
                <Input 
                  id="units" 
                  type="number" 
                  min="1"
                  max="50"
                  value={units.toString()} 
                  onChange={(e) => setUnits(parseInt(e.target.value) || 1)}
                  required
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-2 pt-2">
              <Switch 
                id="published" 
                checked={published} 
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">Published</Label>
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
                disabled={updateBookMutation.isPending || createBookMutation.isPending}
              >
                {updateBookMutation.isPending || createBookMutation.isPending ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Saving...
                  </>
                ) : isNewBook ? 'Create Book' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BooksManagementPage;