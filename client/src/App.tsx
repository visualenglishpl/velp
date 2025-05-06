import { Toaster } from "./components/ui/toaster";
import React from "react";
import Home from "./pages/Home";

function App() {
  console.log('Rendering home page');
  
  return (
    <>
      <Home />
      <Toaster />
    </>
  );
}

export default App;
