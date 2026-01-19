"use client";

import { clearCartCookie } from "@/actions/clear-cart-cookie";
import { finishCart } from "@/actions/finish-cart";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const FinishPurchaseButton = () => {
  const router = useRouter();
  const { token, hydrated } = useAuthStore((state) => state);
  const cartStore = useCartStore((state) => state);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isLoggedIn = typeof token === "string" && token.length > 0;

  const hasItems = cartStore.cart.length > 0 || cartStore.kits.length > 0;

  const handleFinishButton = async () => {
    if (!isLoggedIn || !cartStore.selectedAddressId) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await finishCart(
        cartStore.selectedAddressId,
        cartStore.cart,
        cartStore.kits
      );

      if (response.success && response.checkoutUrl) {
        await clearCartCookie();
        cartStore.clearCart();
        router.push(response.checkoutUrl);
      } else {
        setError(
          response.error || "Ocorreu um erro ao finalizar a compra. Tente novamente."
        );
      }
    } catch (err) {
      console.error("Erro ao finalizar:", err);
      setError("Ocorreu um erro ao finalizar a compra. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!hydrated) return null;

  if (!isLoggedIn) {
    return (
      <Link
        href={"/login"}
        className="block w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-20"
      >
        Faça login para finalizar
      </Link>
    );
  }

  return (
    <div>
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm">
          {error}
        </div>
      )}
      <button
        disabled={!cartStore.selectedAddressId || isLoading || !hasItems}
        onClick={handleFinishButton}
        className="w-full text-center px-6 py-5 bg-blue-600 text-white border-0 rounded-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? "Processando..." : "Finalizar compra"}
      </button>
    </div>
  );
};