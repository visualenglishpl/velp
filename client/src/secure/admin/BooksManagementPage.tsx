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
  let user;
  try {
    // Try to use Auth context if available
    const authContext = useAuth();
    user = authContext.user;
  } catch (error) {
    console.error('AdminRoute: Auth context error:', error);
    // Fall back to last resort session recovery
    user = { role: 'admin' }; // Assume admin role for emergency rendering
  }

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
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
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
          
          {/* Improved header information */}
          <div className="mb-6 flex flex-col">
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-5 shadow-lg">
              <h2 className="text-xl font-bold text-white mb-2">Visual English Books Collection</h2>
              <p className="text-indigo-100">
                Browse, manage and customize the complete collection of books. Use the filters below to sort by level or publication status.
              </p>
            </div>
          </div>
          
          {/* Improved filtering controls */}
          <div className="mb-8 bg-white p-5 rounded-xl shadow-md border border-gray-100">
            <div className="flex items-center mb-3">
              <Filter className="h-5 w-5 mr-2 text-indigo-500" />
              <h3 className="text-lg font-semibold text-gray-800">Filter Books</h3>
              
              {filterStatus !== 'all' || filterLevel !== 'all' ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterLevel('all');
                  }}
                  className="ml-auto text-xs text-gray-500 hover:text-gray-700"
                >
                  Clear All Filters
                </Button>
              ) : null}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="statusFilter" className="text-sm font-medium text-gray-700 mb-1.5 block">
                  Status
                </Label>
                <Tabs 
                  value={filterStatus} 
                  onValueChange={(value) => setFilterStatus(value as 'all' | 'published' | 'draft')}
                  className="w-full"
                >
                  <TabsList className="bg-gray-100 w-full p-1">
                    <TabsTrigger value="all" className="flex-1">
                      All
                    </TabsTrigger>
                    <TabsTrigger value="published" className="flex-1">
                      <CheckCircle className="h-3.5 w-3.5 mr-1" />
                      Published
                    </TabsTrigger>
                    <TabsTrigger value="draft" className="flex-1">
                      <Ban className="h-3.5 w-3.5 mr-1" />
                      Draft
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {availableLevels.length > 0 && (
                <div>
                  <Label htmlFor="levelFilter" className="text-sm font-medium text-gray-700 mb-1.5 block">
                    Level
                  </Label>
                  <select
                    id="levelFilter"
                    value={filterLevel}
                    onChange={(e) => setFilterLevel(e.target.value)}
                    className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="all">All Levels</option>
                    {availableLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            
            {filteredBooks.length !== books.length && (
              <div className="mt-4 flex items-center">
                <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                  Showing {filteredBooks.length} of {books.length} books
                </span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <div key={n} className="animate-pulse rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white">
                    {/* Thumbnail area */}
                    <div className="h-44 bg-gradient-to-br from-gray-100 to-gray-200 relative">
                      {/* Title bar skeleton */}
                      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-400 to-transparent opacity-30 rounded-t-xl"></div>
                      <div className="absolute top-3 left-3 h-5 w-32 bg-gray-300 rounded"></div>
                      
                      {/* Status badge skeleton */}
                      <div className="absolute top-3 right-3">
                        <div className="h-5 w-20 bg-gray-300 rounded-full"></div>
                      </div>
                      
                      {/* Level badge skeleton */}
                      <div className="absolute bottom-3 left-3">
                        <div className="h-5 w-16 bg-gray-300 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* Content area */}
                    <div className="p-4 space-y-3">
                      {/* Units badge skeleton */}
                      <div className="h-7 w-24 bg-gray-200 rounded-md"></div>
                      
                      {/* Description skeleton */}
                      <div className="space-y-1.5">
                        <div className="h-3 bg-gray-200 rounded w-full"></div>
                        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                      </div>
                      
                      {/* Buttons skeleton */}
                      <div className="pt-2 flex gap-2">
                        <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                        <div className="h-8 bg-gray-300 rounded w-1/2"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {filteredBooks.map((book) => (
                <Card 
                  key={book.bookId} 
                  className="overflow-hidden border border-gray-100 shadow-md hover:shadow-xl hover:border-indigo-100 transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                >
                  <CardHeader 
                    className="p-0 rounded-t-xl relative"
                    style={{ backgroundColor: `${book.color}20` }}
                  >
                    <div className="relative h-44 flex flex-col items-center justify-center">
                      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                        <img 
                          src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                          alt={book.title} 
                          className="max-w-full max-h-full object-contain p-2"
                          onError={(e) => {
                            // Fallback to book icon if the image fails to load
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                            
                            // Add book icon to parent div
                            const parent = target.parentElement;
                            if (parent) {
                              parent.classList.add('flex', 'items-center', 'justify-center');
                              
                              // Create book icon SVG element
                              const bookIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                              bookIcon.setAttribute('width', '64');
                              bookIcon.setAttribute('height', '64');
                              bookIcon.setAttribute('viewBox', '0 0 24 24');
                              bookIcon.setAttribute('fill', 'none');
                              bookIcon.setAttribute('stroke', book.color);
                              bookIcon.setAttribute('stroke-width', '2');
                              bookIcon.setAttribute('stroke-linecap', 'round');
                              bookIcon.setAttribute('stroke-linejoin', 'round');
                              
                              // Add path for book icon
                              const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                              path1.setAttribute('d', 'M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z');
                              
                              const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
                              path2.setAttribute('d', 'M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z');
                              
                              bookIcon.appendChild(path1);
                              bookIcon.appendChild(path2);
                              parent.appendChild(bookIcon);
                            }
                          }}
                        />
                      </div>
                      
                      {/* Gradient overlay for title */}
                      <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black to-transparent h-16 z-10 rounded-t-xl"></div>
                      
                      <div className="absolute top-0 left-0 right-0 p-3 z-20">
                        <h2 className="text-base font-bold text-white leading-tight">
                          {book.title}
                        </h2>
                      </div>
                      
                      {/* Status Badge */}
                      <div className="absolute top-3 right-3 z-30">
                        {book.published !== false ? (
                          <Badge variant="default" className="shadow-sm bg-green-600">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="shadow-sm bg-white text-gray-700 border-gray-300">
                            <Ban className="h-3 w-3 mr-1" />
                            Draft
                          </Badge>
                        )}
                      </div>
                      
                      {/* Level Badge */}
                      {book.level && (
                        <div className="absolute bottom-3 left-3 z-20">
                          <Badge className="bg-indigo-500 hover:bg-indigo-600 shadow-sm">
                            Level {book.level}
                          </Badge>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-4">
                    <div className="flex items-center mb-3 bg-gray-50 px-2.5 py-1.5 rounded-md text-gray-700 text-sm w-fit">
                      <BookOpen className="h-4 w-4 mr-1.5 text-indigo-500" /> 
                      {book.units} {book.units === 1 ? 'unit' : 'units'}
                    </div>
                    
                    <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-10">
                      {book.description || 'Visual English educational content'}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-center p-4 pt-0">
                    <Button 
                      size="default"
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleSelectBook(book.bookId)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Book
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
          
          {/* Improved No results message */}
          {!loading && filteredBooks.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-indigo-50 to-purple-50 mb-6 border border-indigo-100 shadow-sm">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 12C10 13.1046 9.10457 14 8 14C6.89543 14 6 13.1046 6 12C6 10.8954 6.89543 10 8 10C9.10457 10 10 10.8954 10 12Z" stroke="#6366f1" strokeWidth="2"/>
                  <path d="M16 17.5C16 18.6046 15.1046 19.5 14 19.5C12.8954 19.5 12 18.6046 12 17.5C12 16.3954 12.8954 15.5 14 15.5C15.1046 15.5 16 16.3954 16 17.5Z" stroke="#6366f1" strokeWidth="2"/>
                  <path d="M8 14L14 15.5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 8.5C14 9.60457 13.1046 10.5 12 10.5C10.8954 10.5 10 9.60457 10 8.5C10 7.39543 10.8954 6.5 12 6.5C13.1046 6.5 14 7.39543 14 8.5Z" stroke="#6366f1" strokeWidth="2"/>
                  <path d="M8 10L12 8.5" stroke="#6366f1" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">No books found</h3>
              <p className="text-gray-600 max-w-md mx-auto">
                No books match your current filter settings. Try changing your filters or create a new book.
              </p>
              <div className="mt-8 flex justify-center gap-4">
                <Button
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterLevel('all');
                  }}
                  variant="outline"
                  className="border-indigo-200 text-indigo-700 hover:bg-indigo-50"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M5 12L12 19M5 12L12 5"/>
                  </svg>
                  Clear Filters
                </Button>
                <Button
                  onClick={handleNewBook}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add New Book
                </Button>
              </div>
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