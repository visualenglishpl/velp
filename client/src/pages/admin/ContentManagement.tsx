import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
  DialogTrigger,
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
  Settings
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
      {/* Top Navigation Bar */}
      <div className="bg-white shadow-sm px-6 py-4 flex justify-between items-center mb-8">
        <div className="flex items-center space-x-2">
          <BookOpen className="h-6 w-6 text-purple-600" />
          <h1 className="text-xl font-semibold">Content Manager</h1>
        </div>

        <div className="flex items-center space-x-5">
          <Button 
            variant="ghost" 
            className="text-gray-700"
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-700 font-medium"
            onClick={() => navigate("/admin/content")}
          >
            Content Management
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-gray-700"
            onClick={() => navigate("/admin/books")}
          >
            Books
          </Button>
          
          <Button 
            variant="ghost" 
            className="text-red-600"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-1" />
            Sign Out
          </Button>
        </div>
      </div>
      
      {/* Visual English Header */}
      <div className="flex flex-col items-center mb-8">
        <div className="text-purple-600 mb-2">
          <BookOpen className="h-14 w-14" />
        </div>
        <h2 className="text-2xl font-bold text-purple-600 mb-1">
          Visual English
        </h2>
        <p className="text-gray-500 text-sm">
          Interactive Learning Platform
        </p>
      </div>

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
          value={formData.description}
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
          value={formData.description}
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
      const res = await apiRequest('POST', `/api/books/${selectedBookId}/units`, unitData);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Unit created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/books', selectedBookId, 'units'] });
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
      const res = await apiRequest('POST', `/api/units/${selectedUnitId}/materials`, materialData);
      return await res.json();
    },
    onSuccess: () => {
      toast({ title: "Material created successfully" });
      queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
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
      queryClient.invalidateQueries({ queryKey: ['/api/units', selectedUnitId, 'materials'] });
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

  // Find current book and unit names
  const currentBook = books?.find(book => book.id === selectedBookId);
  const currentUnit = units?.find(unit => unit.id === selectedUnitId);

  return (
    <div>
      {/* Breadcrumb Navigation */}
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

      {/* Content Area */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        {!selectedBookId ? (
          // Books List View
          <div>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold">Books</h1>
              <Button 
                onClick={() => setIsBookDialogOpen(true)}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-2" /> New Book
              </Button>
            </div>
            
            {booksLoading ? (
              <div className="text-center py-8">Loading books...</div>
            ) : books && books.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.map((book) => (
                  <div 
                    key={book.id} 
                    className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-[4/3] bg-gray-100 flex items-center justify-center">
                      <img 
                        src={book.thumbnail} 
                        alt={`${book.title} thumbnail`} 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"></path></svg>';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{book.title}</h3>
                        <span className="text-xs bg-blue-100 text-blue-800 rounded-full px-2 py-1">
                          {book.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        {book.description || "No description provided"}
                      </p>
                      <div className="flex items-center justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleBookSelect(book.id)}
                        >
                          Manage Units
                        </Button>
                        <div className="flex space-x-1">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleEditBook(book)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleDeleteBook(book.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No books found. Create a new book to get started.
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
                          <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">Published</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">Draft</span>
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
                          <span className="bg-green-100 text-green-800 text-xs rounded-full px-2 py-1">Published</span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 text-xs rounded-full px-2 py-1">Draft</span>
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
      </div>

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