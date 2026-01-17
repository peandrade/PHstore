// src/components/product/add-product-to-cart-button.tsx
"use client";

import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { Spinner } from "@/components/ui/spinner";
import { useState } from "react";

type Props = {
  productId: number;
  productLabel: string;
  className?: string;
  variant?: "primary" | "secondary";
  showIcon?: boolean;
};

export const AddProductToCartButton = ({
  productId,
  productLabel,
  className = "",
  variant = "primary",
  showIcon = false,
}: Props) => {
  const cartStore = useCartStore((state) => state);
  const [isAdding, setIsAdding] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Verifica quantidade atual no carrinho
  const productInCart = cartStore.cart.find((p) => p.productId === productId);
  const quantityInCart = productInCart?.quantity || 0;

  const handleAddToCart = async () => {
    setIsAdding(true);

    try {
      cartStore.addItem({
        productId,
        quantity: 1,
      });

      // Atualiza o cookie com o novo estado
      const state = useCartStore.getState();
      await setCartState(state.cart, state.kits);

      // Mostra feedback de sucesso
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const baseStyles =
    "font-semibold rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 active:scale-[0.98]",
    secondary:
      "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50",
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      title={`Adicionar ${productLabel} ao carrinho`}
    >
      {isAdding ? (
        <>
          <Spinner />
          <span className="hidden sm:inline">Adicionando...</span>
        </>
      ) : showSuccess ? (
        <>
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="hidden sm:inline">Adicionado!</span>
        </>
      ) : (
        <>
          {showIcon && (
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          )}
          {quantityInCart > 0 ? (
            <span className="hidden sm:inline">Adicionar mais ({quantityInCart})</span>
          ) : (
            <span className="hidden sm:inline">Adicionar</span>
          )}
          {quantityInCart > 0 && (
            <span className="sm:hidden">+({quantityInCart})</span>
          )}
        </>
      )}
    </button>
  );
};