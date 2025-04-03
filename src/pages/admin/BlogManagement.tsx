
import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Plus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";
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
  // Check authentication before fetching
  const { data: sessionData } = await supabase.auth.getSession();
  console.log("Auth status when fetching posts:", !!sessionData.session);
  
  if (!sessionData.session) {
    // Even if not authenticated, we'll return empty array instead of throwing
    // This allows the UI to show a "please login" message rather than an error
    console.log("User not authenticated when fetching posts");
    return [];
  }
  
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error(error.message);
  }
  
  console.log("Blog posts fetched successfully:", data?.length || 0);
  return data || [];
};

// Function to delete a blog post
const deleteBlogPost = async (id: string): Promise<void> => {
  // Check auth before deleting
  const { data: sessionData } = await supabase.auth.getSession();
  if (!sessionData.session) {
    throw new Error("You must be logged in to delete posts");
  }
  
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
  const { 
    data: posts = [], 
    isLoading, 
    error,
    refetch: refetchPosts 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    refetchInterval: 30000, // Refetch every 30 seconds to keep data fresh
    retry: 1,
    // Don't throw on errors - let us handle them to display auth messages
    throwOnError: false 
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
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to edit posts.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentPost(post);
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const openNewPostDialog = () => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to create posts.",
        variant: "destructive"
      });
      return;
    }
    
    setCurrentPost(null);
    setIsEditing(false);
    setDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (!authenticated) {
      toast({
        title: "Authentication Required",
        description: "You must be logged in to delete posts.",
        variant: "destructive"
      });
      return;
    }
    
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };
  
  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    setDialogOpen(false);
    
    // Immediately refetch the posts to show the latest data
    setTimeout(() => {
      refetchPosts();
    }, 500);
  };
  
  // Verify authentication when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if any existing session in localStorage and if so, refresh it
        await supabase.auth.refreshSession();
        
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        
        setAuthenticated(!!session);
        console.log("Authentication check in BlogManagement:", !!session);
        
        if (!session) {
          toast({
            title: "Authentication Required",
            description: "You must be logged in to manage blog posts.",
            variant: "destructive"
          });
        }
      } catch (error) {
        console.error("Auth error:", error);
        setAuthenticated(false);
      }
    };
    
    checkAuth();
    
    // Setup auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log("Auth state changed:", event, !!session);
        setAuthenticated(!!session);
        
        // When user logs in, refresh the post data
        if (event === 'SIGNED_IN') {
          refetchPosts();
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [refetchPosts]);
  
  if (error && authenticated) {
    return (
      <div className="p-8 text-center">
        <Alert variant="destructive" className="mb-4">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error Loading Blog Posts</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : "Unknown error"}
          </AlertDescription>
        </Alert>
        <Button onClick={() => refetchPosts()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Display authentication status */}
      {authenticated === false && (
        <Alert variant="destructive">
          <AlertTriangle className="h-5 w-5" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            You are not authenticated. Please log in to manage blog posts.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={openNewPostDialog} disabled={!authenticated}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <BlogPostList
          posts={posts}
          isLoading={isLoading || authenticated === null}
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
