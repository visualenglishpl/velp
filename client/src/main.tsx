import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import App from "./App";
import "./index.css";

// Create root
const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);

// Render app with providers
root.render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
