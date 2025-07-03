
import { Entry, Asset, EntryFields, EntrySkeletonType } from 'contentful';

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

// Define proper content type for BlogPostSkeleton
export interface BlogPostSkeleton extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
}

// BlogPost type is an Entry with BlogPostSkeleton
export type BlogPost = Entry<BlogPostSkeleton>;

// BlogPostEntry type for consistency
export type BlogPostEntry = Entry<BlogPostSkeleton>;

// Helper function to safely extract field values from Contentful entries
export const getFields = (entry: Entry<BlogPostSkeleton>): BlogPostFields => {
  if (!entry || !entry.fields) {
    return {
      title: '',
      slug: '',
      excerpt: '',
      author: '',
      category: '',
      tags: [],
      viewCount: 0
    } as BlogPostFields;
  }
  
  return entry.fields;
};
