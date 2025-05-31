import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const contentSchema = z.object({
  heroTitle: z.string().min(1, "Title is required"),
  heroDescription: z.string().min(1, "Description is required"),
  aboutTitle: z.string().min(1, "Title is required"),
  aboutDescription: z.string().min(1, "Description is required"),
  servicesTitle: z.string().min(1, "Title is required"),
  servicesDescription: z.string().min(1, "Description is required"),
  contactTitle: z.string().min(1, "Title is required"),
  contactDescription: z.string().min(1, "Description is required"),
});

type ContentFormValues = z.infer<typeof contentSchema>;

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("home");
  const [loading, setLoading] = useState(false);

  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      heroTitle: "",
      heroDescription: "",
      aboutTitle: "",
      aboutDescription: "",
      servicesTitle: "",
      servicesDescription: "",
      contactTitle: "",
      contactDescription: "",
    },
  });

  const onSubmit = async (data: ContentFormValues) => {
    setLoading(true);
    try {
      // Here you would typically save to your database
      console.log("Content update data:", data);
      
      // Store in localStorage for now
      localStorage.setItem("adhirachna_website_content", JSON.stringify(data));
      
      toast({
        title: "Content Updated",
        description: "Website content has been updated successfully",
      });
    } catch (error) {
      console.error("Content update error:", error);
      toast({
        title: "Error",
        description: "Failed to update content",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Content Management</h1>
        <Button
          variant="outline"
          onClick={() => window.open('/', '_blank')}
        >
          Preview Website
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="about">About Page</TabsTrigger>
          <TabsTrigger value="services">Services Page</TabsTrigger>
          <TabsTrigger value="contact">Contact Page</TabsTrigger>
        </TabsList>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <TabsContent value="home">
              <Card>
                <CardHeader>
                  <CardTitle>Home Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="heroTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter hero title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="heroDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Hero Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Enter hero description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardHeader>
                  <CardTitle>About Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="aboutTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter about title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="aboutDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>About Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Enter about description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="services">
              <Card>
                <CardHeader>
                  <CardTitle>Services Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="servicesTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter services title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="servicesDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Services Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Enter services description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Page Content</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="contactTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Title</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Enter contact title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="contactDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Description</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Enter contact description" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </Form>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
