
import { Link } from 'react-router-dom';

interface ErrorStateProps {
  error: unknown;
}

const ErrorState = ({ error }: ErrorStateProps) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-adhirachna-darkblue">Blog Post Not Found</h2>
      <p className="mt-4 text-adhirachna-gray">
        {error instanceof Error ? error.message : "The blog post you are looking for might have been removed or is temporarily unavailable."}
      </p>
      <Link to="/blog" className="mt-6 inline-block btn-primary">Back to Blog</Link>
    </div>
  );
};

export default ErrorState;
