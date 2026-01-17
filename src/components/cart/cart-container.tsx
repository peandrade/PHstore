// src/components/cart/cart-container.tsx
"use client";

import { useCartStore, KitCartItem } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import { formatPrice } from "@/utils/formatters";
import Image from "next/image";
import { useEffect, useMemo } from "react";
import { CartProductList } from "./cart-product-list";
import { CartKitItem } from "./cart-kit-item";
import { CartEmpty } from "./cart-empty";
import { FinishPurchaseButton } from "./finish-purchase-button";
import Link from "next/link";
import { ShippingBox } from "./shipping-box";

type Props = {
  initialCartProducts: CartListItem[];
  initialSubtotal: number;
  initialKits?: KitCartItem[];
};

export const CartContainer = ({
  initialCartProducts,
  initialSubtotal,
  initialKits = [],
}: Props) => {
  const cart = useCartStore((state) => state.cart);
  const kits = useCartStore((state) => state.kits);
  const shippingCost = useCartStore((state) => state.shippingCost);
  const clearShipping = useCartStore((state) => state.clearShipping);

  // Usa os kits do store, ou os iniciais se o store ainda não foi hidratado
  const currentKits = kits.length > 0 ? kits : initialKits;

  // Calcula subtotal dos kits (preço * quantidade)
  const kitsSubtotal = useMemo(
    () => currentKits.reduce((sum, kit) => sum + kit.kitPrice * kit.quantity, 0),
    [currentKits]
  );

  // Calcula subtotal dos produtos
  const productsSubtotal = useMemo(
    () =>
      initialCartProducts.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      ),
    [initialCartProducts]
  );

  // Subtotal total
  const subtotal = productsSubtotal + kitsSubtotal;

  // Total = subtotal + frete
  const total = subtotal + shippingCost;

  // Conta total de itens
  const totalProductItems = cart.length > 0 ? cart.length : initialCartProducts.length;
  const totalKitItems = currentKits.reduce((sum, kit) => sum + kit.quantity, 0);
  const totalItems = totalProductItems + totalKitItems;

  useEffect(() => {
    clearShipping();
  }, [clearShipping]);

  // Verifica se carrinho está vazio
  const isEmpty =
    initialCartProducts.length === 0 && currentKits.length === 0;

  if (isEmpty) {
    return <CartEmpty />;
  }

  return (
    <div>
      <div className="flex gap-2 mb-8">
        <Image
          src={"/assets/ui/shopping-bag-4-line-black.png"}
          alt=""
          width={24}
          height={24}
        />
        <div className="text-lg">
          Seu carrinho de compras{" "}
          <span className="text-gray-500">({totalItems} itens)</span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          {/* Lista de Kits */}
          {currentKits.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                Kits ({totalKitItems})
              </h3>
              <div className="space-y-4">
                {currentKits.map((kit) => (
                  <CartKitItem key={kit.kitId} kit={kit} />
                ))}
              </div>
            </div>
          )}

          {/* Lista de Produtos Individuais */}
          {initialCartProducts.length > 0 && (
            <div>
              {currentKits.length > 0 && (
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">
                  Produtos ({totalProductItems})
                </h3>
              )}
              <CartProductList initialList={initialCartProducts} />
            </div>
          )}
        </div>

        <div className="flex-1 md:max-w-sm flex flex-col gap-4">
          <ShippingBox />
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div>Subtotal</div>
                <div className="font-bold">{formatPrice(subtotal)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Frete</div>
                <div className="font-bold">{formatPrice(shippingCost)}</div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div>Total</div>
                <div className="font-bold text-2xl text-blue-600">
                  {formatPrice(total)}
                </div>
              </div>
              <div className="text-right text-xs text-gray-500 mb-5">
                Em até 12x no cartão
              </div>
              <FinishPurchaseButton />
              <div className="text-center mt-6">
                <Link href={"/"} className="text-xs text-gray-500">
                  Comprar outros produtos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};