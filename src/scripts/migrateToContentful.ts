import { createClient } from '@supabase/supabase-js';
import { createClient as createManagementClient } from 'contentful-management';
import { BlogPostFields } from '../types/contentful';

// Initialize Supabase client
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Contentful Management client
const contentfulManagement = createManagementClient({
  accessToken: import.meta.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

async function migrateBlogPosts() {
  try {
    // Fetch all blog posts from Supabase
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true);

    if (error) {
      throw error;
    }

    if (!blogPosts) {
      console.log('No blog posts found in Supabase');
      return;
    }

    // Get the Contentful space and environment
    const space = await contentfulManagement.getSpace(import.meta.env.VITE_CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Migrate each blog post to Contentful
    for (const post of blogPosts) {
      const fields: BlogPostFields = {
        title: post.title,
        slug: post.id, // Using UUID as slug
        content: post.content,
        excerpt: post.excerpt,
        featuredImage: {
          fields: {
            file: {
              url: post.image || '',
            },
          },
        },
        author: post.author,
        publishDate: post.date,
      };

      // Check if entry already exists
      const existingEntries = await environment.getEntries({
        content_type: 'blogPost',
        'fields.slug': fields.slug,
        limit: 1,
      });

      if (existingEntries.items.length === 0) {
        // Create new entry
        await environment.createEntry('blogPost', {
          fields: {
            title: { 'en-US': fields.title },
            slug: { 'en-US': fields.slug },
            content: { 'en-US': fields.content },
            excerpt: { 'en-US': fields.excerpt },
            author: { 'en-US': fields.author },
            publishDate: { 'en-US': fields.publishDate },
          },
        });

        console.log(`Created new post: ${post.title}`);
      } else {
        console.log(`Post already exists: ${post.title}`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migrateBlogPosts(); 