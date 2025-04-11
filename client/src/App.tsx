import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/Dashboard";
import AdminBooks from "@/pages/admin/Books";
import ContentManagement from "@/pages/admin/ContentManagement";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/books" component={AdminBooks} />
      <Route path="/admin/books/:id" component={AdminBooks} />
      <Route path="/admin/content" component={ContentManagement} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAuthPage = location === "/auth";
  const isAdminPage = location.startsWith("/admin");
  const showNavFooter = !isAuthPage && !isAdminPage;

  // Debugging
  console.log("Current location:", location);
  
  return (
    <AuthProvider>
      <div className="flex flex-col min-h-screen">
        {showNavFooter && <Navbar />}
        <main className={`flex-grow ${!showNavFooter ? 'min-h-screen' : ''}`}>
          <Router />
        </main>
        {showNavFooter && <Footer />}
      </div>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
