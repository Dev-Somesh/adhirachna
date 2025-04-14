import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => window.location.reload()}>
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AuthProvider>
            <Router>
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-grow">
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
                </main>
                <Footer />
              </div>
            </Router>
          </AuthProvider>
        </TooltipProvider>
      </SiteProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
