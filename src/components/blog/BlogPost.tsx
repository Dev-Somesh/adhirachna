
import { Link } from 'react-router-dom';
import { Calendar, User, Eye, Tag, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import type { BlogPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPost;
}

const BlogPost = ({ post }: BlogPostProps) => {
  return (
    <>
      <Link to="/blog" className="inline-flex items-center text-adhirachna-blue hover:text-adhirachna-green mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Blog
      </Link>
      
      <div className="bg-white rounded-lg shadow-soft overflow-hidden">
        <div className="h-96 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-8">
          <div className="mb-4">
            <span className="px-3 py-1 bg-adhirachna-green/10 text-adhirachna-green rounded-full text-sm font-medium">
              {post.category}
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-adhirachna-darkblue mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-adhirachna-gray mb-8">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>{format(new Date(post.date), 'MMMM dd, yyyy')}</span>
            </div>
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>{post.views} views</span>
            </div>
          </div>
          
          <div className="prose prose-adhirachna max-w-none mb-8" dangerouslySetInnerHTML={{ __html: post.content }} />
          
          <div className="flex flex-wrap items-center gap-4 border-t border-b border-gray-200 py-6">
            <div className="flex items-center">
              <Tag className="h-5 w-5 mr-2 text-adhirachna-gray" />
              <span className="text-adhirachna-darkblue font-medium">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags && post.tags.length > 0 ? (
                post.tags.map((tag: string) => (
                  <Link 
                    key={tag} 
                    to={`/blog?tag=${tag}`}
                    className="px-3 py-1 bg-adhirachna-light text-adhirachna-darkblue rounded-full text-sm hover:bg-adhirachna-green hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))
              ) : (
                <span className="text-adhirachna-gray text-sm">No tags</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPost;
