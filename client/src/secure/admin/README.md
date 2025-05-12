# Admin Components

This directory contains components that are accessible only to users with the admin role.

## Purpose

The `/secure/admin` folder contains:

- Administrative dashboards and interfaces
- Content management tools
- System configuration pages
- Analytics and reporting interfaces

## Components

- **AdminPage.tsx**: Main admin dashboard and navigation hub
- **BooksManagementPage.tsx**: Interface for managing books
- **UnitsManagementPage.tsx**: Interface for managing units within books
- **SimpleBooksAdmin.tsx**: Simplified book management interface

## Access Rules

Components in this folder:

- Require authentication via `AdminRoute` wrapper
- Are only accessible to users with `role === "admin"`
- Should include authentication validation with proper redirects
- Should implement comprehensive error handling for failed operations

## Usage

When creating new admin pages:

1. Add them to this folder
2. Register them in `App.tsx` using the `AdminRoute` component
3. Use the `useAuth` hook to access admin user information
4. Implement appropriate security checks in the component itself

```jsx
// Example route registration in App.tsx
<AdminRoute path="/admin/new-feature">
  <MyAdminComponent />
</AdminRoute>

// Example component with role check
const MyAdminComponent = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && user.role !== 'admin') {
      // Additional security check
      navigate('/books');
    }
  }, [user]);
  
  // Component implementation
}
```