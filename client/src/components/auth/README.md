# Authentication Components

This directory contains components related to authentication and authorization in the application.

## Purpose

The `/components/auth` folder contains:

- Route protection components for controlling access
- Authentication-related UI components
- Authorization helpers and utilities

## Components

- **ProtectedRouteWithHook.tsx**: Route wrapper that requires authentication
- **AdminRoute.tsx**: Route wrapper that requires admin role
- **ProtectedRoute.tsx** (legacy): Original protected route implementation

## Usage Guidelines

### Using ProtectedRoute

`ProtectedRoute` is a wrapper for routes that should only be accessible to authenticated users:

```jsx
<ProtectedRoute path="/secure-page">
  <MySecureComponent />
</ProtectedRoute>
```

This will:
- Check if the user is authenticated
- Show a loading state during authentication check
- Redirect to the login page if the user is not authenticated
- Render the children components if the user is authenticated

### Using AdminRoute

`AdminRoute` is specifically for routes that should only be accessible to administrators:

```jsx
<AdminRoute path="/admin-only">
  <AdminComponent />
</AdminRoute>
```

This will:
- Check if the user is authenticated
- Check if the authenticated user has the admin role
- Redirect to appropriate pages for unauthenticated users or non-admin users

## Authentication Flow

The authentication flow in the application uses:

1. `useAuth` hook for accessing authentication state and mutations
2. Session-based authentication with server validation
3. Role-based access control (admin, teacher, school roles)
4. Redirect logic for unauthorized access attempts

When building new authenticated routes:
- Use `ProtectedRoute` for general authenticated content
- Use `AdminRoute` for admin-only content
- Add appropriate data fetching and error handling inside components