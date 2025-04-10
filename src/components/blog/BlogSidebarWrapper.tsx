
import { useNavigate } from 'react-router-dom';
import BlogSidebar from '@/components/BlogSidebar';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
  selectedTag?: string;
}

const BlogSidebarWrapper = ({ 
  categories, 
  recentPosts, 
  allTags = [], 
  selectedTag = '' 
}: BlogSidebarWrapperProps) => {
  const navigate = useNavigate();
  const [generatedTags, setGeneratedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Fetch tags from all blog posts if no tags provided
  useEffect(() => {
    const fetchTags = async () => {
      if (allTags && allTags.length > 0) {
        setGeneratedTags(allTags);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('tags')
          .eq('published', true);
          
        if (error) throw error;
        
        // Extract all tags and remove duplicates
        const tagsArray = data
          .flatMap(post => post.tags || [])
          .filter(tag => tag && tag.trim() !== '');
          
        const uniqueTags = Array.from(new Set(tagsArray));
        setGeneratedTags(uniqueTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, [allTags]);
  
  const handleCategorySelect = (category: string) => navigate(`/blog${category !== 'All' ? `?category=${category}` : ''}`);
  
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      // If clicking the selected tag, clear it
      navigate('/blog');
    } else {
      navigate(`/blog?tag=${encodeURIComponent(tag)}`);
    }
  };
  
  return (
    <div className="w-full lg:w-1/3">
      <BlogSidebar 
        categories={categories} 
        selectedCategory={'All'}
        setSelectedCategory={handleCategorySelect}
        recentPosts={recentPosts}
        allTags={loading ? [] : generatedTags}
        selectedTag={selectedTag}
        onTagClick={handleTagClick}
      />
    </div>
  );
};

export default BlogSidebarWrapper;
