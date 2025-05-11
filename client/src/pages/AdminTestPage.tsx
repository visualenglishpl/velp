import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import { queryClient } from '@/lib/queryClient';
import BooksManagementPage from './admin/BooksManagement';

/**
 * Simple Admin Test Page to verify Books Management component
 * This is a minimal page that doesn't depend on the full AdminPage structure
 */
const AdminTestPage = () => {
  // Set up mock admin user for testing purposes
  useEffect(() => {
    // Mock the admin user data in the query cache
    const mockAdminUser = {
      id: 1,
      username: 'admin',
      role: 'admin',
      fullName: 'Administrator'
    };
    
    queryClient.setQueryData(['/api/user'], mockAdminUser);
    
    // Clean up when component unmounts
    return () => {
      // Keep the mock user (don't reset) for consistent experience
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Books Management</CardTitle>
          <div className="flex gap-2">
            <Link href="/books">
              <Button variant="outline" size="sm">
                View Books
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                Back to Admin
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-4">
            <p>This page allows you to manage books and view their content.</p>
            <p className="text-gray-500 mt-1">Click on "View Books" to see the full book list and access content viewer.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Books List</CardTitle>
        </CardHeader>
        <CardContent>
          <BooksManagementPage />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestPage;