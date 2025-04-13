import { useState, useEffect, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogCard from '@/components/BlogCard';
import BlogSidebar from '@/components/BlogSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Loader2, X } from 'lucide-react';
import { useInView } from '@/components/ui/motion';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import type { BlogPost as BlogPostFromSupabase, Category } from '@/types/blog';
import type { BlogPost as ContentfulBlogPost } from '@/types/contentful';
import { getBlogPosts } from '@/services/blogService';

// Function to convert Contentful posts to our internal format
const convertContentfulPosts = (contentfulPosts: ContentfulBlogPost[]): BlogPostFromSupabase[] => {
  return contentfulPosts.map(post => {
    // Access fields safely with optional chaining
    const fields = post.fields;
    
    return {
      id: fields?.slug || post.sys.id,
      title: fields?.title || 'Untitled',
      excerpt: fields?.excerpt || '',
      content: '', // We don't store the full content in the list view
      author: fields?.author || 'Unknown',
      date: fields?.date || fields?.publishDate || post.sys.createdAt,
      category: fields?.category || 'Uncategorized',
      image: fields?.featuredImage?.fields?.file?.url 
        ? `https:${fields.featuredImage.fields.file.url}`
        : '/placeholder.svg',
      tags: fields?.tags || [],
      views: fields?.viewCount || 0,
      published: true
    };
  });
};

const Blog = () => {
  const { ref, isInView } = useInView();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedTag, setSelectedTag] = useState(searchParams.get('tag') || '');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'recent');
  const [filteredPosts, setFilteredPosts] = useState<BlogPostFromSupabase[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  
  // Fetch blog posts from Contentful
  const { data: contentfulPosts = [], isLoading: contentfulLoading } = useQuery({
    queryKey: ['contentfulBlogPosts'],
    queryFn: getBlogPosts
  });
  
  // Convert Contentful posts to our internal format
  const posts = useMemo(() => {
    return convertContentfulPosts(contentfulPosts);
  }, [contentfulPosts]);
  
  // Extract all unique tags from posts
  useEffect(() => {
    if (posts && posts.length > 0) {
      const tagsSet = new Set<string>();
      
      posts.forEach(post => {
        if (post.tags && Array.isArray(post.tags)) {
          post.tags.forEach(tag => tagsSet.add(tag));
        }
      });
      
      setAllTags(Array.from(tagsSet));
    }
  }, [posts]);
  
  // Update filtered posts when data changes
  useEffect(() => {
    if (!posts) return;
    
    // Filter by search term, category, and tag
    let results = [...posts];
    
    if (searchTerm) {
      results = results.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (post.tags && Array.isArray(post.tags) && post.tags.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      );
    }
    
    if (selectedCategory !== 'All') {
      results = results.filter(post => post.category === selectedCategory);
    }
    
    if (selectedTag) {
      results = results.filter(post => 
        post.tags && 
        Array.isArray(post.tags) && 
        post.tags.includes(selectedTag)
      );
    }
    
    // Sort posts
    if (sortBy === 'recent') {
      results = [...results].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sortBy === 'popular') {
      results = [...results].sort((a, b) => b.views - a.views);
    }
    
    setFilteredPosts(results);
  }, [posts, searchTerm, selectedCategory, selectedTag, sortBy]);
  
  // Update URL params when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) params.set('search', searchTerm);
    if (selectedCategory !== 'All') params.set('category', selectedCategory);
    if (selectedTag) params.set('tag', selectedTag);
    if (sortBy !== 'recent') params.set('sort', sortBy);
    
    setSearchParams(params);
  }, [searchTerm, selectedCategory, selectedTag, sortBy, setSearchParams]);
  
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

  // Handle tag selection
  const handleTagClick = (tag: string) => {
    if (selectedTag === tag) {
      setSelectedTag('');
    } else {
      setSelectedTag(tag);
    }
  };
  
  // Return the component JSX
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

              {/* Show selected tag if any */}
              {selectedTag && (
                <div className="mb-4 flex items-center">
                  <span className="mr-2 text-adhirachna-darkblue">Filtered by tag:</span>
                  <Badge 
                    className="bg-adhirachna-green text-white flex items-center gap-1 cursor-pointer" 
                    onClick={() => setSelectedTag('')}
                  >
                    {selectedTag}
                    <X className="h-3 w-3" />
                  </Badge>
                </div>
              )}

              {/* Show all available tags */}
              {allTags.length > 0 && (
                <div className="mb-6">
                  <div className="text-sm text-adhirachna-darkblue mb-2">Popular tags:</div>
                  <div className="flex flex-wrap gap-2">
                    {allTags.slice(0, 10).map(tag => (
                      <Badge
                        key={tag}
                        className={`cursor-pointer ${
                          selectedTag === tag 
                            ? 'bg-adhirachna-green text-white' 
                            : 'bg-adhirachna-light text-adhirachna-darkblue hover:bg-adhirachna-green hover:text-white'
                        }`}
                        onClick={() => handleTagClick(tag)}
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {contentfulLoading ? (
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-adhirachna-green" />
                </div>
              ) : filteredPosts.length > 0 ? (
                <div 
                  className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-500 ${
                    isInView ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {contentfulPosts.map((post, index) => (
                    <BlogCard key={post.sys.id} post={post} />
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
                allTags={allTags}
                selectedTag={selectedTag}
                onTagClick={handleTagClick}
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
