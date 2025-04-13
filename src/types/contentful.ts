
import { Entry, EntryFields, Asset } from 'contentful';

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

export type BlogPost = Entry<BlogPostFields>;
