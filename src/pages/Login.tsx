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
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

type LoginFormData = z.infer<typeof loginSchema>;

const DEMO_CREDENTIALS = {
  email: "demo@adhirachna.com",
  password: "demo123456"
};

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      
      if (session) {
        navigate("/admin");
      }
    };
    
    checkAuth();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed in Login:", event);
      setIsAuthenticated(!!session);
      
      if (session) {
        navigate("/admin");
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Login successful!",
        duration: 3000
      });
      navigate("/admin");
    } catch (err) {
      console.error("Login error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during login");
      toast({
        title: "Error",
        description: "Login failed. Please check your credentials.",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: DEMO_CREDENTIALS.email,
        password: DEMO_CREDENTIALS.password
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Demo login successful!",
        duration: 3000
      });
      navigate("/admin");
    } catch (err) {
      console.error("Demo login error:", err);
      setError(err instanceof Error ? err.message : "An error occurred during demo login");
      toast({
        title: "Error",
        description: "Demo login failed. Please try again.",
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setLoading(false);
    }
  };

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
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </span>
                ) : (
                  "Sign in"
                )}
              </button>
            </form>
          </Form>

          <div className="mt-4 text-center">
            <button 
              onClick={handleDemoLogin} 
              className="w-full text-center text-sm text-adhirachna-blue hover:text-adhirachna-darkblue mb-2"
              disabled={loading}
            >
              Use Demo Account
            </button>
            <div className="text-xs text-gray-500">
              Demo Credentials:
              <div className="mt-1">
                Email: {DEMO_CREDENTIALS.email}
                <br />
                Password: {DEMO_CREDENTIALS.password}
              </div>
            </div>
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
