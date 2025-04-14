import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { AuthProvider } from '@/context/AuthContext'
import { SiteProvider } from './context/SiteContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'

// Create a React Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

// Log environment variables for debugging
console.log('Environment Variables:', import.meta.env)

// Ensure the root element exists
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error('Failed to find the root element')
}

// Create root and render app with proper provider nesting
const root = createRoot(rootElement)
root.render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <SiteProvider>
        <TooltipProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </TooltipProvider>
      </SiteProvider>
    </QueryClientProvider>
  </BrowserRouter>
)
