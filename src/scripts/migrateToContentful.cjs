// Load environment variables
require('dotenv').config();

const { createClient } = require('@supabase/supabase-js');
const contentfulManagement = require('contentful-management');
const contentful = require('contentful');

// Initialize Supabase client
const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.VITE_SUPABASE_ANON_KEY
);

// Initialize Contentful Management client
const client = contentfulManagement.createClient({
  accessToken: process.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

// Convert plain text to Contentful Rich Text format
function convertToRichText(text) {
  const paragraphs = text.split('\n\n');
  return {
    nodeType: 'document',
    data: {},
    content: paragraphs.map(paragraph => ({
      nodeType: 'paragraph',
      data: {},
      content: [
        {
          nodeType: 'text',
          value: paragraph,
          marks: [],
          data: {},
        },
      ],
    })),
  };
}

async function createAuthorContentType(environment) {
  try {
    console.log('Checking for author content type...');
    // Check if author content type exists
    try {
      const authorContentType = await environment.getContentType('author');
      console.log('Author content type exists');
      return authorContentType;
    } catch (error) {
      if (error.status === 404) {
        console.log('Author content type not found, creating it...');
        const authorContentType = await environment.createContentType({
          sys: {
            id: 'author'
          },
          name: 'Author',
          description: 'Author of blog posts',
          fields: [
            {
              id: 'name',
              name: 'Name',
              type: 'Symbol',
              required: true
            },
            {
              id: 'bio',
              name: 'Bio',
              type: 'Text',
              required: false
            }
          ]
        });
        
        console.log('Author content type created, publishing...');
        const publishedContentType = await authorContentType.publish();
        console.log('Author content type published successfully');
        return publishedContentType;
      }
      throw error;
    }
  } catch (error) {
    console.error('Error in createAuthorContentType:', error);
    throw error;
  }
}

async function createAuthorEntry(environment, authorData) {
  try {
    // First ensure author content type exists
    await createAuthorContentType(environment)

    // Query for existing author
    const entries = await environment.getEntries({
      content_type: 'author',
      'fields.name': authorData.name
    })

    if (entries.items.length > 0) {
      console.log(`Author ${authorData.name} already exists`)
      return entries.items[0]
    }

    // Create new author entry
    const authorEntry = await environment.createEntry('author', {
      fields: {
        name: { 'en-US': authorData.name },
        bio: { 'en-US': authorData.bio }
      }
    })

    // Publish the author entry
    await authorEntry.publish()
    console.log(`Created and published author: ${authorData.name}`)
    return authorEntry
  } catch (error) {
    console.error(`Error creating author entry for ${authorData.name}:`, error)
    throw error
  }
}

async function createAsset(space, environment, post) {
  try {
    if (!post.featuredImage) {
      console.log(`No featured image for post "${post.title}", skipping asset creation`);
      return null;
    }

    // Check if the URL is valid
    try {
      new URL(post.featuredImage);
    } catch (e) {
      console.log(`Invalid image URL for post "${post.title}": ${post.featuredImage}`);
      return null;
    }

    const asset = await environment.createAsset({
      fields: {
        title: { 'en-US': `Featured image for ${post.title}` },
        description: { 'en-US': `Featured image for blog post: ${post.title}` },
        file: {
          'en-US': {
            contentType: 'image/jpeg', // You might want to detect this dynamically
            fileName: `${post.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
            upload: post.featuredImage
          }
        }
      }
    });

    const processedAsset = await asset.processForAllLocales();
    const publishedAsset = await processedAsset.publish();
    console.log(`Created and published asset for "${post.title}"`);
    return publishedAsset;
  } catch (error) {
    console.error(`Error creating asset for "${post.title}":`, error);
    return null;
  }
}

async function migrateBlogPosts() {
  try {
    // Initialize Contentful Management client
    const client = contentfulManagement.createClient({
      accessToken: process.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
    });

    const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Create or get the fixed author
    const authorEntry = await createAuthorEntry(environment, {
      name: 'Anurag Pareek',
      bio: 'Founder and CEO of Adhirachna'
    });

    // Fetch all blog posts from Supabase
    const { data: blogPosts, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true);

    if (error) {
      throw new Error(`Error fetching blog posts: ${error.message}`);
    }

    console.log(`Found ${blogPosts.length} blog posts to migrate`);

    for (const post of blogPosts) {
      try {
        // Create slug from title
        const slug = post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');

        // Check if post already exists
        const existingEntries = await environment.getEntries({
          content_type: 'blogPost',
          'fields.slug': slug,
        });

        if (existingEntries.items.length > 0) {
          console.log(`Post "${post.title}" already exists, skipping...`);
          continue;
        }

        // Create featured image asset if exists
        let featuredImageAsset = null;
        if (post.image) {
          featuredImageAsset = await createAsset(space, environment, {
            ...post,
            featuredImage: post.image
          });
        }

        // Create the blog post entry
        const entry = await environment.createEntry('blogPost', {
          fields: {
            title: { 'en-US': post.title },
            slug: { 'en-US': slug },
            content: { 'en-US': convertToRichText(post.content) },
            excerpt: { 'en-US': post.excerpt },
            author: {
              'en-US': {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: authorEntry.sys.id,
                },
              },
            },
            publishDate: { 'en-US': post.date },
            category: { 'en-US': post.category || 'General' },
            tags: { 'en-US': post.tags || [] },
            viewCount: { 'en-US': post.views || 0 },
            ...(featuredImageAsset && {
              featuredImage: {
                'en-US': {
                  sys: {
                    type: 'Link',
                    linkType: 'Asset',
                    id: featuredImageAsset.sys.id
                  }
                }
              }
            })
          },
        });

        await entry.publish();
        console.log(`Created new post: ${post.title} with slug: ${slug}`);
      } catch (error) {
        console.error(`Error creating post "${post.title}":`, error);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Error during migration:', error);
  }
}

// Run the migration
migrateBlogPosts(); 