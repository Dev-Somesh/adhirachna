
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
      // We'll create structured fields for Contentful
      // Note: We're not creating an actual Asset object here, just the fields for the entry
      const entryFields = {
        title: { 'en-US': post.title },
        slug: { 'en-US': post.id }, // Using UUID as slug
        content: { 'en-US': post.content },
        excerpt: { 'en-US': post.excerpt },
        author: { 'en-US': post.author },
        publishDate: { 'en-US': post.date },
      };

      // If we have an image, we would need to properly upload it as an asset
      // This is simplified here
      if (post.image) {
        console.log(`Image URL found for post ${post.title}: ${post.image}`);
        // In a real implementation, you would upload the image to Contentful first
        // and then link it as an asset reference, not directly as a field
      }

      // Check if entry already exists
      const existingEntries = await environment.getEntries({
        content_type: 'blogPost',
        'fields.slug': post.id,
        limit: 1,
      });

      if (existingEntries.items.length === 0) {
        // Create new entry
        await environment.createEntry('blogPost', {
          fields: entryFields
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
