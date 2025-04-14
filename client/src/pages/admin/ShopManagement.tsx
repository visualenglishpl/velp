import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, PackageOpen, CreditCard, Book, CheckCircle2, FileText, School, BookOpen } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';

// Define types for our shop items
interface ShopItem {
  id: number;
  type: 'subscription' | 'printed_book';
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  isActive: boolean;
  duration?: string; // For subscriptions: "monthly", "yearly"
  bookId?: string; // For printed books
  inventory?: number; // For printed books
  imageUrl?: string;
}

// Plan type for the pricing display
interface Plan {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  featuredBadge?: string;
  features: string[];
  isPopular?: boolean;
}

export default function ShopManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [editItem, setEditItem] = useState<ShopItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);

  // Fetch shop items
  const { data: shopItems, isLoading } = useQuery<ShopItem[]>({
    queryKey: ['/api/admin/shop-items']
  });

  // Fetch plans for the pricing page
  const { data: pricingPlans } = useQuery<Plan[]>({
    queryKey: ['/api/plans']
  });
  
  // Handle data loading effects separately
  useEffect(() => {
    if (shopItems) {
      console.log('Shop items loaded:', shopItems);
    }
  }, [shopItems]);
  
  useEffect(() => {
    if (pricingPlans) {
      console.log('Plans loaded:', pricingPlans);
      setPlans(pricingPlans);
    }
  }, [pricingPlans]);

  // Update shop item mutation
  const updateItemMutation = useMutation({
    mutationFn: async (item: ShopItem) => {
      const response = await fetch(`/api/admin/shop-items/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update item');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/shop-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: 'Success',
        description: 'Shop item updated successfully',
      });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating shop item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Create shop item mutation
  const createItemMutation = useMutation({
    mutationFn: async (item: Omit<ShopItem, 'id'>) => {
      const response = await fetch('/api/admin/shop-items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create item');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/shop-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: 'Success',
        description: 'Shop item created successfully',
      });
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({
        title: 'Error creating shop item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Delete shop item mutation
  const deleteItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/shop-items/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to delete item');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/admin/shop-items'] });
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: 'Success',
        description: 'Shop item deleted successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error deleting shop item',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Update the pricing display
  const updatePricingDisplay = useMutation({
    mutationFn: async (plans: Plan[]) => {
      const response = await fetch('/api/admin/pricing-display', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plans }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update pricing display');
      }
      
      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/plans'] });
      toast({
        title: 'Success',
        description: 'Pricing display updated successfully',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Error updating pricing display',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  // Create new empty shop item for form
  const createNewItem = (type: 'subscription' | 'printed_book'): Omit<ShopItem, 'id'> => {
    return {
      type,
      name: '',
      description: '',
      price: 0,
      isActive: true,
      ...(type === 'subscription' ? { duration: 'monthly' } : { bookId: '', inventory: 100 }),
    };
  };

  // Handle opening edit dialog
  const handleEdit = (item: ShopItem) => {
    setEditItem(item);
    setIsDialogOpen(true);
  };

  // Handle opening create dialog
  const handleCreate = (type: 'subscription' | 'printed_book') => {
    setEditItem(createNewItem(type) as ShopItem);
    setIsDialogOpen(true);
  };

  // Handle form submission
  const handleSave = () => {
    if (!editItem) return;
    
    if ('id' in editItem && editItem.id) {
      updateItemMutation.mutate(editItem);
    } else {
      createItemMutation.mutate(editItem as Omit<ShopItem, 'id'>);
    }
  };

  // Handle updating plan features
  const handleUpdatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex].features[featureIndex] = value;
    setPlans(updatedPlans);
  };

  // Handle adding new feature to a plan
  const handleAddFeature = (planIndex: number) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex].features.push('New feature');
    setPlans(updatedPlans);
  };

  // Handle removing a feature from a plan
  const handleRemoveFeature = (planIndex: number, featureIndex: number) => {
    const updatedPlans = [...plans];
    updatedPlans[planIndex].features.splice(featureIndex, 1);
    setPlans(updatedPlans);
  };

  // Mock data for initial development
  const mockSubscriptions: ShopItem[] = [
    {
      id: 1,
      type: 'subscription',
      name: 'Single Lesson Access',
      description: 'Access to all materials for a specific lesson/unit',
      price: 5,
      discountedPrice: 0,
      isActive: true,
      duration: 'monthly'
    },
    {
      id: 2,
      type: 'subscription',
      name: 'Single Lesson Access (Annual)',
      description: 'Annual access to all materials for a specific lesson/unit',
      price: 40,
      discountedPrice: 60,
      isActive: true,
      duration: 'yearly'
    },
    {
      id: 3,
      type: 'subscription',
      name: 'Whole Book Access',
      description: 'Access to all lessons and materials for an entire book',
      price: 25,
      discountedPrice: 0,
      isActive: true,
      duration: 'monthly'
    },
    {
      id: 4,
      type: 'subscription',
      name: 'Whole Book Access (Annual)',
      description: 'Annual access to all lessons and materials for an entire book',
      price: 180,
      discountedPrice: 300,
      isActive: true,
      duration: 'yearly'
    }
  ];

  const mockBooks: ShopItem[] = [
    {
      id: 5,
      type: 'printed_book',
      name: 'Visual English Book 1',
      description: 'Physical printed copy of Visual English Book 1',
      price: 20,
      isActive: true,
      bookId: 'book1',
      inventory: 50
    },
    {
      id: 6,
      type: 'printed_book',
      name: 'Visual English Book 2',
      description: 'Physical printed copy of Visual English Book 2',
      price: 20,
      isActive: true,
      bookId: 'book2',
      inventory: 75
    },
    {
      id: 7,
      type: 'printed_book',
      name: 'Visual English Book 3',
      description: 'Physical printed copy of Visual English Book 3',
      price: 20,
      isActive: true,
      bookId: 'book3',
      inventory: 30
    }
  ];

  const mockPlans: Plan[] = [
    {
      id: 'single-lesson',
      name: 'Single Lesson Access',
      description: 'Access to all materials for a specific lesson/unit',
      monthlyPrice: 5,
      yearlyPrice: 40,
      features: [
        'Access to all slides in a single unit',
        'Detailed teaching guidance',
        'Printable worksheets',
        'Interactive exercises'
      ]
    },
    {
      id: 'whole-book',
      name: 'Whole Book Access',
      description: 'Access to all lessons and materials for an entire book',
      monthlyPrice: 25,
      yearlyPrice: 180,
      isPopular: true,
      featuredBadge: 'MOST POPULAR',
      features: [
        'Access to all units in a book series',
        'Detailed teaching guidance for every unit',
        'All downloadable resources',
        'Interactive exercises for all units',
        'Progress tracking features'
      ]
    },
    {
      id: 'printed-book',
      name: 'Printed Book Only',
      description: 'Physical printed copy without digital access',
      monthlyPrice: 0,
      yearlyPrice: 20,
      features: [
        'Physical printed copy of the book',
        'High-quality printing',
        'Durable binding',
        'Colorful illustrations',
        'No digital access included'
      ]
    }
  ];

  useEffect(() => {
    // Set mock data if no data returned from API yet
    if (!shopItems && !isLoading) {
      console.log('Using mock shop items for development');
      const mockItems = [...mockSubscriptions, ...mockBooks];
      queryClient.setQueryData(['/api/admin/shop-items'], mockItems);
    }

    if (!pricingPlans && plans.length === 0) {
      console.log('Using mock pricing plans for development');
      setPlans(mockPlans);
      queryClient.setQueryData(['/api/plans'], mockPlans);
    }
  }, [shopItems, pricingPlans, isLoading, plans.length]);

  // Filter items by type for each tab - handle undefined data
  const subscriptions = shopItems 
    ? (shopItems as ShopItem[]).filter((item: ShopItem) => item.type === 'subscription') 
    : mockSubscriptions;
    
  const printedBooks = shopItems 
    ? (shopItems as ShopItem[]).filter((item: ShopItem) => item.type === 'printed_book') 
    : mockBooks;

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Shop Management</h1>
        <div className="flex space-x-2">
          <Button 
            onClick={() => handleCreate('subscription')} 
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Subscription
          </Button>
          <Button 
            onClick={() => handleCreate('printed_book')} 
            variant="outline" 
            className="flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Printed Book
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="subscriptions" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="printed_books" className="flex items-center">
            <Book className="h-4 w-4 mr-2" />
            Printed Books
          </TabsTrigger>
          <TabsTrigger value="pricing_display" className="flex items-center">
            <PackageOpen className="h-4 w-4 mr-2" />
            Pricing Display
          </TabsTrigger>
          <TabsTrigger value="teaching_resources" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Teaching Resources
          </TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {subscriptions.length === 0 ? (
                <div className="col-span-2 bg-muted p-8 rounded-lg text-center">
                  <p className="text-lg mb-4">No subscription plans found</p>
                  <Button onClick={() => handleCreate('subscription')}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create your first subscription plan
                  </Button>
                </div>
              ) : (
                subscriptions.map((subscription: ShopItem) => (
                  <Card key={subscription.id} className={subscription.isActive ? "" : "border-dashed opacity-70"}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{subscription.name}</CardTitle>
                          <CardDescription>{subscription.duration}</CardDescription>
                        </div>
                        <div className="flex space-x-1">
                          {!subscription.isActive && (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Inactive
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(subscription)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this subscription plan?')) {
                                deleteItemMutation.mutate(subscription.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">{subscription.description}</p>
                      <div className="flex items-baseline space-x-2">
                        <span className="text-3xl font-bold">€{subscription.price.toFixed(2)}</span>
                        {subscription.discountedPrice && subscription.discountedPrice > 0 && (
                          <>
                            <span className="text-xl line-through text-muted-foreground">€{subscription.discountedPrice.toFixed(2)}</span>
                            <Badge variant="secondary" className="ml-auto">
                              {Math.round(((subscription.discountedPrice - subscription.price) / subscription.discountedPrice) * 100)}% OFF
                            </Badge>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}
        </TabsContent>

        {/* Printed Books Tab */}
        <TabsContent value="printed_books">
          {isLoading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Book ID</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Inventory</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {printedBooks.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        <p className="text-lg mb-4">No printed books found</p>
                        <Button onClick={() => handleCreate('printed_book')}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add printed book
                        </Button>
                      </TableCell>
                    </TableRow>
                  ) : (
                    printedBooks.map((book: ShopItem) => (
                      <TableRow key={book.id} className={!book.isActive ? "opacity-60" : ""}>
                        <TableCell className="font-medium">{book.name}</TableCell>
                        <TableCell>{book.bookId}</TableCell>
                        <TableCell>€{book.price.toFixed(2)}</TableCell>
                        <TableCell>
                          {book.inventory !== undefined ? book.inventory : 'N/A'}
                        </TableCell>
                        <TableCell>
                          {book.isActive ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                              Inactive
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(book)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-destructive"
                            onClick={() => {
                              if (confirm('Are you sure you want to delete this printed book?')) {
                                deleteItemMutation.mutate(book.id);
                              }
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        {/* Teaching Resources Tab */}
        <TabsContent value="teaching_resources">
          <div className="space-y-8">
            <Card className="overflow-hidden">
              <CardHeader className="bg-slate-50">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Teaching Guidance</CardTitle>
                    <CardDescription>Unit-specific guidance for Book 3, Unit 1 - Unit 1</CardDescription>
                  </div>
                  <Button variant="outline" className="flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Edit Template
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Presenting Questions</h3>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Show the question on the slide and point to any key image details (e.g. facial expressions, actions, background objects).</li>
                      <li>Clearly read the question aloud to the class — say it twice to help students process the language.</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Check Vocabulary Understanding</h3>
                    <ul className="space-y-2 list-disc list-inside text-sm">
                      <li>Refer back to the textbook vocabulary section if available.</li>
                      <li>Pause and explain any unfamiliar words using visuals, gestures, or simple definitions.</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Prompt Student Answers</h3>
                    <p className="text-sm mb-2">Use structured sentence frames:</p>
                    <ul className="space-y-1 list-disc list-inside text-sm">
                      <li>"Is it a cat or a dog?" → "It is a..."</li>
                      <li>"Are they sitting or standing?" → "They are..."</li>
                      <li>"Is he eating or sleeping?" → "He is..."</li>
                      <li>"Is she happy or sad?" → "She is..."</li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3">Ask Follow-up Questions</h3>
                    <p className="text-sm mb-2">To reinforce comprehension:</p>
                    <ul className="space-y-1 list-disc list-inside text-sm">
                      <li>"Why do you think so?"</li>
                      <li>"Can you describe it more?"</li>
                      <li>"What else can you see?"</li>
                    </ul>
                    <p className="text-sm mt-2 italic">Encourage full-sentence answers — especially with more advanced learners — and guide them toward more complete responses.</p>
                  </div>
                </div>
                
                <div className="mt-8 border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Example Content Slide</h3>
                  <div className="aspect-video max-w-2xl mx-auto bg-white rounded-lg overflow-hidden shadow-md border">
                    <div className="p-4 border-b bg-slate-50 flex items-center">
                      <Button variant="ghost" size="sm" className="p-1">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </Button>
                      <span className="ml-2 font-medium">BOOK 3 / UNIT 1</span>
                      <span className="ml-4 text-sm text-gray-500">Slide 1/201</span>
                      <div className="ml-auto flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4 14H10V20M20 10H14V4M14 10L21 3M3 21L10 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm" className="p-1">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 3H6C4.89543 3 4 3.89543 4 5V19C4 20.1046 4.89543 21 6 21H18C19.1046 21 20 20.1046 20 19V5C20 3.89543 19.1046 3 18 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M9 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </Button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-center mb-4">
                        <div className="font-bold">00 A.png</div>
                        <div className="text-sm text-gray-500">Content from book3/unit1/00 A.png</div>
                      </div>
                      <div className="relative aspect-[4/3] max-w-md mx-auto bg-[#4BACC6] rounded-md overflow-hidden">
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-6">
                          <div className="text-sm">VISUAL<span className="inline-flex items-center">👁</span></div>
                          <div className="text-2xl font-bold">ENGLISH</div>
                          <div className="mt-4 text-xl font-bold">BACK TO SCHOOL</div>
                          <div className="text-xl font-bold">SCHOOL OBJECTS</div>
                          <div className="mt-4">
                            <img 
                              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NzBGQzc0RDczQTc5MTFFQThENjhDMjQ0MzU5ODhGNDQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NzBGQzc0RDgzQTc5MTFFQThENjhDMjQ0MzU5ODhGNDQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3MEZDNzRENTNBNzkxMUVBOEQ2OEMyNDQzNTk4OEY0NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3MEZDNzRENjNBNzkxMUVBOEQ2OEMyNDQzNTk4OEY0NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjteADMAAA1tSURBVHja7FwNdFNV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" 
                              alt="School supplies illustration"
                              className="w-36 h-36 object-contain mx-auto"
                            />
                          </div>
                          <div className="absolute bottom-2 right-2 text-xs">1/201</div>
                        </div>
                      </div>
                      <div className="flex justify-center mt-6 space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                        <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Unit Description</CardTitle>
                    <CardDescription>Additional information for teaching this unit</CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex items-center">
                      <School className="h-4 w-4 mr-2" />
                      Add Resources
                    </Button>
                    <Button variant="outline" className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Add Activities
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">📚</span> Learning Content
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">🎒</span>
                        <span>School objects and classroom vocabulary</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🗣️</span>
                        <span>Basic question structures for school objects</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🔤</span>
                        <span>Colors, shapes, and sizes of objects</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">🎮</span> Interactive Activities
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">🎲</span>
                        <span>School objects bingo game</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🎯</span>
                        <span>Object identification racing game</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🎭</span>
                        <span>Role play: school shopping dialogue</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="border rounded-md p-4 bg-white shadow-sm">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <span className="mr-2">🔗</span> Additional Resources
                    </h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start">
                        <span className="mr-2">🎵</span>
                        <span>School objects song (video link)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">📝</span>
                        <span>Printable worksheets for classroom practice</span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">🎪</span>
                        <span>Kahoot quiz for vocabulary review</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        {/* Pricing Display Tab */}
        <TabsContent value="pricing_display">
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Website Pricing Display</CardTitle>
                <CardDescription>
                  Customize how pricing plans appear on the website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {plans.length > 0 ? (
                  plans.map((plan, planIndex) => (
                    <div key={planIndex} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium">{plan.name}</h3>
                          <p className="text-sm text-muted-foreground">{plan.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-2">
                            <Switch 
                              id={`popular-${planIndex}`}
                              checked={plan.isPopular || false}
                              onCheckedChange={(checked) => {
                                const updatedPlans = [...plans];
                                updatedPlans[planIndex].isPopular = checked;
                                setPlans(updatedPlans);
                              }}
                            />
                            <Label htmlFor={`popular-${planIndex}`}>Popular</Label>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor={`plan-name-${planIndex}`}>Plan Name</Label>
                          <Input 
                            id={`plan-name-${planIndex}`}
                            value={plan.name}
                            onChange={(e) => {
                              const updatedPlans = [...plans];
                              updatedPlans[planIndex].name = e.target.value;
                              setPlans(updatedPlans);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`badge-text-${planIndex}`}>Featured Badge (optional)</Label>
                          <Input 
                            id={`badge-text-${planIndex}`}
                            value={plan.featuredBadge || ''}
                            placeholder="e.g. Most Popular"
                            onChange={(e) => {
                              const updatedPlans = [...plans];
                              updatedPlans[planIndex].featuredBadge = e.target.value;
                              setPlans(updatedPlans);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`monthly-price-${planIndex}`}>Monthly Price (€)</Label>
                          <Input 
                            id={`monthly-price-${planIndex}`}
                            type="number"
                            value={plan.monthlyPrice}
                            onChange={(e) => {
                              const updatedPlans = [...plans];
                              updatedPlans[planIndex].monthlyPrice = parseFloat(e.target.value);
                              setPlans(updatedPlans);
                            }}
                          />
                        </div>
                        <div>
                          <Label htmlFor={`yearly-price-${planIndex}`}>Yearly Price (€)</Label>
                          <Input 
                            id={`yearly-price-${planIndex}`}
                            type="number"
                            value={plan.yearlyPrice}
                            onChange={(e) => {
                              const updatedPlans = [...plans];
                              updatedPlans[planIndex].yearlyPrice = parseFloat(e.target.value);
                              setPlans(updatedPlans);
                            }}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor={`description-${planIndex}`}>Description</Label>
                          <Textarea 
                            id={`description-${planIndex}`}
                            value={plan.description}
                            onChange={(e) => {
                              const updatedPlans = [...plans];
                              updatedPlans[planIndex].description = e.target.value;
                              setPlans(updatedPlans);
                            }}
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <Label>Features</Label>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleAddFeature(planIndex)}
                          >
                            <Plus className="h-3 w-3 mr-1" /> Add Feature
                          </Button>
                        </div>

                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center mb-2">
                            <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                            <Input 
                              value={feature}
                              onChange={(e) => handleUpdatePlanFeature(planIndex, featureIndex, e.target.value)}
                              className="flex-grow"
                            />
                            <Button 
                              variant="ghost" 
                              size="icon"
                              onClick={() => handleRemoveFeature(planIndex, featureIndex)}
                              className="ml-2 text-destructive h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p>No pricing plans found. Use the button below to create default plans.</p>
                    <Button 
                      onClick={() => {
                        setPlans(mockPlans);
                      }}
                      className="mt-4"
                    >
                      Create Default Plans
                    </Button>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  // Reset to original values
                  if (pricingPlans) {
                    setPlans([...pricingPlans]);
                  } else {
                    setPlans(mockPlans);
                  }
                }}>
                  Reset
                </Button>
                <Button 
                  onClick={() => updatePricingDisplay.mutate(plans)}
                  disabled={updatePricingDisplay.isPending}
                >
                  {updatePricingDisplay.isPending ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Pricing Display
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editItem && 'id' in editItem && editItem.id ? 'Edit' : 'Create'} {editItem?.type === 'subscription' ? 'Subscription' : 'Printed Book'}
            </DialogTitle>
          </DialogHeader>

          {editItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={editItem.name}
                  onChange={(e) => setEditItem({...editItem, name: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={editItem.description}
                  onChange={(e) => setEditItem({...editItem, description: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="price">Price (€)</Label>
                <Input 
                  id="price" 
                  type="number"
                  value={editItem.price}
                  onChange={(e) => setEditItem({...editItem, price: parseFloat(e.target.value)})}
                />
              </div>

              {editItem.type === 'subscription' && (
                <div className="grid gap-2">
                  <Label htmlFor="duration">Duration</Label>
                  <select 
                    id="duration"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    value={editItem.duration}
                    onChange={(e) => setEditItem({...editItem, duration: e.target.value})}
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                </div>
              )}

              {editItem.type === 'printed_book' && (
                <>
                  <div className="grid gap-2">
                    <Label htmlFor="bookId">Book ID</Label>
                    <Input 
                      id="bookId" 
                      value={editItem.bookId}
                      onChange={(e) => setEditItem({...editItem, bookId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="inventory">Inventory</Label>
                    <Input 
                      id="inventory" 
                      type="number"
                      value={editItem.inventory}
                      onChange={(e) => setEditItem({...editItem, inventory: parseInt(e.target.value)})}
                    />
                  </div>
                </>
              )}

              <div className="grid gap-2">
                <Label htmlFor="discountedPrice">Discounted Price (€) (Optional)</Label>
                <Input 
                  id="discountedPrice" 
                  type="number"
                  value={editItem.discountedPrice || ''}
                  placeholder="Leave empty for no discount"
                  onChange={(e) => {
                    const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
                    setEditItem({...editItem, discountedPrice: value});
                  }}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch 
                  id="isActive"
                  checked={editItem.isActive}
                  onCheckedChange={(checked) => setEditItem({...editItem, isActive: checked})}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={updateItemMutation.isPending || createItemMutation.isPending}
            >
              {(updateItemMutation.isPending || createItemMutation.isPending) ? (
                <>
                  <div className="animate-spin h-4 w-4 mr-2 border-2 border-current border-t-transparent rounded-full"></div>
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}