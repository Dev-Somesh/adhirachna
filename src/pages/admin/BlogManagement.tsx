
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Eye, Edit, Trash2, Plus, Tag, Upload } from "lucide-react";
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

// Mock data - this would be replaced by Supabase data
const initialPosts = [
  {
    id: 1,
    title: "The Future of Sustainable Engineering",
    excerpt: "Exploring innovative approaches to sustainable engineering practices in modern construction.",
    author: "Rahul Sharma",
    date: "2023-06-15",
    category: "Sustainability",
    image: "/lovable-uploads/e5559050-11f2-4d4f-be39-8be20cf2dc48.png",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    tags: ["sustainability", "innovation", "engineering"],
    views: 128,
    published: true
  },
  {
    id: 2,
    title: "Structural Health Monitoring Technologies",
    excerpt: "A deep dive into the latest technologies for structural health monitoring and assessment.",
    author: "Priya Patel",
    date: "2023-07-22",
    category: "Technology",
    image: "/lovable-uploads/e5559050-11f2-4d4f-be39-8be20cf2dc48.png",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    tags: ["technology", "monitoring", "structures"],
    views: 95,
    published: true
  }
];

const BlogManagement = () => {
  const [posts, setPosts] = useState(initialPosts);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  
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
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
  
  const openEditDialog = (post: any) => {
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
    // Here you would save to Supabase in a real implementation
    const date = new Date().toISOString().split('T')[0];
    
    if (isEditing && currentPost) {
      // Update existing post
      const updatedPosts = posts.map(post => 
        post.id === currentPost.id 
          ? {
              ...post,
              title: formData.title,
              excerpt: formData.excerpt,
              content: formData.content,
              author: formData.author,
              category: formData.category,
              tags: formData.tags.split(",").map(tag => tag.trim()),
              image: formData.image
            }
          : post
      );
      setPosts(updatedPosts);
      toast({
        title: "Post Updated",
        description: `"${formData.title}" has been updated successfully.`
      });
    } else {
      // Create new post
      const newPost = {
        id: posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1,
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
      setPosts([...posts, newPost]);
      toast({
        title: "Post Created",
        description: `"${formData.title}" has been created successfully.`
      });
    }
    
    setDialogOpen(false);
    resetForm();
  };
  
  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this post?")) {
      // Here you would delete from Supabase in a real implementation
      const updatedPosts = posts.filter(post => post.id !== id);
      setPosts(updatedPosts);
      toast({
        title: "Post Deleted",
        description: "The post has been deleted successfully."
      });
    }
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
                <TableCell>{post.date}</TableCell>
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
                <Upload className="h-4 w-4 mr-2" /> Featured Image URL
              </label>
              <Input
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                placeholder="Image URL"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isEditing ? "Update" : "Create"} Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BlogManagement;
