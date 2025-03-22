
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";

const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters")
}).refine(data => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const settingsSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});

type PasswordFormValues = z.infer<typeof passwordSchema>;
type SettingsFormValues = z.infer<typeof settingsSchema>;

const Settings = () => {
  const [activeTab, setActiveTab] = useState<"general" | "password">("general");
  
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  
  const settingsForm = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      companyName: "Adhirachna Engineering Solutions",
      email: "info@adhirachna.com",
      phone: "+91 123 456 7890",
      address: "Villa No. 04, Aditi Villas, Jagatpura, Jaipur, Rajasthan, 302017, India",
    },
  });
  
  const onPasswordSubmit = (data: PasswordFormValues) => {
    // In a real app, this would update the password on the server
    console.log("Password update data:", data);
    
    // Check if current password is "admin" (simulating validation)
    if (data.currentPassword !== "admin") {
      toast({
        title: "Error",
        description: "Current password is incorrect",
        variant: "destructive",
      });
      return;
    }
    
    // Show success message
    toast({
      title: "Password Updated",
      description: "Your password has been updated successfully",
    });
    
    // Reset form
    passwordForm.reset();
  };
  
  const onSettingsSubmit = (data: SettingsFormValues) => {
    // In a real app, this would save to a database
    console.log("Settings update data:", data);
    
    // Show success message
    toast({
      title: "Settings Updated",
      description: "Your company settings have been updated successfully",
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Admin Settings</h2>
      
      <div className="glass-card">
        <div className="flex border-b">
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "general" 
                ? "border-b-2 border-adhirachna-blue text-adhirachna-darkblue" 
                : "text-adhirachna-gray"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General Settings
          </button>
          <button
            className={`px-6 py-3 font-medium ${
              activeTab === "password" 
                ? "border-b-2 border-adhirachna-blue text-adhirachna-darkblue" 
                : "text-adhirachna-gray"
            }`}
            onClick={() => setActiveTab("password")}
          >
            Change Password
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === "general" ? (
            <Form {...settingsForm}>
              <form onSubmit={settingsForm.handleSubmit(onSettingsSubmit)} className="space-y-6">
                <FormField
                  control={settingsForm.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This will be displayed throughout the website.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={settingsForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primary Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        This email will be used for contact forms and public display.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={settingsForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={settingsForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Office Address</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-adhirachna-gray text-adhirachna-gray rounded hover:bg-adhirachna-lightgray transition-colors"
                    onClick={() => settingsForm.reset()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </Form>
          ) : (
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormDescription>
                        Password must be at least 6 characters.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={passwordForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    className="px-4 py-2 border border-adhirachna-gray text-adhirachna-gray rounded hover:bg-adhirachna-lightgray transition-colors"
                    onClick={() => passwordForm.reset()}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-primary"
                  >
                    Update Password
                  </button>
                </div>
              </form>
            </Form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
