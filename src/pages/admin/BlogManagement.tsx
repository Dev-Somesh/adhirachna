import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle
} from "@/components/ui/dialog";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogPostList } from "@/components/blog";
import contentfulClient from "@/lib/contentful";

interface ContentfulBlogPost {
  sys: {
    id: string;
    updatedAt: string;
  };
  fields: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: string;
    date: string;
    category: string;
    image: {
      fields: {
        file: {
          url: string;
        };
      };
    };
    tags: string[];
    published: boolean;
  };
}

interface DisplayBlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  published: boolean;
  views: number;
}

// Function to fetch blog posts from Contentful
const fetchBlogPosts = async (): Promise<ContentfulBlogPost[]> => {
  try {
    const response = await contentfulClient.getEntries({
      content_type: 'blogPost',
      order: ['-fields.date'],
      limit: 1000
    });
    
    return response.items as unknown as ContentfulBlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    throw new Error("Failed to fetch blog posts");
  }
};

const BlogManagement = () => {
  const queryClient = useQueryClient();
  
  // Query to fetch blog posts
  const { 
    data: posts = [], 
    isLoading, 
    error
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
    retry: 1
  });
  
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const handleFormSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
    setDialogOpen(false);
  };

  const mapToDisplayPost = (post: ContentfulBlogPost): DisplayBlogPost => ({
    id: post.sys.id,
    title: post.fields.title,
    excerpt: post.fields.excerpt,
    content: post.fields.content,
    author: post.fields.author,
    date: post.fields.date,
    category: post.fields.category,
    image: post.fields.image?.fields?.file?.url || '',
    tags: post.fields.tags,
    published: post.fields.published,
    views: 0 // Contentful doesn't track views, so we default to 0
  });

  const handleNewPost = () => {
    window.open('https://app.contentful.com/spaces/YOUR_SPACE_ID/entries', '_blank');
  };

  const handleEditPost = (post: DisplayBlogPost) => {
    window.open(`https://app.contentful.com/spaces/YOUR_SPACE_ID/entries/${post.id}`, '_blank');
  };

  const handleDeletePost = (id: string) => {
    window.open(`https://app.contentful.com/spaces/YOUR_SPACE_ID/entries/${id}`, '_blank');
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <Button
          variant="outline"
          onClick={handleNewPost}
        >
          Create New Post in Contentful
        </Button>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading blog posts: {error.message}
        </div>
      )}
      
      <BlogPostList 
        posts={posts.map(mapToDisplayPost)}
        isLoading={isLoading}
        onNewPost={handleNewPost}
        onEditPost={handleEditPost}
        onDeletePost={handleDeletePost}
      />
    </div>
  );
};

export default BlogManagement;
