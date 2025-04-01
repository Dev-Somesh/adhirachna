
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Loader2 } from 'lucide-react';
import { useInView } from '@/components/ui/motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
  tags: string[];
  views: number;
}

interface Category {
  name: string;
  count: number;
}

// Function to fetch blog posts
const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  // Update views when someone visits the blog page (for analytics)
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  return data || [];
};

const Blog = () => {
  const { ref, isInView } = useInView();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  
  // Fetch blog posts
  const { data: posts = [], isLoading, error } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts
  });
  
  // Update filtered posts when data changes
  useEffect(() => {
    if (!posts) return;
    
    // Filter by search term and category
    let results = [...posts];
    
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    // Sort posts
    if (sortBy === 'recent') {
      results = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => b.views - a.views);
    }
    
    setFilteredPosts(results);
  }, [posts, searchTerm, selectedCategory, sortBy]);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (sortBy !== 'recent') params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [searchTerm, selectedCategory, sortBy, setSearchParams]);
  
  // Generate categories from posts
  const categories: Category[] = useMemo(() => {
    if (!posts) return [{ name: 'All', count: 0 }];
    
    const categoryCounts = posts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));
    
    return [{ name: 'All', count: posts.length }, ...categoryList];
  }, [posts]);
  
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-adhirachna-light min-h-screen" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-adhirachna-darkblue mb-4">Our Blog</h1>
            <p className="text-xl text-adhirachna-gray max-w-3xl mx-auto">
              Stay updated with the latest insights, innovations, and developments in engineering and infrastructure.
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="w-full lg:w-2/3">
              <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-64">
                  <Input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-adhirachna-gray" />
                </div>
                
                <div className="flex items-center gap-2">
                  <span className="text-adhirachna-darkblue">Sort by:</span>
                  <Button 
                    variant={sortBy === 'recent' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy('recent')}
                  >
                    Recent
                  </Button>
                  <Button 
                    variant={sortBy === 'popular' ? 'default' : 'outline'} 
                    size="sm"
                    onClick={() => setSortBy('popular')}
                  >
                    Most Visited
                  </Button>
                </div>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-adhirachna-green" />
                </div>
              ) : error ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                  <h3 className="text-xl font-medium text-adhirachna-darkblue mb-2">Error loading posts</h3>
                  <p className="text-adhirachna-gray mb-4">
                    {error instanceof Error ? error.message : "Unknown error occurred"}
                  </p>
                  <Button onClick={() => window.location.reload()}>Try Again</Button>
                </div>
              ) : filteredPosts.length > 0 ? (
                <div 
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${
                    isInView ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-soft">
                  <h3 className="text-xl font-medium text-adhirachna-darkblue mb-2">No posts found</h3>
                  <p className="text-adhirachna-gray">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </div>
            
            <div className="w-full lg:w-1/3">
              <BlogSidebar 
                categories={categories} 
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                recentPosts={posts.slice(0, 3)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
