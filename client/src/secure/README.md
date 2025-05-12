# Secure Components

This directory contains components that require authentication to access.

## Purpose

The `/secure` folder contains:

- Pages that require a user to be logged in (books, units, content viewer, etc.)
- Components specific to authenticated users
- Content that should be protected behind authentication

## Components

- **BooksPage.tsx**: Displays all available books
- **UnitsPage.tsx**: Displays units for a selected book
- **SlickContentViewer.tsx**: Main content display component for educational materials

## Access Rules

Components in this folder:

- Require authentication via `ProtectedRoute` wrapper
- Are accessible to all authenticated users regardless of role
- May have additional subscription-based access limitations
- Should include proper loading and error states for authentication checks

## Usage

When creating new secure pages:

1. Add them to this folder
2. Register them in `App.tsx` using the `ProtectedRoute` component
3. Use the `useAuth` hook to access the authenticated user's information
4. Make sure to handle loading and error states appropriately

```jsx
// Example route registration in App.tsx
<ProtectedRoute path="/secure-path">
  <MySecureComponent />
</ProtectedRoute>
```