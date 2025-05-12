# Visual English Platform Frontend Architecture

## Directory Structure

The application follows a role-based folder structure to organize components based on their accessibility requirements:

```
client/src/
├── public/         # Publicly accessible pages (no auth required)
├── secure/         # Protected pages (authentication required)
│   └── admin/      # Admin-only pages (admin role required)
├── components/     # Shared UI components
│   ├── auth/       # Authentication components
│   ├── ui/         # UI library components
│   └── ...         # Other component categories
├── hooks/          # Custom React hooks
├── contexts/       # React context providers
├── lib/            # Utility functions and services
└── pages/          # Legacy pages (being migrated)
```

## Authentication Structure

The application implements role-based access control:

1. **Public Routes**: No authentication required
   - Home page, about page, login page, etc.
   - Available to all visitors

2. **Secure Routes**: Authentication required
   - Protected with `<ProtectedRoute>` component
   - Requires valid user session
   - Accessible to all authenticated users regardless of role

3. **Admin Routes**: Admin role required
   - Protected with `<AdminRoute>` component
   - Requires valid user session AND admin role
   - Accessible only to users with `role === "admin"`

## Authentication Utilities

- **useAuth Hook**: Provides authentication state and methods
  - `user`: The authenticated user object (or null)
  - `isLoading`: Loading state for auth check
  - `error`: Any authentication errors
  - `loginMutation`: Function to log in a user
  - `registerMutation`: Function to register a new user
  - `logoutMutation`: Function to log out a user

- **Route Protection Components**:
  - `ProtectedRoute`: Secures routes for authenticated users
  - `AdminRoute`: Secures routes for admin users

## Component Migration Guide

When migrating components to the new structure:

1. Move the component to the appropriate folder based on access requirements
2. Update imports in the component
3. Update the import in App.tsx
4. Update the route in App.tsx to use the appropriate wrapper component
5. Test the component in different authentication states

## Design Principles

- **Separation of Concerns**: Components are organized by access level
- **DRY (Don't Repeat Yourself)**: Common functionality is extracted to shared hooks and components
- **Progressive Disclosure**: UI complexity increases with user privileges
- **Defensive Programming**: Each component verifies access rights independently