import { useEffect, useState, useMemo } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { apiRequest, queryClient } from "@/lib/queryClient";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Pencil, 
  Plus, 
  Trash2, 
  Book, 
  ChevronRight, 
  FileText, 
  Video, 
  AudioLines, 
  ClipboardList,
  BookOpen,
  LogOut,
  Settings,
  Search
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Function to get different button colors based on book ID
const getButtonColor = (bookId: number): string => {
  // Convert book ID to string and get the first character
  const idString = bookId.toString();
  const firstChar = idString.charAt(0);
  
  // Color palette - colorful buttons for different books
  const colors = {
    '0': '#9333ea', // purple
    '1': '#2563eb', // blue
    '2': '#059669', // green
    '3': '#d97706', // amber
    '4': '#dc2626', // red
    '5': '#0891b2', // cyan
    '6': '#4f46e5', // indigo
    '7': '#be123c', // rose
    '8': '#a16207', // yellow
    '9': '#7c3aed', // violet
  };
  
  // Return a color based on the first character, or default to navy blue
  return colors[firstChar as keyof typeof colors] || '#172554'; // default navy blue
};

// Type definitions from schema
type Book = {
  id: number;
  bookId: string;
  title: string;
  description: string | null;
  thumbnail: string;
  level: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type Unit = {
  id: number;
  bookId: number;
  unitNumber: number;
  title: string;
  description: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

type Material = {
  id: number;
  unitId: number;
  title: string;
  contentType: 'lesson' | 'exercise' | 'quiz' | 'video' | 'audio' | 'document';
  content: any;
  orderIndex: number;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
};

// Content management layout with top navigation
function ContentManagementLayout({ children }: { children: React.ReactNode }) {
  const { user, logoutMutation } = useAuth();
  const [, navigate] = useLocation();

  if (!user || user.role !== "admin") {
    navigate("/auth");
    return null;
  }

  const handleLogout = () => {
    logoutMutation.mutate();
    navigate("/auth");
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Main Content */}
      <div className="container mx-auto px-4">
        {children}
      </div>
    </div>
  );
}

// Book Form Component
function BookForm({ book, onSubmit, onCancel }: { 
  book?: Book; 
  onSubmit: (data: any) => void; 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    bookId: book?.bookId || "",
    title: book?.title || "",
    description: book?.description || "",
    thumbnail: book?.thumbnail || "",
    level: book?.level || "Beginner",
    isPublished: book?.isPublished || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="bookId">Book ID</Label>
          <Input
            id="bookId"
            name="bookId"
            value={formData.bookId}
            onChange={handleChange}
            placeholder="e.g. 1, 2a, 3b"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Book Title"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Book description"
          rows={3}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="thumbnail">Thumbnail URL</Label>
          <Input
            id="thumbnail"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="level">Level</Label>
          <Input
            id="level"
            name="level"
            value={formData.level}
            onChange={handleChange}
            placeholder="e.g. Beginner, Intermediate"
            required
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          {book ? 'Update Book' : 'Create Book'}
        </Button>
      </div>
    </form>
  );
}

// Unit Form Component
function UnitForm({ unit, bookId, onSubmit, onCancel }: { 
  unit?: Unit; 
  bookId: number;
  onSubmit: (data: any) => void; 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    bookId,
    unitNumber: unit?.unitNumber || 1,
    title: unit?.title || "",
    description: unit?.description || "",
    isPublished: unit?.isPublished || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === "unitNumber" ? parseInt(value) : value }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit(formData);
    }} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="unitNumber">Unit Number</Label>
          <Input
            id="unitNumber"
            name="unitNumber"
            type="number"
            value={formData.unitNumber}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Unit Title"
            required
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description || ""}
          onChange={handleChange}
          placeholder="Unit description"
          rows={3}
        />
      </div>
      
      <div className="flex items-center space-x-2">
        <Switch
          id="isPublished"
          checked={formData.isPublished}
          onCheckedChange={handleSwitchChange}
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          {unit ? 'Update Unit' : 'Create Unit'}
        </Button>
      </div>
    </form>
  );
}

