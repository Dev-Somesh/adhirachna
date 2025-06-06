import { Routes, Route, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Suspense, useEffect } from "react";
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
import ContentManagement from "./pages/admin/ContentManagement";
import BlogManagement from "./pages/admin/BlogManagement";
import TeamManagement from "./pages/admin/TeamManagement";
import Messages from "./pages/admin/Messages";
import SystemSettings from "./pages/admin/SystemSettings";
import IndexPage from "./pages/Index";
import BlogDetailPage from "./pages/BlogDetail";
import PolicyPage from "./pages/PolicyPage";

// Enhanced RouteValidator with better error handling
const RouteValidator: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    // Skip validation while loading
    if (isLoading) return;

    // Validate location object
    if (!location || typeof location !== 'object') {
      console.error('Invalid location object:', location);
      navigate('/');
      return;
    }

    // Log route changes
    console.log('Route change:', {
      pathname: location.pathname,
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
  }, [location, navigate, isAuthenticated, isLoading]);

  // Show loading state while auth is initializing
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return <>{children}</>;
};

// Custom error boundary for lazy loaded components
const LazyLoadErrorBoundary: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <ErrorBoundary fallback={
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h2 className="text-2xl font-bold mb-4">Failed to load page</h2>
        <p className="text-gray-600 mb-4">We're having trouble loading this page. Please try:</p>
        <ul className="list-disc list-inside mb-4">
          <li>Refreshing the page</li>
          <li>Clearing your browser cache</li>
          <li>Checking your internet connection</li>
        </ul>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/90"
        >
          Reload Page
        </button>
      </div>
    }>
      {children}
    </ErrorBoundary>
  );
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
          <LazyLoadErrorBoundary>
            <Suspense 
              fallback={
                <div className="flex items-center justify-center min-h-screen">
                  <Loading />
                </div>
              }
            >
              <Routes>
                <Route element={<Layout />}>
                  <Route index element={<IndexPage />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<BlogDetailPage />} />
                  <Route path="/policy/:type" element={<PolicyPage type={useParams().type as 'privacy' | 'terms' | 'cookie'} />} />
                  <Route path="/login" element={<Login />} />
                  <Route
                    path="/admin/*"
                    element={
                      <ProtectedRoute>
                        <AdminLayout>
                          <Routes>
                            <Route index element={<Dashboard />} />
                            <Route path="content" element={<ContentManagement />} />
                            <Route path="blog" element={<BlogManagement />} />
                            <Route path="team" element={<TeamManagement />} />
                            <Route path="messages" element={<Messages />} />
                            <Route path="settings" element={<SystemSettings />} />
                          </Routes>
                        </AdminLayout>
                      </ProtectedRoute>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </LazyLoadErrorBoundary>
        </RouteValidator>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
