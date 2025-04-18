import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, useEffect, lazy } from "react";
import React from 'react';
import { AuthProvider, useAuth } from "@/context/AuthContext";

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

// Lazy load components
const IndexPage = lazy(() => import('./pages/Index'));
const BlogDetailPage = lazy(() => import('./pages/BlogDetail'));
const PolicyPagePage = lazy(() => import('./pages/PolicyPage'));

// Enhanced RouteValidator with better error handling
const RouteValidator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Validate location object
    if (!location || typeof location !== 'object') {
      console.error('Invalid location object:', location);
      navigate('/');
      return;
    }

    // Log route changes
    console.log('Route change:', {
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      state: location.state,
      timestamp: new Date().toISOString()
    });

    // Only validate admin route access if trying to access admin routes
    if (location.pathname.startsWith('/admin')) {
      if (!isAuthenticated) {
        console.warn('Unauthorized admin access attempt');
        navigate('/login');
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
  }, [location, navigate, isAuthenticated]);

  return <>{children}</>;
};

function App() {
  console.log("App component rendered");

  // Add global error listener
  useEffect(() => {
    const handleGlobalError = (event: ErrorEvent) => {
      console.error('Global error caught:', {
        message: event.message,
        error: event.error,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString()
      });
    };

    // Handle unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', {
        reason: event.reason,
        timestamp: new Date().toISOString()
      });
    };

    window.addEventListener('error', handleGlobalError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleGlobalError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return (
    <AuthProvider>
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
                <Route 
                  path="/policy/:type" 
                  element={<PolicyPagePage type={useParams().type as 'privacy' | 'terms' | 'cookie'} />} 
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin/*"
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
    </AuthProvider>
  );
}

export default App;
