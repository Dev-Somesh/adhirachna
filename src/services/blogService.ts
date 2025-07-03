
import contentfulClient from '../lib/contentful';
import { BlogPostSkeleton, BlogPostEntry } from '../types/contentful';

export const getBlogPosts = async (): Promise<BlogPostEntry[]> => {
  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    order: '-sys.createdAt' as any,
  });
  return response.items as BlogPostEntry[];
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPostEntry> => {
  const response = await contentfulClient.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  } as any);
  
  if (response.items.length === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return response.items[0] as BlogPostEntry;
};
