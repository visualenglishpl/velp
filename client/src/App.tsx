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

function App() {
  console.log('Rendering full home page with layout');

  return (
    <div className="flex flex-col min-h-screen">
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
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;