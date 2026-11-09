"use client";

import { Home, RefreshCw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function AppError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="w-full max-w-3xl space-y-6">
        <div className="rounded-xl border border-red-900/30 bg-gray-900/80 p-8 shadow-2xl backdrop-blur-sm">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-4xl font-bold text-white md:text-5xl">Something went wrong</h1>
            <p className="text-lg text-gray-400">This page could not be displayed.</p>
          </div>

          {/* Error details */}
          <div className="mb-6 space-y-4 border-t border-gray-800 pt-6">
            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-300">What happened?</h2>
              <p className="text-sm text-gray-400">
                An unexpected error interrupted rendering. The issue has been logged.
              </p>
            </div>

            <div>
              <h2 className="mb-2 text-sm font-semibold text-gray-300">What can I do?</h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-gray-400">
                <li>Try again — the error may be temporary</li>
                <li>Return to the homepage</li>
                <li>Contact the site owner if the problem persists</li>
              </ul>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-3 border-t border-gray-800 pt-6 sm:flex-row">
            <button
              type="button"
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#e5a54b] px-6 py-3 font-medium text-gray-900 transition-all hover:bg-[#e5a54b]/80 hover:scale-105"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800/50 px-6 py-3 font-medium text-white transition-all hover:bg-gray-800 hover:scale-105"
            >
              <Home size={18} />
              Return Home
            </Link>
          </div>

          {/* Digest, when the runtime provides one */}
          {error.digest && (
            <div className="mt-8 border-t border-gray-800 pt-6 text-xs text-gray-500">
              Reference: <span className="font-mono">{error.digest}</span>
            </div>
          )}

          {/* Technical details (collapsed by default) */}
          {process.env.NODE_ENV === "development" && error.message && (
            <details className="mt-6 rounded-lg border border-gray-800 bg-gray-950/50 p-4">
              <summary className="cursor-pointer text-sm font-semibold text-gray-400 hover:text-gray-300">
                Technical Details (Development Only)
              </summary>
              <div className="mt-3 rounded bg-black/50 p-3 font-mono text-xs text-red-400">
                <div className="mb-1 text-gray-500">Error Message:</div>
                {error.message}
                {error.digest && (
                  <>
                    <div className="mb-1 mt-2 text-gray-500">Digest:</div>
                    {error.digest}
                  </>
                )}
              </div>
            </details>
          )}
        </div>

        {/* Additional help */}
        <p className="text-center text-sm text-gray-500">
          If this problem persists, please contact{" "}
          <a
            href="https://github.com/ionutcnu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#e5a54b] hover:underline"
          >
            @ionutcnu
          </a>
        </p>
      </div>
    </div>
  );
}
