import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/Dashboard";
import BooksManagement from "@/pages/admin/BooksManagement";
import ContentViewer from "@/pages/content-viewer";
import DirectContentViewer from "@/pages/direct-content-viewer";
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
  
  // If admin only and user is not admin, redirect to home
  if (adminOnly && user.role !== "admin") {
    console.log("User role:", user.role);
    console.log("Admin access required, redirecting to home");
    navigate("/");
    return null;
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
      
      {/* Admin Dashboard - Protected Admin Route */}
      <Route path="/admin">
        {() => <ProtectedRoute component={AdminDashboard} adminOnly={true} />}
      </Route>
      
      {/* Books Management - Protected Admin Route */}
      <Route path="/admin/books">
        {() => <ProtectedRoute component={BooksManagement} adminOnly={true} />}
      </Route>
      
      {/* Content Viewer for Units Database Path */}
      <Route path="/units/:unitId/materials/:materialId">
        {() => <ProtectedRoute component={ContentViewer} />}
      </Route>
      
      <Route path="/units/:unitId">
        {() => <ProtectedRoute component={ContentViewer} />}
      </Route>
      
      {/* Direct S3 Content Viewer - works with ANY book/unit path that matches S3 pattern */}
      <Route path="/:bookPath/:unitPath">
        {(params) => {
          // Only match book/unit pattern (e.g., book3/unit12)
          if (params.bookPath.startsWith('book') && params.unitPath.startsWith('unit')) {
            return <ProtectedRoute component={DirectContentViewer} />;
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
