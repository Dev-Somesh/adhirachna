import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Loader2, Tag, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DialogFooter } from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
import ImageUploader from "./ImageUploader";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  views: number;
  published: boolean;
}

interface BlogPostFormProps {
  currentPost: BlogPost | null;
  isEditing: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const BlogPostForm = ({ currentPost, isEditing, onClose, onSuccess }: BlogPostFormProps) => {
  const [formData, setFormData] = useState({
    title: currentPost?.title || "",
    excerpt: currentPost?.excerpt || "",
    content: currentPost?.content || "",
    author: currentPost?.author || "",
    category: currentPost?.category || "",
    tags: currentPost?.tags?.join(", ") || "",
    image: currentPost?.image || ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("BlogPostForm auth check:", !!data.session);
      setIsAuthenticated(!!data.session);
      
      if (!data.session) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to manage blog posts.",
          variant: "destructive"
        });
      }
    };
    
    checkAuth();
    
    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed in BlogPostForm:", event, !!session);
        setIsAuthenticated(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSave = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to save blog posts.",
        variant: "destructive"
      });
      return;
    }

    // Validate form data before saving
    if (!formData.title || !formData.excerpt || !formData.content || !formData.author || !formData.category) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before saving.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    const date = new Date().toISOString();
    
    try {
      // Force refresh auth session before saving
      await supabase.auth.refreshSession();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error("Authentication session has expired. Please log in again.");
      }
      
      console.log("Current auth session before save:", !!session);
      
      if (isEditing && currentPost) {
        // Update existing post
        const updatedPost = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          tags: formData.tags.split(",").map(tag => tag.trim()),
          image: formData.image,
          updated_at: new Date().toISOString()
        };
        
        console.log("Updating blog post:", currentPost.id, updatedPost);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .update(updatedPost)
          .eq('id', currentPost.id)
          .select()
          .single();
        
        if (error) throw error;
        
        toast({
          title: "Post Updated",
          description: `"${formData.title}" has been updated successfully.`
        });
      } else {
        // Create new post
        const newPost = {
          title: formData.title,
          excerpt: formData.excerpt,
          content: formData.content,
          author: formData.author,
          category: formData.category,
          date,
          tags: formData.tags.split(",").map(tag => tag.trim()),
          image: formData.image || "/adhirachna-uploads/e5559050-11f2-4d4f-be39-8be20cf2dc48.png",
          views: 0,
          published: true
        };
        
        console.log("Creating new blog post:", newPost);
        
        const { data, error } = await supabase
          .from('blog_posts')
          .insert([newPost])
          .select()
          .single();
        
        if (error) {
          console.error("Error creating post:", error);
          throw error;
        }
        
        console.log("Blog post created successfully:", data);
        
        toast({
          title: "Post Created",
          description: `"${formData.title}" has been created successfully.`
        });
      }
      
      onSuccess();
    } catch (error) {
      console.error("Error saving post:", error);
      toast({
        title: "Error Saving Post",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="grid gap-4 py-4">
      {!isAuthenticated && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> You are not authenticated. Please log in to manage blog posts.
        </div>
      )}
      
      <div className="grid gap-2">
        <label htmlFor="title" className="text-sm font-medium">Title</label>
        <Input
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter post title"
          required
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="excerpt" className="text-sm font-medium">Excerpt</label>
        <Textarea
          id="excerpt"
          name="excerpt"
          value={formData.excerpt}
          onChange={handleInputChange}
          placeholder="Brief summary of the post"
          rows={2}
          required
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="content" className="text-sm font-medium">Content</label>
        <Textarea
          id="content"
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Full post content"
          rows={8}
          required
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <label htmlFor="author" className="text-sm font-medium">Author</label>
          <Input
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
            placeholder="Author name"
            required
          />
        </div>
        
        <div className="grid gap-2">
          <label htmlFor="category" className="text-sm font-medium">Category</label>
          <Input
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Post category"
            required
          />
        </div>
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="tags" className="text-sm font-medium flex items-center">
          <Tag className="h-4 w-4 mr-2" /> Tags
        </label>
        <Input
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleInputChange}
          placeholder="Comma separated tags"
        />
      </div>
      
      <div className="grid gap-2">
        <label htmlFor="image" className="text-sm font-medium flex items-center">
          <Upload className="h-4 w-4 mr-2" /> Featured Image
        </label>
        <div className="flex items-center gap-2">
          <Input
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            className="flex-1"
          />
          <ImageUploader 
            onUploadStart={() => setUploadingImage(true)}
            onUploadComplete={(imageUrl) => {
              setFormData(prev => ({ ...prev, image: imageUrl }));
              setUploadingImage(false);
            }}
            onUploadError={(error) => {
              toast({
                title: "Error Uploading Image",
                description: error instanceof Error ? error.message : "Unknown error",
                variant: "destructive"
              });
              setUploadingImage(false);
            }}
          />
        </div>
        {formData.image && (
          <div className="mt-2">
            <p className="text-sm text-gray-500 mb-1">Image Preview:</p>
            <img
              src={formData.image}
              alt="Preview"
              className="h-32 w-auto object-cover rounded border"
            />
          </div>
        )}
      </div>
      
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button 
          onClick={handleSave} 
          disabled={isSubmitting || uploadingImage || !isAuthenticated}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            isEditing ? "Update Post" : "Create Post"
          )}
        </Button>
      </DialogFooter>
    </div>
  );
};

export default BlogPostForm;
