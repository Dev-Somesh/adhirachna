
import { useEffect, useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlogSidebar from '@/components/BlogSidebar';
import { Calendar, User, Eye, Tag, ArrowLeft, Facebook, X, Linkedin, Share2, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useInView } from '@/components/ui/motion';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { Database } from '@/integrations/supabase/types';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
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

// Function to fetch a single blog post
const fetchBlogPost = async (id: string): Promise<BlogPost> => {
  // First, update the view count
  const { error: updateError } = await supabase.rpc('increment_blog_view', { post_id: id });
  
  if (updateError) {
    console.error('Error incrementing view count:', updateError);
  }
  
  // Then fetch the post
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .eq('published', true)
    .single();
  
  if (error) {
    throw new Error(error.message);
  }
  
  if (!data) {
    throw new Error('Post not found');
  }
  
  return data;
};

// Function to fetch all blog posts (for sidebar)
const fetchAllPosts = async (): Promise<BlogPost[]> => {
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

const BlogDetail = () => {
  const { ref, isInView } = useInView();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [pageUrl, setPageUrl] = useState('');
  const queryClient = useQueryClient();
  
  // Get current URL for sharing
  useEffect(() => {
    setPageUrl(window.location.href);
  }, [id]);
  
  // Fetch the blog post
  const { 
    data: post, 
    isLoading: postLoading, 
    error: postError 
  } = useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => fetchBlogPost(id!),
    enabled: !!id,
    retry: false
  });
  
  // Fetch all posts for the sidebar
  const { 
    data: allPosts = [], 
    isLoading: allPostsLoading 
  } = useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchAllPosts
  });
  
  // Generate categories from all posts
  const categories: Category[] = useMemo(() => {
    if (allPostsLoading || !allPosts) return [{ name: 'All', count: 0 }];
    
    const categoryCounts = allPosts.reduce((acc, post) => {
      acc[post.category] = (acc[post.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const categoryList = Object.entries(categoryCounts).map(([name, count]) => ({
      name,
      count
    }));
    
    return [{ name: 'All', count: allPosts.length }, ...categoryList];
  }, [allPosts, allPostsLoading]);
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  const handleShareLink = () => {
    navigator.clipboard.writeText(pageUrl);
    toast({
      title: "Link Copied",
      description: "The article URL has been copied to your clipboard",
    });
  };
  
  const shareToLinkedIn = () => {
    if (!post) return;
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(post.title)}`;
    window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
  };
  
  const shareToTwitter = () => {
    if (!post) return;
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(post.title)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };
  
  if (postLoading || allPostsLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 bg-adhirachna-light min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-16 w-16 animate-spin text-adhirachna-green" />
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  if (postError || !post) {
    return (
      <>
        <Navbar />
        <div className="pt-24 bg-adhirachna-light min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-adhirachna-darkblue">Blog Post Not Found</h2>
              <p className="mt-4 text-adhirachna-gray">
                {postError instanceof Error ? postError.message : "The blog post you are looking for might have been removed or is temporarily unavailable."}
              </p>
              <Link to="/blog" className="mt-6 inline-block btn-primary">Back to Blog</Link>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }
  
  return (
    <>
      <Navbar />
      <div className="pt-24 bg-adhirachna-light min-h-screen" ref={ref as React.RefObject<HTMLDivElement>}>
        <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div 
              className={`w-full lg:w-2/3 transition-opacity duration-500 ${
                isInView ? 'opacity-100' : 'opacity-0'
              }`}
            >
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
                  
                  {/* Enhanced Social Sharing Section */}
                  <div className="mt-8 bg-adhirachna-light p-6 rounded-xl">
                    <h3 className="text-lg font-semibold text-adhirachna-darkblue mb-4">Share this article</h3>
                    <div className="flex flex-wrap items-center gap-3">
                      <Button 
                        onClick={shareToLinkedIn} 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 bg-white hover:bg-[#0077b5] hover:text-white"
                      >
                        <Linkedin className="h-4 w-4" />
                        <span>LinkedIn</span>
                      </Button>
                      <Button 
                        onClick={shareToTwitter} 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 bg-white hover:bg-black hover:text-white"
                      >
                        <X className="h-4 w-4" />
                        <span>X (Twitter)</span>
                      </Button>
                      <Button 
                        onClick={handleShareLink} 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-2 bg-white hover:bg-adhirachna-green hover:text-white"
                      >
                        <Share2 className="h-4 w-4" />
                        <span>Copy Link</span>
                      </Button>
                    </div>
                    <div className="mt-4 flex items-center gap-2 text-sm text-adhirachna-gray">
                      <input 
                        type="text" 
                        value={pageUrl} 
                        readOnly 
                        className="flex-grow bg-white p-2 rounded border text-sm text-adhirachna-darkblue" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full lg:w-1/3">
              <BlogSidebar 
                categories={categories} 
                selectedCategory={'All'}
                setSelectedCategory={() => navigate('/blog')}
                recentPosts={allPosts.slice(0, 3)}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
