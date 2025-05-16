/**
 * ResourceEditor Component
 * 
 * Component for adding or editing teacher resources.
 */

import { useState } from 'react';
import { TeacherResource } from '@/components/TeacherResources';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface ResourceEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (resource: TeacherResource) => Promise<void>;
  resource: TeacherResource;
  bookId: string;
  unitId: string;
}

const ResourceEditor = ({
  isOpen,
  onClose,
  onSave,
  resource,
  bookId,
  unitId
}: ResourceEditorProps) => {
  const { toast } = useToast();
  const [editedResource, setEditedResource] = useState<TeacherResource>(resource);
  const [isSaving, setIsSaving] = useState(false);
  const isNewResource = !resource.id;
  
  // Handle form input changes
  const handleChange = (field: keyof TeacherResource, value: string) => {
    setEditedResource(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!editedResource.title.trim()) {
      toast({
        title: "Missing required field",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }
    
    // For video and game types, sourceUrl is required
    if (
      (editedResource.resourceType === 'video' || editedResource.resourceType === 'game') && 
      !editedResource.sourceUrl?.trim()
    ) {
      toast({
        title: "Missing required field",
        description: "Source URL is required for videos and games",
        variant: "destructive"
      });
      return;
    }
    
    setIsSaving(true);
    
    try {
      await onSave(editedResource);
      toast({
        title: "Success",
        description: `Resource ${isNewResource ? 'created' : 'updated'} successfully`,
      });
      onClose();
    } catch (error) {
      console.error('Failed to save resource:', error);
      toast({
        title: "Failed to save resource",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>{isNewResource ? 'Add New Resource' : 'Edit Resource'}</DialogTitle>
            <DialogDescription>
              {isNewResource 
                ? `Add a new resource for Book ${bookId}, Unit ${unitId}`
                : `Edit "${resource.title}" resource`
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="resourceType" className="text-right">
                Type
              </Label>
              <Select 
                value={editedResource.resourceType} 
                onValueChange={(value) => handleChange('resourceType', value)}
              >
                <SelectTrigger id="resourceType" className="col-span-3">
                  <SelectValue placeholder="Select resource type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="lesson">Lesson Plan</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title" className="text-right">
                Title
              </Label>
              <Input
                id="title"
                value={editedResource.title}
                onChange={(e) => handleChange('title', e.target.value)}
                className="col-span-3"
                placeholder="Resource title"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="provider" className="text-right">
                Provider
              </Label>
              <Input
                id="provider"
                value={editedResource.provider || ''}
                onChange={(e) => handleChange('provider', e.target.value)}
                className="col-span-3"
                placeholder="e.g. YouTube, Wordwall"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="sourceUrl" className="text-right">
                Source URL
              </Label>
              <Input
                id="sourceUrl"
                value={editedResource.sourceUrl || ''}
                onChange={(e) => handleChange('sourceUrl', e.target.value)}
                className="col-span-3"
                placeholder="https://"
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="embedCode" className="text-right">
                Embed Code
              </Label>
              <Textarea
                id="embedCode"
                value={editedResource.embedCode || ''}
                onChange={(e) => handleChange('embedCode', e.target.value)}
                className="col-span-3"
                placeholder="Paste iframe embed code here"
                rows={4}
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Textarea
                id="description"
                value={editedResource.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="col-span-3"
                placeholder="Short description of this resource"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : isNewResource ? 'Add Resource' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResourceEditor;