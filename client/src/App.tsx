import { Toaster } from "./components/ui/toaster";
import React from "react";
import { Switch, Route } from "wouter";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import BooksPage from "./pages/BooksPage";
import UnitsPage from "./pages/UnitsPage";

function App() {
  console.log('Rendering full home page with layout');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/books" component={BooksPage} />
          <Route path="/books/:bookId" component={UnitsPage} />
        </Switch>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
