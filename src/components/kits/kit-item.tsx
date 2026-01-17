"use client";

import { Kit } from "@/libs/api";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import Link from "next/link";
import { AddKitToCartButton } from "./add-kit-to-cart-button";

type Props = {
  data: Kit;
};

export const KitItem = ({ data }: Props) => {
  const link = `/kits/${data.slug}`;
  const savings = data.originalPrice - data.price;

  const productsForCart = data.products.map((product) => ({
    id: product.id,
    label: product.label,
    quantity: product.quantity,
    price: product.price,
  }));

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-xl transition-shadow group">
      <div className="relative">
        <div className="absolute top-3 left-3 z-10 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
          -{data.discount}%
        </div>

        <Link href={link}>
          <div className="bg-gray-50 p-4 aspect-square">
            <div
              className={`grid gap-2 h-full ${
                data.products.length === 1
                  ? "grid-cols-1"
                  : data.products.length === 2
                  ? "grid-cols-2"
                  : data.products.length <= 4
                  ? "grid-cols-2"
                  : "grid-cols-3"
              }`}
            >
              {data.products.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="relative rounded-md overflow-hidden flex items-center justify-center p-2"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.label}
                      fill
                      className="object-contain p-1 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 25vw, 15vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 text-xs">
                      Sem imagem
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Link>
      </div>

      <div className="p-4">
        <Link
          href={link}
          className="block text-lg font-bold text-gray-800 hover:text-blue-600 transition-colors line-clamp-2 min-h-14"
        >
          {data.label}
        </Link>

        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {data.products.length}{" "}
          {data.products.length === 1 ? "item" : "itens"} inclusos
        </p>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-600">
            {formatPrice(data.price)}
          </span>
          <span className="text-sm text-gray-400 line-through">
            {formatPrice(data.originalPrice)}
          </span>
        </div>

        <div className="mt-2 text-sm text-green-600 font-medium">
          Economia de {formatPrice(savings)}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100">
          <p className="text-xs text-gray-500 mb-2">Inclui:</p>
          <div className="flex flex-wrap gap-1 mb-3">
            {data.products.slice(0, 3).map((product) => (
              <span
                key={product.id}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded"
              >
                {product.label.split(" ").slice(0, 2).join(" ")}
              </span>
            ))}
            {data.products.length > 3 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                +{data.products.length - 3}
              </span>
            )}
          </div>

          <AddKitToCartButton
            kitId={data.id}
            kitSlug={data.slug}
            kitLabel={data.label}
            kitPrice={data.price}
            kitOriginalPrice={data.originalPrice}
            products={productsForCart}
            className="w-full py-2 px-4 text-sm"
            showIcon
          />
        </div>
      </div>
    </div>
  );
};
