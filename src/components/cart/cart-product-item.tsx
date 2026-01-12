"use client"

import { CartListItem } from "@/types/cart-list-item";
import Image from "next/image";
import { useCartStore } from './../../store/cart';
import { setCartState } from "@/actions/set-cart-state";
import { useState } from "react";

type Props = {
  item: CartListItem;
};

export const CartProductItem = ({ item }: Props) => {
    const cartStore = useCartStore(state => state);
    const [isUpdating, setIsUpdating] = useState(false);

    const updateCookie = async () => {
        const updateCart = useCartStore.getState().cart;
        await setCartState(updateCart);
    }
    const handleMinus = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            if(item.quantity > 1) {
                cartStore.updateQuantity(item.product.id, item.quantity - 1);
                await updateCookie();
            } else {
                await handleRemove();
            }
        } finally {
            setIsUpdating(false);
        }
    }
    const handlePlus = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            cartStore.updateQuantity(item.product.id, item.quantity + 1);
            await updateCookie();
        } finally {
            setIsUpdating(false);
        }
    }
    const handleRemove = async () => {
        if (isUpdating) return;
        setIsUpdating(true);
        try {
            cartStore.removeItem(item.product.id);
            await updateCookie();
        } finally {
            setIsUpdating(false);
        }
    }
  return (
    <div className={`flex items-center p-6 gap-4 md:gap-8 border-b border-gray-200 ${isUpdating ? 'opacity-60' : ''}`}>
      <div className="p-1">
        <Image
          src={item.product.image}
          alt={item.product.label}
          width={96}
          height={96}
          className="size-24 md:size-16"
        />
      </div>
      <div className="flex-1 flex flex-col md:flex-row justify-between md:items-center">
        <div>
          <div className="text-sm mb-2">{item.product.label}</div>
          <div className="hidden md:block text-xs text-gray-500">
            COD: {item.product.id}
          </div>
        </div>
        <div className="w-30 flex text-gray-500 border border-gray-200 rounded-sm text-center">
          <button
            onClick={handleMinus}
            disabled={isUpdating}
            className="size-10 text-2xl flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
          >
            -
          </button>
          <div className="size-10 text-lg border-x border-gray-200 flex justify-center items-center">
            {item.quantity}
          </div>
          <button
            onClick={handlePlus}
            disabled={isUpdating}
            className="size-10 text-2xl flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
          >
            +
          </button>
        </div>
      </div>
      <div className="w-24 md:w-40 flex-1 flex flex-col md:flex-row justify-between items-end md:items-center">
        <div className="text-lg text-blue-600">
          R$ {item.product.price.toFixed(2)}
        </div>
        <div>
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="size-12 border border-gray-200 flex justify-center items-center rounded-sm disabled:cursor-not-allowed disabled:opacity-50 hover:bg-gray-50"
          >
            <Image src={"/assets/ui/trash.png"} alt="" width={24} height={24} />
          </button>
        </div>
      </div>
    </div>
  );
};
