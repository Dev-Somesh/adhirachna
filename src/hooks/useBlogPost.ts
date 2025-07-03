
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { BlogPost } from '@/types/blog';

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

  // Ensure date is always a string and image can be null
  return {
    ...data,
    date: data.date || data.created_at || new Date().toISOString(),
    image: data.image || null
  };
};

// Function to fetch all blog posts (for sidebar)
export const fetchAllPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });
  
  if (error) {
    throw new Error(error.message);
  }
  
  // Ensure all posts have valid dates and handle nullable images
  return (data || []).map(post => ({
    ...post,
    date: post.date || post.created_at || new Date().toISOString(),
    image: post.image || null
  }));
};

export const useBlogPost = (id: string | undefined) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => fetchBlogPost(id!),
    enabled: !!id,
    retry: false
  });
};

export const useAllBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchAllPosts
  });
};
