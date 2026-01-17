"use server";

import { authenticatedFetch } from "@/libs/authenticated-fetch";
import { CartItem } from "@/types/cart-item";
import { KitCartItem } from "@/store/cart";

type FinishCartResponse = {
  success: boolean;
  checkoutUrl?: string;
  orderId?: number;
  error?: string;
};

type ApiFinishCartResponse = {
  orderId: number;
  url: string;
};

export const finishCart = async (
  token: string,
  addressId: number,
  cart: CartItem[],
  kits: KitCartItem[] = []
): Promise<FinishCartResponse> => {
  if (!token) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!addressId) {
    return { success: false, error: "Selecione um endereço de entrega" };
  }

  if (cart.length === 0 && kits.length === 0) {
    return { success: false, error: "Carrinho vazio" };
  }

  const allCartItems: { productId: number; quantity: number }[] = [];

  for (const item of cart) {
    allCartItems.push({
      productId: item.productId,
      quantity: item.quantity,
    });
  }

  for (const kit of kits) {
    for (const product of kit.products) {
      const totalQuantity = product.quantity * kit.quantity;

      const existingIndex = allCartItems.findIndex(
        (item) => item.productId === product.productId
      );

      if (existingIndex > -1) {
        allCartItems[existingIndex].quantity += totalQuantity;
      } else {
        allCartItems.push({
          productId: product.productId,
          quantity: totalQuantity,
        });
      }
    }
  }

  const result = await authenticatedFetch<ApiFinishCartResponse>("/cart/finish", {
    method: "POST",
    body: {
      addressId,
      cart: allCartItems,
    },
    token,
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error || "Erro ao finalizar pedido",
    };
  }

  return {
    success: true,
    orderId: result.data.orderId,
    checkoutUrl: result.data.url,
  };
};
