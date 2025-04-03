
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BlogPostItem from "./BlogPostItem";

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

interface BlogPostListProps {
  posts: BlogPost[];
  isLoading: boolean;
  onNewPost: () => void;
  onEditPost: (post: BlogPost) => void;
  onDeletePost: (id: string) => void;
}

const BlogPostList = ({ posts, isLoading, onNewPost, onEditPost, onDeletePost }: BlogPostListProps) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading blog posts...</p>
      </div>
    );
  }
  
  if (posts.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500 mb-4">No blog posts found.</p>
        <Button onClick={onNewPost}>
          <Plus className="mr-2 h-4 w-4" /> Create Your First Post
        </Button>
      </div>
    );
  }
  
  return (
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
          <BlogPostItem 
            key={post.id} 
            post={post} 
            onEdit={() => onEditPost(post)} 
            onDelete={() => onDeletePost(post.id)} 
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default BlogPostList;
