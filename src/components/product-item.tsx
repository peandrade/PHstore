// src/components/product-item.tsx
"use client";

import { Product } from "@/types/product";
import Image from "next/image";
import Link from "next/link";
import { LikeButton } from "./product/like-button";
import { AddProductToCartButton } from "./product/add-product-to-cart-button";

type Props = {
  data: Product;
  showCartButton?: boolean;
};

export const ProductItem = ({ data, showCartButton = true }: Props) => {
  const link = `/product/${data.id}`;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative bg-gray-50 aspect-square">
        <Link href={link}>
          {data.image ? (
            <Image
              src={data.image}
              alt={data.label}
              fill
              className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">
              📦
            </div>
          )}
        </Link>
        <div className="absolute top-3 right-3">
          <LikeButton
            productId={data.id}
            initialLiked={data.liked}
            size="sm"
          />
        </div>
      </div>
      <div className="p-4">
        <Link
          href={link}
          className="block text-sm font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-10"
        >
          {data.label}
        </Link>

        <div className="mt-2 text-xl font-bold text-blue-600">
          R$ {data.price.toFixed(2)}
        </div>

        <div className="mt-1 text-xs text-gray-400">Em até 12x no cartão</div>

        {showCartButton && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <AddProductToCartButton
              productId={data.id}
              productLabel={data.label}
              className="w-full py-2 px-4 text-sm"
              showIcon
            />
          </div>
        )}
      </div>
    </div>
  );
};