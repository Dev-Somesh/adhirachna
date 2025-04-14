import { createContext, useContext, useEffect, useState } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";

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

  const refreshSession = async () => {
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
  };

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
  }, [navigate]);

  const signOut = async () => {
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
  };

  const value = {
    session,
    user,
    loading,
    error,
    signOut,
    refreshSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
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