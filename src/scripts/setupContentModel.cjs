require('dotenv').config();
const contentfulManagement = require('contentful-management');

// Initialize Contentful Management client
const client = contentfulManagement.createClient({
  accessToken: process.env.VITE_CONTENTFUL_MANAGEMENT_TOKEN,
});

async function deleteContentType(environment, contentTypeId) {
  try {
    console.log(`Attempting to delete content type: ${contentTypeId}`);
    const contentType = await environment.getContentType(contentTypeId);
    if (contentType) {
      // Unpublish first if published
      if (contentType.isPublished()) {
        await contentType.unpublish();
      }
      // Then delete
      await contentType.delete();
      console.log(`Content type ${contentTypeId} deleted successfully`);
    }
  } catch (error) {
    if (error.status === 404) {
      console.log(`Content type ${contentTypeId} does not exist`);
    } else {
      console.error(`Error deleting content type ${contentTypeId}:`, error);
    }
  }
}

async function createAuthorContentType(environment) {
  try {
    console.log('Creating Author content type...');
    const authorContentType = await environment.createContentTypeWithId('author', {
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
    
    await authorContentType.publish();
    console.log('Author content type created and published successfully!');
    return authorContentType;
  } catch (error) {
    if (error.name === 'VersionMismatch') {
      console.log('Author content type already exists');
    } else {
      console.error('Error creating Author content type:', error);
    }
  }
}

async function createBlogPostContentType(environment) {
  try {
    console.log('Creating Blog Post content type...');
    const contentType = await environment.createContentTypeWithId('blogPost', {
      name: 'Blog Post',
      description: 'Blog post content type',
      displayField: 'title',
      fields: [
        {
          id: 'title',
          name: 'Title',
          type: 'Symbol',
          required: true,
        },
        {
          id: 'slug',
          name: 'Slug',
          type: 'Symbol',
          required: true,
          validations: [
            {
              unique: true,
            },
          ],
        },
        {
          id: 'content',
          name: 'Content',
          type: 'RichText',
          required: true,
        },
        {
          id: 'excerpt',
          name: 'Excerpt',
          type: 'Symbol',
          required: true,
        },
        {
          id: 'featuredImage',
          name: 'Featured Image',
          type: 'Link',
          linkType: 'Asset',
          required: false,
        },
        {
          id: 'author',
          name: 'Author',
          type: 'Link',
          linkType: 'Entry',
          required: true,
          validations: [
            {
              linkContentType: ['author']
            }
          ]
        },
        {
          id: 'publishDate',
          name: 'Date',
          type: 'Date',
          required: true,
        },
        {
          id: 'category',
          name: 'Category',
          type: 'Symbol',
          required: true,
        },
        {
          id: 'tags',
          name: 'Tags',
          type: 'Array',
          items: {
            type: 'Symbol'
          },
          required: false,
        },
        {
          id: 'viewCount',
          name: 'View Count',
          type: 'Integer',
          required: false,
        }
      ],
    });

    await contentType.publish();
    console.log('Blog Post content type created and published successfully!');
  } catch (error) {
    if (error.name === 'VersionMismatch') {
      console.log('Blog Post content type already exists');
    } else {
      console.error('Error creating Blog Post content type:', error);
    }
  }
}

async function setupContentModel() {
  try {
    // Get space and environment
    const space = await client.getSpace(process.env.VITE_CONTENTFUL_SPACE_ID);
    const environment = await space.getEnvironment('master');

    // Delete existing content types
    await deleteContentType(environment, 'blogPost');
    await deleteContentType(environment, 'author');

    // Create both content types
    await createAuthorContentType(environment);
    await createBlogPostContentType(environment);

    console.log('Content model setup completed!');
  } catch (error) {
    console.error('Error setting up content model:', error);
  }
}

// Run the setup
setupContentModel(); 