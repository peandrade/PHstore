"use server";

import { CartItem } from "@/types/cart-item";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type FinishCartResponse = {
  success: boolean;
  checkoutUrl?: string;
  orderId?: number;
  error?: string;
};

export const finishCart = async (
  token: string,
  addressId: number,
  cart: CartItem[]
): Promise<FinishCartResponse> => {
  if (!token) {
    return { success: false, error: "Usuário não autenticado" };
  }

  if (!addressId) {
    return { success: false, error: "Selecione um endereço de entrega" };
  }

  if (cart.length === 0) {
    return { success: false, error: "Carrinho vazio" };
  }

  try {
    const response = await fetch(`${API_URL}/cart/finish`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        addressId,
        cart: cart.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
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