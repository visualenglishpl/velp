import React, { useEffect } from 'react';
import AdminDashboard from './admin/AdminDashboard';
import { queryClient } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';

// This is a temporary test wrapper component that mocks an admin user
// to allow viewing of the AdminDashboard without login
const TestAdminDashboard = () => {
  useEffect(() => {
    // Mock the admin user data in the query cache
    const mockAdminUser = {
      id: 1,
      username: 'admin',
      role: 'admin',
      fullName: 'Administrator'
    };
    
    queryClient.setQueryData(['/api/user'], mockAdminUser);
    
    toast({
      title: 'Test Mode',
      description: 'Viewing admin dashboard in test mode with mock admin user',
    });
    
    // Clean up when component unmounts
    return () => {
      // Reset the query cache for the user
      queryClient.setQueryData(['/api/user'], null);
    };
  }, []);
  
  return <AdminDashboard />;
};

export default TestAdminDashboard;