// Material Form Component (simplified)
function MaterialForm({ material, unitId, onSubmit, onCancel }: { 
  material?: Material; 
  unitId: number;
  onSubmit: (data: any) => void; 
  onCancel: () => void 
}) {
  const [formData, setFormData] = useState({
    unitId,
    title: material?.title || "",
    contentType: material?.contentType || "lesson",
    content: material?.content ? JSON.stringify(material.content) : "{}",
    orderIndex: material?.orderIndex || 1,
    isPublished: material?.isPublished || false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "orderIndex" ? parseInt(value) : value 
    }));
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isPublished: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate JSON
      const contentJson = JSON.parse(formData.content);
      
      onSubmit({
        ...formData,
        content: contentJson
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "The content field must contain valid JSON",
        variant: "destructive"
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Material Title"
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contentType">Content Type</Label>
          <select
            id="contentType"
            name="contentType"
            value={formData.contentType}
            onChange={handleChange}
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
            required
          >
            <option value="lesson">Lesson</option>
            <option value="exercise">Exercise</option>
            <option value="quiz">Quiz</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="document">Document</option>
          </select>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="content">Content (JSON)</Label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleChange}
          placeholder='{"text": "Content here", "images": ["image1.jpg"]}'
          rows={6}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="orderIndex">Display Order</Label>
          <Input
            id="orderIndex"
            name="orderIndex"
            type="number"
            value={formData.orderIndex}
            onChange={handleChange}
            min={1}
            required
          />
        </div>
        <div className="flex items-center space-x-2 pt-8">
          <Switch
            id="isPublished"
            checked={formData.isPublished}
            onCheckedChange={handleSwitchChange}
          />
          <Label htmlFor="isPublished">Published</Label>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
          {material ? 'Update Material' : 'Create Material'}
        </Button>
      </div>
    </form>
  );
}

