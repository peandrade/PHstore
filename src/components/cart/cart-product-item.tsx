// src/components/cart/cart-product-item.tsx
"use client";

import { CartListItem } from "@/types/cart-list-item";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";
import { useCartStore } from "@/store/cart";
import { setCartState } from "@/actions/set-cart-state";
import { useState } from "react";

type Props = {
  item: CartListItem;
};

export const CartProductItem = ({ item }: Props) => {
  const cartStore = useCartStore((state) => state);
  const [isUpdating, setIsUpdating] = useState(false);

  const totalPrice = item.product.price * item.quantity;

  const updateCookie = async () => {
    const state = useCartStore.getState();
    await setCartState(state.cart, state.kits);
  };

  const handleMinus = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      if (item.quantity > 1) {
        cartStore.updateQuantity(item.product.id, item.quantity - 1);
        await updateCookie();
      } else {
        await handleRemove();
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePlus = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      cartStore.updateQuantity(item.product.id, item.quantity + 1);
      await updateCookie();
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (isUpdating) return;
    setIsUpdating(true);
    try {
      cartStore.removeItem(item.product.id);
      await updateCookie();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`bg-white border border-gray-200 rounded-lg p-4 ${
        isUpdating ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Imagem do Produto */}
        <div className="relative w-20 h-20 bg-gray-50 rounded-lg flex-shrink-0 overflow-hidden">
          {item.product.image ? (
            <Image
              src={item.product.image}
              alt={item.product.label}
              fill
              className="object-contain p-2"
              sizes="80px"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
              📦
            </div>
          )}
        </div>

        {/* Info do Produto */}
        <div className="flex-1">
          <Link
            href={`/product/${item.product.id}`}
            className="font-semibold text-gray-800 hover:text-blue-600 transition-colors block mb-1"
          >
            {item.product.label}
          </Link>

          <div className="text-sm text-gray-500 mb-3">COD: {item.product.id}</div>

          {/* Preço unitário */}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold text-blue-600">
              {formatPrice(item.product.price)}
            </span>
            <span className="text-gray-400">/ unidade</span>
          </div>
        </div>

        {/* Controles de quantidade */}
        <div className="flex flex-col items-end gap-3">
          {/* Quantidade */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={handleMinus}
              disabled={isUpdating}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium min-w-[40px] text-center">
              {item.quantity}
            </span>
            <button
              onClick={handlePlus}
              disabled={isUpdating}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              +
            </button>
          </div>

          {/* Preço total */}
          <div className="text-right">
            <div className="text-xl font-bold text-blue-600">
              {formatPrice(totalPrice)}
            </div>
          </div>

          {/* Botão remover */}
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="text-gray-400 hover:text-red-500 transition-colors p-1 disabled:cursor-not-allowed"
            title="Remover produto"
          >
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};