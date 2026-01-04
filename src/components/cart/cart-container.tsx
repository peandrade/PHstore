"use client";

import { useCartStore } from "@/store/cart";
import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { useEffect } from "react";
import { CartProductList } from "./cart-product-list";
import { FinishPurchaseButton } from "./finish-purchase-button";
import Link from "next/link";

type Props = {
  initialCartProducts: CartListItem[];
  initialSubtotal: number;
};
export const CartContainer = ({
  initialCartProducts,
  initialSubtotal,
}: Props) => {
  const cartStore = useCartStore((state) => state);
  const total = initialSubtotal + cartStore.shippingCost;

  useEffect(() => {
    cartStore.clearShipping();
  }, []);

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
          <span className="text-gray-500">
            {" "}
            ({cartStore.cart.length} itens)
          </span>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-1">
          <CartProductList initialList={initialCartProducts} />
        </div>
        <div className="flex-1 md:max-w-sm flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-sm">
            <div className="border-b border-gray-200 p-6">
              <div className="flex justify-between items-center mb-5">
                <div>Subtotal</div>
                <div className="font-bold">R$ {initialSubtotal.toFixed(2)}</div>
              </div>
              <div className="flex justify-between items-center">
                <div>Frete</div>
                <div className="font-bold">
                  R$ {cartStore.shippingCost.toFixed(2)}
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-3">
                <div>Total</div>
                <div className="font-bold text-2xl text-blue-600">R$ {total.toFixed(2)}</div>
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
