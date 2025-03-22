
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

type ContentSection = {
  id: string;
  title: string;
  subtitle?: string;
  content?: string;
  enabled: boolean;
};

const ContentManagement = () => {
  const [activeTab, setActiveTab] = useState("hero");
  
  // Mock data - in a real application, this would come from an API or database
  const [sections, setSections] = useState<Record<string, ContentSection>>({
    hero: {
      id: "hero",
      title: "Building the Future Together",
      subtitle: "Specialized in Architectural Engineering, Management Consulting, and Technical Services since 2023.",
      enabled: true
    },
    about: {
      id: "about",
      title: "About Adhirachna Engineering Solutions",
      content: "Leading infrastructure development and engineering consultancy committed to delivering exceptional quality and innovative solutions.",
      enabled: true
    },
    services: {
      id: "services",
      title: "Our Services",
      subtitle: "We provide a wide range of engineering and consulting services to meet your needs.",
      enabled: true
    },
    contact: {
      id: "contact",
      title: "Contact Us",
      subtitle: "Have a project in mind or need expert engineering consultation? Get in touch with our team.",
      enabled: true
    }
  });
  
  const form = useForm({
    defaultValues: sections[activeTab]
  });
  
  // Update form values when tab changes
  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    form.reset(sections[tabId]);
  };
  
  const onSubmit = (data: ContentSection) => {
    // Update the sections state with the new data
    setSections({
      ...sections,
      [activeTab]: {
        ...data,
        id: activeTab
      }
    });
    
    // In a real application, this would save to a database
    
    toast({
      title: "Changes Saved",
      description: "Your content changes have been saved successfully."
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-8">Content Management</h2>
      
      <div className="glass-card">
        <div className="flex border-b">
          {Object.keys(sections).map((sectionId) => (
            <button
              key={sectionId}
              className={`px-6 py-3 font-medium ${
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
                  onClick={() => form.reset(sections[activeTab])}
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
