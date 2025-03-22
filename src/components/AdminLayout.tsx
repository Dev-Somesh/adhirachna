
import { useEffect } from "react";
import { Navigate, Link, Outlet, useNavigate } from "react-router-dom";
import { Home, Settings, LogOut, Users, FileText, Mail } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const AdminLayout = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("adhirachna_admin_logged_in") === "true";
  
  // If not logged in, redirect to login page
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  
  const handleLogout = () => {
    localStorage.removeItem("adhirachna_admin_logged_in");
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    navigate("/login");
  };

  // Track session activity
  useEffect(() => {
    const checkActivity = () => {
      const lastActivity = localStorage.getItem("adhirachna_last_activity");
      const now = new Date().getTime();
      
      if (lastActivity && now - parseInt(lastActivity) > 30 * 60 * 1000) { // 30 minutes
        // Auto logout after 30 minutes of inactivity
        localStorage.removeItem("adhirachna_admin_logged_in");
        localStorage.removeItem("adhirachna_last_activity");
        toast({
          title: "Session Expired",
          description: "Your session has expired due to inactivity.",
        });
        navigate("/login");
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
    
    // Cleanup
    return () => {
      activityEvents.forEach(event => {
        window.removeEventListener(event, activityListener);
      });
    };
  }, [navigate]);

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
