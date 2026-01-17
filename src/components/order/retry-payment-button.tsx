"use client";

import { retryPayment } from "@/actions/retry-payment";
import { Spinner } from "@/components/ui/spinner";
import { useState, useTransition } from "react";

type Props = {
  orderId: number;
  status: string;
};

export const RetryPaymentButton = ({ orderId, status }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  if (status !== "pending") {
    return null;
  }

  const handleRetryPayment = () => {
    setError(null);
    startTransition(async () => {
      const result = await retryPayment(orderId);

      if (result.error) {
        setError(result.error);
      } else if (result.paymentUrl) {
        window.location.href = result.paymentUrl;
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col gap-2">
      <button
        onClick={handleRetryPayment}
        disabled={isPending}
        className="w-full px-6 py-3 bg-green-600 text-white text-center rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? (
          <Spinner className="text-white" />
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
              />
            </svg>
            Continuar Pagamento
          </>
        )}
      </button>
      {error && (
        <p className="text-red-500 text-sm text-center">{error}</p>
      )}
    </div>
  );
};
