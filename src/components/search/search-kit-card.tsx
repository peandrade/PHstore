// src/components/search/search-kit-card.tsx
"use client";

import { SearchKit } from "@/actions/search";
import Image from "next/image";
import Link from "next/link";
import { AddKitToCartButton } from "@/components/kits/add-kit-to-cart-button";

type Props = {
  kit: SearchKit;
};

export const SearchKitCard = ({ kit }: Props) => {
  const link = `/kits/${kit.slug}`;

  // Prepara os produtos para o botão de adicionar ao carrinho
  const productsForCart = kit.products.map((product) => ({
    id: product.id,
    label: product.label,
    quantity: product.quantity,
    price: product.price,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow group">
      <Link href={link}>
        <div className="relative h-48 bg-gradient-to-br from-blue-50 to-blue-100">
          {/* Grid de produtos do kit */}
          <div
            className={`grid gap-1 h-full p-3 ${
              kit.products.length === 1
                ? "grid-cols-1"
                : kit.products.length === 2
                ? "grid-cols-2"
                : "grid-cols-2"
            }`}
          >
            {kit.products.slice(0, 4).map((product) => (
              <div
                key={product.id}
                className="relative rounded overflow-hidden bg-white/50"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 25vw, 15vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    📦
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* Badge de desconto */}
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            -{kit.discount}%
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link
          href={link}
          className="block font-semibold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-12"
        >
          {kit.label}
        </Link>
        <div className="mt-2 flex items-center gap-2">
          <span className="text-gray-400 line-through text-sm">
            R$ {kit.originalPrice.toFixed(2)}
          </span>
          <span className="text-xl font-bold text-blue-600">
            R$ {kit.price.toFixed(2)}
          </span>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <AddKitToCartButton
            kitId={kit.id}
            kitSlug={kit.slug}
            kitLabel={kit.label}
            kitPrice={kit.price}
            kitOriginalPrice={kit.originalPrice}
            products={productsForCart}
            className="w-full py-2 px-4 text-sm"
            showIcon
          />
        </div>
      </div>
    </div>
  );
};