"use client";

import { ErrorBoundary } from "@/components/error-boundary";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export function ErrorBoundaryProvider({ children }: Props) {
  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        if (process.env.NODE_ENV === "production") {
          console.error("Application error:", error, errorInfo);
        }
      }}
    >
      {children}
    </ErrorBoundary>
  );
}
