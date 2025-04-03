
import { useEffect, useState } from "react";
import { Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import { Home, Settings, LogOut, Users, FileText, Mail, BookOpen, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { supabase, signOut } from "@/integrations/supabase/client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      try {
        // First check if there's a persisted session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          setAuthenticated(false);
          localStorage.removeItem("adhirachna_admin_logged_in");
          toast({
            title: "Authentication Error",
            description: error.message,
            variant: "destructive"
          });
          return;
        }
        
        if (session) {
          console.log("User is authenticated:", !!session);
          setAuthenticated(true);
          localStorage.setItem("adhirachna_admin_logged_in", "true");
        } else {
          console.log("No active session found");
          setAuthenticated(false);
          localStorage.removeItem("adhirachna_admin_logged_in");
        }
      } catch (err) {
        console.error("Auth check error:", err);
        setAuthenticated(false);
        localStorage.removeItem("adhirachna_admin_logged_in");
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed in AdminLayout:", event, !!session);
        
        if (event === 'SIGNED_IN' && session) {
          setAuthenticated(true);
          localStorage.setItem("adhirachna_admin_logged_in", "true");
        } else if (event === 'SIGNED_OUT') {
          // Fixed: Removed comparison with 'USER_DELETED' which was causing the type error
          setAuthenticated(false);
          localStorage.removeItem("adhirachna_admin_logged_in");
          navigate("/login");
        }
      }
    );
    
    // Track session activity
    const checkActivity = () => {
      const lastActivity = localStorage.getItem("adhirachna_last_activity");
      const now = new Date().getTime();
      
      if (lastActivity && now - parseInt(lastActivity) > 30 * 60 * 1000) { // 30 minutes
        // Auto logout after 30 minutes of inactivity
        signOut().then(() => {
          localStorage.removeItem("adhirachna_last_activity");
          toast({
            title: "Session Expired",
            description: "Your session has expired due to inactivity.",
          });
          navigate("/login");
        });
      } else {
        localStorage.setItem("adhirachna_last_activity", now.toString());
      }
    };
    
    // Check on load
    checkActivity();
    
    // Setup event listeners for activity
    const activityEvents = ["mousedown", "mousemove", "keydown", "scroll", "touchstart"];
    const activityListener = () => {
      localStorage.setItem("adhirachna_last_activity", new Date().getTime().toString());
    };
    
    activityEvents.forEach(event => {
      window.addEventListener(event, activityListener);
    });
    
    return () => {
      subscription.unsubscribe();
      activityEvents.forEach(event => {
        window.removeEventListener(event, activityListener);
      });
    };
  }, [navigate]);
  
  // Handle logout function
  const handleLogout = async () => {
    try {
      await signOut();
      
      toast({
        title: "Logged Out",
        description: "You have been successfully logged out.",
      });
      
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Logout Error",
        description: error instanceof Error ? error.message : "Error during logout",
        variant: "destructive"
      });
    }
  };
  
  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-adhirachna-blue mb-4" />
        <p className="text-xl">Loading admin dashboard...</p>
      </div>
    );
  }
  
  // If not logged in, redirect to login page
  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-adhirachna-light flex">
      {/* Sidebar */}
      <div className="w-64 bg-adhirachna-darkblue text-white p-4 flex flex-col">
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/621de27a-0a5d-497f-91db-56b0a403ac42.png" 
            alt="Adhirachna Engineering Solutions" 
            className="h-12"
          />
        </div>
        
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link 
                to="/admin" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/content" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <FileText className="mr-3 h-5 w-5" />
                Content Management
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/blog" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <BookOpen className="mr-3 h-5 w-5" />
                Blog Management
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/team" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <Users className="mr-3 h-5 w-5" />
                Team Members
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/messages" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <Mail className="mr-3 h-5 w-5" />
                Messages
              </Link>
            </li>
            <li>
              <Link 
                to="/admin/settings" 
                className="flex items-center p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="mt-auto pt-4 border-t border-adhirachna-blue/20">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-3 rounded-lg hover:bg-adhirachna-blue/20 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm p-4">
          <h1 className="text-xl font-semibold text-adhirachna-darkblue">Admin Dashboard</h1>
        </header>
        
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
