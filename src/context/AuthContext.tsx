import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User as SupabaseUser, AuthChangeEvent } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  // Initialize auth state
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Get initial session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (initialSession) {
          setSession(initialSession);
          setUser(initialSession.user);
          setIsAuthenticated(true);
          
          // Get user role
          try {
            const { data: roleData, error: roleError } = await supabase
              .from('user_roles')
              .select('role')
              .eq('user_id', initialSession.user.id)
              .single();

            if (!roleError && roleData) {
              setUser({ ...initialSession.user, role: roleData.role });
            } else {
              // If no role found, set a default role
              setUser({ ...initialSession.user, role: 'user' });
            }
          } catch (err) {
            console.error('Error fetching user role:', err);
            // Set default role if table doesn't exist or other error
            setUser({ ...initialSession.user, role: 'user' });
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError(err as Error);
        toast({
          title: "Authentication Error",
          description: "Failed to initialize authentication",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state change:', event, !!currentSession);
      
      try {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          setIsAuthenticated(true);
          
          if (event === 'SIGNED_IN') {
            // Get user role after sign in
            try {
              const { data: roleData, error: roleError } = await supabase
                .from('user_roles')
                .select('role')
                .eq('user_id', currentSession.user.id)
                .single();

              if (!roleError && roleData) {
                setUser({ ...currentSession.user, role: roleData.role });
              } else {
                // If no role found, set a default role
                setUser({ ...currentSession.user, role: 'user' });
              }
            } catch (err) {
              console.error('Error fetching user role:', err);
              // Set default role if table doesn't exist or other error
              setUser({ ...currentSession.user, role: 'user' });
            }
          }
        } else {
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('Error handling auth state change:', err);
        setError(err as Error);
        toast({
          title: "Authentication Error",
          description: "Failed to handle authentication state change",
          variant: "destructive",
        });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
        setIsAuthenticated(true);
        
        // Get user role after successful sign in
        try {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', data.session.user.id)
            .single();

          if (!roleError && roleData) {
            setUser({ ...data.session.user, role: roleData.role });
          } else {
            // If no role found, set a default role
            setUser({ ...data.session.user, role: 'user' });
          }
        } catch (err) {
          console.error('Error fetching user role:', err);
          // Set default role if table doesn't exist or other error
          setUser({ ...data.session.user, role: 'user' });
        }
        
        navigate('/admin');
      }
    } catch (err) {
      console.error('Error signing in:', err);
      setError(err as Error);
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : "An error occurred during login",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setError(null);
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      console.error('Error signing out:', err);
      setError(err as Error);
      toast({
        title: "Logout Failed",
        description: err instanceof Error ? err.message : "An error occurred during logout",
        variant: "destructive",
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    session,
    isAuthenticated,
    isLoading,
    error,
    signIn,
    signOut
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
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
          <div className="space-y-2">
            <Button
              variant="outline"
              onClick={() => {
                setError(null);
                navigate('/login');
              }}
              className="w-full"
            >
              Go to Login
            </Button>
            <Button
              variant="outline"
              onClick={() => window.location.reload()}
              className="w-full"
            >
              Reload Page
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