
import contentfulClient from '../lib/contentful';
import { BlogPostFields } from '../types/contentful';
import { Entry } from 'contentful';

export const getBlogPosts = async (): Promise<Entry<BlogPostFields>[]> => {
  const response = await contentfulClient.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    order: ['-sys.createdAt'], // Changed from -fields.publishDate to -sys.createdAt
  });
  return response.items;
};

export const getBlogPostBySlug = async (slug: string): Promise<Entry<BlogPostFields>> => {
  const response = await contentfulClient.getEntries<BlogPostFields>({
    content_type: 'blogPost',
    'fields.slug': slug, // This matches the field name in Contentful
    limit: 1,
  });
  
  if (response.items.length === 0) {
    throw new Error(`Blog post with slug "${slug}" not found`);
  }
  
  return response.items[0];
}; 
