import { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLocation, Link } from "wouter";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  BookOpen, 
  BookOpenCheck, 
  ChevronRight,
  BookIcon, 
  LogOut, 
  Plus, 
  Pencil, 
  Trash2,
  FileText,
  Video, 
  AudioLines, 
  ClipboardList,
  FileImage
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "@/hooks/use-toast";

// Using extended type definitions to match component usage
interface BookType {
  id: number;
  bookId?: string | number;  // Can be string or number
  title: string;
  description: string | null;
  level: string | null;
  published: boolean;
  isPublished?: boolean; // Added for compatibility
  createdAt: Date;
  updatedAt: Date;
  thumbnailUrl?: string | null;
  thumbnail?: string | null; // Added for compatibility
}

interface BaseUnit {
  id: number;
  bookId: number;
  title: string;
  description: string | null;
  position: number;
  unitNumber?: number; // Added for compatibility
  published: boolean;
  isPublished?: boolean; // Added for compatibility
  createdAt: Date;
  updatedAt: Date;
}

interface Material {
  id: number;
  unitId: number;
  title: string;
  description: string | null;
  contentUrl: string;
  contentType: string;
  position: number;
  orderIndex?: number; // Added for compatibility
  published: boolean;
  isPublished?: boolean; // Added for compatibility
  createdAt: Date;
  updatedAt: Date;
  content?: string; // Added for compatibility
  teachingGuidance?: string; // Added for compatibility
}

// Extended Unit type with thumbnailUrl and other needed properties
interface Unit extends BaseUnit {
  thumbnailUrl?: string | null;
  unitNumber?: number;
  isPublished?: boolean;
}

// Type definition for the book thumbnail
type BookThumbnail = {
  bookId: string;
  title: string;
  gifUrl: string;
};

