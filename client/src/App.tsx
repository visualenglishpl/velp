import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/Dashboard";
import BooksManagement from "@/pages/admin/BooksManagement";
import ShopManagement from "@/pages/admin/ShopManagement";
import ContentOrganizer from "@/pages/admin/ContentOrganizer";
import SlickContentViewer from "@/pages/SlickContentViewer";
import CheckoutPage from "@/pages/checkout";
import PrintedBookCheckout from "@/pages/PrintedBookCheckout";
import BooksPage from "@/pages/BooksPage";
import UnitsPage from "@/pages/UnitsPage";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";

// Protected Route Component - redirects to login if not authenticated
function ProtectedRoute({ component: Component, adminOnly = false }: { component: React.ComponentType, adminOnly?: boolean }) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // If loading, show nothing yet
  if (isLoading) return null;
  
  // If not logged in, redirect to auth page
  if (!user) {
    console.log("User not authenticated, redirecting to login");
    navigate("/auth");
    return null;
  }
  
  // Handle admin role for content management
  console.log("User role:", user.role);
  const isAdmin = user.role === "admin";
  
  // For admin-only routes, ensure the user is an admin
  if (adminOnly && !isAdmin) {
    console.log("Non-admin user trying to access admin-only area");
    navigate("/");
    return null;
  }
  
  // For admin users, set a cookie to prevent content blurring
  if (isAdmin) {
    console.log("Setting admin cookies for content management");
    document.cookie = "isContentManager=true; path=/";
    document.cookie = "role=admin; path=/";
    
    // Also modify user role directly for component access
    if (adminOnly) {
      user.role = "admin"; // Ensure admin access to content management features
    }
  }
  
  // User is authenticated (and has admin role if required)
  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/checkout/printed_book" component={PrintedBookCheckout} />
      <Route path="/checkout/:planId?" component={CheckoutPage} />
      
      {/* Books Catalog Page */}
      <Route path="/books" component={BooksPage} />
      
      {/* Direct Book Path - Redirect to Units Page */}
      <Route path="/book:bookId">
        {(params) => {
          // Only match direct book paths (e.g., /book4)
          if (!params.bookId.includes('/')) {
            console.log("Navigating to book units:", params.bookId);
            return <UnitsPage />;
          }
          return <NotFound />;
        }}
      </Route>
      
      {/* Legacy book path format support */}
      <Route path="/:bookPath">
        {(params) => {
          // Check if path is a book identifier (book1, book2, etc.)
          if (params.bookPath.match(/^book\d+[a-c]?$/i)) {
            console.log("Legacy book path detected:", params.bookPath);
            return <UnitsPage />;
          }
          // Not a book path, continue to next route
          return null;
        }}
      </Route>
      
      {/* Units Page for a Book */}
      <Route path="/book/:bookId/units" component={UnitsPage} />
      
      {/* Admin Dashboard - Protected Admin Route */}
      <Route path="/admin">
        {() => {
          console.log("Admin dashboard route rendering");
          const { user } = useAuth();
          console.log("Admin route, user:", user);
          
          if (user && user.role === "admin") {
            return <AdminDashboard />;
          }
          
          // Manually navigate if not admin
          const [, navigate] = useLocation();
          // Use window.location to redirect instead of useEffect
          setTimeout(() => navigate("/auth"), 0);
          return null;
        }}
      </Route>
      
      {/* Books Management - Protected Admin Route */}
      <Route path="/admin/books">
        {() => <ProtectedRoute component={BooksManagement} adminOnly={true} />}
      </Route>
      
      {/* Shop Management - Protected Admin Route */}
      <Route path="/admin/shop">
        {() => <ProtectedRoute component={ShopManagement} adminOnly={true} />}
      </Route>
      
      {/* Content Organizer - Protected Admin Route */}
      <Route path="/admin/content-organizer">
        {() => <ProtectedRoute component={ContentOrganizer} adminOnly={true} />}
      </Route>
      
      {/* Content Viewer Routes */}
      <Route path="/book:bookId/unit:unitNumber">
        {() => <ProtectedRoute component={SlickContentViewer} />}
      </Route>
      
      {/* Fallback for any other book/unit pattern */}
      <Route path="/:bookPath/:unitPath">
        {(params) => {
          // Only match book/unit pattern (e.g., book3/unit12)
          if (params.bookPath.startsWith('book') && params.unitPath.startsWith('unit')) {
            return <ProtectedRoute component={SlickContentViewer} />;
          }
          return <NotFound />;
        }}
      </Route>
      
      {/* Fallback for any other routes */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAuthPage = location === "/auth";
  const isAdminPage = location.startsWith("/admin");
  
  // Check if we're in any content viewer (with database IDs or direct paths)
  const isContentViewer = location.startsWith("/units/") || 
                         location.startsWith("/book") || 
                         (location.includes("/") && location.split("/").length > 2);
  
  const showNavFooter = !isAuthPage && !isAdminPage && !isContentViewer;

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
