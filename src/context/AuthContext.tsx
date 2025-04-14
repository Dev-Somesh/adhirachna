import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { Session, User as SupabaseUser, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@/components/ui/Spinner";
import { Button } from "@/components/ui/button";

interface User extends SupabaseUser {
  role?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Error | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const refreshSession = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) throw error;
      
      if (session) {
        setSession(session);
        setUser(session.user);
        setIsAuthenticated(true);
      } else {
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error refreshing session:', error);
      setError(error as Error);
      sessionStorage.setItem('authError', JSON.stringify({
        error: (error as Error).message,
        timestamp: new Date().toISOString()
      }));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    let timeoutId: NodeJS.Timeout;

    const handleAuthChange = async (event: AuthChangeEvent, session: Session | null) => {
      if (!mounted) return;

      console.log('Auth state changed:', event);
      
      try {
        if (event === 'SIGNED_IN' && session) {
          // Get user role from Supabase
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', session.user.id)
            .single();

          if (roleError) {
            console.error('Error fetching user role:', roleError);
            return;
          }

          if (mounted) {
            const userWithRole = {
              ...session.user,
              role: roleData?.role || 'viewer'
            };
            setUser(userWithRole);
            setSession(session);
            setIsAuthenticated(true);
            sessionStorage.setItem('isAuthenticated', 'true');
            sessionStorage.setItem('userRole', roleData?.role || 'viewer');
          }
        } else if (event === 'SIGNED_OUT') {
          if (mounted) {
            setUser(null);
            setSession(null);
            setIsAuthenticated(false);
            sessionStorage.removeItem('isAuthenticated');
            sessionStorage.removeItem('userRole');
          }
        }
      } catch (error) {
        console.error('Error handling auth change:', error);
      }
    };

    // Initial session check
    const checkSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        if (error) {
          console.error('Session error:', error);
          return;
        }
        
        if (session) {
          await handleAuthChange('SIGNED_IN', session);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    // Set a timeout for the initial session check
    timeoutId = setTimeout(checkSession, 1000);

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(handleAuthChange);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
      setError(error as Error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
      setError(error as Error);
      throw error;
    }
  };

  const value = {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut,
    refreshSession
  };

  if (isLoading) {
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
              variant="destructive"
              onClick={() => {
                setError(null);
                navigate('/login');
              }}
            >
              Go to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
} 