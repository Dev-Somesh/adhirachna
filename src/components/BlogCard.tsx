
import { Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

type BlogPost = {
  id: number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  views: number;
};

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium px-3 py-1 bg-adhirachna-green/10 text-adhirachna-green rounded-full">
            {post.category}
          </span>
          <div className="flex items-center text-adhirachna-gray text-sm">
            <Eye className="w-4 h-4 mr-1" /> 
            {post.views}
          </div>
        </div>
        
        <Link to={`/blog/${post.id}`} className="block">
          <h3 className="text-xl font-semibold text-adhirachna-darkblue mb-2 hover:text-adhirachna-green transition-colors">
            {post.title}
          </h3>
        </Link>
        
        <p className="text-adhirachna-gray mb-4 line-clamp-2">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-adhirachna-gray text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
          </div>
          
          <Link 
            to={`/blog/${post.id}`} 
            className="text-adhirachna-blue font-medium hover:text-adhirachna-green transition-colors"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
