import { useEffect } from 'react';
import { useLocation } from 'wouter';

// This is a redirect wrapper that points to the secure/admin implementation
export default function AccessRolesPageRedirect() {
  const [, setLocation] = useLocation();
  
  useEffect(() => {
    // Redirect to the secure implementation
    setLocation('/admin/roles');
  }, [setLocation]);
  
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      <p className="ml-3 text-gray-500">Redirecting to Access Roles Management...</p>
    </div>
  );
}