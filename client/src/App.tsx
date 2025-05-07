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
import SlickContentViewer from "./pages/SlickContentViewer";
import SimpleContentViewer from "./pages/SimpleContentViewer";
import CookieConsent from "./components/CookieConsent";
import { LanguageProvider } from "./contexts/LanguageContext";

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
            <Route path="/debug">
              <div className="p-8 max-w-4xl mx-auto">
                <h1 className="text-2xl font-bold mb-6">Visual English Debug Page</h1>
                <p className="mb-4">This page provides testing and diagnostic tools for development.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <a href="/simple" className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded flex flex-col">
                    <span className="font-bold">Simple Content Viewer</span>
                    <span className="text-sm mt-1">Diagnostic tool for API connectivity and image loading</span>
                  </a>
                  <a href="/simple/books/1/units/1" className="bg-green-500 hover:bg-green-600 text-white p-4 rounded flex flex-col">
                    <span className="font-bold">Test Book Content</span>
                    <span className="text-sm mt-1">Book 1, Unit 1 in simple viewer</span>
                  </a>
                  <a href="/api/healthcheck" className="bg-purple-500 hover:bg-purple-600 text-white p-4 rounded flex flex-col">
                    <span className="font-bold">API Health Check</span>
                    <span className="text-sm mt-1">Check server status JSON response</span>
                  </a>
                  <a href="/simple-test" className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 rounded flex flex-col">
                    <span className="font-bold">Simple Test Page</span>
                    <span className="text-sm mt-1">Basic HTML test page from Express</span>
                  </a>
                </div>
                <div className="mt-6">
                  <a href="/" className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded inline-block">
                    Return to Home Page
                  </a>
                </div>
              </div>
            </Route>
            <Route path="/books">
              <BooksPage />
            </Route>
            <Route path="/books/:bookId">
              <UnitsPage />
            </Route>
            <Route path="/admin">
              <AdminPage />
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
            {/* Support all URL formats for the content viewer */}
            <Route path="/book/:bookId/:unitNumber">
              <SlickContentViewer />
            </Route>
            <Route path="/book:bookId/unit:unitNumber">
              <SlickContentViewer />
            </Route>
            <Route path="/books/:bookId/units/:unitNumber">
              <SlickContentViewer />
            </Route>
            
            {/* Simple debug content viewer for testing routes */}
            <Route path="/simple">
              <SimpleContentViewer />
            </Route>
            <Route path="/simple/debug">
              <SimpleContentViewer />
            </Route>
            <Route path="/simple/book/:bookId/:unitNumber">
              <SimpleContentViewer />
            </Route>
            <Route path="/simple/book:bookId/unit:unitNumber">
              <SimpleContentViewer />
            </Route>
            <Route path="/simple/books/:bookId/units/:unitNumber">
              <SimpleContentViewer />
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