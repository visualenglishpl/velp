import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route } from "wouter";
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

import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";
import AuthPageWrapper from "./pages/AuthPageWrapper";
import ProtectedRoute from "./components/auth/ProtectedRoute";

function App() {
  console.log('Rendering full home page with layout');

  return (
    <LanguageProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
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
            <Route path="/checkout">
              <CheckoutPage />
            </Route>
            <Route path="/checkout/:planId">
              <CheckoutPage />
            </Route>
            <Route path="/collection">
              <BookCollectionPage />
            </Route>
          </Switch>
        </main>
        <Footer />
        <CookieConsent />
        <Toaster />
      </div>
    </LanguageProvider>
  );
}

export default App;