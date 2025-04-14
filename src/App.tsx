import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import PolicyPage from "./pages/PolicyPage";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import ContentManagement from "./pages/admin/ContentManagement";
import TeamMembers from "./pages/admin/TeamMembers";
import Settings from "./pages/admin/Settings";
import BlogManagement from "./pages/admin/BlogManagement";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import { AuthProvider } from "@/context/AuthContext";
import { ErrorBoundary } from "react-error-boundary";
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import { Button } from "@/components/ui/button";
import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

// Validate environment variables
const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY',
  'VITE_CONTENTFUL_SPACE_ID',
  'VITE_CONTENTFUL_ACCESS_TOKEN'
];

const missingEnvVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
if (missingEnvVars.length > 0) {
  console.error('Missing required environment variables:', missingEnvVars);
}

// Create a React Query client with default options
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Add type for PolicyPage props
type PolicyPageProps = {
  type: 'privacy' | 'terms' | 'cookie';
};

// Loading component for Suspense
const Loading = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-adhirachna-darkblue"></div>
  </div>
);

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
      <div className="max-w-md p-6 rounded-lg shadow-lg bg-background">
        <h2 className="mb-4 text-2xl font-bold text-red-500">Something went wrong</h2>
        <pre className="p-4 mb-4 overflow-auto text-sm text-left rounded-md bg-muted">
          {error.message}
        </pre>
        <div className="flex gap-4">
          <Button
            variant="outline"
            onClick={() => {
              resetErrorBoundary();
              navigate('/');
            }}
          >
            Go Home
          </Button>
          <Button
            variant="default"
            onClick={() => {
              resetErrorBoundary();
              window.location.reload();
            }}
          >
            Try Again
          </Button>
        </div>
      </div>
    </div>
  );
}

// Route validation wrapper
const RouteValidator = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Log route changes for debugging
  useEffect(() => {
    if (!location) {
      console.error('Location object is undefined');
      navigate('/');
      return;
    }

    console.log('Route changed:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state
    });

    // Store current route in session storage for recovery
    sessionStorage.setItem('lastRoute', JSON.stringify({
      pathname: location.pathname,
      search: location.search,
      state: location.state
    }));
  }, [location, navigate]);

  // Validate route state
  if (!location) {
    console.error('Location object is undefined');
    return <Navigate to="/" />;
  }

  // Validate admin routes
  if (location.pathname.startsWith('/admin')) {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    if (!user) {
      console.warn('Unauthorized access attempt to admin route:', location.pathname);
      return <Navigate to="/login" state={{ from: location }} />;
    }
  }

  // Handle hash navigation
  useEffect(() => {
    if (location?.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`Hash target ${location.hash} not found`);
      }
    }
  }, [location?.hash]);

  // Handle 404 for dynamic routes
  const isDynamicRoute = location.pathname.includes('/:');
  if (isDynamicRoute) {
    const segments = location.pathname.split('/');
    const hasEmptySegment = segments.some(segment => !segment && segment !== '');
    if (hasEmptySegment) {
      console.error('Invalid dynamic route segment:', location.pathname);
      return <Navigate to="/404" />;
    }
  }

  return <>{children}</>;
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <Router>
              <RouteValidator>
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Suspense fallback={<Loading />}>
                      <Routes>
                        <Route path="/" element={<Index />} />
                        
                        {/* Main navigation pages */}
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/projects" element={<Projects />} />
                        <Route path="/contact" element={<Contact />} />
                        
                        {/* Blog pages */}
                        <Route path="/blog" element={<Blog />} />
                        <Route path="/blog/:id" element={<BlogDetail />} />
                        
                        {/* Policy pages */}
                        <Route path="/privacy-policy" element={<PolicyPage type="privacy" />} />
                        <Route path="/terms-of-service" element={<PolicyPage type="terms" />} />
                        <Route path="/cookie-policy" element={<PolicyPage type="cookie" />} />
                        
                        {/* Authentication */}
                        <Route path="/login" element={<Login />} />
                        
                        {/* Protected Admin Routes */}
                        <Route
                          path="/admin"
                          element={
                            <ProtectedRoute>
                              <AdminLayout>
                                <Dashboard />
                              </AdminLayout>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/content"
                          element={
                            <ProtectedRoute>
                              <AdminLayout>
                                <ContentManagement />
                              </AdminLayout>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/blog"
                          element={
                            <ProtectedRoute>
                              <AdminLayout>
                                <BlogManagement />
                              </AdminLayout>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/team"
                          element={
                            <ProtectedRoute>
                              <AdminLayout>
                                <TeamMembers />
                              </AdminLayout>
                            </ProtectedRoute>
                          }
                        />
                        <Route
                          path="/admin/settings"
                          element={
                            <ProtectedRoute>
                              <AdminLayout>
                                <Settings />
                              </AdminLayout>
                            </ProtectedRoute>
                          }
                        />
                        
                        {/* Catch-all route */}
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </Suspense>
                  </main>
                  <Footer />
                </div>
              </RouteValidator>
            </Router>
          </AuthProvider>
        </TooltipProvider>
      </SiteProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
