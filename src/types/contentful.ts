
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

// Helper function to safely access fields
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
  return entry.fields;
};
