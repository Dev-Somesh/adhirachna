
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Hardcoded credentials (in real app, this would be on the server)
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin";

const loginSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);

    // Simple validation against hardcoded credentials
    if (data.username === ADMIN_USERNAME && data.password === ADMIN_PASSWORD) {
      // Store login state in localStorage
      localStorage.setItem("adhirachna_admin_logged_in", "true");
      
      // Show success message
      toast({
        title: "Login Successful",
        description: "Welcome to the admin dashboard",
      });
      
      // Redirect to admin dashboard
      navigate("/admin");
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
    
    setIsLoading(false);
  };

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
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your username" {...field} />
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
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>
          </Form>

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
