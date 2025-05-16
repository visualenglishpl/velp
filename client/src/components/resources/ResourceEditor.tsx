/**
 * ResourceEditor Component
 * 
 * This component provides a form for editing teacher resources.
 * It supports various resource types and provides specialized inputs
 * for different content types.
 */

import { useState } from 'react';
import { TeacherResource, ResourceType } from '@/types/resources';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Save, X, FileText, Youtube, Gamepad2, BookOpen } from 'lucide-react';
import { 
  extractYoutubeVideoId, 
  extractWordwallGameId, 
  extractIslCollectiveId,
  detectEmbedType 
} from '@/lib/embedUtils';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { v4 as uuidv4 } from 'uuid';

interface ResourceEditorProps {
  resource: TeacherResource | null;
  onSave: (resource: TeacherResource) => void;
  onCancel: () => void;
  bookId: string;
  unitId: string;
}

export function ResourceEditor({
  resource,
  onSave,
  onCancel,
  bookId,
  unitId
}: ResourceEditorProps) {
  // Initialize form with provided resource or default values
  const [formData, setFormData] = useState<TeacherResource>(
    resource || {
      id: uuidv4(),
      title: '',
      description: '',
      resourceType: 'video',
      bookId,
      unitId
    }
  );
  
  const [saving, setSaving] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>(
    (resource?.isYoutubeVideo && resource.youtubeVideoId) 
      ? `https://www.youtube.com/watch?v=${resource.youtubeVideoId}`
      : (resource?.isWordwallGame && resource.wordwallGameId)
      ? `https://wordwall.net/resource/${resource.wordwallGameId}`
      : resource?.sourceUrl || ''
  );
  
  const [activeTab, setActiveTab] = useState<string>(
    resource?.resourceType || 'video'
  );

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle resource type change
  const handleTypeChange = (value: string) => {
    setFormData(prev => ({ 
      ...prev, 
      resourceType: value as ResourceType 
    }));
    setActiveTab(value);
  };

  // Handle URL input changes with automatic detection
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setUrlInput(url);
    
    // Detect resource type from URL
    const embedType = detectEmbedType(url);
    
    // Extract IDs from URL
    const youtubeId = extractYoutubeVideoId(url);
    const wordwallId = extractWordwallGameId(url);
    const islCollectiveId = extractIslCollectiveId(url);
    
    // Update form data based on detected type
    const updates: Partial<TeacherResource> = {
      sourceUrl: url,
      isYoutubeVideo: embedType === 'youtube',
      youtubeVideoId: youtubeId || undefined,
      isWordwallGame: embedType === 'wordwall',
      wordwallGameId: wordwallId || undefined,
      isIslCollectiveResource: embedType === 'islcollective',
      islCollectiveId: islCollectiveId || undefined,
    };
    
    // Update resource type if detected
    if (embedType === 'youtube' || embedType === 'wordwall' || embedType === 'islcollective') {
      updates.resourceType = embedType === 'youtube' ? 'video' : 
                             embedType === 'wordwall' ? 'game' : 'other';
      setActiveTab(updates.resourceType);
    }
    
    setFormData(prev => ({ ...prev, ...updates }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      // Ensure IDs are set
      const finalResource: TeacherResource = {
        ...formData,
        id: formData.id || uuidv4(),
      };
      
      onSave(finalResource);
    } catch (error) {
      console.error('Error saving resource:', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>{resource ? 'Edit Resource' : 'Add New Resource'}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onCancel}>
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Basic Information */}
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="resourceType">Resource Type</Label>
                <Select 
                  value={formData.resourceType} 
                  onValueChange={handleTypeChange}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">
                      <div className="flex items-center">
                        <Youtube className="h-4 w-4 mr-2 text-red-500" />
                        Video
                      </div>
                    </SelectItem>
                    <SelectItem value="game">
                      <div className="flex items-center">
                        <Gamepad2 className="h-4 w-4 mr-2 text-green-500" />
                        Game
                      </div>
                    </SelectItem>
                    <SelectItem value="pdf">
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-blue-500" />
                        PDF Document
                      </div>
                    </SelectItem>
                    <SelectItem value="lesson">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-amber-500" />
                        Lesson Plan
                      </div>
                    </SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description || ''}
                onChange={handleChange}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="provider">Provider</Label>
              <Input
                id="provider"
                name="provider"
                value={formData.provider || ''}
                onChange={handleChange}
                placeholder="e.g., YouTube, Wordwall, ISL Collective"
              />
            </div>
          </div>
          
          {/* Resource-specific inputs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="game">Game</TabsTrigger>
              <TabsTrigger value="pdf">PDF</TabsTrigger>
              <TabsTrigger value="lesson">Lesson</TabsTrigger>
            </TabsList>
            
            {/* Video Tab */}
            <TabsContent value="video" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">Video URL</Label>
                <Input
                  id="videoUrl"
                  value={urlInput}
                  onChange={handleUrlChange}
                  placeholder="https://www.youtube.com/watch?v=..."
                />
                
                {formData.isYoutubeVideo && formData.youtubeVideoId && (
                  <Alert className="mt-2">
                    <AlertDescription>
                      YouTube video ID detected: <strong>{formData.youtubeVideoId}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="embedCode">Embed Code (optional)</Label>
                <Textarea
                  id="embedCode"
                  name="embedCode"
                  value={formData.embedCode || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="<iframe src=... />"
                />
              </div>
            </TabsContent>
            
            {/* Game Tab */}
            <TabsContent value="game" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="gameUrl">Game URL</Label>
                <Input
                  id="gameUrl"
                  value={urlInput}
                  onChange={handleUrlChange}
                  placeholder="https://wordwall.net/resource/..."
                />
                
                {formData.isWordwallGame && formData.wordwallGameId && (
                  <Alert className="mt-2">
                    <AlertDescription>
                      Wordwall game ID detected: <strong>{formData.wordwallGameId}</strong>
                    </AlertDescription>
                  </Alert>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="embedCode">Embed Code (optional)</Label>
                <Textarea
                  id="embedCode"
                  name="embedCode"
                  value={formData.embedCode || ''}
                  onChange={handleChange}
                  rows={3}
                  placeholder="<iframe src=... />"
                />
              </div>
            </TabsContent>
            
            {/* PDF Tab */}
            <TabsContent value="pdf" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="pdfUrl">PDF URL</Label>
                <Input
                  id="pdfUrl"
                  name="pdfUrl"
                  value={formData.pdfUrl || ''}
                  onChange={handleChange}
                  placeholder="https://example.com/document.pdf"
                />
              </div>
            </TabsContent>
            
            {/* Lesson Tab */}
            <TabsContent value="lesson" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="content">Lesson Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  rows={10}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Resource
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}