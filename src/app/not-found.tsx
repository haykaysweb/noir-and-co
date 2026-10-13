import { House } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";

// Shown for any address that does not exist, and when a page calls notFound().
export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <p className="font-serif text-7xl font-semibold text-sand-300 lg:text-9xl">404</p>
        <h1 className="mb-3 mt-4 font-serif text-2xl font-semibold text-ink-900 lg:text-3xl">
          Page Not Found
        </h1>
        <p className="mb-8 text-sm text-ink-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <ButtonLink href="/">
          <House size={16} /> Back to Home
        </ButtonLink>
      </div>
    </div>
  );
}