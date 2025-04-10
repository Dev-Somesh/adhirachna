
import { useNavigate } from 'react-router-dom';
import BlogSidebar from '@/components/BlogSidebar';

interface Category {
  name: string;
  count: number;
}

interface BlogPost {
  id: string;
  title: string;
  date: string;
  image: string;
  views: number;
}

interface BlogSidebarWrapperProps {
  categories: Category[];
  recentPosts: BlogPost[];
  allTags?: string[];
}

const BlogSidebarWrapper = ({ categories, recentPosts, allTags = [] }: BlogSidebarWrapperProps) => {
  const navigate = useNavigate();
  
  const handleCategorySelect = () => navigate('/blog');
  const handleTagClick = (tag: string) => navigate(`/blog?tag=${tag}`);
  
  return (
    <div className="w-full lg:w-1/3">
      <BlogSidebar 
        categories={categories} 
        selectedCategory={'All'}
        setSelectedCategory={handleCategorySelect}
        recentPosts={recentPosts}
        allTags={allTags}
        onTagClick={handleTagClick}
      />
    </div>
  );
};

export default BlogSidebarWrapper;
