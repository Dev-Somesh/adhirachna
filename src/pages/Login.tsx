
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        // Already logged in, redirect to admin
        navigate("/admin");
      }
    };
    
    checkAuth();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in Login:", event);
      setIsAuthenticated(!!session);
      
      if (session) {
        // Just logged in, redirect to admin
        navigate("/admin");
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Sign in with Supabase
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });
      
      if (authError) throw authError;
      
      if (authData.session) {
        // Store session for future use
        localStorage.setItem("adhirachna_admin_logged_in", "true");
        
        // Show success message
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        
        // Redirect is handled by the auth state change listener
      } else {
        throw new Error("Failed to authenticate");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "Login failed");
      
      toast({
        title: "Login Failed",
        description: err instanceof Error ? err.message : "Invalid email or password",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const demoLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Demo credentials
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: "demo@adhirachna.com",
        password: "demo12345",
      });
      
      if (authError) throw authError;
      
      if (authData.session) {
        localStorage.setItem("adhirachna_admin_logged_in", "true");
        
        toast({
          title: "Demo Login Successful",
          description: "You are now using the demo account",
        });
      } else {
        throw new Error("Failed to authenticate with demo account");
      }
    } catch (err) {
      console.error("Demo login error:", err);
      setError(err instanceof Error ? err.message : "Demo login failed");
      
      toast({
        title: "Demo Login Failed",
        description: err instanceof Error ? err.message : "Failed to login with demo account",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // If already authenticated, show loading until redirect happens
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="mt-4">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-adhirachna-light pt-24 pb-12">
        <div className="glass-card max-w-md w-full p-8">
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img 
                src="/lovable-uploads/621de27a-0a5d-497f-91db-56b0a403ac42.png" 
                alt="Adhirachna Engineering Solutions" 
                className="h-16"
              />
            </Link>
          </div>
          
          <h1 className="text-2xl font-bold text-center mb-6">Admin Login</h1>
          
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Enter your password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          </Form>

          <div className="mt-4">
            <button 
              onClick={demoLogin} 
              className="w-full text-center text-sm text-adhirachna-blue hover:text-adhirachna-darkblue"
              disabled={isLoading}
            >
              Use Demo Account
            </button>
          </div>

          <div className="mt-6 text-center">
            <Link to="/" className="text-adhirachna-blue hover:text-adhirachna-darkblue">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Login;
