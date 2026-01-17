"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

/**
 * Client-side wrapper for ErrorBoundary to be used in Server Components
 *
 * This allows us to wrap server components with error boundary protection
 * while keeping the parent components as Server Components.
 */
export function ErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // Log to error reporting service in production
        if (process.env.NODE_ENV === "production") {
          console.error("Application error:", error, errorInfo);
          // TODO: Send to error tracking service (Sentry, LogRocket, etc.)
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
