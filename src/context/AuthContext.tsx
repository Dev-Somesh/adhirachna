import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  error: Error | null;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const refreshSession = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      setSession(session);
      setUser(session?.user ?? null);
    } catch (error) {
      console.error('Error refreshing session:', error);
      setError(error as Error);
      // Store error in session storage for debugging
      sessionStorage.setItem('authError', JSON.stringify({
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      }));
    } finally {
      setLoading(false);
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error as Error);
      // Store error in session storage for debugging
      sessionStorage.setItem('authError', JSON.stringify({
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      }));
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    refreshSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        setSession(session);
        setUser(session?.user ?? null);
        
        if (event === 'SIGNED_OUT') {
          // Clear any stored errors
          sessionStorage.removeItem('authError');
          navigate('/login');
        } else if (event === 'SIGNED_IN') {
          // Clear any stored errors
          sessionStorage.removeItem('authError');
          // Redirect to admin dashboard if on login page
          if (window.location.pathname === '/login') {
            navigate('/admin/dashboard');
          }
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, refreshSession]);

  const value = {
    session,
    user,
    loading,
    error,
    signOut,
    refreshSession,
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Spinner className="w-12 h-12 mb-4" />
          <p className="text-muted-foreground">Loading authentication...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-6 max-w-md">
          <h2 className="text-2xl font-bold text-red-500 mb-4">Authentication Error</h2>
          <p className="text-muted-foreground mb-4">{error.message}</p>
          <div className="flex gap-4 justify-center">
            <Button
              variant="outline"
              onClick={() => {
                setError(null);
                refreshSession();
              }}
            >
              Retry
            </Button>
            <Button
              variant="default"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 