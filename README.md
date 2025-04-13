# Adhirachna - Infrastructure Solutions

A modern web application built with React, TypeScript, and Contentful CMS, showcasing infrastructure solutions and blog content.

## 🚀 Features

- Modern, responsive design with Tailwind CSS
- Contentful CMS integration for content management
- Blog system with rich text support
- SEO optimized with React Helmet
- Deployed on Netlify

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS with Shadcn UI components
- **CMS**: Contentful
- **Deployment**: Netlify
- **Routing**: React Router
- **State Management**: React Query
- **Form Handling**: React Hook Form with Zod validation

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/adhirachna.git
cd adhirachna
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
VITE_CONTENTFUL_SPACE_ID=your-space-id
VITE_CONTENTFUL_ACCESS_TOKEN=your-access-token
VITE_CONTENTFUL_PREVIEW_TOKEN=your-preview-token
VITE_CONTENTFUL_MANAGEMENT_TOKEN=your-management-token
```

4. Start the development server:
```bash
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/     # React components
├── lib/           # Utility functions and configurations
├── services/      # API services and data fetching
├── types/         # TypeScript type definitions
└── scripts/       # Migration and setup scripts
```

## 📝 Content Management

The project uses Contentful CMS for content management. The content model includes:

- **Blog Post**: Title, slug, content, excerpt, author, featured image, publish date, category, tags, and view count
- **Author**: Name and bio

## 🚀 Deployment

The application is deployed on Netlify. The deployment process is automated through GitHub integration.

### Netlify Configuration

The project includes a `netlify.toml` configuration file with the following settings:

- Build command: `npm run build`
- Publish directory: `dist`
- Node.js version: 18
- SPA redirects for client-side routing

## 🔧 Development Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run lint`: Run ESLint

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Anurag Pareek** - Founder and CEO of Adhirachna
- **Er. Somesh Bhardwaj** - Developer ([LinkedIn](https://www.linkedin.com/in/ersomeshbhardwaj/))

## 🙏 Acknowledgments

- [Contentful](https://www.contentful.com/) for the CMS
- [Netlify](https://www.netlify.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for components
