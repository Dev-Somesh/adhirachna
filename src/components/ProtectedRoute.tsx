
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { ErrorBoundary } from 'react-error-boundary';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ErrorFallback({ error }: { error: Error }) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Authentication Error</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Navigate 
          to="/login" 
          state={{ 
            from: location,
            error: error.message 
          }} 
          replace 
        />
      </div>
    </div>
  );
}

function ProtectedRouteContent({ children }: ProtectedRouteProps) {
  const { user } = useAuth();
  const location = useLocation();

  // Store the attempted route in sessionStorage
  if (!user) {
    sessionStorage.setItem('returnTo', location.pathname + location.search);
  }

  if (!user) {
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location,
          returnTo: location.pathname + location.search
        }} 
        replace 
      />
    );
  }

  return <>{children}</>;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ProtectedRouteContent children={children} />
    </ErrorBoundary>
  );
}
