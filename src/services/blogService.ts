
import contentfulClient from '../lib/contentful';
import { BlogPostFields, BlogPost } from '../types/contentful';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await contentfulClient.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    order: '-sys.createdAt', // Use sys.createdAt for ordering
  });
  return response.items as BlogPost[];
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await contentfulClient.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    'fields.slug': slug, // This matches the field name in Contentful
    limit: 1,
  });
  
  if (response.items.length === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return response.items[0] as BlogPost;
}; 
