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
import { supabase } from "@/lib/supabase";

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
  const navigate = useNavigate();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log('Checking existing session...');
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session error:", error);
          return;
        }
        
        if (session) {
          console.log('Session found, redirecting to admin...');
          navigate("/admin", { replace: true });
        } else {
          console.log('No active session found');
        }
      } catch (err) {
        console.error("Auth check error:", err);
      }
    };

    checkSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth state change:', { event, hasSession: !!session });
      if (session) {
        console.log('Session detected, redirecting to admin...');
        navigate("/admin", { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogin = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log('Attempting login...');
      
      // Add a small delay to ensure state updates
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        console.error('Login error:', error);
        throw error;
      }
      
      if (data.session) {
        console.log('Login successful, session:', data.session);
        
        // Add a small delay before navigation
        await new Promise(resolve => setTimeout(resolve, 500));
        
        toast({
          title: "Success",
          description: "Login successful!",
          duration: 3000
        });
        
        // Use window.location instead of navigate for more reliable redirect
        window.location.href = '/admin';
      } else {
        console.error('No session returned after login');
        throw new Error('No session returned after login');
      }
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

  const onSubmit = async (data: LoginFormData) => {
    console.log('Form submitted with data:', { email: data.email });
    await handleLogin(data.email, data.password);
  };

  const handleDemoLogin = async () => {
    console.log('Attempting demo login...');
    await handleLogin(DEMO_CREDENTIALS.email, DEMO_CREDENTIALS.password);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow flex items-center justify-center bg-adhirachna-light pt-24 pb-12">
        <div className="glass-card max-w-md w-full p-8">
          <div className="flex justify-center mb-8">
            <Link to="/">
              <img 
                src="/adhirachna-uploads/AdhirachnaVector.png" 
                alt="Adhirachna Logo" 
                className="w-32 h-32 mb-8"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/adhirachna-uploads/4c3bdf49-51a1-4395-979c-df13ea291dc1.png';
                }}
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
              
              <div className="flex flex-col space-y-4">
                <button
                  type="submit"
                  className="w-full bg-adhirachna-green hover:bg-adhirachna-darkgreen text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Logging in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
                
                <button
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-adhirachna-blue hover:bg-adhirachna-darkblue text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Logging in...
                    </div>
                  ) : (
                    "Login as Demo"
                  )}
                </button>
              </div>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <Link to="/" className="text-adhirachna-blue hover:text-adhirachna-darkblue">
              Return to Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
