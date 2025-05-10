import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import BooksManagementPage from './admin/BooksManagement';

/**
 * Simple Admin Test Page to verify Books Management component
 * This is a minimal page that doesn't depend on the full AdminPage structure
 */
const AdminTestPage = () => {
  const { user, logoutMutation } = useAuth();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-xl font-bold">Admin Test Page</CardTitle>
          <Button onClick={handleLogout} variant="destructive" size="sm">
            Logout
          </Button>
        </CardHeader>
        <CardContent>
          <div className="text-sm mb-4">
            <p>Current user: <span className="font-medium">{user?.username}</span></p>
            <p>Role: <span className="font-medium">{user?.role}</span></p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Books Management Component Test</CardTitle>
        </CardHeader>
        <CardContent>
          <BooksManagementPage />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminTestPage;