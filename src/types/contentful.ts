
import { Entry, Asset, EntrySkeletonType, EntryFields } from 'contentful';

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
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
}

// Use Entry<BlogPostFields> for the BlogPost type
export type BlogPost = Entry<BlogPostFields>;
