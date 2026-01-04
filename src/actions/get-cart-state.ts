"use server";

import { getServerCart } from "@/libs/server-cookies";

export const getCartState = async () => {
  const cart = await getServerCart();
  return { cart };
};
