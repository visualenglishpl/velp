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

function App() {
  console.log('Rendering full home page with layout');

  return (
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
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;