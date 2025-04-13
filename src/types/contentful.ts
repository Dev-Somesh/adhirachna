
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

// Define the BlogPost type as a Contentful Entry with BlogPostFields
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
}

export type BlogPost = Entry<BlogPostFields, 'blogPost'>;
