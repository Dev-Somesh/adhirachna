
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { supabase, isAuthenticated } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { BlogPostForm, BlogPostList } from "@/components/blog";

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

// Function to fetch blog posts from Supabase
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  console.log("Fetching blog posts...");
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(error.message);
  }
  
  console.log("Blog posts fetched successfully:", data.length);
  return data || [];
};

// Function to delete a blog post
const deleteBlogPost = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) {
    throw new Error(error.message);
  }
};

const BlogManagement = () => {
  const queryClient = useQueryClient();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  
  // Query to fetch blog posts
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts
  });
  
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Post Deleted",
        description: "The post has been deleted successfully."
      });
    },
    onError: (error) => {
      toast({
        title: "Error Deleting Post",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  const openEditDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const openNewPostDialog = () => {
    setCurrentPost(null);
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    setDialogOpen(false);
  };
  
  // Check authentication status when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const auth = await isAuthenticated();
      setAuthenticated(auth);
      
      console.log("Authentication check in BlogManagement:", auth);
      
      if (!auth) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to manage blog posts.",
          variant: "destructive"
        });
      }
    };
    
    checkAuth();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setAuthenticated(!!session);
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  if (error) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Blog Posts</h2>
        <p className="text-gray-600">{error instanceof Error ? error.message : "Unknown error"}</p>
        <Button onClick={() => queryClient.invalidateQueries({ queryKey: ['blogPosts'] })} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Display authentication status for debugging */}
      {authenticated === false && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> You are not authenticated. Please log in to manage blog posts.
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={openNewPostDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <BlogPostList
          posts={posts}
          isLoading={isLoading}
          onNewPost={openNewPostDialog}
          onEditPost={openEditDialog}
          onDeletePost={handleDelete}
        />
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Post" : "Create New Post"}</DialogTitle>
          </DialogHeader>
          
          <BlogPostForm
            currentPost={currentPost}
            isEditing={isEditing}
            onClose={() => setDialogOpen(false)}
            onSuccess={handleFormSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
