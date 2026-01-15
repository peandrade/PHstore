"use client";

import { retryPayment } from "@/actions/retry-payment";
import { useState, useTransition } from "react";

type Props = {
  orderId: number;
  status: string;
};

export const RetryPaymentButton = ({ orderId, status }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  // Só mostra o botão se o status for "pending"
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
        // Redireciona para a página de pagamento do Stripe
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
          <svg
            className="animate-spin h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
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