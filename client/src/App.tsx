import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
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
import LessonPlansPage from "@/pages/LessonPlansPage";
import FlaggedQuestions from "@/pages/admin/FlaggedQuestions";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/use-auth";
import { useAuth } from "@/hooks/use-auth";

// Protected Route Component - redirects to login if authentication is required
function ProtectedRoute({ component: Component, adminOnly = false, requireAuth = true }: { 
  component: React.ComponentType, 
  adminOnly?: boolean,
  requireAuth?: boolean
}) {
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  
  // If loading, show nothing yet
  if (isLoading) return null;
  
  // If authentication is required and user is not logged in, redirect to auth page
  if (requireAuth && !user) {
    console.log("User not authenticated, redirecting to login");
    navigate("/auth");
    return null;
  }
  
  // Allow non-authenticated users to access non-admin routes if requireAuth is false
  // This is for our content viewer to allow browsing with premium content blurring
  if (!requireAuth && !user) {
    console.log("Non-authenticated user accessing public content");
    return <Component />;
  }
  
  // For authenticated users, handle admin role checks
  if (user) {
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
  }
  
  // User is authenticated if required (and has admin role if required)
  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path="/">
        {() => {
          const { user, isLoading } = useAuth();
          if (isLoading) return null;
          if (user && user.role === "admin") {
            console.log("Admin user detected on homepage, redirecting to admin dashboard");
            window.location.href = "/admin";
            return null;
          }
          return <Home />;
        }}
      </Route>
      <Route path="/auth" component={AuthPage} />
      <Route path="/checkout/printed_book" component={PrintedBookCheckout} />
      <Route path="/checkout/:planId?" component={CheckoutPage} />
      
      {/* Books Catalog Page */}
      <Route path="/books" component={BooksPage} />
      
      {/* Units Page for a Book */}
      <Route path="/book/:bookId/units">
        {(params) => <UnitsPage bookIdParam={params.bookId} />}
      </Route>
      
      {/* Admin Dashboard - Protected Admin Route */}
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminDashboard} adminOnly={true} />}
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
      
      {/* Flagged Questions - Protected Admin Route */}
      <Route path="/admin/flagged-questions">
        {() => <ProtectedRoute component={FlaggedQuestions} adminOnly={true} />}
      </Route>
      
      {/* Content Viewer Routes - Allow public access with premium content controls */}
      <Route path="/book/:bookId/:unitId">
        {(params) => {
          console.log(`Book/unit content viewer for: /book/${params.bookId}/${params.unitId}`);
          // The SlickContentViewer extracts params from the URL directly
          return <ProtectedRoute component={SlickContentViewer} requireAuth={false} />;
        }}
      </Route>
      
      {/* Direct book route (e.g., /book4) - redirects to the units page */}
      <Route path="/book/:bookId">
        {(params) => {
          const bookId = params.bookId;
          console.log(`Direct book route handler for bookId: ${bookId}`);
          
          // Handle both numeric IDs and full paths like "book3"
          const processedBookId = bookId.startsWith('book') ? bookId : `book${bookId}`;
          console.log(`Processed book ID: ${processedBookId}`);
          
          // Allow non-authenticated users to view the units page
          return <UnitsPage bookIdParam={processedBookId} />;
        }}
      </Route>
      
      {/* Support for books/id/units/id/content pattern */}
      <Route path="/books/:bookId/units/:unitId/content">
        {(params) => {
          // Redirect to our standard book/unit format
          const bookPath = `book${params.bookId}`;
          const unitPath = `unit${params.unitId}`;
          console.log(`Redirecting from books pattern to: ${bookPath}/${unitPath}`);
          window.location.href = `/${bookPath}/${unitPath}`;
          return null;
        }}
      </Route>
      
      {/* Support for books/bookId/unitId pattern */}
      <Route path="/books/:bookPath/:unitPath">
        {(params) => {
          let bookId, unitId;
          
          // Handle both formats: book7/unit6 or just 7/6
          if (params.bookPath.startsWith('book')) {
            bookId = params.bookPath;
          } else {
            bookId = `book${params.bookPath}`;
          }
          
          if (params.unitPath.startsWith('unit')) {
            unitId = params.unitPath;
          } else {
            unitId = `unit${params.unitPath}`;
          }
          
          console.log(`Redirecting from books pattern to: ${bookId}/${unitId}`);
          window.location.href = `/${bookId}/${unitId}`;
          return null;
        }}
      </Route>
      
      {/* Lesson Plans Page */}
      <Route path="/lesson-plans">
        {() => <ProtectedRoute component={LessonPlansPage} requireAuth={false} />}
      </Route>

      {/* Test PDF Viewer */}
      <Route path="/pdf-test" component={() => {
        const PDFViewerTest = () => {
          // Import PDFViewer dynamically to avoid cyclic dependencies
          const PDFViewer = require("@/components/PDFViewer").default;
          return (
            <div className="container mx-auto p-4">
              <h1 className="text-2xl font-bold mb-4">PDF Viewer Test</h1>
              <div className="flex justify-center">
                <PDFViewer 
                  pdfUrl="/test/sample.pdf" 
                  title="Sample PDF Document"
                />
              </div>
            </div>
          );
        };
        return <PDFViewerTest />;
      }} />
      
      {/* Book-specific Lesson Plans */}
      <Route path="/book/:bookId/unit/:unitId/lesson-plans">
        {() => <ProtectedRoute component={LessonPlansPage} requireAuth={false} />}
      </Route>
      
      {/* Fallback for any other book/unit pattern - Allow public access with premium content controls */}
      <Route path="/:bookPath/:unitPath">
        {(params) => {
          // Only match book/unit pattern (e.g., book3/unit12)
          if (params.bookPath.startsWith('book') && params.unitPath.startsWith('unit')) {
            return <ProtectedRoute component={SlickContentViewer} requireAuth={false} />;
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
