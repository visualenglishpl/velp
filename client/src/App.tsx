import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route, useLocation } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BooksPage from "./pages/BooksPage";
import UnitsPage from "./pages/UnitsPage";
import AdminPage from "./pages/AdminPage";
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
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import DashboardBooksPage from "./pages/DashboardBooksPage";
import DashboardUnitsPage from "./pages/DashboardUnitsPage";

import CookieConsent from "./components/CookieConsent";
import AuthPageWrapper from "./pages/AuthPageWrapper";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  console.log('Rendering full home page with layout');
  
  // Get current location using wouter's useLocation hook
  const [currentPath] = useLocation();
  
  // Check if we're on an admin page
  const isAdminPage = currentPath.includes('/dashboard') || currentPath === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPage && <Navbar />}
      <main className={`flex-grow ${isAdminPage ? 'min-h-screen' : ''}`}>
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
          <ProtectedRoute path="/admin" adminOnly={true}>
            <AdminPage />
          </ProtectedRoute>
          <Route path="/auth">
            <AuthPageWrapper />
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
          <Route path="/book/:bookId">
            <SlickContentViewer />
          </Route>
          <Route path="/test-viewer">
            <SimpleViewerTest />
          </Route>
          <Route path="/simple-viewer">
            <SimpleViewerTest />
          </Route>
          
          {/* Admin/Teacher Platform Routes */}
          <Route path="/login">
            <LoginPage />
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
      
      {/* Only show Footer on non-admin pages */}
      {!isAdminPage && <Footer />}
      
      <CookieConsent />
      <Toaster />
    </div>
  );
}

export default App;