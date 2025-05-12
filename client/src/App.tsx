import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/auth/ProtectedRoute";
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

// Original paths - still used until migration is complete
import UnitsPage from "./pages/UnitsPage";
import SimpleViewerTest from "./pages/SimpleViewerTest";
import ViewerTestPage from "./pages/ViewerTestPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardBooksPage from "./pages/DashboardBooksPage";
import DashboardUnitsPage from "./pages/DashboardUnitsPage";

// Admin pages
// Migrated to /secure/admin folder
import SimpleBooksAdmin from "./secure/admin/SimpleBooksAdmin";
import UnitsManagementPage from "./secure/admin/UnitsManagementPage";

// Original paths - still used until migration is complete
import AdminPage from "./pages/AdminPage";
import BooksManagementPage from "./pages/BooksManagementPage";
import SimpleUnitsAdmin from "./pages/SimpleUnitsAdmin";
import DevToolsPage from "./pages/DevToolsPage";
import TestAdminDashboard from "./pages/TestAdminDashboard";

// Legacy/Testing pages (will be moved or removed later)
import SimpleNavPage from "./pages/SimpleNavPage";
import TestPage from "./pages/TestPage";
import StandaloneViewer from "./pages/StandaloneViewer";
import StandaloneViewerTest from "./pages/StandaloneViewerTest";
import LoginTestPage from "./pages/LoginTestPage";
import AdminTestPage from "./pages/AdminTestPage";

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
          {/* Temporarily disable authentication for development */}
          <Route path="/books">
            <BooksPage />
          </Route>
          <Route path="/books/:bookId">
            <UnitsPage />
          </Route>
          <Route path="/viewer">
            <SlickContentViewer />
          </Route>
          <Route path="/book/:bookId/unit/:unitNumber">
            <SlickContentViewer />
          </Route>
          <Route path="/book/:bookId">
            <SlickContentViewer />
          </Route>
          <Route path="/dashboard">
            <DashboardPage />
          </Route>
          <Route path="/dashboard/books">
            <DashboardBooksPage />
          </Route>
          <Route path="/dashboard/books/:bookId">
            <DashboardUnitsPage />
          </Route>

          {/* ADMIN ROUTES - Admin role required */}
          {/* Temporarily disable authentication for development */}
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/admin/books">
            <BooksManagementPage />
          </Route>
          <Route path="/book-units/:bookId">
            <UnitsManagementPage />
          </Route>
          <Route path="/simple-books-admin">
            <SimpleBooksAdmin />
          </Route>
          <Route path="/simple-units-admin">
            <SimpleUnitsAdmin />
          </Route>
          <Route path="/admin/dev/tools">
            <DevToolsPage />
          </Route>
          <Route path="/test-admin-dashboard">
            <TestAdminDashboard />
          </Route>
          
          {/* AUTHENTICATION IMPLEMENTATION - To be enabled after migration is complete */}
          {/*
          // SECURE ROUTES
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

          // ADMIN ROUTES
          <ProtectedRoute path="/admin" adminOnly>
            <AdminPage />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/books" adminOnly>
            <BooksManagementPage />
          </ProtectedRoute>
          <ProtectedRoute path="/book-units/:bookId" adminOnly>
            <UnitsManagementPage />
          </ProtectedRoute>
          <ProtectedRoute path="/simple-books-admin" adminOnly>
            <SimpleBooksAdmin />
          </ProtectedRoute>
          <ProtectedRoute path="/simple-units-admin" adminOnly>
            <SimpleUnitsAdmin />
          </ProtectedRoute>
          <ProtectedRoute path="/admin/dev/tools" adminOnly>
            <DevToolsPage />
          </ProtectedRoute>
          <ProtectedRoute path="/test-admin-dashboard" adminOnly>
            <TestAdminDashboard />
          </ProtectedRoute>
          */}

          {/* LEGACY/TESTING ROUTES - Will be reorganized later */}
          <Route path="/simple">
            <SimpleNavPage />
          </Route>
          <Route path="/test">
            <TestPage />
          </Route>
          <Route path="/standalone-viewer">
            <StandaloneViewer />
          </Route>
          <Route path="/test-viewer">
            <SimpleViewerTest />
          </Route>
          <Route path="/simple-viewer">
            <SimpleViewerTest />
          </Route>
          <Route path="/viewer-test">
            <ViewerTestPage />
          </Route>
          <Route path="/viewer-test/:bookId/:unitNumber">
            <ViewerTestPage />
          </Route>
          <Route path="/standalone-viewer/:bookId">
            <StandaloneViewerTest />
          </Route>
          <Route path="/standalone-viewer/:bookId/:unitNumber">
            <StandaloneViewerTest />
          </Route>
          <Route path="/login-test">
            <LoginTestPage />
          </Route>
          <Route path="/admin-test">
            <AdminTestPage />
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