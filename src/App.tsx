import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Suspense, useEffect, lazy } from "react";
import React from 'react';

// Component imports
import Layout from './components/Layout';
import Loading from '@/components/Loading';
import ErrorBoundary from '@/components/ErrorBoundary';
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Dashboard from "./pages/admin/Dashboard";
import Blog from "./pages/Blog";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from "./components/AdminLayout";

// Lazy load components with error handling and logging
const withErrorHandling = (
  importFn: () => Promise<any>,
  componentName: string
) => {
  return importFn()
    .then((module) => {
      console.log(`[Performance] ${componentName} loaded successfully`);
      return module;
    })
    .catch((error) => {
      console.error(`[Error] Failed to load ${componentName}:`, error);
      throw error;
    });
};

// Lazy load components
const IndexPage = lazy(() => withErrorHandling(() => import('./pages/Index'), 'IndexPage'));
const BlogDetailPage = lazy(() => withErrorHandling(() => import('./pages/BlogDetail'), 'BlogDetailPage'));
const PolicyPagePage = lazy(() => withErrorHandling(() => import('./pages/PolicyPage'), 'PolicyPagePage'));

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

function App() {
  console.log("App component rendered");

  // Add global error listener with vendor error handling
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.log('Global error:', event.error || event.message);
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
      console.log('Promise rejection:', event.reason);
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
    <ErrorBoundary>
      <Toaster />
      <Sonner />
      <RouteValidator>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetailPage />} />
              <Route path="/privacy-policy" element={<PolicyPagePage type="privacy" />} />
              <Route path="/terms-of-service" element={<PolicyPagePage type="terms" />} />
              <Route path="/cookie-policy" element={<PolicyPagePage type="cookie" />} />
              <Route path="/login" element={<Login />} />
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
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </RouteValidator>
    </ErrorBoundary>
  );
}

export default App;
