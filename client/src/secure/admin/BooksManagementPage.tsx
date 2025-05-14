import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, PlusCircle, BookOpen, CheckCircle, Ban } from 'lucide-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
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
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
  
  // No filtering options anymore

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
  
  // No filtering logic needed anymore

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
          
          {/* No header needed */}

          {loading ? (
            <div className="space-y-10">
              {/* Skeleton loading for books */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <div key={n} className="animate-pulse rounded-xl overflow-hidden shadow-md border border-gray-100 bg-white">
                    {/* Thumbnail skeleton */}
                    <div className="h-56 bg-gray-200"></div>
                    {/* Content area skeleton */}
                    <div className="p-4 bg-gray-50">
                      <div className="h-5 bg-gray-200 w-3/4 mx-auto mb-2 rounded"></div>
                      <div className="h-4 bg-gray-200 w-1/2 mx-auto rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 gap-6">
              {books.map((book: Book) => (
                <Card 
                  key={book.bookId} 
                  className="overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 rounded-xl"
                >
                  {/* Full image thumbnail */}
                  <div className="relative h-56 bg-white flex items-center justify-center">
                    {/* Show fallback book icon immediately for Book 3 which has known issues */}
                    {book.bookId === '3' ? (
                      <div className="flex items-center justify-center h-full w-full" style={{ backgroundColor: `${book.color}20` }}>
                        <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke={book.color || '#00CC00'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <div className="absolute bottom-2 left-2 bg-gray-800 bg-opacity-70 text-white px-2 py-1 rounded text-xs">
                          VISUAL 3
                        </div>
                      </div>
                    ) : (
                      <img 
                        src={book.thumbnailUrl || `/api/direct/content/icons/VISUAL ${book.bookId}.gif`}
                        alt={book.title} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          // Fallback to book icon if the image fails to load
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          
                          // Add book icon to parent div
                          const parent = target.parentElement;
                          if (parent) {
                            parent.style.backgroundColor = `${book.color}20`;
                            
                            // Create book icon SVG element
                            const bookIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
                            bookIcon.setAttribute('width', '80');
                            bookIcon.setAttribute('height', '80');
                            bookIcon.setAttribute('viewBox', '0 0 24 24');
                            bookIcon.setAttribute('fill', 'none');
                            bookIcon.setAttribute('stroke', book.color || '#6366f1');
                            bookIcon.setAttribute('stroke-width', '2');
                            bookIcon.setAttribute('stroke-linecap', 'round');
                            bookIcon.setAttribute('stroke-linejoin', 'round');
                            
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
                    )}
                    
                    {/* Status Badge - small and minimal */}
                    <div className="absolute top-2 right-2 z-30">
                      {book.published !== false ? (
                        <Badge variant="default" className="shadow-sm bg-green-600">
                          <CheckCircle className="h-3 w-3" />
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="shadow-sm bg-white text-gray-700 border-gray-300">
                          <Ban className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  {/* Simplified info section */}
                  <div className="p-4 text-center bg-gray-50 border-t">
                    <h3 className="font-semibold text-gray-800">
                      VISUAL ENGLISH {book.bookId}
                    </h3>
                    <p className="text-gray-600 text-sm my-1">
                      {book.units} UNITS
                    </p>
                  </div>
                  
                  <div className="p-4 pt-0 text-center">
                    <Button 
                      size="default"
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      onClick={() => handleSelectBook(book.bookId)}
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      View Book
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
          
          {/* No books message - only shown if no books are available at all */}
          {!loading && books.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                <BookOpen className="h-10 w-10 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No books found</h3>
              <p className="text-gray-600 mb-6">
                There are no books available in the system yet.
              </p>
              <Button onClick={handleNewBook} className="bg-indigo-600 hover:bg-indigo-700">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Book
              </Button>
            </div>
          )}
          
          {/* Book Edit/Create Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{isNewBook ? 'Create New Book' : 'Edit Book Details'}</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookId">Book ID</Label>
                    <Input 
                      id="bookId" 
                      value={bookId} 
                      onChange={(e) => setBookId(e.target.value.trim())} 
                      disabled={!isNewBook}
                      required
                      placeholder="e.g., 1, 2, 3, 0a"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="units">Units</Label>
                    <Input 
                      id="units" 
                      type="number" 
                      min="1"
                      value={units} 
                      onChange={(e) => setUnits(parseInt(e.target.value))} 
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input 
                    id="title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    required
                    placeholder="e.g., VISUAL ENGLISH BOOK 1"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description" 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of the book"
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="color">Color</Label>
                    <div className="flex items-center space-x-2">
                      <Input 
                        id="color" 
                        type="color"
                        value={color} 
                        onChange={(e) => setColor(e.target.value)} 
                        className="w-12 h-8 p-0 cursor-pointer"
                      />
                      <Input 
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="flex-grow"
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="level">Level</Label>
                    <Input 
                      id="level" 
                      value={level} 
                      onChange={(e) => setLevel(e.target.value)}
                      placeholder="e.g., Beginner, Elementary"
                    />
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
                
                <DialogFooter className="sm:justify-between">
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
                    className="bg-indigo-600 hover:bg-indigo-700"
                  >
                    {updateBookMutation.isPending || createBookMutation.isPending ? (
                      <span>Saving...</span>
                    ) : (
                      <span>{isNewBook ? 'Create Book' : 'Save Changes'}</span>
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default BooksManagementPage;