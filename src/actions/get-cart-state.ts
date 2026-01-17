"use server";

import { CartItem } from "@/types/cart-item";
import { KitCartItem } from "@/store/cart";
import { cookies } from "next/headers";

type CartData = {
  items: CartItem[];
  kits: KitCartItem[];
};

type GetCartStateResponse = {
  cart: CartItem[];
  kits: KitCartItem[];
};

export const getCartState = async (): Promise<GetCartStateResponse> => {
  const cookieStore = await cookies();
  const cartCookie = cookieStore.get("cart");

  if (!cartCookie?.value) {
    return { cart: [], kits: [] };
  }

  try {
    const parsed = JSON.parse(cartCookie.value);

    if (Array.isArray(parsed)) {
      return { cart: parsed, kits: [] };
    }

    const cartData = parsed as CartData;

    const kitsWithQuantity = (cartData.kits || []).map((kit) => ({
      ...kit,
      quantity: kit.quantity || 1,
    }));

    return {
      cart: cartData.items || [],
      kits: kitsWithQuantity,
    };
  } catch {
    return { cart: [], kits: [] };
  }
};
