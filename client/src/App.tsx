import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route, useLocation, Redirect } from "wouter";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/auth/ProtectedRouteWithHook";
import AdminRoute from "./components/auth/AdminRoute";
import { SimpleAdminRoute } from "./components/auth/SimpleAdminRoute";
import { useAuth } from "./hooks/use-auth";
import ShopManagement from "./pages/admin/ShopManagement";

// Public pages (no login required)
// Migrated to /public folder
import HomePage from "./public/HomePage";
import AboutPage from "./public/AboutPage";
import LoginPage from "./public/LoginPage";
import StandaloneLoginPage from "./public/StandaloneLoginPage";
import DirectAdminLogin from "./public/DirectAdminLogin";
import BookPreviewPage from "./public/BookPreviewPage";

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
import BookSubscription from "./pages/BookSubscription";
import BookWizardPage from "./pages/BookWizardPage";
import LessonPlanPreview from "./pages/LessonPlanPreview";

// Secure pages (login required)
// Migrated to /secure folder
import BooksPage from "./secure/BooksPage";
import SlickContentViewer from "./secure/SlickContentViewer";
import SimpleContentViewer from "./secure/SimpleContentViewer";
import UnitsPage from "./secure/UnitsPage";

// Original paths - still used until migration is complete
import SimpleViewerTest from "./pages/SimpleViewerTest";
import TeacherResourceTest from "./pages/TeacherResourceTest";
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
import BooksManagement from "./secure/admin/BooksManagement";
import SiteSettingsPage from "./secure/admin/SiteSettingsPage";
import UserManagementPage from "./secure/admin/UserManagementPage";
import FlaggedQuestionsPage from "./secure/admin/FlaggedQuestionsPage";
import AnalyticsPanel from "./secure/admin/AnalyticsPanel";
import AccessRolesPage from "./secure/admin/AccessRolesPage";
import CombinedUserRolesPage from "./secure/admin/CombinedUserRolesPage";
import BroadcastMessagesPage from "./secure/admin/BroadcastMessagesPage";
import BroadcastMessagesDashboard from "./secure/admin/BroadcastMessagesDashboard";
import FeedbackViewerPage from "./secure/admin/FeedbackViewerPage";
import EnhancedFeedbackViewer from "./secure/admin/EnhancedFeedbackViewer";
import PaymentHistoryViewer from "./secure/admin/PaymentHistoryViewer";
import LanguageManagerPage from "./secure/admin/LanguageManagerPage";

// Original paths - still used until migration is complete
import SimpleUnitsAdmin from "./pages/SimpleUnitsAdmin";
import DevToolsPage from "./pages/DevToolsPage";
import TestAdminDashboard from "./pages/TestAdminDashboard";

// Legacy/Testing pages (minimal set kept for development)
import StandaloneViewer from "./pages/StandaloneViewer";
import StandaloneViewerTest from "./pages/StandaloneViewerTest";
import TeacherResourcesTest from "./pages/TeacherResourcesTest";

function App() {
  console.log('Rendering full home page with layout');
  
  // Get current location
  const [currentPath] = useLocation();
  
  // Use try/catch to safely access auth context 
  // This will prevent the app from crashing if AuthProvider is not available
  let user = null;
  let authLoading = true;
  
  try {
    const auth = useAuth();
    user = auth.user;
    authLoading = auth.isLoading;
  } catch (error) {
    console.log('Auth context not available yet, proceeding with fallback values');
    
    // Check if we have a session cookie as a fallback approach
    const hasCookie = document.cookie.includes('connect.sid=');
    if (hasCookie) {
      console.log('Session cookie detected, attempting to fetch user data directly');
      // We have a session cookie, let's try to fetch user data directly
      // This won't block the rendering but will update the UI if successful
      fetch('/api/user', { credentials: 'include' })
        .then(res => {
          if (res.ok) return res.json();
          throw new Error('Failed to fetch user');
        })
        .then(userData => {
          console.log('Successfully fetched user data via direct API call:', userData);
          // We don't update state here since we can't, but we can use this for logging
          user = userData;
          authLoading = false;
        })
        .catch(err => {
          console.log('Failed to fetch user data:', err);
        });
    }
  }
  
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
          <Route path="/preview">
            <BookPreviewPage />
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
          <Route path="/test-resources">
            <TeacherResourceTest />
          </Route>
          <Route path="/lesson-plan">
            <LessonPlanPreview />
          </Route>
          <Route path="/cart">
            <CartPage />
          </Route>
          <Route path="/checkout/unit">
            <UnitCheckoutPage />
          </Route>
          <Route path="/checkout/book">
            <BookSubscription />
          </Route>
          <Route path="/checkout/book-wizard">
            <BookWizardPage />
          </Route>
          <Route path="/checkout/free_trial">
            <CheckoutPage />
          </Route>
          <Route path="/checkout/:planId">
            <CheckoutPage />
          </Route>
          {/* This route provides a fallback for admin access when the regular login flow fails */}
          <Route path="/direct-admin">
            <DirectAdminLogin />
          </Route>
          <Route path="/checkout">
            <CheckoutPage />
          </Route>
          <Route path="/login">
            {() => {
              // Use the standalone login page that doesn't rely on React context
              return <StandaloneLoginPage />;
            }}
          </Route>
          
          {/* Keep the old login page available during testing */}
          <Route path="/login-old">
            {() => {
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
          <Route path="/viewer">
            <SimpleContentViewer />
          </Route>
          <Route path="/book/:bookId/unit/:unitNumber">
            <SimpleContentViewer />
          </Route>
          <Route path="/book/:bookId">
            <SimpleContentViewer />
          </Route>
          {/* TEST ROUTES */}
          <Route path="/teacher-resources-test">
            <TeacherResourcesTest />
          </Route>
          
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
          <SimpleAdminRoute path="/admin">
            <AdminPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/books">
            <BooksManagementPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/book-units/:bookId">
            <UnitsManagementPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/shop">
            <ShopManagement />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/settings">
            <SiteSettingsPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/user-roles">
            <CombinedUserRolesPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/flagged">
            <FlaggedQuestionsPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/analytics">
            <AnalyticsPanel />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/roles">
            <AccessRolesPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/broadcast">
            <BroadcastMessagesDashboard />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/feedback">
            <EnhancedFeedbackViewer />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/payments">
            <PaymentHistoryViewer />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/languages">
            <LanguageManagerPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/simple-books-admin">
            <SimpleBooksAdmin />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/simple-units-admin">
            <SimpleUnitsAdmin />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/admin/dev/tools">
            <DevToolsPage />
          </SimpleAdminRoute>
          <SimpleAdminRoute path="/test-admin-dashboard">
            <TestAdminDashboard />
          </SimpleAdminRoute>
          
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
          
          {/* Test routes for development */}
          <Route path="/test/teacher-resources">
            <TeacherResourcesTest />
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