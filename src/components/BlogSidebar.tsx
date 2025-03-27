
import { Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

type Category = {
  name: string;
  count: number;
};

type BlogPost = {
  id: number;
  title: string;
  date: string;
  image: string;
  views: number;
};

interface BlogSidebarProps {
  categories: Category[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  recentPosts: BlogPost[];
}

const BlogSidebar = ({ 
  categories, 
  selectedCategory, 
  setSelectedCategory, 
  recentPosts 
}: BlogSidebarProps) => {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h3 className="text-xl font-semibold text-adhirachna-darkblue mb-4">Categories</h3>
        <ul className="space-y-3">
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => setSelectedCategory(category.name)}
                className={`flex justify-between w-full py-2 px-3 rounded transition-colors ${
                  selectedCategory === category.name
                    ? 'bg-adhirachna-green text-white'
                    : 'text-adhirachna-gray hover:bg-adhirachna-light'
                }`}
              >
                <span>{category.name}</span>
                <span className="bg-white/20 px-2 rounded-full text-sm">
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h3 className="text-xl font-semibold text-adhirachna-darkblue mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="flex gap-3">
              <Link to={`/blog/${post.id}`} className="flex-shrink-0">
                <div className="w-20 h-20 rounded overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </Link>
              <div>
                <Link to={`/blog/${post.id}`}>
                  <h4 className="font-medium text-adhirachna-darkblue hover:text-adhirachna-green transition-colors line-clamp-2">
                    {post.title}
                  </h4>
                </Link>
                <div className="flex items-center text-adhirachna-gray text-xs mt-1">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{formatDistanceToNow(new Date(post.date), { addSuffix: true })}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-soft p-6">
        <h3 className="text-xl font-semibold text-adhirachna-darkblue mb-4">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['infrastructure', 'sustainability', 'technology', 'innovation', 'engineering', 'project management', 'analysis', 'design', 'monitoring', 'structures'].map((tag) => (
            <Link 
              to={`/blog?tag=${tag}`} 
              key={tag}
              className="px-3 py-1 bg-adhirachna-light text-adhirachna-darkblue rounded-full text-sm hover:bg-adhirachna-green hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogSidebar;
