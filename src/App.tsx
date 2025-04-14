import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation, Navigate } from "react-router-dom";
import { SiteProvider } from "./context/SiteContext";
import { AuthProvider } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect } from "react";
import React from 'react';

// Component imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Spinner } from './components/ui/Spinner';
import ErrorBoundary from '@/components/ErrorBoundary';
import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from './components/ProtectedRoute';

// Page imports
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import ContentManagement from "./pages/admin/ContentManagement";
import TeamMembers from "./pages/admin/TeamMembers";
import Settings from "./pages/admin/Settings";
import BlogManagement from "./pages/admin/BlogManagement";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

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

// Lazy load components with performance monitoring
const withPerformanceMonitoring = (
  importFn: () => Promise<any>,
  componentName: string
) => {
  return importFn().then((module) => {
    console.log(`[Performance] ${componentName} loaded in ${performance.now()}ms`);
    return module;
  });
};

// Lazy load components
const IndexPage = React.lazy(() => withPerformanceMonitoring(() => import('./pages/Index'), 'IndexPage'));
const BlogDetailPage = React.lazy(() => withPerformanceMonitoring(() => import('./pages/BlogDetail'), 'BlogDetailPage'));
const PolicyPagePage = React.lazy(() => withPerformanceMonitoring(() => import('./pages/PolicyPage'), 'PolicyPagePage'));

// Add vendor error handling
const handleVendorError = (error: Error) => {
  console.error('Vendor error caught:', {
    message: error.message,
    stack: error.stack,
    timestamp: new Date().toISOString()
  });

  // Store vendor error in session storage
  try {
    sessionStorage.setItem('vendorError', JSON.stringify({
      message: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    }));
  } catch (e) {
    console.error('Failed to store vendor error:', e);
  }
};

// Enhanced RouteValidator with better error handling and log cleanup
const RouteValidator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Clear stale error logs on route change
    const clearStaleErrorLogs = () => {
      ['globalError', 'errorBoundaryError', 'routeError', 'vendorError'].forEach(key => {
        const errorData = sessionStorage.getItem(key);
        if (errorData) {
          try {
            const { timestamp } = JSON.parse(errorData);
            const staleThreshold = 1000 * 60 * 30; // 30 minutes
            const isStale = new Date().getTime() - new Date(timestamp).getTime() > staleThreshold;
            if (isStale) {
              sessionStorage.removeItem(key);
            }
          } catch (e) {
            console.error(`Failed to parse ${key}:`, e);
            sessionStorage.removeItem(key);
          }
        }
      });
    };

    // Validate location object
    if (!location || typeof location !== 'object') {
      console.error('Invalid location object:', location);
      sessionStorage.setItem('routeError', JSON.stringify({
        error: 'Invalid location object',
        location,
        timestamp: new Date().toISOString()
      }));
      navigate('/');
      return;
    }

    // Log route changes with validation
    console.log('Route change:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      timestamp: new Date().toISOString()
    });

    // Clear stale logs on route change
    clearStaleErrorLogs();

    // Validate admin route access
    if (location.pathname.startsWith('/admin')) {
      const isAuthenticated = sessionStorage.getItem('isAuthenticated');
      if (!isAuthenticated) {
        console.warn('Unauthorized admin access attempt');
        navigate('/');
        return;
      }
    }

    // Handle hash navigation
    if (location.hash) {
      try {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } catch (error) {
        console.error('Error handling hash navigation:', error);
      }
    }
  }, [location, navigate]);

  return <>{children}</>;
};

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

// Add Suspense boundaries with error handling
const SuspenseBoundary: React.FC<{ children: React.ReactNode; name: string }> = ({ children, name }) => {
  const startTime = React.useRef(performance.now());

  React.useEffect(() => {
    const loadTime = performance.now() - startTime.current;
    console.log(`[Performance] ${name} rendered in ${loadTime}ms`);
  }, [name]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Spinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
};

// Enhanced ErrorBoundary for vendor code
const VendorErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary
      onError={handleVendorError}
      fallback={
        <div className="flex flex-col items-center justify-center min-h-[50vh] p-4">
          <div className="max-w-md p-6 rounded-lg shadow-lg bg-background">
            <h2 className="mb-4 text-2xl font-bold text-red-500">Application Error</h2>
            <p className="mb-4 text-muted-foreground">
              We're experiencing technical difficulties. Please try refreshing the page.
            </p>
            <Button
              variant="default"
              onClick={() => window.location.reload()}
            >
              Refresh Page
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </ErrorBoundary>
  );
};

