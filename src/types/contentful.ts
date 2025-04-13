
import { Entry, Asset, EntryFields } from 'contentful';

// Define the BlogPostFields interface that matches Contentful's structure
export interface BlogPostFields {
  title: EntryFields.Text;
  slug: EntryFields.Text;
  content?: EntryFields.RichText;
  body?: EntryFields.RichText;
  excerpt: EntryFields.Text;
  featuredImage?: Asset;
  author: EntryFields.Text;
  date?: EntryFields.Date;
  publishDate?: EntryFields.Date;
  category?: EntryFields.Text;
  tags?: EntryFields.Array<EntryFields.Text>;
  viewCount?: EntryFields.Integer;
}

// Define the BlogPostSkeleton interface with the correct structure
export interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
}

// BlogPost type is an Entry with BlogPostFields
export type BlogPost = Entry<BlogPostFields>;
