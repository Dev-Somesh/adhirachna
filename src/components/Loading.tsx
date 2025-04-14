import { Spinner } from "./ui/Spinner";

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <Spinner className="w-12 h-12 mb-4" />
        <p className="text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
} 