"use client";

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";

type ErrorBoundaryType = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

const ErrorBoundary = ({ reset }: ErrorBoundaryType) => {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="max-w-md space-y-5 text-center">
        <AlertCircle className="mx-auto size-10 text-destructive" />
        <h1 className="text-2xl font-semibold">Something went wrong</h1>
        <p className="text-muted-foreground">Your saved progress is still on this device. Try opening the form again.</p>
        <Button onClick={reset}>Try again</Button>
      </section>
    </main>
  );
};
export default ErrorBoundary;
