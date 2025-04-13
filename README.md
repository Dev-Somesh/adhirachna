# Adhirachna Engineering Solutions

A modern web application for Adhirachna Engineering Solutions, built with React, TypeScript, and Vite.

## Features

- Modern React with TypeScript
- Responsive design with Tailwind CSS
- Authentication with Supabase
- Content management with Contentful
- SEO optimized
- Performance optimized
- Security best practices implemented

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account
- Contentful account

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/Dev-Somesh/adhirachna.git
   cd adhirachna
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your actual credentials.

4. Start the development server:
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:prod` - Build for production with optimizations
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run typecheck` - Run TypeScript type checking
- `npm run test` - Run tests
- `npm run format` - Format code with Prettier
- `npm run analyze` - Analyze bundle size

## Deployment

### Production Build

1. Create a production build:
   ```bash
   npm run build:prod
   ```

2. The built files will be in the `dist` directory.

### Environment Variables

Make sure to set the following environment variables in your production environment:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CONTENTFUL_SPACE_ID`
- `VITE_CONTENTFUL_ACCESS_TOKEN`
- `VITE_RECAPTCHA_SITE_KEY`

## Security

This application implements several security measures:

- Content Security Policy (CSP)
- XSS Protection
- Frame Protection
- Secure Referrer Policy
- CORS Configuration

## Performance

The application is optimized for performance with:

- Code splitting
- Lazy loading
- Asset optimization
- Caching headers
- Bundle size optimization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

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

## 🙏 Acknowledgments

- [Contentful](https://www.contentful.com/) for the CMS
- [Netlify](https://www.netlify.com/) for hosting
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for components
