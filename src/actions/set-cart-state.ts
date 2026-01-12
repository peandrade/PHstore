"use server";

import { setServerCart } from "@/libs/server-cookies";
import { CartItem } from "@/types/cart-item";

export const setCartState = async (cart: CartItem[]) => {
  await setServerCart(cart);
};