// Content icons based on content type
function ContentTypeIcon({ type }: { type: string }) {
  switch (type) {
    case 'lesson':
      return <FileText className="h-4 w-4" />;
    case 'exercise':
      return <ClipboardList className="h-4 w-4" />;
    case 'quiz':
      return <ClipboardList className="h-4 w-4" />;
    case 'video':
      return <Video className="h-4 w-4" />;
    case 'audio':
      return <AudioLines className="h-4 w-4" />;
    case 'document':
      return <FileText className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

// Main Content Management Component
function ContentManagement() {
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  
  // Fetch books
  const { data: books, isLoading: booksLoading } = useQuery<Book[]>({
    queryKey: ['/api/books'],
    retry: 1,
  });
  
  // Fetch units for selected book
  const { data: units, isLoading: unitsLoading } = useQuery<Unit[]>({
    queryKey: ['/api/books', selectedBookId, 'units'],
    enabled: !!selectedBookId,
    queryFn: async () => {
      if (!selectedBookId) return [];
      const res = await fetch(`/api/books/${selectedBookId}/units`);
      if (!res.ok) throw new Error('Failed to fetch units');
      return await res.json();
    },
  });
  
  // Fetch materials for selected unit
  const { data: materials, isLoading: materialsLoading } = useQuery<Material[]>({
    queryKey: ['/api/units', selectedUnitId, 'materials'],
    enabled: !!selectedUnitId,
    queryFn: async () => {
      if (!selectedUnitId) return [];
      const res = await fetch(`/api/units/${selectedUnitId}/materials`);
      if (!res.ok) throw new Error('Failed to fetch materials');
      return await res.json();
    },
  });
  
  // Book mutations
  const createBookMutation = useMutation({
    mutationFn: async (bookData: any) => {
      const res = await apiRequest('POST', '/api/books', bookData);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Book created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      setIsBookDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to create book", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const updateBookMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest('PUT', `/api/books/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Book updated successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      setIsBookDialogOpen(false);
      setEditingBook(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to update book", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const deleteBookMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/books/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Book deleted successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/books'] });
      if (selectedBookId) {
        setSelectedBookId(null);
      }
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to delete book", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  // Unit mutations
  const createUnitMutation = useMutation({
    mutationFn: async (unitData: any) => {
      if (!selectedBookId) throw new Error('No book selected');
      const res = await apiRequest('POST', `/api/books/${selectedBookId}/units`, unitData);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Unit created successfully" });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
      }
      setIsUnitDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to create unit", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const updateUnitMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest('PUT', `/api/units/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Unit updated successfully" });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
      }
      setIsUnitDialogOpen(false);
      setEditingUnit(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to update unit", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const deleteUnitMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/units/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Unit deleted successfully" });
      if (selectedBookId) {
        queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
      }
      if (selectedUnitId) {
        setSelectedUnitId(null);
      }
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to delete unit", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  // Material mutations
  const createMaterialMutation = useMutation({
    mutationFn: async (materialData: any) => {
      if (!selectedUnitId) throw new Error('No unit selected');
      const res = await apiRequest('POST', `/api/units/${selectedUnitId}/materials`, materialData);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Material created successfully" });
      if (selectedUnitId) {
        queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
      }
      setIsMaterialDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to create material", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const updateMaterialMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: any }) => {
      const res = await apiRequest('PUT', `/api/materials/${id}`, data);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Material updated successfully" });
      if (selectedUnitId) {
        queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
      }
      setIsMaterialDialogOpen(false);
      setEditingMaterial(null);
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to update material", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });
  
  const deleteMaterialMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest('DELETE', `/api/materials/${id}`);
    },
    onSuccess: () => {
      toast({ title: "Material deleted successfully" });
      if (selectedUnitId) {
        queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
      }
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to delete material", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  // Handle form submissions
  const handleBookSubmit = (data: any) => {
    if (editingBook) {
      updateBookMutation.mutate({ id: editingBook.id, data });
    } else {
      createBookMutation.mutate(data);
    }
  };
  
  const handleUnitSubmit = (data: any) => {
    if (editingUnit) {
      updateUnitMutation.mutate({ id: editingUnit.id, data });
    } else {
      createUnitMutation.mutate(data);
    }
  };
  
  const handleMaterialSubmit = (data: any) => {
    if (editingMaterial) {
      updateMaterialMutation.mutate({ id: editingMaterial.id, data });
    } else {
      createMaterialMutation.mutate(data);
    }
  };

  // Edit actions
  const handleEditBook = (book: Book) => {
    setEditingBook(book);
    setIsBookDialogOpen(true);
  };
  
  const handleEditUnit = (unit: Unit) => {
    setEditingUnit(unit);
    setIsUnitDialogOpen(true);
  };
  
  const handleEditMaterial = (material: Material) => {
    setEditingMaterial(material);
    setIsMaterialDialogOpen(true);
  };

  // Delete confirmations
  const handleDeleteBook = (id: number) => {
    if (window.confirm("Are you sure you want to delete this book? This will also delete all associated units and materials.")) {
      deleteBookMutation.mutate(id);
    }
  };
  
  const handleDeleteUnit = (id: number) => {
    if (window.confirm("Are you sure you want to delete this unit? This will also delete all associated materials.")) {
      deleteUnitMutation.mutate(id);
    }
  };
  
  const handleDeleteMaterial = (id: number) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      deleteMaterialMutation.mutate(id);
    }
  };

  // Navigation functions
  const handleBookSelect = (bookId: number) => {
    setSelectedBookId(bookId);
    setSelectedUnitId(null);
  };
  
  const handleUnitSelect = (unitId: number) => {
    setSelectedUnitId(unitId);
  };
  
  const handleBackToBooks = () => {
    setSelectedBookId(null);
    setSelectedUnitId(null);
  };
  
  const handleBackToUnits = () => {
    setSelectedUnitId(null);
  };

  // Reset form states
  const resetBookDialog = () => {
    setEditingBook(null);
    setIsBookDialogOpen(false);
  };
  
  const resetUnitDialog = () => {
    setEditingUnit(null);
    setIsUnitDialogOpen(false);
  };
  
  const resetMaterialDialog = () => {
    setEditingMaterial(null);
    setIsMaterialDialogOpen(false);
  };

  // Filter books based on search query
  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books
      .filter((book) => {
        if (!searchQuery.trim()) return true;
        
        const query = searchQuery.toLowerCase();
        return (
          book.title.toLowerCase().includes(query) || 
          book.bookId.toLowerCase().includes(query) ||
          (book.description && book.description.toLowerCase().includes(query))
        );
      });
  }, [books, searchQuery]);

  // Find current book and unit names
  const currentBook = books?.find(book => book.id === selectedBookId);
  const currentUnit = units?.find(unit => unit.id === selectedUnitId);

  return (
    <div>
      {/* Breadcrumb Navigation - Only show when inside a book or unit */}
      {(selectedBookId || selectedUnitId) && (
        <div className="flex items-center text-sm text-gray-500 mb-8">
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={handleBackToBooks}
          >
            <Book className="h-4 w-4 mr-1" />
            Books
          </Button>
          
          {selectedBookId && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <Button
                variant="link"
                className="p-0 h-auto"
                onClick={handleBackToUnits}
              >
                {currentBook?.title || "Loading..."}
              </Button>
            </>
          )}
          
          {selectedUnitId && (
            <>
              <ChevronRight className="h-4 w-4 mx-1" />
              <span>{currentUnit?.title || "Loading..."}</span>
            </>
          )}
        </div>
      )}

      {/* Search and controls */}
      <div className="flex items-center justify-center gap-4 max-w-xl mx-auto mb-8 px-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search content..." 
            className="pl-9 py-2 text-base rounded-md border-gray-200"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button 
          onClick={() => setIsBookDialogOpen(true)}
          className="whitespace-nowrap bg-blue-600 hover:bg-blue-700 text-white"
        >
          Create Book
        </Button>
      </div>
      
      {/* Content Area */}
      <main className="container mx-auto px-4 py-4">
        {!selectedBookId ? (
          // Books List View
          <div>
            {booksLoading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {[...Array(10)].map((_, index) => (
                  <div key={index} className="flex flex-col overflow-hidden bg-white shadow">
                    <div className="p-3 text-center border-b">
                      <Skeleton className="h-6 w-3/4 mx-auto" />
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center">
                      <Skeleton className="h-32 w-32 rounded-md" />
                    </div>
                    <div className="p-2">
                      <Skeleton className="h-10 w-full rounded" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredBooks.length > 0 ? (
              // Books grid with 5 columns on larger screens to match the design
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredBooks.map((book) => (
                  <div key={book.id} className="flex flex-col overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
                    <div className="p-3 text-center border-b">
                      <h3 className="font-semibold">{book.title}</h3>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center">
                      <div className="relative h-40 w-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                        <BookOpen className="h-16 w-16 text-gray-300" style={{ position: 'absolute', opacity: 0.5 }} />
                        <img 
                          src={book.thumbnail} 
                          alt={`${book.title} thumbnail`} 
                          className="max-h-full max-w-full object-contain relative z-10"
                          onError={(e) => {
                            console.log(`Failed to load thumbnail for book ${book.bookId}`);
                            // Keep the BookOpen icon visible by not changing opacity when image fails
                            const bookIcon = e.currentTarget.previousElementSibling;
                            if (bookIcon) {
                              (bookIcon as HTMLElement).style.opacity = "1";
                            }
                            // Hide the broken image
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    </div>
                    <div className="p-2">
                      <Button 
                        onClick={() => handleBookSelect(book.id)}
                        className="w-full py-2 text-white hover:bg-opacity-90"
                        style={{ 
                          /* Apply different colors based on book ID to make them colorful */
                          backgroundColor: getButtonColor(book.id)
                        }} 
                      >
                        Manage Book <span className="ml-1">→</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <BookOpen className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No books found</h3>
                <p className="text-gray-500 mt-2">
                  {searchQuery ? "Try adjusting your search query" : "No books have been added yet"}
                </p>
              </div>
            )}
          </div>
        ) : !selectedUnitId ? (
          // Units List View
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                Units - {currentBook?.title}
              </h1>
              <Button 
                onClick={() => setIsUnitDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> New Unit
              </Button>
            </div>
            
            {unitsLoading ? (
              <div className="text-center py-8">Loading units...</div>
            ) : units && units.length > 0 ? (
              <Table>
                <TableCaption>List of units for {currentBook?.title}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Unit #</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="text-right w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {units.map((unit) => (
                    <TableRow key={unit.id}>
                      <TableCell className="font-medium">{unit.unitNumber}</TableCell>
                      <TableCell>{unit.title}</TableCell>
                      <TableCell className="max-w-md truncate">
                        {unit.description || "No description"}
                      </TableCell>
                      <TableCell>
                        {unit.isPublished ? (
                          <div className="flex justify-center">
                            <div className="text-green-500 bg-white/90 rounded-full p-1 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="text-gray-400 bg-white/90 rounded-full p-1 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleUnitSelect(unit.id)}
                          >
                            Manage
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditUnit(unit)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteUnit(unit.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No units found for this book. Create a new unit to get started.
              </div>
            )}
          </div>
        ) : (
          // Materials List View
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">
                Materials - {currentUnit?.title}
              </h1>
              <Button 
                onClick={() => setIsMaterialDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> New Material
              </Button>
            </div>
            
            {materialsLoading ? (
              <div className="text-center py-8">Loading materials...</div>
            ) : materials && materials.length > 0 ? (
              <Table>
                <TableCaption>List of materials for {currentUnit?.title}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24">Type</TableHead>
                    <TableHead className="w-24">Status</TableHead>
                    <TableHead className="text-right w-32">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {materials.map((material) => (
                    <TableRow key={material.id}>
                      <TableCell className="font-medium">{material.orderIndex}</TableCell>
                      <TableCell>{material.title}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <ContentTypeIcon type={material.contentType} />
                          <span className="ml-2 capitalize">{material.contentType}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {material.isPublished ? (
                          <div className="flex justify-center">
                            <div className="text-green-500 bg-white/90 rounded-full p-1 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                            </div>
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <div className="text-gray-400 bg-white/90 rounded-full p-1 shadow-sm">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                              </svg>
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditMaterial(material)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteMaterial(material.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No materials found for this unit. Create a new material to get started.
              </div>
            )}
          </div>
        )}
      </main>

      {/* Book Dialog */}
      <Dialog open={isBookDialogOpen} onOpenChange={setIsBookDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingBook ? 'Edit Book' : 'Create New Book'}</DialogTitle>
            <DialogDescription>
              {editingBook 
                ? 'Update the details for this book' 
                : 'Add a new book to your collection'}
            </DialogDescription>
          </DialogHeader>
          
          <BookForm 
            book={editingBook || undefined} 
            onSubmit={handleBookSubmit} 
            onCancel={resetBookDialog} 
          />
        </DialogContent>
      </Dialog>

      {/* Unit Dialog */}
      <Dialog open={isUnitDialogOpen} onOpenChange={setIsUnitDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingUnit ? 'Edit Unit' : 'Create New Unit'}</DialogTitle>
            <DialogDescription>
              {editingUnit 
                ? 'Update the details for this unit' 
                : `Add a new unit to "${currentBook?.title || 'this book'}"`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedBookId && (
            <UnitForm 
              unit={editingUnit || undefined} 
              bookId={selectedBookId}
              onSubmit={handleUnitSubmit} 
              onCancel={resetUnitDialog} 
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Material Dialog */}
      <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{editingMaterial ? 'Edit Material' : 'Create New Material'}</DialogTitle>
            <DialogDescription>
              {editingMaterial 
                ? 'Update the details for this material' 
                : `Add a new material to "${currentUnit?.title || 'this unit'}"`}
            </DialogDescription>
          </DialogHeader>
          
          {selectedUnitId && (
            <MaterialForm 
              material={editingMaterial || undefined} 
              unitId={selectedUnitId}
              onSubmit={handleMaterialSubmit} 
              onCancel={resetMaterialDialog} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function ContentManagementPage() {
  return (
    <ContentManagementLayout>
      <ContentManagement />
    </ContentManagementLayout>
  );
}