function App() {
  // Add global error listener with vendor error handling
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      // Check if error is from vendor chunk
      const isVendorError = event.filename?.includes('vendor-') || 
                          event.error?.stack?.includes('vendor-');

      if (isVendorError) {
        handleVendorError(event.error);
        return;
      }

      console.error('Global error caught:', {
        message: event.message,
        error: event.error,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString()
      });

      // Store error in session storage
      try {
        sessionStorage.setItem('globalError', JSON.stringify({
          message: event.message,
          stack: event.error?.stack,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Failed to store global error:', e);
      }
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        timestamp: new Date().toISOString()
      });

      try {
        sessionStorage.setItem('promiseError', JSON.stringify({
          reason: event.reason?.toString(),
          stack: event.reason?.stack,
          timestamp: new Date().toISOString()
        }));
      } catch (e) {
        console.error('Failed to store promise error:', e);
      }
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <VendorErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <SiteProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <Router basename="/">
              <AuthProvider>
                <RouteValidator>
                  <ErrorBoundary>
                    <div className="flex flex-col min-h-screen">
                      <Navbar />
                      <main className="flex-grow">
                        <ErrorBoundary>
                          <Routes>
                            {/* Routes with error and suspense boundaries */}
                            <Route 
                              path="/" 
                              element={
                                <SuspenseBoundary name="IndexPage">
                                  <IndexPage />
                                </SuspenseBoundary>
                              } 
                            />
                            
                            {/* Main navigation pages */}
                            <Route 
                              path="/about" 
                              element={
                                <SuspenseBoundary name="About">
                                  <About />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/services" 
                              element={
                                <SuspenseBoundary name="Services">
                                  <Services />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/projects" 
                              element={
                                <SuspenseBoundary name="Projects">
                                  <Projects />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/contact" 
                              element={
                                <SuspenseBoundary name="Contact">
                                  <Contact />
                                </SuspenseBoundary>
                              } 
                            />
                            
                            {/* Blog pages */}
                            <Route 
                              path="/blog" 
                              element={
                                <SuspenseBoundary name="Blog">
                                  <Blog />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/blog/:id" 
                              element={
                                <SuspenseBoundary name="BlogDetail">
                                  <BlogDetailPage />
                                </SuspenseBoundary>
                              } 
                            />
                            
                            {/* Policy pages */}
                            <Route 
                              path="/privacy-policy" 
                              element={
                                <SuspenseBoundary name="PrivacyPolicy">
                                  <PolicyPagePage type="privacy" />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/terms-of-service" 
                              element={
                                <SuspenseBoundary name="TermsOfService">
                                  <PolicyPagePage type="terms" />
                                </SuspenseBoundary>
                              } 
                            />
                            <Route 
                              path="/cookie-policy" 
                              element={
                                <SuspenseBoundary name="CookiePolicy">
                                  <PolicyPagePage type="cookie" />
                                </SuspenseBoundary>
                              } 
                            />
                            
                            {/* Authentication */}
                            <Route 
                              path="/login" 
                              element={
                                <SuspenseBoundary name="Login">
                                  <Login />
                                </SuspenseBoundary>
                              } 
                            />
                            
                            {/* Protected Admin Routes */}
                            <Route
                              path="/admin"
                              element={
                                <SuspenseBoundary name="AdminDashboard">
                                  <ProtectedRoute>
                                    <AdminLayout>
                                      <Dashboard />
                                    </AdminLayout>
                                  </ProtectedRoute>
                                </SuspenseBoundary>
                              }
                            />
                            
                            {/* Catch-all route - Must be last */}
                            <Route 
                              path="*" 
                              element={
                                <SuspenseBoundary name="NotFound">
                                  <NotFound />
                                </SuspenseBoundary>
                              } 
                            />
                          </Routes>
                        </ErrorBoundary>
                      </main>
                      <Footer />
                    </div>
                  </ErrorBoundary>
                </RouteValidator>
              </AuthProvider>
            </Router>
          </TooltipProvider>
        </SiteProvider>
      </QueryClientProvider>
    </VendorErrorBoundary>
  );
}

export default App;
