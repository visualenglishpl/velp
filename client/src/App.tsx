import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/auth/ProtectedRouteWithHook";
import AdminRoute from "./components/auth/AdminRoute";
import { useAuth } from "./hooks/use-auth";

// Public pages (no login required)
// Migrated to /public folder
import HomePage from "./public/HomePage";
import AboutPage from "./public/AboutPage";
import LoginPage from "./public/LoginPage";

// Original paths - still used until migration is complete
import MethodPage from "./pages/MethodPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import WithdrawalPage from "./pages/WithdrawalPage";
import DpaPage from "./pages/DpaPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UnitCheckoutPage from "./pages/UnitCheckoutPage";
import BookWizardPage from "./pages/BookWizardPage";

// Secure pages (login required)
// Migrated to /secure folder
import BooksPage from "./secure/BooksPage";
import SlickContentViewer from "./secure/SlickContentViewer";
import UnitsPage from "./secure/UnitsPage";

// Original paths - still used until migration is complete
import SimpleViewerTest from "./pages/SimpleViewerTest";
import ViewerTestPage from "./pages/ViewerTestPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardBooksPage from "./pages/DashboardBooksPage";
import DashboardUnitsPage from "./pages/DashboardUnitsPage";

// Admin pages
// Migrated to /secure/admin folder
import SimpleBooksAdmin from "./secure/admin/SimpleBooksAdmin";
import UnitsManagementPage from "./secure/admin/UnitsManagementPage";
import AdminPage from "./secure/admin/AdminPage";
import BooksManagementPage from "./secure/admin/BooksManagementPage";

// Original paths - still used until migration is complete
import SimpleUnitsAdmin from "./pages/SimpleUnitsAdmin";
import DevToolsPage from "./pages/DevToolsPage";
import TestAdminDashboard from "./pages/TestAdminDashboard";

// Legacy/Testing pages (minimal set kept for development)
import StandaloneViewer from "./pages/StandaloneViewer";
import StandaloneViewerTest from "./pages/StandaloneViewerTest";

function App() {
  console.log('Rendering full home page with layout');
  
  // Get current location and auth status
  const [currentPath] = useLocation();
  const { user, isLoading: authLoading } = useAuth();
  
  // Check if we're on an admin dashboard page, login page, or admin page
  const isAdminDashboard = currentPath.includes('/dashboard');
  
  // Check if we should hide the main navigation
  const hideNavbar = 
    currentPath.includes('/login') || 
    currentPath.includes('/dashboard') || 
    currentPath.includes('/admin') ||
    currentPath.includes('/book-units/') ||
    currentPath.includes('/book/') ||
    currentPath.includes('/viewer') ||
    currentPath.includes('/standalone-viewer');

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${isAdminDashboard ? 'min-h-screen' : ''}`}>
        <Switch>
          {/* PUBLIC ROUTES - No authentication required */}
          <Route path="/">
            <HomePage />
          </Route>
          <Route path="/method">
            <MethodPage />
          </Route>
          <Route path="/about">
            <AboutPage />
          </Route>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/privacy">
            <PrivacyPage />
          </Route>
          <Route path="/terms">
            <TermsPage />
          </Route>
          <Route path="/cookies">
            <CookiesPage />
          </Route>
          <Route path="/withdrawal">
            <WithdrawalPage />
          </Route>
          <Route path="/dpa">
            <DpaPage />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/checkout/unit">
            <UnitCheckoutPage />
          </Route>
          <Route path="/checkout/book-wizard">
            <BookWizardPage />
          </Route>
          <Route path="/checkout/:planId">
            <CheckoutPage />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/login">
            {() => {
              // Check if user is already logged in - move this logic to the LoginPage component
              return <LoginPage />;
            }}
          </Route>

          {/* SECURE ROUTES - Authentication required */}
          <ProtectedRoute path="/books">
            <BooksPage />
          </ProtectedRoute>
          <ProtectedRoute path="/books/:bookId">
            <UnitsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/viewer">
            <SlickContentViewer />
          </ProtectedRoute>
          <ProtectedRoute path="/book/:bookId/unit/:unitNumber">
            <SlickContentViewer />
          </ProtectedRoute>
          <ProtectedRoute path="/book/:bookId">
            <SlickContentViewer />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard">
            <DashboardPage />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard/books">
            <DashboardBooksPage />
          </ProtectedRoute>
          <ProtectedRoute path="/dashboard/books/:bookId">
            <DashboardUnitsPage />
          </ProtectedRoute>

          {/* ADMIN ROUTES - Admin role required */}
          <AdminRoute path="/admin">
            <AdminPage />
          </AdminRoute>
          <AdminRoute path="/admin/books">
            <BooksManagementPage />
          </AdminRoute>
          <AdminRoute path="/book-units/:bookId">
            <UnitsManagementPage />
          </AdminRoute>
          <AdminRoute path="/simple-books-admin">
            <SimpleBooksAdmin />
          </AdminRoute>
          <AdminRoute path="/simple-units-admin">
            <SimpleUnitsAdmin />
          </AdminRoute>
          <AdminRoute path="/admin/dev/tools">
            <DevToolsPage />
          </AdminRoute>
          <AdminRoute path="/test-admin-dashboard">
            <TestAdminDashboard />
          </AdminRoute>
          
          {/* Authentication is now implemented throughout the application */}

          {/* Only keep one standalone viewer for easy content access during development */}
          <Route path="/standalone-viewer">
            <StandaloneViewer />
          </Route>
          <Route path="/standalone-viewer/:bookId">
            <StandaloneViewerTest />
          </Route>
          <Route path="/standalone-viewer/:bookId/:unitNumber">
            <StandaloneViewerTest />
          </Route>
          
          {/* FALLBACK ROUTE - Redirect to home if route not found */}
          <Route>
            <Redirect to="/" />
          </Route>
        </Switch>
      </main>
      
      {/* Hide Footer on admin pages, login page and dashboard */}
      {!hideNavbar && <Footer />}
      
      <CookieConsent />
      <Toaster />
    </div>
  );
}

export default App;