"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const OrderProcessing = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          router.refresh();
          return 10;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  const handleRefresh = () => {
    router.refresh();
    setCountdown(10);
  };

  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-100 rounded-full mb-6">
        <svg
          className="w-10 h-10 text-yellow-600 animate-spin"
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
      </div>

      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        Processando seu pedido...
      </h1>

      <p className="text-gray-600 mb-2">
        Seu pagamento está sendo confirmado. Isso pode levar alguns segundos.
      </p>

      <p className="text-sm text-gray-500 mb-8">
        Atualizando automaticamente em {countdown} segundos...
      </p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={handleRefresh}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Atualizar agora
        </button>
        <Link
          href="/"
          className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Voltar para a loja
        </Link>
      </div>

      <div className="mt-12 p-4 bg-blue-50 rounded-lg text-left">
        <h3 className="font-medium text-blue-900 mb-2">💡 Dica</h3>
        <p className="text-sm text-blue-700">
          Se o seu pagamento foi aprovado, você receberá um e-mail de
          confirmação em breve. Caso tenha algum problema, entre em contato
          conosco.
        </p>
      </div>
    </div>
  );
};