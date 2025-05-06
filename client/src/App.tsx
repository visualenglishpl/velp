import { Toaster } from "./components/ui/toaster";
import React from "react";
import Home from "./pages/Home";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  console.log('Rendering full home page with layout');
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Home />
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
