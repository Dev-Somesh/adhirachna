
import { Eye, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";

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

interface BlogPostItemProps {
  post: BlogPost;
  onEdit: () => void;
  onDelete: () => void;
}

const BlogPostItem = ({ post, onEdit, onDelete }: BlogPostItemProps) => {
  return (
    <TableRow>
      <TableCell className="font-medium">{post.title}</TableCell>
      <TableCell>{post.category}</TableCell>
      <TableCell>{new Date(post.date).toLocaleDateString()}</TableCell>
      <TableCell>{post.views}</TableCell>
      <TableCell className="flex space-x-2">
        <Button size="sm" variant="outline" onClick={() => window.open(`/blog/${post.id}`, '_blank')}>
          <Eye className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" onClick={onEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button size="sm" variant="outline" className="text-red-500" onClick={onDelete}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default BlogPostItem;
