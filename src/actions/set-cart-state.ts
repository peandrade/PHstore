"use server";

import { CartItem } from "@/types/cart-item";
import { KitCartItem } from "@/store/cart";
import { cookies } from "next/headers";

type CartData = {
  items: CartItem[];
  kits: KitCartItem[];
};

export const setCartState = async (
  cart: CartItem[],
  kits: KitCartItem[] = []
) => {
  const cookieStore = await cookies();

  const cartData: CartData = {
    items: cart,
    kits: kits,
  };

  cookieStore.set("cart", JSON.stringify(cartData), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
};