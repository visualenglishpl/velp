import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import BookThumbnailAdmin from '@/components/admin/BookThumbnailAdmin';
import BookSeriesAnimated from '@/components/BookSeriesAnimated';

const AdminPage = () => {
  return (
    <div className="container mx-auto py-10 px-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-8">Visual English Admin Dashboard</h1>
      
      <Tabs defaultValue="thumbnails" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="thumbnails">Book Thumbnails</TabsTrigger>
          <TabsTrigger value="preview">Animation Preview</TabsTrigger>
          <TabsTrigger value="settings">Site Settings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="thumbnails">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Book Thumbnail Management</h2>
            <p className="text-gray-600 mb-6">
              Upload and manage book cover images and animated GIFs for the books carousel and unit pages.
              Use PNG files for static cover images and GIF files for animations.
            </p>
            <BookThumbnailAdmin />
          </div>
        </TabsContent>
        
        <TabsContent value="preview">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Animation Preview</h2>
            <p className="text-gray-600 mb-6">
              Preview how the animated book showcase will appear on the website.
              You can use the controls to test different books and transitions.
            </p>
            <BookSeriesAnimated />
          </div>
        </TabsContent>
        
        <TabsContent value="settings">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Site Settings</h2>
            <p className="text-gray-600 mb-6">
              Configure global website settings including homepage layout, feature flags, and content visibility.
            </p>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <p className="text-yellow-700">
                Site settings panel is currently under development. Please check back later.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;