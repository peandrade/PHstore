"use server";

import { API_URL } from "@/config/api";
import { CartItem } from "@/types/cart-item";
import { KitCartItem } from "@/store/cart";

type FinishCartResponse = {
  success: boolean;
  checkoutUrl?: string;
  orderId?: number;
  error?: string;
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

  try {
    // Combina produtos individuais com produtos dos kits
    const allCartItems: { productId: number; quantity: number }[] = [];

    // Adiciona produtos individuais
    for (const item of cart) {
      allCartItems.push({
        productId: item.productId,
        quantity: item.quantity,
      });
    }

    // Adiciona produtos dos kits (considerando quantidade do kit)
    for (const kit of kits) {
      for (const product of kit.products) {
        // Quantidade total = quantidade do produto no kit * quantidade de kits
        const totalQuantity = product.quantity * kit.quantity;

        // Verifica se o produto já existe no carrinho
        const existingIndex = allCartItems.findIndex(
          (item) => item.productId === product.productId
        );

        if (existingIndex > -1) {
          // Soma a quantidade
          allCartItems[existingIndex].quantity += totalQuantity;
        } else {
          // Adiciona novo item
          allCartItems.push({
            productId: product.productId,
            quantity: totalQuantity,
          });
        }
      }
    }

    const response = await fetch(`${API_URL}/cart/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressId,
        cart: allCartItems,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || "Erro ao finalizar pedido",
      };
    }

    return {
      success: true,
      orderId: data.orderId,
      checkoutUrl: data.url,
    };
  } catch (error) {
    console.error("Erro ao finalizar carrinho:", error);
    return {
      success: false,
      error: "Erro ao conectar com o servidor",
    };
  }
};