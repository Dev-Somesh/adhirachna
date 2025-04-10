
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useInView } from '@/components/ui/motion';
import BlogPost from '@/components/blog/BlogPost';
import SocialShare from '@/components/blog/SocialShare';
import BlogSidebarWrapper from '@/components/blog/BlogSidebarWrapper';
import LoadingState from '@/components/blog/BlogDetail/LoadingState';
import ErrorState from '@/components/blog/BlogDetail/ErrorState';
import { useBlogPost, useAllBlogPosts } from '@/hooks/useBlogPost';
import type { Category } from '@/types/blog';

const BlogDetail = () => {
  const { ref, isInView } = useInView();
  const { id } = useParams<{ id: string }>();
  
  // Fetch the blog post
  const { 
    data: post, 
    isLoading: postLoading, 
    error: postError 
  } = useBlogPost(id);
  
  // Fetch all posts for the sidebar
  const { 
    data: allPosts = [], 
    isLoading: allPostsLoading 
  } = useAllBlogPosts();
  
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

  // Extract all unique tags
  const allTags = useMemo(() => {
    if (!allPosts || allPosts.length === 0) return [];
    
    const tagsSet = new Set<string>();
    allPosts.forEach(post => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach(tag => tagsSet.add(tag));
      }
    });
    
    return Array.from(tagsSet);
  }, [allPosts]);
  
  // Scroll to top when post changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);
  
  if (postLoading || allPostsLoading) {
    return (
      <>
        <Navbar />
        <div className="pt-24 bg-adhirachna-light min-h-screen">
          <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
            <LoadingState />
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
            <ErrorState error={postError} />
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
              <BlogPost post={post} />
              <div className="mt-8 bg-white rounded-lg shadow-soft p-6">
                <SocialShare postTitle={post.title} slug={post.id} />
              </div>
            </div>
            
            <BlogSidebarWrapper 
              categories={categories} 
              recentPosts={allPosts.slice(0, 3)}
              allTags={allTags}
            />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default BlogDetail;
