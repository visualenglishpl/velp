# Public Components

This directory contains components that are accessible to all users without authentication.

## Purpose

The `/public` folder contains:

- Pages that anyone can view without logging in (homepage, about, login, etc.)
- Components specific to the public-facing side of the application
- Content that should be available to unauthenticated users

## Components

- **HomePage.tsx**: Landing page for the application
- **AboutPage.tsx**: Information about Visual English
- **LoginPage.tsx**: Authentication page (login/registration)

## Access Rules

Components in this folder:

- Do not require authentication
- May contain preview content with limited functionality
- Should handle redirecting authenticated users appropriately
- Should not include secure content

## Usage

When creating new public pages, add them to this folder and register them in `App.tsx` using standard `<Route>` components (not `ProtectedRoute` or `AdminRoute`).