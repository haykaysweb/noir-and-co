"use client"; // Error boundaries must be client components.

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void; // Tries to render the page again.
};

// Shown when something unexpected crashes while a page is rendering.
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // In production, send this to an error-tracking service such as Sentry.
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="mb-3 font-serif text-2xl font-semibold text-ink-900 lg:text-3xl">
          Something went wrong
        </h1>
        <p className="mb-8 text-sm text-ink-500">
          We couldn&apos;t load this page. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  );
}