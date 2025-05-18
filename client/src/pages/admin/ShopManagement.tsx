import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { 
  ShoppingBag, 
  CreditCard, 
  BookOpen, 
  PackageOpen,
  FileText, 
  Plus, 
  Pencil, 
  Trash2, 
  ChevronLeft,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'wouter';

// Define types for shop items
interface ShopItem {
  id: number;
  type: 'subscription' | 'printed_book' | 'resource';
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

// Mock data for subscriptions
const subscriptions: ShopItem[] = [
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

// Mock data for printed books
const printedBooks: ShopItem[] = [
  {
    id: 5,
    type: 'printed_book',
    name: 'Visual English Book 1',
    description: 'Physical printed copy of Visual English Book 1',
    price: 20,
    isActive: true,
    bookId: '1',
    inventory: 50
  },
  {
    id: 6,
    type: 'printed_book',
    name: 'Visual English Book 2',
    description: 'Physical printed copy of Visual English Book 2',
    price: 20,
    isActive: true,
    bookId: '2',
    inventory: 75
  },
  {
    id: 7,
    type: 'printed_book',
    name: 'Visual English Book 3',
    description: 'Physical printed copy of Visual English Book 3',
    price: 20,
    isActive: true,
    bookId: '3',
    inventory: 30
  }
];

// Mock data for teaching resources
const teachingResources: ShopItem[] = [
  {
    id: 8,
    type: 'resource',
    name: 'Teacher Guide Book 1',
    description: 'Comprehensive teacher guide for Visual English Book 1',
    price: 15,
    isActive: true,
    bookId: '1'
  },
  {
    id: 9,
    type: 'resource',
    name: 'Flashcards Set - Book 1',
    description: 'Physical flashcards for activities in Book 1',
    price: 10,
    isActive: true,
    bookId: '1'
  },
  {
    id: 10,
    type: 'resource',
    name: 'Classroom Posters - Book 2',
    description: 'Set of 10 educational posters for Book 2 content',
    price: 12,
    isActive: true,
    bookId: '2'
  }
];

export default function ShopManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('subscriptions');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<ShopItem | null>(null);
  const [editedItem, setEditedItem] = useState<ShopItem | null>(null);

  // Handle creating a new shop item
  const handleCreate = (type: 'subscription' | 'printed_book' | 'resource') => {
    const newItem: ShopItem = {
      id: Math.max(...subscriptions.map(s => s.id), ...printedBooks.map(b => b.id), ...teachingResources.map(r => r.id)) + 1,
      type,
      name: '',
      description: '',
      price: 0,
      isActive: true,
      ...(type === 'subscription' ? { duration: 'monthly' } : {}),
      ...(type === 'printed_book' ? { bookId: '', inventory: 0 } : {}),
      ...(type === 'resource' ? { bookId: '' } : {})
    };
    
    setCurrentItem(newItem);
    setEditedItem(newItem);
    setIsDialogOpen(true);
  };

  // Handle editing an existing shop item
  const handleEdit = (item: ShopItem) => {
    setCurrentItem(item);
    setEditedItem({...item});
    setIsDialogOpen(true);
  };

  // Handle deleting a shop item
  const handleDelete = (id: number) => {
    toast({
      title: "Item Deleted",
      description: "The shop item has been deleted successfully.",
    });
  };

  // Handle saving the edited shop item
  const handleSave = () => {
    if (!editedItem) return;
    
    toast({
      title: "Success",
      description: `Shop item ${editedItem.id ? 'updated' : 'created'} successfully.`,
    });
    
    setIsDialogOpen(false);
  };

  // Handle form input changes
  const handleInputChange = (field: keyof ShopItem, value: any) => {
    if (!editedItem) return;
    
    setEditedItem({
      ...editedItem,
      [field]: value
    });
  };

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header with back button */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Link href="/admin">
            <Button variant="ghost" className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-3xl font-bold">Shop Management</h1>
        </div>
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

      {/* Main content tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="subscriptions" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="printed_books" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
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
          <div className="grid md:grid-cols-2 gap-6">
            {subscriptions.map((subscription) => (
              <Card key={subscription.id} className={subscription.isActive ? "" : "border-dashed opacity-70"}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{subscription.name}</CardTitle>
                      <CardDescription>{subscription.duration === 'monthly' ? 'Monthly Subscription' : 'Annual Subscription'}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      {!subscription.isActive && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4">{subscription.description}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">€{subscription.price}</span>
                      {subscription.discountedPrice > 0 && (
                        <span className="ml-2 text-sm text-gray-500 line-through">€{subscription.discountedPrice}</span>
                      )}
                      <span className="text-sm text-gray-500 ml-1">/{subscription.duration === 'monthly' ? 'month' : 'year'}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(subscription)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(subscription.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {/* Add subscription card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
              <ShoppingBag className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Subscription</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Create a new subscription plan for your users</p>
              <Button onClick={() => handleCreate('subscription')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Subscription
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Printed Books Tab */}
        <TabsContent value="printed_books">
          <div className="grid md:grid-cols-2 gap-6">
            {printedBooks.map((book) => (
              <Card key={book.id} className={book.isActive ? "" : "border-dashed opacity-70"}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{book.name}</CardTitle>
                      <CardDescription>Book ID: {book.bookId}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      {!book.isActive && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Inactive
                        </Badge>
                      )}
                      {(book.inventory && book.inventory < 10) && (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          Low Stock: {book.inventory}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4">{book.description}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">€{book.price}</span>
                      {book.discountedPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">€{book.discountedPrice}</span>
                      )}
                    </div>
                    <Badge variant="outline">Stock: {book.inventory}</Badge>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(book)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(book.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {/* Add book card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
              <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Printed Book</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Add a new printed book product to your shop</p>
              <Button onClick={() => handleCreate('printed_book')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Printed Book
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Pricing Display Tab */}
        <TabsContent value="pricing_display">
          <Card>
            <CardHeader>
              <CardTitle>Pricing Display Settings</CardTitle>
              <CardDescription>Configure how pricing plans appear on the website</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-4">Featured Plans</h3>
                  <p className="text-sm text-gray-500 mb-4">
                    Select which plans should be featured and in what order they appear on the pricing page.
                  </p>

                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Plan Name</TableHead>
                        <TableHead>Monthly Price</TableHead>
                        <TableHead>Annual Price</TableHead>
                        <TableHead>Featured</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-medium">Single Lesson Access</TableCell>
                        <TableCell>€5</TableCell>
                        <TableCell>€40</TableCell>
                        <TableCell>
                          <Switch checked={false} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Whole Book Access</TableCell>
                        <TableCell>€25</TableCell>
                        <TableCell>€180</TableCell>
                        <TableCell>
                          <Switch checked={true} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-medium">Printed Book Only</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>€20</TableCell>
                        <TableCell>
                          <Switch checked={false} />
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Teaching Resources Tab */}
        <TabsContent value="teaching_resources">
          <div className="grid md:grid-cols-2 gap-6">
            {teachingResources.map((resource) => (
              <Card key={resource.id} className={resource.isActive ? "" : "border-dashed opacity-70"}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{resource.name}</CardTitle>
                      <CardDescription>For Book {resource.bookId}</CardDescription>
                    </div>
                    <div className="flex space-x-1">
                      {!resource.isActive && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-500 mb-4">{resource.description}</div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold">€{resource.price}</span>
                      {resource.discountedPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">€{resource.discountedPrice}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-3 border-t flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleEdit(resource)}
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDelete(resource.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
            {/* Add resource card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6 h-full">
              <FileText className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">Add New Teaching Resource</h3>
              <p className="text-sm text-gray-500 text-center mb-4">Add a new teaching resource product to your shop</p>
              <Button onClick={() => handleCreate('resource')}>
                <Plus className="h-4 w-4 mr-2" />
                Add Resource
              </Button>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit/Create Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {editedItem && 'id' in editedItem ? 'Edit Shop Item' : 'Create New Shop Item'}
            </DialogTitle>
          </DialogHeader>
          
          {editedItem && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={editedItem.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={editedItem.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="col-span-3"
                />
              </div>
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="price" className="text-right">
                  Price (€)
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={editedItem.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="col-span-3"
                />
              </div>
              
              {editedItem.type === 'subscription' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <div className="col-span-3 flex gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="monthly"
                        checked={editedItem.duration === 'monthly'}
                        onChange={() => handleInputChange('duration', 'monthly')}
                      />
                      <Label htmlFor="monthly">Monthly</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="yearly"
                        checked={editedItem.duration === 'yearly'}
                        onChange={() => handleInputChange('duration', 'yearly')}
                      />
                      <Label htmlFor="yearly">Yearly</Label>
                    </div>
                  </div>
                </div>
              )}
              
              {(editedItem.type === 'printed_book' || editedItem.type === 'resource') && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bookId" className="text-right">
                    Related Book
                  </Label>
                  <Input
                    id="bookId"
                    value={editedItem.bookId || ''}
                    onChange={(e) => handleInputChange('bookId', e.target.value)}
                    className="col-span-3"
                    placeholder="Enter book ID (e.g., 1, 2, 3)"
                  />
                </div>
              )}
              
              {editedItem.type === 'printed_book' && (
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="inventory" className="text-right">
                    Inventory
                  </Label>
                  <Input
                    id="inventory"
                    type="number"
                    value={editedItem.inventory || 0}
                    onChange={(e) => handleInputChange('inventory', parseInt(e.target.value))}
                    className="col-span-3"
                  />
                </div>
              )}
              
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="isActive" className="text-right">
                  Active
                </Label>
                <div className="col-span-3 flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={editedItem.isActive}
                    onCheckedChange={(checked) => handleInputChange('isActive', checked)}
                  />
                  <Label htmlFor="isActive">
                    {editedItem.isActive ? 'Product is available for purchase' : 'Product is not available for purchase'}
                  </Label>
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}