import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'wouter';
import { 
  Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, PlusCircle, Pencil, Eye, BookOpen, 
  CheckCircle, Ban, Filter, MoreHorizontal, Trash2, 
  AlertCircle, Settings
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/hooks/use-auth';
import { Helmet } from 'react-helmet';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogDescription,
  DialogClose
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiRequest } from '@/lib/queryClient';

// Type definitions
interface Book {
  id?: number;
  bookId: string;
  title: string;
  description: string;
  color: string;
  units: number;
  thumbnailUrl?: string;
  published?: boolean;
  level?: string;
  totalMaterials?: number;
  lastUpdated?: string;
}

// Color options for books
const COLOR_OPTIONS = [
  { name: 'Pink (0a)', value: '#FF40FF' },
  { name: 'Orange (0b)', value: '#FF7F27' },
  { name: 'Teal (0c)', value: '#00CEDD' },
  { name: 'Yellow (1)', value: '#FFFF00' },
  { name: 'Purple (2)', value: '#9966CC' },
  { name: 'Green (3)', value: '#00CC00' },
  { name: 'Blue (4)', value: '#5DADEC' },
  { name: 'Green (5)', value: '#00CC66' },
  { name: 'Red (6)', value: '#FF0000' },
  { name: 'Bright Green (7)', value: '#00FF00' },
  { name: 'Custom', value: '#666666' }
];

// Level options
const LEVEL_OPTIONS = [
  'Pre-School',
  'Beginner',
  'Elementary',
  'Pre-Intermediate',
  'Intermediate',
  'Upper-Intermediate',
  'Advanced'
];

// Function to generate book button color based on book ID
const getBookButtonColor = (bookId: string): string => {
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
  
  return colorMap[bookId] || '#666666';
};

// Helper to get text color based on background color brightness
const getTextColor = (hexColor: string): string => {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 125 ? 'text-gray-900' : 'text-white';
};

const BooksManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  
  // State for edit/create modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [isNewBook, setIsNewBook] = useState(false);
  
  // State for delete confirmation
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null);
  
  // State for details modal
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  
  // Filtering options
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Book form state
  const [bookId, setBookId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [color, setColor] = useState('#666666');
  const [level, setLevel] = useState('');
  const [units, setUnits] = useState(16);
  const [published, setPublished] = useState(true);
  const [customColor, setCustomColor] = useState('#666666');
  
  // Form validation
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // Fetch books data
  const { 
    data: books = [], 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['/api/admin/books'],
    queryFn: async () => {
      try {
        const response = await apiRequest('GET', '/api/admin/books');
        return await response.json();
      } catch (error) {
        console.error('Error fetching books:', error);
        // If the API fails, return default books
        return getDefaultBooks();
      }
    }
  });

  // Default book data if API fails
  const getDefaultBooks = (): Book[] => {
    return [
      { bookId: '0a', title: 'VISUAL ENGLISH BOOK 0A', description: 'Visual English Series for youngest learners', color: '#FF40FF', units: 20, published: true, level: 'Beginner', totalMaterials: 520, lastUpdated: '2025-04-28' },
      { bookId: '0b', title: 'VISUAL ENGLISH BOOK 0B', description: 'Visual English Series for youngest learners', color: '#FF7F27', units: 20, published: true, level: 'Beginner', totalMaterials: 510, lastUpdated: '2025-04-25' },
      { bookId: '0c', title: 'VISUAL ENGLISH BOOK 0C', description: 'Visual English Series for youngest learners', color: '#00CEDD', units: 20, published: true, level: 'Beginner', totalMaterials: 540, lastUpdated: '2025-04-22' },
      { bookId: '1', title: 'VISUAL ENGLISH BOOK 1', description: 'Visual English Series core curriculum', color: '#FFFF00', units: 18, published: true, level: 'Elementary', totalMaterials: 480, lastUpdated: '2025-04-15' },
      { bookId: '2', title: 'VISUAL ENGLISH BOOK 2', description: 'Visual English Series core curriculum', color: '#9966CC', units: 18, published: true, level: 'Elementary', totalMaterials: 500, lastUpdated: '2025-04-12' },
      { bookId: '3', title: 'VISUAL ENGLISH BOOK 3', description: 'Visual English Series core curriculum', color: '#00CC00', units: 18, published: true, level: 'Pre-Intermediate', totalMaterials: 460, lastUpdated: '2025-04-10' },
      { bookId: '4', title: 'VISUAL ENGLISH BOOK 4', description: 'Visual English Series advanced learning', color: '#5DADEC', units: 16, published: true, level: 'Intermediate', totalMaterials: 420, lastUpdated: '2025-04-05' },
      { bookId: '5', title: 'VISUAL ENGLISH BOOK 5', description: 'Visual English Series advanced learning', color: '#00CC66', units: 16, published: true, level: 'Intermediate', totalMaterials: 380, lastUpdated: '2025-04-01' },
      { bookId: '6', title: 'VISUAL ENGLISH BOOK 6', description: 'Visual English Series advanced learning', color: '#FF0000', units: 16, published: true, level: 'Upper-Intermediate', totalMaterials: 360, lastUpdated: '2025-03-28' },
      { bookId: '7', title: 'VISUAL ENGLISH BOOK 7', description: 'Visual English Series advanced learning', color: '#00FF00', units: 16, published: true, level: 'Advanced', totalMaterials: 350, lastUpdated: '2025-03-25' },
      { bookId: '8', title: 'VISUAL ENGLISH BOOK 8', description: 'Visual English Series special topics', color: '#666666', units: 14, published: false, level: 'Advanced', totalMaterials: 280, lastUpdated: '2025-03-15' }
    ];
  };

  // Extract unique levels for the filter
  const availableLevels = useMemo(() => {
    const levels = new Set<string>();
    books.forEach((book: Book) => {
      if (book.level) {
        levels.add(book.level);
      }
    });
    return Array.from(levels).sort();
  }, [books]);
  
  // Filter books based on selected criteria
  const filteredBooks = useMemo(() => {
    return books.filter((book: Book) => {
      // Filter by publication status
      if (filterStatus !== 'all') {
        if (filterStatus === 'published' && !book.published) return false;
        if (filterStatus === 'draft' && book.published) return false;
      }
      
      // Filter by level
      if (filterLevel !== 'all' && book.level !== filterLevel) return false;
      
      // Filter by search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          book.title.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower) ||
          book.bookId.toLowerCase().includes(searchLower) ||
          (book.level && book.level.toLowerCase().includes(searchLower))
        );
      }
      
      return true;
    });
  }, [books, filterStatus, filterLevel, searchTerm]);

  // Group books by level
  const booksByLevel = useMemo(() => {
    const groupedBooks: Record<string, Book[]> = {};
    
    filteredBooks.forEach((book: Book) => {
      const level = book.level || 'Uncategorized';
      if (!groupedBooks[level]) {
        groupedBooks[level] = [];
      }
      groupedBooks[level].push(book);
    });
    
    // Sort levels by predefined order
    const orderedLevels = [
      'Pre-School',
      'Beginner',
      'Elementary',
      'Pre-Intermediate',
      'Intermediate', 
      'Upper-Intermediate',
      'Advanced',
      'Uncategorized'
    ];
    
    return Object.fromEntries(
      orderedLevels
        .filter(level => groupedBooks[level])
        .map(level => [level, groupedBooks[level]])
    );
  }, [filteredBooks]);

  // Update book mutation
  const updateBookMutation = useMutation({
    mutationFn: async (bookData: Book) => {
      // Simulate API call (replace with real API call in production)
      console.log('Updating book:', bookData);
      await new Promise(resolve => setTimeout(resolve, 800));
      return bookData;
    },
    onSuccess: (updatedBook) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/books'] });
      
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
  
  // Create book mutation
  const createBookMutation = useMutation({
    mutationFn: async (bookData: Book) => {
      // Simulate API call (replace with real API call in production)
      console.log('Creating book:', bookData);
      await new Promise(resolve => setTimeout(resolve, 800));
      return { ...bookData, id: Date.now() }; // Simulate ID assignment
    },
    onSuccess: (newBook) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/books'] });
      
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
  
  // Delete book mutation
  const deleteBookMutation = useMutation({
    mutationFn: async (bookId: string) => {
      // Simulate API call (replace with real API call in production)
      console.log('Deleting book:', bookId);
      await new Promise(resolve => setTimeout(resolve, 800));
      return bookId;
    },
    onSuccess: (bookId) => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/books'] });
      
      toast({
        title: "Success",
        description: `Book has been deleted.`,
      });
      
      setIsDeleteDialogOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to delete book. Please try again.",
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
    setCustomColor(book.color);
    setLevel(book.level || '');
    setUnits(book.units);
    setPublished(book.published !== false);
    
    // Reset form errors
    setFormErrors({});
    
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
    setCustomColor('#666666');
    setLevel('');
    setUnits(16);
    setPublished(true);
    
    // Reset form errors
    setFormErrors({});
    
    setIsEditModalOpen(true);
  };
  
  const handleDeleteBook = (book: Book) => {
    setBookToDelete(book);
    setIsDeleteDialogOpen(true);
  };
  
  const handleViewDetails = (book: Book) => {
    setBookDetails(book);
    setIsDetailsModalOpen(true);
  };
  
  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};
    
    if (!bookId.trim()) {
      errors.bookId = 'Book ID is required';
    } else if (!/^[0-9a-zA-Z]+$/.test(bookId.trim())) {
      errors.bookId = 'Book ID should only contain letters and numbers';
    }
    
    if (!title.trim()) {
      errors.title = 'Title is required';
    }
    
    if (units < 1) {
      errors.units = 'Number of units must be at least 1';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    const finalColor = color === '#666666' ? customColor : color;
    
    const bookData: Book = {
      bookId,
      title,
      description,
      color: finalColor,
      units,
      published,
      level
    };
    
    if (currentBook?.id) {
      bookData.id = currentBook.id;
    }
    
    if (isNewBook) {
      createBookMutation.mutate(bookData);
    } else {
      updateBookMutation.mutate(bookData);
    }
  };
  
  const confirmDelete = () => {
    if (bookToDelete) {
      deleteBookMutation.mutate(bookToDelete.bookId);
    }
  };

  return (
    <>
      <Helmet>
        <title>Books Management | Visual English Admin</title>
      </Helmet>
      
      <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center">
              <Link href="/admin">
                <Button variant="ghost" size="sm" className="mr-4 text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 h-8">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Admin
                </Button>
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Book Management</h1>
            </div>
            <Button 
              onClick={handleNewBook}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 h-9"
              size="sm"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add New Book
            </Button>
          </div>
          <p className="mt-2 text-gray-600 max-w-3xl">
            Manage the complete collection of Visual English books. Create, edit, or delete books and configure their basic properties.
          </p>
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
          <p className="text-purple-700 text-sm">
            You are now at the <b>Books Management</b> page. Click "Manage Units" for any book to proceed to the next step.
          </p>
        </div>
        
        {/* Search and Filters */}
        <div className="mb-6 bg-white p-4 rounded-lg border shadow-sm">
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="relative flex-grow max-w-md">
              <Input
                placeholder="Search books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" />
                </svg>
              </span>
            </div>
            
            <div className="flex flex-wrap gap-4 items-center">
              <Select
                value={filterStatus}
                onValueChange={(value) => setFilterStatus(value as 'all' | 'published' | 'draft')}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              
              {availableLevels.length > 0 && (
                <Select
                  value={filterLevel}
                  onValueChange={(value) => setFilterLevel(value)}
                >
                  <SelectTrigger className="w-44">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {availableLevels.map(level => (
                      <SelectItem key={level} value={level}>{level}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              
              {(filterStatus !== 'all' || filterLevel !== 'all' || searchTerm) && (
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {
                    setFilterStatus('all');
                    setFilterLevel('all');
                    setSearchTerm('');
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>
          </div>
          
          {filteredBooks.length !== books.length && (
            <div className="mt-2 text-sm text-gray-500">
              Showing {filteredBooks.length} of {books.length} books
            </div>
          )}
        </div>
        
        {/* Books Grid By Level */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n} className="bg-white rounded-lg shadow-md overflow-hidden border animate-pulse">
                <div className="h-40 bg-gray-200"></div>
                <div className="p-4 space-y-2">
                  <div className="h-5 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="flex justify-between pt-2">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-10"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <p>Failed to load books. Please try refreshing the page.</p>
            </div>
          </div>
        ) : filteredBooks.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No books found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterStatus !== 'all' || filterLevel !== 'all'
                ? "No books match your current filters. Try adjusting your search criteria."
                : "There are no books in the system yet. Click 'Add New Book' to create one."}
            </p>
            <Button onClick={handleNewBook}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Book
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(booksByLevel).map(([level, levelBooks]) => (
              <div key={level} className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                  <span className="mr-3">
                    {level === 'Beginner' && '🌱'}
                    {level === 'Elementary' && '📝'}
                    {level === 'Pre-Intermediate' && '📚'}
                    {level === 'Intermediate' && '🔍'}
                    {level === 'Upper-Intermediate' && '🚀'}
                    {level === 'Advanced' && '🎓'}
                    {level === 'Pre-School' && '🧸'}
                    {level === 'Uncategorized' && '📦'}
                  </span>
                  {level} Level
                  <Badge variant="outline" className="ml-2 font-normal">
                    {levelBooks.length} {levelBooks.length === 1 ? 'book' : 'books'}
                  </Badge>
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {levelBooks.map((book) => (
                    <Card key={book.bookId} className="overflow-hidden border shadow-md hover:shadow-lg transition-shadow">
                      <div
                        className="h-32 flex items-center justify-center relative"
                        style={{ 
                          backgroundColor: book.color,
                          backgroundImage: book.thumbnailUrl 
                            ? `url(${book.thumbnailUrl})` 
                            : 'none',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      >
                        {!book.thumbnailUrl && (
                          <div className={`text-3xl font-bold ${getTextColor(book.color)}`}>
                            Book {book.bookId.toUpperCase()}
                          </div>
                        )}
                        
                        {!book.published && (
                          <Badge variant="outline" className="absolute top-2 right-2 bg-white">
                            Draft
                          </Badge>
                        )}
                      </div>
                      
                      <CardHeader className="py-4">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-lg">{book.title}</CardTitle>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuItem onClick={() => handleViewDetails(book)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleEditBook(book)}>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit Book
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleSelectBook(book.bookId)}>
                                <Eye className="h-4 w-4 mr-2" />
                                View Book {book.bookId.toUpperCase()}
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem 
                                onClick={() => handleDeleteBook(book)}
                                className="text-red-600 focus:text-red-600"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete Book
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <CardDescription className="line-clamp-2 h-10">
                          {book.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent className="py-0">
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="outline" className="bg-gray-50">
                            {book.units} units
                          </Badge>
                          {book.totalMaterials && (
                            <Badge variant="outline" className="bg-gray-50">
                              {book.totalMaterials} materials
                            </Badge>
                          )}
                          {book.published ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-200 border-green-200">
                              Published
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                              Draft
                            </Badge>
                          )}
                        </div>
                      </CardContent>
                      
                      <CardFooter className="flex justify-between pt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditBook(book)}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-50 px-3 py-2 h-8"
                        >
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 h-8"
                          onClick={() => handleSelectBook(book.bookId)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Book {book.bookId.toUpperCase()}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Edit/Create Book Modal */}
      <Dialog
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isNewBook ? 'Create New Book' : 'Edit Book'}</DialogTitle>
            <DialogDescription>
              {isNewBook 
                ? 'Add a new book to the Visual English platform.' 
                : 'Update the book details and configuration.'}
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="bookId">Book ID</Label>
              <Input
                id="bookId"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="e.g., 1, 2, 0a"
                disabled={!isNewBook}
                className={formErrors.bookId ? 'border-red-500' : ''}
              />
              {formErrors.bookId && (
                <p className="text-red-500 text-sm mt-1">{formErrors.bookId}</p>
              )}
              <p className="text-sm text-gray-500">
                Unique identifier for the book (cannot be changed later).
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., VISUAL ENGLISH BOOK 1"
                className={formErrors.title ? 'border-red-500' : ''}
              />
              {formErrors.title && (
                <p className="text-red-500 text-sm mt-1">{formErrors.title}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="A brief description of the book"
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="level">Level</Label>
              <Select
                value={level}
                onValueChange={setLevel}
              >
                <SelectTrigger id="level">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVEL_OPTIONS.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="color">Book Color</Label>
              <Select
                value={color}
                onValueChange={(val) => setColor(val)}
              >
                <SelectTrigger id="color" className="w-full">
                  <SelectValue placeholder="Select a color" />
                </SelectTrigger>
                <SelectContent>
                  {COLOR_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center">
                        <div 
                          className="w-4 h-4 mr-2 rounded-full" 
                          style={{ backgroundColor: option.value }}
                        />
                        {option.name}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {color === '#666666' && (
                <div className="mt-2">
                  <Label htmlFor="customColor">Custom Color</Label>
                  <div className="flex mt-1">
                    <input
                      type="color"
                      id="customColor"
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="h-10 w-10 rounded border p-1"
                    />
                    <Input
                      value={customColor}
                      onChange={(e) => setCustomColor(e.target.value)}
                      className="ml-2 flex-1"
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="units">Number of Units</Label>
              <Input
                id="units"
                type="number"
                min="1"
                max="50"
                value={units}
                onChange={(e) => setUnits(parseInt(e.target.value, 10))}
                className={formErrors.units ? 'border-red-500' : ''}
              />
              {formErrors.units && (
                <p className="text-red-500 text-sm mt-1">{formErrors.units}</p>
              )}
              <p className="text-sm text-gray-500">
                Standard books have 16-18 units. Elementary books (1-3) have 18 units, 
                intermediate and above (4-7) have 16 units.
              </p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch
                id="published"
                checked={published}
                onCheckedChange={setPublished}
              />
              <Label htmlFor="published">Published</Label>
            </div>
            
            <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
              </DialogClose>
              <Button 
                type="submit" 
                disabled={updateBookMutation.isPending || createBookMutation.isPending}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {updateBookMutation.isPending || createBookMutation.isPending ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {isNewBook ? 'Creating...' : 'Updating...'}
                  </>
                ) : (
                  <>{isNewBook ? 'Create Book' : 'Update Book'}</>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the book "<strong>{bookToDelete?.title}</strong>"? 
              This action cannot be undone, and all associated units and materials may become inaccessible.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md flex items-start">
            <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium">Warning</p>
              <p className="text-sm">
                Deleting a book will affect all users who have access to it and 
                may impact educational content delivery.
              </p>
            </div>
          </div>
          
          <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
            <DialogClose asChild>
              <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              onClick={confirmDelete}
              variant="destructive"
              disabled={deleteBookMutation.isPending}
            >
              {deleteBookMutation.isPending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Book
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Book Details Dialog */}
      <Dialog
        open={isDetailsModalOpen}
        onOpenChange={setIsDetailsModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Details</DialogTitle>
            <DialogDescription>
              Complete information about the selected book.
            </DialogDescription>
          </DialogHeader>
          
          <ScrollArea className="max-h-[60vh]">
            {bookDetails && (
              <div className="space-y-4">
                {/* Color preview and basic info */}
                <div className="flex items-center gap-3">
                  <div 
                    className="w-16 h-16 rounded-md flex items-center justify-center"
                    style={{ backgroundColor: bookDetails.color }}
                  >
                    <span className={`text-2xl font-bold ${getTextColor(bookDetails.color)}`}>
                      {bookDetails.bookId.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium">{bookDetails.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {bookDetails.published ? (
                        <Badge className="bg-green-100 text-green-800">Published</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-amber-50 text-amber-800">Draft</Badge>
                      )}
                      {bookDetails.level && (
                        <Badge variant="outline">{bookDetails.level}</Badge>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Details list */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="font-medium">Book ID</div>
                  <div>{bookDetails.bookId}</div>
                  
                  <div className="font-medium">Color</div>
                  <div>{bookDetails.color}</div>
                  
                  <div className="font-medium">Units</div>
                  <div>{bookDetails.units}</div>
                  
                  {bookDetails.totalMaterials && (
                    <>
                      <div className="font-medium">Total Materials</div>
                      <div>{bookDetails.totalMaterials}</div>
                    </>
                  )}
                  
                  {bookDetails.lastUpdated && (
                    <>
                      <div className="font-medium">Last Updated</div>
                      <div>{new Date(bookDetails.lastUpdated).toLocaleDateString()}</div>
                    </>
                  )}
                </div>
                
                {/* Description */}
                {bookDetails.description && (
                  <div>
                    <h4 className="font-medium mb-1">Description</h4>
                    <p className="text-sm text-gray-600">{bookDetails.description}</p>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleEditBook(bookDetails);
                    }}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Book
                  </Button>
                  <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700"
                    onClick={() => {
                      setIsDetailsModalOpen(false);
                      handleSelectBook(bookDetails.bookId);
                    }}
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Manage Units
                  </Button>
                </div>
              </div>
            )}
          </ScrollArea>
          
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BooksManagement;