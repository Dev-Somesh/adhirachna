import { EntrySkeletonType } from 'contentful';

export interface BlogPostFields {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  featuredImage: {
    fields: {
      file: {
        url: string;
      };
    };
  };
  author: string;
  publishDate: string;
}

export interface BlogPost extends EntrySkeletonType {
  contentTypeId: 'blogPost';
  fields: BlogPostFields;
} 