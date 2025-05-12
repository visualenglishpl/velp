# Secure Area Components

This directory contains components that require authentication to access.

## Pages in this directory:

- `SlickContentViewer.tsx` - Main content viewing interface
- `BooksPage.tsx` - Book selection interface
- `UnitsPage.tsx` - Unit selection for a specific book
- Other authenticated user content

All pages in this directory will be wrapped with the `ProtectedRoute` component, requiring valid user authentication to access.