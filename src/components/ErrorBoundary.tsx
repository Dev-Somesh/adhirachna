import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  onError?: (error: Error) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Call onError callback if provided
    if (this.props.onError) {
      this.props.onError(error);
    }

    // Enhanced error logging
    console.error('ErrorBoundary caught an error:', {
      error: {
        name: error.name,
        message: error.message,
        stack: error.stack,
      },
      componentStack: errorInfo.componentStack,
      stringified: JSON.stringify(error, null, 2),
      timestamp: new Date().toISOString()
    });

    // Store detailed error in session storage for debugging
    try {
      const errorDetails = {
        error: {
          name: error.name,
          message: error.message,
          stack: error.stack,
          stringified: JSON.stringify(error, null, 2)
        },
        componentStack: errorInfo.componentStack,
        timestamp: new Date().toISOString(),
        location: window.location.href,
        userAgent: navigator.userAgent
      };

      sessionStorage.setItem('errorBoundaryError', JSON.stringify(errorDetails));
    } catch (e) {
      console.error('Failed to store error in session storage:', e);
    }
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error!} errorInfo={this.state.errorInfo!} />;
    }

    return this.props.children;
  }
}

// Add default export
export default ErrorBoundary;

interface ErrorFallbackProps {
  error: Error;
  errorInfo: React.ErrorInfo;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, errorInfo }) => {
  const navigate = useNavigate();
  const isDev = process.env.NODE_ENV === 'development';

  const handleReset = () => {
    // Clear error from session storage
    sessionStorage.removeItem('errorBoundaryError');
    // Navigate to home
    navigate('/');
    // Reload the page
    window.location.reload();
  };

  const handleSupport = () => {
    // Open support email with detailed error information
    const subject = encodeURIComponent('Error Report');
    const body = encodeURIComponent(`
Error Details:
Name: ${error.name}
Message: ${error.message}
Time: ${new Date().toISOString()}
URL: ${window.location.href}
User Agent: ${navigator.userAgent}
Stack Trace: ${error.stack}
Component Stack: ${errorInfo.componentStack}
    `);
    window.location.href = `mailto:support@adhirachna.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
      <div className="w-full max-w-2xl p-6 rounded-lg shadow-xl bg-background border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <h2 className="text-2xl font-bold text-red-500">Something went wrong</h2>
        </div>
        
        <p className="mb-4 text-muted-foreground">
          We apologize for the inconvenience. Our team has been notified and is working to fix this issue.
        </p>

        <div className="p-4 mb-4 space-y-4 overflow-auto text-sm rounded-md bg-muted max-h-[300px]">
          <div>
            <p className="font-semibold text-red-500">{error.name}</p>
            <p className="font-medium">{error.message}</p>
          </div>

          {isDev && (
            <>
              <div>
                <p className="mb-1 font-semibold">Stack trace:</p>
                <pre className="text-xs whitespace-pre-wrap">{error.stack}</pre>
              </div>
              <div>
                <p className="mb-1 font-semibold">Component stack:</p>
                <pre className="text-xs whitespace-pre-wrap">{errorInfo.componentStack}</pre>
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
              className="flex-1"
            >
              Go Home
            </Button>
            <Button
              variant="default"
              onClick={handleReset}
              className="flex-1"
            >
              Try Again
            </Button>
          </div>
          <Button
            variant="secondary"
            onClick={handleSupport}
            className="w-full"
          >
            Contact Support
          </Button>
        </div>

        {isDev && (
          <p className="mt-4 text-xs text-center text-muted-foreground">
            This error overlay is only shown in development mode.
            <br />
            The production error UI will be more user-friendly.
          </p>
        )}
      </div>
    </div>
  );
}; 