// Function to get different button colors based on book ID
const getBookButtonColor = (bookId?: string | number): string => {
  if (!bookId) return '#172554'; // default navy blue
  
  // Convert to string if it's a number
  const bookIdStr = bookId.toString();
  
  // Extract the first character of the bookId to determine color
  const firstChar = bookIdStr.charAt(0).toLowerCase();
  
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

// Book Form Component
function BookForm({ book, onSubmit, onCancel }: { 
  book?: BookType; 
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

// Material Form Component 
function MaterialForm({ material, unitId, onSubmit, onCancel }: { 
  material?: Material; 
  unitId: number;
  onSubmit: (data: any) => void; 
  onCancel: () => void 
}) {
  const [activeTab, setActiveTab] = useState('content');
  const [formData, setFormData] = useState({
    unitId,
    title: material?.title || "",
    contentType: material?.contentType || "lesson",
    content: material?.content ? JSON.stringify(material.content) : "{}",
    orderIndex: material?.orderIndex || 1,
    isPublished: material?.isPublished || false,
    // New teaching guidance fields
    teachingGuidance: material?.teachingGuidance ? JSON.stringify(material.teachingGuidance) : JSON.stringify({
      presentingQuestions: "",
      vocabularyChecks: "",
      promptStructures: "",
      followUpQuestions: ""
    })
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

  const handleTeachingGuidanceChange = (field: string, value: string) => {
    try {
      const guidanceData = JSON.parse(formData.teachingGuidance);
      guidanceData[field] = value;
      setFormData(prev => ({ 
        ...prev, 
        teachingGuidance: JSON.stringify(guidanceData)
      }));
    } catch (error) {
      console.error("Error updating teaching guidance:", error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Validate JSON
      const contentJson = JSON.parse(formData.content);
      const teachingGuidanceJson = JSON.parse(formData.teachingGuidance);
      
      onSubmit({
        ...formData,
        content: contentJson,
        teachingGuidance: teachingGuidanceJson
      });
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "One of the fields contains invalid JSON",
        variant: "destructive"
      });
    }
  };

  const parseTeachingGuidance = () => {
    try {
      return JSON.parse(formData.teachingGuidance);
    } catch (error) {
      return {
        presentingQuestions: "",
        vocabularyChecks: "",
        promptStructures: "",
        followUpQuestions: ""
      };
    }
  };

  const teachingGuidance = parseTeachingGuidance();

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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="content" className="flex items-center">
            <FileImage className="h-4 w-4 mr-2" />
            Content
          </TabsTrigger>
          <TabsTrigger value="teaching_guidance" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Teaching Guidance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="content">
          <div className="space-y-2 mt-4">
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
          
          <div className="grid grid-cols-2 gap-4 mt-4">
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
        </TabsContent>

        <TabsContent value="teaching_guidance">
          <div className="space-y-6 mt-4">
            <div className="border-l-4 border-[#0acf84] pl-4 pb-4 rounded bg-[#e0f8ed]">
              <Label htmlFor="presentingQuestions" className="text-base font-medium text-[#0a8f5c]">
                Presenting Questions
              </Label>
              <Textarea
                id="presentingQuestions"
                value={teachingGuidance.presentingQuestions}
                onChange={(e) => handleTeachingGuidanceChange('presentingQuestions', e.target.value)}
                placeholder="How to present questions to students (e.g., Show the question and point to key image details...)"
                rows={3}
                className="mt-1 border-[#a8e9cd] focus-visible:ring-[#0acf84]"
              />
            </div>

            <div className="border-l-4 border-[#4a89f3] pl-4 pb-4 rounded bg-[#e6f0ff]">
              <Label htmlFor="vocabularyChecks" className="text-base font-medium text-[#3270de]">
                Vocabulary Checks
              </Label>
              <Textarea
                id="vocabularyChecks"
                value={teachingGuidance.vocabularyChecks}
                onChange={(e) => handleTeachingGuidanceChange('vocabularyChecks', e.target.value)}
                placeholder="How to check vocabulary understanding (e.g., Refer to textbook, explain unfamiliar words...)"
                rows={3}
                className="mt-1 border-[#b6d0fa] focus-visible:ring-[#4a89f3]"
              />
            </div>

            <div className="border-l-4 border-[#a56cf5] pl-4 pb-4 rounded bg-[#f0e6ff] relative">
              <div className="absolute -top-2 right-4 text-xs font-bold bg-[#8c42f4] text-white px-2 py-1 rounded-sm">
                Most Popular
              </div>
              <Label htmlFor="promptStructures" className="text-base font-medium text-[#7d35e5]">
                Student Answer Prompts
              </Label>
              <Textarea
                id="promptStructures"
                value={teachingGuidance.promptStructures}
                onChange={(e) => handleTeachingGuidanceChange('promptStructures', e.target.value)}
                placeholder="Sentence frames to prompt student answers (e.g., 'Is it a cat or a dog?' → 'It is a...')"
                rows={3}
                className="mt-1 border-[#d8c2ff] focus-visible:ring-[#a56cf5]"
              />
            </div>

            <div className="border-l-4 border-[#faa521] pl-4 pb-4 rounded bg-[#fff4e4]">
              <Label htmlFor="followUpQuestions" className="text-base font-medium text-[#e87800]">
                Follow-up Questions
              </Label>
              <Textarea
                id="followUpQuestions"
                value={teachingGuidance.followUpQuestions}
                onChange={(e) => handleTeachingGuidanceChange('followUpQuestions', e.target.value)}
                placeholder="Suggested follow-up questions (e.g., 'Why do you think so?', 'Can you describe it more?')"
                rows={3}
                className="mt-1 border-[#fad297] focus-visible:ring-[#faa521]"
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end space-x-2 pt-6">
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

// Main component 
const BooksManagementPage = () => {
  const { user, logoutMutation, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // Method to navigate back to admin dashboard
  const handleBackToAdmin = () => {
    navigate('/admin');
  };
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);
  const [isUnitDialogOpen, setIsUnitDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<BookType | null>(null);
  const [editingUnit, setEditingUnit] = useState<Unit | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<Material | null>(null);
  
  // Redirect to auth page if not logged in
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        console.log("User not authenticated, redirecting to auth page");
        navigate("/auth");
      } else if (user.role !== "admin" && user.role !== "teacher") {
        console.log("User not authorized for books page, redirecting to homepage");
        navigate("/");
      }
    }
  }, [user, authLoading, navigate]);

  // Fetch books from API
  const { data: books, isLoading: isBooksLoading } = useQuery<BookType[]>({
    queryKey: ["/api/books"],
    enabled: !!user,
  });
  
  // Fetch thumbnails with presigned URLs
  const { data: thumbnails, isLoading: isThumbnailsLoading } = useQuery<BookThumbnail[]>({
    queryKey: ["/api/assets/book-thumbnails"],
    enabled: !!user,
  });
  
  // Fetch units for selected book
  const { data: units, isLoading: isUnitsLoading } = useQuery<Unit[]>({
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
  const { data: materials, isLoading: isMaterialsLoading } = useQuery<Material[]>({
    queryKey: ['/api/units', selectedUnitId, 'materials'],
    enabled: !!selectedUnitId,
    queryFn: async () => {
      if (!selectedUnitId) return [];
      const res = await fetch(`/api/units/${selectedUnitId}/materials`);
      if (!res.ok) throw new Error('Failed to fetch materials');
      return await res.json();
    },
  });
  
  // Combined loading state
  const isLoading = isBooksLoading || isThumbnailsLoading;

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
  const handleEditBook = (book: BookType) => {
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
    // Get the selected unit and book info
    const selectedUnit = units?.find(u => u.id === unitId);
    const selectedBook = books?.find(b => b.id === selectedBookId);
    
    if (selectedUnit && selectedBook) {
      // Use the S3-matching direct path structure instead of database IDs
      const bookPath = `book${selectedBook.bookId}`;
      const unitPath = `unit${selectedUnit.unitNumber}`;
      console.log(`Navigating to direct path: /${bookPath}/${unitPath}`);
      
      // Navigate to direct content viewer with S3 path format
      navigate(`/${bookPath}/${unitPath}`);
    } else {
      console.error('Could not find unit or book information');
      toast({
        title: "Navigation error",
        description: "Could not find unit information",
        variant: "destructive"
      });
    }
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

  // Sort books only (no search filter)
  const filteredBooks = useMemo(() => {
    if (!books) return [];

    return books.sort((a, b) => {
      // Sort books by ID (simpler approach to avoid type issues)
      return a.id - b.id;
    });
  }, [books]);

  // Find current book and unit names
  const currentBook = books?.find(book => book.id === selectedBookId);
  const currentUnit = units?.find(unit => unit.id === selectedUnitId);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            className="flex items-center gap-1"
            onClick={handleBackToAdmin}
          >
            <ChevronRight className="h-4 w-4 transform rotate-180" />
            Back to Admin
          </Button>
          <h1 className="text-2xl font-bold">Books Management</h1>
          <div className="w-28"></div> {/* Empty div for spacing balance */}
        </div>
      </div>

      {/* Breadcrumb Navigation - Only show when inside a book or unit */}
      {(selectedBookId || selectedUnitId) && (
        <div className="flex items-center text-sm text-gray-500 mb-8 px-6">
          <Button
            variant="link"
            className="p-0 h-auto"
            onClick={handleBackToBooks}
          >
            <BookIcon className="h-4 w-4 mr-1" />
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
      


      <main className="container mx-auto px-4 py-4">
        {!selectedBookId ? (
          // Books List View
          <div>
            {isLoading ? (
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
            ) : filteredBooks.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                <BookOpenCheck className="h-16 w-16 text-gray-300 mb-4" />
                <h3 className="text-xl font-medium text-gray-700">No books found</h3>
                <p className="text-gray-500 mt-2">
                  No books have been added yet. Create a book to get started.
                </p>
              </div>
            ) : (
              // Books grid with 5 columns on larger screens
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
                          src={thumbnails?.find(t => t.bookId === book.bookId?.toString())?.gifUrl || ''}
                          alt={book.title}
                          className="max-h-full max-w-full object-contain relative z-10"
                          onError={(e) => {
                            console.log(`Failed to load GIF thumbnail for book ${book.bookId}`);
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
                    <div className="p-2 flex flex-col gap-2">
                      <Button 
                        onClick={() => handleBookSelect(book.id)}
                        className="w-full py-2 text-white hover:bg-opacity-90"
                        style={{ 
                          backgroundColor: getBookButtonColor(book.bookId)
                        }} 
                      >
                        View Book <span className="ml-1">→</span>
                      </Button>
                      

                    </div>
                  </div>
                ))}
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

            </div>
            
            {isUnitsLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {[...Array(8)].map((_, index) => (
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
            ) : units && units.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {units.map((unit) => (
                  <div key={unit.id} className="flex flex-col overflow-hidden bg-white shadow hover:shadow-md transition-shadow">
                    <div className="p-3 text-center border-b">
                      <h3 className="font-semibold flex flex-col">
                        <span>UNIT {unit.unitNumber}</span>
                        <span className="uppercase">{unit.title}</span>
                      </h3>
                    </div>
                    <div className="flex-1 p-6 flex items-center justify-center">
                      <div className="relative h-40 w-40 bg-gray-50 flex items-center justify-center overflow-hidden">
                        {/* Small padlock icon in corner */}
                        <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1 shadow-sm z-20">
                          {unit.isPublished ? (
                            <div className="text-green-500">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                              </svg>
                            </div>
                          ) : (
                            <div className="text-gray-400">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                                <path d="M7 11V7a5 5 0 0 1 9.9-1"></path>
                              </svg>
                            </div>
                          )}
                        </div>
                        <FileImage className="h-16 w-16 text-gray-300" style={{ position: 'absolute', opacity: 0.5 }} />
                        {unit.thumbnailUrl && (
                          <img 
                            src={unit.thumbnailUrl}
                            alt={`Unit ${unit.unitNumber} thumbnail`}
                            className="max-h-full max-w-full object-contain relative z-10"
                            onError={(e) => {
                              console.log(`Failed to load thumbnail for unit ${unit.unitNumber}`);
                              // Keep the icon visible when image fails
                              const icon = e.currentTarget.previousElementSibling;
                              if (icon) {
                                (icon as HTMLElement).style.opacity = "1";
                              }
                              // Hide the broken image
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                      </div>
                    </div>
                    <div className="mt-auto p-2 flex flex-col gap-2">
                      <Button 
                        onClick={() => handleUnitSelect(unit.id)}
                        className="w-full py-2 text-white hover:bg-opacity-90"
                        style={{ 
                          backgroundColor: getBookButtonColor(unit.position.toString())
                        }} 
                      >
                        View Unit <span className="ml-1">→</span>
                      </Button>
                      

                    </div>
                  </div>
                ))}
              </div>
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
              {user?.role === "admin" && (
                <Button 
                  onClick={() => {
                    setEditingMaterial(null);
                    setIsMaterialDialogOpen(true);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" /> New Material
                </Button>
              )}
            </div>
            
            {isMaterialsLoading ? (
              <div className="text-center py-8">
                <Skeleton className="h-8 w-64 mx-auto mb-4" />
                <Skeleton className="h-32 w-full mx-auto" />
              </div>
            ) : materials && materials.length > 0 ? (
              <Table>
                <TableCaption>List of materials for {currentUnit?.title}</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Order</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead className="w-24">Type</TableHead>
                    <TableHead className="w-24">Status</TableHead>
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
};

export default BooksManagementPage;