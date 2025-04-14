import { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { queryClient } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus, Save, PackageOpen, CreditCard, Book, CheckCircle2 } from 'lucide-react';
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
    queryKey: ['/api/admin/shop-items'],
    onError: (error) => {
      toast({
        title: 'Error loading shop items',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Fetch plans for the pricing page
  const { data: pricingPlans } = useQuery<Plan[]>({
    queryKey: ['/api/plans'],
    onError: (error) => {
      toast({
        title: 'Error loading pricing plans',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    },
  });

  // Set plans when data is loaded
  useEffect(() => {
    if (pricingPlans) {
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
    onError: (error) => {
      toast({
        title: 'Error updating shop item',
        description: error instanceof Error ? error.message : 'Unknown error',
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
    onError: (error) => {
      toast({
        title: 'Error creating shop item',
        description: error instanceof Error ? error.message : 'Unknown error',
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
    onError: (error) => {
      toast({
        title: 'Error deleting shop item',
        description: error instanceof Error ? error.message : 'Unknown error',
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
    onError: (error) => {
      toast({
        title: 'Error updating pricing display',
        description: error instanceof Error ? error.message : 'Unknown error',
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

  // Filter items by type for each tab
  const subscriptions = shopItems?.filter(item => item.type === 'subscription') || [];
  const printedBooks = shopItems?.filter(item => item.type === 'printed_book') || [];

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
        <TabsList className="grid w-full grid-cols-3">
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
                subscriptions.map(subscription => (
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
                        {subscription.discountedPrice && (
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
                    printedBooks.map(book => (
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
                {plans.map((plan, planIndex) => (
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
                ))}
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => {
                  // Reset to original values
                  if (pricingPlans) {
                    setPlans([...pricingPlans]);
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
              {editItem && 'id' in editItem ? 'Edit' : 'Create'} {editItem?.type === 'subscription' ? 'Subscription' : 'Printed Book'}
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