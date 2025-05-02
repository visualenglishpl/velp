import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { Suspense } from "react";
import { useQuery } from "@tanstack/react-query";
import { lazy } from 'react';
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const AuthPage = lazy(() => import("@/pages/auth-page"));
const AdminDashboard = lazy(() => import("@/pages/admin/Dashboard"));
const BooksManagement = lazy(() => import("@/pages/admin/BooksManagement"));
const ShopManagement = lazy(() => import("@/pages/admin/ShopManagement"));
const ContentOrganizer = lazy(() => import("@/pages/admin/ContentOrganizer"));
const SlickContentViewer = lazy(() => import("@/pages/SlickContentViewer"));
const CheckoutPage = lazy(() => import("@/pages/checkout"));
const PrintedBookCheckout = lazy(() => import("@/pages/PrintedBookCheckout"));
const BooksPage = lazy(() => import("@/pages/BooksPage"));
const UnitsPage = lazy(() => import("@/pages/UnitsPage"));
const LessonPlansPage = lazy(() => import("@/pages/LessonPlansPage"));
const FlaggedQuestions = lazy(() => import("@/pages/admin/FlaggedQuestions"));
const TestTeacherResources = lazy(() => import("@/pages/TestTeacherResources"));
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
    // Use a setTimeout to avoid the React warning about setState during rendering
    setTimeout(() => {
      navigate("/auth");
    }, 0);
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
      // Use setTimeout to avoid React warnings
      setTimeout(() => {
        navigate("/");
      }, 0);
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

      {/* S3 Connection Test Page */}
      <Route path="/s3-test" component={() => {
        const { data, error, isLoading } = useQuery<any>({ 
          queryKey: ["/api/direct/test-s3"], 
          retry: false 
        });

        return (
          <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">S3 Connection Diagnostics</h1>
            
            {isLoading && (
              <div className="bg-blue-50 p-6 rounded-lg shadow">
                <p className="text-blue-600 flex items-center">
                  <span className="mr-2 animate-spin">
                    ⏳
                  </span>
                  Running S3 connection diagnostics...
                </p>
              </div>
            )}
            
            {error && (
              <div className="bg-red-50 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-red-600 mb-4">Diagnostics Failed</h2>
                <p className="text-red-600">{(error as Error).message}</p>
              </div>
            )}
            
            {data && (
              <div className="bg-gray-50 p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-semibold mr-2">
                    S3 Connection Status:  
                  </h2>
                  <span className={`px-3 py-1 rounded text-white ${data.success ? 'bg-green-500' : 'bg-red-500'}`}>
                    {data.success ? 'CONNECTED' : 'FAILED'}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="p-4 border rounded">
                    <h3 className="text-lg font-medium mb-2">AWS Credentials</h3>
                    <ul className="space-y-1">
                      <li>Access Key Present: {data.aws_credentials?.access_key_present ? '✅' : '❌'}</li>
                      <li>Secret Key Present: {data.aws_credentials?.secret_key_present ? '✅' : '❌'}</li>
                      <li>Access Key Valid Format: {data.aws_credentials?.access_key_format_valid ? '✅' : '❌'}</li>
                    </ul>
                  </div>
                  
                  <div className="p-4 border rounded">
                    <h3 className="text-lg font-medium mb-2">S3 Configuration</h3>
                    <ul className="space-y-1">
                      <li>Bucket: {data.s3_config?.bucket}</li>
                      <li>Region: {data.s3_config?.region}</li>
                      <li>Endpoint: {data.s3_config?.endpoint}</li>
                      <li>Bucket Redirects: {data.s3_config?.redirects ? '⚠️ Yes' : '✅ No'}</li>
                      {data.s3_config?.redirect_url && (
                        <li>Redirect URL: <code className="bg-gray-100 px-1">{data.s3_config.redirect_url}</code></li>
                      )}
                    </ul>
                  </div>
                </div>
                
                {data.connection_test && (
                  <div className="mt-6 p-4 border rounded">
                    <h3 className="text-lg font-medium mb-2">Connection Test Results</h3>
                    <p className="mb-2">Files found: {data.connection_test.file_count}</p>
                    {data.connection_test.sample_files && data.connection_test.sample_files.length > 0 && (
                      <div>
                        <h4 className="font-medium">Sample Files:</h4>
                        <ul className="list-disc pl-6">
                          {data.connection_test.sample_files.map((file: string, i: number) => (
                            <li key={i} className="text-sm font-mono">{file}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                {data.error && (
                  <div className="mt-6 p-4 border border-red-200 rounded bg-red-50">
                    <h3 className="text-lg font-medium mb-2 text-red-600">Error Details</h3>
                    <p><strong>Error Type:</strong> {data.error.error_type}</p>
                    <p><strong>Message:</strong> {data.error.message}</p>
                    <p><strong>Status Code:</strong> {data.error.status_code}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-6">
              <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" 
                onClick={() => window.location.reload()}
              >
                Refresh Diagnostics
              </button>
            </div>
          </div>
        );
      }} />
      
      {/* Book-specific Lesson Plans */}
      <Route path="/book/:bookId/unit/:unitId/lesson-plans">
        {() => <ProtectedRoute component={LessonPlansPage} requireAuth={false} />}
      </Route>
      
      {/* Test Teacher Resources Page */}
      <Route path="/test-teacher-resources">
        {() => <ProtectedRoute component={TestTeacherResources} requireAuth={false} />}
      </Route>
      {/* Alternate route for backward compatibility */}
      <Route path="/test-resources">
        {() => <ProtectedRoute component={TestTeacherResources} requireAuth={false} />}
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
