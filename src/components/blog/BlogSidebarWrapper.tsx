
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
}

const BlogSidebarWrapper = ({ categories, recentPosts }: BlogSidebarWrapperProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="w-full lg:w-1/3">
      <BlogSidebar 
        categories={categories} 
        selectedCategory={'All'}
        setSelectedCategory={() => navigate('/blog')}
        recentPosts={recentPosts}
      />
    </div>
  );
};

export default BlogSidebarWrapper;
