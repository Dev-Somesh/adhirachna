
import contentfulClient from '../lib/contentful';
import { BlogPost, BlogPostSkeleton } from '../types/contentful';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    order: '-sys.createdAt',
  });
  return response.items;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  
  if (response.items.length === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return response.items[0];
};
