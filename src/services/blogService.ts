import contentfulClient from '../lib/contentful';
import { BlogPost } from '../types/contentful';
import { Entry } from 'contentful';

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  const response = await contentfulClient.getEntries<BlogPost>({
    content_type: 'blogPost',
    order: ['-fields.publishDate'],
  });
  return response.items;
};

export const getBlogPostBySlug = async (slug: string): Promise<BlogPost> => {
  const response = await contentfulClient.getEntries<BlogPost>({
    content_type: 'blogPost',
    'fields.slug': slug,
    limit: 1,
  });
  return response.items[0];
}; 