
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { BlogPost } from "@/types/blog";

const fetchBlogPost = async (id: string): Promise<BlogPost | null> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }

  if (!data) return null;

  return {
    id: data.id,
    title: data.title,
    excerpt: data.excerpt,
    content: data.content,
    author: data.author,
    date: data.date,
    category: data.category,
    image: data.image,
    tags: data.tags,
    views: data.views,
    published: data.published,
    created_at: data.created_at,
    updated_at: data.updated_at
  };
};

const fetchBlogPosts = async (): Promise<BlogPost[]> => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('published', true)
    .order('date', { ascending: false });

  if (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }

  return data.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    author: post.author,
    date: post.date,
    category: post.category,
    image: post.image,
    tags: post.tags,
    views: post.views,
    published: post.published,
    created_at: post.created_at,
    updated_at: post.updated_at
  }));
};

export const useBlogPost = (id: string) => {
  return useQuery({
    queryKey: ['blogPost', id],
    queryFn: () => fetchBlogPost(id),
    enabled: !!id,
  });
};

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ['blogPosts'],
    queryFn: fetchBlogPosts,
  });
};
