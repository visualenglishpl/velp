# Visual English Platform Reorganization Plan

## Folder Structure

```
client/src/
├── public/        # Public pages (no login required)
├── secure/        # Secure pages (login required)
└── secure/admin/  # Admin pages (admin role required)
```

## Page Mapping

### Public Pages (client/src/public/)
- Home.tsx → HomePage.tsx
- MethodPage.tsx
- AboutPage.tsx
- ContactPage.tsx
- PrivacyPage.tsx
- TermsPage.tsx
- CookiesPage.tsx
- WithdrawalPage.tsx
- DpaPage.tsx
- CartPage.tsx
- CheckoutPage.tsx
- UnitCheckoutPage.tsx
- BookWizardPage.tsx
- LoginPage.tsx

### Secure Pages (client/src/secure/)
- BooksPage.tsx
- UnitsPage.tsx
- SlickContentViewer.tsx
- SimpleViewerTest.tsx
- ViewerTestPage.tsx
- DashboardPage.tsx
- DashboardBooksPage.tsx
- DashboardUnitsPage.tsx

### Admin Pages (client/src/secure/admin/)
- AdminPage.tsx
- BooksManagementPage.tsx
- UnitsManagementPage.tsx
- SimpleBooksAdmin.tsx
- SimpleUnitsAdmin.tsx
- DevToolsPage.tsx
- TestAdminDashboard.tsx

### Legacy/Testing Pages (to be addressed later)
- SimpleNavPage.tsx
- TestPage.tsx
- StandaloneViewer.tsx
- StandaloneViewerTest.tsx
- LoginTestPage.tsx
- AdminTestPage.tsx

## Implementation Process

1. Create folder structure ✓
2. Update App.tsx routing ✓ 
3. Migrate example components for each section
4. Update all imports in migrated components
5. Test functionality of migrated components
6. Continue migration for remaining components
7. Update any affected imports across the application