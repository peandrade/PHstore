// src/components/cart/cart-kit-item.tsx
"use client";

import { KitCartItem, useCartStore } from "@/store/cart";
import { setCartState } from "@/actions/set-cart-state";
import Link from "next/link";

type Props = {
  kit: KitCartItem;
};

export const CartKitItem = ({ kit }: Props) => {
  const updateKitQuantity = useCartStore((state) => state.updateKitQuantity);
  const removeKit = useCartStore((state) => state.removeKit);

  const savings = (kit.kitOriginalPrice - kit.kitPrice) * kit.quantity;
  const totalPrice = kit.kitPrice * kit.quantity;
  const totalOriginalPrice = kit.kitOriginalPrice * kit.quantity;

  const updateCart = async () => {
    const state = useCartStore.getState();
    await setCartState(state.cart, state.kits);
  };

  const handleIncrement = async () => {
    updateKitQuantity(kit.kitId, kit.quantity + 1);
    await updateCart();
  };

  const handleDecrement = async () => {
    if (kit.quantity > 1) {
      updateKitQuantity(kit.kitId, kit.quantity - 1);
      await updateCart();
    }
  };

  const handleRemoveKit = async () => {
    removeKit(kit.kitId);
    await updateCart();
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start gap-4">
        {/* Info do Kit */}
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded">
              KIT
            </span>
            <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
              -{Math.round(((kit.kitOriginalPrice - kit.kitPrice) / kit.kitOriginalPrice) * 100)}%
            </span>
          </div>
          
          <Link
            href={`/kits/${kit.kitSlug}`}
            className="font-semibold text-gray-800 hover:text-blue-600 transition-colors block mb-2"
          >
            {kit.kitLabel}
          </Link>

          {/* Produtos inclusos */}
          <div className="text-sm text-gray-500 space-y-1 mb-3">
            {kit.products.map((product) => (
              <div key={product.productId}>
                • {product.quantity}x {product.label}
              </div>
            ))}
          </div>

          {/* Preço unitário */}
          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-400 line-through">
              R$ {kit.kitOriginalPrice.toFixed(2)}
            </span>
            <span className="font-semibold text-blue-600">
              R$ {kit.kitPrice.toFixed(2)}
            </span>
            <span className="text-gray-400">/ unidade</span>
          </div>
        </div>

        {/* Controles de quantidade */}
        <div className="flex flex-col items-end gap-3">
          {/* Quantidade */}
          <div className="flex items-center border border-gray-200 rounded">
            <button
              onClick={handleDecrement}
              disabled={kit.quantity <= 1}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              -
            </button>
            <span className="px-4 py-2 font-medium min-w-[40px] text-center">
              {kit.quantity}
            </span>
            <button
              onClick={handleIncrement}
              className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
            >
              +
            </button>
          </div>

          {/* Preço total */}
          <div className="text-right">
            {kit.quantity > 1 && (
              <div className="text-gray-400 line-through text-sm">
                R$ {totalOriginalPrice.toFixed(2)}
              </div>
            )}
            <div className="text-xl font-bold text-blue-600">
              R$ {totalPrice.toFixed(2)}
            </div>
            {savings > 0 && (
              <div className="text-green-600 text-xs font-medium">
                Economia: R$ {savings.toFixed(2)}
              </div>
            )}
          </div>

          {/* Botão remover */}
          <button
            onClick={handleRemoveKit}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            title="Remover kit"
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