import { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import { Eye, Edit, Trash2, Plus, Tag, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Database } from '@/integrations/supabase/types';

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
  // Instead of throwing errors for auth, just fetch the posts
  // Admin page is already protected by the AdminLayout component
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

// Function to create a new blog post
const createBlogPost = async (post: Omit<BlogPost, 'id'>): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([post])
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
};

// Function to update a blog post
const updateBlogPost = async (post: BlogPost): Promise<BlogPost> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update(post)
    .eq('id', post.id)
    .select()
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data;
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

// Function to upload image to Supabase Storage
const uploadImage = async (file: File): Promise<string> => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `blog/${fileName}`;
  
  const { error } = await supabase.storage
    .from('blog-images')
    .upload(filePath, file);
  
  if (error) {
    throw new Error(error.message);
  }
  
  const { data } = supabase.storage
    .from('blog-images')
    .getPublicUrl(filePath);
  
  return data.publicUrl;
};

const BlogManagement = () => {
  const queryClient = useQueryClient();
  
  // Query to fetch blog posts
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts
  });
  
  const [currentPost, setCurrentPost] = useState<BlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "",
    tags: "",
    image: ""
  });
  
  // Create mutation
  const createMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Post Created",
        description: `"${formData.title}" has been created successfully.`
      });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error Creating Post",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // Update mutation
  const updateMutation = useMutation({
    mutationFn: updateBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Post Updated",
        description: `"${formData.title}" has been updated successfully.`
      });
      setDialogOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({
        title: "Error Updating Post",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }
    
    const file = e.target.files[0];
    setUploadingImage(true);
    
    try {
      const imageUrl = await uploadImage(file);
      setFormData(prev => ({ ...prev, image: imageUrl }));
      toast({
        title: "Image Uploaded",
        description: "The image has been uploaded successfully."
      });
    } catch (error) {
      toast({
        title: "Error Uploading Image",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setUploadingImage(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      title: "",
      excerpt: "",
      content: "",
      author: "",
      category: "",
      tags: "",
      image: ""
    });
    setCurrentPost(null);
    setIsEditing(false);
  };
  
  const openEditDialog = (post: BlogPost) => {
    setCurrentPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      tags: post.tags.join(", "),
      image: post.image
    });
    setIsEditing(true);
    setDialogOpen(true);
  };
  
  const openNewPostDialog = () => {
    resetForm();
    setDialogOpen(true);
  };
  
  const handleSave = () => {
    const date = new Date().toISOString();
    
    if (isEditing && currentPost) {
      // Update existing post
      const updatedPost: BlogPost = {
        ...currentPost,
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: formData.author,
        category: formData.category,
        tags: formData.tags.split(",").map(tag => tag.trim()),
        image: formData.image
      };
      
      updateMutation.mutate(updatedPost);
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
        image: formData.image || "/lovable-uploads/e5559050-11f2-4d4f-be39-8be20cf2dc48.png",
        views: 0,
        published: true
      };
      
      createMutation.mutate(newPost as any);
    }
  };
  
  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      deleteMutation.mutate(id);
    }
  };
  
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
  
  // Verify that we're logged in when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      console.log("Current session:", data.session);
      
      if (!data.session) {
        toast({
          title: "Authentication Required",
          description: "You must be logged in to manage blog posts.",
          variant: "destructive"
        });
      }
    };
    
    checkAuth();
  }, []);
  

  // Add this helper function to your component
  const isAuthenticated = async () => {
    const { data } = await supabase.auth.getSession();
    return !!data.session;
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Management</h2>
        <Button onClick={openNewPostDialog}>
          <Plus className="mr-2 h-4 w-4" /> New Post
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-500">Loading blog posts...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-gray-500 mb-4">No blog posts found.</p>
            <Button onClick={openNewPostDialog}>
              <Plus className="mr-2 h-4 w-4" /> Create Your First Post
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Views</TableHead>
                <TableHead className="w-[120px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map(post => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>{post.category}</TableCell>
                  <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
                  <TableCell>{post.views}</TableCell>
                  <TableCell className="flex space-x-2">
                    <Button size="sm" variant="outline" onClick={() => window.open(`/blog/${post.id}`, '_blank')}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => openEditDialog(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500" onClick={() => handleDelete(post.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Post" : "Create New Post"}</DialogTitle>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
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
                <div className="relative">
                  <input
                    type="file"
                    id="imageUpload"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button type="button" disabled={uploadingImage}>
                    {uploadingImage ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      "Upload"
                    )}
                  </Button>
                </div>
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
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={createMutation.isPending || updateMutation.isPending}>
              {(createMutation.isPending || updateMutation.isPending) ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : (
                isEditing ? "Update Post" : "Create Post"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
