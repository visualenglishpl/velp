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
  type: 'subscription' | 'printed_book' | 'resource' | 'free_trial';
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  isActive: boolean;
  duration?: string; // For subscriptions: "monthly", "yearly" or "trial"
  bookId?: string; // For printed books
  inventory?: number; // For printed books
  imageUrl?: string;
  trialDetails?: {
    days: number;
    downloadLimit?: number;
    booksLimit?: number;
    unitsLimit?: number;
    requiresCreditCard?: boolean;
  };
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
  },
  {
    id: 15,
    type: 'free_trial',
    name: 'Free 7-Day Trial',
    description: 'Limited access to teaching materials with download restrictions',
    price: 0,
    isActive: true,
    duration: 'trial',
    trialDetails: {
      days: 7,
      downloadLimit: 3,
      unitsLimit: 1,
      requiresCreditCard: true
    }
  }
];

// Mock data for printed books
const printedBooks: ShopItem[] = [
  {
    id: 5,
    type: 'printed_book',
    name: 'Visual English Book 0a',
    description: 'Physical printed copy of Visual English Book 0a',
    price: 20,
    isActive: true,
    bookId: '0a',
    inventory: 50
  },
  {
    id: 6,
    type: 'printed_book',
    name: 'Visual English Book 0b',
    description: 'Physical printed copy of Visual English Book 0b',
    price: 20,
    isActive: true,
    bookId: '0b',
    inventory: 75
  },
  {
    id: 7,
    type: 'printed_book',
    name: 'Visual English Book 0c',
    description: 'Physical printed copy of Visual English Book 0c',
    price: 20,
    isActive: true,
    bookId: '0c',
    inventory: 30
  },
  {
    id: 8,
    type: 'printed_book',
    name: 'Visual English Book 1',
    description: 'Physical printed copy of Visual English Book 1',
    price: 20,
    isActive: true,
    bookId: '1',
    inventory: 55
  },
  {
    id: 9,
    type: 'printed_book',
    name: 'Visual English Book 2',
    description: 'Physical printed copy of Visual English Book 2',
    price: 20,
    isActive: true,
    bookId: '2',
    inventory: 60
  },
  {
    id: 10,
    type: 'printed_book',
    name: 'Visual English Book 3',
    description: 'Physical printed copy of Visual English Book 3',
    price: 20,
    isActive: true,
    bookId: '3',
    inventory: 45
  },
  {
    id: 11,
    type: 'printed_book',
    name: 'Visual English Book 4',
    description: 'Physical printed copy of Visual English Book 4',
    price: 20,
    isActive: true,
    bookId: '4',
    inventory: 40
  },
  {
    id: 12,
    type: 'printed_book',
    name: 'Visual English Book 5',
    description: 'Physical printed copy of Visual English Book 5',
    price: 20,
    isActive: true,
    bookId: '5',
    inventory: 35
  },
  {
    id: 13,
    type: 'printed_book',
    name: 'Visual English Book 6',
    description: 'Physical printed copy of Visual English Book 6',
    price: 20,
    isActive: true,
    bookId: '6',
    inventory: 25
  },
  {
    id: 14,
    type: 'printed_book',
    name: 'Visual English Book 7',
    description: 'Physical printed copy of Visual English Book 7',
    price: 20,
    isActive: true,
    bookId: '7',
    inventory: 20
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
  const handleCreate = (type: 'subscription' | 'printed_book' | 'resource' | 'free_trial') => {
    const newItem: ShopItem = {
      id: Math.max(...subscriptions.map(s => s.id), ...printedBooks.map(b => b.id), ...teachingResources.map(r => r.id)) + 1,
      type,
      name: '',
      description: '',
      price: type === 'free_trial' ? 0 : 0,
      isActive: true,
      ...(type === 'subscription' ? { duration: 'monthly' } : {}),
      ...(type === 'printed_book' ? { bookId: '', inventory: 0 } : {}),
      ...(type === 'resource' ? { bookId: '' } : {}),
      ...(type === 'free_trial' ? { 
        duration: 'trial',
        trialDetails: {
          days: 7,
          downloadLimit: 3,
          unitsLimit: 1,
          requiresCreditCard: true
        }
      } : {})
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
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="subscriptions" className="flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Subscriptions
          </TabsTrigger>
          <TabsTrigger value="printed_books" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Printed Books
          </TabsTrigger>
          <TabsTrigger value="teaching_resources" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Teaching Resources
          </TabsTrigger>
        </TabsList>

        {/* Subscriptions Tab */}
        <TabsContent value="subscriptions">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {subscriptions.map((subscription) => {
              // Define subscription-specific colors
              let subscriptionColor = "#6366f1"; // Default indigo
              
              if (subscription.type === 'free_trial') {
                subscriptionColor = "#10b981"; // Green for free trial
              } else if (subscription.duration === 'yearly') {
                subscriptionColor = "#8b5cf6"; // Purple for yearly
              }
              
              return (
                <Card 
                  key={subscription.id} 
                  className={`${subscription.isActive ? "" : "border-dashed opacity-70"} overflow-hidden ${subscription.type === 'free_trial' ? "ring-2 ring-green-500" : ""}`}
                >
                  <div className="p-3 relative" style={{ backgroundColor: subscriptionColor }}>
                    {subscription.type === 'free_trial' && (
                      <div className="absolute top-0 right-0 bg-white text-green-600 font-bold text-xs px-2 py-1 rounded-bl-md">
                        FREE TRIAL
                      </div>
                    )}
                    <div className="flex justify-center items-center h-24">
                      {subscription.type === 'free_trial' ? (
                        <div className="flex flex-col items-center">
                          <CreditCard className="h-10 w-10 text-white mb-1" />
                          <span className="text-white font-bold text-sm">{subscription.trialDetails?.days} Days</span>
                        </div>
                      ) : (
                        <CreditCard className="h-12 w-12 text-white" />
                      )}
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-3">
                    <div className="text-center">
                      <CardTitle className="text-base">{subscription.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {subscription.type === 'free_trial' 
                          ? `Limited Access` 
                          : subscription.duration === 'monthly' ? 'Monthly' : 'Annual'}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 px-3 text-center">
                    {subscription.type === 'free_trial' ? (
                      <div>
                        <div className="mb-1">
                          <span className="text-xl font-bold text-green-600">€0</span>
                        </div>
                        <div className="text-xs text-gray-500 space-y-1">
                          <div>• {subscription.trialDetails?.downloadLimit} downloads max</div>
                          <div>• {subscription.trialDetails?.unitsLimit} unit access</div>
                          <div>• {subscription.trialDetails?.requiresCreditCard ? "Requires credit card" : "No credit card needed"}</div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="mb-2">
                          <span className="text-xl font-bold">€{subscription.price}</span>
                          <span className="text-sm text-gray-500 ml-1">/{subscription.duration === 'monthly' ? 'mo' : 'yr'}</span>
                        </div>
                        {subscription.discountedPrice && subscription.discountedPrice > 0 && (
                          <div className="mb-2 text-sm">
                            <Badge variant="outline" className="bg-green-50 text-green-700">
                              Save €{subscription.discountedPrice - subscription.price}
                            </Badge>
                          </div>
                        )}
                      </div>
                    )}
                    {!subscription.isActive && (
                      <Badge variant="outline" className="bg-amber-50 text-amber-700">
                        Inactive
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter className="pt-2 border-t flex justify-center space-x-2 px-3 pb-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(subscription)}
                      className="px-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      style={{ backgroundColor: subscriptionColor }}
                      onClick={() => handleEdit(subscription)}
                      className="flex-1"
                    >
                      Manage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(subscription.id)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            {/* Add subscription card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <CreditCard className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">Add Plan</h3>
              <div className="flex flex-col space-y-2">
                <Button onClick={() => handleCreate('subscription')} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Subscription
                </Button>
                <Button onClick={() => handleCreate('free_trial')} size="sm" variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  <Plus className="h-4 w-4 mr-2" />
                  Free Trial
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Printed Books Tab */}
        <TabsContent value="printed_books">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {printedBooks.map((book) => {
              // Define book-specific colors
              let bookColor = "";
              switch(book.bookId) {
                case '0a': bookColor = "#FF40FF"; break; // Pink
                case '0b': bookColor = "#FF7F27"; break; // Orange
                case '0c': bookColor = "#00CEDD"; break; // Teal
                case '1': bookColor = "#FFFF00"; break;  // Yellow
                case '2': bookColor = "#9966CC"; break;  // Purple
                case '3': bookColor = "#00CC00"; break;  // Green
                case '4': bookColor = "#5DADEC"; break;  // Blue
                case '5': bookColor = "#00CC66"; break;  // Green
                case '6': bookColor = "#FF0000"; break;  // Red
                case '7': bookColor = "#00FF00"; break;  // Bright Green
                default: bookColor = "#6b7280"; break;   // Gray
              }
              
              return (
                <Card key={book.id} className={`${book.isActive ? "" : "border-dashed opacity-70"} overflow-hidden`}>
                  <div className="p-3" style={{ backgroundColor: bookColor }}>
                    <div className="flex justify-center items-center h-24">
                      <BookOpen className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <CardHeader className="pb-2 pt-3">
                    <div className="text-center">
                      <CardTitle className="text-base">{book.name}</CardTitle>
                      <CardDescription className="text-xs">ID: {book.bookId}</CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 px-3 text-center">
                    <div className="mb-2">
                      <span className="text-xl font-bold">€{book.price}</span>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <Badge variant="outline">Stock: {book.inventory}</Badge>
                      {!book.isActive && (
                        <Badge variant="outline" className="bg-amber-50 text-amber-700">
                          Inactive
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t flex justify-center space-x-2 px-3 pb-3">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEdit(book)}
                      className="px-2"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm" 
                      style={{ backgroundColor: bookColor }}
                      onClick={() => handleEdit(book)}
                      className="flex-1"
                    >
                      Manage
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDelete(book.id)}
                      className="px-2"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
            {/* Add book card */}
            <Card className="border-dashed border-2 flex flex-col items-center justify-center p-6">
              <BookOpen className="h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2 text-center">Add Book</h3>
              <Button onClick={() => handleCreate('printed_book')} size="sm" className="mt-2">
                <Plus className="h-4 w-4 mr-2" />
                Add
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