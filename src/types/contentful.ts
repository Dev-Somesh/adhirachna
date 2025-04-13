
import { Entry, Asset, EntryFields } from 'contentful';

// Define the BlogPostFields interface that matches Contentful's structure
export interface BlogPostFields {
  title: string;
  slug: string;
  content?: EntryFields.RichText;
  body?: EntryFields.RichText;
  excerpt: string;
  featuredImage?: Asset;
  author: string;
  date?: string;
  publishDate?: string;
  category?: string;
  tags?: string[];
  viewCount?: number;
}

// Define the BlogPost type as a Contentful Entry with BlogPostFields
export type BlogPost = Entry<BlogPostFields>;
