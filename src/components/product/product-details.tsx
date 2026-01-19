"use client";

import { setCartState } from "@/actions/set-cart-state";
import { useCartStore } from "@/store/cart";
import { ProductComplete } from "@/types/product";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LikeButton } from "./like-button";

type Props = {
  product: ProductComplete;
};

export const ProductDetails = ({ product }: Props) => {
  const router = useRouter();
  const cartStore = useCartStore((state) => state);
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async () => {
    setIsAdding(true);
    try {
      cartStore.addItem({ productId: product.id, quantity: 1 });
      const state = useCartStore.getState();
      await setCartState(state.cart, state.kits);
      router.push("/cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="flex-1">
      <div className="text-xs text-gray-500 mb-2">Cod {product.id}</div>
      <div className="font-bold text-3xl mb-6">{product.label}</div>
      <div className="font-bold text-4xl text-blue-600 mb-2">
        {formatPrice(product.price)}
      </div>
      <div className="text-sm text-gray-500 mb-6">Em até 12x no cartão</div>
      <div className="flex gap-4">
        <button
          onClick={addToCart}
          disabled={isAdding}
          className="flex-1 max-w-xs py-4 px-8 bg-blue-600 text-white border-0 rounded-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isAdding ? "Adicionando..." : "Adicionar ao carrinho"}
        </button>

        <LikeButton
          productId={product.id}
          initialLiked={product.liked}
          size="lg"
          variant="button"
        />

        <button
          aria-label="Compartilhar produto"
          className="cursor-pointer size-14 border border-gray-200 flex justify-center items-center rounded-sm bg-white hover:bg-gray-50"
        >
          <Image
            src={"/assets/ui/share-line.png"}
            alt=""
            width={24}
            height={24}
          />
        </button>
      </div>
    </div>
  );
};
