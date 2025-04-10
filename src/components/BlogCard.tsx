
import { Calendar, Eye, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';

type BlogPost = {
  id: string;
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

const placeholderImages = [
  '/placeholder.svg',
  'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const BlogCard = ({ post }: BlogCardProps) => {
  const [imageSrc, setImageSrc] = useState(post.image || placeholderImages[0]);
  const [placeholderIndex, setPlaceholderIndex] = useState(1);

  const handleImageError = () => {
    // Choose next placeholder image in rotation
    setImageSrc(placeholderImages[placeholderIndex % placeholderImages.length]);
    setPlaceholderIndex(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow">
      <Link to={`/blog/${post.id}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={post.title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
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

        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Link 
                key={index} 
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-adhirachna-light text-adhirachna-darkblue px-2 py-1 rounded-full hover:bg-adhirachna-blue/20 transition-colors flex items-center"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
            {post.tags.length > 3 && (
              <span className="text-xs bg-adhirachna-light text-adhirachna-darkblue px-2 py-1 rounded-full">
                +{post.tags.length - 3}
              </span>
            )}
          </div>
        )}
        
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
