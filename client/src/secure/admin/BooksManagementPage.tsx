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
          
          {/* Navigation guidance panel */}
          <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
                <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" 
                  stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h3 className="text-lg font-semibold text-purple-800">Navigation Path</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 mb-3 text-sm">
              <span className="font-medium text-purple-900 bg-purple-100 px-2 py-1 rounded">Admin Dashboard</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-white bg-purple-600 px-2 py-1 rounded">Books Management</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-purple-900 bg-purple-100 px-2 py-1 rounded">Units Management</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="#6b46c1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-medium text-purple-900 bg-purple-100 px-2 py-1 rounded">Content Viewer</span>
            </div>
            <p className="text-purple-700 text-sm mb-2">You are now at the <b>Books Management</b> page. Click "Manage" for any book to proceed to the next step.</p>
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
                    </div>
                    <div className="p-4 bg-white">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium text-gray-700">
                          <div className="h-10 w-10 rounded-full bg-gray-300"></div>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 bg-gray-50">
                      <div className="h-5 bg-gray-200 rounded w-1/2 mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded w-4/5"></div>
                    </div>
                    <div className="p-3 bg-gray-100 flex justify-between">
                      <div className="h-9 mt-4 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-4">
              {filteredBooks.map((book) => (
                <Card 
                  key={book.bookId} 
                  className="overflow-hidden border-0 shadow-lg hover:scale-105 transition-transform rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl relative"
                    style={{ backgroundColor: book.color }}
                  >
                    <div className="relative aspect-square flex flex-col items-center justify-center">
                      <div className="absolute inset-0 w-full h-full">
                        <img 
                          src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                          alt={book.title} 
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to solid color if the image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="absolute top-0 left-0 right-0 bg-black bg-opacity-50 p-2 z-10">
                        <div className="h-6 flex items-center justify-center">
                          <h2 className="text-base font-bold text-white leading-none text-center w-full truncate">
                            {book.title}
                          </h2>
                        </div>
                      </div>
                      {book.published !== false ? (
                        <Badge variant="default" className="absolute top-10 right-2 z-10 bg-green-600">
                          Published
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="absolute top-10 right-2 z-10 bg-gray-800 text-white">
                          Draft
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="pt-3 pb-1">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <span className="font-medium">Book ID:</span>
                        <span>{book.bookId}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-700">
                        <span className="font-medium">Units:</span>
                        <span>{book.units}</span>
                      </div>
                      {book.level && (
                        <div className="flex items-center justify-between text-sm text-gray-700">
                          <span className="font-medium">Level:</span>
                          <span>{book.level}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-1 pb-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditBook(book)}
                      className="h-8 text-xs"
                    >
                      <Pencil className="h-3.5 w-3.5 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      size="sm"
                      className="h-8 text-xs bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleSelectBook(book.bookId)}
                    >
                      <BookOpen className="h-3.5 w-3.5 mr-1" />
                      Manage
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* No results message */}
          {!loading && filteredBooks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10C9.10457 10 10 10.8954 10 12Z" stroke="#6b7280" strokeWidth="2"/>
                  <path d="M16 17.5C16 18.6046 15.1046 19.5 14 19.5C12.8954 19.5 12 18.6046 12 17.5C12 16.3954 12.8954 15.5 14 15.5C15.1046 15.5 16 16.3954 16 17.5Z" stroke="#6b7280" strokeWidth="2"/>
                  <path d="M8 14L14 15.5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 8.5C14 9.60457 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60457 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5Z" stroke="#6b7280" strokeWidth="2"/>
                  <path d="M8 10L12 8.5" stroke="#6b7280" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">No books found</h3>
              <p className="text-gray-500 max-w-md mx-auto mb-6">
                No books match your current filter settings. Try changing your filters or create a new book.
              </p>
              <Button 
                variant="default" 
                onClick={() => {
                  setFilterStatus('all');
                  setFilterLevel('all');
                }}
              >
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
      
      {/* Edit/Create Book Dialog */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{isNewBook ? 'Create New Book' : 'Edit Book Details'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bookId">Book ID</Label>
                  <Input
                    id="bookId"
                    placeholder="e.g., 1, 2, 3, 0a"
                    value={bookId}
                    onChange={(e) => setBookId(e.target.value)}
                    className="col-span-2"
                    disabled={!isNewBook} // Can't edit book ID after creation
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="units">Number of Units</Label>
                  <Input
                    id="units"
                    type="number"
                    value={units}
                    onChange={(e) => setUnits(parseInt(e.target.value, 10))}
                    min={1}
                    max={100}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., VISUAL ENGLISH BOOK 1"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter a brief description of this book"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <select
                    id="level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="">Select Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Elementary">Elementary</option>
                    <option value="Pre-Intermediate">Pre-Intermediate</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Upper-Intermediate">Upper-Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Color</Label>
                  <div className="flex">
                    <Input
                      id="color"
                      type="color"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      className="h-10 w-full"
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={published}
                  onCheckedChange={setPublished}
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
            <DialogFooter>
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
                {updateBookMutation.isPending || createBookMutation.isPending ? 'Saving...' : 'Save'}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BooksManagementPage;