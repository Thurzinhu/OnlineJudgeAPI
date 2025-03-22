"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function ProblemsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void; 
}) {

  return (
    <main className="mx-auto max-w-screen md:px-8 flex flex-col items-center justify-center min-h-[50vh] gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <AlertCircle className="size-16 text-destructive" />
        <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
        <p className="text-muted-foreground max-w-md">
          We encountered an error while trying to load the problems. Please try again or contact support if the issue persists.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground mt-2">
            Error ID: {error.digest}
          </p>
        )}
      </div>
      <div className="flex gap-4">
        <Button 
          variant="outline" 
          onClick={() => window.location.href = "/"}
        >
          Go to Home
        </Button>
        <Button onClick={reset}>
          Try Again
        </Button>
      </div>
    </main>
  );
}