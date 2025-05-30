
import { Entry, Asset, EntrySkeletonType } from 'contentful';
import { Document } from '@contentful/rich-text-types';

export interface BlogPostFields {
  slug: string;
  title: string;
  excerpt?: string;
  content?: Document;
  body?: Document;
  author?: string;
  date?: string;
  publishDate?: string;
  category?: string;
  tags?: string[];
  featuredImage?: Asset;
  viewCount?: number;
  published?: boolean;
}

export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
}

export type BlogPostEntry = Entry<BlogPostSkeleton>;
export type BlogPost = BlogPostEntry;
export type ContentfulBlogPost = BlogPostEntry;

// Helper function to safely access fields from Contentful entries
export const getFields = (entry: BlogPostEntry): BlogPostFields => {
  if (!entry?.fields) {
    return {
      slug: '',
      title: '',
      excerpt: '',
      author: '',
      date: '',
      publishDate: '',
      category: '',
      tags: [],
      viewCount: 0,
      published: false
    };
  }

  // Extract actual values from Contentful fields (which may have locale structure)
  const extractValue = (field: any): any => {
    if (!field) return undefined;
    // If it's a simple value, return it
    if (typeof field === 'string' || typeof field === 'number' || typeof field === 'boolean') {
      return field;
    }
    // If it's a Contentful localized field, get the default locale value
    if (field['en-US']) return field['en-US'];
    if (field['en']) return field['en'];
    // Return the first available locale value
    const locales = Object.keys(field);
    if (locales.length > 0) return field[locales[0]];
    return field;
  };

  return {
    slug: extractValue(entry.fields.slug) || '',
    title: extractValue(entry.fields.title) || '',
    excerpt: extractValue(entry.fields.excerpt) || '',
    content: extractValue(entry.fields.content),
    body: extractValue(entry.fields.body),
    author: extractValue(entry.fields.author) || '',
    date: extractValue(entry.fields.date) || '',
    publishDate: extractValue(entry.fields.publishDate) || '',
    category: extractValue(entry.fields.category) || '',
    tags: extractValue(entry.fields.tags) || [],
    featuredImage: extractValue(entry.fields.featuredImage),
    viewCount: extractValue(entry.fields.viewCount) || 0,
    published: extractValue(entry.fields.published) ?? false
  };
};
