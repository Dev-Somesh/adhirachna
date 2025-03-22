
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { useSiteContent } from "@/context/SiteContext";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ContentManagement = () => {
  const { siteContent, updateSection } = useSiteContent();
  const [activeTab, setActiveTab] = useState("hero");
  
  // Get the active section from site content
  const activeSection = siteContent[activeTab as keyof typeof siteContent];
  
  const form = useForm({
    defaultValues: activeSection
  });
  
  // Update form values when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    const section = siteContent[tabId as keyof typeof siteContent];
    form.reset(section);
  };
  
  const onSubmit = (data: any) => {
    // Update the site content with the new data
    updateSection(activeTab as keyof typeof siteContent, data);
    
    toast({
      title: "Changes Saved",
      description: "Your content changes have been saved and are now visible on the website."
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">Content Management</h2>
        <Link 
          to="/" 
          target="_blank"
          className="btn-secondary flex items-center"
        >
          <Eye className="mr-2 h-5 w-5" />
          Preview Website
        </Link>
      </div>
      
      <div className="glass-card">
        <div className="flex border-b overflow-x-auto">
          {["hero", "about", "services", "contact"].map((sectionId) => (
            <button
              key={sectionId}
              className={`px-6 py-3 font-medium whitespace-nowrap ${
                activeTab === sectionId 
                  ? "border-b-2 border-adhirachna-blue text-adhirachna-darkblue" 
                  : "text-adhirachna-gray"
              }`}
              onClick={() => handleTabChange(sectionId)}
            >
              {sectionId.charAt(0).toUpperCase() + sectionId.slice(1)} Section
            </button>
          ))}
        </div>
        
        <div className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Section Title</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the main heading for the {activeTab} section.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {(activeTab === "hero" || activeTab === "services" || activeTab === "contact") && (
                <FormField
                  control={form.control}
                  name="subtitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section Subtitle</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormDescription>
                        A brief description that appears below the title.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              {activeTab === "about" && (
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          {...field} 
                          rows={5}
                        />
                      </FormControl>
                      <FormDescription>
                        The main content of the about section.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              
              <FormField
                control={form.control}
                name="enabled"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                    <FormControl>
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="h-4 w-4"
                      />
                    </FormControl>
                    <FormLabel className="font-normal">
                      Enable this section
                    </FormLabel>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end space-x-4">
                <button
                  type="reset"
                  className="px-4 py-2 border border-adhirachna-gray text-adhirachna-gray rounded hover:bg-adhirachna-lightgray transition-colors"
                  onClick={() => form.reset(activeSection)}
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
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;
