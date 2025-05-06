import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/hooks/use-toast';

const BookThumbnailAdmin = () => {
  const [selectedBook, setSelectedBook] = useState('1');
  const [loading, setLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState('upload');
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const bookOptions = [
    { id: '0a', title: 'Book 0A - To The Moon' },
    { id: '0b', title: 'Book 0B - Barn In The Farm' },
    { id: '0c', title: 'Book 0C - At The Farm' },
    { id: '1', title: 'Book 1 - Vegetables' },
    { id: '2', title: 'Book 2 - Sports' },
    { id: '3', title: 'Book 3 - Bugs' },
    { id: '4', title: 'Book 4 - At The Circus' },
    { id: '5', title: 'Book 5 - Movie Time' },
    { id: '6', title: 'Book 6 - Fashion Accessories' },
    { id: '7', title: 'Book 7 - Social Problems' },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if it's a GIF for the animated tab
    if (currentTab === 'animated' && file.type !== 'image/gif') {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a GIF file for animations',
        variant: 'destructive'
      });
      return;
    }

    // Create preview
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };

  const uploadFile = async () => {
    if (!fileInputRef.current?.files?.length) {
      toast({
        title: 'No file selected',
        description: 'Please select a file to upload',
        variant: 'destructive'
      });
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    
    try {
      // Determine the endpoint based on the current tab
      const endpoint = currentTab === 'animated' 
        ? `/api/admin/upload/book/${selectedBook}/animated`
        : `/api/admin/upload/book/${selectedBook}/cover`;
        
      const response = await fetch(endpoint, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      toast({
        title: 'Upload successful',
        description: `${currentTab === 'animated' ? 'Animated GIF' : 'Cover image'} has been updated for Book ${selectedBook}`,
      });

      // Clear the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreviewUrl(null);
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'An unknown error occurred',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  const viewCurrentImage = () => {
    const url = currentTab === 'animated'
      ? `/api/content/book${selectedBook}/animated.gif`
      : `/api/content/book${selectedBook}/cover.png`;
    
    window.open(url, '_blank');
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Book Thumbnail Administration</CardTitle>
        <CardDescription>
          Upload and manage book cover images and animated GIFs for the Visual English platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/3">
              <label className="text-sm font-medium">Select Book</label>
              <Select value={selectedBook} onValueChange={setSelectedBook}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a book" />
                </SelectTrigger>
                <SelectContent>
                  {bookOptions.map(book => (
                    <SelectItem key={book.id} value={book.id}>{book.title}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="w-full md:w-2/3">
              <Tabs value={currentTab} onValueChange={setCurrentTab}>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Image Type</label>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={viewCurrentImage}
                  >
                    View Current Image
                  </Button>
                </div>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="upload">Cover Image</TabsTrigger>
                  <TabsTrigger value="animated">Animated GIF</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Upload a static cover image for the book (PNG or JPG recommended).
                  </p>
                </TabsContent>
                <TabsContent value="animated" className="mt-4">
                  <p className="text-sm text-gray-500 mb-2">
                    Upload an animated GIF showing book content (max 2MB recommended).
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium">
                {currentTab === 'animated' ? 'Select Animated GIF' : 'Select Cover Image'}
              </label>
              <Input 
                type="file" 
                ref={fileInputRef}
                onChange={handleFileChange}
                accept={currentTab === 'animated' ? 'image/gif' : 'image/*'}
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">
                {currentTab === 'animated' 
                  ? 'Only GIF files are supported for animations.' 
                  : 'PNG or JPG recommended for cover images.'}
              </p>
            </div>
            
            <div>
              <label className="text-sm font-medium">Preview</label>
              <div className="border rounded-lg flex items-center justify-center h-[200px] bg-gray-50 overflow-hidden">
                {previewUrl ? (
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="max-h-full max-w-full object-contain" 
                  />
                ) : (
                  <p className="text-gray-400">No file selected</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button 
          variant="outline" 
          onClick={() => {
            setPreviewUrl(null);
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
        >
          Reset
        </Button>
        <Button 
          onClick={uploadFile} 
          disabled={loading || !previewUrl}
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BookThumbnailAdmin;