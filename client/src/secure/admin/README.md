# Admin Area Components

This directory contains components that require admin-level authentication to access.

## Pages in this directory:

- `BooksManagement.tsx` - Admin interface for managing books
- `UnitsManagement.tsx` - Admin interface for managing units
- `ShopManagement.tsx` - Admin interface for managing shop items
- Other admin-specific interfaces

All pages in this directory will be wrapped with the `ProtectedRoute` component with the `adminOnly` property set to true, requiring admin-level user authentication to access.