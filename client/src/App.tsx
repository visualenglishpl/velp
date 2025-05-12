import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route, useLocation } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BooksPage from "./pages/BooksPage";
import UnitsPage from "./pages/UnitsPage";
import AdminPage from "./pages/AdminPage";
import SimpleNavPage from "./pages/SimpleNavPage";
import TestPage from "./pages/TestPage";
import StandaloneViewer from "./pages/StandaloneViewer";
import BooksManagementPage from "./pages/BooksManagementPage";
import UnitsManagementPage from "./pages/UnitsManagementPage";
import TestAdminDashboard from "./pages/TestAdminDashboard";
import MethodPage from "./pages/MethodPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import CookiesPage from "./pages/CookiesPage";
import WithdrawalPage from "./pages/WithdrawalPage";
import DpaPage from "./pages/DpaPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import UnitCheckoutPage from "./pages/UnitCheckoutPage";
import BookCheckoutPage from "./pages/BookCheckoutPage";
import BookWizardPage from "./pages/BookWizardPage";
import SlickContentViewer from "./pages/SlickContentViewer";
import SimpleViewerTest from "./pages/SimpleViewerTest";
import ViewerTestPage from "./pages/ViewerTestPage";
import StandaloneViewerTest from "./pages/StandaloneViewerTest";
import DevToolsPage from "./pages/DevToolsPage";
import LoginPage from "./pages/LoginPage";
import LoginTestPage from "./pages/LoginTestPage";
import AdminTestPage from "./pages/AdminTestPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardBooksPage from "./pages/DashboardBooksPage";
import DashboardUnitsPage from "./pages/DashboardUnitsPage";

import CookieConsent from "./components/CookieConsent";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  console.log('Rendering full home page with layout');
  
  // Get current location using wouter's useLocation hook
  const [currentPath] = useLocation();
  
  // Check if we're on an admin dashboard page, login page, or admin page
  const isAdminDashboard = currentPath.includes('/dashboard');
  
  // Check if we should hide the main navigation
  const hideNavbar = 
    currentPath.includes('/login') || 
    currentPath.includes('/dashboard') || 
    currentPath.includes('/admin');

  return (
    <div className="flex flex-col min-h-screen">
      {!hideNavbar && <Navbar />}
      <main className={`flex-grow ${isAdminDashboard ? 'min-h-screen' : ''}`}>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/books">
            <BooksPage />
          </Route>
          <Route path="/books/:bookId">
            <UnitsPage />
          </Route>
          {/* Admin routes - No authentication required */}
          <Route path="/admin">
            <AdminPage />
          </Route>
          <Route path="/admin/books">
            <BooksManagementPage />
          </Route>
          <Route path="/book-units/:bookId">
            <UnitsManagementPage />
          </Route>
          {/* Simple navigation page without authentication requirements */}
          <Route path="/simple">
            <SimpleNavPage />
          </Route>
          <Route path="/test">
            <TestPage />
          </Route>
          <Route path="/standalone-viewer">
            <StandaloneViewer />
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
          <Route path="/checkout/book">
            {() => {
              window.location.href = "/checkout/book-wizard";
              return null;
            }}
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
          <Route path="/viewer">
            <SlickContentViewer />
          </Route>
          <Route path="/book/:bookId/unit/:unitNumber">
            <SlickContentViewer />
          </Route>
          <Route path="/book:bookId/unit:unitNumber">
            <SlickContentViewer />
          </Route>
          <Route path="/book/:bookId">
            <SlickContentViewer />
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
          
          {/* Standalone viewer that doesn't depend on auth context */}
          <Route path="/standalone-viewer">
            <StandaloneViewerTest />
          </Route>
          <Route path="/standalone-viewer/:bookId">
            <StandaloneViewerTest />
          </Route>
          <Route path="/standalone-viewer/:bookId/:unitNumber">
            <StandaloneViewerTest />
          </Route>
          
          {/* Developer Tools Page - Hidden from main navigation with a less obvious URL */}
          <Route path="/admin/dev/tools">
            <DevToolsPage />
          </Route>
          
          {/* Admin/Teacher Platform Routes */}
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/login-test">
            <LoginTestPage />
          </Route>
          <Route path="/admin-test">
            <AdminTestPage />
          </Route>
          <Route path="/test-admin-dashboard">
            <TestAdminDashboard />
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