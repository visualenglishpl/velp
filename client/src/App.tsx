import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import AuthPage from "@/pages/auth-page";
import AdminDashboard from "@/pages/admin/Dashboard";
import BooksManagement from "@/pages/admin/BooksManagement";
import S3Test from "@/pages/s3-test";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/hooks/use-auth";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/auth" component={AuthPage} />
      <Route path="/admin" component={AdminDashboard} />
      <Route path="/admin/books" component={BooksManagement} />
      {/* Redirect book detail page directly to books management */}
      <Route path="/admin/books/:id">
        {() => {
          window.location.href = "/admin/books";
          return null;
        }}
      </Route>
      {/* Content viewer routes have been removed */}
      {/* S3 Testing route */}
      <Route path="/s3-test" component={S3Test} />
      {/* Redirect from old content management page to new unified books management */}
      <Route path="/admin/content">
        {() => {
          window.location.href = "/admin/books";
          return null;
        }}
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();
  const isAuthPage = location === "/auth";
  const isAdminPage = location.startsWith("/admin");
  const isMaterialViewer = location.includes("/units/");
  const showNavFooter = !isAuthPage && !isAdminPage && !isMaterialViewer;

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
