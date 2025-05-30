
import { Calendar, Eye, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { useState } from 'react';
import { BlogPostEntry } from '@/types/contentful';

interface BlogCardProps {
  post: BlogPostEntry;
}

const placeholderImages = [
  '/placeholder.svg',
  'https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581092160607-ee22621dd758?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
];

const BlogCard = ({ post }: BlogCardProps) => {
  // Safely access fields with proper type checking
  const fields = post?.fields;
  
  if (!fields) {
    return null; // Don't render if no fields
  }
  
  // Extract fields safely with explicit properties and defaults
  const slug = fields.slug || post.sys.id;
  const title = fields.title || 'Untitled';
  const excerpt = fields.excerpt || '';
  const date = fields.date || fields.publishDate || post.sys.createdAt;
  const category = fields.category || 'Uncategorized';
  const tags = fields.tags || [];
  const viewCount = fields.viewCount || 0;
  
  // Get image URL from Contentful if available
  let initialImageSrc = '/placeholder.svg';
  if (fields.featuredImage?.fields?.file?.url) {
    initialImageSrc = `https:${fields.featuredImage.fields.file.url}`;
  }
  
  const [imageSrc, setImageSrc] = useState(initialImageSrc);
  const [placeholderIndex, setPlaceholderIndex] = useState(1);

  const handleImageError = () => {
    // Choose next placeholder image in rotation
    setImageSrc(placeholderImages[placeholderIndex % placeholderImages.length]);
    setPlaceholderIndex(prev => prev + 1);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-soft hover:shadow-md transition-shadow">
      <Link to={`/blog/${slug}`}>
        <div className="h-48 overflow-hidden">
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
            onError={handleImageError}
          />
        </div>
      </Link>
      
      <div className="p-6">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-medium px-3 py-1 bg-adhirachna-green/10 text-adhirachna-green rounded-full">
            {category}
          </span>
          <div className="flex items-center text-adhirachna-gray text-sm">
            <Eye className="w-4 h-4 mr-1" /> 
            {viewCount}
          </div>
        </div>
        
        <Link to={`/blog/${slug}`} className="block">
          <h3 className="text-xl font-semibold text-adhirachna-darkblue mb-2 hover:text-adhirachna-green transition-colors">
            {title}
          </h3>
        </Link>
        
        <p className="text-adhirachna-gray mb-4 line-clamp-2">
          {excerpt}
        </p>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tags.slice(0, 3).map((tag: string, index: number) => (
              <Link 
                key={index} 
                to={`/blog?tag=${encodeURIComponent(tag)}`}
                className="text-xs bg-adhirachna-light text-adhirachna-darkblue px-2 py-1 rounded-full hover:bg-adhirachna-blue/20 transition-colors flex items-center"
              >
                <Tag className="w-3 h-3 mr-1" />
                {tag}
              </Link>
            ))}
            {tags.length > 3 && (
              <span className="text-xs bg-adhirachna-light text-adhirachna-darkblue px-2 py-1 rounded-full">
                +{tags.length - 3}
              </span>
            )}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center text-adhirachna-gray text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{formatDistanceToNow(new Date(date), { addSuffix: true })}</span>
          </div>
          
          <Link 
            to={`/blog/${slug}`} 
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
